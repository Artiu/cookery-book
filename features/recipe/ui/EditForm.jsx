import RecipeForm from "features/recipe/ui/Form";
import { doc, updateDoc } from "firebase/firestore";
import { deleteObject, ref, uploadBytes } from "firebase/storage";
import { firestore, storage } from "init/firebase";
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
                await deleteObject(ref(storage, `images/${initialData.id}`));
            }
            if (newData.image && typeof newData.image === "object") {
                await uploadBytes(ref(storage, `images/${initialData.id}`), newData.image);
            }
            delete newData.image;
            const refToOldData = doc(firestore, "recipes", initialData.id);
            await updateDoc(refToOldData, newData);
            await revalidate(`/recipe/${initialData.id}`);
            await revalidate("/");
            toast({ status: "success", description: "Pomyślnie zedytowano przepis!" });
        } catch (err) {
            toast({ status: "error", description: "Coś poszło nie tak!" });
        }
        router.reload();
    };
    return <RecipeForm initialData={initialData} cancel={cancel} onSubmit={editData} />;
}
