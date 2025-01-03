import fs from "fs";
import path from "path";

export function safeWriteFile(filePath: string, data: string) {
    const dir = path.dirname(filePath);

    if (!fs.existsSync(dir)) {
        fs.mkdirSync(dir, { recursive: true });
    }

    try {
        fs.writeFileSync(filePath, data, { encoding: "utf-8" });
        console.log(`File written: ${filePath}`);
    } catch (error) {
        console.error(`Error writing file: ${filePath}`, error);
    }
}
