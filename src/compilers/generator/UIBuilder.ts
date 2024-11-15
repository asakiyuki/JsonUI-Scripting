import fs from "fs-extra";
import { JsonBuilder } from "./JsonBuilder";
import { SearchFiles } from "./SearchFiles";
import { GenerateDir } from "./GenerateDir";
import { installer } from "../Compiler";

export class UIBuilder {
	static delete(installPath = installer.getInstallPath()) {
		if (fs.pathExistsSync(installPath)) fs.removeSync(installPath);
	}

	static jsonUI(installPath = installer.getInstallPath()) {
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
			fs.writeJsonSync(`${installPath}/@/${file}`, build[file], "utf-8");
			delete build[file];
			count++;
		}
		return count;
	}

	static modify(installPath = installer.getInstallPath()) {
		if (!fs.existsSync(`${installPath}/ui`))
			fs.mkdirSync(`${installPath}/ui`);
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

			fs.writeJSONSync(`${installPath}/${key}`, modify[key], "utf-8");
			delete modify[key];
			count++;
		}
		return count;
	}

	static uiDefs(installPath = installer.getInstallPath()) {
		const arr = SearchFiles.array(`${installPath}/@`, "@");
		fs.writeJsonSync(
			`${installPath}/ui/_ui_defs.json`,
			{ ui_defs: arr },
			"utf-8"
		);
		return arr.length;
	}
}
