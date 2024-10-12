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
        let count = 0;
        for (const file in build) {
            const namespace = build[file].namespace;
            delete build[file].namespace;
            for (const jsonUI in build[file])
                build[file][jsonUI] = build[file][jsonUI].getUI();

            console.timeLog(
                "Compiler",
                `>> ${file} ${
                    Object.keys(build[file]).length
                } elements has generated!`
            );

            build[file].namespace = namespace;
            fs.writeJsonSync(`.build/@/${file}`, build[file], "utf-8");
            delete build[file];
            count++;
        }
        return count;
    }

    static modify() {
        if (!fs.existsSync(".build/ui")) fs.mkdirSync(".build/ui");
        let count = 0;
        const modify = JsonBuilder.save.modify;
        for (const key in modify) {
            GenerateDir(key);
            for (const element in modify[key])
                modify[key][element] = modify[key][element].getUI();

            console.timeLog(
                "Compiler",
                `>> ${key} ${
                    Object.keys(modify[key]).length
                } modify elements has generated!`
            );

            fs.writeJSONSync(`.build/${key}`, modify[key], "utf-8");
            delete modify[key];
            count++;
        }
        return count;
    }

    static uiDefs() {
        const arr = SearchFiles.array(".build/@", "@");
        fs.writeJsonSync(".build/ui/_ui_defs.json", { ui_defs: arr }, "utf-8");
        return arr.length;
    }
}
