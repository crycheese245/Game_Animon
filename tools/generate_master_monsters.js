import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const EXTRACTED_DIR = path.join(__dirname, 'extracted_jars');

function decodeCeasar7(buf) {
    const out = Buffer.alloc(buf.length);
    for (let i = 0; i < buf.length; i++) out[i] = (buf[i] - 7) & 0xff;
    return out.toString('utf-8');
}

console.log('=== TIẾN HÀNH XÂY DỰNG TOÀN DIỆN HỆ THỐNG KỸ NĂNG & LIST SỦNG VẬT CHO 5 GAME ===');

// ========================================================
// 1. TỔNG HỢP MASTER SKILLS (TỪ CẢ 5 GAME)
// ========================================================
const MASTER_SKILLS = [
    // --- THỰC VẬT / CỎ HỆ (Cau Vong & Liet Hoa & Lien Thu) ---
    { id: 0, name: 'Triền Nhiễu', type: 'Thực Vật', power: 16, mpCost: 10, accuracy: 95, heal: 0, buffDef: 0, desc: 'Dây leo quấn chặt gây sát thương và khống chế' },
    { id: 1, name: 'Phong Lợi Tiêm Thứ', type: 'Thực Vật', power: 22, mpCost: 14, accuracy: 95, heal: 0, buffDef: 0, desc: 'Phóng ra gai nhọn sắc bén như lưỡi cưa' },
    { id: 2, name: 'Phi Diệp Đao Phong', type: 'Thực Vật', power: 28, mpCost: 18, accuracy: 95, heal: 0, buffDef: 0, desc: 'Phóng bão lá sắc bén tựa ngàn lưỡi kiếm' },
    { id: 3, name: 'Sâm Lâm Bạo Phát', type: 'Thực Vật', power: 36, mpCost: 26, accuracy: 95, heal: 0, buffDef: 0, desc: 'Sức mạnh rừng thẳm bộc phát đè bẹp đối phương' },
    { id: 4, name: 'Mộc Chi Cứu Thù', type: 'Thực Vật', power: 46, mpCost: 35, accuracy: 95, heal: 0, buffDef: 0, desc: 'Chiêu thức tối thượng hệ Thực Vật hủy diệt kẻ địch' },
    { id: 5, name: 'Diệp Toàn', type: 'Thực Vật', power: 18, mpCost: 11, accuracy: 95, heal: 0, buffDef: 0, desc: 'Lốc xoáy lá cây sắc ngọt bao vây mục tiêu' },
    { id: 6, name: 'Châm Diệp Trảm', type: 'Thực Vật', power: 26, mpCost: 18, accuracy: 95, heal: 0, buffDef: 0, desc: 'Lưỡi trảm lá kim xuyên thủng lớp phòng hộ' },
    { id: 7, name: 'Đằng Mạn Triền Nhiễu', type: 'Thực Vật', power: 34, mpCost: 24, accuracy: 95, heal: 0, buffDef: 0, desc: 'Đại dây leo cổ thụ cuốn siết mục tiêu liên hồi' },
    { id: 8, name: 'Thảo Nguyện Thuật', type: 'Hồi Phục', power: 0, mpCost: 18, accuracy: 100, heal: 40, buffDef: 0, desc: 'Cầu nguyện thảo nguyên hồi 40% lượng máu tối đa' },
    { id: 9, name: 'Quang Hợp Hiệu Ứng', type: 'Hồi Phục', power: 0, mpCost: 28, accuracy: 100, heal: 65, buffDef: 0, desc: 'Thu nạp ánh sáng phục hồi 65% sinh lực' },

    // --- KIM LOẠI / THỔ HỆ (Cau Vong & Liet Hoa & Than Thu) ---
    { id: 10, name: 'Thiết Quyền', type: 'Kim Loại', power: 16, mpCost: 10, accuracy: 95, heal: 0, buffDef: 0, desc: 'Nắm đấm kim loại nặng nề nện thẳng mục tiêu' },
    { id: 11, name: 'Cương Thiết Trảm', type: 'Kim Loại', power: 22, mpCost: 14, accuracy: 95, heal: 0, buffDef: 0, desc: 'Đường kiếm thép sắc lạnh chém đứt giáp trụ' },
    { id: 12, name: 'Kim Tinh Xung Kích', type: 'Kim Loại', power: 28, mpCost: 19, accuracy: 95, heal: 0, buffDef: 0, desc: 'Lao thẳng với mũi khoan kim cương cực mạnh' },
    { id: 13, name: 'Bạo Liệt Thiết Toản', type: 'Kim Loại', power: 36, mpCost: 26, accuracy: 95, heal: 0, buffDef: 0, desc: 'Mũi khoan thép bạo nổ gây chấn thương diện rộng' },
    { id: 14, name: 'Trảm Kim Đoạn Ngọc', type: 'Kim Loại', power: 48, mpCost: 36, accuracy: 95, heal: 0, buffDef: 0, desc: 'Tuyệt kỹ kim loại chém sắt gãy ngọc vô song' },
    { id: 15, name: 'Thổ Thuẫn', type: 'Phòng Ngự', power: 0, mpCost: 12, accuracy: 100, heal: 0, buffDef: 35, desc: 'Dựng tường đất cứng cáp tăng 35% phòng ngự' },
    { id: 16, name: 'Bão Cát', type: 'Kim Loại', power: 24, mpCost: 16, accuracy: 90, heal: 0, buffDef: 0, desc: 'Cơn bão bụi cát cuốn xé và giảm tầm nhìn địch' },
    { id: 17, name: 'Nham Băng', type: 'Kim Loại', power: 32, mpCost: 22, accuracy: 95, heal: 0, buffDef: 0, desc: 'Nham thạch nổ tung phá toái trận địa' },
    { id: 18, name: 'Thổ Chi Loạn Vũ', type: 'Kim Loại', power: 44, mpCost: 32, accuracy: 95, heal: 0, buffDef: 0, desc: 'Đại địa cuồng nộ nghiền nát tất cả mục tiêu' },
    { id: 19, name: 'Cương Cân Thiết Cốt', type: 'Phòng Ngự', power: 0, mpCost: 14, accuracy: 100, heal: 0, buffDef: 45, desc: 'Biến cơ thể thành khối kim cương siêu cứng' },

    // --- PHI HÀNH / PHONG & LÔI HỆ (Cau Vong & Liet Hoa & The Gioi Moi) ---
    { id: 20, name: 'Phong Nhận', type: 'Phi Hành', power: 17, mpCost: 10, accuracy: 95, heal: 0, buffDef: 0, desc: 'Lưỡi đao gió chém ngọt từ không trung' },
    { id: 21, name: 'Liệp Dực Trảm', type: 'Phi Hành', power: 23, mpCost: 14, accuracy: 95, heal: 0, buffDef: 0, desc: 'Sải cánh săn mồi chém rách đối thủ' },
    { id: 22, name: 'Toàn Phong Xung Kích', type: 'Phi Hành', power: 29, mpCost: 19, accuracy: 95, heal: 0, buffDef: 0, desc: 'Cuộn trọn theo lốc xoáy đâm sầm vào kẻ địch' },
    { id: 23, name: 'Vũ Dực Cuồng Phong', type: 'Phi Hành', power: 37, mpCost: 26, accuracy: 95, heal: 0, buffDef: 0, desc: 'Đập cánh tạo siêu bão càn quét trận đấu' },
    { id: 24, name: 'Thần Phong Liệt Không', type: 'Phi Hành', power: 48, mpCost: 36, accuracy: 95, heal: 0, buffDef: 0, desc: 'Cơn bão thần thánh xé toạc không gian' },
    { id: 25, name: 'Lôi Kích', type: 'Phi Hành', power: 25, mpCost: 16, accuracy: 95, heal: 0, buffDef: 0, desc: 'Tia sét rền vang giáng sập mục tiêu' },
    { id: 26, name: 'Lôi Đình Nhất Kích', type: 'Phi Hành', power: 38, mpCost: 28, accuracy: 95, heal: 0, buffDef: 0, desc: 'Sấm sét cửu thiên giáng thế gây tê liệt' },
    { id: 27, name: 'Yến Hồi Thiểm', type: 'Phi Hành', power: 32, mpCost: 22, accuracy: 95, heal: 0, buffDef: 0, desc: 'Lượn cánh chớp nhoáng phản kích hiểm hóc' },
    { id: 28, name: 'Phi Yến Hoàn Sào', type: 'Phi Hành', power: 45, mpCost: 34, accuracy: 95, heal: 0, buffDef: 0, desc: 'Đường bay huyền ảo kết liễu kẻ thù' },
    { id: 29, name: 'Điện Quang Thạch Hỏa', type: 'Phi Hành', power: 42, mpCost: 32, accuracy: 95, heal: 0, buffDef: 0, desc: 'Tốc độ tia chớp tấn công dồn dập không kịp trở tay' },

    // --- MÃNH THÚ / HỎA HỆ (Cau Vong & Liet Hoa & Lien Thu) ---
    { id: 30, name: 'Liệt Trảo', type: 'Mãnh Thú', power: 17, mpCost: 10, accuracy: 95, heal: 0, buffDef: 0, desc: 'Móng vuốt rực lửa cào xé dữ dội' },
    { id: 31, name: 'Cuồng Bạo Xung Chàng', type: 'Mãnh Thú', power: 23, mpCost: 14, accuracy: 95, heal: 0, buffDef: 0, desc: 'Húc mạnh bạo liệt hất văng đối thủ' },
    { id: 32, name: 'Viêm Hống Toái Cốt', type: 'Mãnh Thú', power: 29, mpCost: 19, accuracy: 95, heal: 0, buffDef: 0, desc: 'Tiếng gầm rực lửa làm rúng động và nứt giáp đối thủ' },
    { id: 33, name: 'Nộ Diễm Liệt Ba', type: 'Mãnh Thú', power: 38, mpCost: 27, accuracy: 95, heal: 0, buffDef: 0, desc: 'Sóng lửa cuộn trào thiêu đốt toàn bộ vùng xung quanh' },
    { id: 34, name: 'Hồng Liên Liệt Hỏa', type: 'Mãnh Thú', power: 50, mpCost: 38, accuracy: 95, heal: 0, buffDef: 0, desc: 'Hoa sen lửa địa ngục hủy diệt vạn vật' },
    { id: 35, name: 'Hỏa Trảo', type: 'Mãnh Thú', power: 18, mpCost: 11, accuracy: 95, heal: 0, buffDef: 0, desc: 'Vuốt lửa bốc cháy cào xé mục tiêu' },
    { id: 36, name: 'Diễm Kích', type: 'Mãnh Thú', power: 26, mpCost: 17, accuracy: 95, heal: 0, buffDef: 0, desc: 'Phóng đạn lửa nổ tung khi va chạm' },
    { id: 37, name: 'Viêm Lôi Phá', type: 'Mãnh Thú', power: 36, mpCost: 26, accuracy: 95, heal: 0, buffDef: 0, desc: 'Sự kết hợp giữa sấm sét và lửa đỏ uy lực bão táp' },
    { id: 38, name: 'Liệt Diễm Phong Bạo', type: 'Mãnh Thú', power: 44, mpCost: 34, accuracy: 95, heal: 0, buffDef: 0, desc: 'Bão lửa cuồng phong nhấn chìm trận đấu' },
    { id: 39, name: 'Vĩnh Hằng Hỏa Ảnh', type: 'Mãnh Thú', power: 52, mpCost: 40, accuracy: 95, heal: 0, buffDef: 0, desc: 'Ngọn lửa vĩnh cửu bất diệt nuốt trọn sinh lực địch' },

    // --- HẢI DƯƠNG / BĂNG & THỦY HỆ (Cau Vong & Liet Hoa & Lien Thu) ---
    { id: 40, name: 'Thủy Trụ', type: 'Hải Dương', power: 15, mpCost: 10, accuracy: 95, heal: 0, buffDef: 0, desc: 'Cột nước áp lực cao bắn thẳng từ mặt đất' },
    { id: 41, name: 'Ba Đào Trọng Kích', type: 'Hải Dương', power: 22, mpCost: 14, accuracy: 95, heal: 0, buffDef: 0, desc: 'Cơn sóng cuồn cuộn đập mạnh vào kẻ thù' },
    { id: 42, name: 'Hải Lãng Nộ Đào', type: 'Hải Dương', power: 28, mpCost: 19, accuracy: 95, heal: 0, buffDef: 0, desc: 'Sóng biển giận dữ cuốn phăng phòng tuyến địch' },
    { id: 43, name: 'Hàn Băng Toái Toản', type: 'Hải Dương', power: 36, mpCost: 26, accuracy: 95, heal: 0, buffDef: 0, desc: 'Những mũi băng nhọn hoắt nghiền nát giáp trụ' },
    { id: 44, name: 'Hải Tiêu Nộ Lãng', type: 'Hải Dương', power: 48, mpCost: 36, accuracy: 95, heal: 0, buffDef: 0, desc: 'Đại hồng thủy đại dương nuốt chửng đối thủ' },
    { id: 45, name: 'Băng Lao', type: 'Hải Dương', power: 20, mpCost: 12, accuracy: 95, heal: 0, buffDef: 0, desc: 'Hộp băng vĩnh cửu khóa chặt mục tiêu' },
    { id: 46, name: 'Bạo Phong Tuyết', type: 'Hải Dương', power: 36, mpCost: 26, accuracy: 95, heal: 0, buffDef: 0, desc: 'Bão tuyết hàn băng đóng băng cả bầu trời' },
    { id: 47, name: 'Băng Phong Hãm Tịnh', type: 'Hải Dương', power: 44, mpCost: 34, accuracy: 95, heal: 0, buffDef: 0, desc: 'Bẫy băng đóng băng mọi nỗ lực phản kháng' },
    { id: 48, name: 'Thuật Cầu Nguyện', type: 'Hồi Phục', power: 0, mpCost: 16, accuracy: 100, heal: 45, buffDef: 0, desc: 'Làn nước mát lành chữa lành 45% sinh lực' },
    { id: 49, name: 'Thủy Bích', type: 'Phòng Ngự', power: 0, mpCost: 12, accuracy: 100, heal: 0, buffDef: 35, desc: 'Tường nước bao bọc giảm 35% sát thương nhận vào' },

    // --- KỸ NĂNG ĐẶC BIỆT & CHIẾN KỶ (Lien Thu, Than Thu, The Gioi Moi) ---
    { id: 50, name: 'Thiên Vương Chiến Ý', type: 'Đặc Biệt', power: 0, mpCost: 15, accuracy: 100, heal: 0, buffDef: 25, desc: 'Chiến ý ngút trời gia tăng toàn diện công phòng' },
    { id: 51, name: 'Lực Phách Thiên Quân', type: 'Đặc Biệt', power: 36, mpCost: 25, accuracy: 95, heal: 0, buffDef: 0, desc: 'Đòn bổ ngàn cân chẻ đôi giáp trụ' },
    { id: 52, name: 'Càn Khôn Nhất Kích', type: 'Đặc Biệt', power: 44, mpCost: 32, accuracy: 95, heal: 0, buffDef: 0, desc: 'Xoay chuyển càn khôn xuất kích quyết định' },
    { id: 53, name: 'Bối Thủy Nhất Chiến', type: 'Đặc Biệt', power: 48, mpCost: 36, accuracy: 95, heal: 0, buffDef: 0, desc: 'Trận chiến bờ sông không đường lùi sát thương bộc phá' },
    { id: 54, name: 'Phản Kích', type: 'Đặc Biệt', power: 32, mpCost: 20, accuracy: 95, heal: 0, buffDef: 0, desc: 'Lợi dụng lực tấn công của địch phản đòn bất ngờ' },
    { id: 55, name: 'Niết Bàn Kích', type: 'Hồi Phục', power: 25, mpCost: 35, accuracy: 95, heal: 50, buffDef: 0, desc: 'Vừa tấn công vừa hồi sinh 50% lượng máu tối đa' },
    { id: 56, name: 'Thần Ân Nghiễm Trạch', type: 'Hồi Phục', power: 0, mpCost: 38, accuracy: 100, heal: 80, buffDef: 0, desc: 'Ân sủng tối cao phục hồi 80% sinh lực lập tức' },
    { id: 57, name: 'Minh Kính Chỉ Thủy', type: 'Phòng Ngự', power: 0, mpCost: 16, accuracy: 100, heal: 0, buffDef: 50, desc: 'Tâm tĩnh như gương chặn 50% sát thương phải chịu' }
];

