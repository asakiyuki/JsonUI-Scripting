import { GlobalTypes } from "../..";
import { Orientation } from "../Orientation";
import { Bool } from "../Types";
import StackPanelInterface from "./StackPanel";

export default interface ScreenInterface extends StackPanelInterface {
    render_only_when_topmost?: GlobalTypes | Bool,
    screen_not_flushable?: GlobalTypes | Bool,
    always_accepts_input?: GlobalTypes | Bool,
    render_game_behind?: GlobalTypes | Bool,
    absorbs_input?: GlobalTypes | Bool,
    is_showing_menu?: GlobalTypes | Bool,
    is_modal?: GlobalTypes | Bool,
    should_steal_mouse?: GlobalTypes | Bool,
    low_frequency_rendering?: GlobalTypes | Bool,
    screen_draws_last?: GlobalTypes | Bool,
    vr_mode?: GlobalTypes | Bool,
    force_render_below?: GlobalTypes | Bool,
    send_telemetry?: GlobalTypes | Bool,
    close_on_player_hurt?: GlobalTypes | Bool,
    cache_screen?: GlobalTypes | Bool,
    load_screen_immediately?: GlobalTypes | Bool,
    gamepad_cursor?: GlobalTypes | Bool,
    gamepad_cursor_deflection_mode?: GlobalTypes | Bool,
    should_be_skipped_during_automation?: GlobalTypes | Bool,
}