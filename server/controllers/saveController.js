import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { GameSave, isDbConnected } from '../models/index.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const FALLBACK_FILE = path.join(__dirname, '../data/fallback_saves.json');

// Khởi tạo thư mục & file fallback
function getFallbackSaves() {
    try {
        const dir = path.dirname(FALLBACK_FILE);
        if (!fs.existsSync(dir)) {
            fs.mkdirSync(dir, { recursive: true });
        }
        if (fs.existsSync(FALLBACK_FILE)) {
            const data = fs.readFileSync(FALLBACK_FILE, 'utf-8');
            return JSON.parse(data);
        }
    } catch (e) {
        console.error('Lỗi đọc fallback saves:', e);
    }
    return {};
}

function writeFallbackSaves(saves) {
    try {
        const dir = path.dirname(FALLBACK_FILE);
        if (!fs.existsSync(dir)) {
            fs.mkdirSync(dir, { recursive: true });
        }
        fs.writeFileSync(FALLBACK_FILE, JSON.stringify(saves, null, 2), 'utf-8');
    } catch (e) {
        console.error('Lỗi ghi fallback saves:', e);
    }
}

export const saveController = {
    // Lưu game
    async save(req, res) {
        try {
            const { slot = 1, saveName, mapId, playerX, playerY, offsetX, offsetY, teamData, inventoryData, playtime } = req.body;
            const slotNum = Number(slot);

            const payload = {
                slot: slotNum,
                saveName: saveName || `Bản lưu ${slotNum}`,
                mapId: mapId || 'pelletTown',
                playerX: playerX !== undefined ? playerX : 488,
                playerY: playerY !== undefined ? playerY : 254,
                offsetX: offsetX !== undefined ? offsetX : -735,
                offsetY: offsetY !== undefined ? offsetY : -650,
                teamData: teamData || [],
                inventoryData: inventoryData || { pokeballs: 5, potions: 3, gold: 500 },
                playtime: playtime || 0,
                updatedAt: new Date().toISOString()
            };

            if (isDbConnected) {
                // Lưu vào MySQL qua Sequelize
                let saveRecord = await GameSave.findOne({ where: { slot: slotNum } });
                if (saveRecord) {
                    await saveRecord.update(payload);
                } else {
                    saveRecord = await GameSave.create(payload);
                }
                return res.json({ success: true, message: 'Đã lưu game vào MySQL thành công!', data: saveRecord });
            } else {
                // Fallback lưu vào file JSON
                const saves = getFallbackSaves();
                saves[slotNum] = payload;
                writeFallbackSaves(saves);
                return res.json({ success: true, message: 'Đã lưu game vào bộ nhớ cục bộ!', data: payload });
            }
        } catch (error) {
            console.error('Lỗi khi lưu game:', error);
            res.status(500).json({ success: false, message: 'Lỗi máy chủ khi lưu game: ' + error.message });
        }
    },

    // Tải game theo slot
    async load(req, res) {
        try {
            const slotNum = Number(req.params.slot);

            if (isDbConnected) {
                const saveRecord = await GameSave.findOne({ where: { slot: slotNum } });
                if (!saveRecord) {
                    return res.status(404).json({ success: false, message: `Không tìm thấy bản lưu slot ${slotNum}` });
                }
                return res.json({ success: true, data: saveRecord });
            } else {
                const saves = getFallbackSaves();
                const save = saves[slotNum];
                if (!save) {
                    return res.status(404).json({ success: false, message: `Không tìm thấy bản lưu slot ${slotNum}` });
                }
                return res.json({ success: true, data: save });
            }
        } catch (error) {
            console.error('Lỗi khi tải game:', error);
            res.status(500).json({ success: false, message: 'Lỗi máy chủ khi tải game: ' + error.message });
        }
    },

    // Danh sách tất cả các slots
    async list(req, res) {
        try {
            if (isDbConnected) {
                const list = await GameSave.findAll({
                    attributes: ['id', 'slot', 'saveName', 'mapId', 'playtime', 'updatedAt'],
                    order: [['slot', 'ASC']]
                });
                return res.json({ success: true, isDb: true, data: list });
            } else {
                const saves = getFallbackSaves();
                const list = Object.keys(saves).map(k => ({
                    slot: Number(k),
                    saveName: saves[k].saveName,
                    mapId: saves[k].mapId,
                    playtime: saves[k].playtime,
                    updatedAt: saves[k].updatedAt
                }));
                return res.json({ success: true, isDb: false, data: list });
            }
        } catch (error) {
            console.error('Lỗi khi lấy danh sách saves:', error);
            res.status(500).json({ success: false, message: error.message });
        }
    },

    // Xoá bản lưu
    async delete(req, res) {
        try {
            const slotNum = Number(req.params.slot);
            if (isDbConnected) {
                await GameSave.destroy({ where: { slot: slotNum } });
            } else {
                const saves = getFallbackSaves();
                delete saves[slotNum];
                writeFallbackSaves(saves);
            }
            res.json({ success: true, message: `Đã xoá bản lưu slot ${slotNum}` });
        } catch (error) {
            res.status(500).json({ success: false, message: error.message });
        }
    }
};

export default saveController;