console.log(`Đã xây dựng kho kỹ năng MASTER gồm ${MASTER_SKILLS.length} chiêu thức trọn vẹn.`);

// Helper: Tra cứu bộ 4 chiêu chuẩn theo Hệ và Cấp bậc
function get4SkillsForElement(elem, tier = 1) {
    const byElem = {
        'Thực Vật': [0, 1, 2, 3, 4, 5, 6, 7, 8, 9],
        'Kim Loại': [10, 11, 12, 13, 14, 15, 16, 17, 18, 19],
        'Phi Hành': [20, 21, 22, 23, 24, 25, 26, 27, 28, 29],
        'Mãnh Thú': [30, 31, 32, 33, 34, 35, 36, 37, 38, 39],
        'Hải Dương': [40, 41, 42, 43, 44, 45, 46, 47, 48, 49]
    };
    const list = byElem[elem] || byElem['Thực Vật'];

    if (tier >= 3) {
        // Boss / Cao cấp: 2 chiêu công mạnh + 1 chiêu hỗ trợ/hồi phục + 1 chiêu tối thượng
        return [
            MASTER_SKILLS[list[1]],
            MASTER_SKILLS[list[2]],
            MASTER_SKILLS[list[4]],
            (elem === 'Thực Vật') ? MASTER_SKILLS[8] : ((elem === 'Hải Dương') ? MASTER_SKILLS[48] : ((elem === 'Kim Loại') ? MASTER_SKILLS[19] : MASTER_SKILLS[list[3]]))
        ];
    } else if (tier === 2) {
        // Bậc 2: 3 chiêu công leo thang + 1 chiêu buff
        return [
            MASTER_SKILLS[list[0]],
            MASTER_SKILLS[list[1]],
            MASTER_SKILLS[list[2]],
            MASTER_SKILLS[list[3]]
        ];
    } else {
        // Bậc 1: Chiêu cơ bản + chiêu bậc 2 + chiêu bậc 3 + chiêu đặc trưng
        return [
            MASTER_SKILLS[list[0]],
            MASTER_SKILLS[list[1]],
            MASTER_SKILLS[list[2]],
            (list[6] !== undefined) ? MASTER_SKILLS[list[6]] : MASTER_SKILLS[list[3]]
        ];
    }
}

