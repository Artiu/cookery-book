import { useState } from "react";
import {
    Button,
    Center,
    Container,
    FormControl,
    FormErrorMessage,
    FormLabel,
    Input,
} from "@chakra-ui/react";
import { logInWithEmailAndPassword } from "init/firebase";

export default function LoginForm() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [showError, setShowError] = useState(false);
    const logIn = async (e) => {
        e.preventDefault();
        if (email && password) {
            const error = await logInWithEmailAndPassword(email, password);
            if (error) {
                setShowError(true);
            }
        }
    };
    return (
        <form onSubmit={logIn}>
            <Container>
                <Center>Zaloguj się</Center>
                <FormControl>
                    <FormLabel>Email</FormLabel>
                    <Input value={email} onChange={(e) => setEmail(e.target.value)} />
                </FormControl>
                <FormControl>
                    <FormLabel>Password</FormLabel>
                    <Input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                </FormControl>
                <FormControl isInvalid={showError}>
                    <FormErrorMessage>Email lub hasło jest nieprawidłowy!</FormErrorMessage>
                </FormControl>
                <Button type="submit">Zaloguj się</Button>
            </Container>
        </form>
    );
}
