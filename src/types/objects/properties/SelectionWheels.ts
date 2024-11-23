import { Float } from "../../values/Number";
import { Str } from "../../values/Str";
import { Var } from "../../values/Variable";

/**
 * Represents the configuration for a selection wheel UI element.
 * A selection wheel is typically used for menu navigation or radial selection.
 */
export interface SelectionWheels {
	/**
	 * The inner radius of the selection wheel.
	 * Defines the size of the central area where the wheel's controls may be located.
	 */
	inner_radius?: Float;

	/**
	 * The outer radius of the selection wheel.
	 * Defines the size of the outer boundary where the selectable options are placed.
	 */
	outer_radius?: Float;

	/**
	 * The state controls that are associated with the selection wheel.
	 * Can be a single variable or an array of strings representing the controls used for interaction.
	 */
	state_controls?: Var | Array<string>;

	/**
	 * The number of slices or segments in the selection wheel.
	 * Each slice represents an option or action.
	 */
	slice_count?: Float;

	/**
	 * The name of the button associated with the selection wheel.
	 * This button typically activates the wheel or initiates a selection.
	 */
	button_name?: Str;

	/**
	 * The name of the button that iterates the selection wheel in the left direction.
	 */
	iterate_left_button_name?: Str;

	/**
	 * The name of the button that iterates the selection wheel in the right direction.
	 */
	iterate_right_button_name?: Str;

	/**
	 * The initial button slice or starting position for the selection wheel.
	 * Determines the slice selected when the wheel is first activated.
	 */
	initial_button_slice?: Float;
}
