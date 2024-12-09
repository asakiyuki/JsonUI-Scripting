export function CurrentLine() {
	const lines = new Error("Code Line").stack?.match(/[A-Z]:(.+):\d+:\d+/g);
	return lines?.[lines.length - 1];
}
