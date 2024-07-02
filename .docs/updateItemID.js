const isBeta = true;
const { JSDOM } = require('jsdom');
const fs = require('fs');

fetch('https://raw.githubusercontent.com/bedrock-dot-dev/docs/master/tags.json').then(v => v.json()).then(v => {
    const version = v[isBeta ? 'beta' : 'stable'];
    fetch(`https://raw.githubusercontent.com/bedrock-dot-dev/docs/master/${version[0]}/${version[1]}/Addons.html`).then(v => v.text()).then(v => {
        const sortItemIDList = {};
        const itemIDArray = [];
        const itemIDList = {};
        new JSDOM(v).window.document.querySelectorAll('table').item(11).querySelectorAll('tr').forEach((v, i) => {
            if (i !== 0) {
                const td = v.querySelectorAll('td');
                const name = td.item(0).textContent, id = +td.item(1).textContent;
                itemIDArray.push(id);
                sortItemIDList[`${id}`] = name;
            }
        });
        itemIDArray.sort((a, b) => a - b);
        itemIDArray.forEach(v => {
            itemIDList[sortItemIDList[`${v}`]] = v
            delete sortItemIDList[`${v}`];
        });

        fs.writeFileSync('src/jsonUITypes/ItemID.ts', `export const ItemID = ${JSON.stringify(itemIDList, null, 4)}`);
    });
});