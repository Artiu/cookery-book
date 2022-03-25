import { ListItem, OrderedList } from "@chakra-ui/react";

export default function StepList({ steps }) {
    return (
        <OrderedList>
            {steps.map((step, index) => (
                <ListItem key={index}>{step}</ListItem>
            ))}
        </OrderedList>
    );
}
