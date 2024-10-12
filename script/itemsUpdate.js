const fs = require("fs-extra");
(async () => {
    const itemsList = await fetch(
        "https://asakiyuki.com/api/minecraft/items/numberic-id"
    ).then((v) => v.json());

    fs.writeJsonSync("src/items.json", itemsList, "utf-8");
    fs.writeJsonSync("dist/items.json", itemsList, "utf-8");
})();
