import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { Monster, isDbConnected } from '../models/index.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export let PRESET_MONSTERS = [];
try {
    const jsonPath = path.join(__dirname, '../data/monsters.json');
    if (fs.existsSync(jsonPath)) {
        const rawData = JSON.parse(fs.readFileSync(jsonPath, 'utf8'));
        PRESET_MONSTERS = (rawData.monsters || []).map(m => ({
            code: m.code,
            name: m.name,
            type: m.type,
            baseHp: m.baseHP,
            baseAttack: m.baseATK,
            baseDefense: m.baseDEF,
            baseSpeed: m.baseSPD,
            spriteUrl: m.sprite,
            spriteKey: m.spriteKey,
            skills: m.skills,
            description: m.description
        }));
    }
} catch (e) {
    console.error('Lỗi khi nạp server/data/monsters.json:', e.message);
}

export const monsterController = {
    // Lấy toàn bộ preset 102 quái chính thức
    async getAll(req, res) {
        try {
            if (isDbConnected) {
                const count = await Monster.count();
                if (count === 0 && PRESET_MONSTERS.length > 0) {
                    await Monster.bulkCreate(PRESET_MONSTERS);
                    console.log(`✅ Đã khởi tạo ${PRESET_MONSTERS.length} Sủng vật Cầu Vồng vào MySQL!`);
                }
                const monsters = await Monster.findAll();
                return res.json({ success: true, count: monsters.length, data: monsters });
            } else {
                return res.json({ success: true, count: PRESET_MONSTERS.length, data: PRESET_MONSTERS });
            }
        } catch (error) {
            console.error('Lỗi khi lấy danh sách quái:', error);
            res.json({ success: true, count: PRESET_MONSTERS.length, data: PRESET_MONSTERS });
        }
    },

    // Lấy chi tiết theo mã quái
    async getByCode(req, res) {
        try {
            const { code } = req.params;
            if (isDbConnected) {
                const mon = await Monster.findOne({ where: { code } });
                if (mon) return res.json({ success: true, data: mon });
            }
            const localMon = PRESET_MONSTERS.find(m => m.code === code);
            if (localMon) return res.json({ success: true, data: localMon });
            res.status(404).json({ success: false, message: 'Không tìm thấy sủng vật' });
        } catch (error) {
            res.status(500).json({ success: false, message: error.message });
        }
    }
};

export default monsterController;
