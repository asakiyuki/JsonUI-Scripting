import { GlobalTypes } from "../.."
import { Bool, Num } from "../Types"

export default interface ToggleInterface {
    radio_toggle_group?: GlobalTypes | Bool,
    toggle_name?: GlobalTypes,
    toggle_default_state?: GlobalTypes | Bool,
    toggle_group_forced_index?: GlobalTypes | Num,
    toggle_group_default_selected?: GlobalTypes | Num,
    reset_on_focus_lost?: GlobalTypes | Bool,
    toggle_on_hover?: GlobalTypes,
    toggle_on_button?: GlobalTypes,
    toggle_off_button?: GlobalTypes,
    enable_directional_toggling?: GlobalTypes | Bool,
    toggle_grid_collection_name?: GlobalTypes,
    unchecked_control?: GlobalTypes,
    checked_control?: GlobalTypes,
    unchecked_hover_control?: GlobalTypes
    checked_hover_control?: GlobalTypes
    unchecked_locked_control?: GlobalTypes,
    checked_locked_control?: GlobalTypes,
    unchecked_locked_hover_control?: GlobalTypes,
    checked_locked_hover_control?: GlobalTypes,
}