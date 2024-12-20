import { GenerateDir } from "./GenerateDir";
import fs from "fs-extra";

// File

// Env
const env = `const {} = require('jsonui-scripting');

const env = {};

nmodule.exports = env;`;

// Global variables
const globalVariables = `const {} = require("jsonui-scripting");

const global_variables = {};

module.exports = global_variables;`;

// Config
const config = `/**\n * Configuration object for the JsonUI Scripting build process.\n * @type {import('jsonui-scripting').Config}\n */

const config = {
    compiler: {
        autoCompress: false,
        fileExtension: "json",
        UI: {
            nameLength: 32,
            namespaceAmount: 16,
            namespaceLength: 32,
            obfuscateName: false,
            obfuscateType: false,
        },
    },
    installer: {
        autoInstall: true,
        developEvironment: true,
        previewVersion: false,
    },
    manifest: {
        name: "JsonUI Scripting",
        description: "Build with JsonUI Scripting <3",
        // uuid: "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx",
        // version: [1, 0, 0],
        // baseGameVersion: [1, 21, 40],
    },
};

module.exports = config;`;

// Gitignore
const gitignore = `# Node packages
node_modules

# Build Folders
.minecraft
.build
.save

# Build variables
asakiyuki.env.js

# Compress package
Minecraft-UIBuild.mcpack`;

// Template Object
const template: { [file: string]: string } = {
    ".gitignore": gitignore,
    "asakiyuki.config.js": config,
    "asakiyuki.global_variables.js": globalVariables,
    "asakiyuki.env.js": env,
};

// Generator
for (const file in template) {
    if (!fs.existsSync(file)) {
        GenerateDir(file);
        fs.writeFileSync(file, template[file], "utf-8");
    }
}
