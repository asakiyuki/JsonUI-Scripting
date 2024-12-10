import { Class } from "../Class";
import { OverrideInterface } from "../Modify";
import { UI } from "../UI";

export class SinTable extends Class {
	private static sinTable?: { [key: string]: number };

	static get() {
		if (SinTable.sinTable) return this.sinTable;
		else {
			this.sinTable = {};

			let deg = -1;
			while (++deg < 360)
				this.sinTable[`#deg_base:${deg}`] = Math.round(
					Math.sin((deg * Math.PI) / 180) * 1000
				);

			return this.sinTable;
		}
	}

	static create(arg: UI | OverrideInterface) {
		arg.setProperties({
			property_bag: SinTable.get(),
		});
	}
}
