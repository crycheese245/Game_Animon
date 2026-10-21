import { Monster, isDbConnected } from '../models/index.js';

export const PRESET_MONSTERS = [
    {
        code: 'animon_01',
        name: 'Viêm Hỏa Khuyển',
        type: 'Hỏa',
        baseHp: 65,
        baseAttack: 32,
        baseDefense: 18,
        baseSpeed: 25,
        spriteUrl: './img/monsters/s0.png',
        skills: [
            { name: 'Phun Lửa', power: 25, type: 'Hỏa', accuracy: 95 },
            { name: 'Cắn Xé', power: 15, type: 'Thường', accuracy: 100 }
        ],
        description: 'Sủng vật hệ Hỏa với bộ lông rực cháy, đòn tấn công có uy lực thiêu đốt.'
    },
    {
        code: 'animon_02',
        name: 'Lam Thủy Kình',
        type: 'Thủy',
        baseHp: 75,
        baseAttack: 24,
        baseDefense: 28,
        baseSpeed: 18,
        spriteUrl: './img/monsters/s1.png',
        skills: [
            { name: 'Súng Nước', power: 22, type: 'Thủy', accuracy: 100 },
            { name: 'Đâm Va', power: 14, type: 'Thường', accuracy: 100 }
        ],
        description: 'Sủng vật hệ Thủy với lượng máu dồi dào và khả năng phòng thủ kiên cố.'
    },
    {
        code: 'animon_03',
        name: 'Thanh Mộc Long',
        type: 'Mộc',
        baseHp: 70,
        baseAttack: 26,
        baseDefense: 24,
        baseSpeed: 20,
        spriteUrl: './img/monsters/s2.png',
        skills: [
            { name: 'Lá Dao Cạo', power: 24, type: 'Mộc', accuracy: 95 },
            { name: 'Hấp Thụ', power: 16, type: 'Mộc', accuracy: 100 }
        ],
        description: 'Sủng vật hệ Cỏ sống sâu trong rừng rậm, có khả năng hút sinh lực kẻ địch.'
    },
    {
        code: 'animon_04',
        name: 'Lôi Điện Ưng',
        type: 'Lôi',
        baseHp: 58,
        baseAttack: 35,
        baseDefense: 16,
        baseSpeed: 32,
        spriteUrl: './img/monsters/s3.png',
        skills: [
            { name: 'Tia Chớp', power: 28, type: 'Lôi', accuracy: 90 },
            { name: 'Mổ Tốc Độ', power: 18, type: 'Bay', accuracy: 100 }
        ],
        description: 'Sủng vật hệ Điện tốc độ cực nhanh, có khả năng giáng sấm chớp từ trên cao.'
    },
    {
        code: 'animon_05',
        name: 'Bạch Hổ Chiến Thú',
        type: 'Thường',
        baseHp: 80,
        baseAttack: 30,
        baseDefense: 25,
        baseSpeed: 22,
        spriteUrl: './img/monsters/s4.png',
        skills: [
            { name: 'Vuốt Thép', power: 26, type: 'Thép', accuracy: 95 },
            { name: 'Gầm Thét', power: 15, type: 'Thường', accuracy: 100 }
        ],
        description: 'Mãnh thú dũng mãnh sở hữu sức mạnh cơ bắp phi thường và móng vuốt sắc bén.'
    },
    {
        code: 'animon_06',
        name: 'Ám Dạ Ma Miêu',
        type: 'Ám',
        baseHp: 62,
        baseAttack: 33,
        baseDefense: 20,
        baseSpeed: 29,
        spriteUrl: './img/monsters/s5.png',
        skills: [
            { name: 'Bóng Đêm', power: 27, type: 'Ám', accuracy: 95 },
            { name: 'Ánh Nhìn Ma Quái', power: 12, type: 'Ám', accuracy: 100 }
        ],
        description: 'Bóng ma thoắt ẩn thoắt hiện trong màn đêm, gieo rắc ảo giác cho đối thủ.'
    },
    {
        code: 'animon_07',
        name: 'Tiểu Hỏa Kỳ Lân',
        type: 'Hỏa',
        baseHp: 55,
        baseAttack: 28,
        baseDefense: 17,
        baseSpeed: 23,
        spriteUrl: './img/monsters/r1.png',
        skills: [
            { name: 'Tia Lửa', power: 20, type: 'Hỏa', accuracy: 100 },
            { name: 'Húc Đầu', power: 15, type: 'Thường', accuracy: 100 }
        ],
        description: 'Linh thú thần bí mang dòng máu kỳ lân lửa sơ sinh.'
    },
    {
        code: 'animon_08',
        name: 'Tiểu Giác Quy',
        type: 'Thủy',
        baseHp: 68,
        baseAttack: 22,
        baseDefense: 30,
        baseSpeed: 15,
        spriteUrl: './img/monsters/r2.png',
        skills: [
            { name: 'Bọt Nước', power: 18, type: 'Thủy', accuracy: 100 },
            { name: 'Rút Vào Mai', power: 0, type: 'Thường', accuracy: 100 }
        ],
        description: 'Rùa nước với chiếc mai cứng như đá tảng, chịu đòn cực tốt.'
    },
    {
        code: 'animon_09',
        name: 'Tiểu Miêu Thảo',
        type: 'Mộc',
        baseHp: 56,
        baseAttack: 25,
        baseDefense: 19,
        baseSpeed: 26,
        spriteUrl: './img/monsters/r3.png',
        skills: [
            { name: 'Dây Leo Gai', power: 22, type: 'Mộc', accuracy: 95 },
            { name: 'Cào Móng', power: 14, type: 'Thường', accuracy: 100 }
        ],
        description: 'Mèo hoa tinh nghịch với chiếc đuôi là mầm cây cỏ xanh tươi.'
    },
    {
        code: 'animon_10',
        name: 'Lôi Điện Hồ Ly',
        type: 'Lôi',
        baseHp: 52,
        baseAttack: 30,
        baseDefense: 16,
        baseSpeed: 30,
        spriteUrl: './img/monsters/r4.png',
        skills: [
            { name: 'Sốc Điện', power: 24, type: 'Lôi', accuracy: 95 },
            { name: 'Nhanh Nhẹn', power: 12, type: 'Thường', accuracy: 100 }
        ],
        description: 'Hồ ly mang nguồn năng lượng điện tích tích tụ trong hai bên má.'
    }
];

export const monsterController = {
    // Lấy toàn bộ preset quái
    async getAll(req, res) {
        try {
            if (isDbConnected) {
                // Kiểm tra xem database đã có dữ liệu chưa
                const count = await Monster.count();
                if (count === 0) {
                    await Monster.bulkCreate(PRESET_MONSTERS);
                    console.log('✅ Đã khởi tạo 10 Preset Quái vật vào MySQL!');
                }
                const monsters = await Monster.findAll();
                return res.json({ success: true, count: monsters.length, data: monsters });
            } else {
                return res.json({ success: true, count: PRESET_MONSTERS.length, data: PRESET_MONSTERS });
            }
        } catch (error) {
            console.error('Lỗi khi lấy danh sách quái:', error);
            // Fallback trả về danh sách có sẵn
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
            res.status(404).json({ success: false, message: 'Không tìm thấy quái vật' });
        } catch (error) {
            res.status(500).json({ success: false, message: error.message });
        }
    }
};

export default monsterController;