// ========================================================
// 2. CẬP NHẬT 102 SỦNG VẬT CỦA CẦU VỒNG VỚI 4 SKILL CHUẨN
// ========================================================
const jsonPath = path.resolve('server/data/monsters.json');
const rawData = JSON.parse(fs.readFileSync(jsonPath, 'utf-8'));
const cauvongMonsters = rawData.monsters || rawData;
const ALL_MONSTERS = [];

cauvongMonsters.forEach(m => {
    // Đảm bảo sủng vật có 4 kỹ năng chuẩn theo hệ và cấp bậc
    const skills = get4SkillsForElement(m.type, m.tier);
    ALL_MONSTERS.push({
        ...m,
        skills
    });
});
console.log(`Đã chuẩn hóa 4 kỹ năng hoàn chỉnh cho ${ALL_MONSTERS.length} sủng vật Cầu Vồng.`);

// ========================================================
// 3. PORT CÁC SỦNG VẬT TIÊU BIỂU TỪ LIỆT HỎA (SỦNG VẬT 6)
// ========================================================
const liethoaPetsConfig = [
    { name: 'Nhiên Dực Bức', type: 'Mãnh Thú', tier: 1, sprite: 14, desc: 'Dơi lửa sở hữu sải cánh rực than hồng, chuyên săn mồi đêm' },
    { name: 'Bom Tinh Nghịch', type: 'Kim Loại', tier: 1, sprite: 18, desc: 'Khối kim loại tích điện lấp lánh sẵn sàng phát nổ bảo vệ chủ nhân' },
    { name: 'Nhiên Liệp Sư', type: 'Mãnh Thú', tier: 2, sprite: 21, desc: 'Sư tử bờm lửa dũng mãnh, vua của thảo nguyên Liệt Hỏa' },
    { name: 'Hắc Thán Báo', type: 'Mãnh Thú', tier: 2, sprite: 22, desc: 'Báo đen bóng đêm di chuyển như làn khói than đen kịt' },
    { name: 'Hỏa Diễm Hồ', type: 'Mãnh Thú', tier: 2, sprite: 23, desc: 'Hồ ly lửa chín đuôi mê hoặc kẻ thù bằng ảo ảnh rực cháy' },
    { name: 'Viêm Ma', type: 'Mãnh Thú', tier: 3, sprite: 24, desc: 'Chúa tể dung nham trồi lên từ lòng đất Liệt Hỏa' },
    { name: 'Long Bảo Bối', type: 'Phi Hành', tier: 1, sprite: 25, desc: 'Rồng con đáng yêu sở hữu đôi cánh ngọc bích' },
    { name: 'Phệ Hỏa Thú', type: 'Mãnh Thú', tier: 2, sprite: 26, desc: 'Thú săn lửa nuốt chửng ngọn lửa để gia tăng sức mạnh' },
    { name: 'Bạo Long Thú', type: 'Mãnh Thú', tier: 3, sprite: 27, desc: 'Bạo long khổng lồ với uy lực hủy diệt vạn vật' },
    { name: 'Ly Ngưu Ngưu', type: 'Kim Loại', tier: 1, sprite: 28, desc: 'Bò chiến giáp sắt bền bỉ và kiên cường' },
    { name: 'Hỏa Phượng Hoàng', type: 'Phi Hành', tier: 3, sprite: 29, desc: 'Phượng hoàng tái sinh từ tro tàn với ngọn lửa bất tử' },
    { name: 'Diệp Tán Oa', type: 'Thực Vật', tier: 1, sprite: 30, desc: 'Ếch đội lá sen ngộ nghĩnh ẩn náu trong đầm nước' },
    { name: 'Thụ Tán Oa', type: 'Thực Vật', tier: 2, sprite: 31, desc: 'Cóc cổ thụ phủ đầy rêu phong với lớp da độc mộc' },
    { name: 'Long Oa', type: 'Hải Dương', tier: 3, sprite: 32, desc: 'Rồng cóc đầm lầy hô mưa gọi gió' },
    { name: 'Tiên Nhân Cầu Bảo Bảo', type: 'Thực Vật', tier: 1, sprite: 33, desc: 'Bé xương rồng sa mạc gai nhọn chi chít đáng yêu' },
    { name: 'Tinh Vân Hạc', type: 'Phi Hành', tier: 2, sprite: 34, desc: 'Hạc mây tinh khiết sải cánh giữa dải ngân hà' },
    { name: 'Tuyệt Đối Linh Độ Khuyển', type: 'Hải Dương', tier: 2, sprite: 35, desc: 'Chó tuyết mang hơi thở âm độ đóng băng vạn dặm' },
    { name: 'Tà Vân Khuyển Thần', type: 'Mãnh Thú', tier: 3, sprite: 36, desc: 'Chó thần mây quỷ uy nghiêm bảo hộ lãnh địa thần thánh' },
    { name: 'Hồng Nhạn', type: 'Phi Hành', tier: 1, sprite: 37, desc: 'Chim nhạn đỏ rực báo tin xuân và mang đến may mắn' },
    { name: 'Quáng Thạch Dực Long', type: 'Kim Loại', tier: 3, sprite: 38, desc: 'Dực long bọc quặng thạch cứng hơn kim cương' }
];

