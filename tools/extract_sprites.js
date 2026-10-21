import fs from 'fs';
import path from 'path';

function parseSprite(dataPath) {
    const buf = fs.readFileSync(dataPath);
    let offset = 4;
    const numModules = buf.readUInt16BE(2);
    const modules = [];
    for (let i = 0; i < numModules; i++) {
        const tag = buf.readUInt16BE(offset); offset += 2;
        const x = buf.readUInt16BE(offset); offset += 2;
        const y = buf.readUInt16BE(offset); offset += 2;
        const w = buf.readUInt16BE(offset); offset += 2;
        const h = buf.readUInt16BE(offset); offset += 2;
        modules.push([x, y, w, h]);
    }
    const numFrames = buf.readUInt16BE(offset); offset += 2;
    const frames = [];
    for (let f = 0; f < numFrames; f++) {
        const numSub = buf.readUInt16BE(offset); offset += 2;
        const parts = [];
        let minX = Infinity, minY = Infinity, maxX = -Infinity, maxY = -Infinity;
        for (let p = 0; p < numSub; p++) {
            const tag = buf.readUInt16BE(offset); offset += 2;
            const modId = buf.readUInt16BE(offset); offset += 2;
            const ox = buf.readInt16BE(offset); offset += 2;
            const oy = buf.readInt16BE(offset); offset += 2;
            const flags = buf.readUInt16BE(offset); offset += 2;
            const mod = modules[modId];
            if (mod) {
                const w = (flags === 5 || flags === 7 || flags === 2 || flags === 4) ? mod[3] : mod[2];
                const h = (flags === 5 || flags === 7 || flags === 2 || flags === 4) ? mod[2] : mod[3];
                minX = Math.min(minX, ox);
                minY = Math.min(minY, oy);
                maxX = Math.max(maxX, ox + w);
                maxY = Math.max(maxY, oy + h);
            }
            parts.push([modId, ox, oy, flags]);
        }
        frames.push({
            parts,
            bbox: {
                minX: isFinite(minX) ? minX : 0,
                minY: isFinite(minY) ? minY : 0,
                maxX: isFinite(maxX) ? maxX : 0,
                maxY: isFinite(maxY) ? maxY : 0,
                w: isFinite(maxX - minX) ? maxX - minX : 0,
                h: isFinite(maxY - minY) ? maxY - minY : 0
            }
        });
    }
    const numAnims = buf.readUInt16BE(offset); offset += 2;
    const anims = [];
    for (let a = 0; a < numAnims; a++) {
        const numAnimFrames = buf.readUInt16BE(offset); offset += 2;
        const animFrames = [];
        for (let af = 0; af < numAnimFrames; af++) {
            const frameId = buf.readUInt16BE(offset); offset += 2;
            const delay = buf.readUInt16BE(offset); offset += 2;
            animFrames.push([frameId, delay]);
        }
        anims.push(animFrames);
    }
    return { modules, frames, anims };
}

const baseDir = 'E:/WorkSpace/Projects/TrichXuatFileJar/vuong-quoc-sung-cau-vong_240x320/data';
const spritesToExtract = [
    // Battle Sủng Vật (s0 - s5)
    { key: 's0', name: 'Viêm Hỏa Khuyển', data: path.join(baseDir, 'battle/s0.data'), png: path.join(baseDir, 'battle/s0.png') },
    { key: 's1', name: 'Lam Thủy Kình', data: path.join(baseDir, 'battle/s1.data'), png: path.join(baseDir, 'battle/s1.png') },
    { key: 's2', name: 'Thanh Mộc Long', data: path.join(baseDir, 'battle/s2.data'), png: path.join(baseDir, 'battle/s2.png') },
    { key: 's3', name: 'Lôi Lân Thú', data: path.join(baseDir, 'battle/s3.data'), png: path.join(baseDir, 'battle/s3.png') },
    { key: 's4', name: 'Băng Băng Điêu', data: path.join(baseDir, 'battle/s4.data'), png: path.join(baseDir, 'battle/s4.png') },
    { key: 's5', name: 'Thần Thú Cổ Đại', data: path.join(baseDir, 'battle/s5.data'), png: path.join(baseDir, 'battle/s5.png') },

    // Boss & NPC Chiến Đấu (r0 - r5)
    { key: 'r0', name: 'Thiên Sứ Sa Ngã', data: path.join(baseDir, 'npc1/r0.data'), png: path.join(baseDir, 'npc1/r0.png') },
    { key: 'r1', name: 'Hắc Ám Ma Nữ', data: path.join(baseDir, 'npc1/r1.data'), png: path.join(baseDir, 'npc1/r1.png') },
    { key: 'r2', name: 'Long Kỵ Sĩ', data: path.join(baseDir, 'npc1/r2.data'), png: path.join(baseDir, 'npc1/r2.png') },
    { key: 'r3', name: 'Kiếm Thánh Hoàng Kim', data: path.join(baseDir, 'npc1/r3.data'), png: path.join(baseDir, 'npc1/r3.png') },
    { key: 'r4', name: 'Cuồng Đao Ma Tộc', data: path.join(baseDir, 'npc1/r4.data'), png: path.join(baseDir, 'npc1/r4.png') },
    { key: 'r5', name: 'Băng Tuyết Tiên Nữ', data: path.join(baseDir, 'npc1/r5.data'), png: path.join(baseDir, 'npc1/r5.png') }
];

const allSpritesData = {};

for (const spr of spritesToExtract) {
    if (fs.existsSync(spr.data) && fs.existsSync(spr.png)) {
        console.log(`Parsing ${spr.key} (${spr.name})...`);
        const parsed = parseSprite(spr.data);
        allSpritesData[spr.key] = parsed;

        // Copy PNG to client/img/monsters and img/monsters
        const destClient = `client/img/monsters/${spr.key}.png`;
        const destRoot = `img/monsters/${spr.key}.png`;
        fs.copyFileSync(spr.png, destClient);
        fs.copyFileSync(spr.png, destRoot);
    } else {
        console.warn(`Missing: ${spr.data} or ${spr.png}`);
    }
}

const outContent = `// ========================================================
// DỮ LIỆU SPRITE & KHUNG HOẠT HỌA J2ME (AUTO-GENERATED)
// ========================================================
const J2ME_SPRITES_DATA = ${JSON.stringify(allSpritesData, null, 2)};

if (typeof window !== 'undefined') {
    window.J2ME_SPRITES_DATA = J2ME_SPRITES_DATA;
}
`;

fs.writeFileSync('client/js/data/sprites_data.js', outContent, 'utf-8');
fs.writeFileSync('js/data/sprites_data.js', outContent, 'utf-8');

console.log('✅ Generated client/js/data/sprites_data.js and js/data/sprites_data.js successfully!');

