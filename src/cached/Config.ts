import { parse } from "comment-json";
import { ConfigInterface } from "./ConfigInterface";
import fs from "fs-extra";

export class Config {
    static data: ConfigInterface = {};
    static read() {
        return fs.existsSync('config.json') ?
            (() => {
                const config: any = parse(fs.readFileSync('config.json', 'utf-8'));
                config.folder_name = config.folder_name ?? "debugger";
                config.development = config.development ?? true;
                return config;
            })() :
            ({
                folder_name: "debugger",
                development: true,
                preview: false,
                obfuscator_element_name: false
            });
    }
}
(Config.data as any) = Config.read();