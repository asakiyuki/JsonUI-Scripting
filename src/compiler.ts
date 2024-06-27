import fs from "fs-extra";
import { CachedManager } from "./cached/Manager";
import { Config } from "./cached/Config";
import { objectForEach } from "./lib/ObjectForEach";

const saveConsole: any = [];
const Console = { ...console };
for (const key in console) {
    delete (console as any)[key];
    saveConsole[key] = [];
    (console as any)[key] = function () { saveConsole.push({ type: key, data: arguments }) };
}

/**
 * An array to store file paths with their relative paths from the .cached directory.
 */
const content: ({ path: string })[] = [];

/**
 * A function to recursively collect file paths from the .cached directory.
 *
 * @param path - The relative path from the .cached directory. Default is an empty string.
 *
 * @remarks
 * This function uses fs.readdirSync and fs.statSync to read the contents of the .cached directory
 * and its subdirectories. It then checks if each item is a directory or a file. If it's a directory,
 * it calls itself recursively with the new path. If it's a file, it pushes the file path to the
 * `content` array.
 */
function writeContent(path: string = '') {
    const _ = `.cached${path}`;
    for (const f of fs.readdirSync(_, 'utf-8')) {
        if (fs.statSync(`${_}/${f}`).isDirectory()) writeContent(`${path}/${f}`);
        else content.push({ path: `${path}/${f}`.slice(1) });
    }
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

    // Remove and recreate the .cached directory
    fs.removeSync('.cached');
    fs.mkdirSync('.cached');

    // Create necessary subdirectories
    fs.mkdirSync('.cached/ui');
    fs.mkdirSync('.cached/ui/build');

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
            '.cached/ui/_global_variables.json',
            jsonUI.global_variables,
            'utf-8'
        );
        console.log('Compile', new Date(), '.cached/ui/_global_variables.json', `${Object.keys(jsonUI.global_variables).length} variable(s) generated.`);

        // Delete the global variables from the jsonUI object
        delete jsonUI.global_variables;
    }

    // Process UI elements and write them to JSON files
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
        console.log('Compile', new Date(), `.cached/ui/build/${key}.json`, `${Object.keys(jsonUI.json[key]).length} element(s) generated.`);

        // Delete the processed UI elements from the jsonUI object
        delete jsonUI.json[key];
    }

    // Process modified UI elements and write them to JSON files
    for (const key of Object.keys(jsonUI.modify)) {
        fs.writeJSONSync(
            `.cached/ui/${key}.json`,
            jsonUI.modify[key],
            'utf-8'
        )
        console.log('Compile', new Date(), `.cached/ui/build/${key}.json`, `${Object.keys(jsonUI.modify[key]).length} element(s) modified.`);
    }

    // Write UI definition file paths to a JSON file
    fs.writeFileSync('.cached/ui/_ui_defs.json', JSON.stringify({ ui_defs }), 'utf-8');
    console.log('Compile', new Date(), '.cached/ui/_ui_defs.json', `${ui_defs.length} file(s) generate.`);

    // Write manifest information to a JSON file
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

    if (Config.importTextures)
        fs.cpSync(Config.importTextures, '.cached/textures/', { recursive: true });
    console.log("Clone textures", new Date());

    // Write sound_definitions.json

    const soundsLength = Object.keys(jsonUI.sounds).length;
    if (soundsLength !== 0) {
        fs.mkdirSync('.cached/sounds');
        objectForEach(jsonUI.sounds, (sounds, e) => {
            jsonUI.sounds[e] = { category: "ui", sounds: Array.isArray(sounds) ? sounds.map(v => `sounds/${v}`) : `sounds/${sounds}` };
        });
        fs.mkdir('.cached/sounds');
        fs.writeJSONSync('.cached/sounds/sound_definitions.json', jsonUI.sounds);
        console.log('Compile', new Date(), '.cached/sounds/sound_definitions.json', `${soundsLength} sound(s) generated.`);

        fs.readdirSync('.sounds').forEach(v => fs.cpSync(`.sounds/${v}`, `.cached/sounds/${v}`, { recursive: true }))
    }

    // Recursively collect file paths from the .cached directory
    writeContent();

    // Write collected file paths to a JSON file
    fs.writeJSONSync('.cached/contents.json', { content }, 'utf-8');
    console.log("Create content.json file", new Date(), '.cached/content.json', `${content.length} file path(s) found!`);

    // Log the export process
    let i = 0;
    for (const log of saveConsole) {
        if (i === 0) console.log('\n');
        delete saveConsole[i++];
        (console as any)[log.type](...log.data);
    }
    console.log('\n');

    if (fs.existsSync('config.json')) {
        // Determine the target directory for exporting resource packs
        const directory = `${process.env.LOCALAPPDATA}\\Packages\\${Config.data?.preview ? "Microsoft.MinecraftWindowsBeta_8wekyb3d8bbwe" : "Microsoft.MinecraftUWP_8wekyb3d8bbwe"}\\LocalState\\games\\com.mojang\\${Config.data?.development ? 'development_resource_packs' : 'resource_packs'}\\${Config.data?.folder_name}`;

        // Copy all files from the .cached directory to the target directory
        if (fs.existsSync(directory)) fs.removeSync(directory);
        fs.readdirSync('.cached').forEach(v => fs.cpSync(`.cached/${v}`, `${directory}\\${v}`, { recursive: true }));
        console.log("Exporting resource packs", new Date(), directory);
    }

    console.timeEnd('Compile time');
    fs.removeSync('.sounds');
});
