import { Manifest } from "./generator/Manifest";
import { UIBuilder } from "./generator/UIBuilder";
import fs from "fs-extra";
import { ResourcePacks, Minecraft, ResourcePack } from "./installer/Installer";
import { Configs } from "./Config";

const config = Configs.getConfig();

export const installer = new ResourcePacks({
	installGame: config.installToMinecraftPreview
		? Minecraft.Preview
		: Minecraft.Stable,
	installFolder: config.installToDevelopEvironment
		? ResourcePack.Development
		: ResourcePack.Production,
});

function manifestBuild() {
	const { name, description, uuid, version, baseGameVersion } =
		config.manifest;
	const manifest = new Manifest({ name, description, uuid, version });
	manifest.manifest.header.min_engine_version = baseGameVersion;
	fs.writeFileSync(".build/manifest.json", manifest.buildJson(), "utf-8");
}

process.on("beforeExit", () => {
	UIBuilder.delete();
	UIBuilder.delete(".build");

	if (!fs.pathExistsSync(`${installer.getInstallPath()}`))
		fs.mkdirSync(`${installer.getInstallPath()}`);

	if (!fs.pathExistsSync(`${installer.getInstallPath()}/@`))
		fs.mkdirSync(`${installer.getInstallPath()}/@`);

	try {
		console.log("---------- COMPILING ----------");
		installer.packLink();
		console.timeLog("Compiler", ">> Symlink completed!");
		console.log();

		console.timeLog(
			"Compiler",
			`>> ${UIBuilder.jsonUI()} custom file(s) compiled!`
		);
		console.log();
		console.timeLog(
			"Compiler",
			`>> ${UIBuilder.modify()} modify file(s) compiled!`
		);
		console.log();
		console.timeLog(
			"Compiler",
			`>> ${UIBuilder.uiDefs()} files path(s) found!`
		);
		manifestBuild();
		console.timeLog("Compiler", `>> Manifest file has been compiled!`);

		console.timeLog("Compiler", `>> Resource Pack has been installed!`);
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
		console.log(`Install Path: ${installer.getInstallPath()}`);
	} catch (error) {
		console.timeLog("Compiler", ">> An error occurred while compiling!");
		console.error(error);
	}
});

export {};
