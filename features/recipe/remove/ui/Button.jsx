import {
    AlertDialog,
    AlertDialogBody,
    AlertDialogContent,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogOverlay,
    Button,
    useDisclosure,
} from "@chakra-ui/react";
import { deleteDoc, doc } from "firebase/firestore";
import { deleteObject, ref } from "firebase/storage";
import { firestore } from "init/firebase";
import { useRouter } from "next/router";
import { revalidate } from "shared/revalidate";

export default function RemoveButton({ recipe }) {
    const router = useRouter();
    const removeRecipe = async () => {
        await deleteDoc(doc(firestore, "recipes", recipe.id));
        if (recipe.withImage) {
            await deleteObject(ref(`images/${recipe.id}`));
        }
        await revalidate("/");
        router.push("/");
    };
    const { isOpen, onOpen, onClose } = useDisclosure();
    return (
        <>
            <AlertDialog isOpen={isOpen} onClose={onClose}>
                <AlertDialogOverlay>
                    <AlertDialogContent>
                        <AlertDialogHeader fontSize="lg" fontWeight="bold">
                            Usuń przepis
                        </AlertDialogHeader>

                        <AlertDialogBody>Czy napewno chcesz usunąć przepis?</AlertDialogBody>

                        <AlertDialogFooter>
                            <Button onClick={onClose}>Anuluj</Button>
                            <Button colorScheme="red" onClick={removeRecipe} ml={3}>
                                Usuń
                            </Button>
                        </AlertDialogFooter>
                    </AlertDialogContent>
                </AlertDialogOverlay>
            </AlertDialog>
            <Button onClick={onOpen}>Usuń</Button>
        </>
    );
}
