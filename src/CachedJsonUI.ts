import fs from "fs";
import { ElementCachedInterface } from "./Types";

export class CachedManager {
    static toString(path: string, jsonData: object) {
        fs.writeFileSync(path, JSON.stringify(jsonData), "utf-8");
    }
    static data(JsonUIData: ElementCachedInterface | any, isAnimation: boolean = false) {
        const filePath = `.cached/ui/build${isAnimation ? "/anims" : ""}/${JsonUIData.namespace}.json`;
        if (!fs.existsSync('.cached')) fs.mkdirSync('.cached');
        if (!fs.existsSync('.cached/ui')) fs.mkdirSync('.cached/ui');
        if (!fs.existsSync('.cached/ui/build')) fs.mkdirSync('.cached/ui/build');
        if (!fs.existsSync('.cached/ui/build/anims')) fs.mkdirSync('.cached/ui/build/anims');
        if (!fs.existsSync(filePath)) fs.writeFileSync(filePath, JSON.stringify({ namespace: JsonUIData.namespace }), 'utf-8');
        if (!fs.existsSync('.cached/ui/_ui_defs.json')) fs.writeFileSync(`.cached/ui/_ui_defs.json`, JSON.stringify({ ui_defs: [] }), 'utf-8');
        if (!fs.existsSync('.cached/ui/_global_variables.json')) fs.writeFileSync(`.cached/ui/_global_variables.json`, "{}", 'utf-8');
        const jsonDef: any = JSON.parse(fs.readFileSync('.cached/ui/_ui_defs.json', 'utf-8'));
        if (!jsonDef['ui_defs'].includes(`ui/build${isAnimation ? "/anims" : ""}/${JsonUIData.namespace}.json`)) jsonDef['ui_defs'].push(`ui/build/${JsonUIData.namespace}.json`);
        const jsonData = JSON.parse(fs.readFileSync(filePath, 'utf-8'));
        if ((JsonUIData as any).anim_name) for (const key of Object.keys(JsonUIData.data)) jsonData[key] = JsonUIData.data[key]
        else jsonData[(JsonUIData as any).extend ? `${(JsonUIData as any).name}@${(JsonUIData as any).extend.namespace}.${(JsonUIData as any).extend.name}` : (JsonUIData as any).name] = { type: (JsonUIData as any).type };
        CachedManager.toString('.cached/ui/_ui_defs.json', jsonDef);
        CachedManager.toString(filePath, jsonData);
    }
    static pushArray(element: ElementCachedInterface, name: string, value: any) {
        const jsonData = JSON.parse(fs.readFileSync(`.cached/ui/build/${element.namespace}.json`, 'utf-8'));
        const parentItemObject = element.extend ? `${element.name}@${element.extend.namespace}.${element.extend.name}` : element.name;
        if (!jsonData[parentItemObject][name]) jsonData[parentItemObject][name] = [];
        jsonData[parentItemObject][name].push(value);
        CachedManager.toString(`.cached/ui/build/${element.namespace}.json`, jsonData);
    }
    static setArray(element: ElementCachedInterface, name: string, value: any) {
        const jsonData = JSON.parse(fs.readFileSync(`.cached/ui/build/${element.namespace}.json`, 'utf-8'));
        const parentItemObject = element.extend ? `${element.name}@${element.extend.namespace}.${element.extend.name}` : element.name;
        jsonData[parentItemObject][name] = value;
        CachedManager.toString(`.cached/ui/build/${element.namespace}.json`, jsonData);
    }
    static createProperty(element: ElementCachedInterface, name: any, value?: any) {
        const jsonData = JSON.parse(fs.readFileSync(`.cached/ui/build/${element.namespace}.json`, 'utf-8'));
        const parentItemObject = element.extend ? `${element.name}@${element.extend.namespace}.${element.extend.name}` : element.name;
        if (typeof name === 'string') jsonData[parentItemObject][`${name}`] = value
        else if (typeof name === 'object') for (const key of Object.keys(name)) jsonData[parentItemObject][`${key}`] = name[key];
        CachedManager.toString(`.cached/ui/build/${element.namespace}.json`, jsonData);
    }
};