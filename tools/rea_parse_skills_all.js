import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const EXTRACTED_DIR = path.join(__dirname, 'extracted_jars');

function decodeCeasar7(buf) {
    const out = Buffer.alloc(buf.length);
    for (let i = 0; i < buf.length; i++) {
        out[i] = (buf[i] - 7) & 0xff;
    }
    return out.toString('utf-8');
}

for (const game of ['thegioimoi', 'thanthu', 'lienthu']) {
    const skillPath = path.join(EXTRACTED_DIR, game, 'bin/skill.bin');
    if (!fs.existsSync(skillPath)) continue;
    const text = decodeCeasar7(fs.readFileSync(skillPath));
    const lines = text.split(/\r?\n/).filter(l => l.trim().length > 0 && !l.startsWith('skill:'));
    console.log(`\n================== ${game.toUpperCase()} (${lines.length} SKILLS) ==================`);
    lines.slice(0, 15).forEach(l => {
        const parts = l.split('\t');
        console.log(`ID: ${parts[0]} | Tên: [${parts[1]}] | Mô tả: ${parts[parts.length - 1]?.slice(0, 70)}...`);
    });
}
