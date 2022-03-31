import { UnorderedList, ListItem } from "@chakra-ui/react";

export default function IngredientList({ ingredients }) {
    return (
        <UnorderedList>
            {ingredients.map((ingredient, index) => (
                <ListItem key={index}>{ingredient}</ListItem>
            ))}
        </UnorderedList>
    );
}
