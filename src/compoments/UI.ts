import { JsonBuilder } from "../compilers/JsonBuilder";
import {
    ChildElement,
    ChildIdentifier,
} from "../types/compoments/ChildIdentifier";
import { Identifier } from "../types/compoments/Identifier";
import { UIChildNameCallback } from "../types/compoments/NameCallback";
import {
    ExtendInterface,
    StaticUIInterface,
    UIInterface,
} from "../types/compoments/UIInterface";
import { Renderer } from "../types/enums/Renderer";
import { Types } from "../types/enums/Types";
import { Button } from "../types/objects/elements/Button";
import { CollectionPanel } from "../types/objects/elements/CollectionPanel";
import { Dropdown } from "../types/objects/elements/Dropdown";
import { EditBox } from "../types/objects/elements/EditBox";
import { Gird as Grid } from "../types/objects/elements/Gird";
import { Image } from "../types/objects/elements/Image";
import { InputPanel } from "../types/objects/elements/InputPanel";
import { Label } from "../types/objects/elements/Label";
import { Panel } from "../types/objects/elements/panel";
import { Screen } from "../types/objects/elements/Screen";
import { ScrollbarBox } from "../types/objects/elements/ScrollbarBox";
import { ScrollbarTrack } from "../types/objects/elements/ScrollbarTrack";
import { ScrollView } from "../types/objects/elements/ScrollView";
import { Slider } from "../types/objects/elements/Slider";
import { SliderBox } from "../types/objects/elements/SliderBox";
import { StackPanel } from "../types/objects/elements/StackPanel";
import { Toggle } from "../types/objects/elements/Toggle";
import { Properties } from "../types/objects/properties/Properties";
import { Specials } from "../types/objects/properties/Specials";
import { Random } from "./Random";
import {
    Binding,
    BindingInterface,
    Configs,
    Obj,
    PropertyBag,
    ReadProperties,
    ReadValue,
    Var,
} from "../";
import { ReadBinding } from "../compilers/ReadBinding";
import { VariablesInterface } from "../types/objects/Variables";

interface TypeExtend {
    [key: string]: string;
}
const typeExtend: TypeExtend = {};

export class UI {
    type?: string;
    name?: string;
    namespace?: string;
    extends?: string;
    controls?: Array<ChildElement>;
    bindings?: Array<BindingInterface>;
    variables?: VariablesInterface;
    properties?: Properties;

    constructor(identifier: UIInterface | UI) {
        const config = Configs.getConfig();

        if (identifier instanceof UI) {
            this.name = Random.getName();
            this.namespace = Random.getNamespace();
            this.extends = identifier.getPath();
        } else {
            this.name =
                (!config.obfuscateElementNames && identifier?.name) ||
                Random.getName();
            this.namespace =
                (!config.obfuscateElementNames && identifier?.namespace) ||
                Random.getNamespace();

            if (identifier?.extends) {
                if (identifier.type) {
                    this.type = identifier.type;
                }

                if (identifier.extends instanceof UI)
                    this.extends = `${identifier.extends.getPath()}`;
                else if (typeof identifier.extends === "string")
                    this.extends = identifier.extends;
                else
                    this.extends = `${identifier.extends.namespace}.${identifier.extends.name}`;
            } else {
                if (
                    config.useExtendElementInsteadType &&
                    identifier.namespace !== "_type_c"
                ) {
                    const type = identifier?.type || Types.Panel;
                    this.extends = typeExtend[type] ||= new UI({
                        name: type,
                        namespace: "_type_c",
                        type,
                    }).getPath();
                } else this.type = identifier?.type || Types.Panel;
            }

            if (identifier?.properties)
                this.setProperties(identifier.properties);
        }

        JsonBuilder.registerElement(this.namespace, this);
    }

