/**
 * Generates a Universally Unique Identifier (UUID) in the standard format.
 *
 * @returns {string} A string representation of the generated UUID.
 *
 * @remarks
 * The generated UUID is a 36-character string consisting of hexadecimal digits,
 * separated by hyphens in the format: 8-4-4-4-12.
 *
 * Example:
 * ```typescript
 * const uuid = GenerateUUID();
 * console.log(uuid); // Output: "123e4567-e89b-12d3-a456-426614174000"
 * ```
 *
 * @throws {Error} If the Math.random() function fails to generate a random number.
 */
export function GenerateUUID(): string {
    return "$$$$$$$$-$$$$-$$$$-$$$$-$$$$$$$$$$$$".replaceAll(/\$/g, () => Math.floor(Math.random() * 16).toString(16));
}