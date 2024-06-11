import fs from "fs-extra";
import { parse } from "comment-json";
import { ElementCachedInterface } from "./Types";
import { Color } from "./Element";
import ReadJsonUIPropertyValue from "./ReadProperty";
fs.removeSync('.cached');

export class CachedManager {
    static toString(path: string, jsonData: object) {
        console.log('Compile Json', new Date, path);
        fs.writeFileSync(path, JSON.stringify(jsonData), "utf-8");
    }
    static writeString(path: string, data: string) {
        console.log(`Writing file`, new Date, path);
        fs.writeFileSync(path, data, "utf-8");
    }
    static readJson(path: string) {
        if (fs.existsSync(path)) return parse(fs.readFileSync(path, 'utf-8')) as any;
    }
    static readFile(path: string) {
        return fs.existsSync(path)
            ? fs.readFileSync(path, "utf-8")
            : "";
    }
    static createDirSync(data: string[]) {
        data.forEach(v => fs.existsSync(v) ? null : fs.mkdirSync(v));
    }
    static createFilesSync(data: any) {
        for (const key of Object.keys(data))
            if (!fs.existsSync(key)) fs.writeFileSync(key, data[key], 'utf-8')
    }
    static data($$$: ElementCachedInterface, isAnimation: boolean = false) {
        const JsonUIData: any = $$$;
        const filePath = `.cached/ui/build${isAnimation ? "/anims" : ""}/${JsonUIData.namespace}.json`;
        console.log("Build:", new Date(), filePath, `${isAnimation ? JsonUIData.anim_name : JsonUIData.name}.${JsonUIData.namespace}`);
        CachedManager.createDirSync(['.cached', '.cached/ui', '.cached/ui/build', '.cached/ui/build/anims']);
        CachedManager.createFilesSync({
            [filePath]: JSON.stringify({ namespace: JsonUIData.namespace }),
            '.cached/ui/_ui_defs.json': JSON.stringify({ ui_defs: [] }),
            '.cached/ui/_global_variables.json': "{}"
        })
        const jsonDef: any = JSON.parse(fs.readFileSync('.cached/ui/_ui_defs.json', 'utf-8'));
        if (!jsonDef['ui_defs'].includes(`ui/build${isAnimation ? "/anims" : ""}/${JsonUIData.namespace}.json`)) jsonDef['ui_defs'].push(`ui/build${isAnimation ? "/anims" : ""}/${JsonUIData.namespace}.json`);
        const jsonData = JSON.parse(fs.readFileSync(filePath, 'utf-8'));
        if ((JsonUIData as any).anim_name) for (const key of Object.keys(JsonUIData.data)) jsonData[key] = JsonUIData.data[key]
        else jsonData[(JsonUIData as any).extend ? `${(JsonUIData as any).name}@${(JsonUIData as any).extend.namespace}.${(JsonUIData as any).extend.name}` : (JsonUIData as any).name] = { type: (JsonUIData as any).type };
        CachedManager.toString('.cached/ui/_ui_defs.json', jsonDef);
        CachedManager.toString(filePath, jsonData);
    }
    static pushArray(element: ElementCachedInterface, name: string, value: any) {
        const jsonData = JSON.parse(fs.readFileSync(`.cached/ui/build/${element.namespace}.json`, 'utf-8'));
        const parentItemObject: any = element.extend ? `${element.name}@${element.extend.namespace}.${element.extend.name}` : element.name;
        if (!jsonData[parentItemObject][name]) jsonData[parentItemObject][name] = [];
        jsonData[parentItemObject][name].push(value);
        CachedManager.toString(`.cached/ui/build/${element.namespace}.json`, jsonData);
    }
    static setArray(element: ElementCachedInterface, name: string, value: any) {
        const jsonData = JSON.parse(fs.readFileSync(`.cached/ui/build/${element.namespace}.json`, 'utf-8'));
        const parentItemObject: any = element.extend ? `${element.name}@${element.extend.namespace}.${element.extend.name}` : element.name;
        jsonData[parentItemObject][name] = value;
        CachedManager.toString(`.cached/ui/build/${element.namespace}.json`, jsonData);
    }
    static createProperty(element: ElementCachedInterface, name: any, value?: any) {
        const jsonData = JSON.parse(fs.readFileSync(`.cached/ui/build/${element.namespace}.json`, 'utf-8'));
        const parentItemObject: any = element.extend ? `${element.name}@${element.extend.namespace}.${element.extend.name}` : element.name;
        if (typeof name === 'string')
            jsonData[parentItemObject][`${name}`] = ReadJsonUIPropertyValue(value[0]);
        else if (typeof name === 'object') for (const key of Object.keys(name))
            jsonData[parentItemObject][`${key}`] = ReadJsonUIPropertyValue(name[key]);
        CachedManager.toString(`.cached/ui/build/${element.namespace}.json`, jsonData);
    }
};

process.on('exit', () => {
    const _ = CachedManager.readJson('config.json'),
        directory = `${process.env.LOCALAPPDATA}\\Packages\\${_?.preview ? "Microsoft.MinecraftWindowsBeta_8wekyb3d8bbwe" : "Microsoft.MinecraftUWP_8wekyb3d8bbwe"}\\LocalState\\games\\com.mojang\\${_?.development ? 'development_resource_packs' : 'resource_packs'}\\${_?.folder_name ?? "debugger"}`;
    if (fs.existsSync(directory)) {
        fs.removeSync(directory);
        fs.mkdir(directory);
    } else fs.mkdir(directory);
    fs.readdirSync('.cached').forEach(v => fs.cpSync(`.cached/${v}`, `${directory}\\${v}`, { recursive: true }));
    console.log("UI Pack installed", new Date(), directory);
});