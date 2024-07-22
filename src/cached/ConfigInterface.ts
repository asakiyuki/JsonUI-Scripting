export interface ConfigInterface {
    folder_name?: string,
    development?: boolean,
    preview?: boolean,
    obfuscate_element_names?: boolean,
    debug_screen_content?: boolean,
    manifest?: {
        name?: string,
        description?: string,
        version?: [number, number, number],
        uuid?: string
    }
}