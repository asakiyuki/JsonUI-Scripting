import { AnimTypes } from "./AnimTypes";
import { AnimationValue } from "./AnimationValue";

export interface AnimationInterface {
    type: AnimTypes,
    name?: string,
    namespace?: string,
    from: any,
    loop?: boolean,
    keys: (AnimationValue | number)[]
}