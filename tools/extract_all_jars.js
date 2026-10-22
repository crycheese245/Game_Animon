import fs from 'fs';
import path from 'path';
import { execSync } from 'child_process';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const JAR_FILES = [
    { name: 'cauvong', file: 'vuong-quoc-sung-cau-vong_240x320.jar' },
    { name: 'liethoa', file: 'vuong-quoc-sung-vat-6-liet-hoa_320x240.jar' },
    { name: 'lienthu', file: 'vuong-quoc-sung-vat-lien-thu-chien-ky_240x320.jar' },
    { name: 'thanthu', file: 'vuong-quoc-sung-vat-than-thu-dai-luc_240x320.jar' },
    { name: 'thegioimoi', file: 'vuong-quoc-sung-vat-the-gioi-moi_240x320.jar' }
];

const BASE_JAR_DIR = 'F:\\WorkSpace\\WebPojects\\GameAnimon';
const OUT_BASE = path.join(__dirname, 'extracted_jars');

if (!fs.existsSync(OUT_BASE)) {
    fs.mkdirSync(OUT_BASE, { recursive: true });
}

for (const item of JAR_FILES) {
    const jarPath = path.join(BASE_JAR_DIR, item.file);
    const targetDir = path.join(OUT_BASE, item.name);

    if (!fs.existsSync(jarPath)) {
        console.warn(`[WARN] Không tìm thấy file: ${jarPath}`);
        continue;
    }

    if (!fs.existsSync(targetDir)) {
        fs.mkdirSync(targetDir, { recursive: true });
    }

    console.log(`Đang giải nén: ${item.file} -> ${targetDir}...`);
    try {
        execSync(`tar -xf "${jarPath}" -C "${targetDir}"`, { stdio: 'inherit' });
        console.log(`=> Giải nén thành công: ${item.name}`);
    } catch (err) {
        console.error(`Lỗi giải nén ${item.file}:`, err.message);
    }
}

console.log('Hoàn tất giải nén toàn bộ 5 JARs!');
