import { CachedManager } from "../CachedJsonUI";

export class Modify {
    constructor(screen_file: string, private element_name: string) {
        CachedManager.createDirSync(['.cached', '.cached/ui']);
        CachedManager.createFilesSync({ [`.cached/ui/${screen_file}.json`]: "{}" });
        const json = CachedManager.readJson(`.cached/ui/${screen_file}.json`);
        json[element_name] = {};
        CachedManager.toString(`.cached/ui/${screen_file}.json`, json);
    }
}