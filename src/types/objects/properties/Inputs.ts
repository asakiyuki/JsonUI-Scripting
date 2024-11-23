import { Bool } from "../../values/Bool";

/**
 * Represents configuration options related to input handling and interaction with the UI elements.
 * This interface allows fine-grained control over how inputs are processed, including touch, pointer, and gesture events.
 */
export interface Inputs {
	/**
	 * If true, enables the modal behavior for inputs, preventing other interactions while the modal is active.
	 * This is typically used for fullscreen or overlay elements that block user interaction outside of the modal.
	 */
	modal?: Bool;

	/**
	 * If true, enables inline modal behavior, which allows interactions within the modal but still shows the underlying content.
	 * This allows for a less disruptive input experience compared to a full modal.
	 */
	inline_modal?: Bool;

	/**
	 * If true, the element will always listen for input events, regardless of its state or visibility.
	 * This is useful for background processes that need to capture user inputs continuously.
	 */
	always_listen_to_input?: Bool;

	/**
	 * If true, the element will always handle pointer (mouse or touch) events, regardless of its focus or visibility.
	 * This is helpful in cases where the UI element should always be responsive to pointer events.
	 */
	always_handle_pointer?: Bool;

	/**
	 * If true, the element will always handle controller direction inputs, even when it's not actively focused.
	 * This is useful for game-like or controller-driven UIs where directional input needs to be always considered.
	 */
	always_handle_controller_direction?: Bool;

	/**
	 * If true, enables hover interactions, allowing the element to respond to pointer hover events.
	 * This can be used to trigger hover states or display hover-specific information.
	 */
	hover_enabled?: Bool;

	/**
	 * If true, prevents touch input events from being handled by the element, blocking any touch-based interactions.
	 * This is useful for disabling touch interactions in certain areas of the UI.
	 */
	prevent_touch_input?: Bool;

	/**
	 * If true, consumes the event, preventing it from propagating further or being handled by other elements.
	 * This can be useful for stopping event bubbling in certain cases.
	 */
	consume_event?: Bool;

	/**
	 * If true, consumes hover events, preventing them from being passed on to other UI elements.
	 * This can be useful when you want to isolate hover interactions to the current element.
	 */
	consume_hover_events?: Bool;

	/**
	 * If true, enables tracking of gesture events associated with the element.
	 * This is typically used for detecting multi-touch gestures, such as pinch, swipe, etc.
	 */
	gesture_tracking_button?: Bool;
}
