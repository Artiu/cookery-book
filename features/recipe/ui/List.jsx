import { Flex } from "@chakra-ui/react";
import ShortCard from "./ShortCard";

export default function List({ recipes }) {
    return (
        <Flex wrap="wrap" gap="20px">
            {recipes.map((recipe, index) => {
                return <ShortCard data={recipe} key={index} />;
            })}
        </Flex>
    );
}
