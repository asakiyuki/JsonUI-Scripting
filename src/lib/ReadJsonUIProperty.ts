import { Animation } from "../jsonUI/Animation";
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
export default function ModifyReadJsonUIProperty(properties: JsonUIProperty): JsonUIProperty {
    // Modify anchor property
    if (properties.anchor) {
        properties.anchor_from = properties.anchor;
        properties.anchor_to = properties.anchor;
        delete properties.anchor;
    }

    // Modify x and y properties
    if (properties.x || properties.y) {
        properties.offset = [properties.x ?? 0, properties.y ?? 0];
        delete properties.x;
        delete properties.y;
    }

    // Modify width and height properties
    if (typeof properties.size === 'number'
        || (
            typeof properties.size === 'string'
            && (!['#', '$'].includes(properties.size[0])
            ))
    ) properties.size = [properties.size, properties.size];
    else if (properties.width || properties.height) {
        properties.size = [properties.width ?? "default", properties.height ?? "default"];
        delete properties.width;
        delete properties.height;
    }

    // Recursively read properties
    objectForEach(properties, (v, key) => {
        if (Array.isArray(v)) {
            if ((<string>v[0])?.startsWith?.('$')) {
                properties[key] = v[0];
                properties[`${v[0]}|default`] = v[1];
            } else if ((<string>v[0])?.startsWith?.('#'))
                properties[key] = Color.parse((<string>v[0]).slice(1))
        } else properties[key] = ReadProperty(v);
    });

    return properties;
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
    else if (value instanceof JsonUIElement) return isVariable ? value.getPath().slice(1) : value.getElementJsonUIKey();
    else if (value instanceof Animation) return value.getPath();
    else if (typeof value === 'object') {
        // Additional operations for object type
    }

    return value;
}