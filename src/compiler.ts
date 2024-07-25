import fs from "fs-extra";
import "./pre_compile";
import { CachedManager } from "./cached/Manager";
import { Config } from "./cached/Config";
import { objectForEach } from "./lib/ObjectForEach";
import { JsonUIElement, JsonUIObject } from ".";

interface GlobalResourcePack { pack_id: string, version: [number, number, number] };
const saveConsole: any = [];
const Console = { ...console };
for (const key in console) {
    delete (console as any)[key];
    saveConsole[key] = [];
    (console as any)[key] = function () { saveConsole.push({ type: key, data: arguments }) };
}

/**
 * An array to store file paths with their relative paths from the .build directory.
 */
const content: ({ path: string })[] = [];

/**
 * A function to recursively collect file paths from the .build directory.
 *
 * @param path - The relative path from the .build directory. Default is an empty string.
 *
 * @remarks
 * This function uses fs.readdirSync and fs.statSync to read the contents of the .build directory
 * and its subdirectories. It then checks if each item is a directory or a file. If it's a directory,
 * it calls itself recursively with the new path. If it's a file, it pushes the file path to the
 * `content` array.
 */
function writeContent(path: string = '') {
    const _ = `.build${path}`;
    for (const f of fs.readdirSync(_, 'utf-8')) {
        if (fs.statSync(`${_}/${f}`).isDirectory()) writeContent(`${path}/${f}`);
        else content.push({ path: `${path}/${f}`.slice(1) });
    }
}

function BuildModifyJsonUI(data: any) {
    objectForEach(data, (value, dir) => {
        try {
            fs.writeJSONSync(`.build/${dir}`, value, 'utf-8');
        } catch (error) {
            const directorys = dir.split('/');
            directorys.pop();
            let dirSave = '.build';
            for (const directory of directorys) {
                dirSave += `/${directory}`;
                if (!fs.pathExistsSync(dirSave)) fs.mkdirSync(dirSave);
            }
            fs.writeJSONSync(`.build/${dir}`, value, 'utf-8');
        }
        console.log('[ Compiler ] >>', `.build/${dir}`, new Date(), Object.keys(value).length, 'elements modified!')
    });
}

/**
 * Event listener for the 'exit' event. This event is emitted when the Node.js process is about to exit.
 * It is not an asynchronous event and it will block the normal exit process.
 *
 * @remarks
 * This function is responsible for cleaning up the temporary cache directory,
 * compiling UI code, generating manifest and content files, and exporting the resource packs.
 */
