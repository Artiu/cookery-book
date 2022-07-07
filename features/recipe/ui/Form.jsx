import {
    Button,
    Flex,
    FormControl,
    FormLabel,
    Input,
    InputGroup,
    InputRightElement,
    Textarea,
} from "@chakra-ui/react";
import { useState, useEffect, useRef } from "react";
import AvatarEditor from "react-avatar-editor";
import IngredientList from "./IngredientList";
import StepList from "./StepList";
import TagList from "./TagList";

const initialState = {
    title: "",
    description: "",
    ingredients: [],
    steps: [],
    tags: [],
    conclusion: "",
};

export default function Form({ initialData, cancel, onSubmit }) {
    const [formData, setFormData] = useState(
        initialData ? { ...initialState, ...initialData } : initialState
    );
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [ingredient, setIngredient] = useState("");
    const [step, setStep] = useState("");
    const [tag, setTag] = useState("");

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const addToTags = () => {
        if (!tag) return;
        setFormData({ ...formData, tags: [...formData.tags, tag] });
        setTag("");
    };

    const addToSteps = () => {
        if (!step) return;
        setFormData({ ...formData, steps: [...formData.steps, step] });
        setStep("");
    };
    const moveSteps = (newSteps) => {
        setFormData({ ...formData, steps: newSteps });
    };

    const addToIngredients = () => {
        if (!ingredient) return;
        setFormData({ ...formData, ingredients: [...formData.ingredients, ingredient] });
        setIngredient("");
    };

    const removeItemFromFormDataArray = (name, value) => {
        let array = formData[name];
        array = array.filter((item) => item !== value);
        setFormData({ ...formData, [name]: array });
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
                const imageData = imageEditorRef.current.getImage().toDataURL();
                await onSubmit({
                    ...formData,
                    image: imageData,
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
    const imageEditorRef = useRef();

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

    const containerRef = useRef();
    const [editorDimensions, setEditorDimensions] = useState({ width: 720, height: 380 });
    const updateEditorDimensions = () => {
        const containerWidth = containerRef.current?.clientWidth;
        if (containerWidth) {
            setEditorDimensions({ width: containerWidth, height: containerWidth * 0.53 });
        }
    };
    useEffect(() => {
        updateEditorDimensions();
        window.addEventListener("resize", updateEditorDimensions);
        return () => {
            window.removeEventListener("resize", updateEditorDimensions);
        };
    }, []);

    return (
        <form onSubmit={handleSubmit}>
            <Flex direction="column" gap="8px" ref={containerRef}>
                <FormControl isInvalid={false} isRequired>
                    <FormLabel>Nazwa przepisu</FormLabel>
                    <Input
                        name="title"
                        value={formData.title}
                        onChange={handleChange}
                        required={false}
                    />
                </FormControl>
                <FormControl>
                    <FormLabel>Tagi</FormLabel>
                    <InputGroup>
                        <Input value={tag} onChange={(e) => setTag(e.target.value)} pr="4.5rem" />
                        <InputRightElement width="4rem">
                            <Button onClick={addToTags}>Dodaj</Button>
                        </InputRightElement>
                    </InputGroup>
                </FormControl>
                <TagList
                    tags={formData.tags}
                    onCloseItem={(value) => removeItemFromFormDataArray("tags", value)}
                />
                {imagePreview && (
                    <AvatarEditor
                        image={imagePreview}
                        width={editorDimensions.width}
                        height={editorDimensions.height}
                        border={0}
                        ref={imageEditorRef}
                    />
                )}
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
                <IngredientList
                    ingredients={formData.ingredients}
                    removeItem={(item) => removeItemFromFormDataArray("ingredients", item)}
                />
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
                <StepList
                    steps={formData.steps}
                    removeItem={(item) => removeItemFromFormDataArray("steps", item)}
                    moveItem={moveSteps}
                />
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
