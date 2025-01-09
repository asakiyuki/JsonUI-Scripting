import fs from "fs-extra";

const timeMap = new Map();

console.time = function (label) {
    timeMap.set(label, performance.now());
};

console.timeLog = function (tag, ...data) {
    const now = performance.now();
    const time = now - timeMap.get(tag);
    console.log(`\x1b[94m${tag}`, ...data, `\x1b[0m`, `(${time.toFixed(2)}ms)`);
};

console.timeEnd = function (label) {
    timeMap.delete(label);
};

export const jsonFilePath: string[] = [];
export function UIWriteJson(file: string, data: any, options?: fs.WriteFileOptions) {
    fs.writeJsonSync(file, data, options);
    jsonFilePath.push(file);
}
