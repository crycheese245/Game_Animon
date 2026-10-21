import fs from 'fs';
import path from 'path';

const mapFiles = ['cun1.map', 'cheng1.map', 'dating.map', 'dong1.map', 'huangdi1.map', 'pingyuan.map'];
const baseDir = 'E:/WorkSpace/Projects/TrichXuatFileJar/ASSETS_PHAN_LOAI/3_Ban_Do_Va_Du_Lieu/vuong-quoc-sung-vat-lien-thu-chien-ky_240x320';

const mapsData = {};

for (const mf of mapFiles) {
    const fullPath = path.join(baseDir, mf);
    const buf = fs.readFileSync(fullPath);
    const width = buf.readUInt16BE(4);
    const height = buf.readUInt16BE(6);
    const tileW = buf.readUInt8(8);
    const tileH = buf.readUInt8(9);
    const numTilesets = buf.readUInt8(10);

    let offset = 11;
    const tilesetNames = [];
    for (let i = 0; i < numTilesets; i++) {
        const nameLen = buf.readUInt16BE(offset);
        offset += 2;
        const name = buf.toString('ascii', offset, offset + nameLen);
        offset += nameLen;
        tilesetNames.push(name);
    }

    const mapKey = path.basename(mf, '.map');
    const cols = Math.floor(width / tileW);
    const rows = Math.floor(height / tileH);
    const totalTiles = cols * rows;

    const tileMatrix = [];
    for (let i = offset; i < Math.min(buf.length, offset + totalTiles); i++) {
        tileMatrix.push(buf.readUInt8(i));
    }

    mapsData[mapKey] = {
        name: mf,
        cols,
        rows,
        tileW,
        tileH,
        tilesets: tilesetNames,
        data: tileMatrix
    };
}

const fileContent = `const J2ME_MAPS_DATA = ${JSON.stringify(mapsData, null, 2)};\n\nif (typeof window !== 'undefined') {\n    window.J2ME_MAPS_DATA = J2ME_MAPS_DATA;\n}\n`;

fs.writeFileSync('client/js/data/extracted_maps.js', fileContent, 'utf-8');
if (!fs.existsSync('js/data')) fs.mkdirSync('js/data', { recursive: true });
fs.writeFileSync('js/data/extracted_maps.js', fileContent, 'utf-8');

console.log('Successfully generated client/js/data/extracted_maps.js and js/data/extracted_maps.js!');

