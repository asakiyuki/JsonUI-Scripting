import { GlobalTypes } from "../JsonUIProperty";
import { TextType } from "../TextTypes";
import { Bool, Num } from "../Types";

export default interface TextEditInterface {
    text_box_name?: GlobalTypes,
    text_edit_box_grid_collection_name?: GlobalTypes,
    constrain_to_rect?: GlobalTypes | Bool,
    enabled_newline?: GlobalTypes | Bool,
    text_type?: GlobalTypes | TextType,
    max_length?: GlobalTypes | Num,
    text_control?: GlobalTypes,
    place_holder_control?: GlobalTypes,
    can_be_deselected?: GlobalTypes | Bool,
    always_listening?: GlobalTypes | Bool,
    virtual_keyboard_buffer_control?: GlobalTypes,
}