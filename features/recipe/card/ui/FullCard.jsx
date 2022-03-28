import { Box, Heading, Image, Text } from "@chakra-ui/react";
import IngredientList from "features/recipe/ui/IngredientList";
import StepList from "features/recipe/ui/StepList";

export default function FullCard({ data }) {
    return (
        <Box maxW="md">
            {data.image && <Image src={data.image} alt={`${data.title} wygląd`} />}
            <Heading>{data.title}</Heading>
            {data.description && <Text>{data.description}</Text>}
            Składniki:
            <IngredientList ingredients={data.ingredients} />
            Kroki:
            <StepList steps={data.steps} />
            {data.conclusion && <Text>{data.conclusion}</Text>}
        </Box>
    );
}
