/**
 * A utility class for working with colors represented as hexadecimal strings.
 */
export class Color {
    /**
     * Parses a hexadecimal color string into an array of color components.
     *
     * @param data - The hexadecimal color string to parse.
     * @returns An array of color components (red, green, blue, alpha) or null if the input is invalid.
     *
     * @remarks
     * The input string can be in the following formats:
     * - RGB: "RRGGBB"
     * - RGBA: "RRGGBBAA"
     * - RGB (short form): "RGB"
     * - RGBA (short form): "RGBA"
     *
     * The color components are returned as floating-point numbers in the range [0, 1].
     */
    static parse(data: string): [number, number, number] | [number, number, number, number] | null {
        const _col = parseInt(data, 16);
        switch (data.length) {
            case 3:
                return [
                    (_col >> 8 & 15) / 15,
                    (_col >> 4 & 15) / 15,
                    (_col & 15) / 15
                ];
            case 4:
                return [
                    (_col >> 16 & 15) / 15,
                    (_col >> 8 & 15) / 15,
                    (_col >> 4 & 15) / 15,
                    (_col & 15) / 15
                ];
            case 8:
                return [
                    (_col >> 24 & 255) / 255,
                    (_col >> 16 & 255) / 255,
                    (_col >> 8 & 255) / 255,
                    (_col & 255) / 255
                ];
            case 6:
                return [
                    (_col >> 16 & 255) / 255,
                    (_col >> 8 & 255) / 255,
                    (_col & 255) / 255
                ];
            default:
                return null;
        }
    }
}