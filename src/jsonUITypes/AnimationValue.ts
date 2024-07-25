import { EasingTypes } from "./EasingTypes";

export interface AnimationValue {
    duration?: number,
    destroy_at_end?: string,
    easing?: EasingTypes,
    from?: any,
    to: any,
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