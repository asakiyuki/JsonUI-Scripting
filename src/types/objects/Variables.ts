/**
 * Interface representing a collection of variables, where keys are dynamically generated strings.
 * The keys can either start with `$` or be enclosed in parentheses `()`.
 * The value for each key is an object, where each key within that object is a variable starting with `$` and the value can be of any type.
 *
 * Example:
 * ```typescript
 * const variables: VariablesInterface = {
 *   "$variable1": {
 *     "$subVariable1": "value1",
 *     "$subVariable2": 42,
 *   },
 *   "(group1)": {
 *     "$subGroup1": true,
 *   },
 * };
 * ```
 */
export interface VariablesInterface {
	/**
	 * A dynamic property where the key can either start with `$` (for regular variables) or be enclosed in parentheses `()` (for groupings or special cases).
	 * Each key within this object represents a variable starting with `$` and can have any type of value.
	 */
	[key: `$${string}` | `(${string})`]: {
		/**
		 * A dynamic property within the object, where the key starts with `$` and the value can be of any type.
		 */
		[key: `$${string}`]: any;
	};
}
