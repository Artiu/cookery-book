import { Button } from "@chakra-ui/react";
import RecipeList from "features/recipe/list/ui";
import { collection, getDocs } from "firebase/firestore";
import { getDownloadURL, ref } from "firebase/storage";
import { firestore, storage } from "init/firebase";
import Head from "next/head";
import Link from "next/link";

export default function Home({ recipes }) {
    return (
        <>
            <Head>
                <title>Przepisy Madzi</title>
            </Head>
            <Link href="/add" passHref>
                <Button as="a">Dodaj przepis</Button>
            </Link>
            <RecipeList recipes={recipes} />
        </>
    );
}

export async function getStaticProps() {
    const recipes = await getDocs(collection(firestore, "recipes"));
    const transformedRecipes = await Promise.all(
        recipes.docs.map(async (recipe) => {
            const recipeData = recipe.data();
            let image = null;
            if (recipeData.withImage) {
                image = await getDownloadURL(ref(storage, `images/${recipe.id}`));
            }
            return { ...recipeData, id: recipe.id, image };
        })
    );
    return {
        props: {
            recipes: transformedRecipes,
        },
    };
}
