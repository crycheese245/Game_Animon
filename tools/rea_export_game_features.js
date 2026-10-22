import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const JAR_DIR = path.join(__dirname, 'jar_extracted');

console.log('=== BẮT ĐẦU TRÍCH XUẤT TÍNH NĂNG CHUẨN REA CHO GAME ANIMON ===');

// 1. Đọc data.d
const rawDataD = fs.readFileSync(path.join(JAR_DIR, 'data/data.d'));
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

read2DBytes(); // p_2d
const rawMonStats = read2DBytes();
const rawSkillStats = read2DBytes();
const skillCategories = readStringArray();
const skillNames = readStringArray();
const elementNames = readStringArray();
const monsterNames = readStringArray();
const itemDescriptions = readStringArray();
const itemNames = readStringArray();
const mapNames = readStringArray();
const talentNames = readStringArray();
const talentDesc = readStringArray();
const rawHabitats = read2DBytes(); // rawEvolutions: habitats/sources
const rawSpriteMapping = read2DBytes();
const rawEvolutionRecipes = read2DBytes(); // evolution recipes
const monsterDescriptions = readStringArray();

// 2. Đọc shop.d để lấy giá và gian hàng chuẩn
const shopBuf = fs.readFileSync(path.join(JAR_DIR, 'data/shop.d'));
let sPos = 2;
const numShops = shopBuf[sPos++];
const shopItemLists = [];
for (let s = 0; s < numShops; s++) {
    const count = shopBuf[sPos++];
    const items = [];
    for (let i = 0; i < count; i++) items.push(shopBuf[sPos++]);
    shopItemLists.push(items);
}
const numPriceRows = shopBuf[sPos++];
const priceTables = [];
for (let r = 0; r < numPriceRows; r++) {
    const count = shopBuf[sPos++];
    const prices = [];
    for (let i = 0; i < count; i++) {
        prices.push(shopBuf.readInt16LE(sPos));
        sPos += 2;
    }
    priceTables.push(prices);
}

// 3. Đọc book.d (Phân loại 5 Hệ)
const rawBook = fs.readFileSync(path.join(JAR_DIR, 'data/book.d'));
const bBuf = rawBook.slice(2);
let bc = 0;
const bookRows = bBuf[bc++];
const bookGroups = [];
for (let r = 0; r < bookRows; r++) {
    const len = bBuf[bc++];
    const row = [];
    for (let i = 0; i < len; i++) row.push(bBuf.readInt8(bc++));
    bookGroups.push(row);
}
const monsterTypeMap = {};
bookGroups.forEach((group, typeIdx) => {
    group.forEach(monId => {
        monsterTypeMap[monId] = typeIdx;
    });
});

// 4. Xây dựng 70 Items chuẩn
const ITEM_ICONS = {
    recovery: ['🧪', '🍪', '🍫', '🔷', '💠', '🌰', '🍬', '💖', '💊'],
    ball: ['🔴', '🔵', '🟣'],
    stone: ['🔥', '🦁', '🍃', '🍒', '💧', '🪸', '🌪️', '🪶', '⚡', '🪙', '☄️', '🪵', '💎', '🐋', '👑', '⚔️'],
    key: ['📦', '🗝️', '🔮'],
    skill: ['📖', '📜', '✨', '⚡', '🛡️', '⚔️'],
    egg: ['🥚']
};

