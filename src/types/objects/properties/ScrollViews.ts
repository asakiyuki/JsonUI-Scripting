import { Bool } from "../../values/Bool";
import { Float } from "../../values/Number";
import { Str } from "../../values/Str";

/**
 * Represents the configuration options for a scrollable view in the UI.
 * This interface allows for customization of the scrollbar, touch behavior, and scrolling controls.
 */
export interface ScrollViews {
	/**
	 * The name of the button used for the scrollbar track.
	 */
	scrollbar_track_button?: Str;

	/**
	 * The name of the button used for touch-based scrolling.
	 */
	scrollbar_touch_button?: Str;

	/**
	 * The speed at which the content scrolls.
	 * A higher value results in faster scrolling.
	 */
	scroll_speed?: Float;

	/**
	 * If `true`, gesture-based scrolling is enabled.
	 */
	gesture_control_enabled?: Bool;

	/**
	 * If `true`, scrolling will be always handled, even when the input device is not actively interacting with the scroll view.
	 */
	always_handle_scrolling?: Bool;

	/**
	 * If `true`, the scroll view will be in touch mode, optimizing for touch input interactions.
	 */
	touch_mode?: Bool;

	/**
	 * The name of the scrollbar box element.
	 */
	scrollbar_box?: Str;

	/**
	 * The name of the scrollbar track element.
	 */
	scrollbar_track?: Str;

	/**
	 * The name of the scroll view port, which contains the content to be scrolled.
	 */
	scroll_view_port?: Str;

	/**
	 * The name of the content inside the scroll view.
	 */
	scroll_content?: Str;

	/**
	 * The name of the panel that contains both the scroll box and the track for the scrollbar.
	 */
	scroll_box_and_track_panel?: Str;

	/**
	 * If `true`, the view will automatically jump to the bottom when the content is updated.
	 */
	jump_to_bottom_on_update?: Bool;
}
