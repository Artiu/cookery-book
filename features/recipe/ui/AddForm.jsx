import RecipeForm from "features/recipe/ui/Form";
import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import { ref, uploadBytes, uploadString } from "firebase/storage";
import { FIRESTORE, FIREBASE_STORAGE } from "init/firebase";
import { useRouter } from "next/router";
import useMyToast from "shared/hooks/useMyToast";
import { revalidate } from "shared/revalidate";

export default function AddForm() {
	const router = useRouter();
	const toast = useMyToast();
	const addRecipe = async (data) => {
		const image = data.image;
		delete data.image;
		try {
			const docRef = await addDoc(collection(FIRESTORE, "recipes"), {
				...data,
				timestamp: serverTimestamp(),
			});
			if (image) {
				try {
					await uploadString(
						ref(FIREBASE_STORAGE, `images/${docRef.id}.webp`),
						image,
						"data_url"
					);
				} catch (err) {
					console.error(err);
				}
			}
			await revalidate("/");
			toast({
				status: "success",
				description: "Pomyślnie dodano nowy przepis!",
			});
			router.push(`/recipe/${docRef.id}`);
		} catch {
			toast({
				status: "error",
				description: "Coś poszło nie tak!",
			});
		}
	};
	return <RecipeForm cancel={() => router.back()} onSubmit={addRecipe} />;
}