process.on('exit', () => {
    for (const key in console) {
        delete (console as any)[key];
        (console as any)[key] = (Console as any)[key]
        delete (Console as any)[key];
    }
    // Log the export process
    let i = 0;
    for (const log of saveConsole) {
        if (i === 0) console.log('\n');
        delete saveConsole[i++];
        (console as any)[log.type](...Array.from(log.data).map(v => (v instanceof JsonUIElement || v instanceof JsonUIObject) ? (<any>v).debug() : v));
    }
    if (i !== 0) console.log('\n');

    if (!fs.existsSync('.vscode')) {
        // Create the.vscode directory
        fs.mkdirSync('.vscode');

        fs.writeJsonSync('.vscode/settings.json', {
            "json.schemas": [
                {
                    fileMatch: ["config.json"],
                    url: "./node_modules/jsonui-scripting/config.json"
                }
            ]
        })
    }

    // Remove and recreate the .build directory
    fs.removeSync('.build');
    fs.mkdirSync('.build');

    // Create necessary subdirectories
    fs.mkdirSync('.build/ui');
    fs.mkdirSync('.build/build');

    // Retrieve UI code from the cache
    const jsonUI: any = CachedManager.getJsonUICode();

    // Array to store UI definition file paths
    const ui_defs: string[] = [];

    // Process global variables and convert them to JSON format
    for (let index = 0; index < jsonUI.global_variables_arr[0].length; index++) {
        jsonUI.global_variables = {
            ...jsonUI.global_variables,
            [`$${jsonUI.global_variables_arr[0][index]}`]: jsonUI.global_variables_arr[1][index],
        }
    }

    // Delete the original global variables array
    delete jsonUI.global_variables_arr;

    // Write global variables to a JSON file
    if (Object.keys(jsonUI.global_variables).length !== 0) {
        fs.writeJSONSync(
            '.build/ui/_global_variables.json',
            jsonUI.global_variables,
            'utf-8'
        );
        console.log('[ Compiler ] >>', new Date(), '.build/ui/_global_variables.json', `${Object.keys(jsonUI.global_variables).length} variable(s) generated.`);

        // Delete the global variables from the jsonUI object
        delete jsonUI.global_variables;
    }

    // Process UI elements and write them to JSON files
    for (const key of Object.keys(jsonUI.json)) {
        fs.writeJSONSync(
            `.build/build/${key}`,
            {
                namespace: key,
                ...jsonUI.json[key]
            },
            'utf-8'
        );
        ui_defs.push(`build/${key}`);
        console.log('[ Compiler ] >>', new Date(), `.build/build/${key}`, `${Object.keys(jsonUI.json[key]).length} element(s) generated.`);

        // Delete the processed UI elements from the jsonUI object
        delete jsonUI.json[key];
    }

    // Process modified UI elements and write them to JSON files
    BuildModifyJsonUI(jsonUI.modify);

    // Write UI definition file paths to a JSON file
    fs.writeFileSync('.build/ui/_ui_defs.json', JSON.stringify({ ui_defs }), 'utf-8');
    console.log('[ Compiler ] >>', new Date(), '.build/ui/_ui_defs.json', ui_defs.length, 'file(s) generated.');

    // Write manifest information to a JSON file
    fs.writeJSONSync('.build/manifest.json', {
        format_version: 2,
        header: {
            description: Config.data.manifest?.description,
            name: Config.data.manifest?.name,
            uuid: Config.data.manifest?.uuid,
            version: Config.data.manifest?.version,
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

    // Write sound_definitions.json

    const soundsLength = Object.keys(jsonUI.sounds).length;
    if (soundsLength !== 0) {
        fs.mkdirSync('.build/sounds');
        objectForEach(jsonUI.sounds, (sounds, e) => {
            jsonUI.sounds[e] = { category: "ui", sounds: Array.isArray(sounds) ? sounds.map(v => `sounds/${v}`) : `sounds/${sounds}` };
        });
        fs.mkdir('.build/sounds');
        fs.writeJSONSync('.build/sounds/sound_definitions.json', jsonUI.sounds);
        console.log('[ Compiler ] >>', new Date(), '.build/sounds/sound_definitions.json', `${soundsLength} sound(s) generated.`);

        fs.readdirSync('.sounds').forEach(v => fs.cpSync(`.sounds/${v}`, `.build/sounds/${v}`, { recursive: true }))
    }

    // Recursively collect file paths from the .build directory
    writeContent();

    if (fs.existsSync('.textures') && fs.existsSync('.textures/.cached')) {
        for (const item of fs.readdirSync('.textures/.cached'))
            fs.copyFileSync(`.textures/.cached/${item}`, `.build/build/${item}`);
        fs.removeSync('.textures/.cached');
    }

    if (fs.existsSync('.bedrock')) {
        for (const $ of fs.readdirSync('.bedrock'))
            fs.cpSync(`.bedrock/${$}`, `.build/${$}`, { recursive: true });
        console.log('[ Compiler ] >>', "Clone resource packs", new Date());
    }

    // Write collected file paths to a JSON file
    fs.writeJSONSync('.build/contents.json', { content }, 'utf-8');
    console.log('[ Compiler ] >>', "Create content.json file", new Date(), '.build/contents.json', content.length, `file path(s) found!`);

    if (fs.existsSync('config.json')) {
        // Determine the target directory for exporting resource packs
        const path = `${process.env.LOCALAPPDATA}\\Packages\\${Config.data?.preview ? "Microsoft.MinecraftWindowsBeta_8wekyb3d8bbwe" : "Microsoft.MinecraftUWP_8wekyb3d8bbwe"}\\LocalState\\games\\com.mojang`;
        const directory = `${path}\\${Config.data?.development ? 'development_resource_packs' : 'resource_packs'}\\${Config.data?.folder_name}`;
        if (!fs.existsSync(path)) return;

        // Copy all files from the .build directory to the target directory
        if (fs.existsSync(directory))
            fs.removeSync(directory);
        if (!fs.existsSync(`${path}\\minecraftpe`))
            fs.mkdirSync(`${path}\\minecraftpe`);
        if (!fs.existsSync(`${path}\\minecraftpe\\global_resource_packs.json`))
            fs.writeFileSync(`${path}\\minecraftpe\\global_resource_packs.json`, '[]', 'utf-8');

        {
            // Install resource pack
            const readGlobalResourcePacks: GlobalResourcePack[] = fs.readJsonSync(`${path}\\minecraftpe\\global_resource_packs.json`);
            const packsGlobalData: string = JSON.stringify(<GlobalResourcePack>{
                pack_id: Config.data.manifest?.uuid || "",
                version: Config.data.manifest?.version || [0, 0, 1]
            });

            const packIndex = readGlobalResourcePacks.findIndex((value) => JSON.stringify(value) === packsGlobalData);
            if (packIndex === -1) {
                readGlobalResourcePacks.push(JSON.parse(packsGlobalData));
                fs.writeJsonSync(`${path}\\minecraftpe\\global_resource_packs.json`, readGlobalResourcePacks, 'utf-8');
                console.log('[ Installer ] >>', `Resource Packs ${Config.data.manifest?.uuid} has been installed into Global Resource Packs`, new Date());
            };
        }

        fs.readdirSync('.build').forEach(v => fs.cpSync(`.build/${v}`, `${directory}\\${v}`, { recursive: true }));
        console.log('[ Installer ] >>', "Exporting resource packs", new Date(), directory);
    }


    console.timeEnd('Compile time');
    fs.removeSync('.sounds');
});