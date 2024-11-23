/**
 * Represents the format version of the manifest.
 */
export type FormatVerson = 1 | 2;

/**
 * Represents a version as a tuple of three numbers.
 * Example: [1, 0, 0]
 */
export type Version = [number, number, number];

/**
 * Represents a semantic versioning string, including optional pre-release and build metadata.
 * Examples:
 * - "1.0.0"
 * - "1.0.0-1"
 * - "1.0.0+123"
 */
export type SemverString =
	| `${number}.${number}.${number}`
	| `${number}.${number}.${number}-${number}`
	| `${number}.${number}.${number}+${number}`;

/**
 * Represents a universally unique identifier (UUID) in the standard format.
 * Example: "123e4567-e89b-12d3-a456-426614174000"
 */
export type UUID = `${string}-${string}-${string}-${string}-${string}`;

/**
 * Enum representing various types of modules.
 */
export enum Type {
	Resources = "resources",
	Data = "data",
	WorldTemplate = "world_template",
	Script = "script",
}

/**
 * Enum representing available scripting languages.
 */
export enum Language {
	JavaScript = "javascript",
}

/**
 * Enum for module names that are used in Minecraft-related modules.
 */
export enum ModuleName {
	Server = "@minecraft/server",
	ServerUI = "@minecraft/server-ui",
	ServerGametest = "@minecraft/server-gametest",
	ServerNet = "@minecraft/server-net",
	ServerAdmin = "@minecraft/server-admin",
}

/**
 * The major version is fixed at 1.
 */
type Major = 1;

/**
 * The minor version, which can range from 0 to 14.
 */
type Minor = 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12 | 13 | 14;

/**
 * The patch version is fixed at 0.
 */
type Patch = 0;

/**
 * Represents the optional pre-release part of a version (e.g., "-beta" or "-rc").
 */
type PreRelease = "" | "-beta" | "-rc";

/**
 * A custom type for scripting version, combining the major, minor, patch, and optional pre-release.
 * Example: "1.0.0-beta"
 */
export type ScriptingVersion = `${Major}.${Minor}.${Patch}${PreRelease}`;

/**
 * Interface representing the header of a manifest, which contains metadata about the pack.
 */
export interface Header {
	/**
	 * If true, allows the use of a random seed for the world.
	 * @default false
	 */
	allow_random_seed?: boolean;

	/**
	 * The version of the base game.
	 */
	base_game_version?: Version;

	/**
	 * A brief description of the pack.
	 */
	description?: string;

	/**
	 * If true, locks template options to prevent modification.
	 * @default false
	 */
	lock_template_options?: boolean;

	/**
	 * The minimum required engine version for the pack.
	 */
	min_engine_version?: Version;

	/**
	 * The name of the pack.
	 */
	name: string;

	/**
	 * The scope of the pack (e.g., for which environment or platform it is intended).
	 */
	pack_scope?: string;

	/**
	 * The UUID of the pack.
	 */
	uuid: UUID;

	/**
	 * The version of the pack, which can either be a version tuple or a semantic versioning string.
	 */
	version: Version | SemverString;
}

/**
 * Interface representing a module, including metadata and version information.
 */
export interface Modules {
	/**
	 * A description of the module.
	 */
	description?: string;

	/**
	 * The type of module (e.g., resources, data, world template, etc.).
	 */
	type: Type;

	/**
	 * The UUID of the module.
	 */
	uuid: UUID;

	/**
	 * The version of the module, either as a version tuple or semantic versioning string.
	 */
	version: Version | SemverString;

	/**
	 * The scripting language of the module (if applicable).
	 */
	language?: Language;
}

/**
 * Interface representing dependencies for the manifest, including module UUIDs, names, and versions.
 */
export interface Dependencies {
	/**
	 * The UUID of the dependent module.
	 */
	uuid?: UUID;

	/**
	 * The name of the dependent module (e.g., "@minecraft/server").
	 */
	module_name?: ModuleName;

	/**
	 * The version of the dependent module, which can either be a version tuple or a scripting version.
	 */
	version?: Version | ScriptingVersion;
}

/**
 * Interface representing optional capabilities available in the manifest, such as experimental features.
 */
export interface CapabilitiesObject {
	/**
	 * Optional feature for chemistry-related capabilities.
	 */
	chemistry?: any;

	/**
	 * Optional feature for editor extensions.
	 */
	editorExtension?: any;

	/**
	 * Optional feature for experimental custom UI support.
	 */
	experimental_custom_ui?: any;

	/**
	 * Optional feature for ray tracing support.
	 */
	raytraced?: any;
}

/**
 * Enum representing predefined capabilities that can be enabled in the manifest.
 */
export enum Capabilities {
	ScriptEval = "script_eval",
}

/**
 * Type representing the authors of the pack.
 */
export type Authors = Array<string>;

/**
 * Interface for metadata related to the pack, including authors, license, and URL.
 */
export interface Metadata {
	/**
	 * A list of authors who contributed to the pack.
	 */
	authors?: Authors;

	/**
	 * The license under which the pack is distributed.
	 */
	license?: string;

	/**
	 * Information on what generated the pack.
	 */
	generated_with?: object;

	/**
	 * The product type of the pack (e.g., "game", "mod").
	 */
	product_type?: string;

	/**
	 * A URL related to the pack (e.g., documentation or project site).
	 */
	url?: string;
}

/**
 * Interface representing the manifest structure of the pack, combining all information into a single object.
 */
export interface ManifestInterface {
	/**
	 * The format version of the manifest.
	 */
	format_version: FormatVerson;

	/**
	 * The header information of the manifest.
	 */
	header: Header;

	/**
	 * The list of modules included in the pack.
	 */
	modules: Modules[];

	/**
	 * The list of dependencies for the pack.
	 */
	dependencies?: Dependencies[];

	/**
	 * A list of capabilities enabled in the pack.
	 */
	capabilities?: (CapabilitiesObject | Capabilities)[];

	/**
	 * Additional metadata about the pack.
	 */
	metadata?: Metadata;
}
