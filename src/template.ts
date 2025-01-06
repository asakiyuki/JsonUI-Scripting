// Env
export const env = `export const env = {};`;

// Global variables
export const globalVariables = `import {} from "jsonui-scripting";

export const global_variables = {};`;

// Config
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
        description: "{packdescription}"
    },
};`;

// Gitignore
export const gitignore = `# Node packages
node_modules

# Build Folders
.minecraft
.build
.save

# Build variables
asakiyuki.env.js

# Compress package
Minecraft-UIBuild.mcpack`;
