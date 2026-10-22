import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const chsBuf = fs.readFileSync(path.join(__dirname, 'extracted_jars/liethoa/data/script/chs.mid'));

let pos = 0;
const totalStrings = chsBuf.readUInt16BE(pos); pos += 2;
console.log(`Số lượng chuỗi: ${totalStrings}`);

const strings = [];
for (let i = 0; i < totalStrings && pos < chsBuf.length; i++) {
    const header = chsBuf.readUInt16BE(pos); pos += 2;
    const charLen = chsBuf[pos++];
    let str = '';
    for (let c = 0; c < charLen; c++) {
        if (pos + 2 > chsBuf.length) break;
        const code = chsBuf.readUInt16BE(pos); pos += 2;
        str += String.fromCharCode(code);
    }
    strings.push(str);
}

console.log(`Đọc thành công ${strings.length}/${totalStrings} chuỗi!`);
console.log('--- 60 CHUỖI ĐẦU TIÊN ---');
strings.slice(0, 60).forEach((s, idx) => console.log(`${idx}: "${s}"`));

console.log('--- 60 CHUỖI TỪ VỊ TRÍ 100 ĐẾN 160 ---');
strings.slice(100, 160).forEach((s, idx) => console.log(`${idx + 100}: "${s}"`));

console.log('--- 60 CHUỖI TỪ VỊ TRÍ 250 ĐẾN 310 ---');
strings.slice(250, 310).forEach((s, idx) => console.log(`${idx + 250}: "${s}"`));
