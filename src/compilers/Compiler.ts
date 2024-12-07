import path from "path";

import fs from "fs-extra";
import { Manifest } from "./generator/Manifest";
import { UIBuilder } from "./generator/UIBuilder";
import { ResourcePacks, Minecraft, ResourcePack } from "./Installer";
import { Configs } from "./Config";
import { CompressPack } from "./Compess";
import { Sounds } from "./generator/Sounds";

// Retrieve the configuration settings
const config = Configs.getConfig();

/**
 * Installs the resource pack using the provided configuration and paths.
 * The installer uses either the Minecraft Preview or Stable version based on the config settings.
 * It also installs to either the development or production environment based on the config.
 */
export const installer = new ResourcePacks({
	installGame: config.installToMinecraftPreview
		? Minecraft.Preview
		: Minecraft.Stable,
	installFolder: config.installToDevelopEvironment
		? ResourcePack.Development
		: ResourcePack.Production,
});

/**
 * Builds the manifest file for the resource pack and writes it to the specified installation path.
 *
 * @param {string} installPath - The directory path where the manifest file will be saved.
 *
 * @returns {void} - This function does not return any value.
 */
function manifestBuild(installPath: string): void {
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

// Set up a process listener for the 'beforeExit' event, which handles compilation tasks
process.on("beforeExit", () => {
	const installPath = installer.getInstallPath();
	const buildPath = config.buildInProject ? ".build" : installPath;

	// Clean up temporary build directories
	UIBuilder.delete(buildPath);

	// Create necessary directories if they do not exist
	if (!fs.pathExistsSync(`.bedrock`)) fs.mkdirpSync(".bedrock");
	if (!fs.pathExistsSync(`${buildPath}`)) fs.mkdirSync(`${buildPath}`);
	if (!fs.pathExistsSync(`${buildPath}/@`)) fs.mkdirSync(`${buildPath}/@`);

	try {
		console.log("---------- COMPILING ----------");

		// Perform actions depending on whether the build is within the project or external
		if (!config.buildInProject) {
			installer.packLink();
			console.timeLog("Compiler", ">> Symlink completed!");
			console.log();
		}

		// Pack-icon setup
		if (!fs.existsSync(".bedrock/pack_icon.png")) {
			const packIconPath = path.join(
				__dirname,
				"../../resources/logo.png"
			);
			fs.copySync(packIconPath, `${buildPath}/pack_icon.png`);
		}

		// Copy bedrock resources to build path
		fs.copySync(".bedrock", buildPath);
		console.timeLog("Compiler", ">> Copy bedrock resources completed!");
		console.log();

		// Compile various UI files
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

		// Generate and save the manifest
		manifestBuild(buildPath);
		console.timeLog("Compiler", `>> Manifest file has been compiled!`);

		// Compile UI and other required resources
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

		const soundLength = Sounds.compile(buildPath);
		if (soundLength)
			console.timeLog(
				"Compiler",
				`>> sounds/sound_definitions.json ${soundLength} sound id has regisrer!`
			);

		console.timeLog(
			"Compiler",
			`>> contents.json ${UIBuilder.contents(
				buildPath
			)} file path(s) found!`
		);

		// Install the resource pack if not building within the project
		if (!config.buildInProject) {
			installer.installPack(
				config.manifest.uuid,
				config.manifest.version
			);
			console.timeLog("Compiler", `>> Resource Pack has been installed!`);
		}

		// Compress the pack if enabled in the config
		if (config.compressAfterCompile) {
			CompressPack(buildPath);
			console.timeLog(
				"Compiler",
				">> Minecraft-UIBuild.mcpack Pack compress completed!"
			);
		}

		// Final log of compilation completion
		console.log();
		console.timeLog("Compiler", ">> Compile completed!");

		// Display relevant information
		console.log("\n---------- INFO ----------");
		console.log(`Name: ${config.manifest.name}`);
		console.log(`Description: ${config.manifest.description}`);
		console.log(`UUID: ${config.manifest.uuid}`);
		console.log(
			`Pack Version: ${config.manifest.version[0]}.${config.manifest.version[1]}.${config.manifest.version[2]}`
		);
		console.log(
			`Base Game Version: ${config.manifest.baseGameVersion[0]}.${config.manifest.baseGameVersion[1]}.${config.manifest.baseGameVersion[2]}`
		);

		// Print install path if not building within the project
		if (!config.buildInProject) console.log(`Install Path: ${installPath}`);
	} catch (error) {
		// Handle any errors during the compilation process
		console.timeLog("Compiler", ">> An error occurred while compiling!");
		console.error(error);
	}
});

export {};
