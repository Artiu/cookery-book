import { Button, useBoolean } from "@chakra-ui/react";
import EditForm from "features/recipe/edit/ui/Form";
import RecipeCard from "features/recipe/ui/Card";
import { doc, getDoc } from "firebase/firestore";
import { getDownloadURL, ref } from "firebase/storage";
import { firestore, storage } from "init/firebase";
import Head from "next/head";

export default function RecipePage({ recipe }) {
    const [isEditing, setIsEditing] = useBoolean();
    return (
        <>
            <Head>
                <title>{recipe.title}</title>
            </Head>
            <Button onClick={() => setIsEditing.toggle()}>Edytuj</Button>
            {isEditing ? <EditForm initialData={recipe} /> : <RecipeCard data={recipe} />}
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
