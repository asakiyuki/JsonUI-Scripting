import { register } from "module";
import { CachedManager } from "../cached/Manager";
import { generateRandomName } from "./GenerateRandomName";

export class GlobalVariables {
    static register(
        variableObject: object | any
    ) {
        CachedManager.createGlobalVariables(variableObject);
    }
    static from(value: any) {
        return `$${CachedManager.obfuscatorGlobalVariable(value)}`;
    }
}