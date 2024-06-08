import { JsonUIElement } from "./Element"

export enum ElementTypes {
    Panel = "panel",
    StackPanel = "stack_panel",
    CollectionPanel = "collection_panel",
    InputPanel = "input_panel",
    Label = "label",
    Image = "image"
}

export interface ElementInterface {
    type?: ElementTypes,
    name: string,
    namespace: string,
    extend?: JsonUIElement
}

export interface ElementCachedInterface {
    name: string,
    namespace: string,
    type: string | ElementTypes,
    extend?: {
        name: string,
        namespace: string,
    }
}

export interface ElementVariables {
    require: string | boolean,
    value: any
}

export interface BindingInterface {
    ignored?: boolean | string,
    binding_type?: 'global' | 'view' | 'collection' | 'collection_details' | 'none',
    binding_name?: string,
    binding_name_override?: string,
    binding_collection_name?: string,
    binding_collection_prefix?: string,
    binding_condition?: 'always' | 'always_when_visible' | 'visible' | 'once' | 'none' | 'visibility_changed',
    source_control_name?: JsonUIElement | string,
    source_property_name?: string,
    target_property_name?: string,
    resolve_sibling_scope?: boolean | string
}