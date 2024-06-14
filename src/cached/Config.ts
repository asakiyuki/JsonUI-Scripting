import { parse } from "comment-json";
import { ConfigInterface } from "./ConfigInterface";
import fs from "fs-extra";
import { GenerateUUID } from "../jsonUI/GenerateUUID";

export class Config {
    static data: ConfigInterface = {};
    static read() {
        const uuid: string = fs.existsSync('uuid.txt') ? fs.readFileSync('uuid.txt', 'utf-8') : (() => {
            const uuid = GenerateUUID();
            fs.writeFileSync('uuid.txt', uuid, 'utf-8');
            return uuid;
        })();
        return fs.existsSync('config.json') ?
            (() => {
                const config: any = parse(fs.readFileSync('config.json', 'utf-8'));
                config.folder_name = config.folder_name ?? "debugger";
                config.development = config.development ?? true;
                config.manifest = {
                    name: 'pack_name',
                    description: 'pack_description',
                    version: [0, 0, 0],
                    uuid,
                    ...config.manifest
                }
                return config;
            })() :
            ({
                folder_name: "debugger",
                development: true,
                preview: false,
                obfuscator_element_name: false,
                manifest: {
                    name: 'pack_name',
                    description: 'pack_description',
                    version: [0, 0, 0],
                    uuid
                }
            });
    }
}
(Config.data as any) = Config.read();