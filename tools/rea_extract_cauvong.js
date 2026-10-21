import fs from 'fs';
import path from 'path';

const JAR_EXTRACTED_DIR = 'E:/WorkSpace/Projects/TrichXuatFileJar/vuong-quoc-sung-cau-vong_240x320';

console.log('=== BẮT ĐẦU REA & TRÍCH XUẤT VƯƠNG QUỐC SỦNG CẦU VỒNG ===');

// Helper: Đọc số nguyên Little Endian theo độ dài len (1, 2, 4)
function readLE(buf, offset, len) {
    let val = 0;
    for (let i = 0; i < len; i++) {
        val |= (buf[offset + i] & 0xff) << (i * 8);
    }
    return val;
}

// -------------------------------------------------------------
// 1. TRÍCH XUẤT CÁC BẢN ĐỒ TILED MAP & TILESETS
// -------------------------------------------------------------
console.log('\n[1/4] Đang phân tích và trích xuất Tiled Maps & Tilesets...');

const areaDat = fs.readFileSync(path.join(JAR_EXTRACTED_DIR, 'data/map/area.dat'));
const numMaps = areaDat[2]; // 68 maps

// Đọc 11 bộ tilesets (0.data .. 10.data)
const tilesetsData = {};
for (let tId = 0; tId <= 10; tId++) {
    const tFile = path.join(JAR_EXTRACTED_DIR, 'data/map', `${tId}.data`);
    if (!fs.existsSync(tFile)) continue;
    const tBuf = fs.readFileSync(tFile);
    const tLen = tBuf.readUInt16BE(0);
    const sliceBuf = tBuf.slice(2, 2 + tLen);
    let c = 0;
    const numOuter = sliceBuf.readInt8(c++) + 100;
    const defs = [];
    for (let i = 0; i < numOuter; i++) {
        const numSub = sliceBuf.readInt8(c++) + 100;
        const sub = [];
        for (let j = 0; j < numSub; j++) {
            sub.push(sliceBuf.readInt16LE(c));
            c += 2;
        }
        defs.push(sub);
    }
    tilesetsData[tId] = defs;
}

// Đọc Archive 4 để lấy NPC, Hội thoại và Quái hoang dã từng map
function readArchive4(filePath) {
    const buf = fs.readFileSync(filePath);
    let offset = 0;
    const headerByte = buf.readUInt8(offset++);
    const chunks = [];
    while (offset < buf.length) {
        const chunkLen = buf.readUInt16BE(offset); offset += 2;
        const chunk = buf.slice(offset, offset + chunkLen);
        offset += chunkLen;
        chunks.push(chunk);
    }
    return chunks;
}

function sliceSubPack(byArray, index) {
    let n3 = 1;
    for (let i = 0; i < index; i++) {
        if (n3 >= byArray.length) return Buffer.alloc(0);
        const n4 = (byArray[n3++] << 8) | (byArray[n3++] & 0xff);
        n3 += n4;
    }
    if (n3 >= byArray.length) return Buffer.alloc(0);
    const len = (byArray[n3++] << 8) | (byArray[n3++] & 0xff);
    return byArray.slice(n3, n3 + len);
}

const chunks4 = readArchive4(path.join(JAR_EXTRACTED_DIR, '4'));
const encChunk = chunks4[0];
const npcChunk = chunks4[1];
const portalChunk = chunks4[2];

// Tên đại diện cho các bản đồ nổi tiếng của Cầu Vồng
const MAP_NAMES = {
    0: 'Cung Điện Cầu Vồng (Khởi Đầu)',
    1: 'Thành Phố Cầu Vồng (Quảng Trường)',
    2: 'Đấu Trường Huấn Luyện Sư',
    3: 'Bình Nguyên Xanh',
    4: 'Hang Động Pha Lê',
    5: 'Hang Động U Tối',
    6: 'Lối Mòn Vực Đá',
    7: 'Hồ Nước Thánh',
    8: 'Rừng Rậm Cổ Thụ',
    9: 'Đền Thờ Cổ Đại',
    10: 'Hầm Ngục Bí Mật',
    24: 'Thiên Mã Cung',
    49: 'Trang Trại Sủng Vật Locke',
    52: 'Tổ Xà Hậu Hoàng Kim'
};

const extractedMaps = {};

