import { CachedManager } from "../../CachedJsonUI";
import { JsonUIElement } from "../../Element";
import { JsonUIArrayName } from "../Types";

export class ScreenCommon {
    private screenJson: any;
    constructor(private modifyElement: string, private screenFiles: string) {
        CachedManager.createDirSync(['.cached', '.cached/ui']);
        this.screenJson = CachedManager.readJson(`.cached/ui/${screenFiles}.json`);
        this.screenJson = {
            [modifyElement]: {
                modifications: []
            }
        };
        CachedManager.toString(`.cached/ui/${screenFiles}.json`, this.screenJson);
    }
    modifyExtend(name: string, namespace: string) {
        this.screenJson = CachedManager.readJson(`.cached/ui/${this.screenFiles}.json`);
        const screenData = this.screenJson[`${this.modifyElement}`];
        delete this.screenJson[`${this.modifyElement}`];
        this.modifyElement = `${this.modifyElement}@${namespace}.${name}`;
        this.screenJson[this.modifyElement] = screenData;
        CachedManager.toString(`.cached/ui/${this.screenFiles}.json`, this.screenJson);
        return this;
    }
    modifyProperty(data: any) {
        this.screenJson = CachedManager.readJson(`.cached/ui/${this.screenFiles}.json`);
        for (const key of Object.keys(data))
            this.screenJson[this.modifyElement][key] = data[key];
        CachedManager.toString(`.cached/ui/${this.screenFiles}.json`, this.screenJson);
        return this;
    }
    insertBack(data: JsonUIElement, arrayName: JsonUIArrayName, name?: string, variables?: object | any) {
        this.screenJson = CachedManager.readJson(`.cached/ui/${this.screenFiles}.json`);
        const screenData = this.screenJson[`${this.modifyElement}`];
        for (const key of Object.keys(variables ?? {})) {
            variables[`$${key}`] = variables[key];
            delete variables[key];
        }
        screenData.modifications.push({
            array_name: arrayName,
            operation: "insert_back",
            value: [{ [`${name ?? data.jsonUIData.name}@${data.jsonUIData.namespace}.${data.jsonUIData.name}`]: variables ?? {} }]
        });
        CachedManager.toString(`.cached/ui/${this.screenFiles}.json`, this.screenJson);
        return this;
    }
}