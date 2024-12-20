import fs from "fs-extra";
import { Obj } from "./Object";
import { JsonBuilder } from "../generator/JsonBuilder";
import { ReadValue } from "./ReadProperties";

Obj.forEach(
    eval(
        fs
            .readFileSync("asakiyuki.global_variables.js", "utf-8")
            .replace(/['"`]jsonui-scripting['"`]/, '"../../index"')
    ),
    (key, value) => JsonBuilder.registerGlobalVariable(key, ReadValue(value))
);

export {};
