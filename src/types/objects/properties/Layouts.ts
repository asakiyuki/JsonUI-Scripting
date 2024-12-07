import { Direction } from "readline";
import { Anchor } from "../../enums/Anchor";
import { Color } from "../../enums/EnumColor";
import { Bool } from "../../values/Bool";
import { StringVector2 } from "../../values/StringVector";
import { Float, Int } from "../../values/Number";
import { Var } from "../../values/Variable";
import { Str } from "../../values/Str";
import { Any } from "../../values/Any";

/**
 * Represents configuration options related to the layout and positioning of UI elements.
 * This interface allows the adjustment of sizes, visibility, alignment, and behavior of elements within their containers.
 */
export interface Layouts {
	/**
	 * Specifies the size of the element. Can be a string (e.g., 'auto'), a floating-point number for pixel value, or a `StringVector2` for both width and height.
	 * This determines the element's dimension in its layout.
	 */
	size?: Str | Float | StringVector2;

	/**
	 * If true, the element will be visible in the UI.
	 * If false, the element is hidden but still part of the layout.
	 */
	visible?: Bool;

	/**
	 * If true, the element is ignored in layout calculations.
	 * It will not affect the position or size of other elements in the layout.
	 */
	ignored?: Bool;

	/**
	 * Defines the layer on which the element resides. Higher values typically represent elements that are visually on top.
	 */
	layer?: Int;

	/**
	 * Specifies the maximum size of the element, which can be a string (e.g., 'auto'), a floating-point number, or a `StringVector2`.
	 * This limits the element's size in the layout.
	 */
	max_size?: Str | Float | StringVector2;

	/**
	 * Specifies the minimum size of the element, which can be a string (e.g., 'auto'), a floating-point number, or a `StringVector2`.
	 * This defines the smallest possible size for the element.
	 */
	min_size?: Str | Float | StringVector2;

	/**
	 * Defines the offset of the element relative to its parent container. This can be a `StringVector2` representing the X and Y offset values.
	 */
	offset?: StringVector2;

	/**
	 * Defines the anchor point for the element's position, used to control the alignment with respect to other UI elements.
	 * This can either be a `Var` (such as a string) or an `Anchor` value.
	 */
	anchor?: Var | Anchor;

	/**
	 * Defines the reference anchor point from which the element’s position is calculated.
	 * This can either be a `Var` (such as a string) or an `Anchor` value.
	 */
	anchor_from?: Var | Anchor;

	/**
	 * Defines the target anchor point that the element should align to.
	 * This can either be a `Var` (such as a string) or an `Anchor` value.
	 */
	anchor_to?: Var | Anchor;

	/**
	 * If true, the element inherits the maximum width from its sibling elements.
	 * This allows it to automatically adjust to the width of neighboring elements.
	 */
	inherit_max_sibling_width?: Bool;

	/**
	 * If true, the element inherits the maximum height from its sibling elements.
	 * This allows it to automatically adjust to the height of neighboring elements.
	 */
	inherit_max_sibling_height?: Bool;

	/**
	 * If true, the element's offset is calculated based on its anchored position.
	 * This determines whether the offset will be affected by the anchor properties.
	 */
	use_anchored_offset?: Bool;

	/**
	 * If true, the element is considered as a contained item within a parent container.
	 * This indicates that the element is nested within another UI element.
	 */
	contained?: Bool;

	/**
	 * Specifies whether the element is draggable. Can be set to a `Var` or `Direction` value to determine the drag behavior.
	 */
	draggable?: Var | Direction;

	/**
	 * If true, the element will follow the cursor or pointer during interaction.
	 * This is typically used for draggable or floating UI elements that follow user movement.
	 */
	follows_cursor?: Bool;

	/**
	 * Specifies the debug color or mode for the element. This can be a `Var` or `Color` value to help with visual debugging of the element’s layout.
	 */
	debug?: Var | Color;

	/**
	 * Specifies the minimum width of the element as a floating-point number.
	 * This is the smallest allowable width for the element.
	 */
	min_w?: Float | Str;

	/**
	 * Specifies the minimum height of the element as a floating-point number.
	 * This is the smallest allowable height for the element.
	 */
	min_h?: Float | Str;

	/**
	 * Specifies the maximum width of the element as a floating-point number.
	 * This is the largest allowable width for the element.
	 */
	max_w?: Float | Str;

	/**
	 * Specifies the maximum height of the element as a floating-point number.
	 * This is the largest allowable height for the element.
	 */
	max_h?: Float | Str;

	/**
	 * Specifies the width of the element as a floating-point number.
	 * This value represents the actual width of the element.
	 */
	w?: Float | Str;

	/**
	 * Specifies the height of the element as a floating-point number.
	 * This value represents the actual height of the element.
	 */
	h?: Float | Str;

	/**
	 * Specifies the X position of the element as a floating-point number.
	 * This determines the horizontal placement of the element in its parent container.
	 */
	x?: Float | Str;

	/**
	 * Specifies the Y position of the element as a floating-point number.
	 * This determines the vertical placement of the element in its parent container.
	 */
	y?: Float | Str;
}
