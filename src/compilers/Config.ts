import { UUID } from "crypto";
import fs from "fs-extra";
import { Save } from "./generator/Save";
import { Version, SemverString } from "..";
import { Obj } from "./reader/Object";

if (!fs.existsSync("asakiyuki.config.js"))
	fs.writeFileSync(
		"asakiyuki.config.js",
		`/** @type {import('jsonui-scripting').Config} */\nconst config = {};\n\nmodule.exports = config;`,
		"utf-8"
	);

export interface ConfigManifest {
	name: string;
	description: string;
	version: Version | SemverString;
	baseGameVersion: Version;
	uuid: UUID;
}

export interface Config {
	buildInProject: boolean;
	installToDevelopEvironment: boolean;
	installToMinecraftPreview: boolean;
	obfuscateElementNames: boolean;
	useExtendElementInsteadType: boolean;
	buildFileExtension: string;
	buildElementNameStringLength: number;
	buildNamespaceStringLength: number;
	namespaceAmountGenerate: number;
	manifest: ConfigManifest;
}

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

export class Configs {
	save: Config;
	static config: Config;
	constructor() {
		this.save = eval(fs.readFileSync("asakiyuki.config.js", "utf-8"));
	}

	static getConfig(): Config {
		if (Configs.config === undefined) {
			const defaultConfig = Configs.getDefaultConfig();
			const saveConfig = new Configs().save;
			return readObject(saveConfig, defaultConfig) as Config;
		} else return Configs.config;
	}

	static getDefaultConfig(): Config {
		return {
			buildInProject: false,
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

	private static apply() {}
	private static arguments = "";
	private static bind() {}
	private static call() {}
	private static caller = "";
	private static length = "";
	private static name = "";
	private static toString() {}
}

export const config = Configs;
