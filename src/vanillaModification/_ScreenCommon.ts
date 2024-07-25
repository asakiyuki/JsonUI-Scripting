import { Animation } from "..";
import { BindingsHandle } from "../builder/Bindings";
import { CachedManager } from "../cached/Manager";
import { generateRandomName } from "../jsonUI/GenerateRandomName";
import { JsonUIElement } from "../jsonUI/JsonUIElement";
import { BindingInterface } from "../jsonUITypes/BindingInterface";
import { ButtonMapping } from "../jsonUITypes/ButtonMapping";
import { FactoryInterface } from "../jsonUITypes/Factory";
import { GetJsonUIInitGenerateName } from "../jsonUITypes/GetJsonUIGenerateName";
import { ElementInterface, InsertElementInterface } from "../jsonUITypes/InsertElementInterface";
import { JsonUIArrayName } from "../jsonUITypes/JsonUIArrayName";
import { JsonUIProperty } from "../jsonUITypes/JsonUIProperty";
import { Variables } from "../jsonUITypes/Variables";
import { objectForEach, objectMap } from "../lib/ObjectForEach";
import ModifyReadJsonUIProperty from "../lib/ReadJsonUIProperty";


interface ModifyControls {
    swap: (where: object, target: object) => ModifyControls,
    replace: (where: object, value: object) => ModifyControls,
    remove: (where: object) => ModifyControls,
    insertBack: (value: InsertElementInterface | JsonUIElement, callback?: GetJsonUIInitGenerateName) => ModifyControls,
    insertFront: (value: InsertElementInterface | JsonUIElement, callback?: GetJsonUIInitGenerateName) => ModifyControls,
    insertBefore: (from: string, value: InsertElementInterface | JsonUIElement, callback?: GetJsonUIInitGenerateName) => ModifyControls,
    insertAfter: (from: string, value: InsertElementInterface | JsonUIElement, callback?: GetJsonUIInitGenerateName) => ModifyControls
}

interface ModifyBindings {
    swap: (where: BindingInterface, target: BindingInterface) => ModifyBindings,
    replace: (where: BindingInterface, value: BindingInterface) => ModifyBindings,
    remove: (where: BindingInterface) => ModifyBindings,
    insertBack: (value: (BindingInterface | string)[]) => ModifyBindings,
    insertFront: (value: (BindingInterface | string)[]) => ModifyBindings,
    insertBefore: (from: BindingInterface, value: (BindingInterface | string)[]) => ModifyBindings,
    insertAfter: (from: BindingInterface, value: (BindingInterface | string)[]) => ModifyBindings
}

interface ModifyButtonMapping {
    swap: (where: ButtonMapping, target: ButtonMapping) => ModifyButtonMapping,
    replace: (where: ButtonMapping, value: ButtonMapping) => ModifyButtonMapping,
    remove: (where: ButtonMapping) => ModifyButtonMapping,
    insertBack: (value: ButtonMapping) => ModifyButtonMapping,
    insertFront: (value: ButtonMapping) => ModifyButtonMapping,
    insertBefore: (from: ButtonMapping, value: ButtonMapping) => ModifyButtonMapping,
    insertAfter: (from: ButtonMapping, value: ButtonMapping) => ModifyButtonMapping
}

interface ModifyVariables {
    swap: (where: Variables, target: Variables) => ModifyVariables,
    replace: (where: Variables, value: Variables) => ModifyVariables,
    remove: (where: Variables) => ModifyVariables,
    insertBack: (value: Variables) => ModifyVariables,
    insertFront: (value: Variables) => ModifyVariables,
    insertBefore: (from: Variables, value: Variables) => ModifyVariables,
    insertAfter: (from: Variables, value: Variables) => ModifyVariables
}

interface ModificationInterface {
    controls: ModifyControls,
    bindings: ModifyBindings,
    buttonMappings: ModifyButtonMapping,
    variables: ModifyVariables
};

/**
 * Class representing a JsonUIObject.
 * This class is used to manage and manipulate screen initialization data.
 */
export class JsonUIObject {

