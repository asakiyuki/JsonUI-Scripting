import { Bool } from "../values/Bool";
import { BindingType } from "../enums/BindingType";
import { BindingName } from "../enums/BindingName";
import { Collection } from "../enums/Collection";
import { BindingCondition } from "../enums/BindingCondition";
import { Str } from "../values/Str";

export interface BindingInterface {
    ignored?: Bool,
    binding_type?: BindingType,
    binding_name?: BindingName,
    binding_name_override?: BindingName
    binding_collection_name?: Collection,
    binding_collection_prefix?: Str,
    binding_condition?: BindingCondition,
    source_control_name?: Str,
    source_property_name?: BindingName,
    target_property_name?: BindingName,
    resolve_sibling_scope?: Bool
}