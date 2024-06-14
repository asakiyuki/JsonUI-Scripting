const namespace: string[] = [];

export function generateRandomName(length: number = 25) {
    return Array.from({ length }, v => Math.floor(Math.random() * 16).toString(16)).join('');
}

export function getRandomNamespace() {
    if (namespace.length < 10) namespace.push(generateRandomName());
    return namespace[Math.floor(Math.random() * namespace.length)];
}