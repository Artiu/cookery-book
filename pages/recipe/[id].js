import { Box, Button, Container, Flex, useBoolean } from "@chakra-ui/react";
import { useAuth } from "features/auth/context";
import FullCard from "features/recipe/ui/FullCard";
import EditForm from "features/recipe/ui/EditForm";
import RemoveButton from "features/recipe/ui/RemoveButton";
import { doc, getDoc } from "firebase/firestore";
import { getDownloadURL, ref } from "firebase/storage";
import { FIRESTORE, FIREBASE_STORAGE } from "init/firebase";
import Head from "next/head";
import BackButton from "shared/ui/BackButton";
import EnterPageAnimation from "shared/ui/EnterPageAnimation";

export default function RecipePage({ recipe }) {
    const [isEditing, setIsEditing] = useBoolean();
    const { isLoggedIn } = useAuth();
    return (
        <>
            <Head>
                <title>{recipe.title}</title>
            </Head>
            <EnterPageAnimation>
                <Container
                    maxW="container.md"
                    shadow="md"
                    padding="10px"
                    paddingInline={{ base: "10px", md: "20px" }}
                    marginBlock="20px"
                    backgroundColor="white"
                >
                    <Flex justifyContent="space-between" marginBottom="10px">
                        <BackButton />
                        {isLoggedIn && (
                            <Flex gap="15px">
                                {!isEditing && (
                                    <Button onClick={() => setIsEditing.toggle()}>Edytuj</Button>
                                )}
                                <RemoveButton recipe={recipe} />
                            </Flex>
                        )}
                    </Flex>
                    {isEditing ? (
                        <EditForm initialData={recipe} cancel={setIsEditing.off} />
                    ) : (
                        <FullCard data={recipe} />
                    )}
                </Container>
            </EnterPageAnimation>
        </>
    );
}

export async function getStaticProps(context) {
    const recipe = await getDoc(doc(FIRESTORE, "recipes", context.params.id));
    if (!recipe || !recipe.exists()) {
        return {
            redirect: {
                destination: "/",
                pernament: false,
            },
        };
    }
    let image = null;
    if (recipe.data().withImage) {
        image = await getDownloadURL(ref(FIREBASE_STORAGE, `images/${recipe.id}`));
    }
    return {
        props: {
            recipe: {
                ...recipe.data(),
                image,
                id: recipe.id,
            },
        },
    };
}

export async function getStaticPaths() {
    return {
        paths: [],
        fallback: "blocking",
    };
}
