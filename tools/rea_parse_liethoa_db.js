import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const chsBuf = fs.readFileSync(path.join(__dirname, 'extracted_jars/liethoa/data/script/chs.mid'));

console.log('=== GIẢI MÃ CHS.MID (STRING TABLE CỦA LIỆT HỎA) ===');
let pos = 0;
const totalStrings = chsBuf.readUInt16BE(pos); pos += 2;
console.log(`Số lượng chuỗi trong chs.mid: ${totalStrings}`);

const strings = [];
while (pos < chsBuf.length && strings.length < totalStrings) {
    const unknownId = chsBuf.readUInt16BE(pos); pos += 2;
    const charLen = chsBuf[pos++];
    let str = '';
    for (let i = 0; i < charLen; i++) {
        if (pos + 1 >= chsBuf.length) break;
        const code = chsBuf.readUInt16BE(pos); pos += 2;
        str += String.fromCharCode(code);
    }
    strings.push(str);
}

console.log(`Đã đọc thành công ${strings.length} chuỗi!`);
console.log('Mẫu 50 chuỗi đầu tiên:');
strings.slice(0, 50).forEach((s, idx) => console.log(`[${idx}] ${s}`));

// Tìm sủng vật và kỹ năng trong strings
const skillsAndPets = strings.filter((s, idx) => {
    return s.length > 1 && !s.includes(' ') && s.length <= 15;
});
console.log(`\nCác tên có thể là sủng vật hoặc kỹ năng (${skillsAndPets.length}):`);
console.log(skillsAndPets.slice(0, 40));
