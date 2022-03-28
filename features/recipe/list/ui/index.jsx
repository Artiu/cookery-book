import RecipeCard from "./Card";

export default function RecipeList({ recipes }) {
    return recipes.map((recipe, index) => {
        return <RecipeCard data={recipe} key={index} />;
    });
}
