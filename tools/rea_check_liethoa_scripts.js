import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const scriptDir = path.join(__dirname, 'extracted_jars/liethoa/data/script');
if (fs.existsSync(scriptDir)) {
    for (const f of fs.readdirSync(scriptDir)) {
        const p = path.join(scriptDir, f);
        const stat = fs.statSync(p);
        const buf = fs.readFileSync(p);
        console.log(`File: ${f} (${stat.size} bytes)`);
        // Check if starts with MIDI header "MThd"
        const isMidi = buf.length > 4 && buf.toString('ascii', 0, 4) === 'MThd';
        console.log(`  Is genuine MIDI? ${isMidi}`);
        if (!isMidi) {
            console.log(`  First 16 bytes:`, buf.slice(0, 16));
        }
    }
}
