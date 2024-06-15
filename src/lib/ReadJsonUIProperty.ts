import { Color } from "../jsonUI/Color";
import { JsonUIElement } from "../jsonUI/JsonUIElement";
import { JsonUIProperty } from "../jsonUITypes/JsonUIProperty";
import { objectForEach } from "./ObjectForEach";

export default function ModifyReadJsonUIProperty(property: JsonUIProperty) {
    if (property.anchor) {
        property.anchor_from = property.anchor;
        property.anchor_to = property.anchor;
        delete property.anchor;
    }
    if (property.x || property.y) {
        property.offset = [property.x ?? 0, property.y ?? 0];
        delete property.x;
        delete property.y;
    }
    if (property.width || property.height) {
        property.size = [property.width ?? "default", property.height ?? "default"];
        delete property.width;
        delete property.height;
    }
    objectForEach(property, (v, key) => {
        property[key] = ReadProperty(v);
    })
    return property;
}

export function ReadProperty(value: any, isVariable: boolean = false) {
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

    }
    return value;
}