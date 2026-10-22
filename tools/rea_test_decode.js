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
    return out;
}

for (const game of ['thegioimoi', 'thanthu', 'lienthu']) {
    console.log(`\n================= DECODING [${game.toUpperCase()}] =================`);
    const skillPath = path.join(EXTRACTED_DIR, game, 'bin/skill.bin');
    if (fs.existsSync(skillPath)) {
        const raw = fs.readFileSync(skillPath);
        const dec = decodeCeasar7(raw);
        console.log(`[skill.bin] First 300 bytes decoded as string:`);
        console.log(dec.slice(0, 300).toString('utf-8'));
    }

    const petPath = path.join(EXTRACTED_DIR, game, 'bin/petdata.bin');
    if (fs.existsSync(petPath)) {
        const raw = fs.readFileSync(petPath);
        const dec = decodeCeasar7(raw);
        console.log(`[petdata.bin] First 300 bytes decoded as string:`);
        console.log(dec.slice(0, 300).toString('utf-8'));
    }
}
