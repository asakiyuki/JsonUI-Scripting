import { Direction } from "readline";
import { GlobalTypes } from "../..";
import { Anchor } from "../Anchor";
import { Vector2_str, Bool, Num } from "../Types";
import { Color } from "../..";

export default interface LayoutInterface {
    size?: GlobalTypes | Num | Vector2_str,
    visible?: GlobalTypes | Bool,
    ignored?: GlobalTypes | Bool,
    layer?: GlobalTypes | Num,
    max_size?: GlobalTypes | Vector2_str,
    min_size?: GlobalTypes | Vector2_str,
    offset?: GlobalTypes | Vector2_str,
    anchor?: GlobalTypes | Anchor,
    anchor_from?: GlobalTypes | Anchor,
    anchor_to?: GlobalTypes | Anchor,
    inherit_max_sibling_width?: GlobalTypes | Bool,
    inherit_max_sibling_height?: GlobalTypes | Bool,
    use_anchored_offset?: GlobalTypes | Bool,
    contained?: GlobalTypes | Bool,
    draggable?: GlobalTypes | Direction,
    follows_cursor?: GlobalTypes | Bool,
    debug?: GlobalTypes | Color,
    width?: string | number,
    height?: string | number,
    x?: string | number,
    y?: string | number,
}