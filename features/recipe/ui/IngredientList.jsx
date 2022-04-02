import { UnorderedList, ListItem, Flex, CloseButton } from "@chakra-ui/react";

export default function IngredientList({ ingredients, removeItem }) {
    return (
        <UnorderedList>
            {ingredients.map((ingredient, index) => (
                <ListItem key={index}>
                    <Flex justifyContent="space-between">
                        {ingredient}
                        {removeItem && (
                            <CloseButton size="sm" onClick={() => removeItem(ingredient)} />
                        )}
                    </Flex>
                </ListItem>
            ))}
        </UnorderedList>
    );
}