let nextId = ALL_MONSTERS.length + 1;
liethoaPetsConfig.forEach((p, idx) => {
    const sKey = `npc2_${p.sprite}`;
    const skills = get4SkillsForElement(p.type, p.tier);
    ALL_MONSTERS.push({
        id: nextId++,
        code: `liethoa_pet_${idx + 1}`,
        name: p.name,
        type: p.type,
        color: (p.type === 'Mãnh Thú') ? '#e74c3c' : ((p.type === 'Phi Hành') ? '#9b59b6' : ((p.type === 'Hải Dương') ? '#2980b9' : ((p.type === 'Kim Loại') ? '#f39c12' : '#27ae60'))),
        tier: p.tier,
        baseHP: 35 + p.tier * 6,
        baseMP: 85 + p.tier * 5,
        baseATK: 14 + p.tier * 4,
        baseDEF: 11 + p.tier * 3,
        baseSPD: 12 + p.tier * 3,
        growth: { hp: 40 + p.tier * 5, mp: 16, atk: 9 + p.tier * 2, def: 7 + p.tier, spd: 8 + p.tier },
        spriteNum: p.sprite,
        spriteVariant: 0,
        spriteKey: sKey,
        sprite: `./img/monsters/${sKey}.png`,
        description: p.desc,
        evolution: [],
        skills
    });
});
console.log(`Đã port thành công 20 sủng vật tiêu biểu của Liệt Hỏa. Tổng hiện tại: ${ALL_MONSTERS.length}.`);

