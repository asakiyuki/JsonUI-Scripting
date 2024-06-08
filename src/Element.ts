import fs from "fs";
import { ControlInterface, ElementTypes, ElementInterface, ElementCachedInterface, ElementVariables, BindingInterface, RegisterResourcePack, AnimTypes, AnimationInterface, LayoutInterface } from "./Types";
import { CachedManager } from "./CachedJsonUI";

export class Color {
    static parse(data: string) {
        const _col = parseInt(data, 16);
        return [
            (_col >> 16 & 255) / 255,
            (_col >> 8 & 255) / 255,
            (_col & 255) / 255
        ];
    }
}

export class UIPackRegister {
    constructor(rspData: RegisterResourcePack) {
        if (!fs.existsSync('.cached')) fs.mkdirSync('.cached');
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
        const glovar = JSON.parse(fs.readFileSync('.cached/ui/_global_variables.json', 'utf-8'));
        glovar[`$${variable_name}`] = (value[0] === "#" && typeof value[0] === 'string') ? Color.parse(value.slice(1)) : value;
        CachedManager.toString('.cached/ui/_global_variables.json', glovar);
    }
    static registerObject(variableObject: object | any) {
        const glovar = JSON.parse(fs.readFileSync('.cached/ui/_global_variables.json', 'utf-8'));
        for (const key of Object.keys(variableObject))
            glovar[`$${key}`] = (variableObject[key][0] === "#" && typeof variableObject[key][0] === 'string') ? Color.parse(variableObject[key].slice(1)) : variableObject[key];
        CachedManager.toString('.cached/ui/_global_variables.json', glovar);
    }
    static clear() {
        CachedManager.toString('.cached/ui/_global_variables.json', {});
    }
}

export class JsonUIElement {
    private type: ElementTypes = ElementTypes.Panel;
    private namespace: string;
    private name: string;
    private extend?: JsonUIElement;
    protected jsonUIData: ElementCachedInterface;
    constructor(data: ElementInterface) {
        this.type = data.type ?? this.type;
        this.extend = data.extend;
        this.name = data.name;
        this.namespace = data.namespace;
        this.jsonUIData = { name: data.name, namespace: data.namespace, type: this.type }
        if (this.extend) this.jsonUIData["extend"] = { name: data.extend?.name ?? "", namespace: data.extend?.namespace ?? "" }
        CachedManager.data(this.jsonUIData);
    }
    insertElement(data: JsonUIElement, name?: string, variables?: object | any) {
        for (const key of Object.keys(variables ?? {})) {
            variables[`$${key}`] = variables[key];
            delete variables[key];
        }
        CachedManager.pushArray(this.jsonUIData, 'controls', {
            [`${name ?? data.name}@${data.namespace}.${data.name}`]: {
                ...variables
            }
        });
        return this;
    }
    setUIProperty() {

    }
    insertVariable(data: ElementVariables) {
        const idk: any = {};
        for (const key of Object.keys(data.value))
            idk[`$${key}`] = data.value[key]
        CachedManager.pushArray(this.jsonUIData, 'variables', {
            require: data.require,
            ...idk
        });
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
    setColor(color: string, variable_name?: string) {
        if (variable_name)
            variable_name = `$${variable_name}`;
        const obj: any = {
            color: variable_name ?? Color.parse(color)
        };
        if (variable_name)
            obj[`${variable_name}|default`] = Color.parse(color);
        CachedManager.createProperty(this.jsonUIData, obj);
        return this;
    }
    createVariable(name: string | Object | any, value?: any) {
        if (typeof name === "string") name = `$${name}`;
        else {
            const cached = name;
            name = {};
            for (const key of Object.keys(cached)) {
                if (typeof cached[key] === 'string')
                    if (cached[key][0] === '#') cached[key] = Color.parse((cached[key] as string).slice(1));
                name[`$${key}`] = cached[key];
            }
        }
        CachedManager.createProperty(this.jsonUIData, name, value);
        return this;
    }
    setControl(data: ControlInterface) {
        CachedManager.createProperty(this.jsonUIData, data);
        return this;
    }
    setLayout(data: LayoutInterface) {
        if (data.anchor) {
            if (data.anchor.from) (data as any)["anchor_from"] = data.anchor.from;
            if (data.anchor.from) (data as any)["anchor_to"] = data.anchor.to;
            delete data.anchor;
        }
        CachedManager.createProperty(this.jsonUIData, data);
        return this;
    }
    setOrientation(data: "vertical" | "horizontal") {
        CachedManager.createProperty(this.jsonUIData, "orientation", data);
        return this;
    }
};

export class AnimationRegister {
    private animationObject: any = {};
    private from: any;
    private length: number = 0;
    private name: string;
    private namespace: string;
    constructor(animateType: AnimationInterface) {
        this.from = animateType.start_value;
        this.length = animateType.data.length;
        this.name = animateType.name;
        this.namespace = animateType.namespace;
        animateType.data.forEach((v, i) => {
            const to: any = v.set_value;
            delete v.set_value;
            const controlName = (i === 0) ? animateType.name : `${animateType.name}-index:${i}`;
            this.animationObject[controlName] = {
                from: this.from, to,
                ...v,
                anim_type: animateType.type
            }
            this.from = to;
            if (i !== (this.length - 1))
                this.animationObject[controlName]['next'] = `@anims-${animateType.namespace}.${animateType.name}-index:${i += 1}`
            else if (animateType.loop)
                this.animationObject[controlName]['next'] = `@anims-${animateType.namespace}.${animateType.name}`

            CachedManager.data({
                anim_name: animateType.name,
                namespace: `anims-${animateType.namespace}`,
                data: { ...this.animationObject }
            }, true)
        })
    }
    getAnimationPath() {
        return `@anims-${this.namespace}.${this.name}`;
    }
}