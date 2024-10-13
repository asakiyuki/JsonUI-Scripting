import fs from "fs-extra";
import { SemverString, UUID, Version } from "../../types/objects/Manifest";
import { Save } from "../generator/Save";

export interface GlobalResourcePacks {
    pack_id: UUID;
    subpack?: string;
    version: Version | SemverString;
}

export enum ResourcePack {
    Production = "resource_packs",
    Development = "development_resource_packs",
}
export enum BehaviorPack {
    Production = "behavior_packs",
    Development = "development_behavior_packs",
}
export enum SkinPack {
    Production = "skin_packs",
    Development = "development_skin_packs",
}
export enum Minecraft {
    Stable = "Microsoft.MinecraftUWP_8wekyb3d8bbwe",
    Preview = "Microsoft.MinecraftWindowsBeta_8wekyb3d8bbwe",
}
export interface ResourcePackInterface {
    installGame: Minecraft;
    installFolder: ResourcePack;
}

export class ResourcePacks {
    gamePath: string;
    gameDataPath: string;
    installPath: string;
    globalResoucePacksPath: string;
    constructor(data: ResourcePackInterface) {
        const appdata = `${process.env.LOCALAPPDATA}/Packages`;
        this.gamePath = `${appdata}/${data.installGame}/`;
        this.gameDataPath = `${this.gamePath}/LocalState/games/com.mojang`;
        this.installPath = `${this.gameDataPath}/${data.installFolder}`;
        this.globalResoucePacksPath = `${this.gameDataPath}/minecraftpe/global_resource_packs.json`;
    }

    isPackInstalled(uuid: UUID, version: Version | SemverString) {
        const globalResourcePacks: Array<GlobalResourcePacks> = fs.readJsonSync(
            this.globalResoucePacksPath,
            "utf-8"
        );
        const versionIsArray = Array.isArray(version);
        if (versionIsArray) version = <SemverString>JSON.stringify(version);
        for (const packData of globalResourcePacks) {
            if (
                packData.pack_id === uuid &&
                (versionIsArray
                    ? JSON.stringify(packData.version)
                    : packData.version) === version
            )
                return true;
        }
        return false;
    }

    installPack(uuid: UUID, version: Version | SemverString) {
        if (this.isPackInstalled(uuid, version)) return;
        const globalResourcePacks: Array<GlobalResourcePacks> = fs.readJsonSync(
            this.globalResoucePacksPath,
            "utf-8"
        );
        globalResourcePacks.push({
            pack_id: uuid,
            version,
        });
        fs.writeJSONSync(
            this.globalResoucePacksPath,
            globalResourcePacks,
            "utf-8"
        );
    }

    uninstallPack(uuid: UUID, version: Version | SemverString) {
        const globalResourcePacks: Array<GlobalResourcePacks> = fs.readJsonSync(
            this.globalResoucePacksPath,
            "utf-8"
        );
        const versionIsArray = Array.isArray(version);
        if (versionIsArray) version = <SemverString>JSON.stringify(version);
        let i = -1;
        for (const packData of globalResourcePacks) {
            i++;
            if (
                packData.pack_id === uuid &&
                (versionIsArray
                    ? JSON.stringify(packData.version)
                    : packData.version) === version
            ) {
                globalResourcePacks.splice(i, 1);
                break;
            }
        }
        fs.writeJSONSync(this.globalResoucePacksPath, globalResourcePacks);
    }

    getInstallPath() {
        return `${this.installPath}/${Save.getBuildID()}`;
    }
}
