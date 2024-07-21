const fs = require('fs-extra');
function baoSaoDaiVipVaiLon(daiQuaVip = "", isStart = true) {
    const importArr = [];
    for (const folder of fs.readdirSync(`./src/${daiQuaVip}`)) {
        if (['packages.ts', 'types', 'screen', 'builder', 'cached', 'lib', 'compoments', 'Sound.ts', 'GenerateUUID.ts', 'Color.ts', 'index.ts'].includes(folder)) continue;
        else {
            if (folder.split('.').length === 2) importArr.push(`export * from "./${daiQuaVip}${folder.replace('.ts', '')}";`);
            else importArr.push(...baoSaoDaiVipVaiLon(`${daiQuaVip}${folder}/`, false));
        }
    }
    return isStart ? ["console.time('Compile time');", ...importArr].join('\n') : importArr;
};
fs.writeFileSync('./src/packages.ts', baoSaoDaiVipVaiLon(), 'utf-8');