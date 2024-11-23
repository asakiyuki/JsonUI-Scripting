import { Str } from "../../values/Str";

/**
 * Represents custom focus container behavior for navigating focus inside a specific container.
 * This interface allows customization of how focus behaves within a focus container in different directions.
 */
export interface FocusContainerCustom {
	/**
	 * Specifies the name of another focus container. This property is optional.
	 * It is used to refer to other containers for custom focus navigation.
	 */
	other_focus_container_name?: Str;

	/**
	 * Defines the focus ID inside the container. This property is optional.
	 * It specifies which focus element inside the container should be targeted.
	 */
	focus_id_inside?: Str;
}
