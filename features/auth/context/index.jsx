import { createContext, useContext, useState, useEffect } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "init/firebase";

const AuthContext = createContext({ isLoggedIn: false });

export default function AuthContextProvider({ children }) {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    useEffect(() => {
        const wasLoggedIn = localStorage.getItem("wasLoggedIn");
        setIsLoggedIn(wasLoggedIn === "true");
        onAuthStateChanged(auth, (user) => {
            if (user) {
                setIsLoggedIn(true);
            } else {
                setIsLoggedIn(false);
            }
        });
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    useEffect(() => {
        localStorage.setItem("wasLoggedIn", String(isLoggedIn));
    }, [isLoggedIn]);

    return <AuthContext.Provider value={{ isLoggedIn }}>{children}</AuthContext.Provider>;
}

export const useAuth = () => {
    return useContext(AuthContext);
};