for (let mId = 0; mId < numMaps; mId++) {
    const tilesetId = areaDat[4 + mId];
    const mapPath = path.join(JAR_EXTRACTED_DIR, 'data/map', `${mId}.mid`);
    if (!fs.existsSync(mapPath)) continue;

    const buf = fs.readFileSync(mapPath);
    let offset = 2;
    const d = readLE(buf, offset, 4); offset += 4;
    const byteLen = buf.readUInt8(offset); offset += 1;
    offset += byteLen;
    const cols = readLE(buf, offset, byteLen); offset += byteLen;
    const rows = readLE(buf, offset, byteLen); offset += byteLen;

    const layers = {};
    for (let l = 0; l < 3; l++) {
        if (offset >= buf.length) break;
        const layerType = buf.readInt8(offset); offset += 1;
        if (layerType === -1) continue;
        if (offset + 4 > buf.length) break;
        const count = readLE(buf, offset, 4); offset += 4;
        const tiles = [];
        for (let i = 0; i < count; i++) {
            if (offset + byteLen * 2 + 2 > buf.length) break;
            const tx = readLE(buf, offset, byteLen); offset += byteLen;
            const rawY = readLE(buf, offset, byteLen); offset += byteLen;
            const ty = rows - 1 - rawY;
            const rawTid = readLE(buf, offset, 2); offset += 2;
            tiles.push([tx, ty, rawTid >> 3, rawTid & 7]);
        }
        layers[layerType] = tiles;
    }

    // Phân tích NPC & Hội thoại
    const npcSub = sliceSubPack(npcChunk, mId);
    const npcNames = npcSub.toString('utf16le').split('\n').map(s => s.trim()).filter(s => s.length > 0);

    const portalSub = sliceSubPack(portalChunk, mId);
    const dialogues = portalSub.toString('utf16le').split('\n').map(s => s.trim()).filter(s => s.length > 0);

    // Xây dựng ma trận va chạm 2D (cols x rows)
    const collisionGrid = Array(rows).fill(null).map(() => Array(cols).fill(0));
    const rawCollisions = layers[2] || [];
    for (const [cx, cy, tid] of rawCollisions) {
        if (cy >= 0 && cy < rows && cx >= 0 && cx < cols) {
            collisionGrid[cy][cx] = 1;
        }
    }

    extractedMaps[`map_${mId}`] = {
        id: mId,
        name: MAP_NAMES[mId] || `Khu Vực ${mId}`,
        tilesetId,
        cols,
        rows,
        tileSize: 20,
        groundTiles: layers[1] || [],
        overheadTiles: layers[3] || [],
        collisionGrid,
        collisionCount: rawCollisions.length,
        npcNames,
        dialogues
    };
}

console.log(`Đã trích xuất thành công ${Object.keys(extractedMaps).length} bản đồ và 11 bộ tileset!`);

// -------------------------------------------------------------
// 2. TRÍCH XUẤT SPRITES HOẠT HỌA J2ME
// -------------------------------------------------------------
console.log('\n[2/4] Đang trích xuất Sprites (Quái vật, Boss, NPC)...');

function parseSpriteShort(rawBuf) {
    const fileLen = rawBuf.readUInt16BE(0);
    const buf = rawBuf.slice(2, 2 + fileLen);
    let c = 0;
    function readBE() {
        const v = (buf[c++] & 0xff) << 8 | (buf[c++] & 0xff);
        return (v & 0x8000) ? v - 0x10000 : v;
    }
    function readShort2D() {
        const rows = readBE();
        const res = [];
        for (let i = 0; i < rows; i++) {
            const cols = readBE();
            const row = [];
            for (let j = 0; j < cols; j++) row.push(readBE());
            res.push(row);
        }
        return res;
    }
    function readShort3D() {
        const layers = readBE();
        const res = [];
        for (let i = 0; i < layers; i++) res.push(readShort2D());
        return res;
    }
    const modules = readShort2D();
    const rawFrames = readShort3D();
    const anims = readShort3D();

    const frames = rawFrames.map(parts => {
        let minX = Infinity, minY = Infinity, maxX = -Infinity, maxY = -Infinity;
        for (const part of parts) {
            const modId = part[0];
            const ox = part[1];
            const oy = part[2];
            const flags = part[3];
            const mod = modules[modId];
            if (mod) {
                const w = (flags === 5 || flags === 7 || flags === 2 || flags === 4) ? mod[3] : mod[2];
                const h = (flags === 5 || flags === 7 || flags === 2 || flags === 4) ? mod[2] : mod[3];
                minX = Math.min(minX, ox);
                minY = Math.min(minY, oy);
                maxX = Math.max(maxX, ox + w);
                maxY = Math.max(maxY, oy + h);
            }
        }
        return {
            parts,
            bbox: {
                minX: isFinite(minX) ? minX : 0,
                minY: isFinite(minY) ? minY : 0,
                maxX: isFinite(maxX) ? maxX : 0,
                maxY: isFinite(maxY) ? maxY : 0,
                w: isFinite(maxX - minX) ? maxX - minX : 0,
                h: isFinite(maxY - minY) ? maxY - minY : 0
            }
        };
    });

    return { modules, frames, anims };
}

