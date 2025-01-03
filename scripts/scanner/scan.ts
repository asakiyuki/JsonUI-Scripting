import { parse } from "jsonc-parser";
import { readGithubFile } from "../lib/github";
import { safeWriteFile } from "../lib/writeFile";

const userName = "mojang";
const project = "bedrock-samples";
const branches = "main";

async function getMCJsonFile(path: string) {
    try {
        return parse(await readGithubFile(userName, project, branches, path));
    } catch (error) {}
}

(async () => {
    const { ui_defs }: { ui_defs: string[] } = await getMCJsonFile(
        "resource_pack/ui/_ui_defs.json"
    );

    for (const path of ui_defs) {
        console.log(`Start Write: rsp/${path}`);
        const data = await getMCJsonFile(`resource_pack/${path}`);

        if (data !== undefined) safeWriteFile(`.Vanilla/${path}`, data);
    }
})();
