const fs = require('fs-extra');
function baoSaoDaiVipVaiLon(daiQuaVip = "", isStart = true) {
    const importArr = [];
    for (const folder of fs.readdirSync(`./src/${daiQuaVip}`)) {
        if (folder === 'app') continue;
        else {
            if (folder.split('.').length === 2) importArr.push(`export * from "./${daiQuaVip}${folder.replace('.ts', '')}";`);
            else importArr.push(...baoSaoDaiVipVaiLon(`${daiQuaVip}${folder}/`, false));
        }
    }
    return isStart ? importArr.join('\n') : importArr;
};
fs.writeFileSync('./src/index.ts', baoSaoDaiVipVaiLon(), 'utf-8');