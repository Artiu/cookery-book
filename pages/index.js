import { Button, Input } from "@chakra-ui/react";
import { useAuth } from "features/auth/context";
import RecipeList from "features/recipe/list/ui";
import useSearchRecipe from "features/recipe/search/hooks/useSearchRecipe";
import { collection, getDocs } from "firebase/firestore";
import { getDownloadURL, ref } from "firebase/storage";
import { firestore, storage } from "init/firebase";
import Head from "next/head";
import Link from "next/link";

export default function Home({ recipes }) {
    const { query, setQuery, filteredList } = useSearchRecipe(recipes);
    const { isLoggedIn } = useAuth();
    return (
        <>
            <Head>
                <title>Przepisy Madzi</title>
            </Head>
            {isLoggedIn && (
                <Link href="/add" passHref>
                    <Button as="a">Dodaj przepis</Button>
                </Link>
            )}
            <Input value={query} onChange={(e) => setQuery(e.target.value)} />
            <RecipeList recipes={filteredList} />
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