    private screenInitKey: string;
    private elementModifyKey: string[] = [];
    modifications: ModificationInterface = {
        controls: {
            swap: (where, target) => {
                this.swap('controls', where, target);
                return this.modifications.controls;
            },
            replace: (where, value) => {
                this.replace('controls', where, value);
                return this.modifications.controls;
            },
            remove: (where) => {
                this.remove('controls', where);
                return this.modifications.controls;
            },
            insertBack: (value, callback) => {
                this.insertBack('controls', value, callback);
                return this.modifications.controls;
            },
            insertFront: (value, callback) => {
                this.insertFront('controls', value, callback);
                return this.modifications.controls;
            },
            insertBefore: (child_name, value, callback) => {
                this.insertBefore('controls', child_name, value, callback);
                return this.modifications.controls;
            },
            insertAfter: (child_name, value, callback) => {
                this.insertAfter('controls', child_name, value, callback);
                return this.modifications.controls;
            }
        },
        bindings: {
            swap: (where, target) => {
                this.swap('bindings', where, target);
                return this.modifications.bindings;
            },
            replace: (where, value) => {
                this.replace('bindings', where, value);
                return this.modifications.bindings;
            },
            remove: (where) => {
                this.remove('bindings', where);
                return this.modifications.bindings;
            },
            insertBack: (value) => {
                this.insertBack('bindings', value);
                return this.modifications.bindings;
            },
            insertFront: (value) => {
                this.insertFront('bindings', value);
                return this.modifications.bindings;
            },
            insertBefore: (from, value) => {
                this.insertBefore('bindings', from, value);
                return this.modifications.bindings;
            },
            insertAfter: (from, value) => {
                this.insertAfter('bindings', from, value);
                return this.modifications.bindings;
            }
        },
        buttonMappings: {
            swap: (where, target) => {
                this.swap('button_mappings', where, target);
                return this.modifications.buttonMappings;
            },
            replace: (where, value) => {
                this.replace('button_mappings', where, value);
                return this.modifications.buttonMappings;
            },
            remove: (where) => {
                this.remove('button_mappings', where);
                return this.modifications.buttonMappings;
            },
            insertAfter: (from, value) => {
                this.insertAfter('button_mappings', from, value);
                return this.modifications.buttonMappings;
            },
            insertBefore: (from, value) => {
                this.insertBefore('button_mappings', from, value);
                return this.modifications.buttonMappings;
            },
            insertBack: (value) => {
                this.insertBack('button_mappings', value);
                return this.modifications.buttonMappings;
            },
            insertFront: (value) => {
                this.insertFront('button_mappings', value)
                return this.modifications.buttonMappings;
            },
        },
        variables: {
            swap: (where, target) => {
                this.swap('variables', where, target);
                return this.modifications.variables;
            },
            replace: (where, value) => {
                this.replace('variables', where, value);
                return this.modifications.variables;
            },
            remove: (where) => {
                this.remove('variables', where);
                return this.modifications.variables;
            },
            insertAfter: (from, value) => {
                this.insertAfter('variables', from, value);
                return this.modifications.variables;
            },
            insertBefore: (from, value) => {
                this.insertBefore('variables', from, value);
                return this.modifications.variables;
            },
            insertBack: (value) => {
                this.insertBack('variables', value);
                return this.modifications.variables;
            },
            insertFront: (value) => {
                this.insertFront('variables', value)
                return this.modifications.variables;
            },
        },
    };

    /**
    * Create a new JsonUIObject instance.
    * @param screenInitKey - The unique key for the screen initialization.
    * @param screenFile - The file path of the screen initialization.
    * @param extend - Optional parameter to extend the screen initialization with another element or path.
    */
    constructor(screenInitKey: string, private screenFile: string, extend?: string | JsonUIElement, property?: JsonUIProperty) {
        this.screenInitKey = extend ? `${screenInitKey}@${(extend instanceof JsonUIElement) ? extend.getPath().slice(1) : extend}` : screenInitKey;
        CachedManager.screenInitRegister(this.screenInitKey, screenFile);
        if (property) this.setProperty(property);
    }

    static register(screenInitKey: string, screenFile: string, extend?: string | JsonUIElement, property?: JsonUIProperty) {
        return new this(screenInitKey, screenFile, extend, property);
    }

    /**
     * Set a property in the screen initialization data.
     * @param property - The property to set.
     * @returns The instance of JsonUIObject for method chaining.
     */
    setProperty(properties: JsonUIProperty) {
        CachedManager.writeInitElement(this.screenInitKey, this.screenFile, {
            ...CachedManager.readInitElement(this.screenInitKey, this.screenFile),
            ...ModifyReadJsonUIProperty(properties),
        })
        return this;
    }

