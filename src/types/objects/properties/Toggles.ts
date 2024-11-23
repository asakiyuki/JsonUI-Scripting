import { Bool } from "../../values/Bool";
import { Int } from "../../values/Number";
import { Str } from "../../values/Str";

/**
 * Interface representing toggle settings and states.
 */
export interface Toggles {
	/**
	 * Defines whether the toggle is part of a radio button group.
	 * @default false
	 */
	radio_toggle_group?: boolean;

	/**
	 * The name of the toggle.
	 */
	toggle_name?: string;

	/**
	 * The default state of the toggle (true = on, false = off).
	 * @default false
	 */
	toggle_default_state?: boolean;

	/**
	 * The forced index for the toggle group when selecting toggles.
	 */
	toggle_group_forced_index?: number;

	/**
	 * The default selected index in the toggle group.
	 * @default 0
	 */
	toggle_group_default_selected?: number;

	/**
	 * If true, the toggle resets when focus is lost.
	 * @default false
	 */
	reset_on_focus_lost?: boolean;

	/**
	 * The Child Element to apply when hovering over the toggle.
	 */
	toggle_on_hover?: string;

	/**
	 * The Child Element to apply to the toggle when it is in the "on" state.
	 */
	toggle_on_button?: string;

	/**
	 * The Child Element to apply to the toggle when it is in the "off" state.
	 */
	toggle_off_button?: string;

	/**
	 * If true, enables directional toggling (e.g., using arrow keys).
	 * @default false
	 */
	enable_directional_toggling?: boolean;

	/**
	 * The name of the toggle grid collection.
	 */
	toggle_grid_collection_name?: string;

	/**
	 * The Child Element for the unchecked state control.
	 */
	unchecked_control?: string;

	/**
	 * The Child Element for the checked state control.
	 */
	checked_control?: string;

	/**
	 * The Child Element for the unchecked state control when hovered.
	 */
	unchecked_hover_control?: string;

	/**
	 * The Child Element for the checked state control when hovered.
	 */
	checked_hover_control?: string;

	/**
	 * The Child Element for the unchecked state control when locked.
	 */
	unchecked_locked_control?: string;

	/**
	 * The Child Element for the checked state control when locked.
	 */
	checked_locked_control?: string;

	/**
	 * The Child Element for the unchecked state control when locked and hovered.
	 */
	unchecked_locked_hover_control?: string;

	/**
	 * The Child Element for the checked state control when locked and hovered.
	 */
	checked_locked_hover_control?: string;
}
