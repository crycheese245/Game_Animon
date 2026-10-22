import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const txt = fs.readFileSync(path.join(__dirname, '../client/js/data/extracted_maps.js'), 'utf8');
const checkIds = [0, 1, 2, 3, 4, 5, 6, 8, 10, 11, 12, 16, 24, 28, 43, 48, 49, 52, 59];

checkIds.forEach(id => {
    const key = `map_${id}`;
    const pattern = new RegExp(`"${key}":\\s*\\{([\\s\\S]*?)"groundTiles"`);
    const m = txt.match(pattern);
    if (m) {
        const nameM = m[1].match(/"name":\s*"([^"]+)"/);
        const colsM = m[1].match(/"cols":\s*(\d+)/);
        const rowsM = m[1].match(/"rows":\s*(\d+)/);
        const tileM = m[1].match(/"tilesetId":\s*(\d+)/);
        console.log(`${key}: ${nameM ? nameM[1] : '?'} | ${colsM ? colsM[1] : '?'}x${rowsM ? rowsM[1] : '?'} | tileset: ${tileM ? tileM[1] : '?'}`);
    } else {
        console.log(`${key}: NOT FOUND`);
    }
});
