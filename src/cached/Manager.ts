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
    global_variables_arr: [string[], string[]]
}

const jsonUIObject: JsonUIObjectInterface = {
    json: {},
    modify: {},
    global_variables: {},
    global_variables_arr: [[], []],
};

export class CachedManager {
    static register(key: string, namespace: string, value: any) {
        jsonUIObject.json[namespace] = {
            namespace,
            ...jsonUIObject.json[namespace],
            [key]: value
        };
    };
    static createElement(data: JsonUIElement, namespace: string, property: JsonUIProperty) {
        CachedManager.register(data.getElementJsonUIKey(), namespace, property);
    }
    static setElementProperty(data: JsonUIElement, namespace: string, property: JsonUIProperty) {
        jsonUIObject.json[namespace][data.getElementJsonUIKey()] = {
            ...jsonUIObject.json[namespace][data.getElementJsonUIKey()],
            ...ModifyReadJsonUIProperty(property),
        }
    }
    static createGlobalVariables(
        data: object
    ) {
        objectForEach(data, (v, k) => {
            (data as any)[`$${k}`] = v;
            delete (data as any)[k];
        })
        jsonUIObject.global_variables = ModifyReadJsonUIProperty({
            ...jsonUIObject.global_variables,
            ...data
        });
    }
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

    static insertArray(arrayName: JsonUIArrayName, data: JsonUIElement, namespace: string, value: object) {
        jsonUIObject.json[namespace][data.getElementJsonUIKey()][arrayName] = [
            ...jsonUIObject.json[namespace][data.getElementJsonUIKey()][arrayName] ?? [],
            value
        ]
    }
    static getJsonUICode() {
        return jsonUIObject;
    }
};