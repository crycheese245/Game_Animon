import fs from 'fs';
import path from 'path';

// Mock browser window and canvas
global.window = {};
global.Image = class { constructor() { this.src = ''; } };
global.document = {
    getElementById: () => ({ addEventListener: () => {} })
};

// Nạp monsters data
await import('../client/js/data/monsters.js');
console.log('Total monsters loaded:', window.MONSTERS_PRESET.length);
console.log('Total skills loaded:', window.SKILLS_PRESET.length);

// Nạp battleSystem
await import('../client/js/ui/battleSystem.js');
console.log('BattleSystem loaded successfully');

const starter = window.MONSTERS_PRESET.find(m => m.name === 'Tiểu Lam Kình') || window.MONSTERS_PRESET[0];
const wild = window.MONSTERS_PRESET.find(m => m.name === 'Bụi gai') || window.MONSTERS_PRESET[1];

const playerMonster = window.calculateMonsterStats(starter, 5);
const wildMonster = window.calculateMonsterStats(wild, 6);

console.log(`\nPlayer Monster: ${playerMonster.name} (${playerMonster.type}) - HP: ${playerMonster.hp}/${playerMonster.maxHp}, MP: ${playerMonster.mp}/${playerMonster.maxMp}`);
console.log(`Skills:`, playerMonster.skills.map(s => `${s.name} [${s.type}, Pow:${s.power}, MP:${s.mpCost}]`));

console.log(`\nWild Monster: ${wildMonster.name} (${wildMonster.type}) - HP: ${wildMonster.hp}/${wildMonster.maxHp}, MP: ${wildMonster.mp}/${wildMonster.maxMp}`);
console.log(`Skills:`, wildMonster.skills.map(s => `${s.name} [${s.type}, Pow:${s.power}, MP:${s.mpCost}]`));

// Giả lập trận đấu
window.battleSystem.startBattle({
    wildMonster,
    playerTeam: [playerMonster],
    inventory: { pokeballs: 5, potions: 3 },
    onEnd: (res) => console.log('Battle ended:', res)
});

console.log('\nState immediately after startBattle:', window.battleSystem.state, '| Message:', window.battleSystem.message);

// Tua qua intro
window.battleSystem.nextDialog(); // Xuất trận
console.log('State during intro dialog:', window.battleSystem.state, '| Message:', window.battleSystem.message);

window.battleSystem.nextDialog(); // Vào player_turn
console.log('State after intro:', window.battleSystem.state, '| SubState:', window.battleSystem.subState, '| Message:', window.battleSystem.message);

if (window.battleSystem.state === 'player_turn' && window.battleSystem.subState === 'skills') {
    console.log('=> THÀNH CÔNG: Màn hình trận đấu chuyển mượt vào player_turn với danh sách kỹ năng sẵn sàng!');
    // Thử dùng chiêu thức số 1
    const chosenSkill = playerMonster.skills[0];
    console.log(`Thử thi triển kỹ năng [1]: ${chosenSkill.name}...`);
    window.battleSystem.playerAttack(chosenSkill);
    console.log('State while executing attack:', window.battleSystem.state, '| MP còn:', playerMonster.mp);
} else {
    console.error('THẤT BẠI: BattleSystem không vào được player_turn');
}
