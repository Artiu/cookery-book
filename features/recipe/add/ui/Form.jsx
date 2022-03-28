import { useToast } from "@chakra-ui/react";
import RecipeForm from "features/recipe/ui/RecipeForm";
import { addDoc, collection } from "firebase/firestore";
import { ref, uploadBytes } from "firebase/storage";
import { firestore, storage } from "init/firebase";
import { useRouter } from "next/router";

export default function AddRecipeForm() {
    const router = useRouter();
    const toast = useToast();
    const addRecipe = async (data) => {
        const image = data.image;
        delete data.image;
        try {
            const docRef = await addDoc(collection(firestore, "recipes"), data);
            if (image) {
                await uploadBytes(ref(storage, `images/${docRef.id}`), image);
            }
            toast({
                position: "top",
                status: "success",
                description: "Pomyślnie dodano nowy przepis!",
                isClosable: true,
            });
            router.push(`/recipe/${docRef.id}`);
        } catch {
            toast({
                position: "top",
                status: "error",
                description: "Coś poszło nie tak!",
                isClosable: true,
            });
        }
    };
    return <RecipeForm cancel={() => router.back()} onSubmit={addRecipe} />;
}
