import { Obj } from "./Object";
import { JsonBuilder } from "../generator/JsonBuilder";
import { ReadValue } from "./ReadProperties";

import(`${process.cwd()}/asakiyuki.env.js`).then(({ global_variables }) => {
    Obj.forEach(global_variables, (key, value) => JsonBuilder.registerGlobalVariable(key, ReadValue(value)));
});

export {};
