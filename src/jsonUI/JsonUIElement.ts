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

/**
 * Class representing a JSON UI element.
 */
export class JsonUIElement {
    private elementJsonUIKey: string;

    /**
     * Create a new instance of JsonUIElement.
     * @param data - The initial data for the JSON UI element.
     * @example
     * ```typescript
     * const element = new JsonUIElement({ type: ElementTypes.Panel });
     * ```
     */
    constructor(private data: JsonUIElementInterface = { type: ElementTypes.Panel }) {
        if (data.extend) delete data.type;

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
        if (data.properties) data.properties = ModifyReadJsonUIProperty(data.properties);
        CachedManager.createElement(this, data.namespace, {
            type: data.type ?? (data.extend) ? undefined : ElementTypes.Panel,
            ...data.properties
        });
    }

    /**
     * Get the unique key for the JSON UI element.
     * @returns The unique key for the JSON UI element.
     */
    getElementJsonUIKey() {
        return this.elementJsonUIKey;
    }

    /**
     * Get the path of the JSON UI element.
     * @returns The path of the JSON UI element.
     */
    getElementPath() {
        return `@${this.data.namespace}.${this.data.name}`;
    }

    /**
     * Register global variables for the JSON UI element.
     * @param variableObject - The object containing the global variables.
     * @returns The instance of JsonUIElement for method chaining.
     */
    registerGlobalVariable(
        variableObject: object
    ) {
        CachedManager.createGlobalVariables(variableObject);
        return this;
    }

    /**
     * Add a child element to the JSON UI element.
     * @param value - The value of the child element.
     * @param callback - The callback function to be called after adding the child element.
     * @returns The instance of JsonUIElement for method chaining or the name of the child element.
     * @example
     * ```typescript
     * const childrenElement = new JsonUIElement({ type: ElementTypes.Panel });
     * const parentElement = new JsonUIElement({ type: ElementTypes.Panel });
     * parentElement.addElement(childrenElement);
     * ```
     */
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

    /**
     * Add an array of child elements to the JSON UI element.
     * @param data - The array of child elements.
     * @param callback - The callback function to be called after adding the child elements.
     * @returns The instance of JsonUIElement for method chaining.
     */
    addElementArray(
        data: JsonUIElement[],
        callback?: GetJsonUIGenerateNames
    ) {
        return this;
    }

    /**
     * Add variables to the JSON UI element.
     * @param data - The variables to be added.
     * @returns The instance of JsonUIElement for method chaining.
     */
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

    /**
     * Add keybinds to the JSON UI element.
     * @param data - The keybinds to be added.
     * @returns The instance of JsonUIElement for method chaining.
     */
    addKeybind(
        data: ButtonMapping | ButtonMapping[]
    ) {
        if (Array.isArray(data)) data.forEach(_ => CachedManager.insertArray('button_mappings', this, this.data.namespace ?? "", _));
        else CachedManager.insertArray('button_mappings', this, this.data.namespace ?? "", data);
        return this;
    }

    /**
     * Add bindings to the JSON UI element.
     * @param data - The bindings to be added.
     * @returns The instance of JsonUIElement for method chaining.
     */
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

    /**
     * Add an animation to the JSON UI element.
     * @param data - The animation to be added.
     * @returns The instance of JsonUIElement for method chaining.
     */
    addAnimation(
        data: Animation
    ) {
        return this;
    }

    /**
     * Add a variable to the JSON UI element.
     * @param propertyKey - The key of the property to be updated.
     * @param default_value - The default value of the variable.
     * @param callback - The callback function to be called after adding the variable.
     * @returns The instance of JsonUIElement for method chaining or the name of the variable.
     */
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

    /**
     * Set properties of the JSON UI element.
     * @param data - The properties to be set.
     * @returns The instance of JsonUIElement for method chaining.
     */
    setProperty(
        data: JsonUIProperty
    ) {
        CachedManager.setElementProperty(this, this.data.namespace ?? "", data);
        return this;
    }
};