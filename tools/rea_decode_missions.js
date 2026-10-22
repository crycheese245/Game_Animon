import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const JAR_DIR = path.join(__dirname, 'jar_extracted', 'data');

function decodeByte2D(buf) {
    let c = 2; // skip short header
    const rows = buf[c++];
    const res = [];
    for (let r = 0; r < rows; r++) {
        const cols = buf[c++];
        const row = [];
        for (let col = 0; col < cols; col++) {
            row.push(buf[c++]);
        }
        res.push(row);
    }
    return res;
}
function decodeStringBuffer2D(buf) {
    let c = 2; // skip first 2-byte short header
    const numRows = buf[c++];
    const results = [];
    for (let r = 0; r < numRows; r++) {
        const numCols = buf[c++];
        const cols = [];
        for (let col = 0; col < numCols; col++) {
            const charCount = buf[c++];
            let str = '';
            for (let i = 0; i < charCount; i++) {
                const code = (buf[c] << 8) | (buf[c + 1] & 0xff);
                c += 2;
                str += String.fromCharCode(code);
            }
            cols.push(str);
        }
        results.push(cols);
    }
    return results;
}

try {
    const m0 = decodeStringBuffer2D(fs.readFileSync(path.join(JAR_DIR, 'mission0.t')));
    console.log(`\n=== MISSION0.T (Total Main Quests: ${m0.length}) ===`);
    m0.slice(0, 15).forEach((q, idx) => {
        console.log(`[Q${idx}] ${q[0]}`);
        console.log(`       -> ${q[1]}\n`);
    });

    const m1 = decodeStringBuffer2D(fs.readFileSync(path.join(JAR_DIR, 'mission1.t')));
    console.log(`\n=== MISSION1.T (Total Side Quests: ${m1.length}) ===`);
    m1.slice(0, 15).forEach((q, idx) => {
        console.log(`[Side Q${idx}] ${q[0]}`);
        console.log(`       -> ${q[1]}\n`);
    });

    const boss = decodeByte2D(fs.readFileSync(path.join(JAR_DIR, 'boss.d')));
    console.log(`\n=== BOSS.D (Total Bosses: ${boss.length}) ===`);
    boss.slice(0, 10).forEach((b, idx) => {
        console.log(`[Boss ${idx}] Monster ID: ${b[0]}, Skill 1: ${b[1]}, Skill 2: ${b[2]}, Skill 3: ${b[3]}`);
    });

    const box = decodeByte2D(fs.readFileSync(path.join(JAR_DIR, 'box.d')));
    console.log(`\n=== BOX.D (Breeding/Incubator Tables: ${box.length} rows) ===`);
    box.forEach((b, idx) => {
        console.log(`[Box Row ${idx}]`, b);
    });

    const itemM = decodeByte2D(fs.readFileSync(path.join(JAR_DIR, 'item_m.d')));
    console.log(`\n=== ITEM_M.D (Item Icon Sprites: ${itemM.length} rows) ===`);
    itemM.slice(0, 5).forEach((row, idx) => {
        console.log(`[Item Frame ${idx}]`, row);
    });

} catch (err) {
    console.error('Error during decode:', err);
}
