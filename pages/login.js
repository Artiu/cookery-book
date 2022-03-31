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
                <LoginForm />
            </EnterPageAnimation>
        </>
    );
}

export default withoutAuth(LoginPage);
