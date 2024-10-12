import { Class } from "./Class";

const itemList = require("../items.json");

export class Items extends Class {
    static getID(identification: string): number {
        if (identification.split(":").length === 1)
            identification = `minecraft:${identification}`;
        return itemList[identification] || -1;
    }
    static getAuxID(identification: string): number {
        const id = Items.getID(identification);
        return id === -1 ? -1 : id * 0x10000;
    }
}
