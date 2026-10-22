import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// 1. Đọc data.d để lấy danh sách tên 82 map chuẩn J2ME
const rawDataD = fs.readFileSync(path.join(__dirname, 'jar_extracted/data/data.d'));
const dBuf = rawDataD.slice(2);
let cPos = 0;
function readUByte() { return dBuf[cPos++]; }
function read1DBytes() {
    const l = readUByte();
    const arr = [];
    for (let i = 0; i < l; i++) arr.push(dBuf.readInt8(cPos++));
    return arr;
}
function read2DBytes() {
    const rows = readUByte();
    const res = [];
    for (let i = 0; i < rows; i++) res.push(read1DBytes());
    return res;
}
function readStringArray() {
    const count = readUByte();
    const list = [];
    for (let i = 0; i < count; i++) {
        const charLen = readUByte();
        let str = '';
        for (let j = 0; j < charLen; j++) {
            const code = (dBuf[cPos] << 8) | (dBuf[cPos + 1] & 0xff);
            cPos += 2;
            str += String.fromCharCode(code);
        }
        list.push(str.trim());
    }
    return list;
}

read2DBytes(); // p_2d
read2DBytes(); // rawMonStats
read2DBytes(); // rawSkillStats
readStringArray(); // skillCategories
readStringArray(); // skillNames
readStringArray(); // elementNames
readStringArray(); // monsterNames
readStringArray(); // itemDescriptions
readStringArray(); // itemNames
const mapNames = readStringArray(); // mapNames 82 items

// 2. Đọc map.d để lấy node links
const mapDBuf = fs.readFileSync(path.join(__dirname, 'jar_extracted/data/map.d'));
let c = 2;
function readByte2D() {
    const rows = mapDBuf[c++];
    const res = [];
    for (let r = 0; r < rows; r++) {
        const cols = mapDBuf[c++];
        const row = [];
        for (let col = 0; col < cols; col++) {
            row.push(mapDBuf.readInt8(c++));
        }
        res.push(row);
    }
    return res;
}
const regions = readByte2D();
const nodes = readByte2D();

// 3. Đọc extracted_maps.js để biết những map nào đã có dữ liệu tilemap
const extrText = fs.readFileSync(path.join(__dirname, '../client/js/data/extracted_maps.js'), 'utf-8');
const mapKeys = [];
const regex = new RegExp('"map_(\\d+)":\\s*\\{', 'g');
let match;
while ((match = regex.exec(extrText)) !== null) {
    mapKeys.push(parseInt(match[1]));
}

console.log(`Total extracted maps available in J2ME_MAPS_DATA: ${mapKeys.length}`);
console.log(`Total authentic maps named in data.d: ${mapNames.length}`);
console.log(`Total nodes in map.d: ${nodes.length}`);

// Print map linkage details
console.log('\n=== KEY MAP LINKAGES ===');
const sampleMaps = [0, 1, 2, 3, 4, 5, 6, 8, 10, 11, 12, 16, 24, 28, 43, 48, 49, 59, 68];
sampleMaps.forEach(id => {
    const name = mapNames[id] || `Map #${id}`;
    const node = nodes[id] || [];
    
    // Check extracted data
    const key = `map_${id}`;
    const idx = extrText.indexOf(`"${key}":`);
    let tileInfo = 'No extracted data';
    if (idx !== -1) {
        const slice = extrText.slice(idx, idx + 400);
        const tilesetM = slice.match(/"tilesetId":\s*(\d+)/);
        const colsM = slice.match(/"cols":\s*(\d+)/);
        const rowsM = slice.match(/"rows":\s*(\d+)/);
        tileInfo = `tileset: ${tilesetM ? tilesetM[1] : '?'}, cols: ${colsM ? colsM[1] : '?'}, rows: ${rowsM ? rowsM[1] : '?'}`;
    }
    console.log(`[Map ${id}] "${name}" (${tileInfo}) -> N:${node[2]} S:${node[3]} W:${node[4]} E:${node[5]} (Coord: ${node[0]}, ${node[1]})`);
});
