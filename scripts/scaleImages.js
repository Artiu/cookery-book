import { ref, uploadString } from "firebase/storage";
import fs from "fs";
import { FIREBASE_STORAGE } from "../init/firebase.js";
import sharp from "sharp";

const toArrayBuffer = (buffer) => {
	const arrayBuffer = new ArrayBuffer(buffer.length);
	const view = new Uint8Array(arrayBuffer);
	for (let i = 0; i < buffer.length; ++i) {
		view[i] = buffer[i];
	}
	return arrayBuffer;
};

fs.readdirSync("./scripts/images").forEach(async (image) => {
	const buffer = fs.readFileSync(`./scripts/images/${image}`);

	await sharp(buffer)
		.resize(800, 422)
		.webp({ lossless: true })
		.toFile("./scripts/scaledImages/" + image.split(".")[0] + ".webp");
});
