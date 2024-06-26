import { JsonUIElement } from "../jsonUI/JsonUIElement";
import { BindingName } from "./BindingName";
import { Collection } from "./Collection";

export interface BindingInterface {
    ignored?: boolean | string,
    binding_type?: 'global' | 'view' | 'collection' | 'collection_details' | 'none',
    binding_name?: BindingName | string | string[],
    binding_name_override?: BindingName | string,
    binding_collection_name?: Collection | string,
    binding_collection_prefix?: string,
    binding_condition?: 'always' | 'always_when_visible' | 'visible' | 'once' | 'none' | 'visibility_changed',
    source_control_name?: string,
    source_property_name?: BindingName | string | string[],
    target_property_name?: BindingName | string,
    resolve_sibling_scope?: boolean | string
}