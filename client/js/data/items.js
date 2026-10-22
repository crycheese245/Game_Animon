// ========================================================
// HỆ THỐNG VẬT PHẨM & ĐẠO CỤ CHÍNH THỨC (J2ME REA EXPORT)
// Trích xuất từ Vương Quốc Sủng Cầu Vồng & Liệt Hỏa
// ========================================================

const ITEMS_CONFIG = {
    // --- DƯỢC PHẨM & HỒI PHỤC ---
    'potion': {
        id: 'potion',
        name: 'Đồ Uống (Bình Máu)',
        category: 'recovery',
        icon: '🧪',
        color: '#2ecc71',
        price: 100,
        desc: 'Nước giải khát thảo dược, hồi phục 35% HP tối đa cho sủng vật.',
        healHpPercent: 35
    },
    'superPotion': {
        id: 'superPotion',
        name: 'Bánh Bích Quy (Huyết Dược)',
        category: 'recovery',
        icon: '🍪',
        color: '#27ae60',
        price: 250,
        desc: 'Bánh dinh dưỡng thượng hạng, hồi phục 65% HP tối đa cho sủng vật.',
        healHpPercent: 65
    },
    'chocolate': {
        id: 'chocolate',
        name: 'Chocolate (Thần Dược)',
        category: 'recovery',
        icon: '🍫',
        color: '#e67e22',
        price: 600,
        desc: 'Chocolate ma thuật năng lượng cao, hồi phục trọn vẹn 100% HP.',
        healHpPercent: 100
    },
    'ether': {
        id: 'ether',
        name: 'Năng Lượng Thạch',
        category: 'recovery',
        icon: '🔷',
        color: '#3498db',
        price: 200,
        desc: 'Viên đá tinh thể lam, hồi phục 50% MP tối đa cho sủng vật.',
        healMpPercent: 50
    },
    'elixir': {
        id: 'elixir',
        name: 'Hoàng Kim Đường (Toàn Hồi)',
        category: 'recovery',
        icon: '🍬',
        color: '#f1c40f',
        price: 1000,
        desc: 'Kẹo hoàng kim quý hiếm, hồi phục trọn vẹn 100% HP và 100% MP.',
        healHpPercent: 100,
        healMpPercent: 100
    },
    'revive': {
        id: 'revive',
        name: 'Sinh Mệnh Thạch',
        category: 'recovery',
        icon: '💖',
        color: '#e74c3c',
        price: 500,
        desc: 'Đá sinh mệnh hồi sinh sủng vật đã ngã xuống và phục hồi 50% HP.',
        revivePercent: 50
    },

    // --- BÓNG BẮT SỦNG VẬT ---
    'pokeballs': {
        id: 'pokeballs',
        name: 'Phong Ấn Cầu (Animon Ball)',
        category: 'ball',
        icon: '🔴',
        color: '#e74c3c',
        price: 150,
        desc: 'Bóng phong ấn tiêu chuẩn dùng để thu phục sủng vật hoang dã.',
        catchRate: 1.0
    },
    'greatBalls': {
        id: 'greatBalls',
        name: 'Cao Cấp Cầu (Great Ball)',
        category: 'ball',
        icon: '🔵',
        color: '#2980b9',
        price: 400,
        desc: 'Bóng cao cấp với tỷ lệ thu phục sủng vật cao hơn gấp 1.8 lần.',
        catchRate: 1.8
    },
    'masterBalls': {
        id: 'masterBalls',
        name: 'Đại Sư Cầu (Master Ball)',
        category: 'ball',
        icon: '🟣',
        color: '#8e44ad',
        price: 5000,
        desc: 'Bóng đại sư tối thượng, tỷ lệ bắt thành công tuyệt đối 100%.',
        catchRate: 99.0
    },

    // --- ĐÁ TIẾN HÓA & ĐẠO CỤ ---
    'fireStone': {
        id: 'fireStone',
        name: 'Cứng Cỏi Thạch (Hỏa Thạch)',
        category: 'stone',
        icon: '🔥',
        color: '#c0392b',
        price: 800,
        desc: 'Ngọc lửa tiến hóa cơ bản cho các loài sủng vật Mãnh Thú hệ.'
    },
    'leafStone': {
        id: 'leafStone',
        name: 'Thụ Chướng Thạch (Mộc Thạch)',
        category: 'stone',
        icon: '🍃',
        color: '#27ae60',
        price: 800,
        desc: 'Linh thạch thảo mộc dùng để đánh thức tiến hóa hệ Thực Vật.'
    },
    'waterStone': {
        id: 'waterStone',
        name: 'Thủy Tinh Thạch (Hải Thạch)',
        category: 'stone',
        icon: '💧',
        color: '#2980b9',
        price: 800,
        desc: 'Ngọc bích biển sâu kích hoạt tiến hóa sủng vật hệ Hải Dương.'
    },
    'thunderStone': {
        id: 'thunderStone',
        name: 'Lôi Quang Thạch',
        category: 'stone',
        icon: '⚡',
        color: '#f39c12',
        price: 800,
        desc: 'Tinh thạch tích điện sấm sét kích hoạt tiến hóa hệ Phi Hành.'
    },
    'repel': {
        id: 'repel',
        name: 'Tránh Quái Hoàn',
        category: 'stone',
        icon: '💨',
        color: '#95a5a6',
        price: 300,
        desc: 'Dược hương xua đuổi quái vật hoang dã trong thời gian ngắn.'
    }
};

if (typeof window !== 'undefined') {
    window.ITEMS_CONFIG = ITEMS_CONFIG;
}
