import { GlobalTypes } from "../..";
import { FocusContainerCustom } from "../FocusContainerCustom";
import { FocusNavigationMode } from "../FocusNavigationMode";
import { Num, Bool } from "../Types";

export default interface FocusInterface {
    default_focus_precedence?: GlobalTypes | Num,
    focus_enabled?: GlobalTypes | Bool,
    focus_wrap_enabled?: GlobalTypes | Bool,
    focus_magnet_enabled?: GlobalTypes | Bool,
    focus_identifier?: GlobalTypes,
    focus_change_down?: GlobalTypes,
    focus_change_up?: GlobalTypes,
    focus_change_left?: GlobalTypes,
    focus_change_right?: GlobalTypes,
    focus_mapping?: GlobalTypes | any[],
    focus_container?: GlobalTypes | Bool,
    use_last_focus?: GlobalTypes | Bool,
    focus_navigation_mode_left?: GlobalTypes | FocusNavigationMode,
    focus_navigation_mode_right?: GlobalTypes | FocusNavigationMode,
    focus_navigation_mode_down?: GlobalTypes | FocusNavigationMode,
    focus_navigation_mode_up?: GlobalTypes | FocusNavigationMode,
    focus_container_custom_left?: GlobalTypes | FocusContainerCustom[],
    focus_container_custom_right?: GlobalTypes | FocusContainerCustom[],
    focus_container_custom_down?: GlobalTypes | FocusContainerCustom[],
    focus_container_custom_up?: GlobalTypes | FocusContainerCustom[],
}