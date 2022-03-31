import { Box } from "@chakra-ui/react";
import withoutAuth from "features/auth/HOC/withoutAuth";
import LoginForm from "features/auth/ui/LoginForm";
import Head from "next/head";
import EnterPageAnimation from "shared/ui/EnterPageAnimation";

function LoginPage() {
    return (
        <>
            <Head>
                <title>Zaloguj się</title>
            </Head>
            <EnterPageAnimation>
                <Box marginBlock="40px" marginInline="15px">
                    <LoginForm />
                </Box>
            </EnterPageAnimation>
        </>
    );
}

export default withoutAuth(LoginPage);
