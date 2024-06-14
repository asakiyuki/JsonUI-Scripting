import { JsonUIElement } from "../jsonUI/JsonUIElement";
import { ElementTypes } from "./ElementTypes";
import { ExtendInterface } from "./ExtendInterface";
import { JsonUIProperty } from "./JsonUIProperty";

export interface JsonUIElementInterface {
    type?: ElementTypes,
    name?: string,
    namespace?: string,
    property?: JsonUIProperty,
    extend?: JsonUIElement | ExtendInterface | string
}