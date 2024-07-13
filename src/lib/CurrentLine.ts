const dirPath = require.main?.filename.replace(/\w+.js$/, '');
export function CurrentLine() {
    const $: string[] = <any>new Error('').stack?.match(/[A-Z]:\\(\w|\\| )+.js(:\d+)+/g);
    return $[$?.length - 1].replace(dirPath ?? '', '').replace(/\\/g, '/').replace('.', '-');
}