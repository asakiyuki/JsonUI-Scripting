import fs from "fs-extra";
import { parse } from "jsonc-parser";
import { Class } from "../../compoments/Class";
import { Random } from "../../compoments/Random";

interface SoundID {
	[path: string]: string;
}

const sounds: SoundID = {};

export class SoundHandler extends Class {
	static get(path: string) {
		if (sounds[path]) {
			return sounds[path];
		} else {
			return (sounds[path] = `jsonui_scripting.${Random.getName()}`);
		}
	}

	static compile(installPath: string) {
		const soundIds = Object.keys(sounds);

		if (soundIds.length) {
			if (!fs.existsSync(`${installPath}/sounds`))
				fs.mkdirSync(`${installPath}/sounds`);

			const soundDefinitions: any = {};

			for (const soundPath of soundIds) {
				const soundId = sounds[soundPath];

				soundDefinitions[soundId] = {
					category: "ui",
					sounds: [
						{
							load_on_low_memory: true,
							name: soundPath,
							stream: true,
							volume: 1,
						},
					],
				};
			}

			let bak;
			if (fs.existsSync(`.bedrock/sounds/sound_definitions.json`)) {
				bak = parse(
					fs.readFileSync(
						`.bedrock/sounds/sound_definitions.json`,
						"utf-8"
					)
				).sound_definitions;
			}

			fs.writeJSONSync(
				`${installPath}/sounds/sound_definitions.json`,
				{
					format_version: "1.20.20",
					sound_definitions: {
						...bak,
						...soundDefinitions,
					},
				},
				"utf-8"
			);
		}

		return soundIds.length;
	}
}
