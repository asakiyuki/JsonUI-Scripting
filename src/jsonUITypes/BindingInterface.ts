import { Bool, GlobalTypes } from "..";
import { BindingCondition } from "./BindingCondition";
import { BindingName } from "./BindingName";
import { BindingType } from "./BindingType";
import { Collection } from "./Collection";

export interface BindingInterface {
    ignored?: GlobalTypes | Bool,
    binding_type?: GlobalTypes | BindingType,
    binding_name?: GlobalTypes | BindingName | [string],
    binding_name_override?: GlobalTypes | BindingName
    binding_collection_name?: GlobalTypes | Collection,
    binding_collection_prefix?: GlobalTypes,
    binding_condition?: GlobalTypes | BindingCondition,
    source_control_name?: GlobalTypes,
    source_property_name?: GlobalTypes | BindingName | [string],
    target_property_name?: GlobalTypes | BindingName,
    resolve_sibling_scope?: GlobalTypes | Bool
}