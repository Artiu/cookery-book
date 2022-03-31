import { useState } from "react";
import { Button, Container, FormControl, FormLabel, Heading, Input } from "@chakra-ui/react";
import { FIREBASE_AUTH, logInWithEmailAndPassword } from "init/firebase";
import useMyToast from "shared/hooks/useMyToast";
import { signInWithEmailAndPassword } from "firebase/auth";

export default function LoginForm() {
    const toast = useMyToast();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const logIn = async (e) => {
        e.preventDefault();
        if (email && password) {
            try {
                await signInWithEmailAndPassword(FIREBASE_AUTH, email, password);
            } catch (err) {
                console.error(err);
                toast({
                    status: "error",
                    description: "Podany email lub hasło nie jest prawidłowe!",
                });
            }
        }
    };
    return (
        <form onSubmit={logIn} style={{ width: "fitContent" }}>
            <Container
                display="flex"
                flexDirection="column"
                gap="10px"
                shadow="lg"
                paddingBlock="20px"
            >
                <Heading textAlign="center" as="h1">
                    Zaloguj się
                </Heading>
                <FormControl>
                    <FormLabel>Email</FormLabel>
                    <Input value={email} onChange={(e) => setEmail(e.target.value)} />
                </FormControl>
                <FormControl>
                    <FormLabel>Hasło</FormLabel>
                    <Input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                </FormControl>
                <Button type="submit">Zaloguj się</Button>
            </Container>
        </form>
    );
}
