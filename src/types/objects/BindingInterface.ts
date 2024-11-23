import { BindingType } from "../enums/BindingType";
import { BindingName } from "../enums/BindingName";
import { Collection } from "../enums/Collection";
import { BindingCondition } from "../enums/BindingCondition";
import { Var } from "../values/Variable";
import { Binding } from "../values/Binding";

/**
 * Interface representing the binding settings between source and target properties.
 */
export interface BindingInterface {
	/**
	 * A value that can be ignored, either as a variable or a boolean.
	 * If true, the binding will be ignored.
	 */
	ignored?: Var | boolean;

	/**
	 * The type of the binding, either a variable or a predefined binding type.
	 */
	binding_type?: Var | BindingType;

	/**
	 * The name of the binding, either a variable or a predefined binding name.
	 */
	binding_name?: Var | BindingName;

	/**
	 * An optional override for the binding name. Can be a variable, a binding name, or a string.
	 */
	binding_name_override?: Var | BindingName | string;

	/**
	 * The name of the collection that the binding belongs to, either as a variable or a collection object.
	 */
	binding_collection_name?: Var | Collection;

	/**
	 * The prefix to use for the binding collection, which can be a variable or a string.
	 */
	binding_collection_prefix?: Var | string;

	/**
	 * A condition that determines whether the binding should be applied. This can be a variable or a predefined binding condition.
	 */
	binding_condition?: Var | BindingCondition;

	/**
	 * The name of the source control, either as a variable or a string.
	 */
	source_control_name?: Var | string;

	/**
	 * The name(s) of the source property, which could be a single string or an array of strings.
	 */
	source_property_name?: string | [string];

	/**
	 * The name of the target property, which could be a variable, binding name, or binding.
	 */
	target_property_name?: Var | BindingName | Binding;

	/**
	 * A flag indicating if sibling scope resolution should be applied.
	 * If true, the sibling scope will be resolved.
	 */
	resolve_sibling_scope?: Var | boolean;
}
