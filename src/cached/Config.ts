import { parse } from "jsonc-parser";
import { ConfigInterface } from "./ConfigInterface";
import fs from "fs-extra";
import { GenerateUUID } from "../jsonUI/GenerateUUID";

/**
 * A class to manage the configuration settings of the application.
 */
export class Config {
    /**
     * The static data property to hold the configuration data.
     */
    static data: ConfigInterface = {};

    /**
     * Reads the configuration from a file and returns it.
     * If the configuration file does not exist, it creates a default configuration.
     *
     * @returns {ConfigInterface} The configuration data.
     */
    static read(): ConfigInterface {
        // Read or generate a unique identifier (UUID) for the application
        const uuid: string = fs.existsSync('uuid') ? fs.readFileSync('uuid', 'utf-8') : (() => {
            const uuid = GenerateUUID();
            fs.writeFileSync('uuid', uuid, 'utf-8');
            return uuid;
        })();

        // Read the configuration from the file if it exists, otherwise create a default configuration
        return fs.existsSync('config.json') ?
            (() => {
                // Parse the configuration file and apply default values
                const config: any = parse(fs.readFileSync('config.json', 'utf-8'));
                config.folder_name ??= "debugger";
                config.development ??= true;
                config.debug_screen_content ??= false;
                config.obfuscate_element_names ??= false;
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
                obfuscate_element_names: false,
                debug_screen_content: false,
                manifest: {
                    name: 'pack_name',
                    description: 'pack_description',
                    version: [0, 0, 0],
                    uuid
                }
            });
    }
}

// Assign the read configuration to the static data property
(Config.data as any) = Config.read();