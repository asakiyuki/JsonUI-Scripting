const fs = require("fs-extra");
function searchFilePaths(path = "", isStart = true) {
    const importArr = [];
    for (const folder of fs.readdirSync(`./src/${path}`)) {
        if (
            ["index.ts", "Class.ts", "Config.ts", "items.json"].includes(folder)
        ) {
            console.log(folder);
            continue;
        } else {
            if (folder.split(".").length === 2)
                importArr.push(
                    `export * from "./${path}${folder.replace(".ts", "")}";`
                );
            else importArr.push(...searchFilePaths(`${path}${folder}/`, false));
        }
    }
    return isStart
        ? [`export * from "./compilers/Config";`, ...importArr].join("\n")
        : importArr;
}
fs.writeFileSync(
    "./src/index.ts",
    `console.time("Compiler");\n${searchFilePaths()}`,
    "utf-8"
);
