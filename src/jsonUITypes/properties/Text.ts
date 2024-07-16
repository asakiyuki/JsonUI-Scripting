import { GlobalTypes } from "../..";
import { Anchor } from "../Anchor";
import { FontSize } from "../FontSize";
import { FontType } from "../FontType";
import { Vector3, Bool, ArrString, Num } from "../Types";

export default interface TextInterface {
    text?: GlobalTypes,
    color?: GlobalTypes | Vector3,
    locked_color?: GlobalTypes | Vector3,
    shadow?: GlobalTypes | Bool,
    hide_hyphen?: GlobalTypes | Bool,
    notify_on_ellipses?: GlobalTypes | ArrString,
    enable_profanity_filter?: GlobalTypes | Bool,
    locked_alpha?: GlobalTypes | Num,
    font_scale_factor?: GlobalTypes | Num,
    localize?: GlobalTypes | Bool,
    line_padding?: GlobalTypes | Num,
    font_size?: GlobalTypes | FontSize,
    backup_font_type?: GlobalTypes | FontType,
    text_alignment?: GlobalTypes | Anchor,
}