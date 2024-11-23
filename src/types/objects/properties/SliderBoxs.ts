import { Str } from "../../values/Str";

/**
 * Represents the configuration for a Slider Box UI element.
 * A Slider Box typically allows users to select values within a range by sliding a control.
 */
export interface SliderBoxs {
	/**
	 * The default control for the Slider Box.
	 * Specifies the control that will be initially selected or displayed when the Slider Box is rendered.
	 */
	default_control?: Str;

	/**
	 * The control that appears when the Slider Box is hovered over.
	 * This could be a different visual state or a control to highlight interactions.
	 */
	hover_control?: Str;

	/**
	 * The control that appears when the Slider Box is locked.
	 * A locked control could indicate that the user can no longer interact with the Slider Box.
	 */
	locked_control?: Str;
}
