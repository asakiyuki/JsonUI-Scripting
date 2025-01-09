import { Obj } from "./Object";


import(`${process.cwd()}/asakiyuki.env.js`).then(({ env }) => {
    Obj.forEach(env, (key, value) => (process.env[key]) = value);
});

export {};
