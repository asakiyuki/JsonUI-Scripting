import { ElementTypes, ElementInterface, ElementCachedInterface, ElementVariables, BindingInterface } from "./Types";
import { CachedManager } from "./CachedJsonUI";

export class Color {
    static parse(data: string) {
        const _col = eval(`0x${data}`);
        return [
            (_col >> 8 & 255) / 255,
            (_col >> 4 & 255) / 255,
            (_col & 255) / 255
        ];
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
    insertElement(data: JsonUIElement, name?: string) {
        const obj: any = {};
        obj[`${name ?? data.name}@${data.namespace}.${data.name}`] = {};
        CachedManager.pushArray(this.jsonUIData, 'controls', obj);
        return this;
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
};