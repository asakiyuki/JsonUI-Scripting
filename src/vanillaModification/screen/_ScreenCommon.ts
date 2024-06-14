import { CachedManager } from "../../cached/Manager";
import { generateRandomName } from "../../jsonUI/GenerateRandomName";
import { JsonUIElement } from "../../jsonUI/JsonUIElement";
import { BindingInterface } from "../../jsonUITypes/BindingInterface";
import { ButtonMapping } from "../../jsonUITypes/ButtonMapping";
import { GetJsonUIGenerateName } from "../../jsonUITypes/GetJsonUIGenerateName";
import { InsertElementInterface } from "../../jsonUITypes/InsertElementInterface";
import { JsonUIArrayName } from "../../jsonUITypes/JsonUIArrayName";
import { JsonUIProperty } from "../../jsonUITypes/JsonUIProperty";
import { Variables } from "../../jsonUITypes/Variables";
import { objectForEach } from "../../lib/ObjectForEach";
import ModifyReadJsonUIProperty from "../../lib/ReadJsonUIProperty";

export class ScreenCommon {
    private screenInitKey: string;
    private elementModifyKey: string[] = [];
    constructor(screenInitKey: string, private screenFile: string, extend?: string | JsonUIElement) {
        this.screenInitKey = extend ? `${screenInitKey}@${(extend instanceof JsonUIElement) ? extend.getElementPath().slice(1) : extend}` : screenInitKey;
        CachedManager.screenInitRegister(this.screenInitKey, screenFile);
    }
    setProperty(property: JsonUIProperty) {
        CachedManager.writeInitElement(this.screenInitKey, this.screenFile, {
            ...CachedManager.readInitElement(this.screenInitKey, this.screenFile),
            ...ModifyReadJsonUIProperty(property),
        })
        return this;
    }
    insert(type: 'back' | 'front', arrayName: JsonUIArrayName, value: InsertElementInterface | JsonUIElement | (BindingInterface | string)[] | ButtonMapping | Variables, callback?: () => void) {
        const modifications: any[] = CachedManager.readInitElement(this.screenInitKey, this.screenFile).modifications ?? [];
        let arrayValue;
        switch (arrayName) {
            case "controls": {
                const _v: JsonUIArrayName | JsonUIElement = value as any,
                    isElement = value instanceof JsonUIElement,
                    name = isElement ? generateRandomName() : (_v as any)?.name ?? generateRandomName(),
                    extend = isElement ? (_v as JsonUIElement).getElementPath().slice(1) :
                        (() => {
                            const extend = (_v as InsertElementInterface).extend;
                            return (typeof extend === 'string') ? `@${extend}` : (extend as JsonUIElement).getElementPath();
                        })();

                arrayValue = [
                    {
                        [`${name}${isElement ? (_v as JsonUIElement).getElementPath() : extend}`]: {
                            ...ModifyReadJsonUIProperty((_v as InsertElementInterface)?.property ?? {}),
                        }
                    }
                ];
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
                objectForEach(_v.value, (v, k) => {
                    _v.value[`$${k}`] = v;
                    delete _v.value[k];
                })
                arrayValue = [
                    {
                        requires: _v.requires,
                        ..._v.value
                    }
                ]
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
    }

    addBindings(
        data: (BindingInterface | string)[]
    ) {
        const _data = CachedManager.readInitElement(this.screenInitKey, this.screenFile),
            bindings = _data.bindings ?? [];

        data = data.map(v => {
            if (typeof v === 'string') {
                const binding = v.split(':');
                return (v as BindingInterface) = {
                    binding_name: binding[0],
                    binding_name_override: binding[1]
                }
            } else return v;
        });

        bindings.push(...data);

        CachedManager.writeInitElement(this.screenInitKey, this.screenFile, {
            ..._data,
            bindings
        })
    }

    addKeybind(data: ButtonMapping | ButtonMapping[]) {
        const _data = CachedManager.readInitElement(this.screenInitKey, this.screenFile),
            button_mappings = _data.button_mappings ?? [];

        if (Array.isArray(data)) button_mappings.push(...data);
        else button_mappings.push(data);

        CachedManager.writeInitElement(this.screenInitKey, this.screenFile, {
            ..._data,
            button_mappings
        })
    }

    addVariables(
        data: Variables
    ) {
        const _data = CachedManager.readInitElement(this.screenInitKey, this.screenFile),
            variables = _data.variables ?? [];

        objectForEach(data.value, (v, k) => {
            data.value[`$${k}`] = v;
            delete data.value[k];
        });

        variables.push(data);

        CachedManager.writeInitElement(this.screenInitKey, this.screenFile, {
            ..._data,
            variables
        });
    }

    addElement(
        value: InsertElementInterface | JsonUIElement,
        callback?: (name: string) => void | null
    ) {
        const _data = CachedManager.readInitElement(this.screenInitKey, this.screenFile),
            controls = _data.controls ?? [];
        const isElement = value instanceof JsonUIElement,
            name = isElement ? generateRandomName() : value?.name ?? generateRandomName();
        if (isElement) controls.push({ [`${name}${value.getElementPath()}`]: {} });
        else {
            if (value?.extend instanceof JsonUIElement) value.extend = value.extend.getElementPath().slice(1);
            controls.push({
                [`${name}@${value.extend}`]: {
                    ...ModifyReadJsonUIProperty(value.property ?? {})
                }
            });
        }

        CachedManager.writeInitElement(this.screenInitKey, this.screenFile, {
            ..._data,
            controls
        });

        if (callback === undefined || callback) {
            callback?.(name)
            return this;
        } else return name;
    }
}