import { generateRandomName } from "../jsonUI/GenerateRandomName";
const dirPath = require.main?.filename.replace(/\w+.js$/, '');
export function CurrentLine() {
    try {
        const $: string[] = <any>new Error('').stack?.match(/[A-Z]:.+\.js(:\d+)+/g);
        return $[$?.length - 1].replace(dirPath || '', '').replace(/\\/g, '/').replace('.', '-');
    } catch (error) {
        return generateRandomName();
    }
}
export function CurrentFile() {
    try {
        const $: string[] = <any>new Error('').stack?.match(/\w+.js(:\d+)+/g);
        return `${$[$?.length - 1].replace(/:\d+|.js/g, '')}`;
    } catch (error) {
        return generateRandomName();
    }
}