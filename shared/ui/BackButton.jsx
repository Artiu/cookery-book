import { CloseButton } from "@chakra-ui/react";
import { useRouter } from "next/router";

export default function BackButton() {
    const router = useRouter();
    return <CloseButton onClick={() => router.back()} />;
}
