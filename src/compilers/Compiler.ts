import { Configs } from "./Config";
import { Minecraft, ResourcePack, ResourcePacks } from "./Installer";
import { Manifest } from "./Manifest";
import { UIBuilder } from "./UIBuilder";
import fs from "fs-extra";

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
    const { name, description, baseGameVersion, uuid, version } =
        config.manifest;
    const manifest = new Manifest({ name, description, uuid, version });
    manifest.manifest.header.base_game_version = baseGameVersion;
    fs.writeFileSync(".build/manifest.json", manifest.buildJson(), "utf-8");
}

process.on("beforeExit", () => {
    UIBuilder.delete();
    UIBuilder.jsonUI();
    UIBuilder.modify();
    UIBuilder.uiDefs();
    manifestBuild();
    new Configs();
});

export {};
