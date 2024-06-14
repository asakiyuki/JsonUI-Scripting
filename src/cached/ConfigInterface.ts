export interface ConfigInterface {
    folder_name?: string,
    development?: boolean,
    preview?: boolean,
    obfuscator_element_name?: boolean,
    manifest?: {
        name?: string,
        description?: string,
        version?: [number, number, number],
        uuid?: string
    }
}