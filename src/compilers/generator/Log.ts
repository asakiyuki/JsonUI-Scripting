import { Class } from "../../compoments/Class";

export const Logs: Array<{ type: "warning" | "error"; message: string }> = [];

export class Log extends Class {
	static warning(message: string) {
		Logs.push({
			type: "warning",
			message: `[Warning] >> ${message}`,
		});
	}

	static error(message: string) {
		Logs.push({
			type: "error",
			message: `[Error] >> ${message}`,
		});
	}
}
