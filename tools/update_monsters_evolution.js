import fs from 'fs';
import vm from 'vm';

const pCode = fs.readFileSync('client/js/data/pokedex.js', 'utf8');
const pSandbox = { window: {} };
vm.createContext(pSandbox);
vm.runInContext(pCode, pSandbox);
const pokedex = pSandbox.window.POKEDEX_DATA;

const mCode = fs.readFileSync('client/js/data/monsters.js', 'utf8');
const mSandbox = { window: {} };
vm.createContext(mSandbox);
vm.runInContext(mCode, mSandbox);
const monsters = mSandbox.window.MONSTERS_PRESET;

monsters.forEach(m => {
    const p = pokedex.find(item => item.id === m.id);
    if (p) {
        m.source = p.source;
        m.evolution = p.evolution;
    }
});

const typeEff = mSandbox.window.TYPE_EFFECTIVENESS;
const skills = mSandbox.window.SKILLS_PRESET;

const out = `// ========================================================
// DANH SÁCH 102 SỦNG VẬT & NGŨ HÀNH (VƯƠNG QUỐC SỦNG CẦU VỒNG)
// ========================================================
const TYPE_EFFECTIVENESS = ${JSON.stringify(typeEff, null, 2)};

const MONSTERS_PRESET = ${JSON.stringify(monsters, null, 2)};

const SKILLS_PRESET = ${JSON.stringify(skills, null, 2)};

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

fs.writeFileSync('client/js/data/monsters.js', out, 'utf8');
if (fs.existsSync('js/data/monsters.js')) fs.writeFileSync('js/data/monsters.js', out, 'utf8');
if (fs.existsSync('dist/client/js/data/monsters.js')) fs.writeFileSync('dist/client/js/data/monsters.js', out, 'utf8');

console.log('✅ Cập nhật thành công monsters.js với nhánh tiến hóa và nguồn gốc sủng vật!');
