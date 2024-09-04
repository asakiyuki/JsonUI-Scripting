import { UUID } from "../types/objects/Manifest";
import { Class } from "./Class";
import { Configs } from "../compilers/Config";

export class Random extends Class {
    private static namespaces?: Array<string>;
    static getName(
        length: number = Configs.getConfig().buildElementNameStringLength
    ) {
        const randomStringArray: Array<string> = Array.from({ length }, (v) =>
            Math.floor(Math.random() * 32).toString(32)
        );
        return randomStringArray.join("");
    }
    static getNamespace(
        length: number = Configs.getConfig().buildNamespaceStringLength
    ) {
        if (Random.namespaces === undefined)
            Random.namespaces = Array.from(
                { length: Configs.getConfig().namespaceAmountGenerate },
                () => Random.getName(length)
            );
        const randomIndex = Math.floor(
            Math.random() * Configs.getConfig().namespaceAmountGenerate
        );
        return Random.namespaces[randomIndex];
    }
    static getUUID(): UUID {
        return <UUID>(
            "$$$$$$$$-$$$$-$$$$-$$$$-$$$$$$$$$$$$".replaceAll(/\$/g, () =>
                Math.floor(Math.random() * 16).toString(16)
            )
        );
    }
}
