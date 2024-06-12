import fs from "fs-extra";
import { JsonUIProperty, ElementTypes, ElementInterface, ElementCachedInterface, ElementVariables, BindingInterface, RegisterResourcePack, AnimTypes, AnimationInterface, ExtendInterface, ButtonMapping, GetJsonUIGenerateName } from "./Types";
import { CachedManager } from "./CachedJsonUI";
import ReadJsonUIPropertyValue from "./ReadProperty";

export function generateRandomName() { return Array.from({ length: 25 }, v => Math.floor(Math.random() * 16).toString(16)).join(''); }
const defaultNamespace: string = generateRandomName();
console.log('JsonUI Compiler');
export class Color {
    static parse(data: string) {
        const _col = parseInt(data, 16);
        switch (data.length) {
            case 3:
                return [
                    (_col >> 8 & 15) / 15,
                    (_col >> 4 & 15) / 15,
                    (_col & 15) / 15
                ];
            case 4:
                return [
                    (_col >> 16 & 15) / 15,
                    (_col >> 8 & 15) / 15,
                    (_col >> 4 & 15) / 15,
                    (_col & 15) / 15
                ];
            case 8:
                return [
                    (_col >> 24 & 255) / 255,
                    (_col >> 16 & 255) / 255,
                    (_col >> 8 & 255) / 255,
                    (_col & 255) / 255
                ];
            case 6:
                return [
                    (_col >> 16 & 255) / 255,
                    (_col >> 8 & 255) / 255,
                    (_col & 255) / 255
                ];
            default:
                return null;
        }

    }
}

export class UIPackRegister {
    constructor(rspData: RegisterResourcePack) {
        fs.mkdirSync('.cached', { recursive: true });
        fs.writeFileSync(`.cached/manifest.json`, JSON.stringify({
            format_version: 2,
            header: {
                description: rspData.description ?? "",
                name: rspData.pack_name,
                uuid: rspData.uuid ?? "$$$$$$$$-$$$$-$$$$-$$$$-$$$$$$$$$$$$".replace(/\$/g, () => Math.floor(Math.random() * 16).toString(16)),
                version: rspData.version ?? [0, 0, 1],
                min_engine_version: rspData.min_version ?? [1, 20, 0]
            },
            modules: [
                {
                    type: "resources",
                    uuid: "743f6949-53be-44b6-b326-398005028819",
                    version: [0, 0, 1]
                }
            ]
        }), 'utf-8');
    }
}

export class GlobalVariables {
    static register(variable_name: string, value: any) {
        CachedManager.createDirSync(['.cached', '.cached/ui']);
        if (!fs.existsSync('.cached/ui/_global_variables.json')) fs.writeFileSync(`.cached/ui/_global_variables.json`, "{}", 'utf-8');
        const glovar = JSON.parse(fs.readFileSync('.cached/ui/_global_variables.json', 'utf-8'));
        glovar[`$${variable_name}`] = ReadJsonUIPropertyValue(value);
        CachedManager.toString('.cached/ui/_global_variables.json', glovar);
    }
    static registerObject(variableObject: object | any) {
        CachedManager.createDirSync(['.cached', '.cached/ui']);
        if (!fs.existsSync('.cached/ui/_global_variables.json')) fs.writeFileSync(`.cached/ui/_global_variables.json`, "{}", 'utf-8');
        const glovar = JSON.parse(fs.readFileSync('.cached/ui/_global_variables.json', 'utf-8'));
        for (const key of Object.keys(variableObject))
            glovar[`$${key}`] = ReadJsonUIPropertyValue(variableObject[key]);
        CachedManager.toString('.cached/ui/_global_variables.json', glovar);
    }
    static clear() {
        CachedManager.toString('.cached/ui/_global_variables.json', {});
    }
}

export class RegisterLanguage {
    constructor(languageFile: string, languageName: string) {
        CachedManager.createDirSync(['.cached', '.cached/texts']);
        const langName: [string | string][] = CachedManager.readJson(`.cached/texts/language_names.json`) ?? [],
            langFile: string[] = CachedManager.readJson(`.cached/texts/languages.json`) ?? [];
        if (!langFile.includes(languageFile)) (langFile as any).push(languageFile);
        let index: number = 0;
        for (const lang of langName) {
            if (lang[0] === languageFile) {
                (langName as any)[index] = [languageFile, languageName];
                break;
            }
            index++;
        }
        (langName as any).push([languageFile, languageName]);
        CachedManager.toString('.cached/texts/language_names.json', langName);
        CachedManager.toString('.cached/texts/languages.json', langFile);
    }
}

