const fs = require('fs');
const $ = [];
const test = fs.readFileSync('test.txt', 'utf-8').split('\r\n');
test.forEach(v => {
    if (v[0] === "#" && !$.includes(v)) $.push(v)
})

fs.writeFileSync('test.txt', $.map(v => {
    const $ = v.slice(1).replace(/_\w/g, v => v.slice(1).toUpperCase());
    const _ = `${$[0].toUpperCase()}${$.slice(1)}`;
    return `${_} = "${v}",`;
}).join('\n'), 'utf-8');