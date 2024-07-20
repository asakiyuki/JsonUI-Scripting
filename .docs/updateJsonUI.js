const fs = require('fs-extra');
const Json = require('comment-json');

const typesList = [], modifyList = [];
let bindingsList = {};

function GetJsonUIElements(data, readControl, elementKeyPath) {
    const elements = [];
    if (readControl) {
        for (const e of data) {
            const key = Object.keys(e)[0],
                keyPath = `${elementKeyPath}/${key.split('@')[0]}`;
            elements.push(`"${keyPath}"`);
            const element = e[key];
            if (Array.isArray(element.controls))
                elements.push(...GetJsonUIElements(element.controls, true, keyPath));
        }
    } else {
        delete data.namespace;
        for (const key in data) {
            const element = data[key],
                eKey = key.split('@')[0];
            elements.push(`"${eKey}"`);
            if (Array.isArray(element.controls))
                elements.push(...GetJsonUIElements(element.controls, true, eKey));
        }
    }
    return elements;
};

function ReadJsonUIProperty(directory, screenName, typeName) {
    const $ = fs.readFileSync(directory, 'utf-8');
    const $1 = $.match(/#\w+/g) ?? [];
    for (const binding of $1)
        bindingsList[binding.replace(/[_#]\w/g, v => v.slice(1).toUpperCase())] ??= binding;
    const dir = directory.replace(/\.jsonui\//, '');
    typesList.push(`export type ${typeName} = ${GetJsonUIElements(Json.parse($)).join(' | ')};`);
    modifyList.push(`   static ${screenName}(element: Types.${typeName}, extend?: string | JsonUIElement, properties?: JsonUIProperty) {
        return <JsonUIObject>((jsonUIScreen['ui/${dir}'] ??= {})[element] ??= new JsonUIObject(element, 'ui/${dir}', extend, properties));
    }`)
};

(function readDirectory(dir = '.jsonui') {
    for (const file of fs.readdirSync(dir, 'utf-8')) {
        const dirFile = `${dir}/${file}`;
        if (fs.statSync(dirFile).isDirectory()) readDirectory(dirFile);
        else if (dirFile !== '.jsonui/_global_variables.json') {
            const directory = dirFile.replace(/\.jsonui\//, ''),
                typeName = `_${directory}`.replace(/.json$/, '').replace(/_\w/g, v => v.slice(1).toUpperCase()).replace(/\//g, '_');

            ReadJsonUIProperty(dirFile, `${typeName[0].toLowerCase()}${typeName.slice(1)}`, typeName);
        }
    };
})();

fs.writeFileSync('src/jsonUITypes/BindingName.ts', `export enum BindingName ${Json.stringify(bindingsList, null, 4).replace(/:/g, ' =')};`);
fs.writeFileSync('src/vanillaModification/ScreenModifyTypes.ts', typesList.join('\n'));
fs.writeFileSync('src/vanillaModification/Modify.ts',
    `import { JsonUIElement } from "../jsonUI/JsonUIElement";
import { JsonUIProperty } from "../jsonUITypes/JsonUIProperty";
import { JsonUIObject } from "./_ScreenCommon";
import * as Types from "./ScreenModifyTypes";
const jsonUIScreen: any = {};

export class Modify {
    private static apply() { };
    private static arguments = '';
    private static bind() { };
    private static call() { };
    private static caller = '';
    private static length = '';
    private static name = '';
    private static toString() { };
${modifyList.join('\n')}
}`) 