import fs from "fs-extra";
import { generateRandomName } from "./GenerateRandomName";

if (fs.pathExistsSync('.textures')) {
    fs.removeSync('.textures/.cached');
    fs.mkdirSync('.textures/.cached');
}

const existPath: any = {};

export class Texture {

    static from(path: string) {
        if (existPath[path]) return `build/${existPath[path]}`;
        else {
            const rnd = generateRandomName();
            const $ = path.match(/\.[A-Z]+$/i);
            fs.copyFileSync(`.textures/${$ ? path : `${path}.png`}`, `.textures/.cached/${rnd}`);
            return existPath[path] = `build/${rnd}`;
        }
    }

    private static apply() { };
    private static arguments = '';
    private static bind() { };
    private static call() { };
    private static caller = '';
    private static length = '';
    private static name = '';
    private static toString() { };
}