// ========================================================
// 4. PORT TIẾN HÓA 3 CẤP TỪ LIÊN THÚ CHIẾN KỶ
// ========================================================
const lienthuEvolutions = [
    {
        chain: ['Thủy Long Tử', 'Huyễn Thủy Long', 'Thánh Thiên Long'],
        type: 'Hải Dương',
        desc: 'Chuỗi tiến hóa Long Tộc Hải Dương thần thoại thống trị muôn trùng sóng biển'
    },
    {
        chain: ['Lục Lâm Long Tử', 'Phong Linh Long', 'Tật Phong Hoá Long'],
        type: 'Phi Hành',
        desc: 'Chuỗi tiến hóa Long Tộc Phi Hành chúa tể bầu trời và gió lốc'
    },
    {
        chain: ['Quỷ Long Tử', 'Huyễn Ma Kiêu', 'Huyễn Ma Đường'],
        type: 'Mãnh Thú',
        desc: 'Chuỗi tiến hóa Long Tộc Hắc Ám sở hữu ngọn lửa tà linh diệt thế'
    },
    {
        chain: ['Sa Long Tử', 'Toản Địa Long', 'Hậu Thổ Long Vương'],
        type: 'Kim Loại',
        desc: 'Chuỗi tiến hóa Địa Long Kim Loại đục sâu lòng đất bảo vệ khoáng mạch'
    },
    {
        chain: ['Hoàng Đế Ấu Thú', 'Hoàng Đế Giáp Thú', 'Hoàng Đế Dực Thú'],
        type: 'Kim Loại',
        desc: 'Chuỗi tiến hóa Hoàng Đế Tộc bọc chiến giáp hoàng kim uy phong lẫm liệt'
    }
];

