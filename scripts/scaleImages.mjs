import fs from "fs";
import sharp from "sharp";

fs.readdirSync("./scripts/images").forEach(async (image) => {
	const buffer = fs.readFileSync(`./scripts/images/${image}`);

	await sharp(buffer)
		.resize(800, 422)
		.webp({ lossless: true })
		.toFile("./scripts/scaledImages/" + image.split(".")[0] + ".webp");
});