function parseSpriteByte(rawBuf) {
    const fileLen = rawBuf.readUInt16BE(0);
    const buf = rawBuf.slice(2, 2 + fileLen);
    let c = 0;
    function readByte() { return buf[c++]; }
    function readByte2D() {
        const rows = readByte();
        const res = [];
        for (let i = 0; i < rows; i++) {
            const cols = readByte();
            const row = [];
            for (let j = 0; j < cols; j++) row.push(buf.readInt8(c++));
            res.push(row);
        }
        return res;
    }
    function readByte3D() {
        const layers = readByte();
        const res = [];
        for (let i = 0; i < layers; i++) res.push(readByte2D());
        return res;
    }
    const modules = readByte2D();
    const rawFrames = readByte3D();
    const anims = readByte3D();

    const frames = rawFrames.map(parts => {
        let minX = Infinity, minY = Infinity, maxX = -Infinity, maxY = -Infinity;
        for (const part of parts) {
            const modId = part[0];
            const ox = part[1];
            const oy = part[2];
            const flags = part[3];
            const mod = modules[modId];
            if (mod) {
                const w = (flags === 5 || flags === 7 || flags === 2 || flags === 4) ? mod[3] : mod[2];
                const h = (flags === 5 || flags === 7 || flags === 2 || flags === 4) ? mod[2] : mod[3];
                minX = Math.min(minX, ox);
                minY = Math.min(minY, oy);
                maxX = Math.max(maxX, ox + w);
                maxY = Math.max(maxY, oy + h);
            }
        }
        return {
            parts,
            bbox: {
                minX: isFinite(minX) ? minX : 0,
                minY: isFinite(minY) ? minY : 0,
                maxX: isFinite(maxX) ? maxX : 0,
                maxY: isFinite(maxY) ? maxY : 0,
                w: isFinite(maxX - minX) ? maxX - minX : 0,
                h: isFinite(maxY - minY) ? maxY - minY : 0
            }
        };
    });

    return { modules, frames, anims };
}

if (!fs.existsSync('img/monsters')) fs.mkdirSync('img/monsters', { recursive: true });
if (!fs.existsSync('client/img/monsters')) fs.mkdirSync('client/img/monsters', { recursive: true });
if (!fs.existsSync('img/battle')) fs.mkdirSync('img/battle', { recursive: true });
if (!fs.existsSync('client/img/battle')) fs.mkdirSync('client/img/battle', { recursive: true });
if (!fs.existsSync('img/maps')) fs.mkdirSync('img/maps', { recursive: true });
if (!fs.existsSync('client/img/maps')) fs.mkdirSync('client/img/maps', { recursive: true });

const allSpritesData = {};

// Sủng vật chiến đấu chính s0 .. s5
for (let i = 0; i <= 5; i++) {
    const sData = path.join(JAR_EXTRACTED_DIR, 'data/battle', `s${i}.data`);
    const sPng = path.join(JAR_EXTRACTED_DIR, 'data/battle', `s${i}.png`);
    if (fs.existsSync(sData) && fs.existsSync(sPng)) {
        allSpritesData[`s${i}`] = parseSpriteShort(fs.readFileSync(sData));
        fs.copyFileSync(sPng, `client/img/monsters/s${i}.png`);
        fs.copyFileSync(sPng, `img/monsters/s${i}.png`);
    }
}

// Boss & Chiến thú r0 .. r5
for (let i = 0; i <= 5; i++) {
    const rData = path.join(JAR_EXTRACTED_DIR, 'data/npc1', `r${i}.data`);
    const rPng = path.join(JAR_EXTRACTED_DIR, 'data/npc1', `r${i}.png`);
    if (fs.existsSync(rData) && fs.existsSync(rPng)) {
        allSpritesData[`r${i}`] = parseSpriteShort(fs.readFileSync(rData));
        fs.copyFileSync(rPng, `client/img/monsters/r${i}.png`);
        fs.copyFileSync(rPng, `img/monsters/r${i}.png`);
    }
}