    private getProperty(propertyName: string) {
        return CachedManager.readInitElement(this.screenInitKey, this.screenFile)[propertyName];
    }

    private swap(arrayName: JsonUIArrayName,
        where: BindingInterface | ButtonMapping | Variables | object,
        target: BindingInterface | ButtonMapping | Variables | object
    ) {
        const modifications: any[] = CachedManager.readInitElement(this.screenInitKey, this.screenFile).modifications ?? [];

        if (arrayName === 'variables') {
            const vK = Object.keys(target)[0];
            const wK = Object.keys(where)[0];

            target = {
                requires: vK,
                ...objectMap((<any>target)[vK], (v, k) => {
                    return {
                        [k.startsWith('$') ? k : `$${k}`]: v
                    }
                })
            };
            where = {
                requires: wK,
                ...objectMap((<any>where)[wK], (v, k) => {
                    return {
                        [k.startsWith('$') ? k : `$${k}`]: v
                    }
                })
            };
        }

        modifications.push({
            array_name: arrayName,
            operation: 'swap',
            where,
            target
        });

        CachedManager.writeInitElement(this.screenInitKey, this.screenFile, {
            ...CachedManager.readInitElement(this.screenInitKey, this.screenFile),
            modifications
        });

        return this;
    };

    private replace(arrayName: JsonUIArrayName,
        where: BindingInterface | ButtonMapping | Variables | object,
        value: BindingInterface | ButtonMapping | Variables | object
    ) {
        const modifications: any[] = CachedManager.readInitElement(this.screenInitKey, this.screenFile).modifications ?? [];

        if (arrayName === 'variables') {
            const vK = Object.keys(value)[0];
            const wK = Object.keys(where)[0];

            value = {
                requires: vK,
                ...objectMap((<any>value)[vK], (v, k) => {
                    return {
                        [k.startsWith('$') ? k : `$${k}`]: v
                    }
                })
            };
            where = {
                requires: wK,
                ...objectMap((<any>where)[wK], (v, k) => {
                    return {
                        [k.startsWith('$') ? k : `$${k}`]: v
                    }
                })
            };
        }

        modifications.push({
            array_name: arrayName,
            operation: 'replace',
            where,
            value
        });

        CachedManager.writeInitElement(this.screenInitKey, this.screenFile, {
            ...CachedManager.readInitElement(this.screenInitKey, this.screenFile),
            modifications
        });

        return this;
    };

    private remove(arrayName: JsonUIArrayName,
        where: BindingInterface | ButtonMapping | Variables | object
    ) {
        const modifications: any[] = CachedManager.readInitElement(this.screenInitKey, this.screenFile).modifications ?? [];

        if (arrayName === 'variables') {
            const wK = Object.keys(where)[0];
            where = {
                requires: wK,
                ...objectMap((<any>where)[wK], (v, k) => {
                    return {
                        [k.startsWith('$') ? k : `$${k}`]: v
                    }
                })
            };
        }

        modifications.push({
            array_name: arrayName,
            operation: 'remove',
            where
        });

        CachedManager.writeInitElement(this.screenInitKey, this.screenFile, {
            ...CachedManager.readInitElement(this.screenInitKey, this.screenFile),
            modifications
        });

        return this;
    };

    /**
     * Inserts an element at the end of the specified array in the screen initialization data.
     * @param arrayName - The name of the array to insert into.
     * @param value - The value to insert.
     * @param callback - Optional callback function to be executed after insertion.
     * @returns The instance of JsonUIObject for method chaining.
     */
    private insertBack(arrayName: JsonUIArrayName, value: InsertElementInterface | JsonUIElement | (BindingInterface | string)[] | ButtonMapping | Variables, callback?: GetJsonUIInitGenerateName) {
        return this.insert('back', arrayName, value, callback);
    };

    /**
     * Inserts an element at the beginning of the specified array in the screen initialization data.
     * @param arrayName - The name of the array to insert into.
     * @param value - The value to insert.
     * @param callback - Optional callback function to be executed after insertion.
     * @returns The instance of JsonUIObject for method chaining.
     */
    private insertFront(arrayName: JsonUIArrayName, value: InsertElementInterface | JsonUIElement | (BindingInterface | string)[] | ButtonMapping | Variables, callback?: GetJsonUIInitGenerateName) {
        return this.insert('front', arrayName, value, callback);
    };

