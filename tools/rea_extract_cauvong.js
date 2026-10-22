import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Đường dẫn thư mục JAR trích xuất (Ưu tiên tools/jar_extracted trong workspace)
let JAR_EXTRACTED_DIR = path.join(__dirname, 'jar_extracted');
if (!fs.existsSync(JAR_EXTRACTED_DIR)) {
    JAR_EXTRACTED_DIR = path.resolve('tools/jar_extracted');
}

console.log('=== BẮT ĐẦU REA & TRÍCH XUẤT CHUẨN VƯƠNG QUỐC SỦNG CẦU VỒNG ===');
console.log('Thư mục dữ liệu JAR:', JAR_EXTRACTED_DIR);

if (!fs.existsSync(JAR_EXTRACTED_DIR)) {
    console.error('LỖI: Không tìm thấy thư mục dữ liệu JAR:', JAR_EXTRACTED_DIR);
    process.exit(1);
}

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

let areaDat = null;
let numMaps = 0;
let mapToTileset = [];
const areaDatPath = path.join(JAR_EXTRACTED_DIR, 'data/map/area.dat');
if (fs.existsSync(areaDatPath)) {
    areaDat = fs.readFileSync(areaDatPath);
    const dataLen = areaDat.readUInt16BE(0);
    const data = areaDat.slice(2, 2 + dataLen);
    let c = 0;
    numMaps = data[c++]; // 68 maps
    mapToTileset = [];
    for (let i = 0; i < numMaps; i++) {
        mapToTileset.push(data[c++]);
    }
}

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
    if (!fs.existsSync(filePath)) return [[], [], []];
    const buf = fs.readFileSync(filePath);
    let offset = 0;
    offset++; // headerByte
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
    if (!byArray || byArray.length === 0) return Buffer.alloc(0);
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
const npcChunk = chunks4[1] || Buffer.alloc(0);
const portalChunk = chunks4[2] || Buffer.alloc(0);

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
    const tilesetId = mapToTileset[mId] !== undefined ? mapToTileset[mId] : 0;
    const mapPath = path.join(JAR_EXTRACTED_DIR, 'data/map', `${mId}.mid`);
    if (!fs.existsSync(mapPath)) continue;

    const buf = fs.readFileSync(mapPath);
    let offset = 2;
    readLE(buf, offset, 4); offset += 4;
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

    const npcSub = sliceSubPack(npcChunk, mId);
    const npcNames = npcSub.toString('utf16le').split('\n').map(s => s.trim()).filter(s => s.length > 0);

    const portalSub = sliceSubPack(portalChunk, mId);
    const dialogues = portalSub.toString('utf16le').split('\n').map(s => s.trim()).filter(s => s.length > 0);

    const collisionGrid = Array(rows).fill(null).map(() => Array(cols).fill(0));
    const rawCollisions = layers[2] || [];
    for (const [cx, cy] of rawCollisions) {
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

console.log(`Đã trích xuất ${Object.keys(extractedMaps).length} bản đồ và 11 bộ tileset!`);

// -------------------------------------------------------------
// 2. PARSER SPRITES HOẠT HỌA J2ME CHUẨN JVM
// -------------------------------------------------------------
console.log('\n[2/4] Đang trích xuất Sprites Hoạt họa J2ME...');

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

const targetDirs = [
    'img/monsters', 'client/img/monsters',
    'img/battle', 'client/img/battle',
    'img/maps', 'client/img/maps'
];
targetDirs.forEach(d => {
    if (!fs.existsSync(d)) fs.mkdirSync(d, { recursive: true });
});

// -------------------------------------------------------------
// 3. GIẢI MÃ MASTER DATABASE `data/data.d` & `data/book.d`
// -------------------------------------------------------------
console.log('\n[3/4] Đang giải mã Master Database data.d & Pokedex book.d...');

const rawDataD = fs.readFileSync(path.join(JAR_EXTRACTED_DIR, 'data/data.d'));
const dBuf = rawDataD.slice(2);
let cPos = 0;

function readUByte() { return dBuf[cPos++]; }
function read1DBytes() {
    const l = readUByte();
    const arr = [];
    for (let i = 0; i < l; i++) arr.push(dBuf.readInt8(cPos++));
    return arr;
}
function read2DBytes() {
    const rows = readUByte();
    const res = [];
    for (let i = 0; i < rows; i++) res.push(read1DBytes());
    return res;
}
function readStringArray() {
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

// Bảng dữ liệu theo đúng JVM Bytecode ak.j()
const p_2d = read2DBytes();
const rawMonStats = read2DBytes(); // 102 quái vật
const rawSkillStats = read2DBytes(); // 49 kỹ năng stats
const skillCategories = readStringArray(); // 49 skill categories
const skillNames = readStringArray(); // 49 tên chiêu thức chuẩn
const elementNames = readStringArray(); // 5 Hệ chuẩn: Thực Vật, Kim Loại, Phi Hành, Mãnh Thú, Hải Dương
const monsterNames = readStringArray(); // 102 tên sủng vật chuẩn
const itemDescriptions = readStringArray(); // 70 mô tả vật phẩm
const itemNames = readStringArray(); // 70 tên vật phẩm chuẩn
const mapNamesFromData = readStringArray(); // 82 tên map
const talentNames = readStringArray(); // 13 thiên phú
const talentDescriptions = readStringArray(); // 13 mô tả thiên phú
const rawEvolutions = read2DBytes(); // 102 điều kiện tiến hóa
const rawSpriteMapping = read2DBytes(); // 102 sprite mapping: [spriteId, variantId]
const rawSkillLearnsets = read2DBytes(); // 102 kỹ năng học được
const monsterDescriptions = readStringArray(); // 102 mô tả sủng vật
const a_1d = read1DBytes();
const u_1d = read1DBytes();
const e_1d = read1DBytes();
const v_1d = read1DBytes(); // Danh sách spriteId dùng định dạng SHORT (16-bit)
const at_b = read2DBytes();
const g_2d = read2DBytes();

console.log(`Đã giải mã thành công Master Database:
- ${monsterNames.length} sủng vật chính thức
- ${skillNames.length} chiêu thức chính thức
- ${elementNames.length} hệ ngũ hành chuẩn: ${elementNames.join(', ')}
- ${itemNames.length} vật phẩm chính thức`);

// Đọc Pokedex book.d (Phân loại 5 Hệ)
const rawBook = fs.readFileSync(path.join(JAR_EXTRACTED_DIR, 'data/book.d'));
const bookBuf = rawBook.slice(2);
let bc = 0;
const bookRows = bookBuf[bc++];
const bookGroups = [];
for (let r = 0; r < bookRows; r++) {
    const len = bookBuf[bc++];
    const row = [];
    for (let i = 0; i < len; i++) row.push(bookBuf.readInt8(bc++));
    bookGroups.push(row);
}

// Map monsterId -> Type Index (0: Thực Vật, 1: Kim Loại, 2: Phi Hành, 3: Mãnh Thú, 4: Hải Dương)
const monsterTypeMap = {};
bookGroups.forEach((group, typeIdx) => {
    group.forEach(monId => {
        monsterTypeMap[monId] = typeIdx;
    });
});

// Trích xuất tất cả Animated Sprites (Sử dụng đúng Byte/Short format từ v_1d)
const allSpritesData = {};

// Sủng vật quái thế giới (npc2/1 .. npc2/53)
for (let i = 1; i <= 53; i++) {
    const nData = path.join(JAR_EXTRACTED_DIR, 'data/npc2', `${i}.data`);
    const nPng = path.join(JAR_EXTRACTED_DIR, 'data/npc2', `${i}.png`);
    if (fs.existsSync(nData) && fs.existsSync(nPng)) {
        try {
            const isShort = v_1d.includes(i);
            const parsed = isShort ? parseSpriteShort(fs.readFileSync(nData)) : parseSpriteByte(fs.readFileSync(nData));
            allSpritesData[`npc2_${i}`] = parsed;
            fs.copyFileSync(nPng, `client/img/monsters/npc2_${i}.png`);
            fs.copyFileSync(nPng, `img/monsters/npc2_${i}.png`);
        } catch (e) {
            console.error(`Lỗi phân tích sprite npc2_${i}:`, e.message);
        }
    }
}

// Battle VFX s0 .. s5
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

// Nhân vật chính: Hoàng tử (player_male: 0.data + 0.png) và Công chúa (player_female: 3.data + 3.png)
const maleData = path.join(JAR_EXTRACTED_DIR, 'data/npc0', '0.data');
const malePng = path.join(JAR_EXTRACTED_DIR, 'data/npc0', '0.png');
if (fs.existsSync(maleData) && fs.existsSync(malePng)) {
    allSpritesData['player_male'] = parseSpriteByte(fs.readFileSync(maleData));
    fs.copyFileSync(malePng, 'client/img/monsters/player_male.png');
    fs.copyFileSync(malePng, 'img/monsters/player_male.png');
}

const femaleData = path.join(JAR_EXTRACTED_DIR, 'data/npc0', '3.data');
const femalePng = path.join(JAR_EXTRACTED_DIR, 'data/npc0', '3.png');
if (fs.existsSync(femaleData) && fs.existsSync(femalePng)) {
    allSpritesData['player_female'] = parseSpriteByte(fs.readFileSync(femaleData));
    fs.copyFileSync(femalePng, 'client/img/monsters/player_female.png');
    fs.copyFileSync(femalePng, 'img/monsters/player_female.png');
}

// NPC Trưởng Làng (npc_elder: 5.data + 5.png)
const elderData = path.join(JAR_EXTRACTED_DIR, 'data/npc0', '5.data');
const elderPng = path.join(JAR_EXTRACTED_DIR, 'data/npc0', '5.png');
if (fs.existsSync(elderData) && fs.existsSync(elderPng)) {
    allSpritesData['npc_elder'] = parseSpriteByte(fs.readFileSync(elderData));
    fs.copyFileSync(elderPng, 'client/img/monsters/npc_elder.png');
    fs.copyFileSync(elderPng, 'img/monsters/npc_elder.png');
}

// NPC Huấn Luyện Sư (npc_trainer: 2.data + 2.png)
const trainerData = path.join(JAR_EXTRACTED_DIR, 'data/npc0', '2.data');
const trainerPng = path.join(JAR_EXTRACTED_DIR, 'data/npc0', '2.png');
if (fs.existsSync(trainerData) && fs.existsSync(trainerPng)) {
    allSpritesData['npc_trainer'] = parseSpriteByte(fs.readFileSync(trainerData));
    fs.copyFileSync(trainerPng, 'client/img/monsters/npc_trainer.png');
    fs.copyFileSync(trainerPng, 'img/monsters/npc_trainer.png');
}

console.log(`Đã trích xuất ${Object.keys(allSpritesData).length} animated sprites hoàn chỉnh (kèm nhân vật chính & NPC)!`);

// -------------------------------------------------------------
// 4. BẢNG KỸ NĂNG CHUẨN (49 SKILLS)
// -------------------------------------------------------------
const AUTHENTIC_SKILLS = skillNames.map((name, idx) => {
    const stats = rawSkillStats[idx] || [15, 10, 4, 0];
    const power = stats[0] || 15;
    const mpCost = stats[1] || 10;
    const accuracy = 95;
    const category = skillCategories[idx] || '';

    let type = 'Đặc Biệt';
    if (idx >= 0 && idx <= 4) type = 'Thực Vật';
    else if (idx >= 5 && idx <= 9) type = 'Kim Loại';
    else if (idx >= 10 && idx <= 14) type = 'Phi Hành';
    else if (idx >= 15 && idx <= 19) type = 'Mãnh Thú';
    else if (idx >= 20 && idx <= 24) type = 'Hải Dương';
    else if (idx === 27 || idx === 28) type = 'Hồi Phục';
    else if (idx === 33) type = 'Phòng Ngự';

    return {
        id: idx,
        name,
        category,
        type,
        power,
        mpCost,
        accuracy,
        heal: idx === 27 ? 70 : (idx === 28 ? 200 : 0),
        buffDef: idx === 33 ? 30 : 0
    };
});

// Chu trình tương khắc 5 Hệ chính thức của Vương Quốc Sủng Cầu Vồng:
// Thực Vật -> Phi Hành -> Hải Dương -> Kim Loại -> Mãnh Thú -> Thực Vật
const TYPE_EFFECTIVENESS = {
    'Thực Vật': { strongAgainst: ['Phi Hành'], weakAgainst: ['Mãnh Thú'] },
    'Phi Hành': { strongAgainst: ['Hải Dương'], weakAgainst: ['Thực Vật'] },
    'Hải Dương': { strongAgainst: ['Kim Loại'], weakAgainst: ['Phi Hành'] },
    'Kim Loại': { strongAgainst: ['Mãnh Thú'], weakAgainst: ['Hải Dương'] },
    'Mãnh Thú': { strongAgainst: ['Thực Vật'], weakAgainst: ['Kim Loại'] }
};

const ELEMENT_COLORS = {
    'Thực Vật': '#27ae60',
    'Kim Loại': '#f39c12',
    'Phi Hành': '#9b59b6',
    'Mãnh Thú': '#e74c3c',
    'Hải Dương': '#2980b9'
};

// -------------------------------------------------------------
// 5. DANH SÁCH 102 SỦNG VẬT CHÍNH THỨC
// -------------------------------------------------------------
const AUTHENTIC_MONSTERS = monsterNames.map((name, idx) => {
    const m = rawMonStats[idx] || [32, 80, 12, 10, 12, 1, 0, 38, 15, 8, 6, 8];
    const baseHP = m[0];
    const baseMP = m[1];
    const baseATK = m[2];
    const baseDEF = m[3];
    const baseSPD = m[4];
    const tier = m[5];

    // Xác định Hệ từ Pokedex book.d
    const typeId = (monsterTypeMap[idx] !== undefined) ? monsterTypeMap[idx] : (m[6] % 5);
    const element = elementNames[typeId] ? elementNames[typeId].replace(' hệ', '') : 'Thực Vật';

    const hpGrowth = m[7] || 35;
    const mpGrowth = m[8] || 15;
    const atkGrowth = m[9] || 8;
    const defGrowth = m[10] || 6;
    const spdGrowth = m[11] || 8;

    // Sprite thực tế trong npc2
    const spriteMapping = rawSpriteMapping[idx] || [1, 0];
    const spriteNum = spriteMapping[0] || 1;
    const spriteVariant = spriteMapping[1] || 0;
    const spriteKey = `npc2_${spriteNum}`;

    // Kỹ năng học được từ data.d kết hợp hệ thống 4 skill chuẩn theo từng lớp sủng vật
    const CLASS_SKILL_IDS = {
        'Thực Vật': [0, 1, 3, 4],
        'Kim Loại': [5, 6, 8, 9],
        'Phi Hành': [10, 11, 13, 14],
        'Mãnh Thú': [15, 16, 18, 19],
        'Hải Dương': [20, 21, 23, 24]
    };
    const rawSkills = rawSkillLearnsets[idx] || [];
    const skills = rawSkills.filter(sId => sId >= 0 && sId < AUTHENTIC_SKILLS.length).map(sId => AUTHENTIC_SKILLS[sId]);

    // Đảm bảo mỗi sủng vật sở hữu trọn vẹn 4 kỹ năng thuộc tính tương ứng lớp
    const classPool = (CLASS_SKILL_IDS[element] || CLASS_SKILL_IDS['Thực Vật']).map(sId => AUTHENTIC_SKILLS[sId]);
    const existingSkillNames = new Set(skills.map(s => s.name));
    for (const poolSkill of classPool) {
        if (skills.length >= 4) break;
        if (!existingSkillNames.has(poolSkill.name)) {
            skills.push(poolSkill);
            existingSkillNames.add(poolSkill.name);
        }
    }
    while (skills.length > 4) {
        skills.pop();
    }

    return {
        id: idx + 1,
        code: `cauvong_pet_${idx + 1}`,
        name,
        type: element,
        color: ELEMENT_COLORS[element] || '#3498db',
        tier,
        baseHP,
        baseMP,
        baseATK,
        baseDEF,
        baseSPD,
        growth: { hp: hpGrowth, mp: mpGrowth, atk: atkGrowth, def: defGrowth, spd: spdGrowth },
        spriteNum,
        spriteVariant,
        spriteKey,
        sprite: `./img/monsters/${spriteKey}.png`,
        description: monsterDescriptions[idx] || '',
        evolution: rawEvolutions[idx] || [],
        skills
    };
});

console.log(`Đã nạp và cấu trúc thành công toàn bộ ${AUTHENTIC_MONSTERS.length} sủng vật chuẩn!`);

// -------------------------------------------------------------
// 6. SAO CHÉP HÌNH ẢNH NỀN CHIẾN ĐẤU & TILESETS
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
        if (fs.existsSync('dist/client/img/maps')) {
            fs.copyFileSync(src, `dist/client/img/maps/${m}.png`);
        }
    }
}

