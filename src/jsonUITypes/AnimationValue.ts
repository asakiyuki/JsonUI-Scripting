import { EasingTypes } from "./EasingTypes";
import { DefaultGlobalVariableTypes } from "./GlobalVariablesTypes";

export interface AnimationValue {
    duration: number | DefaultGlobalVariableTypes,
    destroy_at_end?: string | DefaultGlobalVariableTypes,
    easing?: EasingTypes,
    set_value: any | DefaultGlobalVariableTypes,
    override_from_value?: any,
    initial_uv?: [number, number],
    fps?: number,
    frame_count?: number,
    frame_step?: number,
    reversible?: boolean,
    resettable?: boolean,
    scale_from_starting_alpha?: boolean,
    activated?: boolean
}