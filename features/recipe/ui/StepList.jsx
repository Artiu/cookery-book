import { CloseButton, Flex } from "@chakra-ui/react";
import { Reorder } from "framer-motion";

export default function StepList({ steps, removeItem, moveItem }) {
    return (
        <Reorder.Group
            as="ol"
            axis="y"
            values={steps}
            onReorder={moveItem}
            style={{ paddingInline: "1rem", overflow: "hidden" }}
        >
            {steps.map((step) => (
                <Reorder.Item value={step} key={step}>
                    <Flex justifyContent="space-between">
                        {step}
                        {removeItem && <CloseButton size="sm" onClick={() => removeItem(step)} />}
                    </Flex>
                </Reorder.Item>
            ))}
        </Reorder.Group>
    );
}
