import { generateRandomName } from "../jsonUI/GenerateRandomName";
import { JsonUIElement } from "../jsonUI/JsonUIElement";
import { JsonUIArrayName } from "../jsonUITypes/JsonUIArrayName";
import { JsonUIProperty } from "../jsonUITypes/JsonUIProperty";
import { objectForEach } from "../lib/ObjectForEach";
import ModifyReadJsonUIProperty, { ReadProperty } from "../lib/ReadJsonUIProperty";

interface JsonUIObjectInterface {
    json: { [key: string]: any },
    modify: { [key: string]: any },
    global_variables: { [key: string]: any },
    global_variables_arr: [string[], string[]],
    sounds: { [key: string]: string | string[] }
}

const jsonUIObject: JsonUIObjectInterface = {
    json: {},
    modify: {},
    global_variables: {},
    global_variables_arr: [[], []],
    sounds: {}
};

/**
 * A class to manage cached data for JSON UI generation.
 */
export class CachedManager {
    static getJsonUIObject() {
        return jsonUIObject;
    }
    static debugUI(namespace: string, key: string, isModify?: boolean) {
        return JSON.stringify({ [key]: jsonUIObject[isModify ? "modify" : "json"][namespace][key] }, null, 2);
    }
    static addSound(id: string, path: string | string[]) {
        jsonUIObject.sounds[id] = path;
    }
    /**
     * Registers an initial element for a specific screen file.
     * @param init_element - The name of the initial element.
     * @param screen_file - The name of the screen file.
     */
    static screenInitRegister(init_element: string, screen_file: string) {
        jsonUIObject.modify[screen_file] = {
            ...jsonUIObject.modify[screen_file],
            [init_element]: {}
        }
    }

    /**
     * Reads the initial element for a specific screen file.
     * @param init_element - The name of the initial element.
     * @param screen_file - The name of the screen file.
     * @returns The initial element data.
     */
    static readInitElement(init_element: string, screen_file: string) {
        return jsonUIObject.modify[screen_file][init_element] || {};
    }

    /**
     * Writes the initial element for a specific screen file.
     * @param init_element - The name of the initial element.
     * @param screen_file - The name of the screen file.
     * @param value - The value to be written.
     */
    static writeInitElement(init_element: string, screen_file: string, value: any) {
        jsonUIObject.modify[screen_file][init_element] = {
            ...jsonUIObject.modify[screen_file][init_element],
            ...value
        };
    }

    static removeInitElement(init_element: string, screen_file: string) {
        delete jsonUIObject.modify[screen_file][init_element];
    }

    /**
     * Registers a key-value pair in the JSON UI object.
     * @param key - The key to be registered.
     * @param namespace - The namespace for the key.
     * @param value - The value to be registered.
     */
    static register(key: string, namespace: string, value: any) {
        jsonUIObject.json[namespace] = {
            ...jsonUIObject.json[namespace],
            [key]: value
        };
    }

    /**
     * Creates an element in the JSON UI object.
     * @param data - The data for the element.
     * @param namespace - The namespace for the element.
     * @param property - The property of the element.
     */
    static createElement(data: JsonUIElement, namespace: string, property: JsonUIProperty) {
        CachedManager.register((<any>data).getElementJsonUIKey(true), namespace, property);
    }

    /**
     * Sets the property of an element in the JSON UI object.
     * @param data - The data for the element.
     * @param namespace - The namespace for the element.
     * @param property - The property of the element.
     */
    static setElementProperty(data: JsonUIElement, namespace: string, property: JsonUIProperty) {
        jsonUIObject.json[namespace][data.getElementJsonUIKey()] = {
            type: jsonUIObject.json[namespace][data.getElementJsonUIKey()].type,
            ...ModifyReadJsonUIProperty(property)
        };
    }

    /**
     * Creates global variables in the JSON UI object.
     * @param data - The data for the global variables.
     */
    static createGlobalVariables(data: object) {
        objectForEach(data, (v, k) => {
            (data as any)[`$${k}`] = v;
            delete (data as any)[k];
        })
        jsonUIObject.global_variables = ModifyReadJsonUIProperty({
            ...jsonUIObject.global_variables,
            ...data
        });
    }

    /**
     * Obfuscates a global variable in the JSON UI object.
     * @param value - The value of the global variable.
     * @returns The obfuscated name of the global variable.
     */
    static obfuscatorGlobalVariable(value: any) {
        value = ReadProperty(value);
        const valueStringify = JSON.stringify(value),
            isObject = typeof value === 'object';

        const index = jsonUIObject.global_variables_arr[1].findIndex((v) => isObject ? JSON.stringify(v) === valueStringify : v === value);

        if (index === -1) {
            const name = generateRandomName();
            jsonUIObject.global_variables_arr[1].push(value);
            jsonUIObject.global_variables_arr[0].push(name);
            return name;
        } else return jsonUIObject.global_variables_arr[0][index];
    }

    /**
     * Inserts an item into an array in the JSON UI object.
     * @param arrayName - The name of the array.
     * @param data - The data for the item.
     * @param namespace - The namespace for the item.
     * @param value - The value of the item.
     */
    static insertArray(arrayName: JsonUIArrayName, data: JsonUIElement, namespace: string, value: object | string) {
        jsonUIObject.json[namespace][data.getElementJsonUIKey()][arrayName] = [
            ...jsonUIObject.json[namespace][data.getElementJsonUIKey()][arrayName] || [],
            value
        ]
    }

    static getSpecialProperty(data: JsonUIElement, namespace: string) {
        const v = jsonUIObject.json[namespace][data.getElementJsonUIKey()];
        return {
            controls: v.controls,
            variables: v.variables,
            bindings: v.bindings,
            button_mappings: v.button_mappings,
            anims: v.anims
        };
    }

    static insertProperty(propertyName: string, data: JsonUIElement, namespace: string, value: object) {
        const json = jsonUIObject.json[namespace][data.getElementJsonUIKey()];
        json[propertyName] = {
            ...json[propertyName],
            ...value
        }
    }

    /**
     * Retrieves the JSON UI code from the cached object.
     * @returns The JSON UI code.
     */
    static getJsonUICode() {
        return jsonUIObject;
    }
};