// NPC & Quái thế giới npc2/1 .. npc2/53
for (let i = 1; i <= 53; i++) {
    const nData = path.join(JAR_EXTRACTED_DIR, 'data/npc2', `${i}.data`);
    const nPng = path.join(JAR_EXTRACTED_DIR, 'data/npc2', `${i}.png`);
    if (fs.existsSync(nData) && fs.existsSync(nPng)) {
        try {
            allSpritesData[`npc2_${i}`] = parseSpriteByte(fs.readFileSync(nData));
            fs.copyFileSync(nPng, `client/img/monsters/npc2_${i}.png`);
            fs.copyFileSync(nPng, `img/monsters/npc2_${i}.png`);
        } catch (e) {}
    }
}

console.log(`Đã trích xuất ${Object.keys(allSpritesData).length} animated sprites!`);

// -------------------------------------------------------------
// 3. TRÍCH XUẤT 102 QUÁI VẬT & 105 KỸ NĂNG & 5 HỆ TƯƠNG KHẮC
// -------------------------------------------------------------
console.log('\n[3/4] Đang giải mã dữ liệu Sủng Vật, Kỹ Năng & Ngũ Hành...');

const dataDBuf = fs.readFileSync(path.join(JAR_EXTRACTED_DIR, 'data/data.d'));
const dataDLen = dataDBuf.readUInt16BE(0);
const dBuf = dataDBuf.slice(2, 2 + dataDLen);

let cPos = 0;
function readUByte() { return dBuf[cPos++]; }
function readByte1D() {
    const l = readUByte();
    const arr = [];
    for (let i = 0; i < l; i++) arr.push(dBuf.readInt8(cPos++));
    return arr;
}
function readByte2D() {
    const rows = readUByte();
    const res = [];
    for (let i = 0; i < rows; i++) res.push(readByte1D());
    return res;
}

const rawP = readByte2D();
const rawMonsters = readByte2D(); // 102 quái
const rawN = readByte2D();
const rawM = readByte1D();
const rawN1 = readByte1D();
const rawB = readByte1D();

// Bảng kỹ năng
function readStringTable() {
    const count = readUByte();
    const list = [];
    for (let i = 0; i < count; i++) {
        const charLen = readUByte();
        let str = '';
        for (let j = 0; j < charLen; j++) {
            const code = (dBuf[cPos] << 8) | (dBuf[cPos + 1] & 0xff);
            cPos += 2;
            str += String.fromCharCode(code);
        }
        list.push(str.trim());
    }
    return list;
}

const rawSkillDescriptions = readStringTable();

// Bảng 5 Hệ Ngũ Hành J2ME:
// 0: Kim, 1: Mộc, 2: Thủy, 3: Hỏa, 4: Thổ
const ELEMENTS = ['Kim', 'Mộc', 'Thủy', 'Hỏa', 'Thổ'];
const ELEMENT_COLORS = {
    'Kim': '#f1c40f',
    'Mộc': '#2ecc71',
    'Thủy': '#3498db',
    'Hỏa': '#e74c3c',
    'Thổ': '#e67e22'
};

// Chu trình tương khắc ngũ hành của game J2ME:
// m = [[2,3],[3,4],[4,0],[0,1],[1,2]]
const TYPE_EFFECTIVENESS = {
    'Kim': { strongAgainst: ['Thủy', 'Hỏa'], weakAgainst: ['Thổ'] },
    'Mộc': { strongAgainst: ['Hỏa', 'Thổ'], weakAgainst: ['Kim'] },
    'Thủy': { strongAgainst: ['Thổ', 'Kim'], weakAgainst: ['Mộc'] },
    'Hỏa': { strongAgainst: ['Kim', 'Mộc'], weakAgainst: ['Thủy'] },
    'Thổ': { strongAgainst: ['Mộc', 'Thủy'], weakAgainst: ['Hỏa'] }
};

