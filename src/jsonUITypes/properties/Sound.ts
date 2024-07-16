import { GlobalTypes } from "../..";
import { SoundObject } from "../SoundObject";
import { Num } from "../Types";

export default interface SoundInterface {
    sound_name?: GlobalTypes,
    sound_volume?: GlobalTypes | Num,
    sound_pitch?: GlobalTypes | Num,
    sounds?: GlobalTypes | SoundObject[],
}