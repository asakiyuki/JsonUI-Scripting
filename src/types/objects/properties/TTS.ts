import { Bool } from "../../values/Bool";
import { Int } from "../../values/Number";
import { Str } from "../../values/Str";

/**
 * Interface representing text-to-speech (TTS) settings and configurations.
 */
export interface TTS {
	/**
	 * The name of the TTS configuration.
	 */
	tts_name?: string;

	/**
	 * The header text for the TTS control section.
	 */
	tts_control_header?: string;

	/**
	 * The header text for the TTS section.
	 */
	tts_section_header?: string;

	/**
	 * Defines the order priority for TTS control types.
	 * Lower values indicate higher priority.
	 */
	tts_control_type_order_priority?: number;

	/**
	 * Defines the index priority for TTS elements.
	 * Lower values indicate higher priority.
	 */
	tts_index_priority?: number;

	/**
	 * The value or CSS class to apply when the TTS toggle is in the "on" state.
	 */
	tts_toggle_on?: string;

	/**
	 * The value or CSS class to apply when the TTS toggle is in the "off" state.
	 */
	tts_toggle_off?: string;

	/**
	 * A value to override the control value for TTS.
	 */
	tts_override_control_value?: string;

	/**
	 * If true, TTS will inherit settings from sibling elements.
	 */
	tts_inherit_siblings?: boolean;

	/**
	 * The action or message to trigger when the TTS value changes.
	 */
	tts_value_changed?: string;

	/**
	 * If true, the TTS section is treated as a container.
	 */
	ttsSectionContainer?: boolean;

	/**
	 * If true, TTS will ignore count-based settings.
	 */
	tts_ignore_count?: boolean;

	/**
	 * If true, the TTS will skip the message.
	 */
	tts_skip_message?: boolean;

	/**
	 * Defines the order priority for TTS value changes.
	 * Lower values indicate higher priority.
	 */
	tts_value_order_priority?: number;

	/**
	 * If true, the TTS will play when the focus control remains unchanged.
	 */
	tts_play_on_unchanged_focus_control?: boolean;

	/**
	 * If true, the TTS will ignore subsections.
	 */
	tts_ignore_subsections?: boolean;

	/**
	 * The text or value to be used for the TTS.
	 */
	text_tts?: string;

	/**
	 * If true, the TTS will use priority settings.
	 */
	use_priority?: boolean;

	/**
	 * A boolean to set whether the TTS should have priority or not.
	 */
	priority?: boolean;
}
