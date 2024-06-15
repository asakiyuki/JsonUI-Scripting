import { CachedManager } from "../cached/Manager";
import { convertMP3ToOgg } from "../lib/ConvertToOgg";
import fs from "fs-extra";

if (!fs.existsSync('.sounds')) fs.removeSync('.sounds');

function generateFolderPath(path: string) {
    let splitPath = path.split(/\/|\\/g);
    splitPath = splitPath.slice(0, splitPath.length - 1);
    let str = '.sounds';
    for (const key of splitPath) {
        str += `/${key}`;
        if (!fs.existsSync(str)) fs.mkdirSync(str);
    }
}


/**
 * Not recommened!
 */
export class Sound {
    constructor(public id: string, private source_path: string | string[]) {
        CachedManager.addSound(id, source_path);
        fs.mkdirSync('.sounds');

        if (Array.isArray(source_path)) source_path.forEach(v => generateFolderPath(v));
        else generateFolderPath(source_path);
        this.converter();
    }
    private converter() {
        if (Array.isArray(this.source_path)) this.source_path.forEach(v => convertMP3ToOgg(v));
        else convertMP3ToOgg(this.source_path);
    }
}