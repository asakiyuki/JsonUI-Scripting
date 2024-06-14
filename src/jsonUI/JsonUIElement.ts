import { Config } from "../cached/Config";
import { CachedManager } from "../cached/Manager";
import { AnimationInterface } from "../jsonUITypes/AnimationInterface";
import { BindingInterface } from "../jsonUITypes/BindingInterface";
import { ButtonMapping } from "../jsonUITypes/ButtonMapping";
import { ElementTypes } from "../jsonUITypes/ElementTypes";
import { GetJsonUIGenerateName, GetJsonUIGenerateNames } from "../jsonUITypes/GetJsonUIGenerateName";
import { InsertElementInterface } from "../jsonUITypes/InsertElementInterface";
import { JsonUIElementInterface } from "../jsonUITypes/JsonUIElementInterface";
import { JsonUIProperty } from "../jsonUITypes/JsonUIProperty";
import { Variables } from "../jsonUITypes/Variables";
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
    insertElement(
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
                    ...value?.property
                }
            });
        }
        if (callback === undefined || callback) {
            callback?.(this, name)
            return this;
        } else return name;
    }
    insertElementArray(
        data: JsonUIElement[],
        callback?: GetJsonUIGenerateNames
    ) {

        return this;
    }
    insertVariable(
        data: Variables
    ) {
        return this;
    }
    insertKeybind(
        data: ButtonMapping
    ) {
        return this;
    }
    setBindings(
        data: BindingInterface[]
    ) {
        return this;
    }
    addBindings(
        data: BindingInterface[]
    ) {
        return this;
    }
    setAnimation(
        data: AnimationInterface
    ) {
        return this;
    }
    createVariable(
        name: string | Object | any,
        value?: any
    ) {
        return this;
    }
    setProperty(
        data: JsonUIProperty
    ) {
        return this;
    }
};