lienthuEvolutions.forEach((evo, eIdx) => {
    evo.chain.forEach((petName, stageIdx) => {
        const tier = stageIdx + 1;
        const spriteNum = 15 + eIdx * 4 + stageIdx;
        const sKey = `npc2_${spriteNum}`;
        const skills = get4SkillsForElement(evo.type, tier);
        ALL_MONSTERS.push({
            id: nextId++,
            code: `lienthu_pet_${eIdx + 1}_${stageIdx + 1}`,
            name: petName,
            type: evo.type,
            color: (evo.type === 'Mãnh Thú') ? '#e74c3c' : ((evo.type === 'Phi Hành') ? '#9b59b6' : ((evo.type === 'Hải Dương') ? '#2980b9' : '#f39c12')),
            tier,
            baseHP: 36 + tier * 7,
            baseMP: 90 + tier * 6,
            baseATK: 15 + tier * 4,
            baseDEF: 12 + tier * 3,
            baseSPD: 13 + tier * 3,
            growth: { hp: 42 + tier * 6, mp: 18, atk: 10 + tier * 2, def: 8 + tier, spd: 9 + tier },
            spriteNum,
            spriteVariant: 0,
            spriteKey: sKey,
            sprite: `./img/monsters/${sKey}.png`,
            description: `${evo.desc} (Giai đoạn ${stageIdx + 1}/3).`,
            evolution: stageIdx < 2 ? [nextId] : [],
            skills
        });
    });
});
console.log(`Đã port thành công 15 sủng vật Liên Thú Chiến Kỷ với 5 chuỗi tiến hóa 3 cấp. Tổng: ${ALL_MONSTERS.length}.`);

