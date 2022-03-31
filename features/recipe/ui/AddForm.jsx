import RecipeForm from "features/recipe/ui/Form";
import { addDoc, collection } from "firebase/firestore";
import { ref, uploadBytes } from "firebase/storage";
import { FIRESTORE, FIREBASE_STORAGE } from "init/firebase";
import { useRouter } from "next/router";
import useMyToast from "shared/hooks/useMyToast";
import { revalidate } from "shared/revalidate";

export default function AddForm() {
    const router = useRouter();
    const toast = useMyToast();
    const addRecipe = async (data) => {
        const image = data.image;
        delete data.image;
        try {
            const docRef = await addDoc(collection(FIRESTORE, "recipes"), data);
            if (image) {
                await uploadBytes(ref(FIREBASE_STORAGE, `images/${docRef.id}`), image);
            }
            await revalidate("/");
            toast({
                status: "success",
                description: "Pomyślnie dodano nowy przepis!",
            });
            router.push(`/recipe/${docRef.id}`);
        } catch {
            toast({
                status: "error",
                description: "Coś poszło nie tak!",
            });
        }
    };
    return <RecipeForm cancel={() => router.back()} onSubmit={addRecipe} />;
}
