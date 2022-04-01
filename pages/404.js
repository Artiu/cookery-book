import { CloseButton, Container, Heading } from "@chakra-ui/react";
import Head from "next/head";
import Link from "next/link";
import BackButton from "shared/ui/BackButton";

export default function Page404() {
    return (
        <>
            <Head>
                <title>Nie znaleziono podstrony</title>
            </Head>
            <Link href="/" passHref>
                <CloseButton size="lg" as="a" />
            </Link>
            <Heading as="h1" textAlign="center" marginTop="20px">
                Nie ma takiej podstrony!
            </Heading>
        </>
    );
}
