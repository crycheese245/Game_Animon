import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const liethoaDir = path.join(__dirname, 'extracted_jars/liethoa');

function findStrings(buf, minLen = 4) {
    const strs = [];
    let cur = [];
    for (let i = 0; i < buf.length; i++) {
        const b = buf[i];
        if ((b >= 32 && b <= 126) || b >= 160) {
            cur.push(b);
        } else {
            if (cur.length >= minLen) {
                try {
                    const s = Buffer.from(cur).toString('utf-8');
                    if (s.trim().length >= minLen && !/^[\x20-\x2f\x3a-\x40]+$/.test(s)) {
                        strs.push(s.trim());
                    }
                } catch(e) {}
            }
            cur = [];
        }
    }
    return strs;
}

console.log('=== KHẢO SÁT DỮ LIỆU LIETHOA ===');
function scanDir(dir) {
    for (const item of fs.readdirSync(dir)) {
        const p = path.join(dir, item);
        const stat = fs.statSync(p);
        if (stat.isDirectory()) {
            scanDir(p);
        } else {
            const rel = path.relative(liethoaDir, p);
            if (p.endsWith('.class') || p.endsWith('.png') || p.endsWith('.mid')) continue;
            const buf = fs.readFileSync(p);
            const plainStrs = findStrings(buf, 4);
            const vietnameseStrs = plainStrs.filter(s => /[àáạảãâầấậẩẫăằắặẳẵèéẹẻẽêềếệểễìíịỉĩòóọỏõôồốộổỗơờớợởỡùúụủũưừứựửữỳýỵỷỹđ]/i.test(s));
            if (vietnameseStrs.length > 0) {
                console.log(`[VIETNAMESE STRINGS] ${rel} (${buf.length}b): ${vietnameseStrs.length} strings`);
                console.log('  Samples:', vietnameseStrs.slice(0, 5));
            } else if (plainStrs.length > 20 && buf.length > 500) {
                console.log(`[DATA] ${rel} (${buf.length}b): ${plainStrs.length} strings`);
                console.log('  Samples:', plainStrs.slice(0, 5));
            }
        }
    }
}

scanDir(liethoaDir);
