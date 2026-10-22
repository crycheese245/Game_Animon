import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const JAR_DIR = path.join(__dirname, 'jar_extracted', 'data');

function decodeStringBuffer2D(buf) {
    let c = 2; // skip first 2-byte short header
    const numRows = buf[c++];
    const results = [];
    for (let r = 0; r < numRows; r++) {
        const numCols = buf[c++];
        const cols = [];
        for (let col = 0; col < numCols; col++) {
            const charCount = buf[c++];
            let str = '';
            for (let i = 0; i < charCount; i++) {
                const code = (buf[c] << 8) | (buf[c + 1] & 0xff);
                c += 2;
                str += String.fromCharCode(code);
            }
            cols.push(str);
        }
        results.push(cols);
    }
    return results;
}

function cleanQuestText(raw) {
    if (!raw) return '';
    // Replace #n with newline
    let s = raw.replace(/#n/g, ' ');
    // Strip #0, #1, #2, #3, #4, #5, #6, #7, #8, #9
    s = s.replace(/#[0-9]/g, '');
    // Clean spaces
    s = s.replace(/\s+/g, ' ').trim();
    return s;
}

function highlightQuestHtml(raw) {
    if (!raw) return '';
    let s = raw.replace(/#n/g, '<br>');
    // Replace #7 ... #0 or #3 ... #0 with styled span
    s = s.replace(/#7([^#]+)#0/g, '<span class="text-gold font-semibold">$1</span>');
    s = s.replace(/#3([^#]+)#0/g, '<span class="text-cyan font-semibold">$1</span>');
    s = s.replace(/#5([^#]+)#0/g, '<span class="text-green font-semibold">$1</span>');
    s = s.replace(/#4([^#]+)#0/g, '<span class="text-yellow font-semibold">$1</span>');
    // Remove any leftover # codes
    s = s.replace(/#[0-9]/g, '');
    return s.trim();
}

const rawM0 = decodeStringBuffer2D(fs.readFileSync(path.join(JAR_DIR, 'mission0.t')));
const rawM1 = decodeStringBuffer2D(fs.readFileSync(path.join(JAR_DIR, 'mission1.t')));

const mainQuests = rawM0.map((q, idx) => {
    const rawTitle = q[0] || `Nhiệm vụ chính ${idx + 1}`;
    const rawDesc = q[1] || '';
    return {
        id: `main_${idx}`,
        index: idx,
        type: 'main',
        title: cleanQuestText(rawTitle),
        rawTitle,
        desc: cleanQuestText(rawDesc),
        descHtml: highlightQuestHtml(rawDesc),
        reward: {
            gold: 100 + idx * 50,
            exp: 150 + idx * 80,
            items: idx % 3 === 0 ? [`item_${Math.min(70, 9 + (idx % 10))}`] : []
        }
    };
});

const sideQuests = rawM1.map((q, idx) => {
    const rawTitle = q[0] || `Nhiệm vụ phụ ${idx + 1}`;
    const rawDesc = q[1] || '';
    return {
        id: `side_${idx}`,
        index: idx,
        type: 'side',
        title: cleanQuestText(rawTitle),
        rawTitle,
        desc: cleanQuestText(rawDesc),
        descHtml: highlightQuestHtml(rawDesc),
        reward: {
            gold: 80 + idx * 40,
            exp: 120 + idx * 60,
            items: [`item_${Math.min(70, 1 + (idx % 25))}`]
        }
    };
});

console.log(`Extracted ${mainQuests.length} Main Quests and ${sideQuests.length} Side Quests.`);

const fileContent = `/**
 * GAME ANIMON - TẬP HỢP TẤT CẢ NHIỆM VỤ GỐC TỪ J2ME VƯƠNG QUỐC SỦNG CẦU VỒNG (REA)
 * Trích xuất trực tiếp từ data/mission0.t (57 nhiệm vụ chính) và data/mission1.t (40 nhiệm vụ phụ)
 */

window.QUESTS_DATA = {
    mainQuests: ${JSON.stringify(mainQuests, null, 4)},
    sideQuests: ${JSON.stringify(sideQuests, null, 4)}
};

if (typeof module !== 'undefined' && module.exports) {
    module.exports = window.QUESTS_DATA;
}
`;

fs.writeFileSync(path.join(__dirname, '../client/js/data/quests.js'), fileContent, 'utf-8');
fs.writeFileSync(path.join(__dirname, '../js/data/quests.js'), fileContent, 'utf-8');
if (fs.existsSync(path.join(__dirname, '../dist/client/js/data'))) {
    fs.writeFileSync(path.join(__dirname, '../dist/client/js/data/quests.js'), fileContent, 'utf-8');
}
console.log('Successfully written client/js/data/quests.js, js/data/quests.js, and dist/client/js/data/quests.js!');
