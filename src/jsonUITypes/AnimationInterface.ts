import { AnimTypes } from "./AnimTypes";
import { AnimationValue } from "./AnimationValue";

export interface AnimationInterface {
    type: AnimTypes,
    name?: string,
    namespace?: string,
    start_value: any,
    loop?: boolean,
    play_event?: string,
    end_event?: string,
    start_event?: string,
    reset_event?: string,
    value: (AnimationValue | number)[]
}