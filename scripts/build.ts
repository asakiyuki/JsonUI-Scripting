import { buildSync } from "esbuild";
import { rmSync, writeFileSync } from "fs";
import path from "path";
import { performance } from "perf_hooks";
import glob from "tiny-glob";
import ts, { CompilerOptions } from "typescript";
import chalk from "chalk";

const buildTypes = process.argv.findIndex((v) => v === "--types") != -1;

async function run() {
    const startTime = performance.now();

    console.log("\x1b[32mCleaning dist directory\x1b[0m");
    rmSync("dist/cjs", {
        force: true,
        recursive: true,
    });
    rmSync("dist/esm", {
        force: true,
        recursive: true,
    });

    const target = ["ESNext", "node8.17"];
    const entryPoints = await glob("./src/**/*.ts");

    console.log("\x1b[34mBuilding dist for node (cjs)...\x1b[0m");
    buildSync({
        entryPoints,
        outdir: "./dist/cjs",
        bundle: false,
        sourcemap: false,
        minify: false,
        format: "cjs",
        platform: "node",
        target,
    });
    writeFileSync("./dist/cjs/package.json", '{"type": "commonjs"}', {
        flag: "w",
    });

    console.log("\x1b[34mBuilding dist for node type=module (esm)...\x1b[0m");
    buildSync({
        entryPoints: ["./src/index.ts"],
        outdir: "./dist/esm",
        bundle: true,
        sourcemap: false,
        minify: false,
        splitting: true,
        format: "esm",
        platform: "node",
        target,
    });
    writeFileSync("./dist/esm/package.json", '{"type": "module"}', {
        flag: "w",
    });

    if (buildTypes) {
        console.log(`\x1b[34mGenerating declaration types...\x1b[0m`);
        await generateTypes();
    }

    const endTime = performance.now();
    const executionTime = (endTime - startTime) / 1000;
    console.log(`\x1b[32mBuild Success with execution time ${executionTime.toFixed(2)} s\x1b[0m`);
}

const compilerOptions: CompilerOptions = {
    declaration: true,
    emitDeclarationOnly: true,
    declarationDir: "./dist/types/",
};

async function generateTypes() {
    const configPath = ts.findConfigFile("../", ts.sys.fileExists, "tsconfig.json");
    if (!configPath) {
        throw new Error("Không tìm thấy file tsconfig.json");
    }

    const configFile = ts.readConfigFile(configPath, ts.sys.readFile);
    const parsedConfig = ts.parseJsonConfigFileContent(configFile.config, ts.sys, path.dirname(configPath));

    const program = ts.createProgram(parsedConfig.fileNames, {
        ...parsedConfig.options,
        ...compilerOptions,
    });

    const emitResult = program.emit();

    const allDiagnostics = ts.getPreEmitDiagnostics(program).concat(emitResult.diagnostics);

    allDiagnostics.forEach((diagnostic) => {
        if (diagnostic.file) {
            console.log(
                ts.formatDiagnosticsWithColorAndContext(allDiagnostics, {
                    getCanonicalFileName(fileName) {
                        return fileName;
                    },
                    getCurrentDirectory() {
                        return process.cwd();
                    },
                    getNewLine() {
                        return "\n";
                    },
                })
            );
            // const message = ts.flattenDiagnosticMessageText(diagnostic.messageText, "\n");
            // console.log(
            //     `${chalk.blueBright(diagnostic.file.fileName)} (${chalk.red(line + 1)},${chalk.red(
            //         character + 1
            //     )}): ${chalk.yellow(message)}\n`
            // );
        } else {
            console.log(ts.flattenDiagnosticMessageText(diagnostic.messageText, "\n"));
        }
    });
}

run();
