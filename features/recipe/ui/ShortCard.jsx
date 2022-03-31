import { Box, Button, Flex, Heading, Image, Text } from "@chakra-ui/react";
import NextLink from "next/link";

export default function ShortCard({ data }) {
    return (
        <Flex
            width={{ base: "100%", lg: "calc(25% - 20px)" }}
            borderRadius="10px"
            overflow="hidden"
            direction={{ base: "row", lg: "column" }}
            alignItems={{ base: "normal", lg: "center" }}
            gap="5px"
            shadow="md"
        >
            {data.image && (
                <Image
                    src={data.image}
                    alt={`${data.title} wygląd`}
                    width={{ base: "30%", lg: "100%" }}
                    loading="lazy"
                />
            )}
            <Flex direction="column" justifyItems="space-between" height="100%">
                <Box flex="1">
                    <Heading textAlign="center">{data.title}</Heading>
                    <Text>{data.description}</Text>
                </Box>
                <NextLink href={`/recipe/${data.id}`} passHref>
                    <Button as="a">Zobacz cały przepis</Button>
                </NextLink>
            </Flex>
        </Flex>
    );
}
