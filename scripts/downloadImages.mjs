import { ref, listAll, getBytes } from "firebase/storage";
import { FIREBASE_STORAGE } from "../init/firebase.js";
import fs from "fs";

const listRef = ref(FIREBASE_STORAGE, "images");
const allImages = await listAll(listRef);
allImages.items.forEach(async (image) => {
	const bytes = await getBytes(image);
	fs.writeFileSync(`./scripts/images/${image.name}.png`, Buffer.from(bytes));
});
