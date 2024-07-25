import { JsonUIElement } from "../jsonUI/JsonUIElement";
import { BindingName } from "../jsonUITypes/BindingName";
import { JsonUIProperty } from "../jsonUITypes/JsonUIProperty";
import { Renderer } from "../jsonUITypes/Renderer";
let itemRenderer: JsonUIElement;
export function ItemRenderer({ properties, value = 0, id }: {
    properties?: JsonUIProperty, id: number, value?: number
}) {
    if (!itemRenderer) itemRenderer = JsonUIElement.custom(Renderer.InventoryItem, {});
    return new JsonUIElement({
        extend: itemRenderer,
        properties: {
            ...(properties),
            property_bag: {
                [BindingName.ItemIdAux]: (id < 0) ? (id * 65536 - value) : (id * 65536 + value),
                ...(properties?.property_bag || {})
            },
        }
    });
}