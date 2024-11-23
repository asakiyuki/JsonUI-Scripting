import { UUID } from "crypto";
import {
	ManifestInterface,
	SemverString,
	Type,
	Version,
} from "../../types/objects/Manifest";
import { Save } from "./Save";

interface ManifestHeader {
	name: string;
	description?: string;
	uuid?: UUID;
	version?: Version | SemverString;
}

interface ManifestMetadata {
	authors?: Array<string>;
	license?: string;
	url?: string;
	producType?: string;
	generatedWith?: object;
}

/**
 * Represents a manifest object.
 *
 * @class Manifest
 */
export class Manifest {
	/**
	 * The manifest data.
	 *
	 * @type {ManifestInterface}
	 */
	manifest: ManifestInterface;

	/**
	 * Creates an instance of a Manifest.
	 *
	 * @param {ManifestHeader} header - The header for the manifest.
	 * @param {Type} [type=Type.Resources] - The type of the module (defaults to `Type.Resources`).
	 * @param {ManifestMetadata} [metadata] - Optional metadata for the manifest.
	 */
	constructor(
		header: ManifestHeader,
		type: Type = Type.Resources,
		metadata?: ManifestMetadata
	) {
		const uuid = Save.uuid();

		this.manifest = {
			format_version: 2,
			header: {
				name: header.name,
				uuid: header.uuid || uuid[0],
				description: header.description,
				version: header.version || [1, 0, 0],
			},
			modules: [
				{
					type: type,
					uuid: uuid[1],
					version: [1, 0, 0],
				},
			],
			metadata: metadata && {
				authors: metadata.authors,
				license: metadata.license,
				url: metadata.url,
				product_type: metadata.producType,
				generated_with: metadata.generatedWith,
			},
		};
	}

	/**
	 * Converts the manifest to a JSON string.
	 *
	 * @returns {string} The manifest as a formatted JSON string.
	 */
	buildJson() {
		return JSON.stringify(this.manifest, null, 4);
	}
}
