import { Bool } from "../../values/Bool";
import { StackPanels } from "./StackPanels";

/**
 * Represents the configuration options for a screen in the UI, inheriting from `StackPanels`.
 * This interface adds additional properties specific to screen behavior and rendering.
 */
export interface Screens extends StackPanels {
	/**
	 * If `true`, the screen will only render when it is the topmost screen.
	 */
	render_only_when_topmost?: Bool;

	/**
	 * If `true`, the screen cannot be flushed (removed from rendering).
	 */
	screen_not_flushable?: Bool;

	/**
	 * If `true`, the screen will always accept input, even if other UI elements are visible.
	 */
	always_accepts_input?: Bool;

	/**
	 * If `true`, the screen allows rendering the game in the background while the screen is active.
	 */
	render_game_behind?: Bool;

	/**
	 * If `true`, the screen absorbs input, preventing interaction with other elements beneath it.
	 */
	absorbs_input?: Bool;

	/**
	 * If `true`, the screen is marked as showing a menu.
	 */
	is_showing_menu?: Bool;

	/**
	 * If `true`, the screen is modal and will block interaction with other screens.
	 */
	is_modal?: Bool;

	/**
	 * If `true`, the screen should steal mouse control from other UI elements.
	 */
	should_steal_mouse?: Bool;

	/**
	 * If `true`, the screen will use low-frequency rendering to optimize performance.
	 */
	low_frequency_rendering?: Bool;

	/**
	 * If `true`, this screen will be the last to draw in the rendering order.
	 */
	screen_draws_last?: Bool;

	/**
	 * If `true`, the screen supports VR (Virtual Reality) mode.
	 */
	vr_mode?: Bool;

	/**
	 * If `true`, the screen will render below other elements even when it's active.
	 */
	force_render_below?: Bool;

	/**
	 * If `true`, telemetry data will be sent while the screen is active.
	 */
	send_telemetry?: Bool;

	/**
	 * If `true`, the screen will automatically close when the player is hurt.
	 */
	close_on_player_hurt?: Bool;

	/**
	 * If `true`, the screen will be cached for faster loading.
	 */
	cache_screen?: Bool;

	/**
	 * If `true`, the screen will load immediately upon activation.
	 */
	load_screen_immediately?: Bool;

	/**
	 * If `true`, a gamepad cursor will be used for navigation on the screen.
	 */
	gamepad_cursor?: Bool;

	/**
	 * If `true`, the gamepad cursor will have deflection mode enabled.
	 */
	gamepad_cursor_deflection_mode?: Bool;

	/**
	 * If `true`, the screen should be skipped during automated processes like testing or scripting.
	 */
	should_be_skipped_during_automation?: Bool;
}