    /**
    * Insert an element into a specific array in the screen initialization data.
    * @param type - The type of insertion ('back' or 'front').
    * @param arrayName - The name of the array to insert into.
    * @param value - The value to insert.
    * @param callback - Optional callback function to be executed after insertion.
    * @returns The instance of JsonUIObject for method chaining.
    */
    private insert(type: 'back' | 'front', arrayName: JsonUIArrayName, value: InsertElementInterface | JsonUIElement | (BindingInterface | string)[] | ButtonMapping | Variables, callback?: GetJsonUIInitGenerateName) {
        const modifications: any[] = CachedManager.readInitElement(this.screenInitKey, this.screenFile).modifications ?? [];
        let arrayValue;
        switch (arrayName) {
            case "controls": {
                const _v: InsertElementInterface | JsonUIElement = value as any,
                    isElement = value instanceof JsonUIElement,
                    name = isElement ? generateRandomName() : (_v as any)?.name ?? generateRandomName(),
                    extend = isElement ? (_v as JsonUIElement).getPath().slice(1) :
                        (() => {
                            const extend = (_v as InsertElementInterface).extend;
                            return (typeof extend === 'string') ? `@${extend}` : (extend as JsonUIElement).getPath();
                        })();

                arrayValue = [
                    {
                        [`${name}${isElement ? (_v as JsonUIElement).getPath() : extend}`]: {
                            ...ModifyReadJsonUIProperty((_v as InsertElementInterface)?.properties ?? {}),
                        }
                    }
                ];
                callback?.(this, name);
            }; break;
            case "button_mappings": {
                const _v: ButtonMapping = value as any;
                arrayValue = _v;
            }; break;
            case "bindings": {
                const _v: (BindingInterface | string)[] = value as any;
                arrayValue = _v.map(v => {
                    if (typeof v === 'string') {
                        const binding = v.split(':');
                        return (v as BindingInterface) = {
                            binding_name: binding[0],
                            binding_name_override: binding[1]
                        }
                    } else return v;
                });
            }; break;
            case "variables": {
                const _v: Variables = value as any;
                const k = Object.keys(_v)[0];
                const v = _v[k];
                arrayValue = [
                    {
                        requires: k,
                        ...objectMap(v, (v, k) => {
                            return {
                                [k.startsWith('$') ? k : `$${k}`]: v
                            }
                        })
                    }
                ];
            }; break;
        }

        if (this.elementModifyKey.includes(`${type}:${arrayName}`)) modifications[this.elementModifyKey.indexOf(`${type}:${arrayName}`)].value.push(...arrayValue as any[]);
        else {
            this.elementModifyKey.push(`${type}:${arrayName}`);
            modifications.push({
                array_name: arrayName,
                operation: `insert_${type}`,
                value: arrayValue
            })
        }
        CachedManager.writeInitElement(this.screenInitKey, this.screenFile, {
            ...CachedManager.readInitElement(this.screenInitKey, this.screenFile),
            modifications
        })
        return this;
    };

    /**
     * Inserts an element before a specific element in the specified array in the screen initialization data.
     * @param arrayName - The name of the array to insert into.
     * @param from - The element to insert before. Can be a string, BindingInterface, ButtonMapping, or Variables.
     * @param value - The value to insert. Can be InsertElementInterface, JsonUIElement, array of BindingInterface or string, ButtonMapping, or Variables.
     * @param callback - Optional callback function to be executed after insertion.
     * @returns The instance of JsonUIObject for method chaining.
     */
    private insertBefore(
        arrayName: JsonUIArrayName, from: string | BindingInterface | ButtonMapping | Variables,
        value: InsertElementInterface | JsonUIElement | (BindingInterface | string)[] | ButtonMapping | Variables,
        callback?: GetJsonUIInitGenerateName
    ) {
        return this._insert('before', arrayName, from, value, callback);
    }