// -------------------------------------------------------------
// 7. GHI TOÀN BỘ FILE DỮ LIỆU ĐÃ XỬ LÝ CHO GAME WEB
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
if (fs.existsSync('dist/client/js/data')) {
    fs.writeFileSync('dist/client/js/data/extracted_maps.js', mapsOut, 'utf-8');
}

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

const SKILLS_PRESET = ${JSON.stringify(AUTHENTIC_SKILLS, null, 2)};

// Hàm tính toán chỉ số theo Cấp độ (Chuẩn công thức J2ME: Base + (Growth * Level) / 10)
function calculateMonsterStats(baseMonster, level = 5) {
    const g = baseMonster.growth || { hp: 35, mp: 15, atk: 8, def: 6, spd: 8 };
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
    window.SKILLS_PRESET = SKILLS_PRESET;
    window.calculateMonsterStats = calculateMonsterStats;
}
`;
fs.writeFileSync('client/js/data/monsters.js', monstersOut, 'utf-8');
fs.writeFileSync('js/data/monsters.js', monstersOut, 'utf-8');

// Ghi cho server backend
if (!fs.existsSync('server/data')) fs.mkdirSync('server/data', { recursive: true });
fs.writeFileSync('server/data/monsters.json', JSON.stringify({
    monsters: AUTHENTIC_MONSTERS,
    skills: AUTHENTIC_SKILLS,
    typeEffectiveness: TYPE_EFFECTIVENESS
}, null, 2), 'utf-8');

console.log('\n✅ TOÀN BỘ QUÁ TRÌNH REA VÀ TRÍCH XUẤT 102 SỦNG VẬT ĐÃ HOÀN TẤT THÀNH CÔNG!');
