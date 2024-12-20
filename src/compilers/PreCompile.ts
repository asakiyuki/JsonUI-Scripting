import fs from "fs-extra";

export const jsonFilePath: string[] = [];
export function UIWriteJson(
    file: string,
    data: any,
    options?: fs.WriteFileOptions
) {
    fs.writeJsonSync(file, data, options);
    jsonFilePath.push(file);
}
