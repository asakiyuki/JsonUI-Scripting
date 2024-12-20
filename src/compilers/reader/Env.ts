import fs from "fs-extra";
import { Obj } from "./Object";

Obj.forEach(
    eval(
        fs
            .readFileSync("asakiyuki.env.js", "utf-8")
            .replace(/['"`]jsonui-scripting['"`]/, '"../../index"')
    ),
    (key, value) => (process.env[key] = value)
);

export {};
