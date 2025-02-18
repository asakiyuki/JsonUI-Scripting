const regex: any = {
    win32: /[A-Z]:(.+):\d+:\d+/g,
    linux: /\/(.+):\d+:\d+/g,
};

export function CurrentLine() {
    const lines = new Error("Code Line").stack?.match(regex[process.platform]);
    return lines ? lines[lines.length - 1] : "Unknown";
}
