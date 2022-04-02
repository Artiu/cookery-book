import RecipeForm from "features/recipe/ui/Form";
import { doc, serverTimestamp, updateDoc } from "firebase/firestore";
import { deleteObject, ref, uploadBytes, uploadString } from "firebase/storage";
import { FIRESTORE, FIREBASE_STORAGE } from "init/firebase";
import { useRouter } from "next/router";
import useMyToast from "shared/hooks/useMyToast";
import { revalidate } from "shared/revalidate";

export default function EditForm({ cancel, initialData }) {
    const router = useRouter();
    const toast = useMyToast();
    const editData = async (newData) => {
        delete newData.id;
        try {
            if (!newData.withImage) {
                try {
                    await deleteObject(ref(FIREBASE_STORAGE, `images/${initialData.id}`));
                } catch {}
            }
            if (newData.image && !newData.image.startsWith("https://")) {
                await uploadString(
                    ref(FIREBASE_STORAGE, `images/${initialData.id}`),
                    newData.image,
                    "data_url"
                );
            }
            delete newData.image;
            const refToOldData = doc(FIRESTORE, "recipes", initialData.id);
            await updateDoc(refToOldData, { ...newData, timestamp: serverTimestamp() });
            await revalidate(`/recipe/${initialData.id}`);
            await revalidate("/");
            toast({ status: "success", description: "Pomyślnie zedytowano przepis!" });
        } catch (err) {
            console.error(err);
            toast({ status: "error", description: "Coś poszło nie tak!" });
        }
        router.reload();
    };
    return <RecipeForm initialData={initialData} cancel={cancel} onSubmit={editData} />;
}
