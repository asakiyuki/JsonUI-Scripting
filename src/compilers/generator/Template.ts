import { config, env, globalVariables, gitignore } from "../../template";
import { GenerateDir } from "./GenerateDir";
import fs from "fs-extra";

// Template Object
const template: { [file: string]: string } = {
    ".gitignore": gitignore,
    "asakiyuki.config.js": config
        .replace("{packname}", "JsonUI Scripting")
        .replace("{packdescription}", "Build with JsonUI Scripting <3")
        .replace("{autoinstall}", "true")
        .replace("{development}", "true")
        .replace("{preview}", "false"),
    "asakiyuki.global_variables.js": globalVariables,
    "asakiyuki.env.js": env,
};

// Generator
for (const file in template) {
    if (!fs.existsSync(file)) {
        GenerateDir(file);
        fs.writeFileSync(file, template[file], "utf-8");
    }
}
