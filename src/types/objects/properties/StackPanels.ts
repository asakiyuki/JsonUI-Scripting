import { Orientation } from "../../enums/Orientation";
import { Var } from "../../values/Variable";

/**
 * Represents the configuration for stack panels, which are typically used to arrange items in a stack with a specific orientation.
 * The orientation determines whether the items are stacked vertically or horizontally.
 */
export interface StackPanels {
	/**
	 * The orientation of the stack panel.
	 * This can be either a variable (`Var`) or a specific `Orientation` value.
	 * It defines whether the items inside the stack panel are arranged in a horizontal or vertical layout.
	 * Possible values could include:
	 * - Horizontal: Items are stacked from left to right.
	 * - Vertical: Items are stacked from top to bottom.
	 */
	orientation?: Var | Orientation;
}
