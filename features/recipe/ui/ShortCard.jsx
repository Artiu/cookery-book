import { Box, Button, Flex, Heading, Image, Text } from "@chakra-ui/react";
import NextLink from "next/link";

export default function ShortCard({ data }) {
    return (
        <Flex
            width={{ base: "100%", md: "calc(50% - 20px)", lg: "calc(100% / 3 - 20px)" }}
            borderRadius="10px"
            overflow="hidden"
            direction="column"
            alignItems="center"
            gap="5px"
            shadow="md"
            backgroundColor="whiteAlpha.900"
        >
            {data.image && (
                <Image
                    src={data.image}
                    alt={`${data.title} wygląd`}
                    height="200px"
                    loading="lazy"
                />
            )}
            <Flex
                direction="column"
                justifyItems="space-between"
                width="100%"
                height="100%"
                gap="10px"
            >
                <Box flex="1" paddingInline="10px">
                    <Heading textAlign="center" as="h3">
                        {data.title}
                    </Heading>
                    <Text textAlign="justify" marginTop="5px">
                        {data.description}
                    </Text>
                </Box>
                <NextLink href={`/recipe/${data.id}`} passHref>
                    <Button as="a" borderRadius="none" _focus={{}}>
                        Zobacz cały przepis
                    </Button>
                </NextLink>
            </Flex>
        </Flex>
    );
}
