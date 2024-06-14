export function objectForEach(data: object, callback: (value: any, key: string) => void) {
    for (const key in data) callback((data as any)[key], key);
}