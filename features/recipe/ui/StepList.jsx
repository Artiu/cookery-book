import { CloseButton, Flex, ListItem, OrderedList } from "@chakra-ui/react";

export default function StepList({ steps, removeItem }) {
    return (
        <OrderedList>
            {steps.map((step, index) => (
                <ListItem key={index}>
                    <Flex justifyContent="space-between">{step}</Flex>
                </ListItem>
            ))}
        </OrderedList>
    );
}
