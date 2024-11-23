/**
 * Interface representing a property bag, where keys are dynamically generated strings starting with `#`.
 * The value associated with each key can be of any type.
 *
 * Example:
 * ```typescript
 * const myProperties: PropertyBag = {
 *   "#property1": 42,
 *   "#property2": "example",
 * };
 * ```
 */
export interface PropertyBag {
	/**
	 * A dynamic property where the key is a string that starts with `#`, and the value can be any type.
	 * The key must follow the pattern `#<property_name>`.
	 */
	[key: `#${string}`]: any;
}
