import { UUID } from "crypto";
import fs from "fs-extra";
import { Save } from "./generator/Save";
import { Version, SemverString } from "..";
import { Obj } from "./reader/Object";

// Check if the configuration file exists, if not create it
if (!fs.existsSync("asakiyuki.config.js"))
	fs.writeFileSync(
		"asakiyuki.config.js",
		`/**
 * Configuration object for the JsonUI Scripting build process.
 * @type {import('jsonui-scripting').Config}
 */
const config = {
    // The number of namespaces to generate
    namespaceAmountGenerate: 64,

    // The length of each generated namespace string
    buildNamespaceStringLength: 32,

    // The length of each generated element name string
    buildElementNameStringLength: 32,

    // The file extension used for the generated files
    buildFileExtension: "json",

    // Whether to use extended elements instead of types (true = extended, false = types)
    useExtendElementInsteadType: false,

    // Whether to obfuscate the names of elements (true = obfuscate, false = keep readable)
    obfuscateElementNames: false,

    // Whether to install the build into a development environment
    installToDevelopEvironment: true,

    // Whether to install the build into Minecraft Preview
    installToMinecraftPreview: false,

    // Whether to compress files after compilation
    compressAfterCompile: false,

    // Whether the build should take place directly in the current project folder
    buildInProject: true,

    // Manifest information about the project
    manifest: {
        // The name of the project
        name: "JsonUI Scripting",

		// A description of the project
        // description: "Build with JsonUI-Scripting <3",

        // The unique identifier (UUID) for this project (Automatically generated)
        // uuid: '01234567-1234-1234-1234-0123456789A',

        // The base game version required for compatibility
        // baseGameVersion: [1, 21, 1],

        // The version of this build
        // version: [1, 1, 1],
    },
};

module.exports = config;`,
		"utf-8"
	);

/**
 * Interface representing the structure of a config manifest.
 * This is used to define the metadata of the resource pack.
 */
export interface ConfigManifest {
	/**
	 * The name of the resource pack.
	 */
	name: string;

	/**
	 * A description of the resource pack.
	 */
	description: string;

	/**
	 * The version of the resource pack, can be a `Version` or a `SemverString`.
	 */
	version: Version | SemverString;

	/**
	 * The minimum required version of the game to run the resource pack.
	 */
	baseGameVersion: Version;

	/**
	 * The universally unique identifier (UUID) for the resource pack.
	 */
	uuid: UUID;
}

/**
 * Interface representing the main configuration for the build process.
 */
export interface Config {
	/**
	 * Whether the build is happening within the project directory.
	 */
	buildInProject: boolean;

	/**
	 * Whether the resource pack should be compressed when compiled.
	 */
	compressAfterCompile: boolean;

	/**
	 * Whether the resource pack will be installed into a development environment.
	 */
	installToDevelopEvironment: boolean;

	/**
	 * Whether the resource pack will be installed into the Minecraft Preview version.
	 */
	installToMinecraftPreview: boolean;

	/**
	 * Whether element names should be obfuscated.
	 */
	obfuscateElementNames: boolean;

	/**
	 * Whether to use extended element names instead of types.
	 */
	useExtendElementInsteadType: boolean;

	/**
	 * The file extension for build files.
	 */
	buildFileExtension: string;

	/**
	 * The maximum length for element names in the build.
	 */
	buildElementNameStringLength: number;

	/**
	 * The maximum length for namespace strings in the build.
	 */
	buildNamespaceStringLength: number;

	/**
	 * The number of namespaces to generate.
	 */
	namespaceAmountGenerate: number;

	/**
	 * The manifest data for the resource pack.
	 */
	manifest: ConfigManifest;
}

/**
 * Reads an object and applies default values where necessary.
 *
 * This function allows deeply nested objects to be filled with default values when they are undefined.
 *
 * @param {object} [obj] - The object to read and apply the default values to.
 * @param {object} [defaultObjValue] - The default values to use if any properties in `obj` are undefined.
 * @returns {object} - The object with default values applied.
 */
export function readObject(obj?: object, defaultObjValue?: object) {
	if (Array.isArray(defaultObjValue)) {
		if (!obj) obj = [];
		defaultObjValue.forEach((value, index) => {
			(<any>obj)[index] = (<any>obj)[index] ?? value;
		});
		return obj;
	} else {
		if (!obj) obj = {};
		Obj.forEach(defaultObjValue || {}, (key, value) => {
			if (typeof value === "object") {
				(<any>obj)[key] = readObject(
					(<any>obj)[key],
					(<any>defaultObjValue)[key]
				);
			} else {
				(<any>obj)[key] =
					(<any>obj)[key] ?? (<any>defaultObjValue)[key];
			}
		});
		return obj;
	}
}

/**
 * A class to manage and load configuration settings.
 *
 * The class allows reading from a configuration file and merging the saved configuration
 * with default values when necessary.
 */
export class Configs {
	/**
	 * The current loaded configuration saved to disk.
	 */
	save: Config;

	/**
	 * The statically cached configuration.
	 */
	static config: Config;

	/**
	 * Loads the configuration file and parses it into the `save` property.
	 */
	constructor() {
		this.save = eval(fs.readFileSync("asakiyuki.config.js", "utf-8"));
	}

	/**
	 * Retrieves the current configuration, either from the saved configuration or the default values.
	 *
	 * @returns {Config} - The configuration object.
	 */
	static getConfig(): Config {
		if (Configs.config === undefined) {
			const defaultConfig = Configs.getDefaultConfig();
			const saveConfig = new Configs().save;
			return readObject(saveConfig, defaultConfig) as Config;
		} else return Configs.config;
	}

	/**
	 * Retrieves the default configuration values.
	 *
	 * @returns {Config} - The default configuration object.
	 */
	static getDefaultConfig(): Config {
		return {
			buildInProject: true,
			compressAfterCompile: false,
			installToDevelopEvironment: true,
			installToMinecraftPreview: false,
			obfuscateElementNames: false,
			useExtendElementInsteadType: false,
			buildFileExtension: "",
			buildElementNameStringLength: 32,
			buildNamespaceStringLength: 32,
			namespaceAmountGenerate: 64,
			manifest: {
				name: `JsonUI Scripting`,
				description: "Build with JsonUI Scripting <3",
				uuid: Save.uuid()[0],
				version: [1, 0, 0],
				baseGameVersion: [1, 21, 40],
			},
		};
	}

	// Static helper methods not directly related to config loading/handling.
	private static apply() {}
	private static arguments = "";
	private static bind() {}
	private static call() {}
	private static caller = "";
	private static length = "";
	private static name = "";
	private static toString() {}
}

/**
 * Exporting the Configs class to be used globally.
 *
 * This allows other modules to access the configuration settings through `config`.
 */
export const config = Configs;