const ITEMS_DATA = {};
itemNames.forEach((name, idx) => {
    const desc = itemDescriptions[idx] || '';
    let category = 'misc';
    let icon = '📦';
    let effect = {};
    const officialPrice = (priceTables[0] && priceTables[0][idx] !== undefined) ? priceTables[0][idx] : 100;

    if (idx >= 0 && idx <= 8) {
        category = 'recovery';
        icon = ITEM_ICONS.recovery[idx] || '🧪';
        if (idx === 0) effect = { healHpPercent: 35 };
        else if (idx === 1) effect = { healHpPercent: 65 };
        else if (idx === 2) effect = { healHpPercent: 100 };
        else if (idx === 3) effect = { healMpPercent: 50 };
        else if (idx === 4) effect = { healMpPercent: 100 };
        else if (idx === 5) effect = { healHpPercent: 35, healMpPercent: 35 };
        else if (idx === 6) effect = { healHpPercent: 100, healMpPercent: 100 };
        else if (idx === 7) effect = { revivePercent: 30 };
        else if (idx === 8) effect = { cureStatus: true };
    } else if (idx >= 9 && idx <= 11) {
        category = 'ball';
        icon = ITEM_ICONS.ball[idx - 9] || '🔴';
        effect = { catchRate: idx === 9 ? 1.0 : (idx === 10 ? 1.8 : 99.0) };
    } else if (idx >= 12 && idx <= 15) {
        category = 'support';
        icon = idx === 12 || idx === 13 ? '🍯' : '💨';
        effect = { loyalty: idx === 12 ? 25 : (idx === 13 ? 100 : 0), repel: idx === 14 ? 100 : (idx === 15 ? 300 : 0) };
    } else if (idx >= 16 && idx <= 31) {
        category = 'stone';
        icon = ITEM_ICONS.stone[idx - 16] || '💎';
        effect = { isEvolutionMaterial: true, materialId: idx };
    } else if (idx >= 32 && idx <= 34) {
        category = 'key';
        icon = idx === 32 ? '📦' : (idx === 33 ? '🗝️' : '🔮');
    } else if (idx >= 35 && idx <= 57) {
        category = 'skill';
        icon = '📜';
        effect = { isSkillBook: true, bookIndex: idx - 35 };
    } else if (idx >= 58 && idx <= 69) {
        category = 'egg';
        icon = '🥚';
        effect = { isPetEgg: true };
    }

    const key = `item_${idx}`;
    ITEMS_DATA[key] = {
        id: idx,
        code: key,
        name,
        category,
        icon,
        price: officialPrice,
        sellPrice: Math.floor(officialPrice / 5) || 20,
        desc,
        effect
    };
});

// Thêm bí danh tương thích ngược (Legacy Aliases)
const LEGACY_ALIASES = {
    'potion': 'item_0',
    'superPotion': 'item_1',
    'chocolate': 'item_2',
    'ether': 'item_3',
    'elixir': 'item_6',
    'revive': 'item_7',
    'pokeballs': 'item_9',
    'greatBalls': 'item_10',
    'masterBalls': 'item_11',
    'leafStone': 'item_18',
    'waterStone': 'item_20',
    'fireStone': 'item_16',
    'thunderStone': 'item_22',
    'repel': 'item_14'
};
Object.entries(LEGACY_ALIASES).forEach(([alias, targetKey]) => {
    if (ITEMS_DATA[targetKey]) {
        ITEMS_DATA[alias] = { ...ITEMS_DATA[targetKey], id: alias, aliasTo: targetKey };
    }
});

// Danh mục gian hàng
const SHOP_CATALOG = {
    supplies: {
        id: 'supplies',
        name: 'Tiệm Tạp Hóa & Dược Phẩm',
        icon: '🧪',
        itemIds: shopItemLists[0] || [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 14, 12, 15, 33]
    },
    evolution: {
        id: 'evolution',
        name: 'Tiệm Đá Tiến Hóa Ngũ Hệ',
        icon: '💎',
        itemIds: shopItemLists[1] || [16, 17, 18, 19, 20, 21, 22, 23, 24, 25]
    },
    skills: {
        id: 'skills',
        name: 'Tiệm Bí Kíp Sách Kỹ Năng',
        icon: '📜',
        itemIds: shopItemLists[2] || [11, 36, 45, 48, 50, 51, 52, 53, 54, 55, 56, 37, 39, 40, 41, 42]
    }
};

