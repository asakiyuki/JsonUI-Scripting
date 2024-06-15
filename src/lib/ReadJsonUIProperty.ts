import { Color } from "../jsonUI/Color";
import { JsonUIElement } from "../jsonUI/JsonUIElement";
import { JsonUIProperty } from "../jsonUITypes/JsonUIProperty";
import { objectForEach } from "./ObjectForEach";

/**
 * Modifies and reads a JsonUIProperty object.
 *
 * @param property - The JsonUIProperty object to be modified and read.
 * @returns The modified JsonUIProperty object.
 */
export default function ModifyReadJsonUIProperty(property: JsonUIProperty): JsonUIProperty {
    // Modify anchor property
    if (property.anchor) {
        property.anchor_from = property.anchor;
        property.anchor_to = property.anchor;
        delete property.anchor;
    }

    // Modify x and y properties
    if (property.x || property.y) {
        property.offset = [property.x ?? 0, property.y ?? 0];
        delete property.x;
        delete property.y;
    }

    // Modify width and height properties
    if (property.width || property.height) {
        property.size = [property.width ?? "default", property.height ?? "default"];
        delete property.width;
        delete property.height;
    }

    // Recursively read properties
    objectForEach(property, (v, key) => {
        property[key] = ReadProperty(v);
    });

    return property;
}

/**
 * Reads a property value and performs specific operations based on its type.
 *
 * @param value - The value to be read.
 * @param isVariable - A flag indicating whether the value is a variable.
 * @returns The modified or original value.
 */
export function ReadProperty(value: any, isVariable: boolean = false): any {
    if (Array.isArray(value)) {
        if (typeof value[0] === 'string') {
            if (value[0].startsWith('#')) {
                return Color.parse(value[0].slice(1));
            }
        }
    }
    else if (value instanceof JsonUIElement) {
        return isVariable ? value.getElementPath().slice(1) : value.getElementJsonUIKey();
    }
    else if (typeof value === 'object') {
        // Additional operations for object type
    }

    return value;
}