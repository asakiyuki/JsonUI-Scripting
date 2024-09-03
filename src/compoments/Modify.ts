import { JsonBuilder } from "../compilers/JsonBuilder";
import { Obj } from "../compilers/Object";
import { ReadBinding } from "../compilers/ReadBinding";
import { ReadProperties, ReadValue } from "../compilers/ReadProperties";
import {
    ChildElement,
    ChildIdentifier,
} from "../types/compoments/ChildIdentifier";
import { UIChildNameCallback } from "../types/compoments/NameCallback";
import { BindingInterface } from "../types/objects/BindingInterface";
import { Properties } from "../types/objects/properties/Properties";
import { VariablesInterface } from "../types/objects/Variables";
import { Binding } from "../types/values/Binding";
import { Var } from "../types/values/Variable";
import { Random } from "./Random";
import { UI } from "./UI";

export class Modify {
    properties: Properties = {};
    controls?: Array<ChildElement>;
    bindings?: Array<BindingInterface>;
    variables?: VariablesInterface;

    /** Constructor of Modify Minecraft Modify UI Element */
    private constructor(properties?: Properties) {
        if (properties) this.setProperties(properties);
    }

    /** Override properties for Modify UI Element */
    setProperties(properties: Properties) {
        this.properties = {
            ...this.properties,
            ...properties,
        };
        return this;
    }

    /** Override controls for Modify UI Element */
    addChild(
        child: string | UI | ChildIdentifier,
        callback?: UIChildNameCallback
    ) {
        if (!this.controls) this.controls = [];
        if (typeof child === "string") this.controls.push({ [`${child}`]: {} });
        else if (child instanceof UI) {
            const name = Random.getName();
            this.controls.push({ [`${name}${child.getElement()}`]: {} });
            callback?.(this, name);
        } else {
            child.name ??= Random.getName();
            if (child.extend instanceof UI)
                child.extend = child.extend.getPath();
            else if (typeof child.extend === "object")
                child.extend = `${child.extend.namespace}.${child.extend.name}`;
            this.controls.push({
                [`${child.name}@${child.extend}`]: ReadProperties(
                    child.properties || {}
                ),
            });
            callback?.(this, child.name);
        }
        return this;
    }

    /** Override bindings for Modify UI Element */
    addBindings(
        bindings:
            | BindingInterface
            | Binding
            | Var
            | (BindingInterface | Binding | Var)[]
    ) {
        if (Array.isArray(bindings))
            for (const binding of bindings) this.addBindings(binding);
        else (this.bindings ||= []).push(ReadBinding(<any>bindings));
        return this;
    }

    /** Override variables for Modify UI Element */
    addVariables(variables: VariablesInterface) {
        this.variables ||= {};

        Obj.forEach(variables, (key, value) => {
            (<any>this.variables)[key] = {
                ...this.variables,
                ...Obj.map(value, (k, v) => {
                    return { key: k, value: ReadValue(v) };
                }),
            };
        });

        return this;
    }

    /** Compile from class to JsonUI code */
    getUI() {
        const code: any = ReadProperties(this.properties);

        for (const key of ["type", "controls", "bindings", "button_mappings"])
            if ((<any>this)[key]) code[key] = (<any>this)[key];

        if (this.variables)
            Obj.forEach(this.variables, (k, v) => {
                (code.variables ||= []).push({
                    requires: k,
                    ...v,
                });
            });

        return code;
    }

    /** Register modify Minecraft Modify UI Element */
    static register(
        filePath: string,
        elementPath: string,
        properties?: Properties
    ) {
        return (
            JsonBuilder.getModify(filePath, elementPath)?.setProperties(
                properties || {}
            ) ??
            JsonBuilder.registerModify(
                filePath,
                elementPath,
                new Modify(properties)
            )
        );
    }

    private static apply() {}
    private static arguments = "";
    private static bind() {}
    private static call() {}
    private static caller = "";
    private static length = "";
    private static name = "";
    private static toString() {}
}
