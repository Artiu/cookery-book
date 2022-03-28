import RecipeForm from "features/recipe/ui/RecipeForm";
import { doc, updateDoc } from "firebase/firestore";
import { deleteObject, ref, uploadBytes } from "firebase/storage";
import { firestore, storage } from "init/firebase";
import { useRouter } from "next/router";
import { revalidate } from "shared/revalidate";

export default function EditForm({ initialData }) {
    const router = useRouter();
    const editData = async (newData) => {
        console.log(newData);
        delete newData.id;
        const refToOldData = doc(firestore, "recipes", initialData.id);
        if (!newData.withImage) {
            await deleteObject(ref(storage, `images/${initialData.id}`));
        }
        if (newData.image) {
            await uploadBytes(ref(storage, `images/${initialData.id}`), newData.image);
        }
        delete newData.image;
        await updateDoc(refToOldData, newData);
        await revalidate(`/recipe/${initialData.id}`);
        await revalidate("/");
        router.reload();
    };
    return <RecipeForm initialData={initialData} onSubmit={editData} />;
}
