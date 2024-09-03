import fs from "fs-extra";
import { JsonBuilder } from "./JsonBuilder";
import { SearchFiles } from "./SearchFiles";
import { GenerateDir } from "./GenerateDir";

export class UIBuilder {
    static delete() {
        if (fs.pathExistsSync(".build")) fs.removeSync(".build");
    }

    static jsonUI() {
        if (!fs.pathExistsSync(".build")) fs.mkdirSync(".build");
        if (!fs.pathExistsSync(".build/@")) fs.mkdirSync(".build/@");

        const build = <any>JsonBuilder.save.build;
        for (const file in build) {
            const namespace = build[file].namespace;
            delete build[file].namespace;
            for (const jsonUI in build[file])
                build[file][jsonUI] = build[file][jsonUI].getUI();
            build[file].namespace = namespace;
            fs.writeJsonSync(`.build/@/${file}`, build[file], "utf-8");
            delete build[file];
        }
    }

    static modify() {
        if (!fs.existsSync(".build/ui")) fs.mkdirSync(".build/ui");

        const modify = JsonBuilder.save.modify;
        for (const key in modify) {
            GenerateDir(key);
            for (const element in modify[key])
                modify[key][element] = modify[key][element].getUI();
            fs.writeJSONSync(`.build/${key}`, modify[key], "utf-8");
            delete modify[key];
        }
    }

    static uiDefs() {
        fs.writeJsonSync(
            ".build/ui/_ui_defs.json",
            { ui_defs: SearchFiles.array(".build/@", "@") },
            "utf-8"
        );
    }
}
