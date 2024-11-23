import { Renderer } from "../../enums/Renderer";
import { Var } from "../../values/Variable";

/**
 * Represents the configuration options related to the renderer for a UI element.
 * This interface allows specifying a custom renderer or using a default renderer for UI elements.
 */
export interface Renderers {
	/**
	 * Specifies the renderer to use for the UI element.
	 * This can either be a `Var` (such as a string or identifier) or a `Renderer` value.
	 * The renderer defines how the element will be visually rendered and interacted with in the UI.
	 */
	renderer?: Var | Renderer;
}
