import { CachedManager } from "../../CachedJsonUI";
import { Color, JsonUIElement } from "../../Element";
import { JsonUIArrayName, JsonUIProperty } from "../../Types";

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

    insertBack(data: JsonUIElement | string | Object, insertArray: JsonUIArrayName, elementName?: string) {
        return this.modifyInsert(data, insertArray, 'insert_back', elementName);
    }
    insertFront(data: JsonUIElement | string | Object, insertArray: JsonUIArrayName, elementName?: string) {
        return this.modifyInsert(data, insertArray, 'insert_front', elementName);
    }
    insertAfter(data: JsonUIElement | string | Object, insertArray: JsonUIArrayName, elementName?: string) {
        return this.modifyInsert(data, insertArray, 'insert_after', elementName);
    }
    insertBefore(data: JsonUIElement | string | Object, insertArray: JsonUIArrayName, elementName?: string) {
        return this.modifyInsert(data, insertArray, 'insert_before', elementName);
    }

    setProperty(property: JsonUIProperty) {
        const k: any = {};
        for (const key of Object.keys(property)) {
            const $ = (property as any)[key];
            k[key] = ($ instanceof Array && typeof $[0] === "string" && $[0][0] === "#") ? Color.parse($[0].slice(1)) : $;
        }
        this.screenJson = CachedManager.readJson(`.cached/ui/${this.screenFiles}.json`);
        this.screenJson[this.modifyElement] = {
            ...this.screenJson[this.modifyElement],
            ...k
        }
        CachedManager.toString(`.cached/ui/${this.screenFiles}.json`, this.screenJson);
        delete this.screenJson;
        return this
    }

    private modifyInsert(data: any, insertArray: JsonUIArrayName, insertType: string, elementName?: string) {
        this.screenJson = CachedManager.readJson(`.cached/ui/${this.screenFiles}.json`);
        const element: any = (typeof data === "object") ? ((data instanceof JsonUIElement) ? { [`${elementName ?? data.jsonUIData.name}${data.getElementPath()}`]: {} } : data) : { [data]: {} };
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