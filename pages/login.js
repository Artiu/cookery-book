import withoutAuth from "features/auth/HOC/withoutAuth";
import LoginForm from "features/auth/ui/LoginForm";
import Head from "next/head";

function LoginPage() {
    return (
        <>
            <Head>
                <title>Zaloguj się</title>
            </Head>
            <LoginForm />
        </>
    );
}

export default withoutAuth(LoginPage);
