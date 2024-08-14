import fs from "fs-extra";
import { Class } from "../compoments/Class";
import { Random } from "../compoments/Random";
import { UUID } from "../types/objects/Manifest";
type ReturnValue = () => any;

export class Save extends Class {
    static isSaveCreated: boolean = false;
    static createFile(path: string, data: ReturnValue, write: Function = fs.writeFileSync, read: Function = fs.readFileSync) {
        if (!Save.isSaveCreated && !fs.pathExistsSync('.save')) fs.mkdirSync('.save');
        Save.isSaveCreated = true;
        if (!fs.pathExistsSync(`.save/${path}`)) {
            const $ = data();
            write(`.save/${path}`, $, 'utf-8');
            return $;
        } else return read(`.save/${path}`, 'utf-8');
    };

    static createJson(path: string, data: ReturnValue) {
        return Save.createFile(path, data, fs.writeJsonSync, fs.readJsonSync);
    }

    static updateFile(path: string, data: ReturnValue, write: Function = fs.writeFileSync, read: Function = fs.readFileSync) {
        if (!Save.isSaveCreated && !fs.pathExistsSync('.save')) fs.mkdirSync('.save');
        const backup = read(`.save/${path}`, 'utf-8');
        write(`.save/${path}`, data());
        return backup;
    }
    static updateJson(path: string, data: ReturnValue) {
        return Save.updateFile(path, data, fs.readJsonSync, fs.readFileSync);
    }

    static uuid(): [UUID, UUID] {
        return <[UUID, UUID]>Save.createJson('uuid', () => ({
            uuid: [Random.getUUID(), Random.getUUID()]
        })).uuid;
    }
    static resource(mcVersion: 'stable' | 'preview' = 'stable') {
        return Save.createJson(`compile-${mcVersion}`, () => ({
            isDevelopment: true,
            folderName: Random.getName()
        }));
    };
};