// ========================================================
// 5. PORT THẦN THÚ & THẾ GIỚI MỚI (CHU TƯỚC, HUYỄN VŨ, THƯƠNG MANG LANG)
// ========================================================
const mythicalPets = [
    { name: 'Chu Tước', type: 'Phi Hành', tier: 3, sprite: 1, desc: 'Thần thú Chu Tước trong Tứ Tượng cai quản ngọn lửa phương Nam' },
    { name: 'Nghịch Chu Tước', type: 'Mãnh Thú', tier: 3, sprite: 2, desc: 'Dị bản hắc ám của Chu Tước bộc phát cuồng nộ diệt thế' },
    { name: 'Huyễn Vũ', type: 'Phi Hành', tier: 3, sprite: 3, desc: 'Linh điểu huyền ảo mang đôi cánh cầu vồng lộng lẫy' },
    { name: 'Mộc Tu Long', type: 'Thực Vật', tier: 2, sprite: 4, desc: 'Rồng thảo mộc tu luyện ngàn năm giữa rừng sâu' },
    { name: 'Thần Tộc', type: 'Kim Loại', tier: 3, sprite: 5, desc: 'Chiến binh thần tộc khoác áo giáp thánh quang' },
    { name: 'Thương Mang Lang', type: 'Mãnh Thú', tier: 2, sprite: 6, desc: 'Sói tuyết Thương Mang tiếng hú vang dội đỉnh núi băng' },
    { name: 'Xích Vũ Lang', type: 'Mãnh Thú', tier: 2, sprite: 7, desc: 'Sói lửa bờm đỏ rực chuyên săn lùng nơi miệng núi lửa' },
    { name: 'Tử Ảnh Ngao', type: 'Phi Hành', tier: 3, sprite: 8, desc: 'Ngao thần bóng tím lướt nhanh như ánh chớp' },
    { name: 'Băng Ma Sư', type: 'Hải Dương', tier: 2, sprite: 9, desc: 'Sư tử băng với bộ lông kết bằng tinh thể tuyết' },
    { name: 'Đế Ma Sư', type: 'Mãnh Thú', tier: 3, sprite: 10, desc: 'Đế vương ma thú quyền năng tối cao' }
];

mythicalPets.forEach((m, idx) => {
    const sKey = `npc2_${m.sprite}`;
    const skills = get4SkillsForElement(m.type, m.tier);
    ALL_MONSTERS.push({
        id: nextId++,
        code: `mythical_pet_${idx + 1}`,
        name: m.name,
        type: m.type,
        color: (m.type === 'Mãnh Thú') ? '#e74c3c' : ((m.type === 'Phi Hành') ? '#9b59b6' : ((m.type === 'Hải Dương') ? '#2980b9' : ((m.type === 'Kim Loại') ? '#f39c12' : '#27ae60'))),
        tier: m.tier,
        baseHP: 42 + m.tier * 6,
        baseMP: 100 + m.tier * 6,
        baseATK: 18 + m.tier * 4,
        baseDEF: 14 + m.tier * 3,
        baseSPD: 16 + m.tier * 3,
        growth: { hp: 46 + m.tier * 6, mp: 20, atk: 12 + m.tier * 2, def: 9 + m.tier, spd: 11 + m.tier },
        spriteNum: m.sprite,
        spriteVariant: 0,
        spriteKey: sKey,
        sprite: `./img/monsters/${sKey}.png`,
        description: m.desc,
        evolution: [],
        skills
    });
});

