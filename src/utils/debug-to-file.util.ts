import * as fs from 'fs';

const folderPath = process.cwd() + '/debug';

if (!fs.existsSync(folderPath)) {
    fs.mkdirSync(folderPath);
}

export function debugToFile(data, name = '') {
    const string = JSON.stringify(data, null, '  ');
    fs.writeFileSync(folderPath + '/' + name + string.slice(0, 10) + '.' + Date.now() + '.json', string);
    return data;
}
