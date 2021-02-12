import * as fs from 'fs';

const folderPath = process.cwd() + '/debug';

fs.rmdirSync(folderPath, { recursive: true });

if (!fs.existsSync(folderPath)) {
    fs.mkdirSync(folderPath);
}

export function debugToFile(name = '') {
    return (data) => {
        const string = JSON.stringify(data, null, '  ');
        fs.writeFileSync(folderPath + '/' + name + '.' + Date.now() + '.json', string);
        return data;
    };
}
