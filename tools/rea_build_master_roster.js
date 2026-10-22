import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const EXTRACTED_DIR = path.join(__dirname, 'extracted_jars');

function decodeCeasar7(buf) {
    const out = Buffer.alloc(buf.length);
    for (let i = 0; i < buf.length; i++) out[i] = (buf[i] - 7) & 0xff;
    return out.toString('utf-8');
}

console.log('=== XÂY DỰNG MASTER PET & SKILL ROSTER TỪ CẢ 5 JAR J2ME ===');

// 1. Đọc dữ liệu từ Cau Vong
let cauvongMonsters = [];
let cauvongSkills = [];
try {
    const monstersJsPath = path.resolve('client/js/data/monsters.js');
    if (fs.existsSync(monstersJsPath)) {
        const content = fs.readFileSync(monstersJsPath, 'utf-8');
        const matchM = content.match(/const MONSTERS_PRESET = (\[[\s\S]*?\]);\r?\n\r?\nconst SKILLS_PRESET/);
        const matchS = content.match(/const SKILLS_PRESET = (\[[\s\S]*?\]);\r?\n\r?\n\/\/ Hàm tính toán/);
        if (matchM && matchS) {
            cauvongMonsters = JSON.parse(matchM[1]);
            cauvongSkills = JSON.parse(matchS[1]);
            console.log(`Cau Vong: Nạp ${cauvongMonsters.length} sủng vật, ${cauvongSkills.length} kỹ năng hiện có.`);
        }
    }
} catch(e) {
    console.error('Lỗi nạp monsters.js:', e.message);
}

// 2. Đọc Liệt Hỏa chs.mid
const liethoaPets = [];
const liethoaSkills = [];
try {
    const chsBuf = fs.readFileSync(path.join(EXTRACTED_DIR, 'liethoa/data/script/chs.mid'));
    let pos = 2;
    const strings = [];
    while (pos < chsBuf.length - 3) {
        if (chsBuf[pos] === 0x00 && chsBuf[pos+1] === 0x01) {
            pos += 2;
            const len = chsBuf[pos++];
            if (pos + len*2 <= chsBuf.length) {
                let str = '';
                for (let c = 0; c < len; c++) {
                    str += String.fromCharCode(chsBuf.readUInt16BE(pos));
                    pos += 2;
                }
                strings.push(str.trim());
            } else { pos++; }
        } else { pos++; }
    }
    // Sủng vật liệt hỏa: index 10 đến 109
    for (let i = 10; i <= 109; i++) {
        if (strings[i] && strings[i].length > 1) {
            liethoaPets.push(strings[i]);
        }
    }
    // Chiêu thức liệt hỏa: index 117 đến 186
    for (let i = 117; i <= 186; i++) {
        if (strings[i] && strings[i].length > 1) {
            liethoaSkills.push(strings[i]);
        }
    }
    console.log(`Liệt Hỏa: Nạp ${liethoaPets.length} sủng vật, ${liethoaSkills.length} kỹ năng.`);
} catch(e) {
    console.error('Lỗi đọc Liệt Hỏa:', e.message);
}

// 3. Đọc Thế Giới Mới
const thegioimoiPets = [];
const thegioimoiSkills = [];
try {
    const petText = decodeCeasar7(fs.readFileSync(path.join(EXTRACTED_DIR, 'thegioimoi/bin/petdata.bin')));
    const lines = petText.split('\n').filter(l => l.trim().length > 0 && !l.startsWith('stardata') && !/^[0-9| ]+$/.test(l));
    for (const l of lines) {
        const parts = l.split('\t');
        if (parts[0] && parts[0].length > 1 && isNaN(Number(parts[0]))) {
            thegioimoiPets.push({
                name: parts[0].trim(),
                tier: parseInt(parts[1]) || 5,
                learnStr: parts[13] || ''
            });
        }
    }
    const skillText = decodeCeasar7(fs.readFileSync(path.join(EXTRACTED_DIR, 'thegioimoi/bin/skill.bin')));
    const sLines = skillText.split('\n').filter(l => l.trim().length > 0 && !l.startsWith('skill:'));
    for (const l of sLines) {
        const parts = l.split('\t');
        if (parts[1]) thegioimoiSkills.push({ id: parts[0], name: parts[1].trim(), desc: parts[parts.length-1]?.trim() });
    }
    console.log(`Thế Giới Mới: Nạp ${thegioimoiPets.length} sủng vật, ${thegioimoiSkills.length} kỹ năng.`);
} catch(e) {
    console.error('Lỗi đọc Thế Giới Mới:', e.message);
}

// 4. Đọc Liên Thú Chiến Kỷ
const lienthuPets = [];
const lienthuSkills = [];
try {
    const petText = decodeCeasar7(fs.readFileSync(path.join(EXTRACTED_DIR, 'lienthu/bin/petdata.bin')));
    const lines = petText.split('\n').filter(l => l.trim().length > 0 && !l.startsWith('stardata') && !/^[0-9| ]+$/.test(l));
    for (const l of lines) {
        const parts = l.split('\t');
        if (parts[0] && parts[0].length > 1 && isNaN(Number(parts[0]))) {
            lienthuPets.push({
                name: parts[0].trim(),
                tier: parts[1] || '3',
                skills: parts[13] || ''
            });
        }
    }
    const skillText = decodeCeasar7(fs.readFileSync(path.join(EXTRACTED_DIR, 'lienthu/bin/skill.bin')));
    const sLines = skillText.split('\n').filter(l => l.trim().length > 0 && !l.startsWith('skill:'));
    for (const l of sLines) {
        const parts = l.split('\t');
        if (parts[1]) lienthuSkills.push({ id: parts[0], name: parts[1].trim(), desc: parts[parts.length-1]?.trim() });
    }
    console.log(`Liên Thú: Nạp ${lienthuPets.length} sủng vật, ${lienthuSkills.length} kỹ năng.`);
} catch(e) {
    console.error('Lỗi đọc Liên Thú:', e.message);
}

// 5. Đọc Thần Thú Đại Lục
const thanthuPets = [];
const thanthuSkills = [];
try {
    const petText = decodeCeasar7(fs.readFileSync(path.join(EXTRACTED_DIR, 'thanthu/bin/petdata.bin')));
    const lines = petText.split('\n').filter(l => l.trim().length > 0 && !l.startsWith('stardata') && !/^[0-9| ]+$/.test(l));
    for (const l of lines) {
        const parts = l.split('\t');
        if (parts[0] && parts[0].length > 1 && isNaN(Number(parts[0]))) {
            thanthuPets.push({
                name: parts[0].trim(),
                tier: parseInt(parts[1]) || 4,
                skills: parts[13] || ''
            });
        }
    }
    const skillText = decodeCeasar7(fs.readFileSync(path.join(EXTRACTED_DIR, 'thanthu/bin/skill.bin')));
    const sLines = skillText.split('\n').filter(l => l.trim().length > 0 && !l.startsWith('skill:'));
    for (const l of sLines) {
        const parts = l.split('\t');
        if (parts[1]) thanthuSkills.push({ id: parts[0], name: parts[1].trim(), desc: parts[parts.length-1]?.trim() });
    }
    console.log(`Thần Thú: Nạp ${thanthuPets.length} sủng vật, ${thanthuSkills.length} kỹ năng.`);
} catch(e) {
    console.error('Lỗi đọc Thần Thú:', e.message);
}

console.log('\n=> TẤT CẢ DỮ LIỆU ĐÃ SẴN SÀNG ĐỂ TỔNG HỢP VÀO MASTER ROSTER!');
