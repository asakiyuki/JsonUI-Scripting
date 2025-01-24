import { Obj } from "./Object";

Obj.forEach(
    require(`${process.cwd()}/asakiyuki.env.cjs`).env,
    (key, value) => (process.env[key] = value)
);

export {};
