import fs from "fs-extra";
import { CachedManager } from "./cached/Manager";
import { Config } from "./cached/Config";

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

    // Recursively collect file paths from the .cached directory
    writeContent();

    // Write collected file paths to a JSON file
    fs.writeJSONSync('.cached/content.json', { content }, 'utf-8');
    console.log("Create content.json file", new Date(), '.cached/content.json', `${content.length} file path(s) found!`);

    // Determine the target directory for exporting resource packs
    const directory = `${process.env.LOCALAPPDATA}\\Packages\\${Config.data?.preview ? "Microsoft.MinecraftWindowsBeta_8wekyb3d8bbwe" : "Microsoft.MinecraftUWP_8wekyb3d8bbwe"}\\LocalState\\games\\com.mojang\\${Config.data?.development ? 'development_resource_packs' : 'resource_packs'}\\${Config.data?.folder_name}`;

    // Copy all files from the .cached directory to the target directory
    fs.readdirSync('.cached').forEach(v => fs.cpSync(`.cached/${v}`, `${directory}\\${v}`, { recursive: true }));


    // Log the export process
    console.log("Exporting resource packs", new Date(), directory);
    console.log("Compile time:", `${new Date().getTime() - Config.startTime}ms`)
});