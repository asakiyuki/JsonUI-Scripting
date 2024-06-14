import { Num } from "./Types";

export interface SoundObject {
    sound_name?: string,
    sound_volume?: Num,
    sound_pitch?: Num,
    min_seconds_between_plays?: Num,
}