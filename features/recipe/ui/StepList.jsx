import { CloseButton, Flex, ListItem, OrderedList } from "@chakra-ui/react";

export default function StepList({ steps, removeItem }) {
    return (
        <OrderedList>
            {steps.map((step, index) => (
                <ListItem key={index}>
                    <Flex justifyContent="space-between">
                        {step}
                        {removeItem && <CloseButton size="sm" onClick={() => removeItem(step)} />}
                    </Flex>
                </ListItem>
            ))}
        </OrderedList>
    );
}
