import { Collection } from "../../enums/Collection";
import { TextType } from "../../enums/TextTypes";
import { Bool } from "../../values/Bool";
import { Int } from "../../values/Number";
import { Str } from "../../values/Str";
import { Var } from "../../values/Variable";

/**
 * Represents the configuration for text editing controls, typically used in UI components
 * where users can input and edit text. This configuration allows customization of text input fields,
 * including behaviors like enabling new lines, setting maximum text length, and adding placeholder controls.
 */
export interface TextEdits {
	/**
	 * The name of the text box used for text editing.
	 * This can be a reference to a specific text box in the UI.
	 */
	text_box_name?: Str;

	/**
	 * The name of the grid collection associated with the text edit box.
	 * This can be a variable or a collection object that organizes the text edit box within a grid.
	 */
	text_edit_box_grid_collection_name?: Var | Collection;

	/**
	 * A flag that indicates whether the text box should be constrained to a rectangular area.
	 * When set to true, the text input will be restricted to fit within the specified bounds.
	 */
	constrain_to_rect?: Bool;

	/**
	 * A flag that enables or disables new lines within the text box.
	 * When enabled, users can press Enter to add new lines of text.
	 */
	enabled_newline?: Bool;

	/**
	 * The type of text that can be entered into the text box.
	 * This can be a specific type such as `TextType`, which might include options like plain text or password input.
	 */
	text_type?: TextType;

	/**
	 * The maximum length of text that can be entered into the text box.
	 * This value limits the number of characters a user can input.
	 */
	max_length?: Int;

	/**
	 * The name of the control used for displaying or interacting with text.
	 * This could be the name of a text control that manages text input or editing.
	 */
	text_control?: Str;

	/**
	 * The name of the control used for displaying the placeholder text.
	 * This is often used when no text is present in the input field and provides a hint to the user.
	 */
	place_holder_control?: Str;

	/**
	 * A flag that determines whether the text box can be deselected.
	 * When enabled, users can deselect the text box and stop editing the text.
	 */
	can_be_deselected?: Bool;

	/**
	 * A flag indicating whether the text box should always listen for user input.
	 * When enabled, the text box is constantly listening for changes or input events.
	 */
	always_listening?: Bool;

	/**
	 * The control associated with the virtual keyboard buffer.
	 * This is used when managing virtual keyboards, allowing users to input text using on-screen keyboards.
	 */
	virtual_keyboard_buffer_control?: Str;
}
