import { Container, Heading } from "@chakra-ui/react";
import withAuth from "features/auth/HOC/withAuth";
import AddRecipeForm from "features/recipe/ui/AddForm";
import Head from "next/head";
import EnterPageAnimation from "shared/ui/EnterPageAnimation";

function AddRecipePage() {
    return (
        <>
            <Head>
                <title>Dodaj przepis</title>
            </Head>
            <EnterPageAnimation>
                <Container
                    maxW="container.md"
                    paddingBottom="20px"
                    marginTop="15px"
                    marginBottom="30px"
                    shadow="xl"
                >
                    <Heading textAlign="center" paddingBlock="20px" as="h1">
                        Dodaj przepis
                    </Heading>
                    <AddRecipeForm />
                </Container>
            </EnterPageAnimation>
        </>
    );
}
export default withAuth(AddRecipePage);
