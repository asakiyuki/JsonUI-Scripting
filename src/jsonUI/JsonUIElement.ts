import { Config } from "../cached/Config";
import { CachedManager } from "../cached/Manager";
import { BindingInterface } from "../jsonUITypes/BindingInterface";
import { ButtonMapping } from "../jsonUITypes/ButtonMapping";
import { ElementTypes } from "../jsonUITypes/ElementTypes";
import { GetJsonUIGenerateName, GetJsonUIGenerateNames } from "../jsonUITypes/GetJsonUIGenerateName";
import { InsertElementInterface } from "../jsonUITypes/InsertElementInterface";
import { JsonUIElementInterface, StaticJsonUIElementInterface } from "../jsonUITypes/JsonUIElementInterface";
import { JsonUIProperty } from "../jsonUITypes/JsonUIProperty";
import { Renderer } from "../jsonUITypes/Renderer";
import { Variables } from "../jsonUITypes/Variables";
import { objectForEach } from "../lib/ObjectForEach";
import ModifyReadJsonUIProperty from "../lib/ReadJsonUIProperty";
import { Animation } from "./Animation";
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

    private static apply() { };
    private static arguments = '';
    private static bind() { };
    private static call() { };
    private static caller = '';
    private static length = '';
    private static name = '';
    private static toString() { };

    constructor(private data: JsonUIElementInterface = { type: ElementTypes.Panel }) {
        if (data.extend) {
            delete data.type;
        };

        if (Config.data.obfuscator_element_name) {
            data.name = generateRandomName();
            data.namespace = getRandomNamespace();
        } else {
            data.name = data.name ?? generateRandomName();
            data.namespace = data.namespace ?? getRandomNamespace();
        }

        if (data.extend instanceof JsonUIElement) this.elementJsonUIKey = `${data.name}${data.extend.getPath()}`;
        else if (typeof data.extend === 'string') this.elementJsonUIKey = `${data.name}@${data.extend}`;
        else this.elementJsonUIKey = `${data.name}${data.extend ? `@${data.extend?.namespace}.${data.extend?.name}` : ''}`;
        if (data.properties) data.properties = ModifyReadJsonUIProperty(data.properties);

        CachedManager.createElement(this, data.namespace, {
            type: data.type,
            ...data.properties
        });
    }

    static panel(data: StaticJsonUIElementInterface) {
        return new JsonUIElement({
            type: ElementTypes.Panel,
            ...data
        });
    }
    static stackPanel(data: StaticJsonUIElementInterface) {
        return new JsonUIElement({
            type: ElementTypes.StackPanel,
            ...data
        });
    };
    static collectionPanel(data: StaticJsonUIElementInterface) {
        return new JsonUIElement({
            type: ElementTypes.CollectionPanel,
            ...data
        });
    }
    static button(data: StaticJsonUIElementInterface) {
        return new JsonUIElement({
            type: ElementTypes.Button,
            ...data
        });
    }
    static toggle(data: StaticJsonUIElementInterface) {
        return new JsonUIElement({
            type: ElementTypes.Toggle,
            ...data
        });
    }
    static slider(data: StaticJsonUIElementInterface) {
        return new JsonUIElement({
            type: ElementTypes.Slider,
            ...data
        });
    }
    static label(data: StaticJsonUIElementInterface) {
        return new JsonUIElement({
            type: ElementTypes.Label,
            ...data
        });
    }
    static image(data: StaticJsonUIElementInterface) {
        return new JsonUIElement({
            type: ElementTypes.Image,
            ...data
        });
    }
    static editBox(data: StaticJsonUIElementInterface) {
        return new JsonUIElement({
            type: ElementTypes.EditBox,
            ...data
        });
    }
    static grid(data: StaticJsonUIElementInterface) {
        return new JsonUIElement({
            type: ElementTypes.Grid,
            ...data
        });
    }
    static dropdown(data: StaticJsonUIElementInterface) {
        return new JsonUIElement({
            type: ElementTypes.Dropdown,
            ...data
        });
    }
    static sliderBox(data: StaticJsonUIElementInterface) {
        return new JsonUIElement({
            type: ElementTypes.SliderBox,
            ...data
        });
    }
    static scrollView(data: StaticJsonUIElementInterface) {
        return new JsonUIElement({
            type: ElementTypes.ScrollView,
            ...data
        });
    }
    static scrollbarTrack(data: StaticJsonUIElementInterface) {
        return new JsonUIElement({
            type: ElementTypes.ScrollbarTrack,
            ...data
        });
    }
    static scrollbarBox(data: StaticJsonUIElementInterface) {
        return new JsonUIElement({
            type: ElementTypes.ScrollbarBox,
            ...data
        });
    }
    static factory(data: StaticJsonUIElementInterface) {
        return new JsonUIElement({
            type: ElementTypes.Factory,
            ...data
        });
    }
    static screen(data: StaticJsonUIElementInterface) {
        return new JsonUIElement({
            type: ElementTypes.Screen,
            ...data
        });
    }
    static custom(renderer: Renderer, data: StaticJsonUIElementInterface) {
        return new JsonUIElement({
            type: ElementTypes.Custom,
            ...data,
            properties: {
                ...(data.properties),
                renderer
            }
        });
    }
    static selectionWheel(data: StaticJsonUIElementInterface) {
        return new JsonUIElement({
            type: ElementTypes.SelectionWheel,
            ...data
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
    getPath() {
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
            CachedManager.insertArray('controls', this, this.data.namespace ?? "", { [`${name}${value.getPath()}`]: {} })
        } else {
            if (value?.extend instanceof JsonUIElement) value.extend = value.extend.getPath().slice(1);
            CachedManager.insertArray('controls',
                this,
                this.data.namespace as string, {
                [`${name}@${value?.extend}`]: {
                    ...ModifyReadJsonUIProperty(value?.properties ?? {})
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
        const name: string[] = [];
        data.forEach(_ => name.push(<string>this.addElement(_, null)));
        callback?.(this, name);
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
        data: (Animation | string)[] | (Animation | string)
    ) {
        if (Array.isArray(data)) {
            data.forEach(v => CachedManager.insertArray('anims', this, this.data.namespace ?? "", (v instanceof Animation) ? v.getPath() : v));
        } else CachedManager.insertArray('anims', this, this.data.namespace ?? "", (data instanceof Animation) ? data.getPath() : data);
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