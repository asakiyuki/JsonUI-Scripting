import { Float } from "../values/Number";

/**
 * Interface representing sound settings for a particular sound effect.
 */
export interface Sound {
	/**
	 * The name of the sound. This could be the name of an asset or identifier for the sound.
	 */
	sound_name?: string;

	/**
	 * The volume of the sound, typically ranging from 0.0 (silent) to 1.0 (full volume).
	 * Default value is usually 1.0 (full volume) if not provided.
	 */
	sound_volume?: Float;

	/**
	 * The pitch of the sound, typically ranging from 0.0 (lowest pitch) to 2.0 (double speed).
	 * Default value is usually 1.0 (normal pitch) if not provided.
	 */
	sound_pitch?: Float;

	/**
	 * The minimum time in seconds between consecutive plays of the same sound.
	 * This helps prevent the sound from being played too frequently in a short period.
	 */
	min_seconds_between_plays?: Float;
}
