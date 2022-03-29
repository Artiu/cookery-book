/* eslint-disable react/display-name */
/* eslint-disable react-hooks/exhaustive-deps */
import { Center, Spinner } from "@chakra-ui/react";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { useAuth } from "../context";

const withAuth = (WrappedComponent, redirectTo = "/") => {
    return (props) => {
        const router = useRouter();
        const { isLoggedIn } = useAuth();

        useEffect(() => {
            if (isLoggedIn === false) {
                router.push(redirectTo);
            }
        }, [isLoggedIn]);

        if (isLoggedIn) {
            return <WrappedComponent {...props} />;
        }
        if (isLoggedIn === false) {
            return (
                <Center height="100vh">
                    <Spinner size="xl" />
                </Center>
            );
        }
        return null;
    };
};

export default withAuth;
