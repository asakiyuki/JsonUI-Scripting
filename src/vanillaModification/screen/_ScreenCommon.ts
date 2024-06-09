import { CachedManager } from "../../CachedJsonUI";
import { JsonUIElement } from "../../Element";
import { ModifyObjectType } from "../../Types";
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
    insertBack(data: ModifyObjectType, arrayName: JsonUIArrayName, name?: string, variables?: object | any) {
        this.__jhdfasf12eisafjakhf__("insert_back", data, arrayName, name, variables);
    }
    insertFront(data: ModifyObjectType, arrayName: JsonUIArrayName, name?: string, variables?: object | any) {
        this.__jhdfasf12eisafjakhf__("insert_front", data, arrayName, name, variables);
    }
    insertAfter(data: ModifyObjectType, arrayName: JsonUIArrayName, name?: string, variables?: object | any) {
        this.__jhdfasf12eisafjakhf__("insert_after", data, arrayName, name, variables);
    }
    insertBefore(data: ModifyObjectType, arrayName: JsonUIArrayName, name?: string, variables?: object | any) {
        this.__jhdfasf12eisafjakhf__("insert_before", data, arrayName, name, variables);
    }
    moveBack(data: ModifyObjectType, arrayName: JsonUIArrayName, name?: string, variables?: object | any) {
        this.__jhdfasf12eisafjakhf__("move_back", data, arrayName, name, variables);
    }
    moveFront(data: ModifyObjectType, arrayName: JsonUIArrayName, name?: string, variables?: object | any) {
        this.__jhdfasf12eisafjakhf__("move_front", data, arrayName, name, variables);
    }
    moveAfter(data: ModifyObjectType, arrayName: JsonUIArrayName, name?: string, variables?: object | any) {
        this.__jhdfasf12eisafjakhf__("move_after", data, arrayName, name, variables);
    }
    moveBefore(data: ModifyObjectType, arrayName: JsonUIArrayName, name?: string, variables?: object | any) {
        this.__jhdfasf12eisafjakhf__("move_before", data, arrayName, name, variables);
    }
    private __jhdfasf12eisafjakhf__(asfasf2: any, data: any, arrayName: JsonUIArrayName, name?: string, variables?: object | any) {
        this.screenJson = CachedManager.readJson(`.cached/ui/${this.screenFiles}.json`);
        const screenData = this.screenJson[`${this.modifyElement}`];
        for (const key of Object.keys(variables ?? {})) {
            variables[`$${key}`] = variables[key];
            delete variables[key];
        }
        screenData.modifications.push((data.jsonUIData as any) ? {
            array_name: arrayName,
            operation: asfasf2,
            value: [{ [`${name ?? data.jsonUIData.name}@${data.jsonUIData.namespace}.${data.jsonUIData.name}`]: variables ?? {} }]
        } : data);
        CachedManager.toString(`.cached/ui/${this.screenFiles}.json`, this.screenJson);
        return this;
    }
}