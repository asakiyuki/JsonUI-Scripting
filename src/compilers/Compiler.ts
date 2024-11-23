import { Manifest } from "./generator/Manifest";
import { UIBuilder } from "./generator/UIBuilder";
import fs from "fs-extra";
import { ResourcePacks, Minecraft, ResourcePack } from "./Installer";
import { Configs } from "./Config";
import { CompressPack } from "./Compess";

const config = Configs.getConfig();

export const installer = new ResourcePacks({
	installGame: config.installToMinecraftPreview
		? Minecraft.Preview
		: Minecraft.Stable,
	installFolder: config.installToDevelopEvironment
		? ResourcePack.Development
		: ResourcePack.Production,
});

function manifestBuild(installPath: string) {
	const { name, description, uuid, version, baseGameVersion } =
		config.manifest;
	const manifest = new Manifest({ name, description, uuid, version });
	manifest.manifest.header.min_engine_version = baseGameVersion;
	fs.writeFileSync(
		`${installPath}/manifest.json`,
		manifest.buildJson(),
		"utf-8"
	);
}

process.on("beforeExit", () => {
	const installPath = installer.getInstallPath();
	const buildPath = config.buildInProject ? ".build" : installPath;

	UIBuilder.delete(buildPath);

	if (!fs.pathExistsSync(`.bedrock`)) fs.mkdirpSync(".bedrock");
	if (!fs.pathExistsSync(`${buildPath}`)) fs.mkdirSync(`${buildPath}`);
	if (!fs.pathExistsSync(`${buildPath}/@`)) fs.mkdirSync(`${buildPath}/@`);

	try {
		console.log("---------- COMPILING ----------");
		if (!config.buildInProject) {
			installer.packLink();
			console.timeLog("Compiler", ">> Symlink completed!");
			console.log();
		}

		fs.copySync(".bedrock", buildPath);
		console.timeLog("Compiler", ">> Copy bedrock resources completed!");
		console.log();

		console.timeLog(
			"Compiler",
			`>> ${UIBuilder.jsonUI(buildPath)} custom file(s) compiled!`
		);
		console.log();
		console.timeLog(
			"Compiler",
			`>> ${UIBuilder.modify(buildPath)} modify file(s) compiled!`
		);
		console.log();
		manifestBuild(buildPath);
		console.timeLog("Compiler", `>> Manifest file has been compiled!`);
		console.timeLog(
			"Compiler",
			`>> ui/_ui_defs.json ${UIBuilder.uiDefs(
				buildPath
			)} files path(s) found!`
		);
		console.timeLog(
			"Compiler",
			`>> ui/_global_variables.json ${UIBuilder.globalVariables(
				buildPath
			)} variable(s) compiled!`
		);
		console.timeLog(
			"Compiler",
			`>> textures/textures_list.json ${UIBuilder.texturesList(
				buildPath
			)} files path(s) found!`
		);
		console.timeLog(
			"Compiler",
			`>> contents.json ${UIBuilder.contents(
				buildPath
			)} file path(s) found!`
		);

		if (!config.buildInProject) {
			installer.installPack(
				config.manifest.uuid,
				config.manifest.version
			);
			console.timeLog("Compiler", `>> Resource Pack has been installed!`);
		}

		if (config.compessWhenCompiled) {
			CompressPack(buildPath);
			console.timeLog(
				"Compiler",
				">> Minecraft-UIBuild.mcpack Pack compress completed!"
			);
		}

		console.log();

		console.timeLog("Compiler", ">> Compile completed!");

		console.log("\n---------- INFO ----------");
		console.log(`Name: ${config.manifest.name}`);
		console.log(`Description: ${config.manifest.description}`);
		console.log(`UUID: ${config.manifest.uuid}`);
		console.log(
			`Pack Version: ${config.manifest.version[0]}.${config.manifest.version[1]}.${config.manifest.version[2]}`
		);
		console.log(
			`Base Gase Version: ${config.manifest.baseGameVersion[0]}.${config.manifest.baseGameVersion[1]}.${config.manifest.baseGameVersion[2]}`
		);

		if (!config.buildInProject) console.log(`Install Path: ${installPath}`);
	} catch (error) {
		console.timeLog("Compiler", ">> An error occurred while compiling!");
		console.error(error);
	}
});

export {};
