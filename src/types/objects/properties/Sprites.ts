import { ClipDirection } from "../../enums/ClipDirecion";
import { FontType } from "../../enums/FontType";
import { TextureFileSystem } from "../../enums/TextureFileSystem";
import { Bool } from "../../values/Bool";
import { ColorVector3 } from "../../values/ColorVector";
import { Float, Int } from "../../values/Number";
import { Str } from "../../values/Str";
import { Var } from "../../values/Variable";
import { Vector2, Vector4 } from "../../values/Vector";

/**
 * Represents the configuration options for sprites used in rendering.
 * This interface includes settings for textures, colors, UV mapping, tiling, and various other sprite-specific properties.
 */
export interface Sprites {
	/**
	 * The texture file used for the sprite.
	 * This can be a string representing the texture's path or a more complex texture system configuration.
	 */
	texture?: Str;

	/**
	 * If true, enables debugging for missing textures.
	 * Allows the system to provide debug information when the texture is missing or not found.
	 */
	allow_debug_missing_texture?: Bool;

	/**
	 * The color applied to the sprite.
	 * This is a vector of 3 components (RGB) representing the color.
	 */
	color?: ColorVector3;

	/**
	 * The locked color applied to the sprite, used when the sprite's color is locked and cannot be changed.
	 * This is also a vector of 3 components (RGB).
	 */
	locked_color?: ColorVector3;

	/**
	 * The UV coordinates for the sprite's texture.
	 * Represented as a vector of 2 components (x, y).
	 */
	uv?: Vector2;

	/**
	 * The size of the UV coordinates for the sprite's texture.
	 * Represented as a vector of 2 components (width, height).
	 */
	uv_size?: Vector2;

	/**
	 * The file system location of the texture file.
	 * This can be either a `Var` (variable) or a specific texture file system.
	 */
	texture_file_system?: Var | TextureFileSystem;

	/**
	 * The size of the sprite in nineslice mode, which allows for stretching and scaling of the sprite's corners.
	 * This can be a 2D vector (Vector2), a 4-component vector (Vector4), or an integer value (Int).
	 */
	nineslice_size?: Vector2 | Vector4 | Int;

	/**
	 * Whether the sprite should be tiled.
	 * This can be a boolean or a vector indicating tiling in the x and y directions.
	 */
	tiled?: Bool | Vector2;

	/**
	 * The scaling factor for the tiled sprite.
	 * This is a vector of 2 components (x, y) that determines how the tiles are scaled.
	 */
	tiled_scale?: Vector2;

	/**
	 * The direction for clipping the sprite's texture.
	 * This could represent the direction in which the texture is clipped.
	 */
	clip_direction?: Var | ClipDirection;

	/**
	 * The ratio for clipping the sprite's texture.
	 * A floating point value that determines how much of the sprite is clipped.
	 */
	clip_ratio?: Float;

	/**
	 * If true, enables pixel-perfect clipping.
	 * Ensures that the clipping of the sprite's texture is aligned with pixel boundaries.
	 */
	clip_pixelperfect?: Bool;

	/**
	 * If true, keeps the sprite's aspect ratio intact when scaling.
	 * Ensures that the sprite does not get distorted when resized.
	 */
	keep_ratio?: Bool;

	/**
	 * If true, enables bilinear filtering for the sprite's texture.
	 * This smooths the texture by interpolating between pixels when the sprite is resized.
	 */
	bilinear?: Bool;

	/**
	 * If true, the sprite will fill the available space.
	 * This can make the sprite stretch to fill its container or bounding box.
	 */
	fill?: Bool;

	/**
	 * The font type for the sprite, if applicable.
	 * This can be a `Var` or a specific `FontType` configuration.
	 */
	font_type?: Var | FontType;

	/**
	 * If true, fits the sprite to the width of its container.
	 * This scales the sprite's width to match the container's width while maintaining the aspect ratio.
	 */
	$fit_to_width?: Bool;

	/**
	 * The folder containing textures in a zip file.
	 * This can be a string representing the path to the zip folder containing the textures.
	 */
	zip_folder?: Str;

	/**
	 * If true, converts the sprite's colors to grayscale.
	 * This will desaturate the sprite's colors and make them appear in grayscale.
	 */
	grayscale?: Bool;

	/**
	 * If true, forces the sprite's texture to reload.
	 * This can be useful when the texture has been updated or changed and needs to be reloaded into memory.
	 */
	force_texture_reload?: Bool;

	/**
	 * The base size of the sprite.
	 * Represented as a vector of 2 components (width, height) that defines the initial size of the sprite.
	 */
	base_size?: Vector2;
}
