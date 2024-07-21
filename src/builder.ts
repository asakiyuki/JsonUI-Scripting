import { VanillaPaths } from "./vanillaModification/UIPaths";
import fs from "fs-extra";
import * as Json from "jsonc-parser";

let currentPack: string = '';
let filePath: string = '';
let currentNamespace: string = '';
const JsonUIData: any = {};
const JsonUINamespaceCount: any = {};

if (!fs.pathExistsSync('ui')) fs.mkdirSync('ui');

function ReadUICode(data: any, elementPath?: string) {
    if (!elementPath) {
        (JsonUIData[currentPack] ??= {})[currentNamespace] ??= { filePath, elements: [] };
        for (const key in data) {
            const modifications = data[key].modifications ?? [];
            const eKey = key.split('@')[0];
            JsonUIData[currentPack][currentNamespace].elements.push(`"${eKey}"`);
            const controls = [];
            for (const modify of modifications) {
                if ((modify?.array_name === 'controls') && ['insert_back', 'insert_front', 'insert_after', 'insert_before'].includes(modify?.operation)) {
                    controls.push(...modify.value ?? []);
                }
            }
            if (Array.isArray(data[key].controls) || controls.length) ReadUICode([...data[key].controls ?? [], ...controls], eKey);
        }
    } else {
        for (const element of data) {
            const key = Object.keys(element)[0],
                eKey = `${elementPath}/${key.split('@')[0]}`;
            JsonUIData[currentPack][currentNamespace].elements.push(`"${eKey}"`);
            if (Array.isArray(element[key].controls)) ReadUICode(element[key].controls, eKey);
        }
    }
}

function ReadPack(path: string) {
    for (const file of fs.readdirSync(path)) {
        if (file === 'subpacks') continue;
        if (fs.statSync(`${path}/${file}`).isDirectory()) {
            ReadPack(`${path}/${file}`);
        } else {
            const json = Json.parse(fs.readFileSync(`${path}/${file}`, 'utf-8'));
            filePath = (`${path}/${file}`).split('/').slice(2).join('/');
            const isVanilla = VanillaPaths.includes(filePath);
            if (json?.namespace || isVanilla) {
                fs.writeFileSync(`${path}/${file}`, JSON.stringify(json, null, 4), 'utf-8');
                currentNamespace = isVanilla ? filePath.match(/\w+\.json$/)?.[0]?.replace('.json', '') : (() => {
                    if ((JsonUINamespaceCount[currentPack] ??= {})[json.namespace] ??= 0)
                        return `${json.namespace}__${++JsonUINamespaceCount[currentPack][json.namespace]}`
                    else {
                        ++JsonUINamespaceCount[currentPack][json.namespace];
                        return json.namespace;
                    }
                })();
                delete json.namespace;
                ReadUICode(json);
            } else fs.removeSync(`${path}/${file}`);
        }
    }
}

if (fs.pathExistsSync('.uipacks')) {
    for (const pack of fs.readdirSync('.uipacks')) {
        currentPack = pack;
        if (!fs.existsSync(`.uipacks/${pack}/jsonuiscripting`) && fs.statSync(`.uipacks/${pack}`).isDirectory()) {
            ReadPack(`.uipacks/${pack}`);
            fs.writeFileSync(`.uipacks/${pack}/jsonuiscripting`, 'JsonUI Scripting - Is compiled.', 'utf-8');
        }
    };
}

(function WriteTypes() {
    for (const pack in JsonUIData) {
        const easyType: any = [];

        const modify = Object.keys(JsonUIData[pack]).map(v => {
            const className = `_${v}`.replace(/(_| )\w/g, v => v.slice(1).toUpperCase());
            return `static ${className}(element, extend, properties) { return (data[\`${JsonUIData[pack][v].filePath}\`] ??= {})[element] ??= JsonUIObject.register(element, \`${JsonUIData[pack][v].filePath}\`, extend, properties); }`
        });
        console.log(`[ ${pack} reader ] >>`, modify.length, 'namespace(s) found!');

        fs.writeFileSync(`ui/${pack}.js`, `"use strict"; const { JsonUIObject } = require('jsonui-scripting'); Object.defineProperty(exports, "__esModule", { value: true }); exports.${pack} = void 0; const data = {}; class ${pack} { ${modify.join(' ')} } exports.${pack} = ${pack};`);

        const types = Object.keys(JsonUIData[pack]).map(v => {
            const className = `_${v}`.replace(/(_| )\w/g, v => v.slice(1).toUpperCase());
            console.log(`[ ${className} ]`, JsonUIData[pack][v].elements.length, 'element(s) found!', `.uipacks/${pack}/${JsonUIData[pack][v].filePath}`)
            easyType.push(`type ${className}Types = ${JsonUIData[pack][v].elements.join(" | ")};`)
            return `static ${className}(element: ${className}Types, extend?: string | JsonUIElement, properties?: JsonUIProperty): JsonUIObject;`
        });

        fs.writeFileSync(`ui/${pack}.d.ts`, `import { JsonUIElement, JsonUIObject, JsonUIProperty } from "jsonui-scripting"; ${easyType.join(' ')}; export class ${pack} { private static apply() { }; private static arguments = ''; private static bind() { }; private static call() { }; private static caller = ''; private static length = ''; private static name = ''; private static toString() { }; ${types.join(' ')}}`, 'utf-8');
    }

    const uiPack = fs.readdirSync('.uipacks');
    if (uiPack.length) {
        fs.writeFileSync('ui/index.js', `module.exports = { ${uiPack.map(v => `...require("./${v}"),`).join(' ')} }`);
        fs.writeFileSync('ui/index.d.ts', uiPack.map(v => `export * from "./${v}";`).join(''));
    }
})();
