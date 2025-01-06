#!/usr/bin/env node

import { program } from "commander";
import { createInterface } from "readline";
import { execSync } from "child_process";
import fs from "fs";

export const config = `/**\n * Configuration object for the JsonUI Scripting build process.\n * @type {import('jsonui-scripting').Config}\n */
export const config = {
    compiler: {
        autoCompress: false,
        fileExtension: "json",
        encodeJson: false,
        UI: {
            nameLength: 32,
            namespaceAmount: 16,
            namespaceLength: 32,
            obfuscateName: false,
            obfuscateType: false,
        },
    },
    installer: {
        autoInstall: {autoinstall},
        developEvironment: {development},
        previewVersion: {preview},
    },
    manifest: {
        name: "{packname}",
        description: "{packdescription}",
        version: [{version}],
    },
};`;

program
    .version("2.1.4")
    .description("Make your Minecraft JsonUI with ScriptingAPI")
    .parse(process.argv);

const readline = createInterface({
    input: process.stdin,
    output: process.stdout,
});

function toNpmName(name: string): string {
    let result = name.trim().toLowerCase();
    result = result.replace(/[^a-z0-9-_]/g, "-");
    result = result.replace(/^-+/, "").replace(/-+$/, "");
    return result;
}

async function askQuestion(query: string, emptyAble: boolean = true) {
    const answer = await new Promise<string>((resolve) => {
        readline.question(`>>> ${query}: `, resolve);
    });

    if (!emptyAble && answer.trim() === "") throw "Empty input is not allowed.";
    return answer;
}

async function askBinaryQuestion(
    query: string,
    defaultBinary: "yes" | "no" = "no"
): Promise<boolean> {
    const formattedQuery =
        defaultBinary === "yes" ? `${query} (YES/no)` : `${query} (yes/NO)`;

    const answer = (await askQuestion(formattedQuery)).trim().toLowerCase();
    const result =
        answer === ""
            ? defaultBinary === "yes"
            : answer === "yes"
            ? true
            : answer === "no"
            ? false
            : undefined;

    if (result === undefined) {
        readline.close();
        throw "Invalid answer. Please enter 'yes' or 'no'.";
    }

    return result!;
}

async function askValidVersion(query: string): Promise<string> {
    const semverRegex = /^\d+\.\d+\.\d+$/;

    const version = (await askQuestion(`${query} (1.0.0)`)).trim();

    if (version === "") {
        return "1.0.0";
    } else if (!semverRegex.test(version)) {
        readline.close();
        throw "Invalid version. Please use the format X.Y.Z (e.g., 1.0.0).";
    }
    return version!;
}

(async () => {
    {
        try {
            const answer = {
                name: await askQuestion("Pack name", false),
                description: await askQuestion("Description"),
                version: await askValidVersion("Version"),
                typescript: await askBinaryQuestion(
                    "Do you want to use TypeScript?"
                ),
                autoInstall: await askBinaryQuestion("Auto-installing?", "yes"),
                preview: false,
                development: true,
            };

            if (answer.autoInstall) {
                answer.preview = await askBinaryQuestion(
                    "Installing into Minecraft Preview?"
                );
                answer.development = await askBinaryQuestion(
                    "Installing into the development environment?",
                    "yes"
                );
            }

            const installPath = `${process.cwd()}\\${toNpmName(answer.name)}`;

            if (!fs.existsSync(installPath)) {
                fs.mkdirSync(installPath);
                fs.mkdirSync(`${installPath}/src`);

                execSync("npm install jsonui-scripting", {
                    stdio: "inherit",
                    cwd: installPath,
                });

                fs.writeFileSync(
                    `${installPath}/src/app.${answer.typescript ? "ts" : "js"}`,
                    `import { Vanilla, UI } from "jsonui-scripting";

// Creating an image UI element that serves as the background
const background = UI.image({
    texture: "textures/ui/Black", // Specifies the texture (image) for the background
    size: "100%cm + 4px", // Defines the size of the background element
});

// Creating a label UI element that displays a welcome message
const text = UI.label({
    text: "Welcome to JSONUI Scripting!", // The text that will be displayed on the label
    shadow: true, // Adding a shadow effect to the text
});

// Adding the text label as a child to the background image (making the text appear over the background)
background.addChild(text, {
    layer: 15,
});

// Starting the screen content of the Vanilla engine and adding the background with the text as a child
Vanilla.start.startScreenContent().addChild(background);`,
                    "utf-8"
                );

                fs.writeFileSync(
                    `${installPath}/asakiyuki.config.js`,
                    config
                        .replace("{packname}", answer.name)
                        .replace("{packdescription}", answer.description)
                        .replace("{autoinstall}", `${answer.autoInstall}`)
                        .replace("{development}", `${answer.development}`)
                        .replace("{preview}", `${answer.preview}`)
                        .replace(
                            "{version}",
                            answer.version.replace(".", ", ")
                        ),
                    "utf8"
                );

                const packageFile = JSON.parse(
                    fs.readFileSync(`${installPath}/package.json`, "utf-8")
                );

                packageFile.type = "module";
                packageFile.name = answer.name;
                packageFile.description = answer.description;
                packageFile.version = answer.version;
                packageFile.main = `src/app.${answer.typescript ? "ts" : "js"}`;
                packageFile.scripts = answer.typescript
                    ? {
                          build: "npx bun src/app.ts",
                          dev: "npx bun --watch src/app.ts",
                      }
                    : {
                          build: "node src/app.js",
                          dev: "node --watch src/app.js",
                      };

                fs.writeFileSync(
                    `${installPath}/package.json`,
                    JSON.stringify(packageFile, null, 4),
                    "utf-8"
                );

                console.log(
                    "The installation process is complete, you can use the command 'npm run build' to build the package or 'npm run dev' during development."
                );
            } else {
                throw "This project already exists.";
            }
        } catch (error) {
            console.error(`\nERR: ${error}`);
            readline.close();
        }
    }
    readline.close();
})();

program.opts();
