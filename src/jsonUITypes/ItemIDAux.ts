import { ItemID } from "./ItemID";

export const ItemIDAux = {};
Object.assign(ItemIDAux, ItemID);

for (const key in ItemIDAux)
    (<any>ItemIDAux)[key] = (<any>ItemIDAux)[key] * 65536;