const fs = require('fs');
const _JSON = require('comment-json');
const jsonUIs = fs.readdirSync('.jsonui', 'utf-8').map(v => {
    v = v.replace('.json', '');
    return {
        jsonUIFile: v,
        classBase: `_${v}`.replace(/_./g, v => v.slice(1).toUpperCase()),
        typeBase: `${`_${v}`.replace(/_./g, v => v.slice(1).toUpperCase())}Types`
    }
});

function readThis(readElement = [], path) {
    const elementPaths = [];
    for (const element of readElement) {
        const elementKey = Object.keys(element)[0];
        const elementName = elementKey.split('@')[0];
        const elementPath = `${path}/${elementName}`;
        elementPaths.push(`"${elementPath}"`);
        if (element[elementKey].controls) elementPaths.push(...readThis(element[elementKey].controls, elementPath));
    }
    return elementPaths;
}

function rewrite(text, allow = true) {
    return (allow ? `_${text}` : text).replace(/[_-]\w/g, v => v.slice(1).toUpperCase());
}

let index = -1;
const arr = [];
const arr2 = [];
const arr3 = [];
const arr4 = [];
const arr5 = [];

for (const value of jsonUIs) {
    index++;
    const file = fs.readFileSync(`.jsonui/${value.jsonUIFile}.json`, 'utf-8');
    file.match(/#\w+/g)?.forEach(v => {
        const _ = `    ${(v => {
            if (v[0].match(/\d/)) return `_${v}`
            else return v
        })(rewrite(v.slice(1)))} = "${v}",`
        if (!arr4.includes(_)) {
            arr4.push(_);
            arr5.push(`"${v}"`);
        };
    })
    const sex = _JSON.parse(file);
    const namespace = sex.namespace;
    delete sex.namespace;
    const elementPaths = [];

    const insideArr = [];

    for (const key in sex) {
        const path = key.replace(/@.+/g, '');
        elementPaths.push(`"${path}"`);

        insideArr.push(`        '${rewrite(path)}': "${namespace}.${path}",`);

        if (Array.isArray(sex[key].controls))
            elementPaths.push(...readThis(sex[key].controls, path));
    }

    arr3.push(`    ${rewrite(value.jsonUIFile)}: {
${insideArr.join('\n')}
    },`)

    const _ = jsonUIs[index];
    arr.push(`import { ${_.typeBase} } from "./types/${_.classBase}";`);
    arr2.push(`    static ${_.classBase[0].toLowerCase()}${_.classBase.slice(1)}(modify: ${_.typeBase}, extend?: JsonUIElement | string) {
        return new JsonUIObject(modify, "${_.jsonUIFile}", extend);
    }`)
    fs.writeFileSync(`src/vanillaModification/types/${_.classBase}.ts`, `export type ${_.typeBase} = ${elementPaths.join(' | ')};`);

};

fs.writeFileSync('src/vanillaModification/VanillaElement.ts',
    `export const VanillaElement = {
${arr3.join('\n')}
}`);

fs.writeFileSync('src/vanillaModification/Modify.ts',
    `import { JsonUIElement } from "../jsonUI/JsonUIElement";
${arr.join('\n')}
import { JsonUIObject } from "./_ScreenCommon";

export class Modify {
    private static apply() { };
    private static arguments = '';
    private static bind() { };
    private static call() { };
    private static caller = '';
    private static length = '';
    private static name = '';
    private static toString() { };
${arr2.join('\n')}
}`);

fs.writeFileSync('src/jsonUITypes/BindingName.ts', `export enum BindingName {
${arr4.join('\n')}
}`);

fs.writeFileSync('src/jsonUITypes/PropertyBagKeys.ts', `export type PropertyBagKey = ${arr5.join(' | ')};`);