/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/display-name */
import { useRouter } from "next/router";
import { useEffect } from "react";
import { useAuth } from "../context";

const withoutAuth = (WrappedComponent) => {
    return (props) => {
        const router = useRouter();
        const { isLoggedIn } = useAuth();

        useEffect(() => {
            if (isLoggedIn) {
                router.push("/");
            }
        }, [isLoggedIn]);

        if (!isLoggedIn) {
            return <WrappedComponent {...props} />;
        }
        return null;
    };
};

export default withoutAuth;
