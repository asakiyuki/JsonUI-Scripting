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
        if (Array.isArray(v)) {
            if (typeof v[0] === 'string') {
                if (v[0].startsWith('#')) property[key] = Color.parse(v[0].slice(1));
            }

        } else if (typeof v === 'object') {

        } else if (v instanceof JsonUIElement) {
            (property as any)[key] = v.getElementPath().slice(1);
        }
    })
    return property;
}