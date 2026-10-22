import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const EXTRACTED_DIR = path.join(__dirname, 'extracted_jars');

function inspectBinaryStrings(buf, minLen = 3) {
    const strings = [];
    let cur = [];
    for (let i = 0; i < buf.length; i++) {
        const b = buf[i];
        // UTF-8 printable or Vietnamese characters
        if ((b >= 32 && b <= 126) || b >= 160) {
            cur.push(b);
        } else {
            if (cur.length >= minLen) {
                try {
                    const str = Buffer.from(cur).toString('utf-8');
                    if (str.trim().length >= minLen && !/^[\x20-\x2f\x3a-\x40]+$/.test(str)) {
                        strings.push(str.trim());
                    }
                } catch (e) {}
            }
            cur = [];
        }
    }
    return strings;
}

console.log('=== KHẢO SÁT SKILL.BIN & PETDATA.BIN TRONG CÁC BẢN GAME ===');

for (const game of ['thegioimoi', 'thanthu', 'lienthu']) {
    console.log(`\n================= [${game.toUpperCase()}] =================`);
    const skillPath = path.join(EXTRACTED_DIR, game, 'bin/skill.bin');
    const petPath = path.join(EXTRACTED_DIR, game, 'bin/petdata.bin');

    if (fs.existsSync(skillPath)) {
        const buf = fs.readFileSync(skillPath);
        console.log(`[skill.bin] Kích thước: ${buf.length} bytes`);
        const strs = inspectBinaryStrings(buf, 3);
        console.log(`Tìm thấy ${strs.length} chuỗi trong skill.bin:`);
        console.log(strs.slice(0, 30));
    } else {
        console.log(`[skill.bin] Không tồn tại`);
    }

    if (fs.existsSync(petPath)) {
        const buf = fs.readFileSync(petPath);
        console.log(`[petdata.bin] Kích thước: ${buf.length} bytes`);
        const strs = inspectBinaryStrings(buf, 3);
        console.log(`Tìm thấy ${strs.length} chuỗi trong petdata.bin:`);
        console.log(strs.slice(0, 30));
    } else {
        console.log(`[petdata.bin] Không tồn tại`);
    }
}
