import fs from "fs-extra";
import { SearchFiles } from "../generator/SearchFiles";
import { spawnSync, execSync } from "child_process";

export function FormatAudio() {
	if (!spawnSync("ffmpeg", ["-version"], { stdio: "ignore" }).error) {
		const reg = /\.(mp3|wav|m4a)$/;

		const files = SearchFiles.array(".bedrock", ".bedrock").filter((path) =>
			reg.test(path)
		);

		if (files.length) {
			console.timeLog(
				"Compiler",
				">> Starting to convert all found audio files to OGG format"
			);

			for (const file of files) {
				const out = file.replace(reg, ".ogg");
				execSync(
					`ffmpeg -i ${file} -acodec libvorbis -ar 44100 -aq 5 -map_metadata -1 ${out}`,
					{
						stdio: "ignore",
					}
				);
				fs.rmSync(file);

				console.timeLog(
					"Compiler",
					`>> Reformatting of ${file.replace(
						/^\.bedrock\//,
						""
					)} is complete.`
				);
			}

			console.timeLog(
				"Compiler",
				`>> Successfully reformatted ${files.length} audio file(s).`
			);
			console.log();
		}
	}
}
