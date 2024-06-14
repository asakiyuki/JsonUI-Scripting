import { ElementTypes } from "./ElementTypes";

export interface ElementCachedInterface {
    name?: string,
    namespace?: string,
    type?: string | ElementTypes,
    extend?: {
        name: string,
        namespace: string,
    }
}