import { Str } from "../../values/Str";

/**
 * Represents the properties of a dropdown control in a UI system, including the name, content, and area
 * where the dropdown is displayed. This interface allows customization of the dropdown's behavior and layout.
 */
export interface Dropdowns {
	/**
	 * Specifies the name of the dropdown. This property is optional.
	 * It helps in identifying the dropdown control.
	 */
	dropdown_name?: Str;

	/**
	 * Defines the control that holds the content of the dropdown. This property is optional.
	 * It typically refers to the control that will display the dropdown's items.
	 */
	dropdown_content_control?: Str;

	/**
	 * Specifies the area or region where the dropdown will appear. This property is optional.
	 * It can define the visual placement or container for the dropdown.
	 */
	dropdown_area?: Str;
}
