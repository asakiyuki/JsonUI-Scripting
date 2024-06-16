import { EasingTypes } from "./EasingTypes";
import { DefaultGlobalVariableTypes } from "./GlobalVariablesTypes";

export interface AnimationValue {
    duration: number | DefaultGlobalVariableTypes,
    destroy_at_end?: string | DefaultGlobalVariableTypes,
    easing?: EasingTypes,
    from?: any,
    to: any | DefaultGlobalVariableTypes,
    initial_uv?: [number, number],
    fps?: number,
    frame_count?: number,
    frame_step?: number,
    reversible?: boolean,
    resettable?: boolean,
    play_event?: string,
    end_event?: string,
    start_event?: string,
    reset_event?: string,
    scale_from_starting_alpha?: boolean,
    activated?: boolean
}