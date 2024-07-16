import { GlobalTypes } from "../..";
import { Bool } from "../Types";

export default interface InputInterface {
    modal?: GlobalTypes | Bool,
    inline_modal?: GlobalTypes | Bool,
    always_listen_to_input?: GlobalTypes | Bool,
    always_handle_pointer?: GlobalTypes | Bool,
    always_handle_controller_direction?: GlobalTypes | Bool,
    hover_enabled?: GlobalTypes | Bool,
    prevent_touch_input?: GlobalTypes | Bool,
    consume_event?: GlobalTypes | Bool,
    consume_hover_events?: GlobalTypes | Bool,
    gesture_tracking_button?: GlobalTypes | Bool,
}