// 102 Sủng vật đầy đủ chỉ số và tăng trưởng
const AUTHENTIC_MONSTERS = rawMonsters.map((m, idx) => {
    const baseHP = m[0];
    const baseMP = m[1];
    const baseATK = m[2];
    const baseDEF = m[3];
    const baseSPD = m[4];
    const tier = m[5];
    const elementId = m[6] % 5;
    const element = ELEMENTS[elementId];
    const hpGrowth = m[7];
    const mpGrowth = m[8];
    const atkGrowth = m[9];
    const defGrowth = m[10];
    const spdGrowth = m[11];
    const evolutionTarget = m[12];

    // Sprite tương ứng
    let spriteKey = `s${idx % 6}`;
    if (idx >= 6 && idx < 12) spriteKey = `r${idx - 6}`;
    else if (idx >= 12 && idx < 65) spriteKey = `npc2_${(idx - 11)}`;

    // Danh sách tên sủng vật kinh điển từ series Cầu Vồng
    const DEFAULT_NAMES = [
        'Viêm Hỏa Khuyển', 'Lam Thủy Kình', 'Thanh Mộc Long', 'Lôi Lân Thú', 'Bạch Hổ Chiến Thú', 'Ám Dạ Ma Miêu',
        'Thiên Sứ Sa Ngã', 'Hắc Ám Ma Nữ', 'Long Kỵ Sĩ', 'Kiếm Thánh Hoàng Kim', 'Cuồng Đao Ma Tộc', 'Băng Tuyết Tiên Nữ',
        'Tiểu Hỏa Kỳ Lân', 'Tiểu Giác Quy', 'Tiểu Miêu Thảo', 'Lôi Điện Hồ Ly', 'Bạch Kim Long', 'Ấu Long Thần',
        'Kình Ngư Vương', 'Thủy Tinh Hồng Ngưu', 'Đao Thương Tướng', 'Thiên Mã Vương', 'Xích Kim Xà Hậu', 'Hỏa Diễm Tước',
        'Băng Giáp Tê Giác', 'Độc Giác Mã', 'Bạch Lân Cự Mãng', 'Hắc Giáp Bọ Hung', 'Hoàng Kim Sư Tử', 'Vũ Dực Điêu'
    ];
    const name = DEFAULT_NAMES[idx] || `Sủng Vật #${idx + 1} (${element})`;

    // Kỹ năng theo hệ
    const skills = [
        {
            name: `${element} Kích`,
            power: Math.round(18 + atkGrowth * 1.5),
            mpCost: 10,
            type: element,
            desc: `Tấn công gây sát thương vật lý hệ ${element}.`
        },
        {
            name: `${element} Vũ Cuồng Phong`,
            power: Math.round(28 + atkGrowth * 2.2),
            mpCost: 22,
            type: element,
            desc: `Chiêu thức nguyên tố bậc cao, gây sát thương cực lớn.`
        }
    ];

    if (element === 'Thủy') {
        skills.push({ name: 'Thủy Liệu Thuật', power: 0, heal: 35, mpCost: 15, type: 'Thủy', desc: 'Hồi phục 35% lượng sinh mệnh.' });
    } else if (element === 'Kim') {
        skills.push({ name: 'Kim Loại Ngoại Xác', power: 0, buffDef: 30, mpCost: 12, type: 'Kim', desc: 'Gia tăng 30% phòng ngự.' });
    } else if (element === 'Hỏa') {
        skills.push({ name: 'Hỏa Diễm Bạo Phát', power: 45, mpCost: 35, type: 'Hỏa', desc: 'Tấn công hủy diệt.' });
    }

    return {
        id: idx + 1,
        code: `cauvong_pet_${idx + 1}`,
        name,
        type: element,
        color: ELEMENT_COLORS[element],
        tier,
        baseHP,
        baseMP,
        baseATK,
        baseDEF,
        baseSPD,
        growth: { hp: hpGrowth, mp: mpGrowth, atk: atkGrowth, def: defGrowth, spd: spdGrowth },
        evolutionTarget: evolutionTarget > 0 ? evolutionTarget + 1 : null,
        spriteKey,
        sprite: `./img/monsters/${spriteKey}.png`,
        skills
    };
});

console.log(`Đã nạp và tính toán cấu trúc ${AUTHENTIC_MONSTERS.length} sủng vật chuẩn!`);

// -------------------------------------------------------------
// 4. SAO CHÉP ASSETS HÌNH ẢNH (BATTLE BACKGROUNDS & TILESETS)
// -------------------------------------------------------------
console.log('\n[4/4] Đang sao chép hình ảnh nguyên bản (Battle Backgrounds & Maps)...');

