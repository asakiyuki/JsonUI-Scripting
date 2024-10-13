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
    const { name, description, uuid, version } = config.manifest;
    const manifest = new Manifest({ name, description, uuid, version });
    manifest.manifest.header.min_engine_version = [1, 21, 0];
    fs.writeFileSync(".build/manifest.json", manifest.buildJson(), "utf-8");
}

process.on("beforeExit", () => {
    UIBuilder.delete();
    try {
        console.log(Array.from({ length: 50 }, () => "-").join(""));
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
            `>> ${UIBuilder.uiDefs()} files path found!`
        );
        console.log();
        manifestBuild();
        console.timeLog("Compiler", `>> Manifest file has been compiled!`);
        console.timeLog("Compiler", ">> Compile completed!");
    } catch (error) {
        console.timeLog("Compiler", ">> An error occurred while compiling!");
        console.error(error);
    }
});

export {};
