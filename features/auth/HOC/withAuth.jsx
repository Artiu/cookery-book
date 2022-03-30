/* eslint-disable react/display-name */
/* eslint-disable react-hooks/exhaustive-deps */
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
        return null;
    };
};

export default withAuth;