    /**
     * Inserts an element after a specific element in the specified array in the screen initialization data.
     * @param arrayName - The name of the array to insert into.
     * @param from - The element to insert after. Can be a string, BindingInterface, ButtonMapping, or Variables.
     * @param value - The value to insert. Can be InsertElementInterface, JsonUIElement, array of BindingInterface or string, ButtonMapping, or Variables.
     * @param callback - Optional callback function to be executed after insertion.
     * @returns The instance of JsonUIObject for method chaining.
     */
    private insertAfter(
        arrayName: JsonUIArrayName, from: string | BindingInterface | ButtonMapping | Variables,
        value: InsertElementInterface | JsonUIElement | (BindingInterface | string)[] | ButtonMapping | Variables,
        callback?: GetJsonUIInitGenerateName
    ) {
        return this._insert('after', arrayName, from, value, callback);
    }

    /**
     * Private method to handle insert operations in the screen initialization data.
     * @param type - The type of insertion ('before' or 'after').
     * @param arrayName - The name of the array to insert into.
     * @param from - The element to insert before or after. Can be a string, BindingInterface, ButtonMapping, or Variables.
     * @param value - The value to insert. Can be InsertElementInterface, JsonUIElement, array of BindingInterface or string, ButtonMapping, or Variables.
     * @param callback - Optional callback function to be executed after insertion.
     * @returns The instance of JsonUIObject for method chaining.
     */
    private _insert(
        type: 'before' | 'after',
        arrayName: JsonUIArrayName, from: string | BindingInterface | ButtonMapping | Variables,
        value: InsertElementInterface | JsonUIElement | (BindingInterface | string)[] | ButtonMapping | Variables,
        callback?: GetJsonUIInitGenerateName
    ) {
        if (!this.elementModifyKey.includes(`${type}:${arrayName}:${JSON.stringify(from)}`))
            this.elementModifyKey.push(`${type}:${arrayName}:${JSON.stringify(from)}`);

        const modifyIndex = this.elementModifyKey.indexOf(`${type}:${arrayName}:${JSON.stringify(from)}`),
            modifications: any[] = CachedManager.readInitElement(this.screenInitKey, this.screenFile).modifications ?? [];

        const modifyObject = {
            value: [],
            array_name: arrayName,
            operation: `insert_${type}`,
            control_name: typeof from === 'string' ? from : undefined,
            ...modifications[modifyIndex],
        }

        let arrValue;
        switch (arrayName) {
            case "controls": {
                const _v = <JsonUIElement | InsertElementInterface>value,
                    isElement = _v instanceof JsonUIElement,
                    name = isElement ? generateRandomName() : (_v as any)?.name ?? generateRandomName(),
                    extend = isElement ? (_v as JsonUIElement).getPath().slice(1) : (() => {
                        const extend = (_v as InsertElementInterface).extend;
                        return (typeof extend === 'string') ? `@${extend}` : (extend as JsonUIElement).getPath();
                    })();

                callback?.(this, name);
                arrValue = [
                    {
                        [`${name}${isElement ? (_v as JsonUIElement).getPath() : extend}`]: {
                            ...ModifyReadJsonUIProperty((_v as InsertElementInterface)?.properties ?? {}),
                        }
                    }
                ];
            }; break;
            case "button_mappings": {
                const _v: ButtonMapping = value as any;
                arrValue = [_v];
                modifyObject['where'] = from;
            } break;
            case "bindings": {
                const _v: (BindingInterface | string)[] = value as any;
                arrValue = _v.map(v => {
                    if (typeof v === 'string') {
                        const binding = v.split(':');
                        return (v as BindingInterface) = {
                            binding_name: binding[0],
                            binding_name_override: binding[1]
                        }
                    } else return v;
                });

                modifyObject['where'] = from;
            }; break;
            case "variables": {
                const _v: Variables = value as any;
                const k = Object.keys(_v)[0];
                const v = _v[k];
                arrValue = [
                    {
                        requires: k,
                        ...objectMap(v, (v, k) => {
                            return {
                                [k.startsWith('$') ? k : `$${k}`]: v
                            }
                        })
                    }
                ];
                modifyObject['where'] = from;
            }; break;
        }

        modifyObject.value.push(...<any>arrValue);
        modifications[modifyIndex] = modifyObject;

        CachedManager.writeInitElement(this.screenInitKey, this.screenFile, {
            ...CachedManager.readInitElement(this.screenInitKey, this.screenFile),
            modifications
        })
        return this;
    }

