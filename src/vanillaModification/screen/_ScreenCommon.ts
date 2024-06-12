import { CachedManager } from "../../CachedJsonUI";
import { Color, JsonUIElement, generateRandomName } from "../../Element";
import ReadJsonUIPropertyValue from "../../ReadProperty";
import { BindingInterface, ButtonMapping, GetJsonUIGenerateName, GetJsonUIGenerateNameScreenCommon, JsonUIArrayName, JsonUIProperty } from "../../Types";

export class ScreenCommon {
    private screenJson: any;
    private insertPos: string[] = [];
    constructor(private modifyElement: string, private screenFiles: string) {
        CachedManager.createDirSync(['.cached', '.cached/ui']);
        this.screenJson = CachedManager.readJson(`.cached/ui/${screenFiles}.json`);
        this.screenJson = { ...this.screenJson, [modifyElement]: {} }
        CachedManager.toString(`.cached/ui/${screenFiles}.json`, this.screenJson);
        delete this.screenJson;
    }
    modifyExtend(extentElement: string | JsonUIElement) {
        this.screenJson = CachedManager.readJson(`.cached/ui/${this.screenFiles}.json`);
        const bak = Object.assign(this.screenJson[this.modifyElement]);
        delete this.screenJson[this.modifyElement];
        this.modifyElement = `${this.modifyElement}@${extentElement instanceof JsonUIElement ? extentElement.getElementPath().slice(1) : extentElement}`
        this.screenJson = { ...this.screenJson, [`${this.modifyElement}`]: bak };
        CachedManager.toString(`.cached/ui/${this.screenFiles}.json`, this.screenJson);
        delete this.screenJson;
        return this;
    }

    insertBack(data: JsonUIElement | JsonUIProperty | ButtonMapping | BindingInterface | string, insertArray: JsonUIArrayName, elementProperty?: JsonUIProperty, elementName?: string | null, callback?: GetJsonUIGenerateNameScreenCommon) {
        return this.modifyInsert(data, insertArray, 'insert_back', elementProperty, elementName, callback);
    }
    insertFront(data: JsonUIElement | JsonUIProperty | ButtonMapping | BindingInterface | string, insertArray: JsonUIArrayName, elementProperty?: JsonUIProperty, elementName?: string | null, callback?: GetJsonUIGenerateNameScreenCommon) {
        return this.modifyInsert(data, insertArray, 'insert_front', elementProperty, elementName, callback);
    }
    insertAfter(data: JsonUIElement | JsonUIProperty | ButtonMapping | BindingInterface | string, insertArray: JsonUIArrayName, elementProperty?: JsonUIProperty, elementName?: string | null, callback?: GetJsonUIGenerateNameScreenCommon) {
        return this.modifyInsert(data, insertArray, 'insert_after', elementProperty, elementName, callback);
    }
    insertBefore(data: JsonUIElement | JsonUIProperty | ButtonMapping | BindingInterface | string, insertArray: JsonUIArrayName, elementProperty?: JsonUIProperty, elementName?: string | null, callback?: GetJsonUIGenerateNameScreenCommon) {
        return this.modifyInsert(data, insertArray, 'insert_before', elementProperty, elementName, callback);
    }

    setProperty(property: JsonUIProperty) {
        if (property?.anchor) {
            property.anchor_from = property.anchor;
            property.anchor_to = property.anchor;
            delete property.anchor
        }
        const k: any = {};
        for (const key of Object.keys(property))
            k[key] = ReadJsonUIPropertyValue((property as any)[key])
        this.screenJson = CachedManager.readJson(`.cached/ui/${this.screenFiles}.json`);
        this.screenJson[this.modifyElement] = {
            ...this.screenJson[this.modifyElement],
            ...k
        }
        CachedManager.toString(`.cached/ui/${this.screenFiles}.json`, this.screenJson);
        delete this.screenJson;
        return this
    }

    private modifyInsert(data: any, insertArray: JsonUIArrayName, insertType: string, elementProperty?: JsonUIProperty | any, elementName?: string | null, callback?: GetJsonUIGenerateNameScreenCommon) {
        if (elementProperty?.anchor) {
            elementProperty.anchor_from = elementProperty.anchor;
            elementProperty.anchor_to = elementProperty.anchor;
            delete elementProperty.anchor
        }
        const e = elementName ?? generateRandomName();
        callback?.(this, e);
        this.screenJson = CachedManager.readJson(`.cached/ui/${this.screenFiles}.json`);
        if (elementProperty)
            for (const key in elementProperty)
                elementProperty[key] = ReadJsonUIPropertyValue(elementProperty[key]);
        const element: any = (typeof data === "object") ? ((data instanceof JsonUIElement) ? { [`${e}${data.getElementPath()}`]: { ...elementProperty } } : data) : { [data]: { ...elementProperty } };
        if (!this.screenJson[this.modifyElement].modifications) this.screenJson[this.modifyElement].modifications = [];
        if (this.insertPos.includes(`${insertType}:${insertArray}`))
            this.screenJson[this.modifyElement].modifications[this.insertPos.indexOf(`${insertType}:${insertArray}`)].value.push(element);
        else {
            this.insertPos.push(`${insertType}:${insertArray}`);
            this.screenJson[this.modifyElement].modifications.push({
                array_name: insertArray,
                operation: insertType,
                value: [element]
            })
        }
        CachedManager.toString(`.cached/ui/${this.screenFiles}.json`, this.screenJson);
        delete this.screenJson;
        return this;
    }
}