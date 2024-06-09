import { CachedManager } from "../CachedJsonUI";

const fs = require('fs');
export function WriteTypesFromJsonUI(json_file: string) {
    const _: any = Object.keys(CachedManager.readJson(json_file)).map(v => `"${v.split('@')[0]}"`);
    _.pop("namespace");
    CachedManager.createFilesSync({
        'types.ts': `export type Types = ${_.join(' | ')}`
    });
    console.log(`${_.length} Json UI types has create!`)
}