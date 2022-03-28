import { AspectRatio, Box, Button, Heading, Image, Link, Text } from "@chakra-ui/react";
import NextLink from "next/link";

export default function RecipeCard({ data }) {
    return (
        <Box maxW="sm" borderRadius="10px" border="1px" overflow="hidden">
            {data.image && <Image src={data.image} alt={`${data.title} wygląd`} />}
            <Heading>{data.title}</Heading>
            <Text>{data.description}</Text>
            <NextLink href={`/recipe/${data.id}`} passHref>
                <Button as="a">Zobacz cały przepis</Button>
            </NextLink>
        </Box>
    );
}
