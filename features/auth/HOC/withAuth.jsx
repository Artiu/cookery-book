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
            if (!isLoggedIn) {
                router.push(redirectTo);
            }
        }, [isLoggedIn]);

        if (isLoggedIn) {
            return <WrappedComponent {...props} />;
        } else {
            return null;
        }
    };
};

export default withAuth;
