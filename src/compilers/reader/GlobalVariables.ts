import fs from "fs-extra";
import { Obj } from "./Object";
import { JsonBuilder } from "../generator/JsonBuilder";
import { ReadValue } from "./ReadProperties";

Obj.forEach(
    require(`${process.cwd()}/asakiyuki.global_variables.js`).global_variables,
    (key, value) => JsonBuilder.registerGlobalVariable(key, ReadValue(value))
);

export {};
