import { parse } from "comment-json";
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
    static importTextures?: string = undefined;

    /**
     * A static property to hold the start time of the application.
     * It is initialized with the current time when the Config class is loaded.
     */
    static startTime = new Date().getTime();

    /**
     * Reads the configuration from a file and returns it.
     * If the configuration file does not exist, it creates a default configuration.
     *
     * @returns {ConfigInterface} The configuration data.
     */
    static read(): ConfigInterface {
        // Read or generate a unique identifier (UUID) for the application
        const uuid: string = fs.existsSync('uuid.txt') ? fs.readFileSync('uuid.txt', 'utf-8') : (() => {
            const uuid = GenerateUUID();
            fs.writeFileSync('uuid.txt', uuid, 'utf-8');
            return uuid;
        })();

        // Read the configuration from the file if it exists, otherwise create a default configuration
        return fs.existsSync('config.json') ?
            (() => {
                // Parse the configuration file and apply default values
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

// Assign the read configuration to the static data property
(Config.data as any) = Config.read();