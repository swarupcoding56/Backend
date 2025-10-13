import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Go one level up if needed
const rootDir = path.join(__dirname, "..");

export default rootDir; // ✅ default export
