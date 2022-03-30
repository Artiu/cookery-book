import { Box, Button, Flex, Heading, Image, Text, useMediaQuery } from "@chakra-ui/react";
import NextLink from "next/link";

export default function ShortCard({ data }) {
    const [isHigherThan1000] = useMediaQuery("(min-width: 1000px)");
    return (
        <Flex
            width={isHigherThan1000 ? "calc(25% - 20px)" : "100%"}
            borderRadius="10px"
            overflow="hidden"
            direction={isHigherThan1000 ? "column" : "row"}
            alignItems={isHigherThan1000 ? "center" : "normal"}
            gap="5px"
            shadow="md"
        >
            {data.image && (
                <Image
                    src={data.image}
                    alt={`${data.title} wygląd`}
                    width={isHigherThan1000 ? "100%" : "30%"}
                />
            )}
            <Flex direction="column" justifyItems="space-between">
                <Box>
                    <Heading textAlign="center">{data.title}</Heading>
                    <Text>{data.description}</Text>
                </Box>
                <NextLink href={`/recipe/${data.id}`} passHref>
                    <Button as="a" width="full" alignSelf="flex-end">
                        Zobacz cały przepis
                    </Button>
                </NextLink>
            </Flex>
        </Flex>
    );
}
