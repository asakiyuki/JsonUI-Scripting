import fs from "fs-extra";
import { Obj } from "./Object";

if (!fs.existsSync("asakiyuki.env.js"))
	fs.writeFileSync(
		"asakiyuki.env.js",
		`const {} = require('jsonui-scripting');\n\nconst env = {};\n\nmodule.exports = env;`,
		"utf-8"
	);

Obj.forEach(
	eval(
		fs
			.readFileSync("asakiyuki.env.js", "utf-8")
			.replace(/['"`]jsonui-scripting['"`]/, '"../../index"')
	),
	(key, value) => (process.env[key] = value)
);

export {};
