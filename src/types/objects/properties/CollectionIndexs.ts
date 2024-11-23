import { Int } from "../../values/Number";

/**
 * Represents an index for a collection, typically used for identifying an element's position within a collection.
 */
export interface CollectionIndexs {
	/**
	 * The index of the collection item.
	 * This property is optional and can be used to specify the position of an element within a collection.
	 */
	collection_index?: Int;
}
