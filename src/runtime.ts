import fs from "fs-extra";
import { CachedManager } from "./cached/Manager";

process.on('exit', () => {
    fs.removeSync('.cached');
    fs.mkdirSync('.cached');
    fs.mkdirSync('.cached/ui');
    fs.mkdirSync('.cached/ui/build');
    const jsonUI: any = CachedManager.getJsonUICode();
    const ui_defs: string[] = [];
    if (Object.keys(jsonUI.global_variables).length !== 0) {
        fs.writeFileSync(
            '.cached/ui/_global_variables.json',
            JSON.stringify(jsonUI.global_variables),
            'utf-8'
        );
        console.log('JsonUI Compile', new Date(), '.cached/ui/_global_variables.json', `${Object.keys(jsonUI.global_variables).length} variables generate.`);
        delete jsonUI.global_variables;
    }

    for (const key of Object.keys(jsonUI.json)) {
        fs.writeFileSync(
            `.cached/ui/build/${key}.json`,
            JSON.stringify(jsonUI.json[key]),
            'utf-8'
        );
        ui_defs.push(`ui/build/${key}.json`);
        console.log('JsonUI Compile', new Date(), `.cached/ui/build/${key}.json`, `${Object.keys(jsonUI.json[key]).length - 1} elements generate.`)
        delete jsonUI.json[key];
    }

    fs.writeFileSync('.cached/ui/_ui_defs.json', JSON.stringify({ ui_defs }), 'utf-8');
    console.log('JsonUI Compile', new Date(), '.cached/ui/_ui_defs.json', `${ui_defs.length} files generate.`);
});