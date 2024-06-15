import { CachedManager } from "../cached/Manager";
import { ReadProperty } from "../lib/ReadJsonUIProperty";

export class GlobalVariables {
    static register(
        variableObject: object | any
    ) {
        CachedManager.createGlobalVariables(variableObject);
    }
    static from(value: any) {
        return `$${CachedManager.obfuscatorGlobalVariable(ReadProperty(value, true))}`;
    }
}