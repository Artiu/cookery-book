import { Flex, Tag, TagCloseButton, TagLabel } from "@chakra-ui/react";

export default function TagList({ tags, onCloseItem }) {
    const colorSchemes = ["orange", "yellow", "green", "teal", "blue", "cyan", "purple", "pink"];
    return (
        <Flex wrap="wrap" gap="5px">
            {tags.map((tag, index) => (
                <Tag key={index} colorScheme={colorSchemes[index % (colorSchemes.length - 1)]}>
                    <TagLabel>{tag}</TagLabel>
                    {onCloseItem && <TagCloseButton onClick={() => onCloseItem(tag)} />}
                </Tag>
            ))}
        </Flex>
    );
}
