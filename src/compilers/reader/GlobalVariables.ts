import fs from "fs-extra";
import { Obj } from "./Object";
import { JsonBuilder } from "../generator/JsonBuilder";
import { ReadValue } from "./ReadProperties";

if (!fs.existsSync("asakiyuki.global_variables.js"))
	fs.writeFileSync(
		"asakiyuki.global_variables.js",
		`const {} = require("jsonui-scripting");\n\nconst global_variables = {};\n\nmodule.exports = global_variables;`,
		"utf-8"
	);

Obj.forEach(
	eval(
		fs
			.readFileSync("asakiyuki.global_variables.js", "utf-8")
			.replace(/['"`]jsonui-scripting['"`]/, '"../../index"')
	),
	(key, value) => JsonBuilder.registerGlobalVariable(key, ReadValue(value))
);

export {};
