import { Class } from "../compoments/Class"
import { UI } from "../compoments/UI";
import { Configs } from "./Config";

interface JsonObject {
    build: {
        [file: string]: {
            namespace: string,
            [element: string]: any
        }
    },
    modify: {
        [modifyFilePath: string]: {
            [path: string]: any
        }
    },
    globalVariables: {
        [key: `$${string}`]: any
    }
};

export class JsonBuilder extends Class {
    static save: JsonObject = {
        build: {},
        globalVariables: {},
        modify: {}
    };

    static registerElement(namespace: string, element: UI) {
        const extension = Configs.getConfig().buildFileExtension;
        const buildFile = this.save.build[`${namespace}${(extension === '') ? '' : `.${extension}`}`] ??= { namespace };
        buildFile[element.getFullPath()] = element;
    };

    static registerModify(modifyFilePath: string) {

    };
};