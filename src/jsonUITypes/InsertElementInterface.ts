import { JsonUIElement } from "../jsonUI/JsonUIElement";
import { GetJsonUIGenerateName } from "./GetJsonUIGenerateName";
import { JsonUIProperty } from "./JsonUIProperty";

export interface InsertElementInterface {
    properties?: JsonUIProperty,
    name?: string,
    extend?: JsonUIElement | string
}