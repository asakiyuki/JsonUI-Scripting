import { LanguageFile } from "./Types"

export type ArrayProperty = [string | LanguageInterface | LanguageCustomInterface];
export type LanguageInterface = {
    lang: {
        [key: string]: {
            [key in LanguageFile]?: string
        }
    }
}
export type LanguageCustomInterface = {
    lang: {
        [key: string]: {
            [key: string]: string
        }
    }
}
