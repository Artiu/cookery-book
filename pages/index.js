import { Box, Button, Container, Flex, Input } from "@chakra-ui/react";
import { useAuth } from "features/auth/context";
import RecipeList from "features/recipe/ui/List";
import useSearchRecipe from "features/recipe/hooks/useSearchRecipe";
import { collection, getDocs } from "firebase/firestore";
import { getDownloadURL, ref } from "firebase/storage";
import { firestore, storage } from "init/firebase";
import Head from "next/head";
import Link from "next/link";
import EnterPageAnimation from "shared/ui/EnterPageAnimation";

export default function Home({ recipes }) {
    const { query, setQuery, filteredList } = useSearchRecipe(recipes);
    const { isLoggedIn } = useAuth();
    return (
        <>
            <Head>
                <title>Przepisy Madzi</title>
            </Head>
            <Container maxW="container.xl">
                <Flex
                    direction={{ base: "column-reverse", md: "row" }}
                    justifyContent="center"
                    alignItems="center"
                    columnGap="20px"
                    rowGap="10px"
                    marginBottom="30px"
                >
                    <Input
                        placeholder="Znajdź przepis..."
                        value={query}
                        onChange={(e) => setQuery(e.target.value)}
                        width={{ base: "100%", md: "50%" }}
                    />
                    {isLoggedIn && (
                        <Box justifySelf="flex-end">
                            <Link href="/recipe/add" passHref>
                                <Button as="a">Dodaj przepis</Button>
                            </Link>
                        </Box>
                    )}
                </Flex>
                <EnterPageAnimation>
                    <RecipeList recipes={filteredList} />
                </EnterPageAnimation>
            </Container>
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
