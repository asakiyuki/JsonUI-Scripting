const fs = require("fs-extra");
(async () => {
	const itemsList = await fetch(
		"https://asakiyuki.com/api/minecraft/item-ids"
	).then((v) => v.json());

	const list = [];

	for (const key in itemsList) {
		const id = itemsList[key];
		list.push(`    '${key}' = ${id * 65536}`);
	}

	fs.writeFileSync(
		"src/types/enums/ItemAuxID.ts",
		`export enum ItemAuxID {\n${list.join(",\n")}\n}`,
		"utf-8"
	);
})();
