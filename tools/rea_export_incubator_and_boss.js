import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const JAR_DIR = path.join(__dirname, 'jar_extracted', 'data');

function decodeByte2D(buf) {
    let c = 2; // skip short header
    const rows = buf[c++];
    const res = [];
    for (let r = 0; r < rows; r++) {
        const cols = buf[c++];
        const row = [];
        for (let col = 0; col < cols; col++) {
            row.push(buf[c++]);
        }
        res.push(row);
    }
    return res;
}

const rawBoss = decodeByte2D(fs.readFileSync(path.join(JAR_DIR, 'boss.d')));
const rawBox = decodeByte2D(fs.readFileSync(path.join(JAR_DIR, 'box.d')));

// Load pokedex to get monster names
const pokedexRaw = fs.readFileSync(path.join(__dirname, '../client/js/data/pokedex.js'), 'utf-8');
const pokedexMatch = pokedexRaw.match(/POKEDEX_DATA\s*=\s*(\[[\s\S]*?\]);/);
let pokedex = [];
if (pokedexMatch) {
    pokedex = JSON.parse(pokedexMatch[1]);
}

const bossEncounters = rawBoss.map((b, idx) => {
    const monId = b[0];
    const monInfo = pokedex[monId] || { name: `Sủng vật #${monId}`, element: 'Thực Vật' };
    return {
        id: `boss_${idx}`,
        bossIndex: idx,
        monsterId: monId,
        name: `Trùm ${monInfo.name}`,
        element: monInfo.element,
        baseLevel: 10 + Math.floor(idx * 0.8),
        skills: [b[1], b[2], b[3]].filter(s => s < 100),
        rewardExp: 300 + idx * 70,
        rewardGold: 200 + idx * 50
    };
});

const eggConfig = {
    'item_4': {
        name: 'Trứng Thực Vật',
        element: 'Thực Vật',
        color: '#4caf50',
        stepsRequired: 100,
        pool: [0, 1, 2, 3, 4, 15, 16],
        desc: 'Trứng chứa phôi thai sủng vật hệ Thực Vật quý hiếm.'
    },
    'item_5': {
        name: 'Trứng Kim Loại',
        element: 'Kim Loại',
        color: '#ff9800',
        stepsRequired: 120,
        pool: [20, 21, 22, 23, 30, 31],
        desc: 'Trứng sủng vật hệ Kim Loại với lớp vỏ cứng như thép.'
    },
    'item_6': {
        name: 'Trứng Phi Hành',
        element: 'Phi Hành',
        color: '#00bcd4',
        stepsRequired: 110,
        pool: [40, 41, 42, 43, 50, 51],
        desc: 'Trứng sủng vật hệ Phi Hành nhẹ như lông vũ.'
    },
    'item_7': {
        name: 'Trứng Mãnh Thú',
        element: 'Mãnh Thú',
        color: '#f44336',
        stepsRequired: 130,
        pool: [60, 61, 62, 63, 70, 71],
        desc: 'Trứng sủng vật hệ Mãnh Thú toát ra khí tức cuồng bạo.'
    },
    'item_8': {
        name: 'Trứng Hải Dương',
        element: 'Hải Dương',
        color: '#2196f3',
        stepsRequired: 115,
        pool: [80, 81, 82, 83, 90, 91],
        desc: 'Trứng sủng vật hệ Hải Dương bao bọc bởi màng nước mát rượi.'
    }
};

const outputContent = `/**
 * GAME ANIMON - HỆ THỐNG ẤP TRỨNG & TRÙM ĐẤU TRƯỜNG REA J2ME
 * Dữ liệu giải mã từ data/box.d và data/boss.d
 */

window.INCUBATOR_CONFIG = {
    eggConfig: ${JSON.stringify(eggConfig, null, 4)},
    rawBoxTables: ${JSON.stringify(rawBox, null, 4)},
    acceleratorItems: {
        'item_13': { name: 'Dược Thủy Ấp Trứng', speedBoost: 50 },
        'item_3': { name: 'Thức Ăn Thú Cưng', speedBoost: 20 }
    }
};

window.ROYAL_BOSSES = ${JSON.stringify(bossEncounters, null, 4)};

if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        INCUBATOR_CONFIG: window.INCUBATOR_CONFIG,
        ROYAL_BOSSES: window.ROYAL_BOSSES
    };
}
`;

fs.writeFileSync(path.join(__dirname, '../client/js/data/incubator.js'), outputContent, 'utf-8');
fs.writeFileSync(path.join(__dirname, '../js/data/incubator.js'), outputContent, 'utf-8');
if (fs.existsSync(path.join(__dirname, '../dist/client/js/data'))) {
    fs.writeFileSync(path.join(__dirname, '../dist/client/js/data/incubator.js'), outputContent, 'utf-8');
}
console.log('Successfully written incubator.js and ROYAL_BOSSES!');