// 5. Xây dựng 102 Pokedex & Evolution Data
const POKEDEX_DATA = [];
monsterNames.forEach((name, idx) => {
    const m = rawMonStats[idx] || [32, 80, 12, 10, 12, 1, 0, 38, 15, 8, 6, 8];
    const typeId = (monsterTypeMap[idx] !== undefined) ? monsterTypeMap[idx] : (m[6] % 5);
    const element = elementNames[typeId] ? elementNames[typeId].replace(' hệ', '') : 'Thực Vật';

    // Nguồn gốc sủng vật từ habitats
    const habs = rawHabitats[idx] || [];
    let sourceText = 'Chưa xác định';
    if (habs.length > 0) {
        const h0 = habs[0];
        if (h0 === -1) sourceText = 'Thưởng Nhiệm Vụ Cốt Truyện';
        else if (h0 === -2) sourceText = 'Chỉ có thể có qua Tiến Hóa';
        else if (h0 === -3) sourceText = 'Thu được qua Dị Hóa Bí Mật';
        else if (h0 === -4) sourceText = 'Chiến thắng Đấu Trường Huấn Luyện Sư';
        else if (h0 === -5) sourceText = 'Ấp Trứng Sủng Vật Thần Bí';
        else {
            const locNames = habs.filter(h => h >= 0 && mapNames[h]).map(h => mapNames[h]);
            sourceText = locNames.length > 0 ? `Bắt gặp tại: ${locNames.join(', ')}` : `Khu vực hoang dã Map ${h0}`;
        }
    }

    // Công thức tiến hóa
    const evoRecipe = rawEvolutionRecipes[idx] || [];
    let evolution = null;
    if (evoRecipe.length >= 4) {
        const targetIdx = evoRecipe[1];
        const reqItemIdx = evoRecipe[2];
        const reqQty = evoRecipe[3];
        if (targetIdx >= 0 && targetIdx < monsterNames.length) {
            evolution = {
                targetId: targetIdx + 1,
                targetCode: `cauvong_pet_${targetIdx + 1}`,
                targetName: monsterNames[targetIdx],
                reqItemId: reqItemIdx,
                reqItemCode: `item_${reqItemIdx}`,
                reqItemName: itemNames[reqItemIdx] || 'Đá Tiến Hóa',
                reqQty
            };
        }
    }

    const spriteMapping = rawSpriteMapping[idx] || [1, 0];
    const spriteNum = spriteMapping[0] || 1;
    const spriteKey = `npc2_${spriteNum}`;

    POKEDEX_DATA.push({
        id: idx + 1,
        code: `cauvong_pet_${idx + 1}`,
        name,
        type: element,
        tier: m[5] || 1,
        baseHP: m[0],
        baseMP: m[1],
        baseATK: m[2],
        baseDEF: m[3],
        baseSPD: m[4],
        growth: { hp: m[7] || 35, mp: m[8] || 15, atk: m[9] || 8, def: m[10] || 6, spd: m[11] || 8 },
        spriteKey,
        sprite: `./img/monsters/${spriteKey}.png`,
        description: monsterDescriptions[idx] || '',
        source: sourceText,
        evolution
    });
});

// Ghi file client/js/data/items.js
const itemsCode = `// ========================================================
// HỆ THỐNG VẬT PHẨM & CỬA HÀNG CHÍNH THỨC (J2ME REA EXPORT)
// 70 Vật Phẩm Chuẩn & 3 Gian Hàng Vương Quốc Cầu Vồng
// ========================================================

const ITEMS_CONFIG = ${JSON.stringify(ITEMS_DATA, null, 2)};

const SHOP_CATALOG = ${JSON.stringify(SHOP_CATALOG, null, 2)};

if (typeof window !== 'undefined') {
    window.ITEMS_CONFIG = ITEMS_CONFIG;
    window.SHOP_CATALOG = SHOP_CATALOG;
}
`;
fs.writeFileSync('client/js/data/items.js', itemsCode, 'utf8');
if (fs.existsSync('js/data')) fs.writeFileSync('js/data/items.js', itemsCode, 'utf8');
if (fs.existsSync('dist/client/js/data')) fs.writeFileSync('dist/client/js/data/items.js', itemsCode, 'utf8');

// Ghi file client/js/data/pokedex.js
const pokedexCode = `// ========================================================
// SỦNG VẬT ĐỒ GIÁM & TIẾN HÓA CHUẨN (J2ME REA EXPORT)
// 102 Sủng Vật & 53 Nhánh Tiến Hóa Ngũ Hành
// ========================================================

const POKEDEX_DATA = ${JSON.stringify(POKEDEX_DATA, null, 2)};

const POKEDEX_ELEMENTS = ${JSON.stringify(elementNames.map(e => e.replace(' hệ', '')), null, 2)};

if (typeof window !== 'undefined') {
    window.POKEDEX_DATA = POKEDEX_DATA;
    window.POKEDEX_ELEMENTS = POKEDEX_ELEMENTS;
}
`;
fs.writeFileSync('client/js/data/pokedex.js', pokedexCode, 'utf8');
if (fs.existsSync('js/data')) fs.writeFileSync('js/data/pokedex.js', pokedexCode, 'utf8');
if (fs.existsSync('dist/client/js/data')) fs.writeFileSync('dist/client/js/data/pokedex.js', pokedexCode, 'utf8');

console.log('✅ ĐÃ XUẤT THÀNH CÔNG items.js (70 items, 3 shops) và pokedex.js (102 sủng vật, 53 nhánh tiến hóa)!');
