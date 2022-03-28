import RecipeCard from "features/recipe/ui/Card";
import { collection, getDocs, limit } from "firebase/firestore";
import { getDownloadURL, ref } from "firebase/storage";
import { firestore, storage } from "init/firebase";

export default function Home({ recipes }) {
    return recipes.map((recipe, index) => {
        return <RecipeCard data={recipe} key={index} />;
    });
}

export async function getStaticProps() {
    const recipes = await getDocs(collection(firestore, "recipes"), limit(20));
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
