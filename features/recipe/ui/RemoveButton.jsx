import { useState } from "react";
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
import { FIRESTORE } from "init/firebase";
import { useRouter } from "next/router";
import { revalidate } from "shared/revalidate";
import useMyToast from "shared/hooks/useMyToast";

export default function RemoveButton({ recipe }) {
    const router = useRouter();
    const toast = useMyToast();
    const [isRemoving, setIsRemoving] = useState(false);
    const removeRecipe = async () => {
        setIsRemoving(true);
        try {
            await deleteDoc(doc(FIRESTORE, "recipes", recipe.id));
            if (recipe.withImage) {
                await deleteObject(ref(`images/${recipe.id}`));
            }
            await revalidate(`/recipe/${recipe.id}`);
            await revalidate("/");
        } catch {
            toast({ type: "error", description: "Coś poszło nie tak!" });
        }
        setIsRemoving(false);
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
                            <Button
                                colorScheme="red"
                                onClick={removeRecipe}
                                ml={3}
                                isLoading={isRemoving}
                            >
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