export class JsonUIElement {
    private type?: ElementTypes = ElementTypes.Panel;
    private namespace: string;
    private name: string;
    private extend?: JsonUIElement | ExtendInterface;
    public jsonUIData: ElementCachedInterface;
    constructor(data: ElementInterface = {}) {
        this.type = data.extend ? undefined ?? data.type : data.type ?? this.type;
        const $ = generateRandomName();
        this.name = data.name ?? $;
        this.namespace = data.namespace ?? defaultNamespace;
        this.jsonUIData = { name: data.name ?? $, namespace: data.namespace ?? defaultNamespace, type: this.type }
        console.log('Creating UI Object', new Date(), `${this.namespace}.${this.name}`)
        this.extend = data.extend;
        if (this.extend) this.jsonUIData["extend"] = { name: (data.extend as any)?.name ?? "", namespace: (data.extend as any)?.namespace ?? "" }
        CachedManager.data(this.jsonUIData);
    }
    getElementPath() {
        return `@${this.namespace}.${this.name}`;
    }
    registerGlobalVariable(variableObject: object) {
        GlobalVariables.registerObject(variableObject);
        return this;
    }
    insertElement(data: JsonUIElement, elementProperty?: JsonUIProperty, name?: string | null, callback?: GetJsonUIGenerateName) {
        if (elementProperty?.anchor) {
            elementProperty.anchor_from = elementProperty.anchor;
            elementProperty.anchor_to = elementProperty.anchor;
            delete elementProperty.anchor
        }
        const e = name ?? generateRandomName();
        callback?.(e);
        for (const key of Object.keys((elementProperty as any) ?? {}))
            (elementProperty as any)[`${key}`] = ReadJsonUIPropertyValue((elementProperty as any)[key]);
        CachedManager.pushArray(this.jsonUIData, 'controls', {
            [`${e}${data.getElementPath()}`]: {
                ...(elementProperty as any)
            }
        });
        return this;
    }
    insertVariable(data: ElementVariables) {
        const idk: any = {};
        for (const key of Object.keys(data.value))
            idk[`$${key}`] = ReadJsonUIPropertyValue(data.value[key]);
        CachedManager.pushArray(this.jsonUIData, 'variables', {
            require: data.require,
            ...idk
        });
        return this;
    }
    insertKeybind(data: ButtonMapping) {
        CachedManager.setArray(this.jsonUIData, 'button_mappings', data);
        return this;
    }
    setBindings(data: BindingInterface[]) {
        CachedManager.setArray(this.jsonUIData, 'bindings', data.map(v => {
            if (typeof v.source_control_name === 'object')
                v.source_control_name = v.source_control_name.name
            return v;
        }));
        return this;
    }
    addBindings(data: BindingInterface[]) {
        CachedManager.pushArr(this.jsonUIData, 'bindings', data);
        return this;
    }
    setAnimation(data: AnimationRegister) {
        CachedManager.pushArray(this.jsonUIData, 'anims', data.getAnimationPath());
        return this;
    }
    createVariable(name: string | Object | any, value?: any) {
        if (typeof name === "string") name = `$${name}`;
        else {
            const cached = name;
            name = {};
            for (const key of Object.keys(cached))
                name[`$${key}`] = ReadJsonUIPropertyValue(cached[key]);
        }
        CachedManager.createProperty(this.jsonUIData, name, value);
        return this;
    }
    setProperty(data: JsonUIProperty) {
        if (data.anchor) {
            data.anchor_from = data.anchor;
            data.anchor_to = data.anchor;
            delete data.anchor
        }
        CachedManager.createProperty(this.jsonUIData, data);
        return this;
    }
};

export class UITexture {
    constructor(directory_path: string) {
        fs.cpSync(directory_path, '.cached/textures/', { recursive: true });
    }
}

export class AnimationRegister {
    private animationObject: any = {};
    private from: any;
    private length: number = 0;
    private name: string;
    private namespace: string;
    constructor(animateType: AnimationInterface) {
        this.from = animateType.start_value;
        this.length = animateType.data.length;
        animateType.name = animateType.name ?? generateRandomName();
        this.name = animateType.name ?? generateRandomName();
        animateType.namespace = animateType.namespace ?? defaultNamespace;
        this.namespace = animateType.namespace ?? defaultNamespace;
        console.log('Creating Animation UI Object', new Date(), `anims-${animateType.name}-index`)
        const startAnimation: any = {};
        Object.assign(startAnimation, animateType);
        delete startAnimation.start_value;
        delete startAnimation.data;
        delete startAnimation.name;
        delete startAnimation.type;
        delete startAnimation.loop;
        delete startAnimation.namespace;
        animateType.data.forEach((v: any, i) => {
            const to: any = v.set_value;
            delete v.set_value;
            const controlName: any = (i === 0) ? animateType.name : `${animateType.name}-index:${i}`;
            this.from = v.override_from_value ?? this.from;
            delete v.override_from_value;
            this.animationObject[controlName] = (typeof v === "number") ? {
                anim_type: AnimTypes.Wait,
                duration: v,
                ...((i === 0) ? startAnimation : {})
            } : {
                from: this.from, to,
                ...v,
                ...((i === 0) ? startAnimation : {}),
                anim_type: animateType.type
            }
            this.from = to ?? this.from;
            if (i !== (this.length - 1)) this.animationObject[controlName]['next'] = `@anims-${animateType.namespace}.${animateType.name}-index:${i += 1}`
            else if (animateType.loop) this.animationObject[controlName]['next'] = `@anims-${animateType.namespace}.${animateType.name}`

            CachedManager.data({
                anim_name: animateType.name,
                namespace: `anims-${animateType.namespace}`,
                data: { ...this.animationObject }
            } as any, true)
        })
    }
    getAnimationPath() {
        return `@anims-${this.namespace}.${this.name}`;
    }
}