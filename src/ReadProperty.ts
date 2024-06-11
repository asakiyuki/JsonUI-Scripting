import { CachedManager } from "./CachedJsonUI";
import { Color } from "./Element";
import fs from "fs-extra";

export default function ReadJsonUIPropertyValue(value: any): any {
    if (value instanceof Array) {
        if (typeof value[0] === "string") {
            if (value[0][0] === "#") return Color.parse(value[0].slice(1))
        } else if (value[0]?.lang) {
            console.log("Build language file", new Date());
            CachedManager.createDirSync(['.cached', '.cached/texts']);
            const langKey = Object.keys(value[0]?.lang)[0];
            const langList = value[0]?.lang[langKey];
            for (const languageFile of Object.keys(langList)) {
                let text = CachedManager.readFile(`.cached/texts/${languageFile}.lang`);
                text += `${langKey}=${langList[languageFile]}\n`;
                fs.writeFileSync(`.cached/texts/${languageFile}.lang`, text, 'utf-8');
            }
            return langKey;
        }
    }
    return value;
}