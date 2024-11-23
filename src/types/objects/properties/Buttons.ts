import { Str } from "../../values/Str";
import { SliderBoxs } from "./SliderBoxs";

/**
 * Represents a Button UI element that extends SliderBoxs and includes optional properties specific to button behavior.
 */
export interface Buttons extends SliderBoxs {
	/**
	 * The name of the control that is pressed.
	 * This property is optional and can be used to track which control has been pressed within the button.
	 */
	pressed_control?: Str;
}
