import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const EXTRACTED_DIR = path.join(__dirname, 'extracted_jars');
const folders = fs.readdirSync(EXTRACTED_DIR);

console.log('=== DANH SÁCH THƯ MỤC JAR ĐÃ GIẢI NÉN ===');
for (const folder of folders) {
    const fullPath = path.join(EXTRACTED_DIR, folder);
    if (!fs.statSync(fullPath).isDirectory()) continue;
    
    console.log(`\n-----------------------------------------`);
    console.log(`JAR: [${folder}]`);
    console.log(`-----------------------------------------`);
    
    // Tìm các file data, bin, d, dat, txt
    const files = [];
    function walk(dir, rel = '') {
        for (const item of fs.readdirSync(dir)) {
            const itemPath = path.join(dir, item);
            const itemRel = rel ? `${rel}/${item}` : item;
            const stat = fs.statSync(itemPath);
            if (stat.isDirectory()) {
                if (!item.startsWith('.')) walk(itemPath, itemRel);
            } else {
                files.push({ rel: itemRel, size: stat.size });
            }
        }
    }
    walk(fullPath);
    
    const dataFiles = files.filter(f => !f.rel.endsWith('.class') && !f.rel.endsWith('.png') && !f.rel.endsWith('.mid') && !f.rel.endsWith('.wav'));
    console.log(`Tổng số files: ${files.length}. File dữ liệu (${dataFiles.length}):`);
    dataFiles.slice(0, 30).forEach(f => console.log(`  - ${f.rel} (${f.size} bytes)`));
    if (dataFiles.length > 30) console.log(`  ... và ${dataFiles.length - 30} files khác`);
}
