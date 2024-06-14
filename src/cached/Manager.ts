import { JsonUIElement } from "../jsonUI/JsonUIElement";
import { JsonUIArrayName } from "../jsonUITypes/JsonUIArrayName";
import { JsonUIProperty } from "../jsonUITypes/JsonUIProperty";
import { objectForEach } from "../lib/ObjectForEach";
import ModifyReadJsonUIProperty from "../lib/ReadJsonUIProperty";

interface JsonUIObjectInterface {
    json: { [key: string]: any },
    modify: { [key: string]: any },
    global_variables: { [key: string]: any }
}

const jsonUIObject: JsonUIObjectInterface = {
    json: {},
    modify: {},
    global_variables: {}
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