(async () => {
	const fs = require("fs-extra");
	const jsonc = require("jsonc-parser");
	if (!fs.existsSync(".VanillaUI")) fs.mkdirSync(".VanillaUI");
	if (!fs.existsSync(".VanillaUI/version"))
		fs.writeFileSync(".VanillaUI/version", "0", "utf-8");

	async function FetchMcRsp(path) {
		const data = await fetch(
			`https://raw.githubusercontent.com/Mojang/bedrock-samples/refs/heads/main/resource_pack/${path}`
		).then((v) => v.text());
		return data;
	}

	function GetScreenPath(ScreenData, prefix = "") {
		delete ScreenData.namespace;
		const data = [];
		if (Array.isArray(ScreenData)) {
			for (const ScreenElement of ScreenData) {
				const key = Object.keys(ScreenElement)[0];
				const k = key.split("@")[0];
				const controls = ScreenElement[key].controls;
				data.push(`"${prefix}${k}"`);
				if (controls)
					data.push(...GetScreenPath(controls, `${prefix}${k}/`));
			}
		} else {
			for (const key in ScreenData) {
				const k = key.split("@")[0];
				const controls = ScreenData[key].controls;
				data.push(`"${prefix}${k}"`);
				if (controls)
					data.push(...GetScreenPath(controls, `${prefix}${k}/`));
			}
		}
		return data;
	}

	const latestVersion = (
		await fetch(
			"https://raw.githubusercontent.com/Mojang/bedrock-samples/refs/heads/main/version.json"
		).then((v) => v.json())
	).latest.version;

	if (fs.readFileSync(".VanillaUI/version", "utf-8") !== latestVersion) {
		fs.writeFileSync(".VanillaUI/version", latestVersion, "utf-8");

		const uiDefs = jsonc.parse(
			await FetchMcRsp("ui/_ui_defs.json")
		).ui_defs;

		uiDefs.forEach(async (path) => {
			const paths = path.split("/");
			const writeFilePath = `.VanillaUI/${path}`;
			{
				const folderPath = `.VanillaUI/${paths
					.slice(0, paths.length - 1)
					.join("/")}`;
				if (!fs.existsSync(folderPath)) fs.mkdirSync(folderPath);
			}
			fs.writeFileSync(writeFilePath, await FetchMcRsp(path), "utf-8");
		});

		fs.writeJsonSync(".VanillaUI/uiDefs.json", uiDefs, "utf-8");
	}

	{
		const bindings = [];

		const aPath = ".VanillaUI/";
		const bPath = "src/compoments/Modify/Files";

		const imp = [
			`import { Modify } from "../Modify";`,
			`import { Properties } from "../../types/objects/properties/Properties";`,
		];

		const classMethod = [];

		fs.readJsonSync(`${aPath}uiDefs.json`).forEach((filePath) => {
			const fileName = `_${filePath
				.replace(/^ui\//, "")
				.replace(/\.json$/, "")}`.replace(/_\w|\/\w/g, (r) =>
				r[0] === "/" ? `_${r[1].toUpperCase()}` : r[1].toUpperCase()
			);

			const fileData = fs.readFileSync(`${aPath}${filePath}`, "utf-8");
			bindings.push(...(fileData.match(/#\w+/g) || []));

			const screenPaths = GetScreenPath(jsonc.parse(fileData));

			if (screenPaths.length > 0) {
				fs.writeFileSync(
					`${bPath}/${fileName}.ts`,
					`export type ${fileName} = ${screenPaths.join(" | ")};`,
					"utf-8"
				);

				imp.push(`import { ${fileName} } from "./Files/${fileName}";`);
				classMethod.push(
					`    static ${fileName}(elementPath: ${fileName}, properties?: Properties) { return Modify.register("${filePath}", elementPath, properties); };`
				);
			}
		});

		fs.writeFileSync(
			`${bPath}.ts`,
			`${imp.join("\n")}\n\nexport class Files {\n${classMethod.join(
				"\n"
			)}\n}`,
			"utf-8"
		);

		fs.writeFileSync(
			"src/types/enums/BindingName.ts",
			`export enum BindingName {\n${Array.from(new Set(bindings), (b) => {
				return `    "${b.replace(/(_|#)\w/g, (w) =>
					w[1].toUpperCase()
				)}" = "${b}"`;
			}).join(",\n")}\n}`
		);
	}

	{
		const globalVariables = Object.keys(
			jsonc.parse(await FetchMcRsp("ui/_global_variables.json"))
		).map(
			(key) =>
				`	'${key.replace(/(\$|_)\w/g, (e) =>
					e[1].toUpperCase()
				)}' = '${key}',`
		);

		fs.writeFileSync(
			"src/types/enums/GlobalVariables.ts",
			`export enum GlobalVariables {\n${globalVariables.join("\n")}\n}`,
			"utf-8"
		);
	}
})();
