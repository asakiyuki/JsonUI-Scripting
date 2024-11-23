/**
 * Interface representing a collection of dynamic variables.
 *
 * This interface allows any string prefixed with `$` as a key, and its associated value can be of any type.
 */
export interface Variables {
	/**
	 * A dynamic key-value pair where the key is a string starting with the `$` symbol,
	 * and the value can be of any type.
	 *
	 * Example:
	 * ```typescript
	 * const vars: Variables = { $userName: "John", $isActive: true };
	 * ```
	 */
	[key: `$${string}`]: any;
}
