import { ChakraProvider } from "@chakra-ui/react";
import AuthContextProvider from "features/auth/context";
import { AnimatePresence } from "framer-motion";

function MyApp({ Component, pageProps }) {
    return (
        <ChakraProvider>
            <AuthContextProvider>
                <AnimatePresence
                    exitBeforeEnter
                    initial={false}
                    onExitComplete={() => window.scrollTo(0, 0)}
                >
                    <Component {...pageProps} />
                </AnimatePresence>
            </AuthContextProvider>
        </ChakraProvider>
    );
}

export default MyApp;
