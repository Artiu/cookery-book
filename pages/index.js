import { Box, Button, Container, Flex, Heading, Input } from "@chakra-ui/react";
import { useAuth } from "features/auth/context";
import RecipeList from "features/recipe/ui/List";
import useSearchRecipe from "features/recipe/hooks/useSearchRecipe";
import { collection, getDocs } from "firebase/firestore";
import { getDownloadURL, ref } from "firebase/storage";
import { FIRESTORE, FIREBASE_STORAGE } from "init/firebase";
import Head from "next/head";
import Link from "next/link";
import EnterPageAnimation from "shared/ui/EnterPageAnimation";
import HeadComponent from "shared/ui/NextHead";

export default function Home({ recipes }) {
    const { query, setQuery, filteredList } = useSearchRecipe(recipes);
    const { isLoggedIn } = useAuth();
    return (
        <>
            <HeadComponent
                title="Przepisy Madzi"
                description="Możesz tutaj znaleźć niesamowite inspiracje dla swoich dań kulinarnych"
            />
            <Container maxW="container.xl" paddingBottom="20px">
                <Heading textAlign="center" as="h1" paddingBottom="20px" paddingTop="10px">
                    Przepisy Madzi
                </Heading>
                <Flex
                    direction={{ base: "column", md: "row" }}
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
                        backgroundColor="white"
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
    const recipes = await getDocs(collection(FIRESTORE, "recipes"));
    const transformedRecipes = await Promise.all(
        recipes.docs.map(async (recipe) => {
            const recipeData = recipe.data();
            let image = null;
            if (recipeData.withImage) {
                try {
                    image = await getDownloadURL(ref(FIREBASE_STORAGE, `images/${recipe.id}`));
                } catch {
                    recipeData.withImage = false;
                }
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
