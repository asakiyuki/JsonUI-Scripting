import { Float } from "../../values/Number";
import { Str } from "../../values/Str";
import { Sound } from "../Sound";

/**
 * Represents the configuration for a sound element.
 * A Sound element is used for defining various audio properties, such as the sound file, volume, pitch, and other related settings.
 */
export interface Sounds {
	/**
	 * The path of the sound, which can automatically register usable sounds.
	 */
	sound_path?: string;

	/**
	 * The name of the sound element.
	 * This can be used to reference or identify the sound in the system.
	 */
	sound_name?: Str;

	/**
	 * The volume level of the sound.
	 * A float value typically ranging from 0.0 (mute) to 1.0 (full volume).
	 */
	sound_volume?: Float;

	/**
	 * The pitch of the sound.
	 * A float value that can modify the frequency of the sound, altering its tone.
	 */
	sound_pitch?: Float;

	/**
	 * An array of other sound elements.
	 * This allows the grouping of multiple sounds, which can be useful for creating sound effects with multiple components or variations.
	 */
	sounds?: Array<Sound>;
}