    static panel(properties?: Panel, identifier?: StaticUIInterface) {
        return new UI(<UIInterface>{
            ...identifier,
            type: Types.Panel,
            properties,
        });
    }
    static stackPanel(properties?: StackPanel, identifier?: StaticUIInterface) {
        return new UI(<UIInterface>{
            ...identifier,
            type: Types.StackPanel,
            properties,
        });
    }
    static collectionPanel(
        properties?: CollectionPanel,
        identifier?: StaticUIInterface
    ) {
        return new UI(<UIInterface>{
            ...identifier,
            type: Types.CollectionPanel,
            properties,
        });
    }
    static inputPanel(properties?: InputPanel, identifier?: StaticUIInterface) {
        return new UI(<UIInterface>{
            ...identifier,
            type: Types.InputPanel,
            properties,
        });
    }
    static grid(properties?: Grid, identifier?: StaticUIInterface) {
        return new UI(<UIInterface>{
            ...identifier,
            type: Types.Grid,
            properties,
        });
    }
    static button(properties?: Button, identifier?: StaticUIInterface) {
        return new UI(<UIInterface>{
            ...identifier,
            type: Types.Button,
            properties,
        });
    }
    static toggle(properties?: Toggle, identifier?: StaticUIInterface) {
        return new UI(<UIInterface>{
            ...identifier,
            type: Types.Toggle,
            properties,
        });
    }
    static label(properties?: Label, identifier?: StaticUIInterface) {
        return new UI(<UIInterface>{
            ...identifier,
            type: Types.Label,
            properties,
        });
    }
    static image(properties?: Image, identifier?: StaticUIInterface) {
        return new UI(<UIInterface>{
            ...identifier,
            type: Types.Image,
            properties,
        });
    }
    static dropdown(properties?: Dropdown, identifier?: StaticUIInterface) {
        return new UI(<UIInterface>{
            ...identifier,
            type: Types.Dropdown,
            properties,
        });
    }
    static slider(properties?: Slider, identifier?: StaticUIInterface) {
        return new UI(<UIInterface>{
            ...identifier,
            type: Types.Slider,
            properties,
        });
    }
    static sliderBox(properties?: SliderBox, identifier?: StaticUIInterface) {
        return new UI(<UIInterface>{
            ...identifier,
            type: Types.SliderBox,
            properties,
        });
    }
    static editBox(properties?: EditBox, identifier?: StaticUIInterface) {
        return new UI(<UIInterface>{
            ...identifier,
            type: Types.EditBox,
            properties,
        });
    }
    static scrollView(properties?: ScrollView, identifier?: StaticUIInterface) {
        return new UI(<UIInterface>{
            ...identifier,
            type: Types.ScrollView,
            properties,
        });
    }
    static scrollbarTrack(
        properties?: ScrollbarTrack,
        identifier?: StaticUIInterface
    ) {
        return new UI(<UIInterface>{
            ...identifier,
            type: Types.ScrollbarTrack,
            properties,
        });
    }
    static scrollbarBox(
        properties?: ScrollbarBox,
        identifier?: StaticUIInterface
    ) {
        return new UI(<UIInterface>{
            ...identifier,
            type: Types.ScrollbarBox,
            properties,
        });
    }
    static screen(properties?: Screen, identifier?: StaticUIInterface) {
        return new UI(<UIInterface>{
            ...identifier,
            type: Types.Screen,
            properties,
        });
    }
    static custom<T extends Renderer>(
        renderer: T,
        properties?: Panel | Specials[T],
        propertyBag?: PropertyBag,
        identifier?: StaticUIInterface
    ) {
        return new UI(<UIInterface>{
            ...identifier,
            type: Types.Custom,
            properties: {
                ...properties,
                property_bag: propertyBag,
                renderer,
            },
        });
    }
    static extend(
        extendElement?: string | Identifier | UI,
        properties?: Properties
    ) {
        return new UI({
            extends: extendElement,
            properties,
        });
    }

    setProperties(properties: Properties) {
        this.properties = {
            ...(this.properties || {}),
            ...properties,
        };
        return this;
    }

    addChild(
        child: string | ChildIdentifier | UI,
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

    getUI() {
        const code: any = ReadProperties(<any>(this.properties ?? {}));

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

    getPath() {
        return `${this.namespace}.${this.name}`;
    }

    getElement() {
        return `@${this.getPath()}`;
    }

    getFullPath(): string {
        return `${this.name}${this.extends ? `@${this.extends}` : ""}`;
    }

    extend(identifier?: ExtendInterface, properties?: Properties) {
        return new UI({
            ...identifier,
            extends: this,
            properties,
        });
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
