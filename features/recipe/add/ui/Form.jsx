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
        const file = data.file;
        delete data.file;
        try {
            const docRef = await addDoc(collection(firestore, "recipes"), data);
            if (file) {
                await uploadBytes(ref(storage, `images/${docRef.id}`), file);
            }
            toast({
                position: "top",
                status: "success",
                description: "Pomyślnie dodano nowy przepis!",
                isClosable: true,
            });
            router.push("/");
        } catch {
            toast({
                position: "top",
                status: "error",
                description: "Coś poszło nie tak!",
                isClosable: true,
            });
        }
    };
    return <RecipeForm onSubmit={addRecipe} />;
}
