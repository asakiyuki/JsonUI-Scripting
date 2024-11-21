import fs from "fs-extra";
import { parse } from "jsonc-parser";
import { JsonBuilder } from "./JsonBuilder";
import { SearchFiles } from "./SearchFiles";
import { GenerateDir } from "./GenerateDir";

export class UIBuilder {
	static delete(installPath: string) {
		try {
			fs.unlinkSync(installPath);
		} catch (error) {
			if (fs.pathExistsSync(installPath)) fs.removeSync(installPath);
		}
	}

	static jsonUI(installPath: string) {
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

	static modify(installPath: string) {
		if (!fs.existsSync(`${installPath}/ui`))
			fs.mkdirSync(`${installPath}/ui`);
		let count = 0;
		const modify = JsonBuilder.save.modify;
		for (const key in modify) {
			GenerateDir(installPath, key);
			for (const element in modify[key])
				modify[key][element] = modify[key][element].getUI();

			console.timeLog(
				"Compiler",
				`>> ${key} ${
					Object.keys(modify[key]).length
				} modify element(s) has generated!`
			);

			fs.writeJSONSync(`${installPath}/${key}`, modify[key], "utf-8");
			delete modify[key];
			count++;
		}
		return count;
	}

	static uiDefs(installPath: string) {
		const arr = SearchFiles.array(`${installPath}/@`, "@");
		fs.writeJsonSync(
			`${installPath}/ui/_ui_defs.json`,
			{ ui_defs: arr },
			"utf-8"
		);
		return arr.length;
	}

	static contents(installPath: string) {
		const arr = SearchFiles.array(installPath);

		fs.writeJSONSync(
			`${installPath}/contents.json`,
			{
				content: arr.map((v) => ({ path: v })),
			},
			"utf-8"
		);

		return arr.length;
	}

	static texturesList(installPath: string) {
		const arr = SearchFiles.array(installPath)
			.filter((v) => /\.(png|jpg|jpeg)$/.test(v))
			.map((v) => v.replace(/\.(png|jpg|jpeg)$/, ""));

		let textureList: Array<string> = [];

		if (fs.existsSync(`.bedrock/textures/textures_list.json`)) {
			const texturesList = fs.readFileSync(
				`.bedrock/textures/textures_list.json`,
				"utf-8"
			);
			textureList = parse(texturesList);
		}

		if (!fs.existsSync(`${installPath}/textures`))
			fs.mkdirSync(`${installPath}/textures`);
		fs.writeJSONSync(
			`${installPath}/textures/textures_list.json`,
			[...arr, ...textureList],
			"utf-8"
		);

		return arr.length;
	}

	static globalVariables(installPath: string) {
		const globalVariables = JsonBuilder.save.globalVariables;

		fs.writeJsonSync(
			`${installPath}/ui/_global_variables.json`,
			globalVariables,
			"utf-8"
		);

		return Object.keys(globalVariables).length;
	}
}