console.log(`=> TỔNG CỘNG ĐÃ TỔNG HỢP ${ALL_MONSTERS.length} SỦNG VẬT & ${MASTER_SKILLS.length} CHIÊU THỨC CHUẨN!`);

// ========================================================
// 6. GHI FILE DATA MỚI CHO TOÀN BỘ GAME
// ========================================================
const TYPE_EFFECTIVENESS = {
    'Thực Vật': { strongAgainst: ['Phi Hành'], weakAgainst: ['Mãnh Thú'] },
    'Phi Hành': { strongAgainst: ['Hải Dương'], weakAgainst: ['Thực Vật'] },
    'Hải Dương': { strongAgainst: ['Kim Loại'], weakAgainst: ['Phi Hành'] },
    'Kim Loại': { strongAgainst: ['Mãnh Thú'], weakAgainst: ['Hải Dương'] },
    'Mãnh Thú': { strongAgainst: ['Thực Vật'], weakAgainst: ['Kim Loại'] }
};

const monstersJsCode = `// ========================================================
// HỆ THỐNG SỦNG VẬT & KỸ NĂNG MASTER (TỔNG HỢP TỪ 5 BẢN J2ME)
// Vương Quốc Sủng Cầu Vồng • Liệt Hỏa 6 • Liên Thú Chiến Kỷ • Thần Thú Đại Lục • Thế Giới Mới
// ========================================================
const TYPE_EFFECTIVENESS = ${JSON.stringify(TYPE_EFFECTIVENESS, null, 2)};

const MONSTERS_PRESET = ${JSON.stringify(ALL_MONSTERS, null, 2)};

const SKILLS_PRESET = ${JSON.stringify(MASTER_SKILLS, null, 2)};

// Hàm tính toán chỉ số theo Cấp độ (Chuẩn công thức J2ME: Base + (Growth * Level) / 10)
function calculateMonsterStats(baseMonster, level = 5) {
    if (!baseMonster) return null;
    const g = baseMonster.growth || { hp: 35, mp: 15, atk: 8, def: 6, spd: 8 };
    const hp = Math.floor(baseMonster.baseHP + (g.hp * level) / 10);
    const mp = Math.floor(baseMonster.baseMP + (g.mp * level) / 10);
    const attack = Math.floor(baseMonster.baseATK + (g.atk * level) / 10);
    const defense = Math.floor(baseMonster.baseDEF + (g.def * level) / 10);
    const speed = Math.floor(baseMonster.baseSPD + (g.spd * level) / 10);

    // Đảm bảo sủng vật luôn mang đủ 4 kỹ năng hoàn chỉnh
    const skills = (baseMonster.skills && baseMonster.skills.length > 0)
        ? baseMonster.skills
        : [
            { name: 'Đánh Thường', power: 15, mpCost: 0, type: baseMonster.type || 'Đặc Biệt' }
        ];

    return {
        ...baseMonster,
        level,
        hp,
        maxHp: hp,
        mp,
        maxMp: mp,
        attack,
        defense,
        speed,
        skills
    };
}

if (typeof window !== 'undefined') {
    window.TYPE_EFFECTIVENESS = TYPE_EFFECTIVENESS;
    window.MONSTERS_PRESET = MONSTERS_PRESET;
    window.SKILLS_PRESET = SKILLS_PRESET;
    window.calculateMonsterStats = calculateMonsterStats;
}
`;

// Ghi đè vào các vị trí trong dự án
const targetFiles = [
    'client/js/data/monsters.js',
    'js/data/monsters.js',
    'dist/client/js/data/monsters.js'
];

targetFiles.forEach(tf => {
    const full = path.resolve(tf);
    fs.mkdirSync(path.dirname(full), { recursive: true });
    fs.writeFileSync(full, monstersJsCode, 'utf-8');
    console.log(`Đã cập nhật: ${tf}`);
});

// Ghi server/data/monsters.json
const serverJsonPath = path.resolve('server/data/monsters.json');
fs.mkdirSync(path.dirname(serverJsonPath), { recursive: true });
fs.writeFileSync(serverJsonPath, JSON.stringify(ALL_MONSTERS, null, 2), 'utf-8');
console.log(`Đã cập nhật: server/data/monsters.json`);

console.log('=== HOÀN TẤT TẠO MASTER PET & SKILL SYSTEM CHO CẢ 5 GAME! ===');
