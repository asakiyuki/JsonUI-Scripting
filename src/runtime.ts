import fs from "fs-extra";
import { CachedManager } from "./cached/Manager";
import { Config } from "./cached/Config";

const content: ({ path: string })[] = [];
function writeContent(path: string = '') {
    const _ = `.cached${path}`;
    for (const f of fs.readdirSync(_, 'utf-8')) {
        if (fs.statSync(`${_}/${f}`).isDirectory()) writeContent(`${path}/${f}`);
        else content.push({ path: `${path}/${f}`.slice(1) });
    }
}

process.on('exit', () => {
    fs.removeSync('.cached');
    fs.mkdirSync('.cached');
    fs.mkdirSync('.cached/ui');
    fs.mkdirSync('.cached/ui/build');
    const jsonUI: any = CachedManager.getJsonUICode();
    const ui_defs: string[] = [];
    for (let index = 0; index < jsonUI.global_variables_arr[0].length; index++) {
        jsonUI.global_variables = {
            ...jsonUI.global_variables,
            [`$${jsonUI.global_variables_arr[0][index]}`]: jsonUI.global_variables_arr[1][index],
        }
    }

    delete jsonUI.global_variables_arr;

    if (Object.keys(jsonUI.global_variables).length !== 0) {
        fs.writeJSONSync(
            '.cached/ui/_global_variables.json',
            jsonUI.global_variables,
            'utf-8'
        );
        console.log('Compile', new Date(), '.cached/ui/_global_variables.json', `${Object.keys(jsonUI.global_variables).length} variable(s) generated.`);
        delete jsonUI.global_variables;
    }

    for (const key of Object.keys(jsonUI.json)) {
        fs.writeJSONSync(
            `.cached/ui/build/${key}.json`,
            {
                namespace: key,
                ...jsonUI.json[key]
            },
            'utf-8'
        );
        ui_defs.push(`ui/build/${key}.json`);
        console.log('Compile', new Date(), `.cached/ui/build/${key}.json`, `${Object.keys(jsonUI.json[key]).length} element(s) generated.`)
        delete jsonUI.json[key];
    }

    for (const key of Object.keys(jsonUI.modify)) {
        fs.writeJSONSync(
            `.cached/ui/${key}.json`,
            jsonUI.modify[key],
            'utf-8'
        )
        console.log('Compile', new Date(), `.cached/ui/build/${key}.json`, `${Object.keys(jsonUI.modify[key]).length} element(s) modified.`)
    }

    fs.writeFileSync('.cached/ui/_ui_defs.json', JSON.stringify({ ui_defs }), 'utf-8');
    console.log('Compile', new Date(), '.cached/ui/_ui_defs.json', `${ui_defs.length} file(s) generate.`);

    fs.writeJSONSync('.cached/manifest.json', {
        format_version: 2,
        header: {
            description: Config.data.manifest?.description,
            name: Config.data.manifest?.name,
            uuid: Config.data.manifest?.uuid,
            version: [0, 0, 1],
            min_engine_version: [1, 13, 0]
        },
        modules: [
            {
                description: Config.data.manifest?.description,
                type: "resources",
                uuid: "53644fac-a276-42e5-843f-a3c6f169a9ab",
                version: [0, 0, 1]
            }
        ]
    }, 'utf-8');

    writeContent();
    fs.writeJSONSync('.cached/content.json', { content }, 'utf-8');
    console.log("Create content.json file", new Date(), '.cached/content.json', `${content.length} file path(s) found!`);

    const directory = `${process.env.LOCALAPPDATA}\\Packages\\${Config.data?.preview ? "Microsoft.MinecraftWindowsBeta_8wekyb3d8bbwe" : "Microsoft.MinecraftUWP_8wekyb3d8bbwe"}\\LocalState\\games\\com.mojang\\${Config.data?.development ? 'development_resource_packs' : 'resource_packs'}\\${Config.data?.folder_name}`;
    fs.readdirSync('.cached').forEach(v => fs.cpSync(`.cached/${v}`, `${directory}\\${v}`, { recursive: true }));

    console.log("Exporting resource packs", new Date(), directory);
});