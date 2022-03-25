import {
    Button,
    Container,
    FormControl,
    FormLabel,
    Image,
    Input,
    InputGroup,
    InputRightElement,
    RequiredIndicator,
    Textarea,
} from "@chakra-ui/react";
import { useState, useEffect } from "react";
import IngredientList from "./IngredientList";
import StepList from "./StepList";

const initialState = {
    image: "",
    title: "",
    description: "",
    ingredients: [],
    steps: [],
    conclusion: "",
};

export default function RecipeForm({ initialData, onSubmit }) {
    const [formData, setFormData] = useState(
        initialData ? { ...initialState, ...initialData } : initialState
    );
    const [invalidFields, setInvalidFields] = useState([]);
    const [ingredient, setIngredient] = useState("");
    const [step, setStep] = useState("");

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };
    const addToArray = (name, value) => {
        if (!value) return;
        setFormData({ ...formData, [name]: [...formData[name], value] });
    };
    const isFieldsValid = () => {
        if (formData.ingredients.length === 0 || formData.steps.length === 0 || !formData.title) {
            return false;
        }
        return true;
    };
    const handleSubmit = (e) => {
        e.preventDefault();
        onSubmit(formData);
    };

    const [imagePreview, setImagePreview] = useState(null);
    const [selectedFile, setSelectedFile] = useState(null);

    const handleChangeImage = (e) => {
        const [file] = e.target.files;
        setSelectedFile(file);
    };
    useEffect(() => {
        if (!selectedFile) {
            return;
        }
        const url = URL.createObjectURL(selectedFile);
        setImagePreview(url);

        return () => URL.revokeObjectURL(url);
    }, [selectedFile]);
    return (
        <form onSubmit={handleSubmit}>
            <Container>
                <FormControl isInvalid={false} isRequired>
                    <FormLabel>Nazwa przepisu</FormLabel>
                    <Input
                        name="title"
                        value={formData.title}
                        onChange={handleChange}
                        required={false}
                    />
                </FormControl>
                {imagePreview ? (
                    <Image src={imagePreview} />
                ) : (
                    <Input type="file" onChange={handleChangeImage} accept="image/*" />
                )}
                <FormControl>
                    <FormLabel>Opis</FormLabel>
                    <Textarea
                        name="description"
                        value={formData.description}
                        onChange={handleChange}
                    />
                </FormControl>
                <FormControl isInvalid={invalidFields.includes("ingredients")} isRequired>
                    <FormLabel>Składniki</FormLabel>
                    <InputGroup>
                        <Input
                            value={ingredient}
                            onChange={(e) => setIngredient(e.target.value)}
                            required={false}
                        />
                        <InputRightElement>
                            <Button onClick={() => addToArray("ingredients", ingredient)}>
                                Dodaj
                            </Button>
                        </InputRightElement>
                    </InputGroup>
                    <IngredientList ingredients={formData.ingredients} />
                </FormControl>
                <FormControl isInvalid={invalidFields.includes("steps")} isRequired>
                    <FormLabel>Kroki</FormLabel>
                    <InputGroup>
                        <Input
                            value={step}
                            onChange={(e) => setStep(e.target.value)}
                            required={false}
                        />
                        <InputRightElement>
                            <Button onClick={() => addToArray("steps", step)}>Dodaj</Button>
                        </InputRightElement>
                    </InputGroup>
                    <StepList steps={formData.steps} />
                </FormControl>
                <FormControl>
                    <FormLabel>Podsumowanie</FormLabel>
                    <Textarea
                        name="conclusion"
                        value={formData.conclusion}
                        onChange={handleChange}
                    />
                </FormControl>
                <Button type="submit" disabled={!isFieldsValid()}>
                    Zapisz
                </Button>
            </Container>
        </form>
    );
}
