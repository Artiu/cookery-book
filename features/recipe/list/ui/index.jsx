import { Flex } from "@chakra-ui/react";
import RecipeCard from "./Card";

export default function RecipeList({ recipes }) {
    return (
        <Flex wrap="wrap" gap="20px">
            {recipes.map((recipe, index) => {
                return <RecipeCard data={recipe} key={index} />;
            })}
        </Flex>
    );
}
