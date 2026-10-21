const MONSTERS_PRESET = [
    {
        id: 1,
        code: 'animon_01',
        name: 'Viêm Hỏa Khuyển',
        type: 'Hỏa',
        level: 5,
        hp: 65,
        maxHp: 65,
        attack: 32,
        defense: 18,
        speed: 25,
        sprite: './img/monsters/s0.png',
        skills: [
            { name: 'Phun Lửa', power: 25, type: 'Hỏa' },
            { name: 'Cắn Xé', power: 15, type: 'Thường' }
        ]
    },
    {
        id: 2,
        code: 'animon_02',
        name: 'Lam Thủy Kình',
        type: 'Thủy',
        level: 5,
        hp: 75,
        maxHp: 75,
        attack: 24,
        defense: 28,
        speed: 18,
        sprite: './img/monsters/s1.png',
        skills: [
            { name: 'Súng Nước', power: 22, type: 'Thủy' },
            { name: 'Đâm Va', power: 14, type: 'Thường' }
        ]
    },
    {
        id: 3,
        code: 'animon_03',
        name: 'Thanh Mộc Long',
        type: 'Mộc',
        level: 5,
        hp: 70,
        maxHp: 70,
        attack: 26,
        defense: 24,
        speed: 20,
        sprite: './img/monsters/s2.png',
        skills: [
            { name: 'Lá Dao Cạo', power: 24, type: 'Mộc' },
            { name: 'Hấp Thụ', power: 16, type: 'Mộc' }
        ]
    },
    {
        id: 4,
        code: 'animon_04',
        name: 'Lôi Điện Ưng',
        type: 'Lôi',
        level: 6,
        hp: 58,
        maxHp: 58,
        attack: 35,
        defense: 16,
        speed: 32,
        sprite: './img/monsters/s3.png',
        skills: [
            { name: 'Tia Chớp', power: 28, type: 'Lôi' },
            { name: 'Mổ Tốc Độ', power: 18, type: 'Bay' }
        ]
    },
    {
        id: 5,
        code: 'animon_05',
        name: 'Bạch Hổ Chiến Thú',
        type: 'Thường',
        level: 7,
        hp: 80,
        maxHp: 80,
        attack: 30,
        defense: 25,
        speed: 22,
        sprite: './img/monsters/s4.png',
        skills: [
            { name: 'Vuốt Thép', power: 26, type: 'Thép' },
            { name: 'Gầm Thét', power: 15, type: 'Thường' }
        ]
    },
    {
        id: 6,
        code: 'animon_06',
        name: 'Ám Dạ Ma Miêu',
        type: 'Ám',
        level: 6,
        hp: 62,
        maxHp: 62,
        attack: 33,
        defense: 20,
        speed: 29,
        sprite: './img/monsters/s5.png',
        skills: [
            { name: 'Bóng Đêm', power: 27, type: 'Ám' },
            { name: 'Ánh Nhìn Ma Quái', power: 12, type: 'Ám' }
        ]
    },
    {
        id: 7,
        code: 'animon_07',
        name: 'Tiểu Hỏa Kỳ Lân',
        type: 'Hỏa',
        level: 4,
        hp: 55,
        maxHp: 55,
        attack: 28,
        defense: 17,
        speed: 23,
        sprite: './img/monsters/r1.png',
        skills: [
            { name: 'Tia Lửa', power: 20, type: 'Hỏa' },
            { name: 'Húc Đầu', power: 15, type: 'Thường' }
        ]
    },
    {
        id: 8,
        code: 'animon_08',
        name: 'Tiểu Giác Quy',
        type: 'Thủy',
        level: 4,
        hp: 68,
        maxHp: 68,
        attack: 22,
        defense: 30,
        speed: 15,
        sprite: './img/monsters/r2.png',
        skills: [
            { name: 'Bọt Nước', power: 18, type: 'Thủy' },
            { name: 'Rút Vào Mai', power: 0, type: 'Thường' }
        ]
    },
    {
        id: 9,
        code: 'animon_09',
        name: 'Tiểu Miêu Thảo',
        type: 'Mộc',
        level: 4,
        hp: 56,
        maxHp: 56,
        attack: 25,
        defense: 19,
        speed: 26,
        sprite: './img/monsters/r3.png',
        skills: [
            { name: 'Dây Leo Gai', power: 22, type: 'Mộc' },
            { name: 'Cào Móng', power: 14, type: 'Thường' }
        ]
    },
    {
        id: 10,
        code: 'animon_10',
        name: 'Lôi Điện Hồ Ly',
        type: 'Lôi',
        level: 5,
        hp: 52,
        maxHp: 52,
        attack: 30,
        defense: 16,
        speed: 30,
        sprite: './img/monsters/r4.png',
        skills: [
            { name: 'Sốc Điện', power: 24, type: 'Lôi' },
            { name: 'Nhanh Nhẹn', power: 12, type: 'Thường' }
        ]
    },
    {
        id: 11,
        code: 'animon_11',
        name: 'Thiên Sứ Sa Ngã',
        type: 'Thần',
        level: 10,
        hp: 120,
        maxHp: 120,
        attack: 45,
        defense: 35,
        speed: 38,
        sprite: './img/monsters/r0.png',
        skills: [
            { name: 'Phán Quyết Ánh Sáng', power: 35, type: 'Thần' },
            { name: 'Vũ Điệu Lông Vũ', power: 25, type: 'Bay' }
        ]
    },
    {
        id: 12,
        code: 'animon_12',
        name: 'Băng Tuyết Tiên Nữ',
        type: 'Băng',
        level: 8,
        hp: 95,
        maxHp: 95,
        attack: 38,
        defense: 28,
        speed: 32,
        sprite: './img/monsters/r5.png',
        skills: [
            { name: 'Bão Tuyết', power: 32, type: 'Băng' },
            { name: 'Băng Trụ Liêm', power: 22, type: 'Băng' }
        ]
    }
];

if (typeof window !== 'undefined') {
    window.MONSTERS_PRESET = MONSTERS_PRESET;
}

