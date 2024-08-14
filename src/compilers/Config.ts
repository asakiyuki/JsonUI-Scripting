import { UUID } from "crypto";
import fs from "fs-extra";
import { Save } from "./Save";
import { Version, SemverString } from "..";

if (!fs.existsSync('asakiyuki.config.js'))
    fs.writeFileSync('asakiyuki.config.js', `/** @type {import('jsonui-scripting').Config} */\nconst config = {};\n\nmodule.exports = config;`, 'utf-8');

export interface ConfigManifest {
    name: string,
    description: string,
    version: Version | SemverString,
    baseGameVersion: Version,
    uuid: UUID
};

export interface Config {
    installToDevelopEvironment: boolean,
    installToMinecraftPreview: boolean,
    installOnCompile: boolean,
    obfuscateElementNames: boolean,
    useExtendElementInsteadType: boolean,
    buildFileExtension: string,
    buildElementNameStringLength: number,
    buildNamespaceStringLength: number,
    namespaceAmountGenerate: number,
    manifest: ConfigManifest
};

export class Configs {
    save: Config;
    static config: Config;
    constructor() {
        this.save = eval(fs.readFileSync('asakiyuki.config.js', 'utf-8'));
    }
    static getConfig(): Config {
        if (Configs.config === undefined) {
            const defaultConfig = Configs.getDefaultConfig();
            const saveConfig = new Configs().save;

            return {
                installOnCompile: saveConfig.installOnCompile ?? defaultConfig.installOnCompile,
                installToDevelopEvironment: saveConfig.installToDevelopEvironment ?? defaultConfig.installToDevelopEvironment,
                installToMinecraftPreview: saveConfig.installToMinecraftPreview ?? defaultConfig.installToMinecraftPreview,
                obfuscateElementNames: saveConfig.obfuscateElementNames ?? defaultConfig.installToMinecraftPreview,
                useExtendElementInsteadType: saveConfig.useExtendElementInsteadType ?? defaultConfig.useExtendElementInsteadType,
                buildFileExtension: saveConfig.buildFileExtension || defaultConfig.buildFileExtension,
                buildElementNameStringLength: saveConfig.buildElementNameStringLength ?? defaultConfig.buildElementNameStringLength,
                buildNamespaceStringLength: saveConfig.buildNamespaceStringLength ?? defaultConfig.buildNamespaceStringLength,
                namespaceAmountGenerate: saveConfig.namespaceAmountGenerate ?? defaultConfig.namespaceAmountGenerate,
                manifest: {
                    name: saveConfig.manifest?.name || defaultConfig.manifest.name,
                    description: saveConfig.manifest?.description || defaultConfig.manifest.description,
                    uuid: saveConfig.manifest?.uuid || defaultConfig.manifest.uuid,
                    version: saveConfig.manifest?.version || defaultConfig.manifest.version,
                    baseGameVersion: saveConfig.manifest?.baseGameVersion || defaultConfig.manifest.baseGameVersion
                }
            }
        } else return Configs.config;
    }
    static getDefaultConfig(): Config {
        return ({
            installOnCompile: true,
            installToDevelopEvironment: true,
            installToMinecraftPreview: false,
            obfuscateElementNames: false,
            useExtendElementInsteadType: false,
            buildFileExtension: '',
            buildElementNameStringLength: 32,
            buildNamespaceStringLength: 32,
            namespaceAmountGenerate: 64,
            manifest: {
                name: `JsonUI Scripting`,
                description: 'Build with JsonUI Scripting <3',
                uuid: Save.uuid()[0],
                version: [1, 0, 0],
                baseGameVersion: [1, 21, 1]
            }
        });
    }

    private static apply() { };
    private static arguments = '';
    private static bind() { };
    private static call() { };
    private static caller = '';
    private static length = '';
    private static name = '';
    private static toString() { };
};

export const config = Configs; 