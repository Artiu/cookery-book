import { useToast } from "@chakra-ui/react";

export default function useMyToast() {
    const toast = useToast();
    const createToast = ({ status = "info", description }) => {
        toast({
            position: "top",
            status,
            description,
            isClosable: true,
        });
    };
    return createToast;
}
