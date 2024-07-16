import { GlobalTypes } from "../..";
import { Num, Bool } from "../Types";

export default interface TTSInterface {
    tts_name?: GlobalTypes,
    tts_control_header?: GlobalTypes,
    tts_section_header?: GlobalTypes,
    tts_control_type_order_priority?: GlobalTypes | Num,
    tts_index_priority?: GlobalTypes | Num,
    tts_toggle_on?: GlobalTypes,
    tts_toggle_off?: GlobalTypes,
    tts_override_control_value?: GlobalTypes,
    tts_inherit_siblings?: GlobalTypes | Bool,
    tts_value_changed?: GlobalTypes,
    ttsSectionContainer?: GlobalTypes | Bool,
    tts_ignore_count?: GlobalTypes | Bool,
    tts_skip_message?: GlobalTypes | Bool,
    tts_value_order_priority?: GlobalTypes | Num,
    tts_play_on_unchanged_focus_control?: GlobalTypes | Bool,
    tts_ignore_subsections?: GlobalTypes | Bool,
    text_tts?: GlobalTypes,
    use_priority?: GlobalTypes | Bool,
    priority?: GlobalTypes | Bool,
}