export function generateRandomName(length: number = 25) {
    return Array.from({ length }, v => Math.floor(Math.random() * 16).toString(16)).join('');
}

const namespace: string[] = Array.from({ length: 64 }, () => generateRandomName());

export function getRandomNamespace() {
    return namespace[Math.floor(Math.random() * 10)];
}