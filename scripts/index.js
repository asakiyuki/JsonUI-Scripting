const fs = require("fs-extra");
function searchFilePaths(path = "", isStart = true) {
    const importArr = [];
    for (const folder of fs.readdirSync(`./src/${path}`)) {
        if (
            [
                "index.ts",
                "Class.ts",
                "Config.ts",
                "items.json",
                "Files",
                "Env.ts",
                "GlobalVariables.ts",
                "API",
                "Template.ts",
                "PreCompile.ts",
                "template.ts",
                "create-app.ts",
            ].includes(folder)
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
        ? [
              `import "./compilers/PreCompile";`,
              `import "./compilers/generator/Template";`,
              `export * from "./compilers/Config";`,
              ...importArr,
          ].join("\n")
        : importArr;
}
fs.writeFileSync(
    "./src/index.ts",
    `console.time("Compiler");
${searchFilePaths()}
export * from "./compilers/reader/Env";
export * from "./compilers/reader/GlobalVariables";`,
    "utf-8"
);
