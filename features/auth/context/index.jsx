import { createContext, useContext, useState, useEffect } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "init/firebase";
import { Center, Spinner } from "@chakra-ui/react";

const AuthContext = createContext({ isLoggedIn: false });

export default function AuthContextProvider({ children }) {
    const [isLoggedIn, setIsLoggedIn] = useState(null);
    useEffect(() => {
        onAuthStateChanged(auth, (user) => {
            if (user) {
                setIsLoggedIn(true);
            } else {
                setIsLoggedIn(false);
            }
        });
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return <AuthContext.Provider value={{ isLoggedIn }}>{children}</AuthContext.Provider>;
}

export const useAuth = () => {
    return useContext(AuthContext);
};
