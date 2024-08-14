import { Properties } from "../types/objects/properties/Properties";
import { ColorHandler } from "./Color";
import { Obj } from "./Object";

export function ReadValue(value: any, callback: (type: string) => any) {
    if (Array.isArray(value)) {
        if (typeof value[0] === 'string') {
            if (value[0].startsWith('#')) value = ColorHandler.parse(value[0]);
            else if (value[0].startsWith('$')) return callback('var');
        }
    }
    return value;
};

export function ReadProperties(properties: Properties) {
    if (properties.x || properties.y) {
        properties.offset = [properties.x || 0, properties.y || 0];
        delete properties.x;
        delete properties.y;
    };

    if (properties.min_w || properties.min_h) {
        properties.offset = [properties.min_w || 0, properties.min_h || 0];
        delete properties.min_w;
        delete properties.min_h;
    } else if (properties.min_size !== undefined && !Array.isArray(properties.min_size))
        (<any>properties.min_size) = [properties.min_size, properties.min_size];

    if (properties.max_w || properties.max_h) {
        properties.offset = [properties.max_w || 0, properties.max_h || 0];
        delete properties.max_w;
        delete properties.max_h;
    } else if (properties.max_size !== undefined && !Array.isArray(properties.max_size))
        (<any>properties.max_size) = [properties.max_size, properties.max_size];

    if (properties.w || properties.h) {
        properties.offset = [properties.w || 0, properties.h || 0];
        delete properties.w;
        delete properties.h;
    } else if (properties.size !== undefined && !Array.isArray(properties.size))
        (<any>properties.size) = [properties.size, properties.size];

    Obj.forEach(properties, (key, value) => {
        (<any>properties)[key] = ReadValue(value, (type) => {
            if (type === 'var') {
                (<any>properties)[`${value[0]}|default`]
                    = (['size', 'min_size', 'max_size'].includes(key))
                        ? [value[1], value[1]]
                        : value[1];
                return value[0];
            }
        })
    });

    if (properties.anchor) {
        properties.anchor_from = properties.anchor;
        properties.anchor_to = properties.anchor;
        delete properties.anchor;
    };

    return properties;
}