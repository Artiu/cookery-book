import { Box, Container, Flex, Heading, Image, Text } from "@chakra-ui/react";
import IngredientList from "features/recipe/ui/IngredientList";
import StepList from "features/recipe/ui/StepList";
import TagList from "./TagList";

export default function FullCard({ data }) {
    return (
        <Flex direction="column" gap="10px">
            {data.image && <Image src={data.image} alt={`${data.title} wygląd`} />}
            <Heading as="h1" textAlign="center">
                {data.title}
            </Heading>
            {data.tags && <TagList tags={data.tags} />}
            {data.description && <Text textAlign="justify">{data.description}</Text>}
            <Heading fontSize="lg">Składniki:</Heading>
            <IngredientList ingredients={data.ingredients} />
            <Heading fontSize="lg">Kroki:</Heading>
            <StepList steps={data.steps} />
            {data.conclusion && (
                <>
                    <Heading fontSize="lg">Podsumowanie</Heading>
                    <Text textAlign="justify">{data.conclusion}</Text>
                </>
            )}
            <Text color="gray.500" fontSize="sm">
                Ostatnia modyfikacja: {data.dateString}
            </Text>
        </Flex>
    );
}
