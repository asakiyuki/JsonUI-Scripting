import fs from "fs";
import { ElementCachedInterface } from "./Types";
import { JsonUIElement } from "./Element";

export class CachedManager {
    static toString(path: string, jsonData: object) {
        fs.writeFileSync(path, JSON.stringify(jsonData), "utf-8");
    }
    static data(JsonUIData: ElementCachedInterface) {
        const filePath = `.cached/${JsonUIData.namespace}.json`;
        if (!fs.existsSync('.cached')) fs.mkdirSync('.cached');
        if (!fs.existsSync(filePath)) fs.writeFileSync(filePath, JSON.stringify({ namespace: JsonUIData.namespace }), 'utf-8');
        const jsonData = JSON.parse(fs.readFileSync(filePath, 'utf-8'));
        if (JsonUIData.extend) jsonData[`${JsonUIData.name}@${JsonUIData.extend.namespace}.${JsonUIData.extend.name}`] = {
            type: JsonUIData.type
        }
        else jsonData[JsonUIData.name] = {
            type: JsonUIData.type
        };
        CachedManager.toString(filePath, jsonData);
    }
    static pushArray(element: ElementCachedInterface, name: string, value: any) {
        const jsonData = JSON.parse(fs.readFileSync(`.cached/${element.namespace}.json`, 'utf-8'));
        const parentItemObject = element.extend ? `${element.name}@${element.extend.namespace}.${element.extend.name}` : element.name;
        if (!jsonData[parentItemObject][name]) jsonData[parentItemObject][name] = [];
        jsonData[parentItemObject][name].push(value);
        CachedManager.toString(`.cached/${element.namespace}.json`, jsonData);
    }
    static setArray(element: ElementCachedInterface, name: string, value: any) {
        const jsonData = JSON.parse(fs.readFileSync(`.cached/${element.namespace}.json`, 'utf-8'));
        const parentItemObject = element.extend ? `${element.name}@${element.extend.namespace}.${element.extend.name}` : element.name;
        jsonData[parentItemObject][name] = value;
        CachedManager.toString(`.cached/${element.namespace}.json`, jsonData);
    }
    static createProperty(element: ElementCachedInterface, name: any, value?: any) {
        const jsonData = JSON.parse(fs.readFileSync(`.cached/${element.namespace}.json`, 'utf-8'));
        const parentItemObject = element.extend ? `${element.name}@${element.extend.namespace}.${element.extend.name}` : element.name;
        if (typeof name === 'string') jsonData[parentItemObject][`${name}`] = value
        else if (typeof name === 'object') for (const key of Object.keys(name)) jsonData[parentItemObject][`${key}`] = name[key];
        CachedManager.toString(`.cached/${element.namespace}.json`, jsonData);
    }
};