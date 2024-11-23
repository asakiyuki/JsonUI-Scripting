import { Orientation } from "../../enums/Orientation";
import { Bool } from "../../values/Bool";
import { Float } from "../../values/Number";
import { Str } from "../../values/Str";
import { Var } from "../../values/Variable";

/**
 * Represents the configuration for a Slider UI element.
 * A Slider typically allows users to select a value within a defined range, either by dragging a control or clicking buttons.
 */
export interface Sliders {
	/**
	 * The button control used for adjusting the track of the slider.
	 * This button allows users to move along the slider track.
	 */
	slider_track_button?: Str;

	/**
	 * The button used to decrease the slider value by a small increment.
	 * This button typically allows fine-grained adjustments.
	 */
	slider_small_decrease_button?: Str;

	/**
	 * The button used to increase the slider value by a small increment.
	 * Similar to `slider_small_decrease_button`, this is for precise value adjustments.
	 */
	slider_small_increase_button?: Str;

	/**
	 * The number of steps the slider is divided into.
	 * This defines how granular the slider’s value can be.
	 */
	slider_steps?: Float;

	/**
	 * The direction of the slider.
	 * This defines whether the slider is oriented horizontally or vertically.
	 */
	slider_direction?: Var | Orientation;

	/**
	 * The time in milliseconds before the slider action times out.
	 * It could be used to control the responsiveness or delay in slider interaction.
	 */
	slider_timeout?: Float;

	/**
	 * The name of the collection to which the slider belongs.
	 * This could be useful for grouping sliders within a larger collection.
	 */
	slider_collection_name?: Str;

	/**
	 * The name of the slider element itself.
	 * This could be used for identifying or referencing the slider in a larger system.
	 */
	slider_name?: Str;

	/**
	 * Whether the slider should be selected when hovered over.
	 * This can provide a more interactive experience for users.
	 */
	slider_select_on_hover?: Bool;

	/**
	 * The button control that represents the selected state of the slider.
	 * This button can be visually different from other buttons to show that the slider is in use.
	 */
	slider_selected_button?: Str;

	/**
	 * The button control that represents the deselected state of the slider.
	 * This button can return to its default state when the slider is not in use.
	 */
	slider_deselected_button?: Str;

	/**
	 * The control for the slider box, which might be used to visually encapsulate the slider and its components.
	 */
	slider_box_control?: Str;

	/**
	 * The background control for the slider, defining the base layer or background visuals.
	 */
	background_control?: Str;

	/**
	 * The hover state of the background control, typically used for visual feedback when users interact with the slider.
	 */
	background_hover_control?: Str;

	/**
	 * The progress control of the slider, used to show the user's current position or value within the slider's range.
	 */
	progress_control?: Str;

	/**
	 * The hover state of the progress control, giving feedback when users hover over the progress portion of the slider.
	 */
	progress_hover_control?: Str;
}
