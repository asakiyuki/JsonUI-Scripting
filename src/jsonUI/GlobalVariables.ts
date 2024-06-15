import { CachedManager } from "../cached/Manager";
import { ReadProperty } from "../lib/ReadJsonUIProperty";

/**
 * A class to manage global variables.
 */
export class GlobalVariables {
    /**
     * Registers a global variable object.
     *
     * @param variableObject - The object containing global variables.
     * @remarks This method caches the global variables for later use.
     * @example
     * ```typescript
     * GlobalVariables.register({
     *     test: "Hello World"
     * }); // Output: { "$test": "Hello World!" }
     * ```
     */
    static register(
        variableObject: object | any
    ) {
        CachedManager.createGlobalVariables(variableObject);
    }

    /**
     * Creates a global variable reference string from a value.
     *
     * @param value - The value to create a global variable reference from.
     * @returns A string representing the global variable reference.
     * @remarks The returned string is in the format `$${variableName}`, where `variableName` is the obfuscated name of the global variable.
     * @example
     * ```typescript
     * GlobalVariables.from("Hello World"); // Output: "$a1b2c3d4e5f6g7h8i9j0k1l2"
     * GlobalVariables.from("Hello World"); // Output: "$a1b2c3d4e5f6g7h8i9j0k1l2"
     * ```
     */
    static from(value: any) {
        return `$${CachedManager.obfuscatorGlobalVariable(ReadProperty(value, true))}`;
    }
}