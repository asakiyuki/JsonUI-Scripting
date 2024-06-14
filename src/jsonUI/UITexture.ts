import fs from "fs-extra";

export class UITexture {
    constructor(directory_path: string) {
        fs.cpSync(directory_path, '.cached/textures/', { recursive: true });
    }
}