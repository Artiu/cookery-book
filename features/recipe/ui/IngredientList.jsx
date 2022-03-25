import { List, ListItem } from "@chakra-ui/react";

export default function IngredientList({ ingredients }) {
    return (
        <List>
            {ingredients.map((ingredient, index) => (
                <ListItem key={index}>{ingredient}</ListItem>
            ))}
        </List>
    );
}
