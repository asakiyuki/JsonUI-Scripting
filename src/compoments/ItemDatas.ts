import { ItemAuxID } from "../types/enums/ItemAuxID";
import { Class } from "./Class";

export class Items extends Class {
	static getID(identification: string): number {
		return this.getAuxID(identification) / 0x10000;
	}
	static getAuxID(identification: string): number {
		if (identification.split(":").length === 1)
			identification = `minecraft:${identification}`;

		return (<any>ItemAuxID)[identification];
	}
}
