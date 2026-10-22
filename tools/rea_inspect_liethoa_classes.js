import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const liethoaDir = path.join(__dirname, 'extracted_jars/liethoa');

function extractClassStrings(buf) {
    const strings = [];
    if (buf.length < 10 || buf.readUInt32BE(0) !== 0xCAFEBABE) return strings;
    const cpCount = buf.readUInt16BE(8);
    let offset = 10;
    const cpTags = [];
    const cpStrings = [];
    
    for (let i = 1; i < cpCount; i++) {
        if (offset >= buf.length) break;
        const tag = buf[offset++];
        cpTags[i] = tag;
        if (tag === 1) { // CONSTANT_Utf8
            const len = buf.readUInt16BE(offset); offset += 2;
            const strBuf = buf.slice(offset, offset + len); offset += len;
            try {
                const s = strBuf.toString('utf-8');
                cpStrings[i] = s;
                strings.push(s);
            } catch(e) {}
        } else if (tag === 3 || tag === 4) { // Integer, Float
            offset += 4;
        } else if (tag === 5 || tag === 6) { // Long, Double
            offset += 8;
            i++; // 8-byte constants take two entries
        } else if (tag === 7 || tag === 8) { // Class, String
            offset += 2;
        } else if (tag === 9 || tag === 10 || tag === 11 || tag === 12) { // Fieldref, Methodref, InterfaceMethodref, NameAndType
            offset += 4;
        } else {
            break;
        }
    }
    return strings;
}

const resourcesFound = new Set();
const vietnameseFound = [];

function scanClasses(dir) {
    for (const item of fs.readdirSync(dir)) {
        const p = path.join(dir, item);
        if (fs.statSync(p).isDirectory()) {
            scanClasses(p);
        } else if (p.endsWith('.class')) {
            const buf = fs.readFileSync(p);
            const strs = extractClassStrings(buf);
            for (const s of strs) {
                if (s.startsWith('/') || s.includes('.bin') || s.includes('.dat') || s.includes('.d') || s.includes('.ui') || s.includes('.png')) {
                    resourcesFound.add(s);
                }
                if (/[àáạảãâầấậẩẫăằắặẳẵèéẹẻẽêềếệểễìíịỉĩòóọỏõôồốộổỗơờớợởỡùúụủũưừứựửữỳýỵỷỹđ]/i.test(s)) {
                    vietnameseFound.push({ file: path.relative(liethoaDir, p), str: s });
                }
            }
        }
    }
}

scanClasses(liethoaDir);
console.log('=== RESOURCES REFERENCED IN LIETHOA CLASSES ===');
console.log(Array.from(resourcesFound));

console.log(`\n=== VIETNAMESE STRINGS IN LIETHOA CLASSES (${vietnameseFound.length}) ===`);
vietnameseFound.slice(0, 30).forEach(x => console.log(`[${x.file}] ${x.str}`));