    /**
     * Add bindings to the screen initialization data.
     * @param data - The bindings to add.
     */
    addBindings(
        data: (BindingInterface | string)[]
    ) {
        const _data = CachedManager.readInitElement(this.screenInitKey, this.screenFile),
            bindings = _data.bindings ?? [];

        bindings.push(BindingsHandle(data));

        CachedManager.writeInitElement(this.screenInitKey, this.screenFile, {
            ..._data,
            bindings
        });

        return this;
    }

    /**
     * Add keybinds to the screen initialization data.
     * @param data - The keybinds to add.
     */
    addKeybind(data: ButtonMapping | ButtonMapping[]) {
        const _data = CachedManager.readInitElement(this.screenInitKey, this.screenFile),
            button_mappings = _data.button_mappings ?? [];

        if (Array.isArray(data)) button_mappings.push(...data);
        else button_mappings.push(data);

        CachedManager.writeInitElement(this.screenInitKey, this.screenFile, {
            ..._data,
            button_mappings
        });

        return this;
    }

    /**
     * Add variables to the screen initialization data.
     * @param data - The variables to add.
     */
    addVariables(
        data: Variables
    ) {
        const _data = CachedManager.readInitElement(this.screenInitKey, this.screenFile),
            variables: any[] = _data.variables ?? [];

        objectForEach(data, (v, k) => {
            variables.push({
                requires: k,
                ...objectMap(v, (v, k) => {
                    return {
                        [k.startsWith('$') ? k : `$${k}`]: v
                    }
                })
            })
        });

        CachedManager.writeInitElement(this.screenInitKey, this.screenFile, { variables });
        return this;
    }

    /**
     * 
     */
    addAnimation(
        data: Animation
    ) {
        const _data = CachedManager.readInitElement(this.screenInitKey, this.screenFile),
            anims = _data.anims ?? [];

        anims.push(data.getPath());

        CachedManager.writeInitElement(this.screenInitKey, this.screenFile, {
            ..._data,
            anims
        });

        return this;
    }

    /**
    * Add an element to the screen initialization data.
    * @param value - The element to add.
    * @param callback - Optional callback function to be executed after addition.
    * @returns The name of the added element if callback is not provided, otherwise the instance of JsonUIObject for method chaining.
    */
    addElement(
        value: InsertElementInterface | JsonUIElement | string,
        callback?: (name: string) => void | null
    ) {
        const _data = CachedManager.readInitElement(this.screenInitKey, this.screenFile),
            controls = _data.controls ?? [];
        const isElement = value instanceof JsonUIElement,
            name = (isElement || typeof value === 'string') ? generateRandomName() : value?.name ?? generateRandomName();
        if (isElement) controls.push({ [`${name}${value.getPath()}`]: {} });
        else if (typeof value === 'string') {
            this.addElement({ extend: value, name });
            console.log('test')
            return this;
        }
        else {
            if (value?.extend instanceof JsonUIElement) value.extend = value.extend.getPath().slice(1);
            controls.push({
                [`${name}@${value.extend}`]: {
                    ...ModifyReadJsonUIProperty(value.properties ?? {})
                }
            });
        }

        CachedManager.writeInitElement(this.screenInitKey, this.screenFile, {
            ..._data,
            controls
        });

        callback?.(name)
        return this;
    };

    setFactory(
        factory_data: string | FactoryInterface,
        control_name: ElementInterface | JsonUIElement | string,
        callback?: (name: string) => void
    ) {
        const rndName = (<ElementInterface>control_name)?.name || generateRandomName();
        this.setProperty({
            factory: {
                ...(() => (typeof factory_data === 'string')
                    ? {
                        name: factory_data
                    }
                    : {
                        name: factory_data.name,
                        max_children_size: factory_data.maxChild
                    })(),
                control_name: (() => (control_name instanceof JsonUIElement)
                    ? `${rndName}${control_name.getPath()}` : (typeof control_name === 'string') ? `${rndName}@${control_name}` : `${rndName}${(() => (control_name.extend instanceof JsonUIElement) ? control_name.extend.getPath() : `@${control_name.extend}`)()}`
                )()
            }
        });
        callback?.(rndName);
        return this;
    }

    addPropertyBag(propertyBag: object) {
        return this.setProperty({
            property_bag: {
                ...this.getProperty('property_bag'),
                ...propertyBag
            }
        });
    }

    private debug() {
        return CachedManager.debugUI(this.screenFile, this.screenInitKey, true);
    }
}