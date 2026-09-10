import sharp from "sharp";
import { fileURLToPath } from "node:url";

const root = fileURLToPath(
  new URL("../public/images/landing/", import.meta.url),
);
for (const [source, destination] of [
  ["pizza-cinema.png", "pizza-cutout.webp"],
  ["burger-clean.png", "burger-cutout.webp"],
]) {
  const { data, info } = await sharp(root + source)
    .ensureAlpha()
    .raw()
    .toBuffer({ resolveWithObject: true });
  for (let i = 0; i < data.length; i += 4) {
    const r = data[i],
      g = data[i + 1],
      b = data[i + 2];
    // Dark green studio backdrops are keyed out; warm food highlights remain untouched.
    const foreground = Math.max(r / 48, b / 82, g / 104);
    if (g > r * 1.12 && g > b * 1.06)
      data[i + 3] = Math.round(
        255 * Math.max(0, Math.min(1, (foreground - 0.5) / 0.5)),
      );
  }
  await sharp(data, {
    raw: { width: info.width, height: info.height, channels: 4 },
  })
    .webp({ quality: 88 })
    .toFile(root + destination);
}
console.log("Prepared transparent, optimized cinema assets");
