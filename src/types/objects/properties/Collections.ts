import { Collection } from "../../enums/Collection";
import { Var } from "../../values/Variable";

/**
 * Represents a collection, which can be a variable, string, or another collection.
 * This interface can be used to define a collection by either a reference to a variable,
 * a collection name as a string, or a nested collection.
 */
export interface Collections {
	/**
	 * The collection itself, which can be a variable, string, or another collection.
	 * This property is optional and can be used to define or reference a collection.
	 */
	collection?: Var | string | Collection;

	/**
	 * The name of the collection, which can also be a variable, string, or another collection.
	 * This property is optional and can be used to refer to the name of the collection.
	 */
	collection_name?: Var | string | Collection;
}
