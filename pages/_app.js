import { ChakraProvider, extendTheme } from "@chakra-ui/react";
import AuthContextProvider from "features/auth/context";
import { AnimatePresence } from "framer-motion";
import { mode } from "@chakra-ui/theme-tools";

const theme = extendTheme({
    styles: {
        global: (props) => ({
            body: {
                bg: mode("cyan.50", "teal.100")(props),
            },
        }),
    },
});

function MyApp({ Component, pageProps }) {
    return (
        <ChakraProvider theme={theme}>
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
