import { FocusContainerCustom } from "./FocusContainerCustom";
import { FocusNavigationMode } from "../../enums/FocusNavigationMode";
import { Bool } from "../../values/Bool";
import { Int } from "../../values/Number";
import { Var } from "../../values/Variable";
import { Str } from "../../values/Str";

/**
 * Represents the focus management properties for a UI element, including focus precedence,
 * navigation modes, and custom focus behavior for different directions. This interface is used
 * to manage focus interactions and ensure smooth navigation within a UI system.
 */
export interface Focus {
	/**
	 * Defines the precedence or priority for the element when determining the default focus.
	 * This property is optional and allows customization of which element should receive focus first.
	 */
	default_focus_precedence?: Int;

	/**
	 * Specifies whether the element can receive focus. This property is optional.
	 * When set to `true`, the element is focusable; otherwise, it is not.
	 */
	focus_enabled?: Bool;

	/**
	 * Indicates whether focus wrapping is enabled. This property is optional.
	 * When enabled, focus will cycle back to the first element after reaching the last focusable element.
	 */
	focus_wrap_enabled?: Bool;

	/**
	 * Specifies whether a "magnet" effect is applied to the focus. This property is optional.
	 * When enabled, it allows the focus to magnetically snap to nearby focusable elements.
	 */
	focus_magnet_enabled?: Bool;

	/**
	 * A unique identifier for the focus behavior of the element. This property is optional.
	 * It is used for identifying the focus interaction mapping.
	 */
	focus_identifier?: Str;

	/**
	 * Defines the control or action to take when moving focus down. This property is optional.
	 */
	focus_change_down?: Str;

	/**
	 * Defines the control or action to take when moving focus up. This property is optional.
	 */
	focus_change_up?: Str;

	/**
	 * Defines the control or action to take when moving focus left. This property is optional.
	 */
	focus_change_left?: Str;

	/**
	 * Defines the control or action to take when moving focus right. This property is optional.
	 */
	focus_change_right?: Str;

	/**
	 * Specifies the focus mapping for this element. This can be a single value or an array of mappings.
	 * This property is optional and can define multiple behaviors for focus navigation.
	 */
	focus_mapping?: Var | Array<any>;

	/**
	 * Indicates whether the element is a focus container. This property is optional.
	 * If true, it can hold other focusable elements and manage focus within them.
	 */
	focus_container?: Bool;

	/**
	 * Specifies whether to use the last focused element. This property is optional.
	 * When enabled, the system will remember the last focused element and restore focus to it.
	 */
	use_last_focus?: Bool;

	/**
	 * Defines the navigation mode for moving focus left. This property is optional.
	 * It can be set to a specific mode, such as `FocusNavigationMode`.
	 */
	focus_navigation_mode_left?: Var | FocusNavigationMode;

	/**
	 * Defines the navigation mode for moving focus right. This property is optional.
	 * It can be set to a specific mode, such as `FocusNavigationMode`.
	 */
	focus_navigation_mode_right?: Var | FocusNavigationMode;

	/**
	 * Defines the navigation mode for moving focus down. This property is optional.
	 * It can be set to a specific mode, such as `FocusNavigationMode`.
	 */
	focus_navigation_mode_down?: Var | FocusNavigationMode;

	/**
	 * Defines the navigation mode for moving focus up. This property is optional.
	 * It can be set to a specific mode, such as `FocusNavigationMode`.
	 */
	focus_navigation_mode_up?: Var | FocusNavigationMode;

	/**
	 * Custom focus container behavior for the left direction. This property is optional.
	 * It can define custom interactions when focus moves left within a container.
	 */
	focus_container_custom_left?: FocusContainerCustom[];

	/**
	 * Custom focus container behavior for the right direction. This property is optional.
	 * It can define custom interactions when focus moves right within a container.
	 */
	focus_container_custom_right?: FocusContainerCustom[];

	/**
	 * Custom focus container behavior for the down direction. This property is optional.
	 * It can define custom interactions when focus moves down within a container.
	 */
	focus_container_custom_down?: FocusContainerCustom[];

	/**
	 * Custom focus container behavior for the up direction. This property is optional.
	 * It can define custom interactions when focus moves up within a container.
	 */
	focus_container_custom_up?: FocusContainerCustom[];
}
