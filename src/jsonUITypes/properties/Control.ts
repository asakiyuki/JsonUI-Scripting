import { Bool, GlobalTypes, Num, Obj, PropertyBagKey, Vector2 } from "../..";

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
    property_bag?: GlobalTypes | Obj | {
        [key in PropertyBagKey]: any
    },
    selected?: GlobalTypes | Bool,
    use_child_anchors?: GlobalTypes | Bool,
    disable_anim_fast_forward?: GlobalTypes | Bool,
    animation_reset_name?: GlobalTypes,
    ignored?: GlobalTypes | Bool,
    grid_position?: GlobalTypes | Vector2,
    collection_index?: GlobalTypes | Num,
}