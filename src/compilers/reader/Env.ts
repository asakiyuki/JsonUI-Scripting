import fs from "fs-extra";
import { Obj } from "./Object";

if (!fs.existsSync("asakiyuki.env.js"))
    fs.writeFileSync(
        "asakiyuki.env.js",
        `const env = {};\n\nmodule.exports = env;`,
        "utf-8"
    );

Obj.forEach(
    eval(fs.readFileSync("asakiyuki.env.js", "utf-8")),
    (key, value) => (process.env[key] = value)
);

export {};