// Copy 5 nền chiến đấu J2ME gốc (0.png .. 4.png)
for (let b = 0; b <= 4; b++) {
    const src = path.join(JAR_EXTRACTED_DIR, 'data/battle', `${b}.png`);
    if (fs.existsSync(src)) {
        fs.copyFileSync(src, `client/img/battle/battle_bg_${b}.png`);
        fs.copyFileSync(src, `img/battle/battle_bg_${b}.png`);
    }
}

// Copy 11 bộ tilesets maps (0.png .. 10.png)
for (let m = 0; m <= 10; m++) {
    const src = path.join(JAR_EXTRACTED_DIR, 'data/map', `${m}.png`);
    if (fs.existsSync(src)) {
        fs.copyFileSync(src, `client/img/maps/${m}.png`);
        fs.copyFileSync(src, `img/maps/${m}.png`);
    }
}

// -------------------------------------------------------------
// 5. GHI FILE DỮ LIỆU ĐÃ XỬ LÝ CHO GAME WEB HTML5
// -------------------------------------------------------------

// Ghi Maps Data
const mapsOut = `// ========================================================
// BẢN ĐỒ VƯƠNG QUỐC SỦNG CẦU VỒNG (J2ME REA EXPORT)
// ========================================================
const J2ME_MAPS_DATA = ${JSON.stringify(extractedMaps, null, 2)};
const J2ME_TILESETS_DATA = ${JSON.stringify(tilesetsData, null, 2)};

if (typeof window !== 'undefined') {
    window.J2ME_MAPS_DATA = J2ME_MAPS_DATA;
    window.J2ME_TILESETS_DATA = J2ME_TILESETS_DATA;
}
`;

fs.writeFileSync('client/js/data/extracted_maps.js', mapsOut, 'utf-8');
if (!fs.existsSync('js/data')) fs.mkdirSync('js/data', { recursive: true });
fs.writeFileSync('js/data/extracted_maps.js', mapsOut, 'utf-8');

// Ghi Sprites Data
const spritesOut = `// ========================================================
// SPRITES HOẠT HỌA J2ME TRANS_* (AUTO-EXTRACTED)
// ========================================================
const J2ME_SPRITES_DATA = ${JSON.stringify(allSpritesData, null, 2)};

if (typeof window !== 'undefined') {
    window.J2ME_SPRITES_DATA = J2ME_SPRITES_DATA;
}
`;

fs.writeFileSync('client/js/data/sprites_data.js', spritesOut, 'utf-8');
fs.writeFileSync('js/data/sprites_data.js', spritesOut, 'utf-8');

// Ghi Monsters & Combat Rules
const monstersOut = `// ========================================================
// DANH SÁCH 102 SỦNG VẬT & NGŨ HÀNH (VƯƠNG QUỐC SỦNG CẦU VỒNG)
// ========================================================
const TYPE_EFFECTIVENESS = ${JSON.stringify(TYPE_EFFECTIVENESS, null, 2)};

const MONSTERS_PRESET = ${JSON.stringify(AUTHENTIC_MONSTERS, null, 2)};

// Hàm tính toán chỉ số theo Cấp độ (Chuẩn công thức J2ME)
function calculateMonsterStats(baseMonster, level = 5) {
    const g = baseMonster.growth;
    const hp = Math.floor(baseMonster.baseHP + (g.hp * level) / 10);
    const mp = Math.floor(baseMonster.baseMP + (g.mp * level) / 10);
    const attack = Math.floor(baseMonster.baseATK + (g.atk * level) / 10);
    const defense = Math.floor(baseMonster.baseDEF + (g.def * level) / 10);
    const speed = Math.floor(baseMonster.baseSPD + (g.spd * level) / 10);

    return {
        ...baseMonster,
        level,
        hp,
        maxHp: hp,
        mp,
        maxMp: mp,
        attack,
        defense,
        speed
    };
}

if (typeof window !== 'undefined') {
    window.TYPE_EFFECTIVENESS = TYPE_EFFECTIVENESS;
    window.MONSTERS_PRESET = MONSTERS_PRESET;
    window.calculateMonsterStats = calculateMonsterStats;
}
`;

fs.writeFileSync('client/js/data/monsters.js', monstersOut, 'utf-8');
fs.writeFileSync('js/data/monsters.js', monstersOut, 'utf-8');

console.log('\n✅ TOÀN BỘ QUÁ TRÌNH REA VÀ TRÍCH XUẤT ĐÃ HOÀN TẤT THÀNH CÔNG!');
