import { Config } from "../cached/Config";
import { CachedManager } from "../cached/Manager";
import { BindingInterface } from "../jsonUITypes/BindingInterface";
import { ButtonMapping } from "../jsonUITypes/ButtonMapping";
import { ElementTypes } from "../jsonUITypes/ElementTypes";
import { GetJsonUIGenerateName, GetJsonUIGenerateNames } from "../jsonUITypes/GetJsonUIGenerateName";
import { InsertElementInterface } from "../jsonUITypes/InsertElementInterface";
import { JsonUIElementInterface } from "../jsonUITypes/JsonUIElementInterface";
import { JsonUIProperty } from "../jsonUITypes/JsonUIProperty";
import { Variables } from "../jsonUITypes/Variables";
import { objectForEach } from "../lib/ObjectForEach";
import ModifyReadJsonUIProperty from "../lib/ReadJsonUIProperty";
import { generateRandomName, getRandomNamespace } from "./GenerateRandomName";

export class JsonUIElement {
    private elementJsonUIKey: string;
    constructor(private data: JsonUIElementInterface = { type: ElementTypes.Panel }) {
        if (Config.data.obfuscator_element_name) {
            data.name = generateRandomName();
            data.namespace = getRandomNamespace();
        } else {
            data.name = data.name ?? generateRandomName();
            data.namespace = data.namespace ?? getRandomNamespace();
        }

        if (data.extend instanceof JsonUIElement) this.elementJsonUIKey = `${data.name}${data.extend.getElementPath()}`;
        else if (typeof data.extend === 'string') this.elementJsonUIKey = `${data.name}@${data.extend}`;
        else this.elementJsonUIKey = `${data.name}${data.extend ? `@${data.extend?.namespace}.${data.extend?.name}` : ''}`;
        if (data.property) data.property = ModifyReadJsonUIProperty(data.property);
        CachedManager.createElement(this, data.namespace, {
            type: data.type ?? ElementTypes.Panel,
            ...data.property
        });
    }
    getElementJsonUIKey() {
        return this.elementJsonUIKey;
    }
    getElementPath() {
        return `@${this.data.namespace}.${this.data.name}`;
    }
    registerGlobalVariable(
        variableObject: object
    ) {
        CachedManager.createGlobalVariables(variableObject);
        return this;
    }
    addElement(
        value?: InsertElementInterface | JsonUIElement,
        callback?: GetJsonUIGenerateName | null
    ) {
        const isElement = value instanceof JsonUIElement;
        const name = isElement ? generateRandomName() : value?.name ?? generateRandomName();
        if (isElement) {
            CachedManager.insertArray('controls', this, this.data.namespace ?? "", { [`${name}${value.getElementPath()}`]: {} })
        } else {
            if (value?.extend instanceof JsonUIElement) value.extend = value.extend.getElementPath().slice(1);
            CachedManager.insertArray('controls',
                this,
                this.data.namespace as string, {
                [`${name}@${value?.extend}`]: {
                    ...ModifyReadJsonUIProperty(value?.property ?? {})
                }
            });
        }
        if (callback === undefined || callback) {
            callback?.(this, name)
            return this;
        } else return name;
    }
    addElementArray(
        data: JsonUIElement[],
        callback?: GetJsonUIGenerateNames
    ) {
        return this;
    }
    addVariables(
        data: Variables
    ) {
        objectForEach(data.value, (v, k) => {
            data.value[`$${k}`] = v;
            delete data.value[k];
        });
        CachedManager.insertArray('variables', this, this.data.namespace ?? "", {
            ...data.value,
            requires: data.requires,
        });
        return this;
    }
    addKeybind(
        data: ButtonMapping | ButtonMapping[]
    ) {
        if (Array.isArray(data)) data.forEach(_ => CachedManager.insertArray('button_mappings', this, this.data.namespace ?? "", _));
        else CachedManager.insertArray('button_mappings', this, this.data.namespace ?? "", data);
        return this;
    }
    addBindings(
        data: (BindingInterface | string)[]
    ) {
        data.forEach(_ => {
            if (typeof _ === 'string') {
                const binding = _.split(':');
                (_ as BindingInterface) = {
                    binding_name: binding[0],
                    binding_name_override: binding[1]
                }
            }
            CachedManager.insertArray('bindings', this, this.data.namespace ?? "", _ as any);
        });
        return this;
    }
    addAnimation(
        data: Animation
    ) {
        return this;
    }
    addVariable(propertyKey: string, default_value: any, callback?: ((arg: JsonUIElement, variable_name: string) => void) | null) {
        const name = generateRandomName();
        CachedManager.setElementProperty(this, this.data.namespace ?? "", {
            [propertyKey]: `$${name}`,
            [`$${name}|default`]: default_value
        });
        if (callback === null || callback) {
            callback?.(this, `$${name}`);
            return `$${name}`;
        } else return this;
    }
    setProperty(
        data: JsonUIProperty
    ) {
        CachedManager.setElementProperty(this, this.data.namespace ?? "", data);
        return this;
    }
};