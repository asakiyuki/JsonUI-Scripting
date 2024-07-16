import { GlobalTypes } from "../..";
import { Num, Bool } from "../Types";

export default interface ScrollViewInterface {
    scrollbar_track_button?: GlobalTypes,
    scrollbar_touch_button?: GlobalTypes,
    scroll_speed?: GlobalTypes | Num,
    gesture_control_enabled?: GlobalTypes | Bool,
    always_handle_scrolling?: GlobalTypes | Bool,
    touch_mode?: GlobalTypes | Bool,
    scrollbar_box?: GlobalTypes,
    scrollbar_track?: GlobalTypes,
    scroll_view_port?: GlobalTypes,
    scroll_content?: GlobalTypes,
    scroll_box_and_track_panel?: GlobalTypes,
    jump_to_bottom_on_update?: GlobalTypes | Bool,
}