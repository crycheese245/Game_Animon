import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const EXTRACTED_DIR = path.join(__dirname, 'extracted_jars');

for (const folder of ['cauvong', 'liethoa', 'lienthu', 'thanthu', 'thegioimoi']) {
    const fullPath = path.join(EXTRACTED_DIR, folder);
    console.log(`\n=========================================`);
    console.log(`ANALYZING: ${folder}`);
    console.log(`=========================================`);
    
    // Tìm các file chứa chuỗi tiếng Việt hoặc dữ liệu game
    function findInterestingFiles(dir) {
        let results = [];
        for (const item of fs.readdirSync(dir)) {
            const p = path.join(dir, item);
            const stat = fs.statSync(p);
            if (stat.isDirectory()) {
                results = results.concat(findInterestingFiles(p));
            } else {
                const ext = path.extname(item).toLowerCase();
                const name = item.toLowerCase();
                if (ext === '.bin' || ext === '.dat' || ext === '.data' || ext === '.d' || ext === '.txt' || ext === '.t' || ext === '.m' || !ext) {
                    results.push({ path: p, rel: path.relative(fullPath, p), size: stat.size });
                }
            }
        }
        return results;
    }
    
    const interesting = findInterestingFiles(fullPath);
    console.log(`Found ${interesting.length} data/binary files. Key files:`);
    interesting
        .filter(f => f.size > 200 && !f.rel.includes('map/m') && !f.rel.includes('npc0/') && !f.rel.includes('npc2/'))
        .forEach(f => console.log(`  ${f.rel} (${f.size} bytes)`));
}
