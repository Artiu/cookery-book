import { Button, useBoolean } from "@chakra-ui/react";
import { useAuth } from "features/auth/context";
import FullCard from "features/recipe/ui/FullCard";
import EditForm from "features/recipe/ui/EditForm";
import RemoveButton from "features/recipe/ui/RemoveButton";
import { doc, getDoc } from "firebase/firestore";
import { getDownloadURL, ref } from "firebase/storage";
import { firestore, storage } from "init/firebase";
import Head from "next/head";
import BackButton from "shared/ui/BackButton";

export default function RecipePage({ recipe }) {
    const [isEditing, setIsEditing] = useBoolean();
    const { isLoggedIn } = useAuth();
    return (
        <>
            <Head>
                <title>{recipe.title}</title>
            </Head>
            <BackButton />
            {isLoggedIn && (
                <>
                    <Button onClick={() => setIsEditing.toggle()}>Edytuj</Button>
                    <RemoveButton recipe={recipe} />
                </>
            )}
            {isEditing ? (
                <EditForm initialData={recipe} cancel={setIsEditing.off} />
            ) : (
                <FullCard data={recipe} />
            )}
        </>
    );
}

export async function getStaticProps(context) {
    const recipe = await getDoc(doc(firestore, "recipes", context.params.id));
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
        image = await getDownloadURL(ref(storage, `images/${recipe.id}`));
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
