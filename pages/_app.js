import { ChakraProvider } from "@chakra-ui/react";
import AuthContextProvider from "features/auth/context";

function MyApp({ Component, pageProps }) {
    return (
        <ChakraProvider>
            <AuthContextProvider>
                <Component {...pageProps} />
            </AuthContextProvider>
        </ChakraProvider>
    );
}

export default MyApp;
