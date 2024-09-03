const fs = require("fs-extra");
const hex = [];
Array.from(fs.readFileSync("data/items.bin", "hex"))
    .slice(4)
    .forEach((value, index) => {
        if (index % 2 === 0) hex.push(value);
        else hex[hex.length - 1] += value;
    });

function ReadItem(start, length, hex) {
    const parseInt = Number.parseInt(length, 16),
        parseLength = parseInt + start,
        hexID = hex.slice(start, parseLength),
        hexValue = hex.slice(parseLength, parseLength + 2),
        nextLength = hex[(parseLength, parseLength + 3)],
        nextIndex = parseLength + 4,
        parseItemID = Number.parseInt(
            `${hexValue[1] === "00" ? "" : hexValue[1]}${hexValue[0]}`,
            16
        );
    return {
        itemDef: hexID
            .map((v) => String.fromCharCode(Number.parseInt(v, 16)))
            .join("")
            .match(/:(\w|\.)+/)[0]
            .replace(/[:_.]\w/g, (v) => v.slice(1).toUpperCase()),
        itemID:
            parseItemID >= 32767
                ? parseItemID - 0x10000
                : parseItemID + (parseItemID >= 262 ? 1 : 0),
        nextLength,
        nextIndex,
    };
}

const items = {};

const hexReader = {
    next: hex[0],
    index: 1,
};

while (hex.length >= hexReader.index) {
    const item = ReadItem(hexReader.index, hexReader.next, hex);
    hexReader.index = item.nextIndex;
    hexReader.next = item.nextLength;
    items[item.itemDef] = item.itemID;
}

let itemID = ``,
    itemIDAux = ``;

Object.keys(items).forEach((key) => {
    const value = items[key];
    itemID += `\n    ${key} = ${value},`;
    itemIDAux += `\n    ${key} = ${value * 65536},`;
});

itemID = `export enum ItemID {${itemID}\n};`;
itemIDAux = `export enum ItemIDAux {${itemIDAux}\n};`;

fs.writeFileSync("src/types/enums/Items.ts", `${itemID}\n\n${itemIDAux}`);
