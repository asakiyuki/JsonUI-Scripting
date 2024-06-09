import { CachedManager } from "../CachedJsonUI";
import fs, { read } from "fs";

function readControl(data: any, parentKey: string) {
    const arr: any = [];
    for (const element of data) {
        const k = Object.keys(element)[0],
            _ = `${parentKey}/${k.split('@')[0]}`;
        arr.push(`"${_}"`);
        if (element[k].controls)
            arr.push(...readControl(element[k].controls, _));
    }
    return arr;
}

function WriteTSFiles(data: any) {
    let tsFile = ``
    for (const key of Object.keys(data)) {
        const _ = data[key].join(" | "),
            $ = (key as any).replace(/(_|-)\w/g, (v: any) => v[1].toUpperCase())
        tsFile += `export type ${$[0].toUpperCase()}${$.slice(1)}Types = ${_};\n`
    }
    CachedManager.writeString(`src/vanillaModification/Types.ts`, tsFile);
}

export function WriteTypesFromJsonUI() {
    const startTime = new Date().getTime();
    console.log("Read Directory", new Date());
    const typeList: any = {}
    for (const file of fs.readdirSync('jsonUI').map(v => `jsonUI/${v}`)) {
        console.log("Read File", new Date(), file);
        const data = CachedManager.readJson(file),
            namespace = data.namespace;
        typeList[namespace] = [];
        delete data.namespace;
        for (const key of Object.keys(data)) {
            const k = key.split('@')[0];
            typeList[namespace].push(`"${k}"`);
            if (data[key].controls)
                typeList[namespace].push(...readControl(data[key].controls, k));
        }
    }
    WriteTSFiles(typeList);
    console.log("[Debugger] Handle time", `${new Date().getTime() - startTime}ms`)
}