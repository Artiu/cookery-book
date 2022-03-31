import {
    Button,
    Container,
    Flex,
    FormControl,
    FormLabel,
    Image,
    Input,
    InputGroup,
    InputRightElement,
    Textarea,
} from "@chakra-ui/react";
import { useState, useEffect, useRef } from "react";
import IngredientList from "./IngredientList";
import StepList from "./StepList";

const initialState = {
    title: "",
    description: "",
    ingredients: [],
    steps: [],
    conclusion: "",
};

export default function Form({ initialData, cancel, onSubmit }) {
    const [formData, setFormData] = useState(
        initialData ? { ...initialState, ...initialData } : initialState
    );
    const [ingredient, setIngredient] = useState("");
    const [step, setStep] = useState("");
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };
    const addToSteps = () => {
        if (!step) return;
        setFormData({ ...formData, steps: [...formData.steps, step] });
        setStep("");
    };
    const addToIngredients = () => {
        if (!ingredient) return;
        setFormData({ ...formData, ingredients: [...formData.ingredients, ingredient] });
        setIngredient("");
    };
    const isFieldsValid = () => {
        if (formData.ingredients.length === 0 || formData.steps.length === 0 || !formData.title) {
            return false;
        }
        return true;
    };
    const handleSubmit = async (e) => {
        e.preventDefault();
        if (isFieldsValid()) {
            setIsSubmitting(true);
            if (selectedFile) {
                await onSubmit({
                    ...formData,
                    image: selectedFile,
                    withImage: Boolean(imagePreview),
                });
            } else {
                await onSubmit({ ...formData, withImage: Boolean(imagePreview) });
            }
            setIsSubmitting(false);
        }
    };

    const [imagePreview, setImagePreview] = useState(initialData?.image);
    const [selectedFile, setSelectedFile] = useState(null);
    const fileInputRef = useRef();

    const handleChangeImage = (e) => {
        const [file] = e.target.files;
        setSelectedFile(file);
    };
    const removeImage = () => {
        setImagePreview(null);
        setSelectedFile(null);
        fileInputRef.current.value = "";
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
            <Flex direction="column" gap="8px">
                <FormControl isInvalid={false} isRequired>
                    <FormLabel>Nazwa przepisu</FormLabel>
                    <Input
                        name="title"
                        value={formData.title}
                        onChange={handleChange}
                        required={false}
                    />
                </FormControl>
                {imagePreview && <Image src={imagePreview} alt="Obraz potrawy" />}
                <Input
                    type="file"
                    onChange={handleChangeImage}
                    accept="image/*"
                    hidden={true}
                    ref={fileInputRef}
                />
                <Flex justifyContent="center" gap="5px">
                    <Button onClick={() => fileInputRef.current.click()}>
                        {imagePreview ? "Zmień" : "Dodaj"} zdjęcie
                    </Button>
                    {imagePreview && <Button onClick={removeImage}>Usuń zdjęcie</Button>}
                </Flex>
                <FormControl>
                    <FormLabel>Opis</FormLabel>
                    <Textarea
                        name="description"
                        value={formData.description}
                        onChange={handleChange}
                    />
                </FormControl>
                <FormControl isInvalid={false} isRequired>
                    <FormLabel>Składniki</FormLabel>
                    <InputGroup>
                        <Input
                            value={ingredient}
                            onChange={(e) => setIngredient(e.target.value)}
                            required={false}
                            pr="4.5rem"
                        />
                        <InputRightElement width="4rem">
                            <Button onClick={addToIngredients}>Dodaj</Button>
                        </InputRightElement>
                    </InputGroup>
                </FormControl>
                <IngredientList ingredients={formData.ingredients} />
                <FormControl isInvalid={false} isRequired>
                    <FormLabel>Kroki</FormLabel>
                    <InputGroup>
                        <Input
                            value={step}
                            onChange={(e) => setStep(e.target.value)}
                            required={false}
                            pr="4.5rem"
                        />
                        <InputRightElement width="4rem">
                            <Button onClick={addToSteps}>Dodaj</Button>
                        </InputRightElement>
                    </InputGroup>
                </FormControl>
                <StepList steps={formData.steps} />
                <FormControl>
                    <FormLabel>Podsumowanie</FormLabel>
                    <Textarea
                        name="conclusion"
                        value={formData.conclusion}
                        onChange={handleChange}
                    />
                </FormControl>
                <Button onClick={cancel}>Anuluj</Button>
                <Button type="submit" disabled={!isFieldsValid()} isLoading={isSubmitting}>
                    Zapisz
                </Button>
            </Flex>
        </form>
    );
}
