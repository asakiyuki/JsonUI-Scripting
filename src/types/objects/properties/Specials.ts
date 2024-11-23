import { Orientation } from "../../enums/Orientation";
import { Renderer } from "../../enums/Renderer";
import { Rotation } from "../../enums/Rotation";
import { Bool } from "../../values/Bool";
import { Float } from "../../values/Number";
import { Var } from "../../values/Variable";
import { Vector4 } from "../../values/Vector";

/**
 * Interface representing special settings for different renderers.
 */
export interface Special {
	/**
	 * The direction of the gradient, defined by a variable (`Var`) or an `Orientation`.
	 */
	gradient_direction?: Var | Orientation;

	/**
	 * The first color of the gradient, represented as a `Vector4` (RGBA).
	 */
	color1?: Vector4;

	/**
	 * The second color of the gradient, represented as a `Vector4` (RGBA).
	 */
	color2?: Vector4;

	/**
	 * The color of the text, represented as a `Vector4` (RGBA).
	 */
	text_color?: Vector4;

	/**
	 * The background color, represented as a `Vector4` (RGBA).
	 */
	background_color?: Vector4;

	/**
	 * The primary color, represented as a `Vector4` (RGBA).
	 */
	primary_color?: Vector4;

	/**
	 * The secondary color, represented as a `Vector4` (RGBA).
	 */
	secondary_color?: Vector4;

	/**
	 * The degree of camera tilt, represented as a floating-point value.
	 */
	camera_tilt_degrees?: Float;

	/**
	 * A flag to indicate if rotation starts immediately (`true` for starting rotation).
	 */
	starting_rotation?: Bool;

	/**
	 * A flag indicating whether a UUID should be used (`true` for UUID usage).
	 */
	use_uuid?: Bool;

	/**
	 * A flag to determine if the skin's GUI scale should be used (`true` for scaling).
	 */
	use_skin_gui_scale?: Bool;

	/**
	 * A flag to determine if the player paperdoll should be used (`true` for using paperdoll).
	 */
	use_player_paperdoll?: Bool;

	/**
	 * The rotation setting, defined by a variable (`Var`) or a `Rotation`.
	 */
	rotation?: Var | Rotation;

	/**
	 * The event triggered at the end, defined as a string.
	 */
	end_event?: string;
}

/**
 * Interface representing a gradient with direction and two colors.
 */
interface Gradient {
	/**
	 * The direction of the gradient, defined by a variable (`Var`) or an `Orientation`.
	 */
	gradient_direction?: Var | Orientation;

	/**
	 * The first color of the gradient, represented as a `Vector4` (RGBA).
	 */
	color1?: Vector4;

	/**
	 * The second color of the gradient, represented as a `Vector4` (RGBA).
	 */
	color2?: Vector4;
}

/**
 * Interface representing a nametag with text and background colors.
 */
interface Nametag {
	/**
	 * The color of the text, represented as a `Vector4` (RGBA).
	 */
	text_color?: Vector4;

	/**
	 * The background color, represented as a `Vector4` (RGBA).
	 */
	background_color?: Vector4;
}

/**
 * Interface representing a progress bar with primary and secondary colors.
 */
interface ProgessBar {
	/**
	 * The primary color of the progress bar, represented as a `Vector4` (RGBA).
	 */
	primary_color?: Vector4;

	/**
	 * The secondary color of the progress bar, represented as a `Vector4` (RGBA).
	 */
	secondary_color?: Vector4;
}

/**
 * Interface representing a paperdoll with camera tilt, rotation, and scaling options.
 */
interface PaperDoll {
	/**
	 * The degree of camera tilt, represented as a floating-point value.
	 */
	camera_tilt_degrees?: Float;

	/**
	 * A flag to indicate if rotation starts immediately (`true` for starting rotation).
	 */
	starting_rotation?: Bool;

	/**
	 * A flag indicating whether a UUID should be used (`true` for UUID usage).
	 */
	use_uuid?: Bool;

	/**
	 * A flag to determine if the skin's GUI scale should be used (`true` for scaling).
	 */
	use_skin_gui_scale?: Bool;

	/**
	 * A flag to determine if the player paperdoll should be used (`true` for using paperdoll).
	 */
	use_player_paperdoll?: Bool;

	/**
	 * The rotation setting, defined by a variable (`Var`) or a `Rotation`.
	 */
	rotation?: Var | Rotation;
}

/**
 * Interface representing a panorama with rotation settings.
 */
interface Panorama {
	/**
	 * The rotation setting, defined by a variable (`Var`) or a `Rotation`.
	 */
	rotation?: Var | Rotation;
}

/**
 * Interface representing credits with an optional end event.
 */
interface Credits {
	/**
	 * The event triggered at the end, defined as a string.
	 */
	end_event?: string;
}

/**
 * A type representing a collection of special renderer settings, keyed by the renderer type.
 */
export type Specials = {
	/**
	 * The gradient renderer settings.
	 */
	[Renderer.Gradient]: Gradient;

	/**
	 * The nametag renderer settings.
	 */
	[Renderer.NameTag]: Nametag;

	/**
	 * The progress bar renderer settings.
	 */
	[Renderer.ProgressBar]: ProgessBar;

	/**
	 * The paperdoll renderer settings.
	 */
	[Renderer.PaperDoll]: PaperDoll;

	/**
	 * The panorama renderer settings.
	 */
	[Renderer.Panorama]: Panorama;

	/**
	 * The credits renderer settings.
	 */
	[Renderer.Credits]: Credits;

	/**
	 * Any additional renderer settings can be added with a string key and object value.
	 */
	[key: string]: object;
};
