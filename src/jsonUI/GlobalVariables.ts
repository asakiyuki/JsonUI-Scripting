import { register } from "module";
import { CachedManager } from "../cached/Manager";
import { generateRandomName } from "./GenerateRandomName";

export class GlobalVariables {
    static register(
        variableObject: object | any
    ) {
        CachedManager.createGlobalVariables(variableObject);
    }
    static from(value: any, name_length?: number) {
        const name = generateRandomName(name_length);
        GlobalVariables.register({
            [name]: value
        } as any);
        return `$${name}`;
    }
}