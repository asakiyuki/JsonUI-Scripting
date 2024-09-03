import fs from "fs-extra";

export function GenerateDir(path: string) {
    path = `.build/${path}`;
    if (!fs.existsSync(path)) {
        let lastPath = "";
        const folderPath = path.match(/([^\/]+)(?=\/.+)/g) || [];
        for (const folder of folderPath) {
            if (!fs.existsSync(`${lastPath}${folder}`))
                fs.mkdirSync(`${lastPath}${folder}`);
            lastPath = `${lastPath}${folder}/`;
        }
    }
}
