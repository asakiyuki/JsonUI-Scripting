import { BindingInterface, Bool, ButtonMapping, GlobalTypes, JsonUIElement, JsonUIProperty, Num, Obj, Vector2, Vector2_str, Vector3, Vector4 } from "../..";

interface ControlExtend extends JsonUIProperty { };

interface ControlInterfaceObject {
    [key: string]: { controls?: ControlInterfaceObject } | ControlExtend,
}

interface VariableInterfaceObject {
    requires?: any,
    [key: string]: any
}

interface FactoryControlIDs {
    [key: string]: GlobalTypes
}

interface FactoryInterfaceObject {
    name?: GlobalTypes | string,
    control_name?: GlobalTypes | JsonUIElement,
    control_ids?: {
        [key: string]: GlobalTypes | JsonUIElement
    },
    max_children_size?: GlobalTypes | Num
}

export default interface ControlInterface {
    visible?: GlobalTypes | Bool,
    enabled?: GlobalTypes | Bool,
    layer?: GlobalTypes | Num,
    alpha?: GlobalTypes | Num,
    propagate_alpha?: GlobalTypes | Bool,
    clips_children?: GlobalTypes | Bool,
    allow_clipping?: GlobalTypes | Bool,
    clip_offset?: GlobalTypes | Vector2,
    clip_state_change_event?: GlobalTypes,
    enable_scissor_test?: GlobalTypes | Bool,
    property_bag?: GlobalTypes | Obj,
    selected?: GlobalTypes | Bool,
    use_child_anchors?: GlobalTypes | Bool,
    disable_anim_fast_forward?: GlobalTypes | Bool,
    animation_reset_name?: GlobalTypes,
    ignored?: GlobalTypes | Bool,
    grid_position?: GlobalTypes | Vector2,
    collection_index?: GlobalTypes | Num,
    controls?: ControlInterfaceObject[],
    variables?: VariableInterfaceObject[],
    control_ids?: GlobalTypes | FactoryControlIDs,
    bindings?: BindingInterface[]
    factory?: FactoryInterfaceObject,
    button_mappings?: ButtonMapping[]
}