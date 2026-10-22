// ========================================================
// HỆ THỐNG SỦNG VẬT & KỸ NĂNG MASTER (TỔNG HỢP TỪ 5 BẢN J2ME)
// Vương Quốc Sủng Cầu Vồng • Liệt Hỏa 6 • Liên Thú Chiến Kỷ • Thần Thú Đại Lục • Thế Giới Mới
// ========================================================
const TYPE_EFFECTIVENESS = {
  "Thực Vật": {
    "strongAgainst": [
      "Phi Hành"
    ],
    "weakAgainst": [
      "Mãnh Thú"
    ]
  },
  "Phi Hành": {
    "strongAgainst": [
      "Hải Dương"
    ],
    "weakAgainst": [
      "Thực Vật"
    ]
  },
  "Hải Dương": {
    "strongAgainst": [
      "Kim Loại"
    ],
    "weakAgainst": [
      "Phi Hành"
    ]
  },
  "Kim Loại": {
    "strongAgainst": [
      "Mãnh Thú"
    ],
    "weakAgainst": [
      "Hải Dương"
    ]
  },
  "Mãnh Thú": {
    "strongAgainst": [
      "Thực Vật"
    ],
    "weakAgainst": [
      "Kim Loại"
    ]
  }
};

const MONSTERS_PRESET = [
  {
    "id": 1,
    "code": "cauvong_pet_1",
    "name": "Thụ quái",
    "type": "Thực Vật",
    "color": "#27ae60",
    "tier": 1,
    "baseHP": 32,
    "baseMP": 80,
    "baseATK": 12,
    "baseDEF": 10,
    "baseSPD": 12,
    "growth": {
      "hp": 38,
      "mp": 15,
      "atk": 8,
      "def": 6,
      "spd": 8
    },
    "spriteNum": 1,
    "spriteVariant": 0,
    "spriteKey": "npc2_1",
    "sprite": "./img/monsters/npc2_1.png",
    "description": "Tiểu Thụ Quái đáng yêu. [khắc chế Phi Hành hệ]",
    "evolution": [
      11,
      13
    ],
    "skills": [
      {
        "id": 0,
        "name": "Triền Nhiễu",
        "type": "Thực Vật",
        "power": 16,
        "mpCost": 10,
        "accuracy": 95,
        "heal": 0,
        "buffDef": 0,
        "desc": "Dây leo quấn chặt gây sát thương và khống chế"
      },
      {
        "id": 1,
        "name": "Phong Lợi Tiêm Thứ",
        "type": "Thực Vật",
        "power": 22,
        "mpCost": 14,
        "accuracy": 95,
        "heal": 0,
        "buffDef": 0,
        "desc": "Phóng ra gai nhọn sắc bén như lưỡi cưa"
      },
      {
        "id": 2,
        "name": "Phi Diệp Đao Phong",
        "type": "Thực Vật",
        "power": 28,
        "mpCost": 18,
        "accuracy": 95,
        "heal": 0,
        "buffDef": 0,
        "desc": "Phóng bão lá sắc bén tựa ngàn lưỡi kiếm"
      },
      {
        "id": 6,
        "name": "Châm Diệp Trảm",
        "type": "Thực Vật",
        "power": 26,
        "mpCost": 18,
        "accuracy": 95,
        "heal": 0,
        "buffDef": 0,
        "desc": "Lưỡi trảm lá kim xuyên thủng lớp phòng hộ"
      }
    ]
  },
  {
    "id": 2,
    "code": "cauvong_pet_2",
    "name": "Bụi gai",
    "type": "Thực Vật",
    "color": "#27ae60",
    "tier": 2,
    "baseHP": 32,
    "baseMP": 80,
    "baseATK": 12,
    "baseDEF": 10,
    "baseSPD": 12,
    "growth": {
      "hp": 46,
      "mp": 20,
      "atk": 9,
      "def": 8,
      "spd": 10
    },
    "spriteNum": 1,
    "spriteVariant": 1,
    "spriteKey": "npc2_1",
    "sprite": "./img/monsters/npc2_1.png",
    "description": "Kinh Cứu Thụ Quái (bụi gai) toàn thân dài khắp. [khắc chế Phi Hành hệ]",
    "evolution": [
      -2
    ],
    "skills": [
      {
        "id": 0,
        "name": "Triền Nhiễu",
        "type": "Thực Vật",
        "power": 16,
        "mpCost": 10,
        "accuracy": 95,
        "heal": 0,
        "buffDef": 0,
        "desc": "Dây leo quấn chặt gây sát thương và khống chế"
      },
      {
        "id": 1,
        "name": "Phong Lợi Tiêm Thứ",
        "type": "Thực Vật",
        "power": 22,
        "mpCost": 14,
        "accuracy": 95,
        "heal": 0,
        "buffDef": 0,
        "desc": "Phóng ra gai nhọn sắc bén như lưỡi cưa"
      },
      {
        "id": 2,
        "name": "Phi Diệp Đao Phong",
        "type": "Thực Vật",
        "power": 28,
        "mpCost": 18,
        "accuracy": 95,
        "heal": 0,
        "buffDef": 0,
        "desc": "Phóng bão lá sắc bén tựa ngàn lưỡi kiếm"
      },
      {
        "id": 3,
        "name": "Sâm Lâm Bạo Phát",
        "type": "Thực Vật",
        "power": 36,
        "mpCost": 26,
        "accuracy": 95,
        "heal": 0,
        "buffDef": 0,
        "desc": "Sức mạnh rừng thẳm bộc phát đè bẹp đối phương"
      }
    ]
  },
  {
    "id": 3,
    "code": "cauvong_pet_3",
    "name": "Cây chứa dịch độc",
    "type": "Thực Vật",
    "color": "#27ae60",
    "tier": 3,
    "baseHP": 34,
    "baseMP": 80,
    "baseATK": 14,
    "baseDEF": 10,
    "baseSPD": 14,
    "growth": {
      "hp": 62,
      "mp": 25,
      "atk": 10,
      "def": 10,
      "spd": 12
    },
    "spriteNum": 1,
    "spriteVariant": 2,
    "spriteKey": "npc2_1",
    "sprite": "./img/monsters/npc2_1.png",
    "description": "Độc Thụ Quái (cây chứa dịch độc) toàn thân tràn ngập nọc độc trí mạng. [khắc chế Phi Hành hệ]",
    "evolution": [
      -2
    ],
    "skills": [
      {
        "id": 1,
        "name": "Phong Lợi Tiêm Thứ",
        "type": "Thực Vật",
        "power": 22,
        "mpCost": 14,
        "accuracy": 95,
        "heal": 0,
        "buffDef": 0,
        "desc": "Phóng ra gai nhọn sắc bén như lưỡi cưa"
      },
      {
        "id": 2,
        "name": "Phi Diệp Đao Phong",
        "type": "Thực Vật",
        "power": 28,
        "mpCost": 18,
        "accuracy": 95,
        "heal": 0,
        "buffDef": 0,
        "desc": "Phóng bão lá sắc bén tựa ngàn lưỡi kiếm"
      },
      {
        "id": 4,
        "name": "Mộc Chi Cứu Thù",
        "type": "Thực Vật",
        "power": 46,
        "mpCost": 35,
        "accuracy": 95,
        "heal": 0,
        "buffDef": 0,
        "desc": "Chiêu thức tối thượng hệ Thực Vật hủy diệt kẻ địch"
      },
      {
        "id": 8,
        "name": "Thảo Nguyện Thuật",
        "type": "Hồi Phục",
        "power": 0,
        "mpCost": 18,
        "accuracy": 100,
        "heal": 40,
        "buffDef": 0,
        "desc": "Cầu nguyện thảo nguyên hồi 40% lượng máu tối đa"
      }
    ]
  },
  {
    "id": 4,
    "code": "cauvong_pet_4",
    "name": "Cổ Thụ Chi Vương",
    "type": "Thực Vật",
    "color": "#27ae60",
    "tier": 4,
    "baseHP": 35,
    "baseMP": 80,
    "baseATK": 16,
    "baseDEF": 12,
    "baseSPD": 16,
    "growth": {
      "hp": 82,
      "mp": 30,
      "atk": 11,
      "def": 12,
      "spd": 13
    },
    "spriteNum": 2,
    "spriteVariant": 0,
    "spriteKey": "npc2_2",
    "sprite": "./img/monsters/npc2_2.png",
    "description": "Tính tình ôn hòa trưởng giả, khi tức giận sẽ tạo nên uy lực mạnh mẽ có sức hủy diệt to lớn. [khắc chế Phi Hành hệ]",
    "evolution": [
      -2
    ],
    "skills": [
      {
        "id": 1,
        "name": "Phong Lợi Tiêm Thứ",
        "type": "Thực Vật",
        "power": 22,
        "mpCost": 14,
        "accuracy": 95,
        "heal": 0,
        "buffDef": 0,
        "desc": "Phóng ra gai nhọn sắc bén như lưỡi cưa"
      },
      {
        "id": 2,
        "name": "Phi Diệp Đao Phong",
        "type": "Thực Vật",
        "power": 28,
        "mpCost": 18,
        "accuracy": 95,
        "heal": 0,
        "buffDef": 0,
        "desc": "Phóng bão lá sắc bén tựa ngàn lưỡi kiếm"
      },
      {
        "id": 4,
        "name": "Mộc Chi Cứu Thù",
        "type": "Thực Vật",
        "power": 46,
        "mpCost": 35,
        "accuracy": 95,
        "heal": 0,
        "buffDef": 0,
        "desc": "Chiêu thức tối thượng hệ Thực Vật hủy diệt kẻ địch"
      },
      {
        "id": 8,
        "name": "Thảo Nguyện Thuật",
        "type": "Hồi Phục",
        "power": 0,
        "mpCost": 18,
        "accuracy": 100,
        "heal": 40,
        "buffDef": 0,
        "desc": "Cầu nguyện thảo nguyên hồi 40% lượng máu tối đa"
      }
    ]
  },
  {
    "id": 5,
    "code": "cauvong_pet_5",
    "name": "Cỏ thơm",
    "type": "Thực Vật",
    "color": "#27ae60",
    "tier": 1,
    "baseHP": 33,
    "baseMP": 80,
    "baseATK": 12,
    "baseDEF": 10,
    "baseSPD": 13,
    "growth": {
      "hp": 44,
      "mp": 15,
      "atk": 8,
      "def": 7,
      "spd": 9
    },
    "spriteNum": 3,
    "spriteVariant": 0,
    "spriteKey": "npc2_3",
    "sprite": "./img/monsters/npc2_3.png",
    "description": "Hoa ăn thịt người. [khắc chế Phi Hành hệ]",
    "evolution": [
      12,
      14,
      16
    ],
    "skills": [
      {
        "id": 0,
        "name": "Triền Nhiễu",
        "type": "Thực Vật",
        "power": 16,
        "mpCost": 10,
        "accuracy": 95,
        "heal": 0,
        "buffDef": 0,
        "desc": "Dây leo quấn chặt gây sát thương và khống chế"
      },
      {
        "id": 1,
        "name": "Phong Lợi Tiêm Thứ",
        "type": "Thực Vật",
        "power": 22,
        "mpCost": 14,
        "accuracy": 95,
        "heal": 0,
        "buffDef": 0,
        "desc": "Phóng ra gai nhọn sắc bén như lưỡi cưa"
      },
      {
        "id": 2,
        "name": "Phi Diệp Đao Phong",
        "type": "Thực Vật",
        "power": 28,
        "mpCost": 18,
        "accuracy": 95,
        "heal": 0,
        "buffDef": 0,
        "desc": "Phóng bão lá sắc bén tựa ngàn lưỡi kiếm"
      },
      {
        "id": 6,
        "name": "Châm Diệp Trảm",
        "type": "Thực Vật",
        "power": 26,
        "mpCost": 18,
        "accuracy": 95,
        "heal": 0,
        "buffDef": 0,
        "desc": "Lưỡi trảm lá kim xuyên thủng lớp phòng hộ"
      }
    ]
  },
  {
    "id": 6,
    "code": "cauvong_pet_6",
    "name": "Hoa ngũ sắc",
    "type": "Thực Vật",
    "color": "#27ae60",
    "tier": 2,
    "baseHP": 33,
    "baseMP": 80,
    "baseATK": 12,
    "baseDEF": 11,
    "baseSPD": 14,
    "growth": {
      "hp": 50,
      "mp": 20,
      "atk": 9,
      "def": 8,
      "spd": 10
    },
    "spriteNum": 3,
    "spriteVariant": 1,
    "spriteKey": "npc2_3",
    "sprite": "./img/monsters/npc2_3.png",
    "description": "Loài thực vật có đôi môi gợi cảm kỳ lạ. [khắc chế Phi Hành hệ]",
    "evolution": [
      -2
    ],
    "skills": [
      {
        "id": 0,
        "name": "Triền Nhiễu",
        "type": "Thực Vật",
        "power": 16,
        "mpCost": 10,
        "accuracy": 95,
        "heal": 0,
        "buffDef": 0,
        "desc": "Dây leo quấn chặt gây sát thương và khống chế"
      },
      {
        "id": 1,
        "name": "Phong Lợi Tiêm Thứ",
        "type": "Thực Vật",
        "power": 22,
        "mpCost": 14,
        "accuracy": 95,
        "heal": 0,
        "buffDef": 0,
        "desc": "Phóng ra gai nhọn sắc bén như lưỡi cưa"
      },
      {
        "id": 2,
        "name": "Phi Diệp Đao Phong",
        "type": "Thực Vật",
        "power": 28,
        "mpCost": 18,
        "accuracy": 95,
        "heal": 0,
        "buffDef": 0,
        "desc": "Phóng bão lá sắc bén tựa ngàn lưỡi kiếm"
      },
      {
        "id": 3,
        "name": "Sâm Lâm Bạo Phát",
        "type": "Thực Vật",
        "power": 36,
        "mpCost": 26,
        "accuracy": 95,
        "heal": 0,
        "buffDef": 0,
        "desc": "Sức mạnh rừng thẳm bộc phát đè bẹp đối phương"
      }
    ]
  },
  {
    "id": 7,
    "code": "cauvong_pet_7",
    "name": "Hoa ăn thịt người",
    "type": "Thực Vật",
    "color": "#27ae60",
    "tier": 3,
    "baseHP": 34,
    "baseMP": 80,
    "baseATK": 13,
    "baseDEF": 11,
    "baseSPD": 14,
    "growth": {
      "hp": 66,
      "mp": 25,
      "atk": 10,
      "def": 10,
      "spd": 12
    },
    "spriteNum": 3,
    "spriteVariant": 2,
    "spriteKey": "npc2_3",
    "sprite": "./img/monsters/npc2_3.png",
    "description": "Lợi dụng bề ngoài có 5 sắc màu hấp dẫn con mồi, sau đó xơi tái con mồi chỉ với một ngụm. [khắc chế Phi Hành hệ]",
    "evolution": [
      -3
    ],
    "skills": [
      {
        "id": 1,
        "name": "Phong Lợi Tiêm Thứ",
        "type": "Thực Vật",
        "power": 22,
        "mpCost": 14,
        "accuracy": 95,
        "heal": 0,
        "buffDef": 0,
        "desc": "Phóng ra gai nhọn sắc bén như lưỡi cưa"
      },
      {
        "id": 2,
        "name": "Phi Diệp Đao Phong",
        "type": "Thực Vật",
        "power": 28,
        "mpCost": 18,
        "accuracy": 95,
        "heal": 0,
        "buffDef": 0,
        "desc": "Phóng bão lá sắc bén tựa ngàn lưỡi kiếm"
      },
      {
        "id": 4,
        "name": "Mộc Chi Cứu Thù",
        "type": "Thực Vật",
        "power": 46,
        "mpCost": 35,
        "accuracy": 95,
        "heal": 0,
        "buffDef": 0,
        "desc": "Chiêu thức tối thượng hệ Thực Vật hủy diệt kẻ địch"
      },
      {
        "id": 8,
        "name": "Thảo Nguyện Thuật",
        "type": "Hồi Phục",
        "power": 0,
        "mpCost": 18,
        "accuracy": 100,
        "heal": 40,
        "buffDef": 0,
        "desc": "Cầu nguyện thảo nguyên hồi 40% lượng máu tối đa"
      }
    ]
  },
  {
    "id": 8,
    "code": "cauvong_pet_8",
    "name": "Thảo quả",
    "type": "Thực Vật",
    "color": "#27ae60",
    "tier": 1,
    "baseHP": 32,
    "baseMP": 80,
    "baseATK": 12,
    "baseDEF": 10,
    "baseSPD": 13,
    "growth": {
      "hp": 42,
      "mp": 15,
      "atk": 8,
      "def": 6,
      "spd": 8
    },
    "spriteNum": 4,
    "spriteVariant": 0,
    "spriteKey": "npc2_4",
    "sprite": "./img/monsters/npc2_4.png",
    "description": "Trái cây thần kỳ đã hóa hình hài con người. [khắc chế Phi Hành hệ]",
    "evolution": [
      13,
      16,
      17
    ],
    "skills": [
      {
        "id": 0,
        "name": "Triền Nhiễu",
        "type": "Thực Vật",
        "power": 16,
        "mpCost": 10,
        "accuracy": 95,
        "heal": 0,
        "buffDef": 0,
        "desc": "Dây leo quấn chặt gây sát thương và khống chế"
      },
      {
        "id": 1,
        "name": "Phong Lợi Tiêm Thứ",
        "type": "Thực Vật",
        "power": 22,
        "mpCost": 14,
        "accuracy": 95,
        "heal": 0,
        "buffDef": 0,
        "desc": "Phóng ra gai nhọn sắc bén như lưỡi cưa"
      },
      {
        "id": 2,
        "name": "Phi Diệp Đao Phong",
        "type": "Thực Vật",
        "power": 28,
        "mpCost": 18,
        "accuracy": 95,
        "heal": 0,
        "buffDef": 0,
        "desc": "Phóng bão lá sắc bén tựa ngàn lưỡi kiếm"
      },
      {
        "id": 6,
        "name": "Châm Diệp Trảm",
        "type": "Thực Vật",
        "power": 26,
        "mpCost": 18,
        "accuracy": 95,
        "heal": 0,
        "buffDef": 0,
        "desc": "Lưỡi trảm lá kim xuyên thủng lớp phòng hộ"
      }
    ]
  },
  {
    "id": 9,
    "code": "cauvong_pet_9",
    "name": "Mạn đà la",
    "type": "Thực Vật",
    "color": "#27ae60",
    "tier": 2,
    "baseHP": 33,
    "baseMP": 80,
    "baseATK": 13,
    "baseDEF": 11,
    "baseSPD": 14,
    "growth": {
      "hp": 58,
      "mp": 20,
      "atk": 9,
      "def": 8,
      "spd": 10
    },
    "spriteNum": 4,
    "spriteVariant": 1,
    "spriteKey": "npc2_4",
    "sprite": "./img/monsters/npc2_4.png",
    "description": "Có sức mạnh đặc biệt tạo thành ngòi nổ, thực lực bất phàm. [khắc chế Phi Hành hệ]",
    "evolution": [
      -2
    ],
    "skills": [
      {
        "id": 0,
        "name": "Triền Nhiễu",
        "type": "Thực Vật",
        "power": 16,
        "mpCost": 10,
        "accuracy": 95,
        "heal": 0,
        "buffDef": 0,
        "desc": "Dây leo quấn chặt gây sát thương và khống chế"
      },
      {
        "id": 1,
        "name": "Phong Lợi Tiêm Thứ",
        "type": "Thực Vật",
        "power": 22,
        "mpCost": 14,
        "accuracy": 95,
        "heal": 0,
        "buffDef": 0,
        "desc": "Phóng ra gai nhọn sắc bén như lưỡi cưa"
      },
      {
        "id": 2,
        "name": "Phi Diệp Đao Phong",
        "type": "Thực Vật",
        "power": 28,
        "mpCost": 18,
        "accuracy": 95,
        "heal": 0,
        "buffDef": 0,
        "desc": "Phóng bão lá sắc bén tựa ngàn lưỡi kiếm"
      },
      {
        "id": 3,
        "name": "Sâm Lâm Bạo Phát",
        "type": "Thực Vật",
        "power": 36,
        "mpCost": 26,
        "accuracy": 95,
        "heal": 0,
        "buffDef": 0,
        "desc": "Sức mạnh rừng thẳm bộc phát đè bẹp đối phương"
      }
    ]
  },
  {
    "id": 10,
    "code": "cauvong_pet_10",
    "name": "Hoa Mạn đà la",
    "type": "Thực Vật",
    "color": "#27ae60",
    "tier": 3,
    "baseHP": 34,
    "baseMP": 80,
    "baseATK": 14,
    "baseDEF": 11,
    "baseSPD": 15,
    "growth": {
      "hp": 74,
      "mp": 25,
      "atk": 10,
      "def": 10,
      "spd": 12
    },
    "spriteNum": 4,
    "spriteVariant": 2,
    "spriteKey": "npc2_4",
    "sprite": "./img/monsters/npc2_4.png",
    "description": "Đóa hoa tiên nở rộ rất xinh đẹp trong xứ xở của Thực Vật hệ. [khắc chế Phi Hành hệ]",
    "evolution": [
      -2
    ],
    "skills": [
      {
        "id": 1,
        "name": "Phong Lợi Tiêm Thứ",
        "type": "Thực Vật",
        "power": 22,
        "mpCost": 14,
        "accuracy": 95,
        "heal": 0,
        "buffDef": 0,
        "desc": "Phóng ra gai nhọn sắc bén như lưỡi cưa"
      },
      {
        "id": 2,
        "name": "Phi Diệp Đao Phong",
        "type": "Thực Vật",
        "power": 28,
        "mpCost": 18,
        "accuracy": 95,
        "heal": 0,
        "buffDef": 0,
        "desc": "Phóng bão lá sắc bén tựa ngàn lưỡi kiếm"
      },
      {
        "id": 4,
        "name": "Mộc Chi Cứu Thù",
        "type": "Thực Vật",
        "power": 46,
        "mpCost": 35,
        "accuracy": 95,
        "heal": 0,
        "buffDef": 0,
        "desc": "Chiêu thức tối thượng hệ Thực Vật hủy diệt kẻ địch"
      },
      {
        "id": 8,
        "name": "Thảo Nguyện Thuật",
        "type": "Hồi Phục",
        "power": 0,
        "mpCost": 18,
        "accuracy": 100,
        "heal": 40,
        "buffDef": 0,
        "desc": "Cầu nguyện thảo nguyên hồi 40% lượng máu tối đa"
      }
    ]
  },
  {
    "id": 11,
    "code": "cauvong_pet_11",
    "name": "Tiên Nhân Chưởng",
    "type": "Thực Vật",
    "color": "#27ae60",
    "tier": 1,
    "baseHP": 32,
    "baseMP": 80,
    "baseATK": 12,
    "baseDEF": 10,
    "baseSPD": 13,
    "growth": {
      "hp": 52,
      "mp": 15,
      "atk": 8,
      "def": 8,
      "spd": 8
    },
    "spriteNum": 5,
    "spriteVariant": 0,
    "spriteKey": "npc2_5",
    "sprite": "./img/monsters/npc2_5.png",
    "description": "Tiên Nhân Chưởng Thực Vật hệ toàn thân bao trùm bộ gai nhọn dài khắp. [khắc chế Phi Hành hệ]",
    "evolution": [
      11,
      12,
      13
    ],
    "skills": [
      {
        "id": 0,
        "name": "Triền Nhiễu",
        "type": "Thực Vật",
        "power": 16,
        "mpCost": 10,
        "accuracy": 95,
        "heal": 0,
        "buffDef": 0,
        "desc": "Dây leo quấn chặt gây sát thương và khống chế"
      },
      {
        "id": 1,
        "name": "Phong Lợi Tiêm Thứ",
        "type": "Thực Vật",
        "power": 22,
        "mpCost": 14,
        "accuracy": 95,
        "heal": 0,
        "buffDef": 0,
        "desc": "Phóng ra gai nhọn sắc bén như lưỡi cưa"
      },
      {
        "id": 2,
        "name": "Phi Diệp Đao Phong",
        "type": "Thực Vật",
        "power": 28,
        "mpCost": 18,
        "accuracy": 95,
        "heal": 0,
        "buffDef": 0,
        "desc": "Phóng bão lá sắc bén tựa ngàn lưỡi kiếm"
      },
      {
        "id": 6,
        "name": "Châm Diệp Trảm",
        "type": "Thực Vật",
        "power": 26,
        "mpCost": 18,
        "accuracy": 95,
        "heal": 0,
        "buffDef": 0,
        "desc": "Lưỡi trảm lá kim xuyên thủng lớp phòng hộ"
      }
    ]
  },
  {
    "id": 12,
    "code": "cauvong_pet_12",
    "name": "Gai khổng lồ",
    "type": "Thực Vật",
    "color": "#27ae60",
    "tier": 2,
    "baseHP": 32,
    "baseMP": 80,
    "baseATK": 12,
    "baseDEF": 10,
    "baseSPD": 13,
    "growth": {
      "hp": 56,
      "mp": 20,
      "atk": 9,
      "def": 8,
      "spd": 10
    },
    "spriteNum": 5,
    "spriteVariant": 1,
    "spriteKey": "npc2_5",
    "sprite": "./img/monsters/npc2_5.png",
    "description": "Sử dụng những cái gai bọc quanh thân làm thứ vũ khí đánh lui kẻ địch. [khắc chế Phi Hành hệ]",
    "evolution": [
      -2
    ],
    "skills": [
      {
        "id": 0,
        "name": "Triền Nhiễu",
        "type": "Thực Vật",
        "power": 16,
        "mpCost": 10,
        "accuracy": 95,
        "heal": 0,
        "buffDef": 0,
        "desc": "Dây leo quấn chặt gây sát thương và khống chế"
      },
      {
        "id": 1,
        "name": "Phong Lợi Tiêm Thứ",
        "type": "Thực Vật",
        "power": 22,
        "mpCost": 14,
        "accuracy": 95,
        "heal": 0,
        "buffDef": 0,
        "desc": "Phóng ra gai nhọn sắc bén như lưỡi cưa"
      },
      {
        "id": 2,
        "name": "Phi Diệp Đao Phong",
        "type": "Thực Vật",
        "power": 28,
        "mpCost": 18,
        "accuracy": 95,
        "heal": 0,
        "buffDef": 0,
        "desc": "Phóng bão lá sắc bén tựa ngàn lưỡi kiếm"
      },
      {
        "id": 3,
        "name": "Sâm Lâm Bạo Phát",
        "type": "Thực Vật",
        "power": 36,
        "mpCost": 26,
        "accuracy": 95,
        "heal": 0,
        "buffDef": 0,
        "desc": "Sức mạnh rừng thẳm bộc phát đè bẹp đối phương"
      }
    ]
  },
  {
    "id": 13,
    "code": "cauvong_pet_13",
    "name": "Gai độc",
    "type": "Thực Vật",
    "color": "#27ae60",
    "tier": 3,
    "baseHP": 34,
    "baseMP": 80,
    "baseATK": 14,
    "baseDEF": 11,
    "baseSPD": 15,
    "growth": {
      "hp": 68,
      "mp": 25,
      "atk": 10,
      "def": 10,
      "spd": 12
    },
    "spriteNum": 5,
    "spriteVariant": 2,
    "spriteKey": "npc2_5",
    "sprite": "./img/monsters/npc2_5.png",
    "description": "Gai độc quanh thân khi cần có khả năng tạo nên uy lực mạnh mẽ làm kẻ địch lập tức bị mất mạng. [khắc chế Phi Hành hệ]",
    "evolution": [
      -2
    ],
    "skills": [
      {
        "id": 1,
        "name": "Phong Lợi Tiêm Thứ",
        "type": "Thực Vật",
        "power": 22,
        "mpCost": 14,
        "accuracy": 95,
        "heal": 0,
        "buffDef": 0,
        "desc": "Phóng ra gai nhọn sắc bén như lưỡi cưa"
      },
      {
        "id": 2,
        "name": "Phi Diệp Đao Phong",
        "type": "Thực Vật",
        "power": 28,
        "mpCost": 18,
        "accuracy": 95,
        "heal": 0,
        "buffDef": 0,
        "desc": "Phóng bão lá sắc bén tựa ngàn lưỡi kiếm"
      },
      {
        "id": 4,
        "name": "Mộc Chi Cứu Thù",
        "type": "Thực Vật",
        "power": 46,
        "mpCost": 35,
        "accuracy": 95,
        "heal": 0,
        "buffDef": 0,
        "desc": "Chiêu thức tối thượng hệ Thực Vật hủy diệt kẻ địch"
      },
      {
        "id": 8,
        "name": "Thảo Nguyện Thuật",
        "type": "Hồi Phục",
        "power": 0,
        "mpCost": 18,
        "accuracy": 100,
        "heal": 40,
        "buffDef": 0,
        "desc": "Cầu nguyện thảo nguyên hồi 40% lượng máu tối đa"
      }
    ]
  },
  {
    "id": 14,
    "code": "cauvong_pet_14",
    "name": "Quả Tử Tiểu Tả",
    "type": "Thực Vật",
    "color": "#27ae60",
    "tier": 1,
    "baseHP": 32,
    "baseMP": 80,
    "baseATK": 12,
    "baseDEF": 10,
    "baseSPD": 12,
    "growth": {
      "hp": 34,
      "mp": 15,
      "atk": 8,
      "def": 7,
      "spd": 10
    },
    "spriteNum": 6,
    "spriteVariant": 0,
    "spriteKey": "npc2_6",
    "sprite": "./img/monsters/npc2_6.png",
    "description": "Tiểu cô nương rất mê bộ môn khiêu vũ. [khắc chế Phi Hành hệ]",
    "evolution": [
      -1
    ],
    "skills": [
      {
        "id": 0,
        "name": "Triền Nhiễu",
        "type": "Thực Vật",
        "power": 16,
        "mpCost": 10,
        "accuracy": 95,
        "heal": 0,
        "buffDef": 0,
        "desc": "Dây leo quấn chặt gây sát thương và khống chế"
      },
      {
        "id": 1,
        "name": "Phong Lợi Tiêm Thứ",
        "type": "Thực Vật",
        "power": 22,
        "mpCost": 14,
        "accuracy": 95,
        "heal": 0,
        "buffDef": 0,
        "desc": "Phóng ra gai nhọn sắc bén như lưỡi cưa"
      },
      {
        "id": 2,
        "name": "Phi Diệp Đao Phong",
        "type": "Thực Vật",
        "power": 28,
        "mpCost": 18,
        "accuracy": 95,
        "heal": 0,
        "buffDef": 0,
        "desc": "Phóng bão lá sắc bén tựa ngàn lưỡi kiếm"
      },
      {
        "id": 6,
        "name": "Châm Diệp Trảm",
        "type": "Thực Vật",
        "power": 26,
        "mpCost": 18,
        "accuracy": 95,
        "heal": 0,
        "buffDef": 0,
        "desc": "Lưỡi trảm lá kim xuyên thủng lớp phòng hộ"
      }
    ]
  },
  {
    "id": 15,
    "code": "cauvong_pet_15",
    "name": "Tứ Diệp Tiểu Tả",
    "type": "Thực Vật",
    "color": "#27ae60",
    "tier": 2,
    "baseHP": 33,
    "baseMP": 80,
    "baseATK": 13,
    "baseDEF": 11,
    "baseSPD": 13,
    "growth": {
      "hp": 58,
      "mp": 20,
      "atk": 9,
      "def": 8,
      "spd": 10
    },
    "spriteNum": 6,
    "spriteVariant": 1,
    "spriteKey": "npc2_6",
    "sprite": "./img/monsters/npc2_6.png",
    "description": "Tiểu cô nương Hawaii phong tình. [khắc chế Phi Hành hệ]",
    "evolution": [
      -5
    ],
    "skills": [
      {
        "id": 0,
        "name": "Triền Nhiễu",
        "type": "Thực Vật",
        "power": 16,
        "mpCost": 10,
        "accuracy": 95,
        "heal": 0,
        "buffDef": 0,
        "desc": "Dây leo quấn chặt gây sát thương và khống chế"
      },
      {
        "id": 1,
        "name": "Phong Lợi Tiêm Thứ",
        "type": "Thực Vật",
        "power": 22,
        "mpCost": 14,
        "accuracy": 95,
        "heal": 0,
        "buffDef": 0,
        "desc": "Phóng ra gai nhọn sắc bén như lưỡi cưa"
      },
      {
        "id": 2,
        "name": "Phi Diệp Đao Phong",
        "type": "Thực Vật",
        "power": 28,
        "mpCost": 18,
        "accuracy": 95,
        "heal": 0,
        "buffDef": 0,
        "desc": "Phóng bão lá sắc bén tựa ngàn lưỡi kiếm"
      },
      {
        "id": 3,
        "name": "Sâm Lâm Bạo Phát",
        "type": "Thực Vật",
        "power": 36,
        "mpCost": 26,
        "accuracy": 95,
        "heal": 0,
        "buffDef": 0,
        "desc": "Sức mạnh rừng thẳm bộc phát đè bẹp đối phương"
      }
    ]
  },
  {
    "id": 16,
    "code": "cauvong_pet_16",
    "name": "Bá Vương Hoa",
    "type": "Thực Vật",
    "color": "#27ae60",
    "tier": 4,
    "baseHP": 34,
    "baseMP": 80,
    "baseATK": 14,
    "baseDEF": 12,
    "baseSPD": 14,
    "growth": {
      "hp": 74,
      "mp": 25,
      "atk": 10,
      "def": 12,
      "spd": 12
    },
    "spriteNum": 4,
    "spriteVariant": 3,
    "spriteKey": "npc2_4",
    "sprite": "./img/monsters/npc2_4.png",
    "description": "Nữ Vương Hoa Tiên khí chất bất phàm. [khắc chế Phi Hành hệ]",
    "evolution": [
      -1
    ],
    "skills": [
      {
        "id": 1,
        "name": "Phong Lợi Tiêm Thứ",
        "type": "Thực Vật",
        "power": 22,
        "mpCost": 14,
        "accuracy": 95,
        "heal": 0,
        "buffDef": 0,
        "desc": "Phóng ra gai nhọn sắc bén như lưỡi cưa"
      },
      {
        "id": 2,
        "name": "Phi Diệp Đao Phong",
        "type": "Thực Vật",
        "power": 28,
        "mpCost": 18,
        "accuracy": 95,
        "heal": 0,
        "buffDef": 0,
        "desc": "Phóng bão lá sắc bén tựa ngàn lưỡi kiếm"
      },
      {
        "id": 4,
        "name": "Mộc Chi Cứu Thù",
        "type": "Thực Vật",
        "power": 46,
        "mpCost": 35,
        "accuracy": 95,
        "heal": 0,
        "buffDef": 0,
        "desc": "Chiêu thức tối thượng hệ Thực Vật hủy diệt kẻ địch"
      },
      {
        "id": 8,
        "name": "Thảo Nguyện Thuật",
        "type": "Hồi Phục",
        "power": 0,
        "mpCost": 18,
        "accuracy": 100,
        "heal": 40,
        "buffDef": 0,
        "desc": "Cầu nguyện thảo nguyên hồi 40% lượng máu tối đa"
      }
    ]
  },
  {
    "id": 17,
    "code": "cauvong_pet_17",
    "name": "Ái Tâm Thảo",
    "type": "Thực Vật",
    "color": "#27ae60",
    "tier": 4,
    "baseHP": 34,
    "baseMP": 80,
    "baseATK": 14,
    "baseDEF": 12,
    "baseSPD": 14,
    "growth": {
      "hp": 75,
      "mp": 25,
      "atk": 10,
      "def": 11,
      "spd": 12
    },
    "spriteNum": 6,
    "spriteVariant": 2,
    "spriteKey": "npc2_6",
    "sprite": "./img/monsters/npc2_6.png",
    "description": "Phi Vẫn một đại biểu ái tâm. [khắc chế Phi Hành hệ]",
    "evolution": [
      -5
    ],
    "skills": [
      {
        "id": 1,
        "name": "Phong Lợi Tiêm Thứ",
        "type": "Thực Vật",
        "power": 22,
        "mpCost": 14,
        "accuracy": 95,
        "heal": 0,
        "buffDef": 0,
        "desc": "Phóng ra gai nhọn sắc bén như lưỡi cưa"
      },
      {
        "id": 2,
        "name": "Phi Diệp Đao Phong",
        "type": "Thực Vật",
        "power": 28,
        "mpCost": 18,
        "accuracy": 95,
        "heal": 0,
        "buffDef": 0,
        "desc": "Phóng bão lá sắc bén tựa ngàn lưỡi kiếm"
      },
      {
        "id": 4,
        "name": "Mộc Chi Cứu Thù",
        "type": "Thực Vật",
        "power": 46,
        "mpCost": 35,
        "accuracy": 95,
        "heal": 0,
        "buffDef": 0,
        "desc": "Chiêu thức tối thượng hệ Thực Vật hủy diệt kẻ địch"
      },
      {
        "id": 8,
        "name": "Thảo Nguyện Thuật",
        "type": "Hồi Phục",
        "power": 0,
        "mpCost": 18,
        "accuracy": 100,
        "heal": 40,
        "buffDef": 0,
        "desc": "Cầu nguyện thảo nguyên hồi 40% lượng máu tối đa"
      }
    ]
  },
  {
    "id": 18,
    "code": "cauvong_pet_18",
    "name": "Bạch Liệt Sư",
    "type": "Kim Loại",
    "color": "#f39c12",
    "tier": 1,
    "baseHP": 36,
    "baseMP": 80,
    "baseATK": 13,
    "baseDEF": 10,
    "baseSPD": 11,
    "growth": {
      "hp": 50,
      "mp": 15,
      "atk": 9,
      "def": 7,
      "spd": 7
    },
    "spriteNum": 7,
    "spriteVariant": 0,
    "spriteKey": "npc2_7",
    "sprite": "./img/monsters/npc2_7.png",
    "description": "Sư tử dũng mãnh với một lớp bạch kim bao trùm dáng vẻ bên ngoài. [khắc chế Mãnh Thú hệ]",
    "evolution": [
      -1
    ],
    "skills": [
      {
        "id": 10,
        "name": "Thiết Quyền",
        "type": "Kim Loại",
        "power": 16,
        "mpCost": 10,
        "accuracy": 95,
        "heal": 0,
        "buffDef": 0,
        "desc": "Nắm đấm kim loại nặng nề nện thẳng mục tiêu"
      },
      {
        "id": 11,
        "name": "Cương Thiết Trảm",
        "type": "Kim Loại",
        "power": 22,
        "mpCost": 14,
        "accuracy": 95,
        "heal": 0,
        "buffDef": 0,
        "desc": "Đường kiếm thép sắc lạnh chém đứt giáp trụ"
      },
      {
        "id": 12,
        "name": "Kim Tinh Xung Kích",
        "type": "Kim Loại",
        "power": 28,
        "mpCost": 19,
        "accuracy": 95,
        "heal": 0,
        "buffDef": 0,
        "desc": "Lao thẳng với mũi khoan kim cương cực mạnh"
      },
      {
        "id": 16,
        "name": "Bão Cát",
        "type": "Kim Loại",
        "power": 24,
        "mpCost": 16,
        "accuracy": 90,
        "heal": 0,
        "buffDef": 0,
        "desc": "Cơn bão bụi cát cuốn xé và giảm tầm nhìn địch"
      }
    ]
  },
  {
    "id": 19,
    "code": "cauvong_pet_19",
    "name": "Vương Sư",
    "type": "Kim Loại",
    "color": "#f39c12",
    "tier": 2,
    "baseHP": 37,
    "baseMP": 80,
    "baseATK": 14,
    "baseDEF": 10,
    "baseSPD": 11,
    "growth": {
      "hp": 64,
      "mp": 20,
      "atk": 10,
      "def": 9,
      "spd": 7
    },
    "spriteNum": 7,
    "spriteVariant": 1,
    "spriteKey": "npc2_7",
    "sprite": "./img/monsters/npc2_7.png",
    "description": "Kim Loại Chi Vương, trên người tản ra khí phách vô cùng mạnh mẽ. [khắc chế Mãnh Thú hệ]",
    "evolution": [
      -2
    ],
    "skills": [
      {
        "id": 10,
        "name": "Thiết Quyền",
        "type": "Kim Loại",
        "power": 16,
        "mpCost": 10,
        "accuracy": 95,
        "heal": 0,
        "buffDef": 0,
        "desc": "Nắm đấm kim loại nặng nề nện thẳng mục tiêu"
      },
      {
        "id": 11,
        "name": "Cương Thiết Trảm",
        "type": "Kim Loại",
        "power": 22,
        "mpCost": 14,
        "accuracy": 95,
        "heal": 0,
        "buffDef": 0,
        "desc": "Đường kiếm thép sắc lạnh chém đứt giáp trụ"
      },
      {
        "id": 12,
        "name": "Kim Tinh Xung Kích",
        "type": "Kim Loại",
        "power": 28,
        "mpCost": 19,
        "accuracy": 95,
        "heal": 0,
        "buffDef": 0,
        "desc": "Lao thẳng với mũi khoan kim cương cực mạnh"
      },
      {
        "id": 13,
        "name": "Bạo Liệt Thiết Toản",
        "type": "Kim Loại",
        "power": 36,
        "mpCost": 26,
        "accuracy": 95,
        "heal": 0,
        "buffDef": 0,
        "desc": "Mũi khoan thép bạo nổ gây chấn thương diện rộng"
      }
    ]
  },
  {
    "id": 20,
    "code": "cauvong_pet_20",
    "name": "Đế Vương Sư",
    "type": "Kim Loại",
    "color": "#f39c12",
    "tier": 3,
    "baseHP": 38,
    "baseMP": 80,
    "baseATK": 15,
    "baseDEF": 11,
    "baseSPD": 12,
    "growth": {
      "hp": 88,
      "mp": 25,
      "atk": 11,
      "def": 11,
      "spd": 9
    },
    "spriteNum": 8,
    "spriteVariant": 0,
    "spriteKey": "npc2_8",
    "sprite": "./img/monsters/npc2_8.png",
    "description": "Vương Giả, khí thế làm cho không kẻ nào có thể tới gần. [khắc chế Mãnh Thú hệ]",
    "evolution": [
      -2
    ],
    "skills": [
      {
        "id": 11,
        "name": "Cương Thiết Trảm",
        "type": "Kim Loại",
        "power": 22,
        "mpCost": 14,
        "accuracy": 95,
        "heal": 0,
        "buffDef": 0,
        "desc": "Đường kiếm thép sắc lạnh chém đứt giáp trụ"
      },
      {
        "id": 12,
        "name": "Kim Tinh Xung Kích",
        "type": "Kim Loại",
        "power": 28,
        "mpCost": 19,
        "accuracy": 95,
        "heal": 0,
        "buffDef": 0,
        "desc": "Lao thẳng với mũi khoan kim cương cực mạnh"
      },
      {
        "id": 14,
        "name": "Trảm Kim Đoạn Ngọc",
        "type": "Kim Loại",
        "power": 48,
        "mpCost": 36,
        "accuracy": 95,
        "heal": 0,
        "buffDef": 0,
        "desc": "Tuyệt kỹ kim loại chém sắt gãy ngọc vô song"
      },
      {
        "id": 19,
        "name": "Cương Cân Thiết Cốt",
        "type": "Phòng Ngự",
        "power": 0,
        "mpCost": 14,
        "accuracy": 100,
        "heal": 0,
        "buffDef": 45,
        "desc": "Biến cơ thể thành khối kim cương siêu cứng"
      }
    ]
  },
  {
    "id": 21,
    "code": "cauvong_pet_21",
    "name": "Thủy Tinh Hùng Sư",
    "type": "Kim Loại",
    "color": "#f39c12",
    "tier": 4,
    "baseHP": 38,
    "baseMP": 80,
    "baseATK": 16,
    "baseDEF": 13,
    "baseSPD": 14,
    "growth": {
      "hp": 100,
      "mp": 30,
      "atk": 12,
      "def": 12,
      "spd": 12
    },
    "spriteNum": 8,
    "spriteVariant": 1,
    "spriteKey": "npc2_8",
    "sprite": "./img/monsters/npc2_8.png",
    "description": "Phát ra hào quang thần thánh của loài sư tử mạnh mẽ, Kim Loại hệ mạnh nhất! [khắc chế Mãnh Thú hệ]",
    "evolution": [
      -2
    ],
    "skills": [
      {
        "id": 11,
        "name": "Cương Thiết Trảm",
        "type": "Kim Loại",
        "power": 22,
        "mpCost": 14,
        "accuracy": 95,
        "heal": 0,
        "buffDef": 0,
        "desc": "Đường kiếm thép sắc lạnh chém đứt giáp trụ"
      },
      {
        "id": 12,
        "name": "Kim Tinh Xung Kích",
        "type": "Kim Loại",
        "power": 28,
        "mpCost": 19,
        "accuracy": 95,
        "heal": 0,
        "buffDef": 0,
        "desc": "Lao thẳng với mũi khoan kim cương cực mạnh"
      },
      {
        "id": 14,
        "name": "Trảm Kim Đoạn Ngọc",
        "type": "Kim Loại",
        "power": 48,
        "mpCost": 36,
        "accuracy": 95,
        "heal": 0,
        "buffDef": 0,
        "desc": "Tuyệt kỹ kim loại chém sắt gãy ngọc vô song"
      },
      {
        "id": 19,
        "name": "Cương Cân Thiết Cốt",
        "type": "Phòng Ngự",
        "power": 0,
        "mpCost": 14,
        "accuracy": 100,
        "heal": 0,
        "buffDef": 45,
        "desc": "Biến cơ thể thành khối kim cương siêu cứng"
      }
    ]
  },
  {
    "id": 22,
    "code": "cauvong_pet_22",
    "name": "Xích Đồng Xà",
    "type": "Kim Loại",
    "color": "#f39c12",
    "tier": 1,
    "baseHP": 35,
    "baseMP": 80,
    "baseATK": 13,
    "baseDEF": 10,
    "baseSPD": 11,
    "growth": {
      "hp": 48,
      "mp": 15,
      "atk": 9,
      "def": 7,
      "spd": 6
    },
    "spriteNum": 9,
    "spriteVariant": 0,
    "spriteKey": "npc2_9",
    "sprite": "./img/monsters/npc2_9.png",
    "description": "Hoạt động sâu trong lòng đất, món ăn ưa thích chính là quặng đồng. [khắc chế Mãnh Thú hệ]",
    "evolution": [
      6,
      10,
      22
    ],
    "skills": [
      {
        "id": 10,
        "name": "Thiết Quyền",
        "type": "Kim Loại",
        "power": 16,
        "mpCost": 10,
        "accuracy": 95,
        "heal": 0,
        "buffDef": 0,
        "desc": "Nắm đấm kim loại nặng nề nện thẳng mục tiêu"
      },
      {
        "id": 11,
        "name": "Cương Thiết Trảm",
        "type": "Kim Loại",
        "power": 22,
        "mpCost": 14,
        "accuracy": 95,
        "heal": 0,
        "buffDef": 0,
        "desc": "Đường kiếm thép sắc lạnh chém đứt giáp trụ"
      },
      {
        "id": 12,
        "name": "Kim Tinh Xung Kích",
        "type": "Kim Loại",
        "power": 28,
        "mpCost": 19,
        "accuracy": 95,
        "heal": 0,
        "buffDef": 0,
        "desc": "Lao thẳng với mũi khoan kim cương cực mạnh"
      },
      {
        "id": 16,
        "name": "Bão Cát",
        "type": "Kim Loại",
        "power": 24,
        "mpCost": 16,
        "accuracy": 90,
        "heal": 0,
        "buffDef": 0,
        "desc": "Cơn bão bụi cát cuốn xé và giảm tầm nhìn địch"
      }
    ]
  },
  {
    "id": 23,
    "code": "cauvong_pet_23",
    "name": "Thiết Giáp Xà",
    "type": "Kim Loại",
    "color": "#f39c12",
    "tier": 2,
    "baseHP": 36,
    "baseMP": 80,
    "baseATK": 14,
    "baseDEF": 10,
    "baseSPD": 11,
    "growth": {
      "hp": 60,
      "mp": 20,
      "atk": 10,
      "def": 9,
      "spd": 7
    },
    "spriteNum": 10,
    "spriteVariant": 0,
    "spriteKey": "npc2_10",
    "sprite": "./img/monsters/npc2_10.png",
    "description": "Sủng vật bề ngoài được bao bởi một lớp kim loại kỳ quái. [khắc chế Mãnh Thú hệ]",
    "evolution": [
      -2
    ],
    "skills": [
      {
        "id": 10,
        "name": "Thiết Quyền",
        "type": "Kim Loại",
        "power": 16,
        "mpCost": 10,
        "accuracy": 95,
        "heal": 0,
        "buffDef": 0,
        "desc": "Nắm đấm kim loại nặng nề nện thẳng mục tiêu"
      },
      {
        "id": 11,
        "name": "Cương Thiết Trảm",
        "type": "Kim Loại",
        "power": 22,
        "mpCost": 14,
        "accuracy": 95,
        "heal": 0,
        "buffDef": 0,
        "desc": "Đường kiếm thép sắc lạnh chém đứt giáp trụ"
      },
      {
        "id": 12,
        "name": "Kim Tinh Xung Kích",
        "type": "Kim Loại",
        "power": 28,
        "mpCost": 19,
        "accuracy": 95,
        "heal": 0,
        "buffDef": 0,
        "desc": "Lao thẳng với mũi khoan kim cương cực mạnh"
      },
      {
        "id": 13,
        "name": "Bạo Liệt Thiết Toản",
        "type": "Kim Loại",
        "power": 36,
        "mpCost": 26,
        "accuracy": 95,
        "heal": 0,
        "buffDef": 0,
        "desc": "Mũi khoan thép bạo nổ gây chấn thương diện rộng"
      }
    ]
  },
  {
    "id": 24,
    "code": "cauvong_pet_24",
    "name": "Xích Kim Xà Vương",
    "type": "Kim Loại",
    "color": "#f39c12",
    "tier": 3,
    "baseHP": 37,
    "baseMP": 80,
    "baseATK": 14,
    "baseDEF": 11,
    "baseSPD": 12,
    "growth": {
      "hp": 80,
      "mp": 25,
      "atk": 11,
      "def": 11,
      "spd": 9
    },
    "spriteNum": 11,
    "spriteVariant": 0,
    "spriteKey": "npc2_11",
    "sprite": "./img/monsters/npc2_11.png",
    "description": "Hoa Lệ Kim Bì thể hiện sự vương giả tôn quý, năng lượng mạnh mẽ đủ để cho đối thủ thần phục. [khắc chế Mãnh Thú hệ]",
    "evolution": [
      -2
    ],
    "skills": [
      {
        "id": 11,
        "name": "Cương Thiết Trảm",
        "type": "Kim Loại",
        "power": 22,
        "mpCost": 14,
        "accuracy": 95,
        "heal": 0,
        "buffDef": 0,
        "desc": "Đường kiếm thép sắc lạnh chém đứt giáp trụ"
      },
      {
        "id": 12,
        "name": "Kim Tinh Xung Kích",
        "type": "Kim Loại",
        "power": 28,
        "mpCost": 19,
        "accuracy": 95,
        "heal": 0,
        "buffDef": 0,
        "desc": "Lao thẳng với mũi khoan kim cương cực mạnh"
      },
      {
        "id": 14,
        "name": "Trảm Kim Đoạn Ngọc",
        "type": "Kim Loại",
        "power": 48,
        "mpCost": 36,
        "accuracy": 95,
        "heal": 0,
        "buffDef": 0,
        "desc": "Tuyệt kỹ kim loại chém sắt gãy ngọc vô song"
      },
      {
        "id": 19,
        "name": "Cương Cân Thiết Cốt",
        "type": "Phòng Ngự",
        "power": 0,
        "mpCost": 14,
        "accuracy": 100,
        "heal": 0,
        "buffDef": 45,
        "desc": "Biến cơ thể thành khối kim cương siêu cứng"
      }
    ]
  },
  {
    "id": 25,
    "code": "cauvong_pet_25",
    "name": "Xích Kim Xà Hậu",
    "type": "Kim Loại",
    "color": "#f39c12",
    "tier": 4,
    "baseHP": 37,
    "baseMP": 80,
    "baseATK": 15,
    "baseDEF": 12,
    "baseSPD": 13,
    "growth": {
      "hp": 90,
      "mp": 30,
      "atk": 11,
      "def": 11,
      "spd": 12
    },
    "spriteNum": 11,
    "spriteVariant": 1,
    "spriteKey": "npc2_11",
    "sprite": "./img/monsters/npc2_11.png",
    "description": "Xà Vương buồn. [khắc chế Mãnh Thú hệ]",
    "evolution": [
      -5
    ],
    "skills": [
      {
        "id": 11,
        "name": "Cương Thiết Trảm",
        "type": "Kim Loại",
        "power": 22,
        "mpCost": 14,
        "accuracy": 95,
        "heal": 0,
        "buffDef": 0,
        "desc": "Đường kiếm thép sắc lạnh chém đứt giáp trụ"
      },
      {
        "id": 12,
        "name": "Kim Tinh Xung Kích",
        "type": "Kim Loại",
        "power": 28,
        "mpCost": 19,
        "accuracy": 95,
        "heal": 0,
        "buffDef": 0,
        "desc": "Lao thẳng với mũi khoan kim cương cực mạnh"
      },
      {
        "id": 14,
        "name": "Trảm Kim Đoạn Ngọc",
        "type": "Kim Loại",
        "power": 48,
        "mpCost": 36,
        "accuracy": 95,
        "heal": 0,
        "buffDef": 0,
        "desc": "Tuyệt kỹ kim loại chém sắt gãy ngọc vô song"
      },
      {
        "id": 19,
        "name": "Cương Cân Thiết Cốt",
        "type": "Phòng Ngự",
        "power": 0,
        "mpCost": 14,
        "accuracy": 100,
        "heal": 0,
        "buffDef": 45,
        "desc": "Biến cơ thể thành khối kim cương siêu cứng"
      }
    ]
  },
  {
    "id": 26,
    "code": "cauvong_pet_26",
    "name": "Binh lính Thiết Giáp",
    "type": "Kim Loại",
    "color": "#f39c12",
    "tier": 1,
    "baseHP": 35,
    "baseMP": 80,
    "baseATK": 13,
    "baseDEF": 11,
    "baseSPD": 10,
    "growth": {
      "hp": 60,
      "mp": 15,
      "atk": 9,
      "def": 7,
      "spd": 7
    },
    "spriteNum": 12,
    "spriteVariant": 0,
    "spriteKey": "npc2_12",
    "sprite": "./img/monsters/npc2_12.png",
    "description": "Trung thành và chiến đấu anh dũng. [khắc chế Mãnh Thú hệ]",
    "evolution": [
      6,
      10,
      24
    ],
    "skills": [
      {
        "id": 10,
        "name": "Thiết Quyền",
        "type": "Kim Loại",
        "power": 16,
        "mpCost": 10,
        "accuracy": 95,
        "heal": 0,
        "buffDef": 0,
        "desc": "Nắm đấm kim loại nặng nề nện thẳng mục tiêu"
      },
      {
        "id": 11,
        "name": "Cương Thiết Trảm",
        "type": "Kim Loại",
        "power": 22,
        "mpCost": 14,
        "accuracy": 95,
        "heal": 0,
        "buffDef": 0,
        "desc": "Đường kiếm thép sắc lạnh chém đứt giáp trụ"
      },
      {
        "id": 12,
        "name": "Kim Tinh Xung Kích",
        "type": "Kim Loại",
        "power": 28,
        "mpCost": 19,
        "accuracy": 95,
        "heal": 0,
        "buffDef": 0,
        "desc": "Lao thẳng với mũi khoan kim cương cực mạnh"
      },
      {
        "id": 16,
        "name": "Bão Cát",
        "type": "Kim Loại",
        "power": 24,
        "mpCost": 16,
        "accuracy": 90,
        "heal": 0,
        "buffDef": 0,
        "desc": "Cơn bão bụi cát cuốn xé và giảm tầm nhìn địch"
      }
    ]
  },
  {
    "id": 27,
    "code": "cauvong_pet_27",
    "name": "Đội trưởng Thiết Giáp",
    "type": "Kim Loại",
    "color": "#f39c12",
    "tier": 2,
    "baseHP": 36,
    "baseMP": 80,
    "baseATK": 14,
    "baseDEF": 11,
    "baseSPD": 10,
    "growth": {
      "hp": 68,
      "mp": 20,
      "atk": 10,
      "def": 9,
      "spd": 7
    },
    "spriteNum": 12,
    "spriteVariant": 1,
    "spriteKey": "npc2_12",
    "sprite": "./img/monsters/npc2_12.png",
    "description": "Khát máu và là tay thiện chiến, có thực lực bất phàm. [khắc chế Mãnh Thú hệ]",
    "evolution": [
      -2
    ],
    "skills": [
      {
        "id": 10,
        "name": "Thiết Quyền",
        "type": "Kim Loại",
        "power": 16,
        "mpCost": 10,
        "accuracy": 95,
        "heal": 0,
        "buffDef": 0,
        "desc": "Nắm đấm kim loại nặng nề nện thẳng mục tiêu"
      },
      {
        "id": 11,
        "name": "Cương Thiết Trảm",
        "type": "Kim Loại",
        "power": 22,
        "mpCost": 14,
        "accuracy": 95,
        "heal": 0,
        "buffDef": 0,
        "desc": "Đường kiếm thép sắc lạnh chém đứt giáp trụ"
      },
      {
        "id": 12,
        "name": "Kim Tinh Xung Kích",
        "type": "Kim Loại",
        "power": 28,
        "mpCost": 19,
        "accuracy": 95,
        "heal": 0,
        "buffDef": 0,
        "desc": "Lao thẳng với mũi khoan kim cương cực mạnh"
      },
      {
        "id": 13,
        "name": "Bạo Liệt Thiết Toản",
        "type": "Kim Loại",
        "power": 36,
        "mpCost": 26,
        "accuracy": 95,
        "heal": 0,
        "buffDef": 0,
        "desc": "Mũi khoan thép bạo nổ gây chấn thương diện rộng"
      }
    ]
  },
  {
    "id": 28,
    "code": "cauvong_pet_28",
    "name": "Tướng Thiết Giáp",
    "type": "Kim Loại",
    "color": "#f39c12",
    "tier": 3,
    "baseHP": 37,
    "baseMP": 80,
    "baseATK": 15,
    "baseDEF": 12,
    "baseSPD": 12,
    "growth": {
      "hp": 76,
      "mp": 25,
      "atk": 10,
      "def": 10,
      "spd": 9
    },
    "spriteNum": 13,
    "spriteVariant": 0,
    "spriteKey": "npc2_13",
    "sprite": "./img/monsters/npc2_13.png",
    "description": "Tướng quân tay cầm trường thương công kích. [khắc chế Mãnh Thú hệ]",
    "evolution": [
      -2
    ],
    "skills": [
      {
        "id": 11,
        "name": "Cương Thiết Trảm",
        "type": "Kim Loại",
        "power": 22,
        "mpCost": 14,
        "accuracy": 95,
        "heal": 0,
        "buffDef": 0,
        "desc": "Đường kiếm thép sắc lạnh chém đứt giáp trụ"
      },
      {
        "id": 12,
        "name": "Kim Tinh Xung Kích",
        "type": "Kim Loại",
        "power": 28,
        "mpCost": 19,
        "accuracy": 95,
        "heal": 0,
        "buffDef": 0,
        "desc": "Lao thẳng với mũi khoan kim cương cực mạnh"
      },
      {
        "id": 14,
        "name": "Trảm Kim Đoạn Ngọc",
        "type": "Kim Loại",
        "power": 48,
        "mpCost": 36,
        "accuracy": 95,
        "heal": 0,
        "buffDef": 0,
        "desc": "Tuyệt kỹ kim loại chém sắt gãy ngọc vô song"
      },
      {
        "id": 19,
        "name": "Cương Cân Thiết Cốt",
        "type": "Phòng Ngự",
        "power": 0,
        "mpCost": 14,
        "accuracy": 100,
        "heal": 0,
        "buffDef": 45,
        "desc": "Biến cơ thể thành khối kim cương siêu cứng"
      }
    ]
  },
  {
    "id": 29,
    "code": "cauvong_pet_29",
    "name": "Song Đao Tướng Quân",
    "type": "Kim Loại",
    "color": "#f39c12",
    "tier": 4,
    "baseHP": 35,
    "baseMP": 80,
    "baseATK": 12,
    "baseDEF": 10,
    "baseSPD": 10,
    "growth": {
      "hp": 90,
      "mp": 30,
      "atk": 11,
      "def": 12,
      "spd": 10
    },
    "spriteNum": 13,
    "spriteVariant": 1,
    "spriteKey": "npc2_13",
    "sprite": "./img/monsters/npc2_13.png",
    "description": "Tướng quân thiện chiến rất dũng mãnh và khát máu. [khắc chế Mãnh Thú hệ]",
    "evolution": [
      -1
    ],
    "skills": [
      {
        "id": 11,
        "name": "Cương Thiết Trảm",
        "type": "Kim Loại",
        "power": 22,
        "mpCost": 14,
        "accuracy": 95,
        "heal": 0,
        "buffDef": 0,
        "desc": "Đường kiếm thép sắc lạnh chém đứt giáp trụ"
      },
      {
        "id": 12,
        "name": "Kim Tinh Xung Kích",
        "type": "Kim Loại",
        "power": 28,
        "mpCost": 19,
        "accuracy": 95,
        "heal": 0,
        "buffDef": 0,
        "desc": "Lao thẳng với mũi khoan kim cương cực mạnh"
      },
      {
        "id": 14,
        "name": "Trảm Kim Đoạn Ngọc",
        "type": "Kim Loại",
        "power": 48,
        "mpCost": 36,
        "accuracy": 95,
        "heal": 0,
        "buffDef": 0,
        "desc": "Tuyệt kỹ kim loại chém sắt gãy ngọc vô song"
      },
      {
        "id": 19,
        "name": "Cương Cân Thiết Cốt",
        "type": "Phòng Ngự",
        "power": 0,
        "mpCost": 14,
        "accuracy": 100,
        "heal": 0,
        "buffDef": 45,
        "desc": "Biến cơ thể thành khối kim cương siêu cứng"
      }
    ]
  },
  {
    "id": 30,
    "code": "cauvong_pet_30",
    "name": "Đao Thương Tướng Quân",
    "type": "Kim Loại",
    "color": "#f39c12",
    "tier": 4,
    "baseHP": 36,
    "baseMP": 80,
    "baseATK": 13,
    "baseDEF": 11,
    "baseSPD": 10,
    "growth": {
      "hp": 95,
      "mp": 30,
      "atk": 11,
      "def": 12,
      "spd": 12
    },
    "spriteNum": 13,
    "spriteVariant": 2,
    "spriteKey": "npc2_13",
    "sprite": "./img/monsters/npc2_13.png",
    "description": "Tướng quân tiên phong trí dũng song toàn. [khắc chế Mãnh Thú hệ]",
    "evolution": [
      -1
    ],
    "skills": [
      {
        "id": 11,
        "name": "Cương Thiết Trảm",
        "type": "Kim Loại",
        "power": 22,
        "mpCost": 14,
        "accuracy": 95,
        "heal": 0,
        "buffDef": 0,
        "desc": "Đường kiếm thép sắc lạnh chém đứt giáp trụ"
      },
      {
        "id": 12,
        "name": "Kim Tinh Xung Kích",
        "type": "Kim Loại",
        "power": 28,
        "mpCost": 19,
        "accuracy": 95,
        "heal": 0,
        "buffDef": 0,
        "desc": "Lao thẳng với mũi khoan kim cương cực mạnh"
      },
      {
        "id": 14,
        "name": "Trảm Kim Đoạn Ngọc",
        "type": "Kim Loại",
        "power": 48,
        "mpCost": 36,
        "accuracy": 95,
        "heal": 0,
        "buffDef": 0,
        "desc": "Tuyệt kỹ kim loại chém sắt gãy ngọc vô song"
      },
      {
        "id": 19,
        "name": "Cương Cân Thiết Cốt",
        "type": "Phòng Ngự",
        "power": 0,
        "mpCost": 14,
        "accuracy": 100,
        "heal": 0,
        "buffDef": 45,
        "desc": "Biến cơ thể thành khối kim cương siêu cứng"
      }
    ]
  },
  {
    "id": 31,
    "code": "cauvong_pet_31",
    "name": "Thiết Đầu",
    "type": "Kim Loại",
    "color": "#f39c12",
    "tier": 1,
    "baseHP": 35,
    "baseMP": 80,
    "baseATK": 12,
    "baseDEF": 11,
    "baseSPD": 10,
    "growth": {
      "hp": 60,
      "mp": 15,
      "atk": 9,
      "def": 8,
      "spd": 6
    },
    "spriteNum": 14,
    "spriteVariant": 0,
    "spriteKey": "npc2_14",
    "sprite": "./img/monsters/npc2_14.png",
    "description": "Thiết Đầu Công thiên bẩm trời phú. [khắc chế Mãnh Thú hệ]",
    "evolution": [
      5,
      20,
      23
    ],
    "skills": [
      {
        "id": 10,
        "name": "Thiết Quyền",
        "type": "Kim Loại",
        "power": 16,
        "mpCost": 10,
        "accuracy": 95,
        "heal": 0,
        "buffDef": 0,
        "desc": "Nắm đấm kim loại nặng nề nện thẳng mục tiêu"
      },
      {
        "id": 11,
        "name": "Cương Thiết Trảm",
        "type": "Kim Loại",
        "power": 22,
        "mpCost": 14,
        "accuracy": 95,
        "heal": 0,
        "buffDef": 0,
        "desc": "Đường kiếm thép sắc lạnh chém đứt giáp trụ"
      },
      {
        "id": 12,
        "name": "Kim Tinh Xung Kích",
        "type": "Kim Loại",
        "power": 28,
        "mpCost": 19,
        "accuracy": 95,
        "heal": 0,
        "buffDef": 0,
        "desc": "Lao thẳng với mũi khoan kim cương cực mạnh"
      },
      {
        "id": 16,
        "name": "Bão Cát",
        "type": "Kim Loại",
        "power": 24,
        "mpCost": 16,
        "accuracy": 90,
        "heal": 0,
        "buffDef": 0,
        "desc": "Cơn bão bụi cát cuốn xé và giảm tầm nhìn địch"
      }
    ]
  },
  {
    "id": 32,
    "code": "cauvong_pet_32",
    "name": "Thiết Cự Nhân",
    "type": "Kim Loại",
    "color": "#f39c12",
    "tier": 2,
    "baseHP": 36,
    "baseMP": 80,
    "baseATK": 13,
    "baseDEF": 11,
    "baseSPD": 10,
    "growth": {
      "hp": 68,
      "mp": 20,
      "atk": 10,
      "def": 9,
      "spd": 7
    },
    "spriteNum": 14,
    "spriteVariant": 1,
    "spriteKey": "npc2_14",
    "sprite": "./img/monsters/npc2_14.png",
    "description": "Được các anh em trong Thiết Đầu gọi là người khổng lồ có bàn tay sắt. [khắc chế Mãnh Thú hệ]",
    "evolution": [
      -2
    ],
    "skills": [
      {
        "id": 10,
        "name": "Thiết Quyền",
        "type": "Kim Loại",
        "power": 16,
        "mpCost": 10,
        "accuracy": 95,
        "heal": 0,
        "buffDef": 0,
        "desc": "Nắm đấm kim loại nặng nề nện thẳng mục tiêu"
      },
      {
        "id": 11,
        "name": "Cương Thiết Trảm",
        "type": "Kim Loại",
        "power": 22,
        "mpCost": 14,
        "accuracy": 95,
        "heal": 0,
        "buffDef": 0,
        "desc": "Đường kiếm thép sắc lạnh chém đứt giáp trụ"
      },
      {
        "id": 12,
        "name": "Kim Tinh Xung Kích",
        "type": "Kim Loại",
        "power": 28,
        "mpCost": 19,
        "accuracy": 95,
        "heal": 0,
        "buffDef": 0,
        "desc": "Lao thẳng với mũi khoan kim cương cực mạnh"
      },
      {
        "id": 13,
        "name": "Bạo Liệt Thiết Toản",
        "type": "Kim Loại",
        "power": 36,
        "mpCost": 26,
        "accuracy": 95,
        "heal": 0,
        "buffDef": 0,
        "desc": "Mũi khoan thép bạo nổ gây chấn thương diện rộng"
      }
    ]
  },
  {
    "id": 33,
    "code": "cauvong_pet_33",
    "name": "Thiết Cự Linh",
    "type": "Kim Loại",
    "color": "#f39c12",
    "tier": 3,
    "baseHP": 37,
    "baseMP": 80,
    "baseATK": 14,
    "baseDEF": 12,
    "baseSPD": 11,
    "growth": {
      "hp": 84,
      "mp": 25,
      "atk": 11,
      "def": 11,
      "spd": 9
    },
    "spriteNum": 14,
    "spriteVariant": 2,
    "spriteKey": "npc2_14",
    "sprite": "./img/monsters/npc2_14.png",
    "description": "Người khổng lồ Taurus. [khắc chế Mãnh Thú hệ]",
    "evolution": [
      -2
    ],
    "skills": [
      {
        "id": 11,
        "name": "Cương Thiết Trảm",
        "type": "Kim Loại",
        "power": 22,
        "mpCost": 14,
        "accuracy": 95,
        "heal": 0,
        "buffDef": 0,
        "desc": "Đường kiếm thép sắc lạnh chém đứt giáp trụ"
      },
      {
        "id": 12,
        "name": "Kim Tinh Xung Kích",
        "type": "Kim Loại",
        "power": 28,
        "mpCost": 19,
        "accuracy": 95,
        "heal": 0,
        "buffDef": 0,
        "desc": "Lao thẳng với mũi khoan kim cương cực mạnh"
      },
      {
        "id": 14,
        "name": "Trảm Kim Đoạn Ngọc",
        "type": "Kim Loại",
        "power": 48,
        "mpCost": 36,
        "accuracy": 95,
        "heal": 0,
        "buffDef": 0,
        "desc": "Tuyệt kỹ kim loại chém sắt gãy ngọc vô song"
      },
      {
        "id": 19,
        "name": "Cương Cân Thiết Cốt",
        "type": "Phòng Ngự",
        "power": 0,
        "mpCost": 14,
        "accuracy": 100,
        "heal": 0,
        "buffDef": 45,
        "desc": "Biến cơ thể thành khối kim cương siêu cứng"
      }
    ]
  },
  {
    "id": 34,
    "code": "cauvong_pet_34",
    "name": "Người điện",
    "type": "Kim Loại",
    "color": "#f39c12",
    "tier": 4,
    "baseHP": 37,
    "baseMP": 80,
    "baseATK": 14,
    "baseDEF": 12,
    "baseSPD": 11,
    "growth": {
      "hp": 94,
      "mp": 30,
      "atk": 11,
      "def": 12,
      "spd": 10
    },
    "spriteNum": 14,
    "spriteVariant": 3,
    "spriteKey": "npc2_14",
    "sprite": "./img/monsters/npc2_14.png",
    "description": "Sủng vật quanh thân tràn ngập từ tính. [khắc chế Mãnh Thú hệ]",
    "evolution": [
      -1
    ],
    "skills": [
      {
        "id": 11,
        "name": "Cương Thiết Trảm",
        "type": "Kim Loại",
        "power": 22,
        "mpCost": 14,
        "accuracy": 95,
        "heal": 0,
        "buffDef": 0,
        "desc": "Đường kiếm thép sắc lạnh chém đứt giáp trụ"
      },
      {
        "id": 12,
        "name": "Kim Tinh Xung Kích",
        "type": "Kim Loại",
        "power": 28,
        "mpCost": 19,
        "accuracy": 95,
        "heal": 0,
        "buffDef": 0,
        "desc": "Lao thẳng với mũi khoan kim cương cực mạnh"
      },
      {
        "id": 14,
        "name": "Trảm Kim Đoạn Ngọc",
        "type": "Kim Loại",
        "power": 48,
        "mpCost": 36,
        "accuracy": 95,
        "heal": 0,
        "buffDef": 0,
        "desc": "Tuyệt kỹ kim loại chém sắt gãy ngọc vô song"
      },
      {
        "id": 19,
        "name": "Cương Cân Thiết Cốt",
        "type": "Phòng Ngự",
        "power": 0,
        "mpCost": 14,
        "accuracy": 100,
        "heal": 0,
        "buffDef": 45,
        "desc": "Biến cơ thể thành khối kim cương siêu cứng"
      }
    ]
  },
  {
    "id": 35,
    "code": "cauvong_pet_35",
    "name": "Đồng Cầu huynh đệ",
    "type": "Kim Loại",
    "color": "#f39c12",
    "tier": 1,
    "baseHP": 36,
    "baseMP": 80,
    "baseATK": 13,
    "baseDEF": 11,
    "baseSPD": 10,
    "growth": {
      "hp": 90,
      "mp": 15,
      "atk": 9,
      "def": 7,
      "spd": 6
    },
    "spriteNum": 15,
    "spriteVariant": 0,
    "spriteKey": "npc2_15",
    "sprite": "./img/monsters/npc2_15.png",
    "description": "Ánh mắt thiện lượng khó che đậy bản chất ác ma. [khắc chế Mãnh Thú hệ]",
    "evolution": [
      21,
      22,
      29
    ],
    "skills": [
      {
        "id": 10,
        "name": "Thiết Quyền",
        "type": "Kim Loại",
        "power": 16,
        "mpCost": 10,
        "accuracy": 95,
        "heal": 0,
        "buffDef": 0,
        "desc": "Nắm đấm kim loại nặng nề nện thẳng mục tiêu"
      },
      {
        "id": 11,
        "name": "Cương Thiết Trảm",
        "type": "Kim Loại",
        "power": 22,
        "mpCost": 14,
        "accuracy": 95,
        "heal": 0,
        "buffDef": 0,
        "desc": "Đường kiếm thép sắc lạnh chém đứt giáp trụ"
      },
      {
        "id": 12,
        "name": "Kim Tinh Xung Kích",
        "type": "Kim Loại",
        "power": 28,
        "mpCost": 19,
        "accuracy": 95,
        "heal": 0,
        "buffDef": 0,
        "desc": "Lao thẳng với mũi khoan kim cương cực mạnh"
      },
      {
        "id": 16,
        "name": "Bão Cát",
        "type": "Kim Loại",
        "power": 24,
        "mpCost": 16,
        "accuracy": 90,
        "heal": 0,
        "buffDef": 0,
        "desc": "Cơn bão bụi cát cuốn xé và giảm tầm nhìn địch"
      }
    ]
  },
  {
    "id": 36,
    "code": "cauvong_pet_36",
    "name": "Thiết Cầu huynh đệ",
    "type": "Kim Loại",
    "color": "#f39c12",
    "tier": 2,
    "baseHP": 38,
    "baseMP": 80,
    "baseATK": 15,
    "baseDEF": 11,
    "baseSPD": 12,
    "growth": {
      "hp": 92,
      "mp": 20,
      "atk": 11,
      "def": 11,
      "spd": 9
    },
    "spriteNum": 16,
    "spriteVariant": 0,
    "spriteKey": "npc2_16",
    "sprite": "./img/monsters/npc2_16.png",
    "description": "Đam mê bộ môn thể thao ngoài trời. [khắc chế Mãnh Thú hệ]",
    "evolution": [
      -2
    ],
    "skills": [
      {
        "id": 10,
        "name": "Thiết Quyền",
        "type": "Kim Loại",
        "power": 16,
        "mpCost": 10,
        "accuracy": 95,
        "heal": 0,
        "buffDef": 0,
        "desc": "Nắm đấm kim loại nặng nề nện thẳng mục tiêu"
      },
      {
        "id": 11,
        "name": "Cương Thiết Trảm",
        "type": "Kim Loại",
        "power": 22,
        "mpCost": 14,
        "accuracy": 95,
        "heal": 0,
        "buffDef": 0,
        "desc": "Đường kiếm thép sắc lạnh chém đứt giáp trụ"
      },
      {
        "id": 12,
        "name": "Kim Tinh Xung Kích",
        "type": "Kim Loại",
        "power": 28,
        "mpCost": 19,
        "accuracy": 95,
        "heal": 0,
        "buffDef": 0,
        "desc": "Lao thẳng với mũi khoan kim cương cực mạnh"
      },
      {
        "id": 13,
        "name": "Bạo Liệt Thiết Toản",
        "type": "Kim Loại",
        "power": 36,
        "mpCost": 26,
        "accuracy": 95,
        "heal": 0,
        "buffDef": 0,
        "desc": "Mũi khoan thép bạo nổ gây chấn thương diện rộng"
      }
    ]
  },
  {
    "id": 37,
    "code": "cauvong_pet_37",
    "name": "Ấu Long",
    "type": "Phi Hành",
    "color": "#9b59b6",
    "tier": 1,
    "baseHP": 32,
    "baseMP": 80,
    "baseATK": 12,
    "baseDEF": 11,
    "baseSPD": 10,
    "growth": {
      "hp": 39,
      "mp": 15,
      "atk": 8,
      "def": 8,
      "spd": 5
    },
    "spriteNum": 17,
    "spriteVariant": 0,
    "spriteKey": "npc2_17",
    "sprite": "./img/monsters/npc2_17.png",
    "description": "Ấu tử Bạch Kim Long, tinh nghịch phi thường. [khắc chế Hải Dương hệ]",
    "evolution": [
      -1
    ],
    "skills": [
      {
        "id": 20,
        "name": "Phong Nhận",
        "type": "Phi Hành",
        "power": 17,
        "mpCost": 10,
        "accuracy": 95,
        "heal": 0,
        "buffDef": 0,
        "desc": "Lưỡi đao gió chém ngọt từ không trung"
      },
      {
        "id": 21,
        "name": "Liệp Dực Trảm",
        "type": "Phi Hành",
        "power": 23,
        "mpCost": 14,
        "accuracy": 95,
        "heal": 0,
        "buffDef": 0,
        "desc": "Sải cánh săn mồi chém rách đối thủ"
      },
      {
        "id": 22,
        "name": "Toàn Phong Xung Kích",
        "type": "Phi Hành",
        "power": 29,
        "mpCost": 19,
        "accuracy": 95,
        "heal": 0,
        "buffDef": 0,
        "desc": "Cuộn trọn theo lốc xoáy đâm sầm vào kẻ địch"
      },
      {
        "id": 26,
        "name": "Lôi Đình Nhất Kích",
        "type": "Phi Hành",
        "power": 38,
        "mpCost": 28,
        "accuracy": 95,
        "heal": 0,
        "buffDef": 0,
        "desc": "Sấm sét cửu thiên giáng thế gây tê liệt"
      }
    ]
  },
  {
    "id": 38,
    "code": "cauvong_pet_38",
    "name": "Tiểu Bạch Long",
    "type": "Phi Hành",
    "color": "#9b59b6",
    "tier": 2,
    "baseHP": 33,
    "baseMP": 80,
    "baseATK": 13,
    "baseDEF": 12,
    "baseSPD": 10,
    "growth": {
      "hp": 55,
      "mp": 20,
      "atk": 9,
      "def": 10,
      "spd": 6
    },
    "spriteNum": 17,
    "spriteVariant": 1,
    "spriteKey": "npc2_17",
    "sprite": "./img/monsters/npc2_17.png",
    "description": "Thể tiến hóa Tiểu Phi Long, tốc độ rất nhanh. [khắc chế Hải Dương hệ]",
    "evolution": [
      -2
    ],
    "skills": [
      {
        "id": 20,
        "name": "Phong Nhận",
        "type": "Phi Hành",
        "power": 17,
        "mpCost": 10,
        "accuracy": 95,
        "heal": 0,
        "buffDef": 0,
        "desc": "Lưỡi đao gió chém ngọt từ không trung"
      },
      {
        "id": 21,
        "name": "Liệp Dực Trảm",
        "type": "Phi Hành",
        "power": 23,
        "mpCost": 14,
        "accuracy": 95,
        "heal": 0,
        "buffDef": 0,
        "desc": "Sải cánh săn mồi chém rách đối thủ"
      },
      {
        "id": 22,
        "name": "Toàn Phong Xung Kích",
        "type": "Phi Hành",
        "power": 29,
        "mpCost": 19,
        "accuracy": 95,
        "heal": 0,
        "buffDef": 0,
        "desc": "Cuộn trọn theo lốc xoáy đâm sầm vào kẻ địch"
      },
      {
        "id": 23,
        "name": "Vũ Dực Cuồng Phong",
        "type": "Phi Hành",
        "power": 37,
        "mpCost": 26,
        "accuracy": 95,
        "heal": 0,
        "buffDef": 0,
        "desc": "Đập cánh tạo siêu bão càn quét trận đấu"
      }
    ]
  },
  {
    "id": 39,
    "code": "cauvong_pet_39",
    "name": "Kim Dực Long",
    "type": "Phi Hành",
    "color": "#9b59b6",
    "tier": 3,
    "baseHP": 34,
    "baseMP": 80,
    "baseATK": 14,
    "baseDEF": 13,
    "baseSPD": 10,
    "growth": {
      "hp": 83,
      "mp": 25,
      "atk": 10,
      "def": 12,
      "spd": 8
    },
    "spriteNum": 18,
    "spriteVariant": 0,
    "spriteKey": "npc2_18",
    "sprite": "./img/monsters/npc2_18.png",
    "description": "Thể trưởng thành Phi Long, cơ thể chứa năng lượng mạnh mẽ. [khắc chế Hải Dương hệ]",
    "evolution": [
      -2
    ],
    "skills": [
      {
        "id": 21,
        "name": "Liệp Dực Trảm",
        "type": "Phi Hành",
        "power": 23,
        "mpCost": 14,
        "accuracy": 95,
        "heal": 0,
        "buffDef": 0,
        "desc": "Sải cánh săn mồi chém rách đối thủ"
      },
      {
        "id": 22,
        "name": "Toàn Phong Xung Kích",
        "type": "Phi Hành",
        "power": 29,
        "mpCost": 19,
        "accuracy": 95,
        "heal": 0,
        "buffDef": 0,
        "desc": "Cuộn trọn theo lốc xoáy đâm sầm vào kẻ địch"
      },
      {
        "id": 24,
        "name": "Thần Phong Liệt Không",
        "type": "Phi Hành",
        "power": 48,
        "mpCost": 36,
        "accuracy": 95,
        "heal": 0,
        "buffDef": 0,
        "desc": "Cơn bão thần thánh xé toạc không gian"
      },
      {
        "id": 23,
        "name": "Vũ Dực Cuồng Phong",
        "type": "Phi Hành",
        "power": 37,
        "mpCost": 26,
        "accuracy": 95,
        "heal": 0,
        "buffDef": 0,
        "desc": "Đập cánh tạo siêu bão càn quét trận đấu"
      }
    ]
  },
  {
    "id": 40,
    "code": "cauvong_pet_40",
    "name": "Bạch Kim Long",
    "type": "Phi Hành",
    "color": "#9b59b6",
    "tier": 4,
    "baseHP": 36,
    "baseMP": 80,
    "baseATK": 15,
    "baseDEF": 14,
    "baseSPD": 11,
    "growth": {
      "hp": 91,
      "mp": 30,
      "atk": 11,
      "def": 13,
      "spd": 11
    },
    "spriteNum": 18,
    "spriteVariant": 1,
    "spriteKey": "npc2_18",
    "sprite": "./img/monsters/npc2_18.png",
    "description": "Vua bầu trời, có được thực lực thần thánh. [khắc chế Hải Dương hệ]",
    "evolution": [
      -2
    ],
    "skills": [
      {
        "id": 21,
        "name": "Liệp Dực Trảm",
        "type": "Phi Hành",
        "power": 23,
        "mpCost": 14,
        "accuracy": 95,
        "heal": 0,
        "buffDef": 0,
        "desc": "Sải cánh săn mồi chém rách đối thủ"
      },
      {
        "id": 22,
        "name": "Toàn Phong Xung Kích",
        "type": "Phi Hành",
        "power": 29,
        "mpCost": 19,
        "accuracy": 95,
        "heal": 0,
        "buffDef": 0,
        "desc": "Cuộn trọn theo lốc xoáy đâm sầm vào kẻ địch"
      },
      {
        "id": 24,
        "name": "Thần Phong Liệt Không",
        "type": "Phi Hành",
        "power": 48,
        "mpCost": 36,
        "accuracy": 95,
        "heal": 0,
        "buffDef": 0,
        "desc": "Cơn bão thần thánh xé toạc không gian"
      },
      {
        "id": 23,
        "name": "Vũ Dực Cuồng Phong",
        "type": "Phi Hành",
        "power": 37,
        "mpCost": 26,
        "accuracy": 95,
        "heal": 0,
        "buffDef": 0,
        "desc": "Đập cánh tạo siêu bão càn quét trận đấu"
      }
    ]
  },
  {
    "id": 41,
    "code": "cauvong_pet_41",
    "name": "Ưng",
    "type": "Phi Hành",
    "color": "#9b59b6",
    "tier": 1,
    "baseHP": 32,
    "baseMP": 80,
    "baseATK": 12,
    "baseDEF": 11,
    "baseSPD": 10,
    "growth": {
      "hp": 47,
      "mp": 15,
      "atk": 8,
      "def": 9,
      "spd": 5
    },
    "spriteNum": 19,
    "spriteVariant": 0,
    "spriteKey": "npc2_19",
    "sprite": "./img/monsters/npc2_19.png",
    "description": "Loài chim hung mãnh bay lượn trên không trung. [khắc chế Hải Dương hệ]",
    "evolution": [
      25,
      26,
      37
    ],
    "skills": [
      {
        "id": 20,
        "name": "Phong Nhận",
        "type": "Phi Hành",
        "power": 17,
        "mpCost": 10,
        "accuracy": 95,
        "heal": 0,
        "buffDef": 0,
        "desc": "Lưỡi đao gió chém ngọt từ không trung"
      },
      {
        "id": 21,
        "name": "Liệp Dực Trảm",
        "type": "Phi Hành",
        "power": 23,
        "mpCost": 14,
        "accuracy": 95,
        "heal": 0,
        "buffDef": 0,
        "desc": "Sải cánh săn mồi chém rách đối thủ"
      },
      {
        "id": 22,
        "name": "Toàn Phong Xung Kích",
        "type": "Phi Hành",
        "power": 29,
        "mpCost": 19,
        "accuracy": 95,
        "heal": 0,
        "buffDef": 0,
        "desc": "Cuộn trọn theo lốc xoáy đâm sầm vào kẻ địch"
      },
      {
        "id": 26,
        "name": "Lôi Đình Nhất Kích",
        "type": "Phi Hành",
        "power": 38,
        "mpCost": 28,
        "accuracy": 95,
        "heal": 0,
        "buffDef": 0,
        "desc": "Sấm sét cửu thiên giáng thế gây tê liệt"
      }
    ]
  },
  {
    "id": 42,
    "code": "cauvong_pet_42",
    "name": "Vương Thứu",
    "type": "Phi Hành",
    "color": "#9b59b6",
    "tier": 2,
    "baseHP": 33,
    "baseMP": 80,
    "baseATK": 13,
    "baseDEF": 12,
    "baseSPD": 10,
    "growth": {
      "hp": 63,
      "mp": 20,
      "atk": 9,
      "def": 10,
      "spd": 6
    },
    "spriteNum": 19,
    "spriteVariant": 1,
    "spriteKey": "npc2_19",
    "sprite": "./img/monsters/npc2_19.png",
    "description": "Ưng Chi Vương, vỗ một sải cánh có thể bay đến trời cao. [khắc chế Hải Dương hệ]",
    "evolution": [
      -2
    ],
    "skills": [
      {
        "id": 20,
        "name": "Phong Nhận",
        "type": "Phi Hành",
        "power": 17,
        "mpCost": 10,
        "accuracy": 95,
        "heal": 0,
        "buffDef": 0,
        "desc": "Lưỡi đao gió chém ngọt từ không trung"
      },
      {
        "id": 21,
        "name": "Liệp Dực Trảm",
        "type": "Phi Hành",
        "power": 23,
        "mpCost": 14,
        "accuracy": 95,
        "heal": 0,
        "buffDef": 0,
        "desc": "Sải cánh săn mồi chém rách đối thủ"
      },
      {
        "id": 22,
        "name": "Toàn Phong Xung Kích",
        "type": "Phi Hành",
        "power": 29,
        "mpCost": 19,
        "accuracy": 95,
        "heal": 0,
        "buffDef": 0,
        "desc": "Cuộn trọn theo lốc xoáy đâm sầm vào kẻ địch"
      },
      {
        "id": 23,
        "name": "Vũ Dực Cuồng Phong",
        "type": "Phi Hành",
        "power": 37,
        "mpCost": 26,
        "accuracy": 95,
        "heal": 0,
        "buffDef": 0,
        "desc": "Đập cánh tạo siêu bão càn quét trận đấu"
      }
    ]
  },
  {
    "id": 43,
    "code": "cauvong_pet_43",
    "name": "Sư Thứu",
    "type": "Phi Hành",
    "color": "#9b59b6",
    "tier": 3,
    "baseHP": 34,
    "baseMP": 80,
    "baseATK": 14,
    "baseDEF": 13,
    "baseSPD": 10,
    "growth": {
      "hp": 75,
      "mp": 25,
      "atk": 10,
      "def": 12,
      "spd": 8
    },
    "spriteNum": 19,
    "spriteVariant": 2,
    "spriteKey": "npc2_19",
    "sprite": "./img/monsters/npc2_19.png",
    "description": "Sư Thân Ưng Thú trong truyền thuyết (sự pha trộn giữa sư tử và chim ưng), dã thú dị thường hung mãnh. [khắc chế Hải Dương hệ]",
    "evolution": [
      -2
    ],
    "skills": [
      {
        "id": 21,
        "name": "Liệp Dực Trảm",
        "type": "Phi Hành",
        "power": 23,
        "mpCost": 14,
        "accuracy": 95,
        "heal": 0,
        "buffDef": 0,
        "desc": "Sải cánh săn mồi chém rách đối thủ"
      },
      {
        "id": 22,
        "name": "Toàn Phong Xung Kích",
        "type": "Phi Hành",
        "power": 29,
        "mpCost": 19,
        "accuracy": 95,
        "heal": 0,
        "buffDef": 0,
        "desc": "Cuộn trọn theo lốc xoáy đâm sầm vào kẻ địch"
      },
      {
        "id": 24,
        "name": "Thần Phong Liệt Không",
        "type": "Phi Hành",
        "power": 48,
        "mpCost": 36,
        "accuracy": 95,
        "heal": 0,
        "buffDef": 0,
        "desc": "Cơn bão thần thánh xé toạc không gian"
      },
      {
        "id": 23,
        "name": "Vũ Dực Cuồng Phong",
        "type": "Phi Hành",
        "power": 37,
        "mpCost": 26,
        "accuracy": 95,
        "heal": 0,
        "buffDef": 0,
        "desc": "Đập cánh tạo siêu bão càn quét trận đấu"
      }
    ]
  },
  {
    "id": 44,
    "code": "cauvong_pet_44",
    "name": "Dơi khổng lồ",
    "type": "Phi Hành",
    "color": "#9b59b6",
    "tier": 1,
    "baseHP": 32,
    "baseMP": 80,
    "baseATK": 12,
    "baseDEF": 12,
    "baseSPD": 10,
    "growth": {
      "hp": 51,
      "mp": 15,
      "atk": 8,
      "def": 9,
      "spd": 5
    },
    "spriteNum": 20,
    "spriteVariant": 0,
    "spriteKey": "npc2_20",
    "sprite": "./img/monsters/npc2_20.png",
    "description": "Dơi Tặc Mi Thử Nhãn, tên trộm đáng yêu. [khắc chế Hải Dương hệ]",
    "evolution": [
      24,
      26,
      39
    ],
    "skills": [
      {
        "id": 20,
        "name": "Phong Nhận",
        "type": "Phi Hành",
        "power": 17,
        "mpCost": 10,
        "accuracy": 95,
        "heal": 0,
        "buffDef": 0,
        "desc": "Lưỡi đao gió chém ngọt từ không trung"
      },
      {
        "id": 21,
        "name": "Liệp Dực Trảm",
        "type": "Phi Hành",
        "power": 23,
        "mpCost": 14,
        "accuracy": 95,
        "heal": 0,
        "buffDef": 0,
        "desc": "Sải cánh săn mồi chém rách đối thủ"
      },
      {
        "id": 22,
        "name": "Toàn Phong Xung Kích",
        "type": "Phi Hành",
        "power": 29,
        "mpCost": 19,
        "accuracy": 95,
        "heal": 0,
        "buffDef": 0,
        "desc": "Cuộn trọn theo lốc xoáy đâm sầm vào kẻ địch"
      },
      {
        "id": 26,
        "name": "Lôi Đình Nhất Kích",
        "type": "Phi Hành",
        "power": 38,
        "mpCost": 28,
        "accuracy": 95,
        "heal": 0,
        "buffDef": 0,
        "desc": "Sấm sét cửu thiên giáng thế gây tê liệt"
      }
    ]
  },
  {
    "id": 45,
    "code": "cauvong_pet_45",
    "name": "Răng nanh của dơi",
    "type": "Phi Hành",
    "color": "#9b59b6",
    "tier": 2,
    "baseHP": 33,
    "baseMP": 80,
    "baseATK": 13,
    "baseDEF": 13,
    "baseSPD": 10,
    "growth": {
      "hp": 59,
      "mp": 20,
      "atk": 9,
      "def": 10,
      "spd": 6
    },
    "spriteNum": 20,
    "spriteVariant": 1,
    "spriteKey": "npc2_20",
    "sprite": "./img/monsters/npc2_20.png",
    "description": "Batman có đôi mắt màu hồng rất đẹp. [khắc chế Hải Dương hệ]",
    "evolution": [
      -2
    ],
    "skills": [
      {
        "id": 20,
        "name": "Phong Nhận",
        "type": "Phi Hành",
        "power": 17,
        "mpCost": 10,
        "accuracy": 95,
        "heal": 0,
        "buffDef": 0,
        "desc": "Lưỡi đao gió chém ngọt từ không trung"
      },
      {
        "id": 21,
        "name": "Liệp Dực Trảm",
        "type": "Phi Hành",
        "power": 23,
        "mpCost": 14,
        "accuracy": 95,
        "heal": 0,
        "buffDef": 0,
        "desc": "Sải cánh săn mồi chém rách đối thủ"
      },
      {
        "id": 22,
        "name": "Toàn Phong Xung Kích",
        "type": "Phi Hành",
        "power": 29,
        "mpCost": 19,
        "accuracy": 95,
        "heal": 0,
        "buffDef": 0,
        "desc": "Cuộn trọn theo lốc xoáy đâm sầm vào kẻ địch"
      },
      {
        "id": 23,
        "name": "Vũ Dực Cuồng Phong",
        "type": "Phi Hành",
        "power": 37,
        "mpCost": 26,
        "accuracy": 95,
        "heal": 0,
        "buffDef": 0,
        "desc": "Đập cánh tạo siêu bão càn quét trận đấu"
      }
    ]
  },
  {
    "id": 46,
    "code": "cauvong_pet_46",
    "name": "Tần số của dơi",
    "type": "Phi Hành",
    "color": "#9b59b6",
    "tier": 3,
    "baseHP": 34,
    "baseMP": 80,
    "baseATK": 14,
    "baseDEF": 14,
    "baseSPD": 11,
    "growth": {
      "hp": 67,
      "mp": 25,
      "atk": 10,
      "def": 12,
      "spd": 8
    },
    "spriteNum": 21,
    "spriteVariant": 0,
    "spriteKey": "npc2_21",
    "sprite": "./img/monsters/npc2_21.png",
    "description": "Áo choàng thần bí tạo nên sức hút cho những kẻ kiếm tìm. [khắc chế Hải Dương hệ]",
    "evolution": [
      -2
    ],
    "skills": [
      {
        "id": 21,
        "name": "Liệp Dực Trảm",
        "type": "Phi Hành",
        "power": 23,
        "mpCost": 14,
        "accuracy": 95,
        "heal": 0,
        "buffDef": 0,
        "desc": "Sải cánh săn mồi chém rách đối thủ"
      },
      {
        "id": 22,
        "name": "Toàn Phong Xung Kích",
        "type": "Phi Hành",
        "power": 29,
        "mpCost": 19,
        "accuracy": 95,
        "heal": 0,
        "buffDef": 0,
        "desc": "Cuộn trọn theo lốc xoáy đâm sầm vào kẻ địch"
      },
      {
        "id": 24,
        "name": "Thần Phong Liệt Không",
        "type": "Phi Hành",
        "power": 48,
        "mpCost": 36,
        "accuracy": 95,
        "heal": 0,
        "buffDef": 0,
        "desc": "Cơn bão thần thánh xé toạc không gian"
      },
      {
        "id": 23,
        "name": "Vũ Dực Cuồng Phong",
        "type": "Phi Hành",
        "power": 37,
        "mpCost": 26,
        "accuracy": 95,
        "heal": 0,
        "buffDef": 0,
        "desc": "Đập cánh tạo siêu bão càn quét trận đấu"
      }
    ]
  },
  {
    "id": 47,
    "code": "cauvong_pet_47",
    "name": "Thiên Mã cánh bạc",
    "type": "Phi Hành",
    "color": "#9b59b6",
    "tier": 1,
    "baseHP": 32,
    "baseMP": 80,
    "baseATK": 12,
    "baseDEF": 11,
    "baseSPD": 10,
    "growth": {
      "hp": 43,
      "mp": 15,
      "atk": 8,
      "def": 8,
      "spd": 5
    },
    "spriteNum": 22,
    "spriteVariant": 0,
    "spriteKey": "npc2_22",
    "sprite": "./img/monsters/npc2_22.png",
    "description": "Thiên Mã cực mạnh ai nhìn cũng muốn gần. [khắc chế Hải Dương hệ]",
    "evolution": [
      -1
    ],
    "skills": [
      {
        "id": 20,
        "name": "Phong Nhận",
        "type": "Phi Hành",
        "power": 17,
        "mpCost": 10,
        "accuracy": 95,
        "heal": 0,
        "buffDef": 0,
        "desc": "Lưỡi đao gió chém ngọt từ không trung"
      },
      {
        "id": 21,
        "name": "Liệp Dực Trảm",
        "type": "Phi Hành",
        "power": 23,
        "mpCost": 14,
        "accuracy": 95,
        "heal": 0,
        "buffDef": 0,
        "desc": "Sải cánh săn mồi chém rách đối thủ"
      },
      {
        "id": 22,
        "name": "Toàn Phong Xung Kích",
        "type": "Phi Hành",
        "power": 29,
        "mpCost": 19,
        "accuracy": 95,
        "heal": 0,
        "buffDef": 0,
        "desc": "Cuộn trọn theo lốc xoáy đâm sầm vào kẻ địch"
      },
      {
        "id": 26,
        "name": "Lôi Đình Nhất Kích",
        "type": "Phi Hành",
        "power": 38,
        "mpCost": 28,
        "accuracy": 95,
        "heal": 0,
        "buffDef": 0,
        "desc": "Sấm sét cửu thiên giáng thế gây tê liệt"
      }
    ]
  },
  {
    "id": 48,
    "code": "cauvong_pet_48",
    "name": "Thiên Mã một sừng",
    "type": "Phi Hành",
    "color": "#9b59b6",
    "tier": 2,
    "baseHP": 33,
    "baseMP": 80,
    "baseATK": 13,
    "baseDEF": 12,
    "baseSPD": 10,
    "growth": {
      "hp": 63,
      "mp": 20,
      "atk": 9,
      "def": 10,
      "spd": 6
    },
    "spriteNum": 22,
    "spriteVariant": 1,
    "spriteKey": "npc2_22",
    "sprite": "./img/monsters/npc2_22.png",
    "description": "Đôi cánh kim loại vàng rất mạnh rất tốt. [khắc chế Hải Dương hệ]",
    "evolution": [
      24,
      25,
      28
    ],
    "skills": [
      {
        "id": 20,
        "name": "Phong Nhận",
        "type": "Phi Hành",
        "power": 17,
        "mpCost": 10,
        "accuracy": 95,
        "heal": 0,
        "buffDef": 0,
        "desc": "Lưỡi đao gió chém ngọt từ không trung"
      },
      {
        "id": 21,
        "name": "Liệp Dực Trảm",
        "type": "Phi Hành",
        "power": 23,
        "mpCost": 14,
        "accuracy": 95,
        "heal": 0,
        "buffDef": 0,
        "desc": "Sải cánh săn mồi chém rách đối thủ"
      },
      {
        "id": 22,
        "name": "Toàn Phong Xung Kích",
        "type": "Phi Hành",
        "power": 29,
        "mpCost": 19,
        "accuracy": 95,
        "heal": 0,
        "buffDef": 0,
        "desc": "Cuộn trọn theo lốc xoáy đâm sầm vào kẻ địch"
      },
      {
        "id": 23,
        "name": "Vũ Dực Cuồng Phong",
        "type": "Phi Hành",
        "power": 37,
        "mpCost": 26,
        "accuracy": 95,
        "heal": 0,
        "buffDef": 0,
        "desc": "Đập cánh tạo siêu bão càn quét trận đấu"
      }
    ]
  },
  {
    "id": 49,
    "code": "cauvong_pet_49",
    "name": "Thiên Mã Vương",
    "type": "Phi Hành",
    "color": "#9b59b6",
    "tier": 3,
    "baseHP": 34,
    "baseMP": 80,
    "baseATK": 14,
    "baseDEF": 13,
    "baseSPD": 11,
    "growth": {
      "hp": 71,
      "mp": 25,
      "atk": 10,
      "def": 12,
      "spd": 8
    },
    "spriteNum": 23,
    "spriteVariant": 0,
    "spriteKey": "npc2_23",
    "sprite": "./img/monsters/npc2_23.png",
    "description": "Thiên Mã tuấn tú hoàn mỹ, Thiên Mã Hoàng Gia kiểu mẫu. [khắc chế Hải Dương hệ]",
    "evolution": [
      -5
    ],
    "skills": [
      {
        "id": 21,
        "name": "Liệp Dực Trảm",
        "type": "Phi Hành",
        "power": 23,
        "mpCost": 14,
        "accuracy": 95,
        "heal": 0,
        "buffDef": 0,
        "desc": "Sải cánh săn mồi chém rách đối thủ"
      },
      {
        "id": 22,
        "name": "Toàn Phong Xung Kích",
        "type": "Phi Hành",
        "power": 29,
        "mpCost": 19,
        "accuracy": 95,
        "heal": 0,
        "buffDef": 0,
        "desc": "Cuộn trọn theo lốc xoáy đâm sầm vào kẻ địch"
      },
      {
        "id": 24,
        "name": "Thần Phong Liệt Không",
        "type": "Phi Hành",
        "power": 48,
        "mpCost": 36,
        "accuracy": 95,
        "heal": 0,
        "buffDef": 0,
        "desc": "Cơn bão thần thánh xé toạc không gian"
      },
      {
        "id": 23,
        "name": "Vũ Dực Cuồng Phong",
        "type": "Phi Hành",
        "power": 37,
        "mpCost": 26,
        "accuracy": 95,
        "heal": 0,
        "buffDef": 0,
        "desc": "Đập cánh tạo siêu bão càn quét trận đấu"
      }
    ]
  },
  {
    "id": 50,
    "code": "cauvong_pet_50",
    "name": "Mao Cầu Điểu",
    "type": "Phi Hành",
    "color": "#9b59b6",
    "tier": 2,
    "baseHP": 33,
    "baseMP": 80,
    "baseATK": 13,
    "baseDEF": 11,
    "baseSPD": 10,
    "growth": {
      "hp": 63,
      "mp": 20,
      "atk": 9,
      "def": 10,
      "spd": 6
    },
    "spriteNum": 24,
    "spriteVariant": 0,
    "spriteKey": "npc2_24",
    "sprite": "./img/monsters/npc2_24.png",
    "description": "Tiền vệ Tiểu Điểu, chim nhỏ tai kẹo đường đáng yêu. [khắc chế Hải Dương hệ]",
    "evolution": [
      25,
      26
    ],
    "skills": [
      {
        "id": 20,
        "name": "Phong Nhận",
        "type": "Phi Hành",
        "power": 17,
        "mpCost": 10,
        "accuracy": 95,
        "heal": 0,
        "buffDef": 0,
        "desc": "Lưỡi đao gió chém ngọt từ không trung"
      },
      {
        "id": 21,
        "name": "Liệp Dực Trảm",
        "type": "Phi Hành",
        "power": 23,
        "mpCost": 14,
        "accuracy": 95,
        "heal": 0,
        "buffDef": 0,
        "desc": "Sải cánh săn mồi chém rách đối thủ"
      },
      {
        "id": 22,
        "name": "Toàn Phong Xung Kích",
        "type": "Phi Hành",
        "power": 29,
        "mpCost": 19,
        "accuracy": 95,
        "heal": 0,
        "buffDef": 0,
        "desc": "Cuộn trọn theo lốc xoáy đâm sầm vào kẻ địch"
      },
      {
        "id": 23,
        "name": "Vũ Dực Cuồng Phong",
        "type": "Phi Hành",
        "power": 37,
        "mpCost": 26,
        "accuracy": 95,
        "heal": 0,
        "buffDef": 0,
        "desc": "Đập cánh tạo siêu bão càn quét trận đấu"
      }
    ]
  },
  {
    "id": 51,
    "code": "cauvong_pet_51",
    "name": "Phiêu Phù Mao Cầu",
    "type": "Phi Hành",
    "color": "#9b59b6",
    "tier": 3,
    "baseHP": 34,
    "baseMP": 80,
    "baseATK": 14,
    "baseDEF": 13,
    "baseSPD": 10,
    "growth": {
      "hp": 79,
      "mp": 25,
      "atk": 10,
      "def": 12,
      "spd": 8
    },
    "spriteNum": 24,
    "spriteVariant": 1,
    "spriteKey": "npc2_24",
    "sprite": "./img/monsters/npc2_24.png",
    "description": "Tiểu Điểu lông xù, tánh khí táo bạo. [khắc chế Hải Dương hệ]",
    "evolution": [
      -2
    ],
    "skills": [
      {
        "id": 21,
        "name": "Liệp Dực Trảm",
        "type": "Phi Hành",
        "power": 23,
        "mpCost": 14,
        "accuracy": 95,
        "heal": 0,
        "buffDef": 0,
        "desc": "Sải cánh săn mồi chém rách đối thủ"
      },
      {
        "id": 22,
        "name": "Toàn Phong Xung Kích",
        "type": "Phi Hành",
        "power": 29,
        "mpCost": 19,
        "accuracy": 95,
        "heal": 0,
        "buffDef": 0,
        "desc": "Cuộn trọn theo lốc xoáy đâm sầm vào kẻ địch"
      },
      {
        "id": 24,
        "name": "Thần Phong Liệt Không",
        "type": "Phi Hành",
        "power": 48,
        "mpCost": 36,
        "accuracy": 95,
        "heal": 0,
        "buffDef": 0,
        "desc": "Cơn bão thần thánh xé toạc không gian"
      },
      {
        "id": 23,
        "name": "Vũ Dực Cuồng Phong",
        "type": "Phi Hành",
        "power": 37,
        "mpCost": 26,
        "accuracy": 95,
        "heal": 0,
        "buffDef": 0,
        "desc": "Đập cánh tạo siêu bão càn quét trận đấu"
      }
    ]
  },
  {
    "id": 52,
    "code": "cauvong_pet_52",
    "name": "Pháp Quan Mao Cầu",
    "type": "Phi Hành",
    "color": "#9b59b6",
    "tier": 4,
    "baseHP": 34,
    "baseMP": 80,
    "baseATK": 14,
    "baseDEF": 13,
    "baseSPD": 11,
    "growth": {
      "hp": 85,
      "mp": 30,
      "atk": 10,
      "def": 12,
      "spd": 9
    },
    "spriteNum": 24,
    "spriteVariant": 2,
    "spriteKey": "npc2_24",
    "sprite": "./img/monsters/npc2_24.png",
    "description": "Trạng thái đỉnh cao Mao Cầu, trưởng thành, trang trọng. [khắc chế Hải Dương hệ]",
    "evolution": [
      -3
    ],
    "skills": [
      {
        "id": 21,
        "name": "Liệp Dực Trảm",
        "type": "Phi Hành",
        "power": 23,
        "mpCost": 14,
        "accuracy": 95,
        "heal": 0,
        "buffDef": 0,
        "desc": "Sải cánh săn mồi chém rách đối thủ"
      },
      {
        "id": 22,
        "name": "Toàn Phong Xung Kích",
        "type": "Phi Hành",
        "power": 29,
        "mpCost": 19,
        "accuracy": 95,
        "heal": 0,
        "buffDef": 0,
        "desc": "Cuộn trọn theo lốc xoáy đâm sầm vào kẻ địch"
      },
      {
        "id": 24,
        "name": "Thần Phong Liệt Không",
        "type": "Phi Hành",
        "power": 48,
        "mpCost": 36,
        "accuracy": 95,
        "heal": 0,
        "buffDef": 0,
        "desc": "Cơn bão thần thánh xé toạc không gian"
      },
      {
        "id": 23,
        "name": "Vũ Dực Cuồng Phong",
        "type": "Phi Hành",
        "power": 37,
        "mpCost": 26,
        "accuracy": 95,
        "heal": 0,
        "buffDef": 0,
        "desc": "Đập cánh tạo siêu bão càn quét trận đấu"
      }
    ]
  },
  {
    "id": 53,
    "code": "cauvong_pet_53",
    "name": "Hổ Thú",
    "type": "Mãnh Thú",
    "color": "#e74c3c",
    "tier": 1,
    "baseHP": 43,
    "baseMP": 80,
    "baseATK": 13,
    "baseDEF": 10,
    "baseSPD": 10,
    "growth": {
      "hp": 75,
      "mp": 18,
      "atk": 9,
      "def": 8,
      "spd": 6
    },
    "spriteNum": 25,
    "spriteVariant": 0,
    "spriteKey": "npc2_25",
    "sprite": "./img/monsters/npc2_25.png",
    "description": "Lão Hổ răng hô đáng yêu. [khắc chế Thực Vật hệ]",
    "evolution": [
      -1
    ],
    "skills": [
      {
        "id": 30,
        "name": "Liệt Trảo",
        "type": "Mãnh Thú",
        "power": 17,
        "mpCost": 10,
        "accuracy": 95,
        "heal": 0,
        "buffDef": 0,
        "desc": "Móng vuốt rực lửa cào xé dữ dội"
      },
      {
        "id": 31,
        "name": "Cuồng Bạo Xung Chàng",
        "type": "Mãnh Thú",
        "power": 23,
        "mpCost": 14,
        "accuracy": 95,
        "heal": 0,
        "buffDef": 0,
        "desc": "Húc mạnh bạo liệt hất văng đối thủ"
      },
      {
        "id": 32,
        "name": "Viêm Hống Toái Cốt",
        "type": "Mãnh Thú",
        "power": 29,
        "mpCost": 19,
        "accuracy": 95,
        "heal": 0,
        "buffDef": 0,
        "desc": "Tiếng gầm rực lửa làm rúng động và nứt giáp đối thủ"
      },
      {
        "id": 36,
        "name": "Diễm Kích",
        "type": "Mãnh Thú",
        "power": 26,
        "mpCost": 17,
        "accuracy": 95,
        "heal": 0,
        "buffDef": 0,
        "desc": "Phóng đạn lửa nổ tung khi va chạm"
      }
    ]
  },
  {
    "id": 54,
    "code": "cauvong_pet_54",
    "name": "Công phu hổ",
    "type": "Mãnh Thú",
    "color": "#e74c3c",
    "tier": 2,
    "baseHP": 44,
    "baseMP": 80,
    "baseATK": 14,
    "baseDEF": 11,
    "baseSPD": 10,
    "growth": {
      "hp": 83,
      "mp": 23,
      "atk": 10,
      "def": 9,
      "spd": 7
    },
    "spriteNum": 25,
    "spriteVariant": 1,
    "spriteKey": "npc2_25",
    "sprite": "./img/monsters/npc2_25.png",
    "description": "Chiến sỹ ưu tú nhất đứng đầu Hổ Tộc. [khắc chế Thực Vật hệ]",
    "evolution": [
      -2
    ],
    "skills": [
      {
        "id": 30,
        "name": "Liệt Trảo",
        "type": "Mãnh Thú",
        "power": 17,
        "mpCost": 10,
        "accuracy": 95,
        "heal": 0,
        "buffDef": 0,
        "desc": "Móng vuốt rực lửa cào xé dữ dội"
      },
      {
        "id": 31,
        "name": "Cuồng Bạo Xung Chàng",
        "type": "Mãnh Thú",
        "power": 23,
        "mpCost": 14,
        "accuracy": 95,
        "heal": 0,
        "buffDef": 0,
        "desc": "Húc mạnh bạo liệt hất văng đối thủ"
      },
      {
        "id": 32,
        "name": "Viêm Hống Toái Cốt",
        "type": "Mãnh Thú",
        "power": 29,
        "mpCost": 19,
        "accuracy": 95,
        "heal": 0,
        "buffDef": 0,
        "desc": "Tiếng gầm rực lửa làm rúng động và nứt giáp đối thủ"
      },
      {
        "id": 33,
        "name": "Nộ Diễm Liệt Ba",
        "type": "Mãnh Thú",
        "power": 38,
        "mpCost": 27,
        "accuracy": 95,
        "heal": 0,
        "buffDef": 0,
        "desc": "Sóng lửa cuộn trào thiêu đốt toàn bộ vùng xung quanh"
      }
    ]
  },
  {
    "id": 55,
    "code": "cauvong_pet_55",
    "name": "Hổ Dũng Sĩ",
    "type": "Mãnh Thú",
    "color": "#e74c3c",
    "tier": 3,
    "baseHP": 47,
    "baseMP": 80,
    "baseATK": 15,
    "baseDEF": 12,
    "baseSPD": 11,
    "growth": {
      "hp": 91,
      "mp": 27,
      "atk": 11,
      "def": 10,
      "spd": 8
    },
    "spriteNum": 25,
    "spriteVariant": 2,
    "spriteKey": "npc2_25",
    "sprite": "./img/monsters/npc2_25.png",
    "description": "Hổ Tộc là những chiến sỹ dũng mãnh và quyết liệt. [khắc chế Thực Vật hệ]",
    "evolution": [
      -2
    ],
    "skills": [
      {
        "id": 31,
        "name": "Cuồng Bạo Xung Chàng",
        "type": "Mãnh Thú",
        "power": 23,
        "mpCost": 14,
        "accuracy": 95,
        "heal": 0,
        "buffDef": 0,
        "desc": "Húc mạnh bạo liệt hất văng đối thủ"
      },
      {
        "id": 32,
        "name": "Viêm Hống Toái Cốt",
        "type": "Mãnh Thú",
        "power": 29,
        "mpCost": 19,
        "accuracy": 95,
        "heal": 0,
        "buffDef": 0,
        "desc": "Tiếng gầm rực lửa làm rúng động và nứt giáp đối thủ"
      },
      {
        "id": 34,
        "name": "Hồng Liên Liệt Hỏa",
        "type": "Mãnh Thú",
        "power": 50,
        "mpCost": 38,
        "accuracy": 95,
        "heal": 0,
        "buffDef": 0,
        "desc": "Hoa sen lửa địa ngục hủy diệt vạn vật"
      },
      {
        "id": 33,
        "name": "Nộ Diễm Liệt Ba",
        "type": "Mãnh Thú",
        "power": 38,
        "mpCost": 27,
        "accuracy": 95,
        "heal": 0,
        "buffDef": 0,
        "desc": "Sóng lửa cuộn trào thiêu đốt toàn bộ vùng xung quanh"
      }
    ]
  },
  {
    "id": 56,
    "code": "cauvong_pet_56",
    "name": "Hổ Tù Trường",
    "type": "Mãnh Thú",
    "color": "#e74c3c",
    "tier": 4,
    "baseHP": 47,
    "baseMP": 80,
    "baseATK": 15,
    "baseDEF": 12,
    "baseSPD": 12,
    "growth": {
      "hp": 110,
      "mp": 30,
      "atk": 11,
      "def": 12,
      "spd": 9
    },
    "spriteNum": 25,
    "spriteVariant": 3,
    "spriteKey": "npc2_25",
    "sprite": "./img/monsters/npc2_25.png",
    "description": "Lão hổ sáu tay, sức mạnh phi thường, là đại thủ lĩnh Hổ Tộc. [khắc chế Thực Vật hệ]",
    "evolution": [
      -2
    ],
    "skills": [
      {
        "id": 31,
        "name": "Cuồng Bạo Xung Chàng",
        "type": "Mãnh Thú",
        "power": 23,
        "mpCost": 14,
        "accuracy": 95,
        "heal": 0,
        "buffDef": 0,
        "desc": "Húc mạnh bạo liệt hất văng đối thủ"
      },
      {
        "id": 32,
        "name": "Viêm Hống Toái Cốt",
        "type": "Mãnh Thú",
        "power": 29,
        "mpCost": 19,
        "accuracy": 95,
        "heal": 0,
        "buffDef": 0,
        "desc": "Tiếng gầm rực lửa làm rúng động và nứt giáp đối thủ"
      },
      {
        "id": 34,
        "name": "Hồng Liên Liệt Hỏa",
        "type": "Mãnh Thú",
        "power": 50,
        "mpCost": 38,
        "accuracy": 95,
        "heal": 0,
        "buffDef": 0,
        "desc": "Hoa sen lửa địa ngục hủy diệt vạn vật"
      },
      {
        "id": 33,
        "name": "Nộ Diễm Liệt Ba",
        "type": "Mãnh Thú",
        "power": 38,
        "mpCost": 27,
        "accuracy": 95,
        "heal": 0,
        "buffDef": 0,
        "desc": "Sóng lửa cuộn trào thiêu đốt toàn bộ vùng xung quanh"
      }
    ]
  },
  {
    "id": 57,
    "code": "cauvong_pet_57",
    "name": "Ngựa núi",
    "type": "Mãnh Thú",
    "color": "#e74c3c",
    "tier": 1,
    "baseHP": 42,
    "baseMP": 80,
    "baseATK": 12,
    "baseDEF": 10,
    "baseSPD": 10,
    "growth": {
      "hp": 66,
      "mp": 15,
      "atk": 8,
      "def": 7,
      "spd": 5
    },
    "spriteNum": 26,
    "spriteVariant": 0,
    "spriteKey": "npc2_26",
    "sprite": "./img/monsters/npc2_26.png",
    "description": "Ngựa xanh phi thường, đặc biệt rất bảo vệ môi trường. [khắc chế Thực Vật hệ]",
    "evolution": [
      11,
      14,
      38
    ],
    "skills": [
      {
        "id": 30,
        "name": "Liệt Trảo",
        "type": "Mãnh Thú",
        "power": 17,
        "mpCost": 10,
        "accuracy": 95,
        "heal": 0,
        "buffDef": 0,
        "desc": "Móng vuốt rực lửa cào xé dữ dội"
      },
      {
        "id": 31,
        "name": "Cuồng Bạo Xung Chàng",
        "type": "Mãnh Thú",
        "power": 23,
        "mpCost": 14,
        "accuracy": 95,
        "heal": 0,
        "buffDef": 0,
        "desc": "Húc mạnh bạo liệt hất văng đối thủ"
      },
      {
        "id": 32,
        "name": "Viêm Hống Toái Cốt",
        "type": "Mãnh Thú",
        "power": 29,
        "mpCost": 19,
        "accuracy": 95,
        "heal": 0,
        "buffDef": 0,
        "desc": "Tiếng gầm rực lửa làm rúng động và nứt giáp đối thủ"
      },
      {
        "id": 36,
        "name": "Diễm Kích",
        "type": "Mãnh Thú",
        "power": 26,
        "mpCost": 17,
        "accuracy": 95,
        "heal": 0,
        "buffDef": 0,
        "desc": "Phóng đạn lửa nổ tung khi va chạm"
      }
    ]
  },
  {
    "id": 58,
    "code": "cauvong_pet_58",
    "name": "Ngựa vằn",
    "type": "Mãnh Thú",
    "color": "#e74c3c",
    "tier": 2,
    "baseHP": 43,
    "baseMP": 80,
    "baseATK": 13,
    "baseDEF": 10,
    "baseSPD": 10,
    "growth": {
      "hp": 88,
      "mp": 20,
      "atk": 9,
      "def": 8,
      "spd": 6
    },
    "spriteNum": 26,
    "spriteVariant": 1,
    "spriteKey": "npc2_26",
    "sprite": "./img/monsters/npc2_26.png",
    "description": "Ánh hào quang lấp lóe xung quanh. [khắc chế Thực Vật hệ]",
    "evolution": [
      -2
    ],
    "skills": [
      {
        "id": 30,
        "name": "Liệt Trảo",
        "type": "Mãnh Thú",
        "power": 17,
        "mpCost": 10,
        "accuracy": 95,
        "heal": 0,
        "buffDef": 0,
        "desc": "Móng vuốt rực lửa cào xé dữ dội"
      },
      {
        "id": 31,
        "name": "Cuồng Bạo Xung Chàng",
        "type": "Mãnh Thú",
        "power": 23,
        "mpCost": 14,
        "accuracy": 95,
        "heal": 0,
        "buffDef": 0,
        "desc": "Húc mạnh bạo liệt hất văng đối thủ"
      },
      {
        "id": 32,
        "name": "Viêm Hống Toái Cốt",
        "type": "Mãnh Thú",
        "power": 29,
        "mpCost": 19,
        "accuracy": 95,
        "heal": 0,
        "buffDef": 0,
        "desc": "Tiếng gầm rực lửa làm rúng động và nứt giáp đối thủ"
      },
      {
        "id": 33,
        "name": "Nộ Diễm Liệt Ba",
        "type": "Mãnh Thú",
        "power": 38,
        "mpCost": 27,
        "accuracy": 95,
        "heal": 0,
        "buffDef": 0,
        "desc": "Sóng lửa cuộn trào thiêu đốt toàn bộ vùng xung quanh"
      }
    ]
  },
  {
    "id": 59,
    "code": "cauvong_pet_59",
    "name": "Ngựa lưỡi liềm khổng lồ",
    "type": "Mãnh Thú",
    "color": "#e74c3c",
    "tier": 3,
    "baseHP": 44,
    "baseMP": 80,
    "baseATK": 15,
    "baseDEF": 10,
    "baseSPD": 10,
    "growth": {
      "hp": 104,
      "mp": 25,
      "atk": 10,
      "def": 10,
      "spd": 8
    },
    "spriteNum": 26,
    "spriteVariant": 2,
    "spriteKey": "npc2_26",
    "sprite": "./img/monsters/npc2_26.png",
    "description": "Cầm trong tay Song Đao Đường Lang mạnh mẽ. [khắc chế Thực Vật hệ]",
    "evolution": [
      -1
    ],
    "skills": [
      {
        "id": 31,
        "name": "Cuồng Bạo Xung Chàng",
        "type": "Mãnh Thú",
        "power": 23,
        "mpCost": 14,
        "accuracy": 95,
        "heal": 0,
        "buffDef": 0,
        "desc": "Húc mạnh bạo liệt hất văng đối thủ"
      },
      {
        "id": 32,
        "name": "Viêm Hống Toái Cốt",
        "type": "Mãnh Thú",
        "power": 29,
        "mpCost": 19,
        "accuracy": 95,
        "heal": 0,
        "buffDef": 0,
        "desc": "Tiếng gầm rực lửa làm rúng động và nứt giáp đối thủ"
      },
      {
        "id": 34,
        "name": "Hồng Liên Liệt Hỏa",
        "type": "Mãnh Thú",
        "power": 50,
        "mpCost": 38,
        "accuracy": 95,
        "heal": 0,
        "buffDef": 0,
        "desc": "Hoa sen lửa địa ngục hủy diệt vạn vật"
      },
      {
        "id": 33,
        "name": "Nộ Diễm Liệt Ba",
        "type": "Mãnh Thú",
        "power": 38,
        "mpCost": 27,
        "accuracy": 95,
        "heal": 0,
        "buffDef": 0,
        "desc": "Sóng lửa cuộn trào thiêu đốt toàn bộ vùng xung quanh"
      }
    ]
  },
  {
    "id": 60,
    "code": "cauvong_pet_60",
    "name": "Heo núi",
    "type": "Mãnh Thú",
    "color": "#e74c3c",
    "tier": 1,
    "baseHP": 42,
    "baseMP": 80,
    "baseATK": 12,
    "baseDEF": 10,
    "baseSPD": 10,
    "growth": {
      "hp": 66,
      "mp": 15,
      "atk": 8,
      "def": 6,
      "spd": 5
    },
    "spriteNum": 27,
    "spriteVariant": 0,
    "spriteKey": "npc2_27",
    "sprite": "./img/monsters/npc2_27.png",
    "description": "Tiểu Trư phàm ăn phàm ngủ hay chảy nước mũi. [khắc chế Thực Vật hệ]",
    "evolution": [
      12,
      15,
      39
    ],
    "skills": [
      {
        "id": 30,
        "name": "Liệt Trảo",
        "type": "Mãnh Thú",
        "power": 17,
        "mpCost": 10,
        "accuracy": 95,
        "heal": 0,
        "buffDef": 0,
        "desc": "Móng vuốt rực lửa cào xé dữ dội"
      },
      {
        "id": 31,
        "name": "Cuồng Bạo Xung Chàng",
        "type": "Mãnh Thú",
        "power": 23,
        "mpCost": 14,
        "accuracy": 95,
        "heal": 0,
        "buffDef": 0,
        "desc": "Húc mạnh bạo liệt hất văng đối thủ"
      },
      {
        "id": 32,
        "name": "Viêm Hống Toái Cốt",
        "type": "Mãnh Thú",
        "power": 29,
        "mpCost": 19,
        "accuracy": 95,
        "heal": 0,
        "buffDef": 0,
        "desc": "Tiếng gầm rực lửa làm rúng động và nứt giáp đối thủ"
      },
      {
        "id": 36,
        "name": "Diễm Kích",
        "type": "Mãnh Thú",
        "power": 26,
        "mpCost": 17,
        "accuracy": 95,
        "heal": 0,
        "buffDef": 0,
        "desc": "Phóng đạn lửa nổ tung khi va chạm"
      }
    ]
  },
  {
    "id": 61,
    "code": "cauvong_pet_61",
    "name": "Heo răng nanh khổng lồ",
    "type": "Mãnh Thú",
    "color": "#e74c3c",
    "tier": 2,
    "baseHP": 43,
    "baseMP": 80,
    "baseATK": 13,
    "baseDEF": 10,
    "baseSPD": 11,
    "growth": {
      "hp": 76,
      "mp": 20,
      "atk": 9,
      "def": 8,
      "spd": 6
    },
    "spriteNum": 27,
    "spriteVariant": 1,
    "spriteKey": "npc2_27",
    "sprite": "./img/monsters/npc2_27.png",
    "description": "Heo rừng trong giới xã hội đen, rõ ràng ngay thẳng. [khắc chế Thực Vật hệ]",
    "evolution": [
      -2
    ],
    "skills": [
      {
        "id": 30,
        "name": "Liệt Trảo",
        "type": "Mãnh Thú",
        "power": 17,
        "mpCost": 10,
        "accuracy": 95,
        "heal": 0,
        "buffDef": 0,
        "desc": "Móng vuốt rực lửa cào xé dữ dội"
      },
      {
        "id": 31,
        "name": "Cuồng Bạo Xung Chàng",
        "type": "Mãnh Thú",
        "power": 23,
        "mpCost": 14,
        "accuracy": 95,
        "heal": 0,
        "buffDef": 0,
        "desc": "Húc mạnh bạo liệt hất văng đối thủ"
      },
      {
        "id": 32,
        "name": "Viêm Hống Toái Cốt",
        "type": "Mãnh Thú",
        "power": 29,
        "mpCost": 19,
        "accuracy": 95,
        "heal": 0,
        "buffDef": 0,
        "desc": "Tiếng gầm rực lửa làm rúng động và nứt giáp đối thủ"
      },
      {
        "id": 33,
        "name": "Nộ Diễm Liệt Ba",
        "type": "Mãnh Thú",
        "power": 38,
        "mpCost": 27,
        "accuracy": 95,
        "heal": 0,
        "buffDef": 0,
        "desc": "Sóng lửa cuộn trào thiêu đốt toàn bộ vùng xung quanh"
      }
    ]
  },
  {
    "id": 62,
    "code": "cauvong_pet_62",
    "name": "Trư Vương",
    "type": "Mãnh Thú",
    "color": "#e74c3c",
    "tier": 3,
    "baseHP": 44,
    "baseMP": 80,
    "baseATK": 14,
    "baseDEF": 10,
    "baseSPD": 11,
    "growth": {
      "hp": 86,
      "mp": 25,
      "atk": 10,
      "def": 10,
      "spd": 7
    },
    "spriteNum": 27,
    "spriteVariant": 2,
    "spriteKey": "npc2_27",
    "sprite": "./img/monsters/npc2_27.png",
    "description": "Heo rừng lão đại tánh khí táo bạo. [khắc chế Thực Vật hệ]",
    "evolution": [
      -2
    ],
    "skills": [
      {
        "id": 31,
        "name": "Cuồng Bạo Xung Chàng",
        "type": "Mãnh Thú",
        "power": 23,
        "mpCost": 14,
        "accuracy": 95,
        "heal": 0,
        "buffDef": 0,
        "desc": "Húc mạnh bạo liệt hất văng đối thủ"
      },
      {
        "id": 32,
        "name": "Viêm Hống Toái Cốt",
        "type": "Mãnh Thú",
        "power": 29,
        "mpCost": 19,
        "accuracy": 95,
        "heal": 0,
        "buffDef": 0,
        "desc": "Tiếng gầm rực lửa làm rúng động và nứt giáp đối thủ"
      },
      {
        "id": 34,
        "name": "Hồng Liên Liệt Hỏa",
        "type": "Mãnh Thú",
        "power": 50,
        "mpCost": 38,
        "accuracy": 95,
        "heal": 0,
        "buffDef": 0,
        "desc": "Hoa sen lửa địa ngục hủy diệt vạn vật"
      },
      {
        "id": 33,
        "name": "Nộ Diễm Liệt Ba",
        "type": "Mãnh Thú",
        "power": 38,
        "mpCost": 27,
        "accuracy": 95,
        "heal": 0,
        "buffDef": 0,
        "desc": "Sóng lửa cuộn trào thiêu đốt toàn bộ vùng xung quanh"
      }
    ]
  },
  {
    "id": 63,
    "code": "cauvong_pet_63",
    "name": "Heo đốm",
    "type": "Mãnh Thú",
    "color": "#e74c3c",
    "tier": 4,
    "baseHP": 45,
    "baseMP": 80,
    "baseATK": 15,
    "baseDEF": 12,
    "baseSPD": 12,
    "growth": {
      "hp": 90,
      "mp": 28,
      "atk": 10,
      "def": 10,
      "spd": 9
    },
    "spriteNum": 27,
    "spriteVariant": 3,
    "spriteKey": "npc2_27",
    "sprite": "./img/monsters/npc2_27.png",
    "description": "Heo 101 đốm lấm tấm. [khắc chế Thực Vật hệ]",
    "evolution": [
      -5
    ],
    "skills": [
      {
        "id": 31,
        "name": "Cuồng Bạo Xung Chàng",
        "type": "Mãnh Thú",
        "power": 23,
        "mpCost": 14,
        "accuracy": 95,
        "heal": 0,
        "buffDef": 0,
        "desc": "Húc mạnh bạo liệt hất văng đối thủ"
      },
      {
        "id": 32,
        "name": "Viêm Hống Toái Cốt",
        "type": "Mãnh Thú",
        "power": 29,
        "mpCost": 19,
        "accuracy": 95,
        "heal": 0,
        "buffDef": 0,
        "desc": "Tiếng gầm rực lửa làm rúng động và nứt giáp đối thủ"
      },
      {
        "id": 34,
        "name": "Hồng Liên Liệt Hỏa",
        "type": "Mãnh Thú",
        "power": 50,
        "mpCost": 38,
        "accuracy": 95,
        "heal": 0,
        "buffDef": 0,
        "desc": "Hoa sen lửa địa ngục hủy diệt vạn vật"
      },
      {
        "id": 33,
        "name": "Nộ Diễm Liệt Ba",
        "type": "Mãnh Thú",
        "power": 38,
        "mpCost": 27,
        "accuracy": 95,
        "heal": 0,
        "buffDef": 0,
        "desc": "Sóng lửa cuộn trào thiêu đốt toàn bộ vùng xung quanh"
      }
    ]
  },
  {
    "id": 64,
    "code": "cauvong_pet_64",
    "name": "Sơn báo",
    "type": "Mãnh Thú",
    "color": "#e74c3c",
    "tier": 1,
    "baseHP": 42,
    "baseMP": 80,
    "baseATK": 12,
    "baseDEF": 10,
    "baseSPD": 10,
    "growth": {
      "hp": 62,
      "mp": 15,
      "atk": 8,
      "def": 6,
      "spd": 5
    },
    "spriteNum": 28,
    "spriteVariant": 0,
    "spriteKey": "npc2_28",
    "sprite": "./img/monsters/npc2_28.png",
    "description": "Tiểu Báo Tử dễ bị nhầm lẫn là tiểu miêu. [khắc chế Thực Vật hệ]",
    "evolution": [
      17,
      20
    ],
    "skills": [
      {
        "id": 30,
        "name": "Liệt Trảo",
        "type": "Mãnh Thú",
        "power": 17,
        "mpCost": 10,
        "accuracy": 95,
        "heal": 0,
        "buffDef": 0,
        "desc": "Móng vuốt rực lửa cào xé dữ dội"
      },
      {
        "id": 31,
        "name": "Cuồng Bạo Xung Chàng",
        "type": "Mãnh Thú",
        "power": 23,
        "mpCost": 14,
        "accuracy": 95,
        "heal": 0,
        "buffDef": 0,
        "desc": "Húc mạnh bạo liệt hất văng đối thủ"
      },
      {
        "id": 32,
        "name": "Viêm Hống Toái Cốt",
        "type": "Mãnh Thú",
        "power": 29,
        "mpCost": 19,
        "accuracy": 95,
        "heal": 0,
        "buffDef": 0,
        "desc": "Tiếng gầm rực lửa làm rúng động và nứt giáp đối thủ"
      },
      {
        "id": 36,
        "name": "Diễm Kích",
        "type": "Mãnh Thú",
        "power": 26,
        "mpCost": 17,
        "accuracy": 95,
        "heal": 0,
        "buffDef": 0,
        "desc": "Phóng đạn lửa nổ tung khi va chạm"
      }
    ]
  },
  {
    "id": 65,
    "code": "cauvong_pet_65",
    "name": "Beo răng kiếm",
    "type": "Mãnh Thú",
    "color": "#e74c3c",
    "tier": 2,
    "baseHP": 43,
    "baseMP": 80,
    "baseATK": 13,
    "baseDEF": 10,
    "baseSPD": 10,
    "growth": {
      "hp": 92,
      "mp": 20,
      "atk": 9,
      "def": 8,
      "spd": 6
    },
    "spriteNum": 29,
    "spriteVariant": 0,
    "spriteKey": "npc2_29",
    "sprite": "./img/monsters/npc2_29.png",
    "description": "Hàm răng móng vuốt 10 phần sắc bén. [khắc chế Thực Vật hệ]",
    "evolution": [
      -2
    ],
    "skills": [
      {
        "id": 30,
        "name": "Liệt Trảo",
        "type": "Mãnh Thú",
        "power": 17,
        "mpCost": 10,
        "accuracy": 95,
        "heal": 0,
        "buffDef": 0,
        "desc": "Móng vuốt rực lửa cào xé dữ dội"
      },
      {
        "id": 31,
        "name": "Cuồng Bạo Xung Chàng",
        "type": "Mãnh Thú",
        "power": 23,
        "mpCost": 14,
        "accuracy": 95,
        "heal": 0,
        "buffDef": 0,
        "desc": "Húc mạnh bạo liệt hất văng đối thủ"
      },
      {
        "id": 32,
        "name": "Viêm Hống Toái Cốt",
        "type": "Mãnh Thú",
        "power": 29,
        "mpCost": 19,
        "accuracy": 95,
        "heal": 0,
        "buffDef": 0,
        "desc": "Tiếng gầm rực lửa làm rúng động và nứt giáp đối thủ"
      },
      {
        "id": 33,
        "name": "Nộ Diễm Liệt Ba",
        "type": "Mãnh Thú",
        "power": 38,
        "mpCost": 27,
        "accuracy": 95,
        "heal": 0,
        "buffDef": 0,
        "desc": "Sóng lửa cuộn trào thiêu đốt toàn bộ vùng xung quanh"
      }
    ]
  },
  {
    "id": 66,
    "code": "cauvong_pet_66",
    "name": "Mị Ảnh",
    "type": "Mãnh Thú",
    "color": "#e74c3c",
    "tier": 3,
    "baseHP": 44,
    "baseMP": 80,
    "baseATK": 14,
    "baseDEF": 10,
    "baseSPD": 11,
    "growth": {
      "hp": 96,
      "mp": 25,
      "atk": 10,
      "def": 10,
      "spd": 8
    },
    "spriteNum": 29,
    "spriteVariant": 1,
    "spriteKey": "npc2_29",
    "sprite": "./img/monsters/npc2_29.png",
    "description": "Vương giả ẩn giấu trong bóng tối. [khắc chế Thực Vật hệ]",
    "evolution": [
      41,
      42
    ],
    "skills": [
      {
        "id": 31,
        "name": "Cuồng Bạo Xung Chàng",
        "type": "Mãnh Thú",
        "power": 23,
        "mpCost": 14,
        "accuracy": 95,
        "heal": 0,
        "buffDef": 0,
        "desc": "Húc mạnh bạo liệt hất văng đối thủ"
      },
      {
        "id": 32,
        "name": "Viêm Hống Toái Cốt",
        "type": "Mãnh Thú",
        "power": 29,
        "mpCost": 19,
        "accuracy": 95,
        "heal": 0,
        "buffDef": 0,
        "desc": "Tiếng gầm rực lửa làm rúng động và nứt giáp đối thủ"
      },
      {
        "id": 34,
        "name": "Hồng Liên Liệt Hỏa",
        "type": "Mãnh Thú",
        "power": 50,
        "mpCost": 38,
        "accuracy": 95,
        "heal": 0,
        "buffDef": 0,
        "desc": "Hoa sen lửa địa ngục hủy diệt vạn vật"
      },
      {
        "id": 33,
        "name": "Nộ Diễm Liệt Ba",
        "type": "Mãnh Thú",
        "power": 38,
        "mpCost": 27,
        "accuracy": 95,
        "heal": 0,
        "buffDef": 0,
        "desc": "Sóng lửa cuộn trào thiêu đốt toàn bộ vùng xung quanh"
      }
    ]
  },
  {
    "id": 67,
    "code": "cauvong_pet_67",
    "name": "Dị Thú",
    "type": "Mãnh Thú",
    "color": "#e74c3c",
    "tier": 2,
    "baseHP": 43,
    "baseMP": 80,
    "baseATK": 13,
    "baseDEF": 10,
    "baseSPD": 10,
    "growth": {
      "hp": 84,
      "mp": 20,
      "atk": 9,
      "def": 8,
      "spd": 6
    },
    "spriteNum": 30,
    "spriteVariant": 0,
    "spriteKey": "npc2_30",
    "sprite": "./img/monsters/npc2_30.png",
    "description": "Hành Tây Dị Thú hoạt bát. [khắc chế Thực Vật hệ]",
    "evolution": [
      -1
    ],
    "skills": [
      {
        "id": 30,
        "name": "Liệt Trảo",
        "type": "Mãnh Thú",
        "power": 17,
        "mpCost": 10,
        "accuracy": 95,
        "heal": 0,
        "buffDef": 0,
        "desc": "Móng vuốt rực lửa cào xé dữ dội"
      },
      {
        "id": 31,
        "name": "Cuồng Bạo Xung Chàng",
        "type": "Mãnh Thú",
        "power": 23,
        "mpCost": 14,
        "accuracy": 95,
        "heal": 0,
        "buffDef": 0,
        "desc": "Húc mạnh bạo liệt hất văng đối thủ"
      },
      {
        "id": 32,
        "name": "Viêm Hống Toái Cốt",
        "type": "Mãnh Thú",
        "power": 29,
        "mpCost": 19,
        "accuracy": 95,
        "heal": 0,
        "buffDef": 0,
        "desc": "Tiếng gầm rực lửa làm rúng động và nứt giáp đối thủ"
      },
      {
        "id": 33,
        "name": "Nộ Diễm Liệt Ba",
        "type": "Mãnh Thú",
        "power": 38,
        "mpCost": 27,
        "accuracy": 95,
        "heal": 0,
        "buffDef": 0,
        "desc": "Sóng lửa cuộn trào thiêu đốt toàn bộ vùng xung quanh"
      }
    ]
  },
  {
    "id": 68,
    "code": "cauvong_pet_68",
    "name": "Chân Dị Thú",
    "type": "Mãnh Thú",
    "color": "#e74c3c",
    "tier": 3,
    "baseHP": 44,
    "baseMP": 80,
    "baseATK": 14,
    "baseDEF": 11,
    "baseSPD": 10,
    "growth": {
      "hp": 108,
      "mp": 25,
      "atk": 10,
      "def": 10,
      "spd": 8
    },
    "spriteNum": 31,
    "spriteVariant": 0,
    "spriteKey": "npc2_31",
    "sprite": "./img/monsters/npc2_31.png",
    "description": "Tốc độ rất nhanh, danh xưng là “ Lôi Điện ”. [khắc chế Thực Vật hệ]",
    "evolution": [
      18,
      20,
      41
    ],
    "skills": [
      {
        "id": 31,
        "name": "Cuồng Bạo Xung Chàng",
        "type": "Mãnh Thú",
        "power": 23,
        "mpCost": 14,
        "accuracy": 95,
        "heal": 0,
        "buffDef": 0,
        "desc": "Húc mạnh bạo liệt hất văng đối thủ"
      },
      {
        "id": 32,
        "name": "Viêm Hống Toái Cốt",
        "type": "Mãnh Thú",
        "power": 29,
        "mpCost": 19,
        "accuracy": 95,
        "heal": 0,
        "buffDef": 0,
        "desc": "Tiếng gầm rực lửa làm rúng động và nứt giáp đối thủ"
      },
      {
        "id": 34,
        "name": "Hồng Liên Liệt Hỏa",
        "type": "Mãnh Thú",
        "power": 50,
        "mpCost": 38,
        "accuracy": 95,
        "heal": 0,
        "buffDef": 0,
        "desc": "Hoa sen lửa địa ngục hủy diệt vạn vật"
      },
      {
        "id": 33,
        "name": "Nộ Diễm Liệt Ba",
        "type": "Mãnh Thú",
        "power": 38,
        "mpCost": 27,
        "accuracy": 95,
        "heal": 0,
        "buffDef": 0,
        "desc": "Sóng lửa cuộn trào thiêu đốt toàn bộ vùng xung quanh"
      }
    ]
  },
  {
    "id": 69,
    "code": "cauvong_pet_69",
    "name": "Tiểu Lam Kình",
    "type": "Hải Dương",
    "color": "#2980b9",
    "tier": 1,
    "baseHP": 32,
    "baseMP": 80,
    "baseATK": 12,
    "baseDEF": 10,
    "baseSPD": 10,
    "growth": {
      "hp": 38,
      "mp": 15,
      "atk": 10,
      "def": 7,
      "spd": 5
    },
    "spriteNum": 32,
    "spriteVariant": 0,
    "spriteKey": "npc2_32",
    "sprite": "./img/monsters/npc2_32.png",
    "description": "Tiểu Cá Kình đáng yêu chơi đùa tinh nghịch trong nước. [khắc chế Kim Loại hệ]",
    "evolution": [
      -1
    ],
    "skills": [
      {
        "id": 40,
        "name": "Thủy Trụ",
        "type": "Hải Dương",
        "power": 15,
        "mpCost": 10,
        "accuracy": 95,
        "heal": 0,
        "buffDef": 0,
        "desc": "Cột nước áp lực cao bắn thẳng từ mặt đất"
      },
      {
        "id": 41,
        "name": "Ba Đào Trọng Kích",
        "type": "Hải Dương",
        "power": 22,
        "mpCost": 14,
        "accuracy": 95,
        "heal": 0,
        "buffDef": 0,
        "desc": "Cơn sóng cuồn cuộn đập mạnh vào kẻ thù"
      },
      {
        "id": 42,
        "name": "Hải Lãng Nộ Đào",
        "type": "Hải Dương",
        "power": 28,
        "mpCost": 19,
        "accuracy": 95,
        "heal": 0,
        "buffDef": 0,
        "desc": "Sóng biển giận dữ cuốn phăng phòng tuyến địch"
      },
      {
        "id": 46,
        "name": "Bạo Phong Tuyết",
        "type": "Hải Dương",
        "power": 36,
        "mpCost": 26,
        "accuracy": 95,
        "heal": 0,
        "buffDef": 0,
        "desc": "Bão tuyết hàn băng đóng băng cả bầu trời"
      }
    ]
  },
  {
    "id": 70,
    "code": "cauvong_pet_70",
    "name": "Cá Kình khổng lồ",
    "type": "Hải Dương",
    "color": "#2980b9",
    "tier": 2,
    "baseHP": 27,
    "baseMP": 80,
    "baseATK": 15,
    "baseDEF": 10,
    "baseSPD": 10,
    "growth": {
      "hp": 54,
      "mp": 20,
      "atk": 11,
      "def": 8,
      "spd": 6
    },
    "spriteNum": 33,
    "spriteVariant": 0,
    "spriteKey": "npc2_33",
    "sprite": "./img/monsters/npc2_33.png",
    "description": "Kính Quang Lọc, những kẻ yêu hòa bình. [khắc chế Kim Loại hệ]",
    "evolution": [
      -2
    ],
    "skills": [
      {
        "id": 40,
        "name": "Thủy Trụ",
        "type": "Hải Dương",
        "power": 15,
        "mpCost": 10,
        "accuracy": 95,
        "heal": 0,
        "buffDef": 0,
        "desc": "Cột nước áp lực cao bắn thẳng từ mặt đất"
      },
      {
        "id": 41,
        "name": "Ba Đào Trọng Kích",
        "type": "Hải Dương",
        "power": 22,
        "mpCost": 14,
        "accuracy": 95,
        "heal": 0,
        "buffDef": 0,
        "desc": "Cơn sóng cuồn cuộn đập mạnh vào kẻ thù"
      },
      {
        "id": 42,
        "name": "Hải Lãng Nộ Đào",
        "type": "Hải Dương",
        "power": 28,
        "mpCost": 19,
        "accuracy": 95,
        "heal": 0,
        "buffDef": 0,
        "desc": "Sóng biển giận dữ cuốn phăng phòng tuyến địch"
      },
      {
        "id": 43,
        "name": "Hàn Băng Toái Toản",
        "type": "Hải Dương",
        "power": 36,
        "mpCost": 26,
        "accuracy": 95,
        "heal": 0,
        "buffDef": 0,
        "desc": "Những mũi băng nhọn hoắt nghiền nát giáp trụ"
      }
    ]
  },
  {
    "id": 71,
    "code": "cauvong_pet_71",
    "name": "Cá Kình một sừng",
    "type": "Hải Dương",
    "color": "#2980b9",
    "tier": 3,
    "baseHP": 28,
    "baseMP": 80,
    "baseATK": 16,
    "baseDEF": 11,
    "baseSPD": 10,
    "growth": {
      "hp": 82,
      "mp": 25,
      "atk": 12,
      "def": 10,
      "spd": 8
    },
    "spriteNum": 33,
    "spriteVariant": 1,
    "spriteKey": "npc2_33",
    "sprite": "./img/monsters/npc2_33.png",
    "description": "Người bảo vệ hòa bình lạnh lùng. [khắc chế Kim Loại hệ]",
    "evolution": [
      -2
    ],
    "skills": [
      {
        "id": 41,
        "name": "Ba Đào Trọng Kích",
        "type": "Hải Dương",
        "power": 22,
        "mpCost": 14,
        "accuracy": 95,
        "heal": 0,
        "buffDef": 0,
        "desc": "Cơn sóng cuồn cuộn đập mạnh vào kẻ thù"
      },
      {
        "id": 42,
        "name": "Hải Lãng Nộ Đào",
        "type": "Hải Dương",
        "power": 28,
        "mpCost": 19,
        "accuracy": 95,
        "heal": 0,
        "buffDef": 0,
        "desc": "Sóng biển giận dữ cuốn phăng phòng tuyến địch"
      },
      {
        "id": 44,
        "name": "Hải Tiêu Nộ Lãng",
        "type": "Hải Dương",
        "power": 48,
        "mpCost": 36,
        "accuracy": 95,
        "heal": 0,
        "buffDef": 0,
        "desc": "Đại hồng thủy đại dương nuốt chửng đối thủ"
      },
      {
        "id": 48,
        "name": "Thuật Cầu Nguyện",
        "type": "Hồi Phục",
        "power": 0,
        "mpCost": 16,
        "accuracy": 100,
        "heal": 45,
        "buffDef": 0,
        "desc": "Làn nước mát lành chữa lành 45% sinh lực"
      }
    ]
  },
  {
    "id": 72,
    "code": "cauvong_pet_72",
    "name": "Yếu Tắc Kình",
    "type": "Hải Dương",
    "color": "#2980b9",
    "tier": 4,
    "baseHP": 32,
    "baseMP": 80,
    "baseATK": 17,
    "baseDEF": 11,
    "baseSPD": 11,
    "growth": {
      "hp": 96,
      "mp": 30,
      "atk": 13,
      "def": 13,
      "spd": 10
    },
    "spriteNum": 34,
    "spriteVariant": 0,
    "spriteKey": "npc2_34",
    "sprite": "./img/monsters/npc2_34.png",
    "description": "Cá Kình cuồng điên mang theo đầy đủ võ trang. [khắc chế Kim Loại hệ]",
    "evolution": [
      -2
    ],
    "skills": [
      {
        "id": 41,
        "name": "Ba Đào Trọng Kích",
        "type": "Hải Dương",
        "power": 22,
        "mpCost": 14,
        "accuracy": 95,
        "heal": 0,
        "buffDef": 0,
        "desc": "Cơn sóng cuồn cuộn đập mạnh vào kẻ thù"
      },
      {
        "id": 42,
        "name": "Hải Lãng Nộ Đào",
        "type": "Hải Dương",
        "power": 28,
        "mpCost": 19,
        "accuracy": 95,
        "heal": 0,
        "buffDef": 0,
        "desc": "Sóng biển giận dữ cuốn phăng phòng tuyến địch"
      },
      {
        "id": 44,
        "name": "Hải Tiêu Nộ Lãng",
        "type": "Hải Dương",
        "power": 48,
        "mpCost": 36,
        "accuracy": 95,
        "heal": 0,
        "buffDef": 0,
        "desc": "Đại hồng thủy đại dương nuốt chửng đối thủ"
      },
      {
        "id": 48,
        "name": "Thuật Cầu Nguyện",
        "type": "Hồi Phục",
        "power": 0,
        "mpCost": 16,
        "accuracy": 100,
        "heal": 45,
        "buffDef": 0,
        "desc": "Làn nước mát lành chữa lành 45% sinh lực"
      }
    ]
  },
  {
    "id": 73,
    "code": "cauvong_pet_73",
    "name": "Tiểu Cánh Cụt",
    "type": "Hải Dương",
    "color": "#2980b9",
    "tier": 1,
    "baseHP": 26,
    "baseMP": 80,
    "baseATK": 14,
    "baseDEF": 10,
    "baseSPD": 10,
    "growth": {
      "hp": 50,
      "mp": 15,
      "atk": 10,
      "def": 7,
      "spd": 5
    },
    "spriteNum": 35,
    "spriteVariant": 0,
    "spriteKey": "npc2_35",
    "sprite": "./img/monsters/npc2_35.png",
    "description": "Ca sỹ siêu cấp. [khắc chế Kim Loại hệ]",
    "evolution": [
      29,
      48,
      53
    ],
    "skills": [
      {
        "id": 40,
        "name": "Thủy Trụ",
        "type": "Hải Dương",
        "power": 15,
        "mpCost": 10,
        "accuracy": 95,
        "heal": 0,
        "buffDef": 0,
        "desc": "Cột nước áp lực cao bắn thẳng từ mặt đất"
      },
      {
        "id": 41,
        "name": "Ba Đào Trọng Kích",
        "type": "Hải Dương",
        "power": 22,
        "mpCost": 14,
        "accuracy": 95,
        "heal": 0,
        "buffDef": 0,
        "desc": "Cơn sóng cuồn cuộn đập mạnh vào kẻ thù"
      },
      {
        "id": 42,
        "name": "Hải Lãng Nộ Đào",
        "type": "Hải Dương",
        "power": 28,
        "mpCost": 19,
        "accuracy": 95,
        "heal": 0,
        "buffDef": 0,
        "desc": "Sóng biển giận dữ cuốn phăng phòng tuyến địch"
      },
      {
        "id": 46,
        "name": "Bạo Phong Tuyết",
        "type": "Hải Dương",
        "power": 36,
        "mpCost": 26,
        "accuracy": 95,
        "heal": 0,
        "buffDef": 0,
        "desc": "Bão tuyết hàn băng đóng băng cả bầu trời"
      }
    ]
  },
  {
    "id": 74,
    "code": "cauvong_pet_74",
    "name": "Đao Phong Cánh Cụt",
    "type": "Hải Dương",
    "color": "#2980b9",
    "tier": 2,
    "baseHP": 27,
    "baseMP": 80,
    "baseATK": 15,
    "baseDEF": 11,
    "baseSPD": 10,
    "growth": {
      "hp": 66,
      "mp": 20,
      "atk": 11,
      "def": 8,
      "spd": 6
    },
    "spriteNum": 36,
    "spriteVariant": 0,
    "spriteKey": "npc2_36",
    "sprite": "./img/monsters/npc2_36.png",
    "description": "Thân mặc đồng phục hộ vệ. [khắc chế Kim Loại hệ]",
    "evolution": [
      -2
    ],
    "skills": [
      {
        "id": 40,
        "name": "Thủy Trụ",
        "type": "Hải Dương",
        "power": 15,
        "mpCost": 10,
        "accuracy": 95,
        "heal": 0,
        "buffDef": 0,
        "desc": "Cột nước áp lực cao bắn thẳng từ mặt đất"
      },
      {
        "id": 41,
        "name": "Ba Đào Trọng Kích",
        "type": "Hải Dương",
        "power": 22,
        "mpCost": 14,
        "accuracy": 95,
        "heal": 0,
        "buffDef": 0,
        "desc": "Cơn sóng cuồn cuộn đập mạnh vào kẻ thù"
      },
      {
        "id": 42,
        "name": "Hải Lãng Nộ Đào",
        "type": "Hải Dương",
        "power": 28,
        "mpCost": 19,
        "accuracy": 95,
        "heal": 0,
        "buffDef": 0,
        "desc": "Sóng biển giận dữ cuốn phăng phòng tuyến địch"
      },
      {
        "id": 43,
        "name": "Hàn Băng Toái Toản",
        "type": "Hải Dương",
        "power": 36,
        "mpCost": 26,
        "accuracy": 95,
        "heal": 0,
        "buffDef": 0,
        "desc": "Những mũi băng nhọn hoắt nghiền nát giáp trụ"
      }
    ]
  },
  {
    "id": 75,
    "code": "cauvong_pet_75",
    "name": "Đế Vương Cánh Cụt",
    "type": "Hải Dương",
    "color": "#2980b9",
    "tier": 3,
    "baseHP": 28,
    "baseMP": 80,
    "baseATK": 16,
    "baseDEF": 11,
    "baseSPD": 10,
    "growth": {
      "hp": 74,
      "mp": 25,
      "atk": 12,
      "def": 10,
      "spd": 8
    },
    "spriteNum": 37,
    "spriteVariant": 0,
    "spriteKey": "npc2_37",
    "sprite": "./img/monsters/npc2_37.png",
    "description": "Đế Vương Tính cách quái gở. [khắc chế Kim Loại hệ]",
    "evolution": [
      -2
    ],
    "skills": [
      {
        "id": 41,
        "name": "Ba Đào Trọng Kích",
        "type": "Hải Dương",
        "power": 22,
        "mpCost": 14,
        "accuracy": 95,
        "heal": 0,
        "buffDef": 0,
        "desc": "Cơn sóng cuồn cuộn đập mạnh vào kẻ thù"
      },
      {
        "id": 42,
        "name": "Hải Lãng Nộ Đào",
        "type": "Hải Dương",
        "power": 28,
        "mpCost": 19,
        "accuracy": 95,
        "heal": 0,
        "buffDef": 0,
        "desc": "Sóng biển giận dữ cuốn phăng phòng tuyến địch"
      },
      {
        "id": 44,
        "name": "Hải Tiêu Nộ Lãng",
        "type": "Hải Dương",
        "power": 48,
        "mpCost": 36,
        "accuracy": 95,
        "heal": 0,
        "buffDef": 0,
        "desc": "Đại hồng thủy đại dương nuốt chửng đối thủ"
      },
      {
        "id": 48,
        "name": "Thuật Cầu Nguyện",
        "type": "Hồi Phục",
        "power": 0,
        "mpCost": 16,
        "accuracy": 100,
        "heal": 45,
        "buffDef": 0,
        "desc": "Làn nước mát lành chữa lành 45% sinh lực"
      }
    ]
  },
  {
    "id": 76,
    "code": "cauvong_pet_76",
    "name": "Hải Quy (rùa biển)",
    "type": "Hải Dương",
    "color": "#2980b9",
    "tier": 1,
    "baseHP": 26,
    "baseMP": 80,
    "baseATK": 14,
    "baseDEF": 10,
    "baseSPD": 10,
    "growth": {
      "hp": 46,
      "mp": 15,
      "atk": 10,
      "def": 6,
      "spd": 5
    },
    "spriteNum": 38,
    "spriteVariant": 0,
    "spriteKey": "npc2_38",
    "sprite": "./img/monsters/npc2_38.png",
    "description": "Hải Quy đáng yêu thích đùa dai. [khắc chế Kim Loại hệ]",
    "evolution": [
      36,
      37,
      53
    ],
    "skills": [
      {
        "id": 40,
        "name": "Thủy Trụ",
        "type": "Hải Dương",
        "power": 15,
        "mpCost": 10,
        "accuracy": 95,
        "heal": 0,
        "buffDef": 0,
        "desc": "Cột nước áp lực cao bắn thẳng từ mặt đất"
      },
      {
        "id": 41,
        "name": "Ba Đào Trọng Kích",
        "type": "Hải Dương",
        "power": 22,
        "mpCost": 14,
        "accuracy": 95,
        "heal": 0,
        "buffDef": 0,
        "desc": "Cơn sóng cuồn cuộn đập mạnh vào kẻ thù"
      },
      {
        "id": 42,
        "name": "Hải Lãng Nộ Đào",
        "type": "Hải Dương",
        "power": 28,
        "mpCost": 19,
        "accuracy": 95,
        "heal": 0,
        "buffDef": 0,
        "desc": "Sóng biển giận dữ cuốn phăng phòng tuyến địch"
      },
      {
        "id": 46,
        "name": "Bạo Phong Tuyết",
        "type": "Hải Dương",
        "power": 36,
        "mpCost": 26,
        "accuracy": 95,
        "heal": 0,
        "buffDef": 0,
        "desc": "Bão tuyết hàn băng đóng băng cả bầu trời"
      }
    ]
  },
  {
    "id": 77,
    "code": "cauvong_pet_77",
    "name": "Rùa trinh sát",
    "type": "Hải Dương",
    "color": "#2980b9",
    "tier": 2,
    "baseHP": 27,
    "baseMP": 80,
    "baseATK": 15,
    "baseDEF": 10,
    "baseSPD": 10,
    "growth": {
      "hp": 62,
      "mp": 20,
      "atk": 11,
      "def": 8,
      "spd": 6
    },
    "spriteNum": 39,
    "spriteVariant": 0,
    "spriteKey": "npc2_39",
    "sprite": "./img/monsters/npc2_39.png",
    "description": "Hải Quy thúc thúc 10 phần mị lực. [khắc chế Kim Loại hệ]",
    "evolution": [
      -2
    ],
    "skills": [
      {
        "id": 40,
        "name": "Thủy Trụ",
        "type": "Hải Dương",
        "power": 15,
        "mpCost": 10,
        "accuracy": 95,
        "heal": 0,
        "buffDef": 0,
        "desc": "Cột nước áp lực cao bắn thẳng từ mặt đất"
      },
      {
        "id": 41,
        "name": "Ba Đào Trọng Kích",
        "type": "Hải Dương",
        "power": 22,
        "mpCost": 14,
        "accuracy": 95,
        "heal": 0,
        "buffDef": 0,
        "desc": "Cơn sóng cuồn cuộn đập mạnh vào kẻ thù"
      },
      {
        "id": 42,
        "name": "Hải Lãng Nộ Đào",
        "type": "Hải Dương",
        "power": 28,
        "mpCost": 19,
        "accuracy": 95,
        "heal": 0,
        "buffDef": 0,
        "desc": "Sóng biển giận dữ cuốn phăng phòng tuyến địch"
      },
      {
        "id": 43,
        "name": "Hàn Băng Toái Toản",
        "type": "Hải Dương",
        "power": 36,
        "mpCost": 26,
        "accuracy": 95,
        "heal": 0,
        "buffDef": 0,
        "desc": "Những mũi băng nhọn hoắt nghiền nát giáp trụ"
      }
    ]
  },
  {
    "id": 78,
    "code": "cauvong_pet_78",
    "name": "Rùa ma biển sâu",
    "type": "Hải Dương",
    "color": "#2980b9",
    "tier": 3,
    "baseHP": 28,
    "baseMP": 80,
    "baseATK": 16,
    "baseDEF": 10,
    "baseSPD": 11,
    "growth": {
      "hp": 70,
      "mp": 25,
      "atk": 12,
      "def": 10,
      "spd": 8
    },
    "spriteNum": 40,
    "spriteVariant": 0,
    "spriteKey": "npc2_40",
    "sprite": "./img/monsters/npc2_40.png",
    "description": "Ẩn dưới biển sâu thần bí là năng lượng bí ẩn của loài rùa. [khắc chế Kim Loại hệ]",
    "evolution": [
      -3
    ],
    "skills": [
      {
        "id": 41,
        "name": "Ba Đào Trọng Kích",
        "type": "Hải Dương",
        "power": 22,
        "mpCost": 14,
        "accuracy": 95,
        "heal": 0,
        "buffDef": 0,
        "desc": "Cơn sóng cuồn cuộn đập mạnh vào kẻ thù"
      },
      {
        "id": 42,
        "name": "Hải Lãng Nộ Đào",
        "type": "Hải Dương",
        "power": 28,
        "mpCost": 19,
        "accuracy": 95,
        "heal": 0,
        "buffDef": 0,
        "desc": "Sóng biển giận dữ cuốn phăng phòng tuyến địch"
      },
      {
        "id": 44,
        "name": "Hải Tiêu Nộ Lãng",
        "type": "Hải Dương",
        "power": 48,
        "mpCost": 36,
        "accuracy": 95,
        "heal": 0,
        "buffDef": 0,
        "desc": "Đại hồng thủy đại dương nuốt chửng đối thủ"
      },
      {
        "id": 48,
        "name": "Thuật Cầu Nguyện",
        "type": "Hồi Phục",
        "power": 0,
        "mpCost": 16,
        "accuracy": 100,
        "heal": 45,
        "buffDef": 0,
        "desc": "Làn nước mát lành chữa lành 45% sinh lực"
      }
    ]
  },
  {
    "id": 79,
    "code": "cauvong_pet_79",
    "name": "Rùa khổng lồ biển sâu",
    "type": "Hải Dương",
    "color": "#2980b9",
    "tier": 4,
    "baseHP": 28,
    "baseMP": 80,
    "baseATK": 16,
    "baseDEF": 11,
    "baseSPD": 10,
    "growth": {
      "hp": 92,
      "mp": 30,
      "atk": 13,
      "def": 12,
      "spd": 8
    },
    "spriteNum": 40,
    "spriteVariant": 1,
    "spriteKey": "npc2_40",
    "sprite": "./img/monsters/npc2_40.png",
    "description": "Hình thể lớn nhưng tâm ôn hòa. [khắc chế Kim Loại hệ]",
    "evolution": [
      -5
    ],
    "skills": [
      {
        "id": 41,
        "name": "Ba Đào Trọng Kích",
        "type": "Hải Dương",
        "power": 22,
        "mpCost": 14,
        "accuracy": 95,
        "heal": 0,
        "buffDef": 0,
        "desc": "Cơn sóng cuồn cuộn đập mạnh vào kẻ thù"
      },
      {
        "id": 42,
        "name": "Hải Lãng Nộ Đào",
        "type": "Hải Dương",
        "power": 28,
        "mpCost": 19,
        "accuracy": 95,
        "heal": 0,
        "buffDef": 0,
        "desc": "Sóng biển giận dữ cuốn phăng phòng tuyến địch"
      },
      {
        "id": 44,
        "name": "Hải Tiêu Nộ Lãng",
        "type": "Hải Dương",
        "power": 48,
        "mpCost": 36,
        "accuracy": 95,
        "heal": 0,
        "buffDef": 0,
        "desc": "Đại hồng thủy đại dương nuốt chửng đối thủ"
      },
      {
        "id": 48,
        "name": "Thuật Cầu Nguyện",
        "type": "Hồi Phục",
        "power": 0,
        "mpCost": 16,
        "accuracy": 100,
        "heal": 45,
        "buffDef": 0,
        "desc": "Làn nước mát lành chữa lành 45% sinh lực"
      }
    ]
  },
  {
    "id": 80,
    "code": "cauvong_pet_80",
    "name": "Cua vàng",
    "type": "Hải Dương",
    "color": "#2980b9",
    "tier": 1,
    "baseHP": 26,
    "baseMP": 80,
    "baseATK": 14,
    "baseDEF": 10,
    "baseSPD": 10,
    "growth": {
      "hp": 42,
      "mp": 15,
      "atk": 10,
      "def": 7,
      "spd": 5
    },
    "spriteNum": 41,
    "spriteVariant": 0,
    "spriteKey": "npc2_41",
    "sprite": "./img/monsters/npc2_41.png",
    "description": "Trời sinh vốn đã ngây thơ, đáng yêu. [khắc chế Kim Loại hệ]",
    "evolution": [
      29,
      48,
      53
    ],
    "skills": [
      {
        "id": 40,
        "name": "Thủy Trụ",
        "type": "Hải Dương",
        "power": 15,
        "mpCost": 10,
        "accuracy": 95,
        "heal": 0,
        "buffDef": 0,
        "desc": "Cột nước áp lực cao bắn thẳng từ mặt đất"
      },
      {
        "id": 41,
        "name": "Ba Đào Trọng Kích",
        "type": "Hải Dương",
        "power": 22,
        "mpCost": 14,
        "accuracy": 95,
        "heal": 0,
        "buffDef": 0,
        "desc": "Cơn sóng cuồn cuộn đập mạnh vào kẻ thù"
      },
      {
        "id": 42,
        "name": "Hải Lãng Nộ Đào",
        "type": "Hải Dương",
        "power": 28,
        "mpCost": 19,
        "accuracy": 95,
        "heal": 0,
        "buffDef": 0,
        "desc": "Sóng biển giận dữ cuốn phăng phòng tuyến địch"
      },
      {
        "id": 46,
        "name": "Bạo Phong Tuyết",
        "type": "Hải Dương",
        "power": 36,
        "mpCost": 26,
        "accuracy": 95,
        "heal": 0,
        "buffDef": 0,
        "desc": "Bão tuyết hàn băng đóng băng cả bầu trời"
      }
    ]
  },
  {
    "id": 81,
    "code": "cauvong_pet_81",
    "name": "Cua vân Bạc",
    "type": "Hải Dương",
    "color": "#2980b9",
    "tier": 2,
    "baseHP": 27,
    "baseMP": 80,
    "baseATK": 15,
    "baseDEF": 11,
    "baseSPD": 10,
    "growth": {
      "hp": 58,
      "mp": 20,
      "atk": 11,
      "def": 8,
      "spd": 6
    },
    "spriteNum": 41,
    "spriteVariant": 1,
    "spriteKey": "npc2_41",
    "sprite": "./img/monsters/npc2_41.png",
    "description": "Cua con thích khóc hay mất bình tĩnh. [khắc chế Kim Loại hệ]",
    "evolution": [
      -2
    ],
    "skills": [
      {
        "id": 40,
        "name": "Thủy Trụ",
        "type": "Hải Dương",
        "power": 15,
        "mpCost": 10,
        "accuracy": 95,
        "heal": 0,
        "buffDef": 0,
        "desc": "Cột nước áp lực cao bắn thẳng từ mặt đất"
      },
      {
        "id": 41,
        "name": "Ba Đào Trọng Kích",
        "type": "Hải Dương",
        "power": 22,
        "mpCost": 14,
        "accuracy": 95,
        "heal": 0,
        "buffDef": 0,
        "desc": "Cơn sóng cuồn cuộn đập mạnh vào kẻ thù"
      },
      {
        "id": 42,
        "name": "Hải Lãng Nộ Đào",
        "type": "Hải Dương",
        "power": 28,
        "mpCost": 19,
        "accuracy": 95,
        "heal": 0,
        "buffDef": 0,
        "desc": "Sóng biển giận dữ cuốn phăng phòng tuyến địch"
      },
      {
        "id": 43,
        "name": "Hàn Băng Toái Toản",
        "type": "Hải Dương",
        "power": 36,
        "mpCost": 26,
        "accuracy": 95,
        "heal": 0,
        "buffDef": 0,
        "desc": "Những mũi băng nhọn hoắt nghiền nát giáp trụ"
      }
    ]
  },
  {
    "id": 82,
    "code": "cauvong_pet_82",
    "name": "Cua thiên sứ",
    "type": "Hải Dương",
    "color": "#2980b9",
    "tier": 3,
    "baseHP": 28,
    "baseMP": 80,
    "baseATK": 16,
    "baseDEF": 11,
    "baseSPD": 11,
    "growth": {
      "hp": 78,
      "mp": 25,
      "atk": 12,
      "def": 10,
      "spd": 8
    },
    "spriteNum": 41,
    "spriteVariant": 2,
    "spriteKey": "npc2_41",
    "sprite": "./img/monsters/npc2_41.png",
    "description": "Vì yêu thích những câu chuyện cổ tích mà từ chối trưởng thành. [khắc chế Kim Loại hệ]",
    "evolution": [
      -2
    ],
    "skills": [
      {
        "id": 41,
        "name": "Ba Đào Trọng Kích",
        "type": "Hải Dương",
        "power": 22,
        "mpCost": 14,
        "accuracy": 95,
        "heal": 0,
        "buffDef": 0,
        "desc": "Cơn sóng cuồn cuộn đập mạnh vào kẻ thù"
      },
      {
        "id": 42,
        "name": "Hải Lãng Nộ Đào",
        "type": "Hải Dương",
        "power": 28,
        "mpCost": 19,
        "accuracy": 95,
        "heal": 0,
        "buffDef": 0,
        "desc": "Sóng biển giận dữ cuốn phăng phòng tuyến địch"
      },
      {
        "id": 44,
        "name": "Hải Tiêu Nộ Lãng",
        "type": "Hải Dương",
        "power": 48,
        "mpCost": 36,
        "accuracy": 95,
        "heal": 0,
        "buffDef": 0,
        "desc": "Đại hồng thủy đại dương nuốt chửng đối thủ"
      },
      {
        "id": 48,
        "name": "Thuật Cầu Nguyện",
        "type": "Hồi Phục",
        "power": 0,
        "mpCost": 16,
        "accuracy": 100,
        "heal": 45,
        "buffDef": 0,
        "desc": "Làn nước mát lành chữa lành 45% sinh lực"
      }
    ]
  },
  {
    "id": 83,
    "code": "cauvong_pet_83",
    "name": "Cá heo",
    "type": "Hải Dương",
    "color": "#2980b9",
    "tier": 1,
    "baseHP": 27,
    "baseMP": 80,
    "baseATK": 15,
    "baseDEF": 11,
    "baseSPD": 10,
    "growth": {
      "hp": 38,
      "mp": 15,
      "atk": 13,
      "def": 7,
      "spd": 5
    },
    "spriteNum": 42,
    "spriteVariant": 0,
    "spriteKey": "npc2_42",
    "sprite": "./img/monsters/npc2_42.png",
    "description": "Tiểu cá heo thực dụng, có thể ngồi, có thể chiến đấu. [khắc chế Kim Loại hệ]",
    "evolution": [
      -1
    ],
    "skills": [
      {
        "id": 40,
        "name": "Thủy Trụ",
        "type": "Hải Dương",
        "power": 15,
        "mpCost": 10,
        "accuracy": 95,
        "heal": 0,
        "buffDef": 0,
        "desc": "Cột nước áp lực cao bắn thẳng từ mặt đất"
      },
      {
        "id": 41,
        "name": "Ba Đào Trọng Kích",
        "type": "Hải Dương",
        "power": 22,
        "mpCost": 14,
        "accuracy": 95,
        "heal": 0,
        "buffDef": 0,
        "desc": "Cơn sóng cuồn cuộn đập mạnh vào kẻ thù"
      },
      {
        "id": 42,
        "name": "Hải Lãng Nộ Đào",
        "type": "Hải Dương",
        "power": 28,
        "mpCost": 19,
        "accuracy": 95,
        "heal": 0,
        "buffDef": 0,
        "desc": "Sóng biển giận dữ cuốn phăng phòng tuyến địch"
      },
      {
        "id": 46,
        "name": "Bạo Phong Tuyết",
        "type": "Hải Dương",
        "power": 36,
        "mpCost": 26,
        "accuracy": 95,
        "heal": 0,
        "buffDef": 0,
        "desc": "Bão tuyết hàn băng đóng băng cả bầu trời"
      }
    ]
  },
  {
    "id": 84,
    "code": "cauvong_pet_84",
    "name": "Cá heo tốc độ",
    "type": "Hải Dương",
    "color": "#2980b9",
    "tier": 2,
    "baseHP": 28,
    "baseMP": 80,
    "baseATK": 16,
    "baseDEF": 11,
    "baseSPD": 10,
    "growth": {
      "hp": 54,
      "mp": 20,
      "atk": 14,
      "def": 9,
      "spd": 6
    },
    "spriteNum": 42,
    "spriteVariant": 1,
    "spriteKey": "npc2_42",
    "sprite": "./img/monsters/npc2_42.png",
    "description": "Cá heo luôn ôm giấc mộng được bay lên không trung. [khắc chế Kim Loại hệ]",
    "evolution": [
      -1
    ],
    "skills": [
      {
        "id": 40,
        "name": "Thủy Trụ",
        "type": "Hải Dương",
        "power": 15,
        "mpCost": 10,
        "accuracy": 95,
        "heal": 0,
        "buffDef": 0,
        "desc": "Cột nước áp lực cao bắn thẳng từ mặt đất"
      },
      {
        "id": 41,
        "name": "Ba Đào Trọng Kích",
        "type": "Hải Dương",
        "power": 22,
        "mpCost": 14,
        "accuracy": 95,
        "heal": 0,
        "buffDef": 0,
        "desc": "Cơn sóng cuồn cuộn đập mạnh vào kẻ thù"
      },
      {
        "id": 42,
        "name": "Hải Lãng Nộ Đào",
        "type": "Hải Dương",
        "power": 28,
        "mpCost": 19,
        "accuracy": 95,
        "heal": 0,
        "buffDef": 0,
        "desc": "Sóng biển giận dữ cuốn phăng phòng tuyến địch"
      },
      {
        "id": 43,
        "name": "Hàn Băng Toái Toản",
        "type": "Hải Dương",
        "power": 36,
        "mpCost": 26,
        "accuracy": 95,
        "heal": 0,
        "buffDef": 0,
        "desc": "Những mũi băng nhọn hoắt nghiền nát giáp trụ"
      }
    ]
  },
  {
    "id": 85,
    "code": "cauvong_pet_85",
    "name": "Ngựa chiến",
    "type": "Mãnh Thú",
    "color": "#e74c3c",
    "tier": 4,
    "baseHP": 40,
    "baseMP": 80,
    "baseATK": 13,
    "baseDEF": 11,
    "baseSPD": 10,
    "growth": {
      "hp": 95,
      "mp": 20,
      "atk": 10,
      "def": 12,
      "spd": 8
    },
    "spriteNum": 26,
    "spriteVariant": 3,
    "spriteKey": "npc2_26",
    "sprite": "./img/monsters/npc2_26.png",
    "description": "Dị hoá đem lại sức mạnh phi thường cho sinh vật. [khắc chế Thực Vật hệ]",
    "evolution": [
      -3
    ],
    "skills": [
      {
        "id": 31,
        "name": "Cuồng Bạo Xung Chàng",
        "type": "Mãnh Thú",
        "power": 23,
        "mpCost": 14,
        "accuracy": 95,
        "heal": 0,
        "buffDef": 0,
        "desc": "Húc mạnh bạo liệt hất văng đối thủ"
      },
      {
        "id": 32,
        "name": "Viêm Hống Toái Cốt",
        "type": "Mãnh Thú",
        "power": 29,
        "mpCost": 19,
        "accuracy": 95,
        "heal": 0,
        "buffDef": 0,
        "desc": "Tiếng gầm rực lửa làm rúng động và nứt giáp đối thủ"
      },
      {
        "id": 34,
        "name": "Hồng Liên Liệt Hỏa",
        "type": "Mãnh Thú",
        "power": 50,
        "mpCost": 38,
        "accuracy": 95,
        "heal": 0,
        "buffDef": 0,
        "desc": "Hoa sen lửa địa ngục hủy diệt vạn vật"
      },
      {
        "id": 33,
        "name": "Nộ Diễm Liệt Ba",
        "type": "Mãnh Thú",
        "power": 38,
        "mpCost": 27,
        "accuracy": 95,
        "heal": 0,
        "buffDef": 0,
        "desc": "Sóng lửa cuộn trào thiêu đốt toàn bộ vùng xung quanh"
      }
    ]
  },
  {
    "id": 86,
    "code": "cauvong_pet_86",
    "name": "Quỷ Vương Địa Phủ",
    "type": "Thực Vật",
    "color": "#27ae60",
    "tier": 5,
    "baseHP": 60,
    "baseMP": 80,
    "baseATK": 20,
    "baseDEF": 17,
    "baseSPD": 18,
    "growth": {
      "hp": 100,
      "mp": 30,
      "atk": 12,
      "def": 10,
      "spd": 10
    },
    "spriteNum": 43,
    "spriteVariant": 0,
    "spriteKey": "npc2_43",
    "sprite": "./img/monsters/npc2_43.png",
    "description": "U Linh hệ. [khắc chế 5 hệ khác]",
    "evolution": [
      -1
    ],
    "skills": [
      {
        "id": 1,
        "name": "Phong Lợi Tiêm Thứ",
        "type": "Thực Vật",
        "power": 22,
        "mpCost": 14,
        "accuracy": 95,
        "heal": 0,
        "buffDef": 0,
        "desc": "Phóng ra gai nhọn sắc bén như lưỡi cưa"
      },
      {
        "id": 2,
        "name": "Phi Diệp Đao Phong",
        "type": "Thực Vật",
        "power": 28,
        "mpCost": 18,
        "accuracy": 95,
        "heal": 0,
        "buffDef": 0,
        "desc": "Phóng bão lá sắc bén tựa ngàn lưỡi kiếm"
      },
      {
        "id": 4,
        "name": "Mộc Chi Cứu Thù",
        "type": "Thực Vật",
        "power": 46,
        "mpCost": 35,
        "accuracy": 95,
        "heal": 0,
        "buffDef": 0,
        "desc": "Chiêu thức tối thượng hệ Thực Vật hủy diệt kẻ địch"
      },
      {
        "id": 8,
        "name": "Thảo Nguyện Thuật",
        "type": "Hồi Phục",
        "power": 0,
        "mpCost": 18,
        "accuracy": 100,
        "heal": 40,
        "buffDef": 0,
        "desc": "Cầu nguyện thảo nguyên hồi 40% lượng máu tối đa"
      }
    ]
  },
  {
    "id": 87,
    "code": "cauvong_pet_87",
    "name": "Quỷ Vương Địa Phủ",
    "type": "Thực Vật",
    "color": "#27ae60",
    "tier": 5,
    "baseHP": 60,
    "baseMP": 80,
    "baseATK": 20,
    "baseDEF": 17,
    "baseSPD": 18,
    "growth": {
      "hp": 120,
      "mp": 40,
      "atk": 14,
      "def": 14,
      "spd": 13
    },
    "spriteNum": 43,
    "spriteVariant": 0,
    "spriteKey": "npc2_43",
    "sprite": "./img/monsters/npc2_43.png",
    "description": "U Linh hệ. [khắc chế 5 hệ khác]",
    "evolution": [
      -1
    ],
    "skills": [
      {
        "id": 1,
        "name": "Phong Lợi Tiêm Thứ",
        "type": "Thực Vật",
        "power": 22,
        "mpCost": 14,
        "accuracy": 95,
        "heal": 0,
        "buffDef": 0,
        "desc": "Phóng ra gai nhọn sắc bén như lưỡi cưa"
      },
      {
        "id": 2,
        "name": "Phi Diệp Đao Phong",
        "type": "Thực Vật",
        "power": 28,
        "mpCost": 18,
        "accuracy": 95,
        "heal": 0,
        "buffDef": 0,
        "desc": "Phóng bão lá sắc bén tựa ngàn lưỡi kiếm"
      },
      {
        "id": 4,
        "name": "Mộc Chi Cứu Thù",
        "type": "Thực Vật",
        "power": 46,
        "mpCost": 35,
        "accuracy": 95,
        "heal": 0,
        "buffDef": 0,
        "desc": "Chiêu thức tối thượng hệ Thực Vật hủy diệt kẻ địch"
      },
      {
        "id": 8,
        "name": "Thảo Nguyện Thuật",
        "type": "Hồi Phục",
        "power": 0,
        "mpCost": 18,
        "accuracy": 100,
        "heal": 40,
        "buffDef": 0,
        "desc": "Cầu nguyện thảo nguyên hồi 40% lượng máu tối đa"
      }
    ]
  },
  {
    "id": 88,
    "code": "cauvong_pet_88",
    "name": "Cáp Cáp Thụ",
    "type": "Thực Vật",
    "color": "#27ae60",
    "tier": 3,
    "baseHP": 32,
    "baseMP": 80,
    "baseATK": 14,
    "baseDEF": 14,
    "baseSPD": 15,
    "growth": {
      "hp": 60,
      "mp": 25,
      "atk": 10,
      "def": 10,
      "spd": 12
    },
    "spriteNum": 44,
    "spriteVariant": 0,
    "spriteKey": "npc2_44",
    "sprite": "./img/monsters/npc2_44.png",
    "description": "Khoái Hoạt Thụ Tinh, tinh quái, đáng yêu. [khắc chế Phi Hành hệ]",
    "evolution": [
      -5
    ],
    "skills": [
      {
        "id": 1,
        "name": "Phong Lợi Tiêm Thứ",
        "type": "Thực Vật",
        "power": 22,
        "mpCost": 14,
        "accuracy": 95,
        "heal": 0,
        "buffDef": 0,
        "desc": "Phóng ra gai nhọn sắc bén như lưỡi cưa"
      },
      {
        "id": 2,
        "name": "Phi Diệp Đao Phong",
        "type": "Thực Vật",
        "power": 28,
        "mpCost": 18,
        "accuracy": 95,
        "heal": 0,
        "buffDef": 0,
        "desc": "Phóng bão lá sắc bén tựa ngàn lưỡi kiếm"
      },
      {
        "id": 4,
        "name": "Mộc Chi Cứu Thù",
        "type": "Thực Vật",
        "power": 46,
        "mpCost": 35,
        "accuracy": 95,
        "heal": 0,
        "buffDef": 0,
        "desc": "Chiêu thức tối thượng hệ Thực Vật hủy diệt kẻ địch"
      },
      {
        "id": 8,
        "name": "Thảo Nguyện Thuật",
        "type": "Hồi Phục",
        "power": 0,
        "mpCost": 18,
        "accuracy": 100,
        "heal": 40,
        "buffDef": 0,
        "desc": "Cầu nguyện thảo nguyên hồi 40% lượng máu tối đa"
      }
    ]
  },
  {
    "id": 89,
    "code": "cauvong_pet_89",
    "name": "Thụ tinh ngàn năm",
    "type": "Thực Vật",
    "color": "#27ae60",
    "tier": 4,
    "baseHP": 34,
    "baseMP": 80,
    "baseATK": 16,
    "baseDEF": 15,
    "baseSPD": 16,
    "growth": {
      "hp": 80,
      "mp": 30,
      "atk": 11,
      "def": 11,
      "spd": 13
    },
    "spriteNum": 44,
    "spriteVariant": 1,
    "spriteKey": "npc2_44",
    "sprite": "./img/monsters/npc2_44.png",
    "description": "Thụ Tinh thu hành nhiều năm, thực lực phi phàm. [khắc chế Phi Hành hệ]",
    "evolution": [
      -2
    ],
    "skills": [
      {
        "id": 1,
        "name": "Phong Lợi Tiêm Thứ",
        "type": "Thực Vật",
        "power": 22,
        "mpCost": 14,
        "accuracy": 95,
        "heal": 0,
        "buffDef": 0,
        "desc": "Phóng ra gai nhọn sắc bén như lưỡi cưa"
      },
      {
        "id": 2,
        "name": "Phi Diệp Đao Phong",
        "type": "Thực Vật",
        "power": 28,
        "mpCost": 18,
        "accuracy": 95,
        "heal": 0,
        "buffDef": 0,
        "desc": "Phóng bão lá sắc bén tựa ngàn lưỡi kiếm"
      },
      {
        "id": 4,
        "name": "Mộc Chi Cứu Thù",
        "type": "Thực Vật",
        "power": 46,
        "mpCost": 35,
        "accuracy": 95,
        "heal": 0,
        "buffDef": 0,
        "desc": "Chiêu thức tối thượng hệ Thực Vật hủy diệt kẻ địch"
      },
      {
        "id": 8,
        "name": "Thảo Nguyện Thuật",
        "type": "Hồi Phục",
        "power": 0,
        "mpCost": 18,
        "accuracy": 100,
        "heal": 40,
        "buffDef": 0,
        "desc": "Cầu nguyện thảo nguyên hồi 40% lượng máu tối đa"
      }
    ]
  },
  {
    "id": 90,
    "code": "cauvong_pet_90",
    "name": "Hoa Tiên Tử",
    "type": "Thực Vật",
    "color": "#27ae60",
    "tier": 5,
    "baseHP": 35,
    "baseMP": 82,
    "baseATK": 18,
    "baseDEF": 16,
    "baseSPD": 17,
    "growth": {
      "hp": 82,
      "mp": 32,
      "atk": 12,
      "def": 12,
      "spd": 13
    },
    "spriteNum": 45,
    "spriteVariant": 0,
    "spriteKey": "npc2_45",
    "sprite": "./img/monsters/npc2_45.png",
    "description": "Có được ma lực mạnh mẽ nhất Ailulima. [khắc chế Phi Hành hệ]",
    "evolution": [
      -1
    ],
    "skills": [
      {
        "id": 1,
        "name": "Phong Lợi Tiêm Thứ",
        "type": "Thực Vật",
        "power": 22,
        "mpCost": 14,
        "accuracy": 95,
        "heal": 0,
        "buffDef": 0,
        "desc": "Phóng ra gai nhọn sắc bén như lưỡi cưa"
      },
      {
        "id": 2,
        "name": "Phi Diệp Đao Phong",
        "type": "Thực Vật",
        "power": 28,
        "mpCost": 18,
        "accuracy": 95,
        "heal": 0,
        "buffDef": 0,
        "desc": "Phóng bão lá sắc bén tựa ngàn lưỡi kiếm"
      },
      {
        "id": 4,
        "name": "Mộc Chi Cứu Thù",
        "type": "Thực Vật",
        "power": 46,
        "mpCost": 35,
        "accuracy": 95,
        "heal": 0,
        "buffDef": 0,
        "desc": "Chiêu thức tối thượng hệ Thực Vật hủy diệt kẻ địch"
      },
      {
        "id": 8,
        "name": "Thảo Nguyện Thuật",
        "type": "Hồi Phục",
        "power": 0,
        "mpCost": 18,
        "accuracy": 100,
        "heal": 40,
        "buffDef": 0,
        "desc": "Cầu nguyện thảo nguyên hồi 40% lượng máu tối đa"
      }
    ]
  },
  {
    "id": 91,
    "code": "cauvong_pet_91",
    "name": "Cá Chép Rồng",
    "type": "Kim Loại",
    "color": "#f39c12",
    "tier": 3,
    "baseHP": 38,
    "baseMP": 80,
    "baseATK": 13,
    "baseDEF": 15,
    "baseSPD": 13,
    "growth": {
      "hp": 88,
      "mp": 25,
      "atk": 11,
      "def": 10,
      "spd": 10
    },
    "spriteNum": 46,
    "spriteVariant": 0,
    "spriteKey": "npc2_46",
    "sprite": "./img/monsters/npc2_46.png",
    "description": "Tiểu Tê Tê đáng yêu, công thủ cũng không tệ. [khắc chế Mãnh Thú hệ]",
    "evolution": [
      -5
    ],
    "skills": [
      {
        "id": 11,
        "name": "Cương Thiết Trảm",
        "type": "Kim Loại",
        "power": 22,
        "mpCost": 14,
        "accuracy": 95,
        "heal": 0,
        "buffDef": 0,
        "desc": "Đường kiếm thép sắc lạnh chém đứt giáp trụ"
      },
      {
        "id": 12,
        "name": "Kim Tinh Xung Kích",
        "type": "Kim Loại",
        "power": 28,
        "mpCost": 19,
        "accuracy": 95,
        "heal": 0,
        "buffDef": 0,
        "desc": "Lao thẳng với mũi khoan kim cương cực mạnh"
      },
      {
        "id": 14,
        "name": "Trảm Kim Đoạn Ngọc",
        "type": "Kim Loại",
        "power": 48,
        "mpCost": 36,
        "accuracy": 95,
        "heal": 0,
        "buffDef": 0,
        "desc": "Tuyệt kỹ kim loại chém sắt gãy ngọc vô song"
      },
      {
        "id": 19,
        "name": "Cương Cân Thiết Cốt",
        "type": "Phòng Ngự",
        "power": 0,
        "mpCost": 14,
        "accuracy": 100,
        "heal": 0,
        "buffDef": 45,
        "desc": "Biến cơ thể thành khối kim cương siêu cứng"
      }
    ]
  },
  {
    "id": 92,
    "code": "cauvong_pet_92",
    "name": "Cá Chép Rồng sắt",
    "type": "Kim Loại",
    "color": "#f39c12",
    "tier": 4,
    "baseHP": 38,
    "baseMP": 80,
    "baseATK": 14,
    "baseDEF": 16,
    "baseSPD": 16,
    "growth": {
      "hp": 96,
      "mp": 30,
      "atk": 12,
      "def": 11,
      "spd": 12
    },
    "spriteNum": 46,
    "spriteVariant": 1,
    "spriteKey": "npc2_46",
    "sprite": "./img/monsters/npc2_46.png",
    "description": "Toàn thân mặc bộ giáp Warrior mạnh mẽ. [khắc chế Mãnh Thú hệ]",
    "evolution": [
      -2
    ],
    "skills": [
      {
        "id": 11,
        "name": "Cương Thiết Trảm",
        "type": "Kim Loại",
        "power": 22,
        "mpCost": 14,
        "accuracy": 95,
        "heal": 0,
        "buffDef": 0,
        "desc": "Đường kiếm thép sắc lạnh chém đứt giáp trụ"
      },
      {
        "id": 12,
        "name": "Kim Tinh Xung Kích",
        "type": "Kim Loại",
        "power": 28,
        "mpCost": 19,
        "accuracy": 95,
        "heal": 0,
        "buffDef": 0,
        "desc": "Lao thẳng với mũi khoan kim cương cực mạnh"
      },
      {
        "id": 14,
        "name": "Trảm Kim Đoạn Ngọc",
        "type": "Kim Loại",
        "power": 48,
        "mpCost": 36,
        "accuracy": 95,
        "heal": 0,
        "buffDef": 0,
        "desc": "Tuyệt kỹ kim loại chém sắt gãy ngọc vô song"
      },
      {
        "id": 19,
        "name": "Cương Cân Thiết Cốt",
        "type": "Phòng Ngự",
        "power": 0,
        "mpCost": 14,
        "accuracy": 100,
        "heal": 0,
        "buffDef": 45,
        "desc": "Biến cơ thể thành khối kim cương siêu cứng"
      }
    ]
  },
  {
    "id": 93,
    "code": "cauvong_pet_93",
    "name": "Phá Hư Thần",
    "type": "Kim Loại",
    "color": "#f39c12",
    "tier": 5,
    "baseHP": 40,
    "baseMP": 82,
    "baseATK": 16,
    "baseDEF": 18,
    "baseSPD": 17,
    "growth": {
      "hp": 100,
      "mp": 32,
      "atk": 13,
      "def": 12,
      "spd": 14
    },
    "spriteNum": 47,
    "spriteVariant": 0,
    "spriteKey": "npc2_47",
    "sprite": "./img/monsters/npc2_47.png",
    "description": "Có được lực hủy diệt đáng sợ. [khắc chế Mãnh Thú hệ]",
    "evolution": [
      -1
    ],
    "skills": [
      {
        "id": 11,
        "name": "Cương Thiết Trảm",
        "type": "Kim Loại",
        "power": 22,
        "mpCost": 14,
        "accuracy": 95,
        "heal": 0,
        "buffDef": 0,
        "desc": "Đường kiếm thép sắc lạnh chém đứt giáp trụ"
      },
      {
        "id": 12,
        "name": "Kim Tinh Xung Kích",
        "type": "Kim Loại",
        "power": 28,
        "mpCost": 19,
        "accuracy": 95,
        "heal": 0,
        "buffDef": 0,
        "desc": "Lao thẳng với mũi khoan kim cương cực mạnh"
      },
      {
        "id": 14,
        "name": "Trảm Kim Đoạn Ngọc",
        "type": "Kim Loại",
        "power": 48,
        "mpCost": 36,
        "accuracy": 95,
        "heal": 0,
        "buffDef": 0,
        "desc": "Tuyệt kỹ kim loại chém sắt gãy ngọc vô song"
      },
      {
        "id": 19,
        "name": "Cương Cân Thiết Cốt",
        "type": "Phòng Ngự",
        "power": 0,
        "mpCost": 14,
        "accuracy": 100,
        "heal": 0,
        "buffDef": 45,
        "desc": "Biến cơ thể thành khối kim cương siêu cứng"
      }
    ]
  },
  {
    "id": 94,
    "code": "cauvong_pet_94",
    "name": "Bạch Thiên Sử",
    "type": "Phi Hành",
    "color": "#9b59b6",
    "tier": 3,
    "baseHP": 34,
    "baseMP": 80,
    "baseATK": 18,
    "baseDEF": 17,
    "baseSPD": 9,
    "growth": {
      "hp": 83,
      "mp": 25,
      "atk": 9,
      "def": 10,
      "spd": 8
    },
    "spriteNum": 48,
    "spriteVariant": 0,
    "spriteKey": "npc2_48",
    "sprite": "./img/monsters/npc2_48.png",
    "description": "Thần Chi Sứ Giả bay lượn trên không trung lam sắc. [khắc chế Hải Dương hệ]",
    "evolution": [
      -5
    ],
    "skills": [
      {
        "id": 21,
        "name": "Liệp Dực Trảm",
        "type": "Phi Hành",
        "power": 23,
        "mpCost": 14,
        "accuracy": 95,
        "heal": 0,
        "buffDef": 0,
        "desc": "Sải cánh săn mồi chém rách đối thủ"
      },
      {
        "id": 22,
        "name": "Toàn Phong Xung Kích",
        "type": "Phi Hành",
        "power": 29,
        "mpCost": 19,
        "accuracy": 95,
        "heal": 0,
        "buffDef": 0,
        "desc": "Cuộn trọn theo lốc xoáy đâm sầm vào kẻ địch"
      },
      {
        "id": 24,
        "name": "Thần Phong Liệt Không",
        "type": "Phi Hành",
        "power": 48,
        "mpCost": 36,
        "accuracy": 95,
        "heal": 0,
        "buffDef": 0,
        "desc": "Cơn bão thần thánh xé toạc không gian"
      },
      {
        "id": 23,
        "name": "Vũ Dực Cuồng Phong",
        "type": "Phi Hành",
        "power": 37,
        "mpCost": 26,
        "accuracy": 95,
        "heal": 0,
        "buffDef": 0,
        "desc": "Đập cánh tạo siêu bão càn quét trận đấu"
      }
    ]
  },
  {
    "id": 95,
    "code": "cauvong_pet_95",
    "name": "Thiên Sử Trường",
    "type": "Phi Hành",
    "color": "#9b59b6",
    "tier": 4,
    "baseHP": 35,
    "baseMP": 80,
    "baseATK": 20,
    "baseDEF": 18,
    "baseSPD": 10,
    "growth": {
      "hp": 91,
      "mp": 30,
      "atk": 10,
      "def": 11,
      "spd": 11
    },
    "spriteNum": 48,
    "spriteVariant": 1,
    "spriteKey": "npc2_48",
    "sprite": "./img/monsters/npc2_48.png",
    "description": "Thiên Sứ là biểu tượng của sự uy nghi và quyền lực. [khắc chế Hải Dương hệ]",
    "evolution": [
      -2
    ],
    "skills": [
      {
        "id": 21,
        "name": "Liệp Dực Trảm",
        "type": "Phi Hành",
        "power": 23,
        "mpCost": 14,
        "accuracy": 95,
        "heal": 0,
        "buffDef": 0,
        "desc": "Sải cánh săn mồi chém rách đối thủ"
      },
      {
        "id": 22,
        "name": "Toàn Phong Xung Kích",
        "type": "Phi Hành",
        "power": 29,
        "mpCost": 19,
        "accuracy": 95,
        "heal": 0,
        "buffDef": 0,
        "desc": "Cuộn trọn theo lốc xoáy đâm sầm vào kẻ địch"
      },
      {
        "id": 24,
        "name": "Thần Phong Liệt Không",
        "type": "Phi Hành",
        "power": 48,
        "mpCost": 36,
        "accuracy": 95,
        "heal": 0,
        "buffDef": 0,
        "desc": "Cơn bão thần thánh xé toạc không gian"
      },
      {
        "id": 23,
        "name": "Vũ Dực Cuồng Phong",
        "type": "Phi Hành",
        "power": 37,
        "mpCost": 26,
        "accuracy": 95,
        "heal": 0,
        "buffDef": 0,
        "desc": "Đập cánh tạo siêu bão càn quét trận đấu"
      }
    ]
  },
  {
    "id": 96,
    "code": "cauvong_pet_96",
    "name": "Phi Thiên Huyền Nữ",
    "type": "Phi Hành",
    "color": "#9b59b6",
    "tier": 5,
    "baseHP": 36,
    "baseMP": 82,
    "baseATK": 21,
    "baseDEF": 22,
    "baseSPD": 12,
    "growth": {
      "hp": 95,
      "mp": 32,
      "atk": 11,
      "def": 12,
      "spd": 12
    },
    "spriteNum": 49,
    "spriteVariant": 0,
    "spriteKey": "npc2_49",
    "sprite": "./img/monsters/npc2_49.png",
    "description": "Hóa thân Cửu Thiên Huyền Nữ. [khắc chế Hải Dương hệ]",
    "evolution": [
      -1
    ],
    "skills": [
      {
        "id": 21,
        "name": "Liệp Dực Trảm",
        "type": "Phi Hành",
        "power": 23,
        "mpCost": 14,
        "accuracy": 95,
        "heal": 0,
        "buffDef": 0,
        "desc": "Sải cánh săn mồi chém rách đối thủ"
      },
      {
        "id": 22,
        "name": "Toàn Phong Xung Kích",
        "type": "Phi Hành",
        "power": 29,
        "mpCost": 19,
        "accuracy": 95,
        "heal": 0,
        "buffDef": 0,
        "desc": "Cuộn trọn theo lốc xoáy đâm sầm vào kẻ địch"
      },
      {
        "id": 24,
        "name": "Thần Phong Liệt Không",
        "type": "Phi Hành",
        "power": 48,
        "mpCost": 36,
        "accuracy": 95,
        "heal": 0,
        "buffDef": 0,
        "desc": "Cơn bão thần thánh xé toạc không gian"
      },
      {
        "id": 23,
        "name": "Vũ Dực Cuồng Phong",
        "type": "Phi Hành",
        "power": 37,
        "mpCost": 26,
        "accuracy": 95,
        "heal": 0,
        "buffDef": 0,
        "desc": "Đập cánh tạo siêu bão càn quét trận đấu"
      }
    ]
  },
  {
    "id": 97,
    "code": "cauvong_pet_97",
    "name": "Sói mặt trăng",
    "type": "Mãnh Thú",
    "color": "#e74c3c",
    "tier": 3,
    "baseHP": 47,
    "baseMP": 80,
    "baseATK": 13,
    "baseDEF": 17,
    "baseSPD": 12,
    "growth": {
      "hp": 100,
      "mp": 27,
      "atk": 11,
      "def": 10,
      "spd": 8
    },
    "spriteNum": 50,
    "spriteVariant": 0,
    "spriteKey": "npc2_50",
    "sprite": "./img/monsters/npc2_50.png",
    "description": "Tắm trong ánh trăng thần bí. [khắc chế Thực Vật hệ]",
    "evolution": [
      -5
    ],
    "skills": [
      {
        "id": 31,
        "name": "Cuồng Bạo Xung Chàng",
        "type": "Mãnh Thú",
        "power": 23,
        "mpCost": 14,
        "accuracy": 95,
        "heal": 0,
        "buffDef": 0,
        "desc": "Húc mạnh bạo liệt hất văng đối thủ"
      },
      {
        "id": 32,
        "name": "Viêm Hống Toái Cốt",
        "type": "Mãnh Thú",
        "power": 29,
        "mpCost": 19,
        "accuracy": 95,
        "heal": 0,
        "buffDef": 0,
        "desc": "Tiếng gầm rực lửa làm rúng động và nứt giáp đối thủ"
      },
      {
        "id": 34,
        "name": "Hồng Liên Liệt Hỏa",
        "type": "Mãnh Thú",
        "power": 50,
        "mpCost": 38,
        "accuracy": 95,
        "heal": 0,
        "buffDef": 0,
        "desc": "Hoa sen lửa địa ngục hủy diệt vạn vật"
      },
      {
        "id": 33,
        "name": "Nộ Diễm Liệt Ba",
        "type": "Mãnh Thú",
        "power": 38,
        "mpCost": 27,
        "accuracy": 95,
        "heal": 0,
        "buffDef": 0,
        "desc": "Sóng lửa cuộn trào thiêu đốt toàn bộ vùng xung quanh"
      }
    ]
  },
  {
    "id": 98,
    "code": "cauvong_pet_98",
    "name": "Sói Vương Cao Ngạo",
    "type": "Mãnh Thú",
    "color": "#e74c3c",
    "tier": 4,
    "baseHP": 47,
    "baseMP": 80,
    "baseATK": 14,
    "baseDEF": 20,
    "baseSPD": 13,
    "growth": {
      "hp": 115,
      "mp": 30,
      "atk": 11,
      "def": 11,
      "spd": 9
    },
    "spriteNum": 50,
    "spriteVariant": 1,
    "spriteKey": "npc2_50",
    "sprite": "./img/monsters/npc2_50.png",
    "description": "Vua bóng đêm cao ngạo. [khắc chế Thực Vật hệ]",
    "evolution": [
      -2
    ],
    "skills": [
      {
        "id": 31,
        "name": "Cuồng Bạo Xung Chàng",
        "type": "Mãnh Thú",
        "power": 23,
        "mpCost": 14,
        "accuracy": 95,
        "heal": 0,
        "buffDef": 0,
        "desc": "Húc mạnh bạo liệt hất văng đối thủ"
      },
      {
        "id": 32,
        "name": "Viêm Hống Toái Cốt",
        "type": "Mãnh Thú",
        "power": 29,
        "mpCost": 19,
        "accuracy": 95,
        "heal": 0,
        "buffDef": 0,
        "desc": "Tiếng gầm rực lửa làm rúng động và nứt giáp đối thủ"
      },
      {
        "id": 34,
        "name": "Hồng Liên Liệt Hỏa",
        "type": "Mãnh Thú",
        "power": 50,
        "mpCost": 38,
        "accuracy": 95,
        "heal": 0,
        "buffDef": 0,
        "desc": "Hoa sen lửa địa ngục hủy diệt vạn vật"
      },
      {
        "id": 33,
        "name": "Nộ Diễm Liệt Ba",
        "type": "Mãnh Thú",
        "power": 38,
        "mpCost": 27,
        "accuracy": 95,
        "heal": 0,
        "buffDef": 0,
        "desc": "Sóng lửa cuộn trào thiêu đốt toàn bộ vùng xung quanh"
      }
    ]
  },
  {
    "id": 99,
    "code": "cauvong_pet_99",
    "name": "Ngân Hồ Vương Tử",
    "type": "Mãnh Thú",
    "color": "#e74c3c",
    "tier": 5,
    "baseHP": 50,
    "baseMP": 82,
    "baseATK": 15,
    "baseDEF": 21,
    "baseSPD": 14,
    "growth": {
      "hp": 117,
      "mp": 32,
      "atk": 12,
      "def": 13,
      "spd": 10
    },
    "spriteNum": 51,
    "spriteVariant": 0,
    "spriteKey": "npc2_51",
    "sprite": "./img/monsters/npc2_51.png",
    "description": "Vương tử Ngân Hồ Tộc uy phong lẫm liệt. [khắc chế Thực Vật hệ]",
    "evolution": [
      -1
    ],
    "skills": [
      {
        "id": 31,
        "name": "Cuồng Bạo Xung Chàng",
        "type": "Mãnh Thú",
        "power": 23,
        "mpCost": 14,
        "accuracy": 95,
        "heal": 0,
        "buffDef": 0,
        "desc": "Húc mạnh bạo liệt hất văng đối thủ"
      },
      {
        "id": 32,
        "name": "Viêm Hống Toái Cốt",
        "type": "Mãnh Thú",
        "power": 29,
        "mpCost": 19,
        "accuracy": 95,
        "heal": 0,
        "buffDef": 0,
        "desc": "Tiếng gầm rực lửa làm rúng động và nứt giáp đối thủ"
      },
      {
        "id": 34,
        "name": "Hồng Liên Liệt Hỏa",
        "type": "Mãnh Thú",
        "power": 50,
        "mpCost": 38,
        "accuracy": 95,
        "heal": 0,
        "buffDef": 0,
        "desc": "Hoa sen lửa địa ngục hủy diệt vạn vật"
      },
      {
        "id": 33,
        "name": "Nộ Diễm Liệt Ba",
        "type": "Mãnh Thú",
        "power": 38,
        "mpCost": 27,
        "accuracy": 95,
        "heal": 0,
        "buffDef": 0,
        "desc": "Sóng lửa cuộn trào thiêu đốt toàn bộ vùng xung quanh"
      }
    ]
  },
  {
    "id": 100,
    "code": "cauvong_pet_100",
    "name": "Tê Lợi Sa (cá mập)",
    "type": "Hải Dương",
    "color": "#2980b9",
    "tier": 3,
    "baseHP": 28,
    "baseMP": 80,
    "baseATK": 18,
    "baseDEF": 12,
    "baseSPD": 12,
    "growth": {
      "hp": 82,
      "mp": 25,
      "atk": 11,
      "def": 10,
      "spd": 8
    },
    "spriteNum": 52,
    "spriteVariant": 0,
    "spriteKey": "npc2_52",
    "sprite": "./img/monsters/npc2_52.png",
    "description": "Sát thủ khét tiếng của đại dương. [khắc chế Kim Loại hệ]",
    "evolution": [
      -5
    ],
    "skills": [
      {
        "id": 41,
        "name": "Ba Đào Trọng Kích",
        "type": "Hải Dương",
        "power": 22,
        "mpCost": 14,
        "accuracy": 95,
        "heal": 0,
        "buffDef": 0,
        "desc": "Cơn sóng cuồn cuộn đập mạnh vào kẻ thù"
      },
      {
        "id": 42,
        "name": "Hải Lãng Nộ Đào",
        "type": "Hải Dương",
        "power": 28,
        "mpCost": 19,
        "accuracy": 95,
        "heal": 0,
        "buffDef": 0,
        "desc": "Sóng biển giận dữ cuốn phăng phòng tuyến địch"
      },
      {
        "id": 44,
        "name": "Hải Tiêu Nộ Lãng",
        "type": "Hải Dương",
        "power": 48,
        "mpCost": 36,
        "accuracy": 95,
        "heal": 0,
        "buffDef": 0,
        "desc": "Đại hồng thủy đại dương nuốt chửng đối thủ"
      },
      {
        "id": 48,
        "name": "Thuật Cầu Nguyện",
        "type": "Hồi Phục",
        "power": 0,
        "mpCost": 16,
        "accuracy": 100,
        "heal": 45,
        "buffDef": 0,
        "desc": "Làn nước mát lành chữa lành 45% sinh lực"
      }
    ]
  },
  {
    "id": 101,
    "code": "cauvong_pet_101",
    "name": "Sa Vương Cuồng Bạo",
    "type": "Hải Dương",
    "color": "#2980b9",
    "tier": 4,
    "baseHP": 32,
    "baseMP": 80,
    "baseATK": 20,
    "baseDEF": 14,
    "baseSPD": 14,
    "growth": {
      "hp": 96,
      "mp": 30,
      "atk": 12,
      "def": 11,
      "spd": 10
    },
    "spriteNum": 52,
    "spriteVariant": 1,
    "spriteKey": "npc2_52",
    "sprite": "./img/monsters/npc2_52.png",
    "description": "Tồn tại mối nguy hiểm nhất chính trong đại dương. [khắc chế Kim Loại hệ]",
    "evolution": [
      -2
    ],
    "skills": [
      {
        "id": 41,
        "name": "Ba Đào Trọng Kích",
        "type": "Hải Dương",
        "power": 22,
        "mpCost": 14,
        "accuracy": 95,
        "heal": 0,
        "buffDef": 0,
        "desc": "Cơn sóng cuồn cuộn đập mạnh vào kẻ thù"
      },
      {
        "id": 42,
        "name": "Hải Lãng Nộ Đào",
        "type": "Hải Dương",
        "power": 28,
        "mpCost": 19,
        "accuracy": 95,
        "heal": 0,
        "buffDef": 0,
        "desc": "Sóng biển giận dữ cuốn phăng phòng tuyến địch"
      },
      {
        "id": 44,
        "name": "Hải Tiêu Nộ Lãng",
        "type": "Hải Dương",
        "power": 48,
        "mpCost": 36,
        "accuracy": 95,
        "heal": 0,
        "buffDef": 0,
        "desc": "Đại hồng thủy đại dương nuốt chửng đối thủ"
      },
      {
        "id": 48,
        "name": "Thuật Cầu Nguyện",
        "type": "Hồi Phục",
        "power": 0,
        "mpCost": 16,
        "accuracy": 100,
        "heal": 45,
        "buffDef": 0,
        "desc": "Làn nước mát lành chữa lành 45% sinh lực"
      }
    ]
  },
  {
    "id": 102,
    "code": "cauvong_pet_102",
    "name": "Mỹ Nhân Ngư",
    "type": "Hải Dương",
    "color": "#2980b9",
    "tier": 5,
    "baseHP": 34,
    "baseMP": 82,
    "baseATK": 16,
    "baseDEF": 18,
    "baseSPD": 15,
    "growth": {
      "hp": 98,
      "mp": 32,
      "atk": 14,
      "def": 13,
      "spd": 11
    },
    "spriteNum": 53,
    "spriteVariant": 0,
    "spriteKey": "npc2_53",
    "sprite": "./img/monsters/npc2_53.png",
    "description": "Ca sỹ xinh đẹp, tuyệt mỹ thiện lương. [khắc chế Kim Loại hệ]",
    "evolution": [
      -1
    ],
    "skills": [
      {
        "id": 41,
        "name": "Ba Đào Trọng Kích",
        "type": "Hải Dương",
        "power": 22,
        "mpCost": 14,
        "accuracy": 95,
        "heal": 0,
        "buffDef": 0,
        "desc": "Cơn sóng cuồn cuộn đập mạnh vào kẻ thù"
      },
      {
        "id": 42,
        "name": "Hải Lãng Nộ Đào",
        "type": "Hải Dương",
        "power": 28,
        "mpCost": 19,
        "accuracy": 95,
        "heal": 0,
        "buffDef": 0,
        "desc": "Sóng biển giận dữ cuốn phăng phòng tuyến địch"
      },
      {
        "id": 44,
        "name": "Hải Tiêu Nộ Lãng",
        "type": "Hải Dương",
        "power": 48,
        "mpCost": 36,
        "accuracy": 95,
        "heal": 0,
        "buffDef": 0,
        "desc": "Đại hồng thủy đại dương nuốt chửng đối thủ"
      },
      {
        "id": 48,
        "name": "Thuật Cầu Nguyện",
        "type": "Hồi Phục",
        "power": 0,
        "mpCost": 16,
        "accuracy": 100,
        "heal": 45,
        "buffDef": 0,
        "desc": "Làn nước mát lành chữa lành 45% sinh lực"
      }
    ]
  },
  {
    "id": 103,
    "code": "liethoa_pet_1",
    "name": "Nhiên Dực Bức",
    "type": "Mãnh Thú",
    "color": "#e74c3c",
    "tier": 1,
    "baseHP": 41,
    "baseMP": 90,
    "baseATK": 18,
    "baseDEF": 14,
    "baseSPD": 15,
    "growth": {
      "hp": 45,
      "mp": 16,
      "atk": 11,
      "def": 8,
      "spd": 9
    },
    "spriteNum": 14,
    "spriteVariant": 0,
    "spriteKey": "npc2_14",
    "sprite": "./img/monsters/npc2_14.png",
    "description": "Dơi lửa sở hữu sải cánh rực than hồng, chuyên săn mồi đêm",
    "evolution": [],
    "skills": [
      {
        "id": 30,
        "name": "Liệt Trảo",
        "type": "Mãnh Thú",
        "power": 17,
        "mpCost": 10,
        "accuracy": 95,
        "heal": 0,
        "buffDef": 0,
        "desc": "Móng vuốt rực lửa cào xé dữ dội"
      },
      {
        "id": 31,
        "name": "Cuồng Bạo Xung Chàng",
        "type": "Mãnh Thú",
        "power": 23,
        "mpCost": 14,
        "accuracy": 95,
        "heal": 0,
        "buffDef": 0,
        "desc": "Húc mạnh bạo liệt hất văng đối thủ"
      },
      {
        "id": 32,
        "name": "Viêm Hống Toái Cốt",
        "type": "Mãnh Thú",
        "power": 29,
        "mpCost": 19,
        "accuracy": 95,
        "heal": 0,
        "buffDef": 0,
        "desc": "Tiếng gầm rực lửa làm rúng động và nứt giáp đối thủ"
      },
      {
        "id": 36,
        "name": "Diễm Kích",
        "type": "Mãnh Thú",
        "power": 26,
        "mpCost": 17,
        "accuracy": 95,
        "heal": 0,
        "buffDef": 0,
        "desc": "Phóng đạn lửa nổ tung khi va chạm"
      }
    ]
  },
  {
    "id": 104,
    "code": "liethoa_pet_2",
    "name": "Bom Tinh Nghịch",
    "type": "Kim Loại",
    "color": "#f39c12",
    "tier": 1,
    "baseHP": 41,
    "baseMP": 90,
    "baseATK": 18,
    "baseDEF": 14,
    "baseSPD": 15,
    "growth": {
      "hp": 45,
      "mp": 16,
      "atk": 11,
      "def": 8,
      "spd": 9
    },
    "spriteNum": 18,
    "spriteVariant": 0,
    "spriteKey": "npc2_18",
    "sprite": "./img/monsters/npc2_18.png",
    "description": "Khối kim loại tích điện lấp lánh sẵn sàng phát nổ bảo vệ chủ nhân",
    "evolution": [],
    "skills": [
      {
        "id": 10,
        "name": "Thiết Quyền",
        "type": "Kim Loại",
        "power": 16,
        "mpCost": 10,
        "accuracy": 95,
        "heal": 0,
        "buffDef": 0,
        "desc": "Nắm đấm kim loại nặng nề nện thẳng mục tiêu"
      },
      {
        "id": 11,
        "name": "Cương Thiết Trảm",
        "type": "Kim Loại",
        "power": 22,
        "mpCost": 14,
        "accuracy": 95,
        "heal": 0,
        "buffDef": 0,
        "desc": "Đường kiếm thép sắc lạnh chém đứt giáp trụ"
      },
      {
        "id": 12,
        "name": "Kim Tinh Xung Kích",
        "type": "Kim Loại",
        "power": 28,
        "mpCost": 19,
        "accuracy": 95,
        "heal": 0,
        "buffDef": 0,
        "desc": "Lao thẳng với mũi khoan kim cương cực mạnh"
      },
      {
        "id": 16,
        "name": "Bão Cát",
        "type": "Kim Loại",
        "power": 24,
        "mpCost": 16,
        "accuracy": 90,
        "heal": 0,
        "buffDef": 0,
        "desc": "Cơn bão bụi cát cuốn xé và giảm tầm nhìn địch"
      }
    ]
  },
  {
    "id": 105,
    "code": "liethoa_pet_3",
    "name": "Nhiên Liệp Sư",
    "type": "Mãnh Thú",
    "color": "#e74c3c",
    "tier": 2,
    "baseHP": 47,
    "baseMP": 95,
    "baseATK": 22,
    "baseDEF": 17,
    "baseSPD": 18,
    "growth": {
      "hp": 50,
      "mp": 16,
      "atk": 13,
      "def": 9,
      "spd": 10
    },
    "spriteNum": 21,
    "spriteVariant": 0,
    "spriteKey": "npc2_21",
    "sprite": "./img/monsters/npc2_21.png",
    "description": "Sư tử bờm lửa dũng mãnh, vua của thảo nguyên Liệt Hỏa",
    "evolution": [],
    "skills": [
      {
        "id": 30,
        "name": "Liệt Trảo",
        "type": "Mãnh Thú",
        "power": 17,
        "mpCost": 10,
        "accuracy": 95,
        "heal": 0,
        "buffDef": 0,
        "desc": "Móng vuốt rực lửa cào xé dữ dội"
      },
      {
        "id": 31,
        "name": "Cuồng Bạo Xung Chàng",
        "type": "Mãnh Thú",
        "power": 23,
        "mpCost": 14,
        "accuracy": 95,
        "heal": 0,
        "buffDef": 0,
        "desc": "Húc mạnh bạo liệt hất văng đối thủ"
      },
      {
        "id": 32,
        "name": "Viêm Hống Toái Cốt",
        "type": "Mãnh Thú",
        "power": 29,
        "mpCost": 19,
        "accuracy": 95,
        "heal": 0,
        "buffDef": 0,
        "desc": "Tiếng gầm rực lửa làm rúng động và nứt giáp đối thủ"
      },
      {
        "id": 33,
        "name": "Nộ Diễm Liệt Ba",
        "type": "Mãnh Thú",
        "power": 38,
        "mpCost": 27,
        "accuracy": 95,
        "heal": 0,
        "buffDef": 0,
        "desc": "Sóng lửa cuộn trào thiêu đốt toàn bộ vùng xung quanh"
      }
    ]
  },
  {
    "id": 106,
    "code": "liethoa_pet_4",
    "name": "Hắc Thán Báo",
    "type": "Mãnh Thú",
    "color": "#e74c3c",
    "tier": 2,
    "baseHP": 47,
    "baseMP": 95,
    "baseATK": 22,
    "baseDEF": 17,
    "baseSPD": 18,
    "growth": {
      "hp": 50,
      "mp": 16,
      "atk": 13,
      "def": 9,
      "spd": 10
    },
    "spriteNum": 22,
    "spriteVariant": 0,
    "spriteKey": "npc2_22",
    "sprite": "./img/monsters/npc2_22.png",
    "description": "Báo đen bóng đêm di chuyển như làn khói than đen kịt",
    "evolution": [],
    "skills": [
      {
        "id": 30,
        "name": "Liệt Trảo",
        "type": "Mãnh Thú",
        "power": 17,
        "mpCost": 10,
        "accuracy": 95,
        "heal": 0,
        "buffDef": 0,
        "desc": "Móng vuốt rực lửa cào xé dữ dội"
      },
      {
        "id": 31,
        "name": "Cuồng Bạo Xung Chàng",
        "type": "Mãnh Thú",
        "power": 23,
        "mpCost": 14,
        "accuracy": 95,
        "heal": 0,
        "buffDef": 0,
        "desc": "Húc mạnh bạo liệt hất văng đối thủ"
      },
      {
        "id": 32,
        "name": "Viêm Hống Toái Cốt",
        "type": "Mãnh Thú",
        "power": 29,
        "mpCost": 19,
        "accuracy": 95,
        "heal": 0,
        "buffDef": 0,
        "desc": "Tiếng gầm rực lửa làm rúng động và nứt giáp đối thủ"
      },
      {
        "id": 33,
        "name": "Nộ Diễm Liệt Ba",
        "type": "Mãnh Thú",
        "power": 38,
        "mpCost": 27,
        "accuracy": 95,
        "heal": 0,
        "buffDef": 0,
        "desc": "Sóng lửa cuộn trào thiêu đốt toàn bộ vùng xung quanh"
      }
    ]
  },
  {
    "id": 107,
    "code": "liethoa_pet_5",
    "name": "Hỏa Diễm Hồ",
    "type": "Mãnh Thú",
    "color": "#e74c3c",
    "tier": 2,
    "baseHP": 47,
    "baseMP": 95,
    "baseATK": 22,
    "baseDEF": 17,
    "baseSPD": 18,
    "growth": {
      "hp": 50,
      "mp": 16,
      "atk": 13,
      "def": 9,
      "spd": 10
    },
    "spriteNum": 23,
    "spriteVariant": 0,
    "spriteKey": "npc2_23",
    "sprite": "./img/monsters/npc2_23.png",
    "description": "Hồ ly lửa chín đuôi mê hoặc kẻ thù bằng ảo ảnh rực cháy",
    "evolution": [],
    "skills": [
      {
        "id": 30,
        "name": "Liệt Trảo",
        "type": "Mãnh Thú",
        "power": 17,
        "mpCost": 10,
        "accuracy": 95,
        "heal": 0,
        "buffDef": 0,
        "desc": "Móng vuốt rực lửa cào xé dữ dội"
      },
      {
        "id": 31,
        "name": "Cuồng Bạo Xung Chàng",
        "type": "Mãnh Thú",
        "power": 23,
        "mpCost": 14,
        "accuracy": 95,
        "heal": 0,
        "buffDef": 0,
        "desc": "Húc mạnh bạo liệt hất văng đối thủ"
      },
      {
        "id": 32,
        "name": "Viêm Hống Toái Cốt",
        "type": "Mãnh Thú",
        "power": 29,
        "mpCost": 19,
        "accuracy": 95,
        "heal": 0,
        "buffDef": 0,
        "desc": "Tiếng gầm rực lửa làm rúng động và nứt giáp đối thủ"
      },
      {
        "id": 33,
        "name": "Nộ Diễm Liệt Ba",
        "type": "Mãnh Thú",
        "power": 38,
        "mpCost": 27,
        "accuracy": 95,
        "heal": 0,
        "buffDef": 0,
        "desc": "Sóng lửa cuộn trào thiêu đốt toàn bộ vùng xung quanh"
      }
    ]
  },
  {
    "id": 108,
    "code": "liethoa_pet_6",
    "name": "Viêm Ma",
    "type": "Mãnh Thú",
    "color": "#e74c3c",
    "tier": 3,
    "baseHP": 53,
    "baseMP": 100,
    "baseATK": 26,
    "baseDEF": 20,
    "baseSPD": 21,
    "growth": {
      "hp": 55,
      "mp": 16,
      "atk": 15,
      "def": 10,
      "spd": 11
    },
    "spriteNum": 24,
    "spriteVariant": 0,
    "spriteKey": "npc2_24",
    "sprite": "./img/monsters/npc2_24.png",
    "description": "Chúa tể dung nham trồi lên từ lòng đất Liệt Hỏa",
    "evolution": [],
    "skills": [
      {
        "id": 31,
        "name": "Cuồng Bạo Xung Chàng",
        "type": "Mãnh Thú",
        "power": 23,
        "mpCost": 14,
        "accuracy": 95,
        "heal": 0,
        "buffDef": 0,
        "desc": "Húc mạnh bạo liệt hất văng đối thủ"
      },
      {
        "id": 32,
        "name": "Viêm Hống Toái Cốt",
        "type": "Mãnh Thú",
        "power": 29,
        "mpCost": 19,
        "accuracy": 95,
        "heal": 0,
        "buffDef": 0,
        "desc": "Tiếng gầm rực lửa làm rúng động và nứt giáp đối thủ"
      },
      {
        "id": 34,
        "name": "Hồng Liên Liệt Hỏa",
        "type": "Mãnh Thú",
        "power": 50,
        "mpCost": 38,
        "accuracy": 95,
        "heal": 0,
        "buffDef": 0,
        "desc": "Hoa sen lửa địa ngục hủy diệt vạn vật"
      },
      {
        "id": 33,
        "name": "Nộ Diễm Liệt Ba",
        "type": "Mãnh Thú",
        "power": 38,
        "mpCost": 27,
        "accuracy": 95,
        "heal": 0,
        "buffDef": 0,
        "desc": "Sóng lửa cuộn trào thiêu đốt toàn bộ vùng xung quanh"
      }
    ]
  },
  {
    "id": 109,
    "code": "liethoa_pet_7",
    "name": "Long Bảo Bối",
    "type": "Phi Hành",
    "color": "#9b59b6",
    "tier": 1,
    "baseHP": 41,
    "baseMP": 90,
    "baseATK": 18,
    "baseDEF": 14,
    "baseSPD": 15,
    "growth": {
      "hp": 45,
      "mp": 16,
      "atk": 11,
      "def": 8,
      "spd": 9
    },
    "spriteNum": 25,
    "spriteVariant": 0,
    "spriteKey": "npc2_25",
    "sprite": "./img/monsters/npc2_25.png",
    "description": "Rồng con đáng yêu sở hữu đôi cánh ngọc bích",
    "evolution": [],
    "skills": [
      {
        "id": 20,
        "name": "Phong Nhận",
        "type": "Phi Hành",
        "power": 17,
        "mpCost": 10,
        "accuracy": 95,
        "heal": 0,
        "buffDef": 0,
        "desc": "Lưỡi đao gió chém ngọt từ không trung"
      },
      {
        "id": 21,
        "name": "Liệp Dực Trảm",
        "type": "Phi Hành",
        "power": 23,
        "mpCost": 14,
        "accuracy": 95,
        "heal": 0,
        "buffDef": 0,
        "desc": "Sải cánh săn mồi chém rách đối thủ"
      },
      {
        "id": 22,
        "name": "Toàn Phong Xung Kích",
        "type": "Phi Hành",
        "power": 29,
        "mpCost": 19,
        "accuracy": 95,
        "heal": 0,
        "buffDef": 0,
        "desc": "Cuộn trọn theo lốc xoáy đâm sầm vào kẻ địch"
      },
      {
        "id": 26,
        "name": "Lôi Đình Nhất Kích",
        "type": "Phi Hành",
        "power": 38,
        "mpCost": 28,
        "accuracy": 95,
        "heal": 0,
        "buffDef": 0,
        "desc": "Sấm sét cửu thiên giáng thế gây tê liệt"
      }
    ]
  },
  {
    "id": 110,
    "code": "liethoa_pet_8",
    "name": "Phệ Hỏa Thú",
    "type": "Mãnh Thú",
    "color": "#e74c3c",
    "tier": 2,
    "baseHP": 47,
    "baseMP": 95,
    "baseATK": 22,
    "baseDEF": 17,
    "baseSPD": 18,
    "growth": {
      "hp": 50,
      "mp": 16,
      "atk": 13,
      "def": 9,
      "spd": 10
    },
    "spriteNum": 26,
    "spriteVariant": 0,
    "spriteKey": "npc2_26",
    "sprite": "./img/monsters/npc2_26.png",
    "description": "Thú săn lửa nuốt chửng ngọn lửa để gia tăng sức mạnh",
    "evolution": [],
    "skills": [
      {
        "id": 30,
        "name": "Liệt Trảo",
        "type": "Mãnh Thú",
        "power": 17,
        "mpCost": 10,
        "accuracy": 95,
        "heal": 0,
        "buffDef": 0,
        "desc": "Móng vuốt rực lửa cào xé dữ dội"
      },
      {
        "id": 31,
        "name": "Cuồng Bạo Xung Chàng",
        "type": "Mãnh Thú",
        "power": 23,
        "mpCost": 14,
        "accuracy": 95,
        "heal": 0,
        "buffDef": 0,
        "desc": "Húc mạnh bạo liệt hất văng đối thủ"
      },
      {
        "id": 32,
        "name": "Viêm Hống Toái Cốt",
        "type": "Mãnh Thú",
        "power": 29,
        "mpCost": 19,
        "accuracy": 95,
        "heal": 0,
        "buffDef": 0,
        "desc": "Tiếng gầm rực lửa làm rúng động và nứt giáp đối thủ"
      },
      {
        "id": 33,
        "name": "Nộ Diễm Liệt Ba",
        "type": "Mãnh Thú",
        "power": 38,
        "mpCost": 27,
        "accuracy": 95,
        "heal": 0,
        "buffDef": 0,
        "desc": "Sóng lửa cuộn trào thiêu đốt toàn bộ vùng xung quanh"
      }
    ]
  },
  {
    "id": 111,
    "code": "liethoa_pet_9",
    "name": "Bạo Long Thú",
    "type": "Mãnh Thú",
    "color": "#e74c3c",
    "tier": 3,
    "baseHP": 53,
    "baseMP": 100,
    "baseATK": 26,
    "baseDEF": 20,
    "baseSPD": 21,
    "growth": {
      "hp": 55,
      "mp": 16,
      "atk": 15,
      "def": 10,
      "spd": 11
    },
    "spriteNum": 27,
    "spriteVariant": 0,
    "spriteKey": "npc2_27",
    "sprite": "./img/monsters/npc2_27.png",
    "description": "Bạo long khổng lồ với uy lực hủy diệt vạn vật",
    "evolution": [],
    "skills": [
      {
        "id": 31,
        "name": "Cuồng Bạo Xung Chàng",
        "type": "Mãnh Thú",
        "power": 23,
        "mpCost": 14,
        "accuracy": 95,
        "heal": 0,
        "buffDef": 0,
        "desc": "Húc mạnh bạo liệt hất văng đối thủ"
      },
      {
        "id": 32,
        "name": "Viêm Hống Toái Cốt",
        "type": "Mãnh Thú",
        "power": 29,
        "mpCost": 19,
        "accuracy": 95,
        "heal": 0,
        "buffDef": 0,
        "desc": "Tiếng gầm rực lửa làm rúng động và nứt giáp đối thủ"
      },
      {
        "id": 34,
        "name": "Hồng Liên Liệt Hỏa",
        "type": "Mãnh Thú",
        "power": 50,
        "mpCost": 38,
        "accuracy": 95,
        "heal": 0,
        "buffDef": 0,
        "desc": "Hoa sen lửa địa ngục hủy diệt vạn vật"
      },
      {
        "id": 33,
        "name": "Nộ Diễm Liệt Ba",
        "type": "Mãnh Thú",
        "power": 38,
        "mpCost": 27,
        "accuracy": 95,
        "heal": 0,
        "buffDef": 0,
        "desc": "Sóng lửa cuộn trào thiêu đốt toàn bộ vùng xung quanh"
      }
    ]
  },
  {
    "id": 112,
    "code": "liethoa_pet_10",
    "name": "Ly Ngưu Ngưu",
    "type": "Kim Loại",
    "color": "#f39c12",
    "tier": 1,
    "baseHP": 41,
    "baseMP": 90,
    "baseATK": 18,
    "baseDEF": 14,
    "baseSPD": 15,
    "growth": {
      "hp": 45,
      "mp": 16,
      "atk": 11,
      "def": 8,
      "spd": 9
    },
    "spriteNum": 28,
    "spriteVariant": 0,
    "spriteKey": "npc2_28",
    "sprite": "./img/monsters/npc2_28.png",
    "description": "Bò chiến giáp sắt bền bỉ và kiên cường",
    "evolution": [],
    "skills": [
      {
        "id": 10,
        "name": "Thiết Quyền",
        "type": "Kim Loại",
        "power": 16,
        "mpCost": 10,
        "accuracy": 95,
        "heal": 0,
        "buffDef": 0,
        "desc": "Nắm đấm kim loại nặng nề nện thẳng mục tiêu"
      },
      {
        "id": 11,
        "name": "Cương Thiết Trảm",
        "type": "Kim Loại",
        "power": 22,
        "mpCost": 14,
        "accuracy": 95,
        "heal": 0,
        "buffDef": 0,
        "desc": "Đường kiếm thép sắc lạnh chém đứt giáp trụ"
      },
      {
        "id": 12,
        "name": "Kim Tinh Xung Kích",
        "type": "Kim Loại",
        "power": 28,
        "mpCost": 19,
        "accuracy": 95,
        "heal": 0,
        "buffDef": 0,
        "desc": "Lao thẳng với mũi khoan kim cương cực mạnh"
      },
      {
        "id": 16,
        "name": "Bão Cát",
        "type": "Kim Loại",
        "power": 24,
        "mpCost": 16,
        "accuracy": 90,
        "heal": 0,
        "buffDef": 0,
        "desc": "Cơn bão bụi cát cuốn xé và giảm tầm nhìn địch"
      }
    ]
  },
  {
    "id": 113,
    "code": "liethoa_pet_11",
    "name": "Hỏa Phượng Hoàng",
    "type": "Phi Hành",
    "color": "#9b59b6",
    "tier": 3,
    "baseHP": 53,
    "baseMP": 100,
    "baseATK": 26,
    "baseDEF": 20,
    "baseSPD": 21,
    "growth": {
      "hp": 55,
      "mp": 16,
      "atk": 15,
      "def": 10,
      "spd": 11
    },
    "spriteNum": 29,
    "spriteVariant": 0,
    "spriteKey": "npc2_29",
    "sprite": "./img/monsters/npc2_29.png",
    "description": "Phượng hoàng tái sinh từ tro tàn với ngọn lửa bất tử",
    "evolution": [],
    "skills": [
      {
        "id": 21,
        "name": "Liệp Dực Trảm",
        "type": "Phi Hành",
        "power": 23,
        "mpCost": 14,
        "accuracy": 95,
        "heal": 0,
        "buffDef": 0,
        "desc": "Sải cánh săn mồi chém rách đối thủ"
      },
      {
        "id": 22,
        "name": "Toàn Phong Xung Kích",
        "type": "Phi Hành",
        "power": 29,
        "mpCost": 19,
        "accuracy": 95,
        "heal": 0,
        "buffDef": 0,
        "desc": "Cuộn trọn theo lốc xoáy đâm sầm vào kẻ địch"
      },
      {
        "id": 24,
        "name": "Thần Phong Liệt Không",
        "type": "Phi Hành",
        "power": 48,
        "mpCost": 36,
        "accuracy": 95,
        "heal": 0,
        "buffDef": 0,
        "desc": "Cơn bão thần thánh xé toạc không gian"
      },
      {
        "id": 23,
        "name": "Vũ Dực Cuồng Phong",
        "type": "Phi Hành",
        "power": 37,
        "mpCost": 26,
        "accuracy": 95,
        "heal": 0,
        "buffDef": 0,
        "desc": "Đập cánh tạo siêu bão càn quét trận đấu"
      }
    ]
  },
  {
    "id": 114,
    "code": "liethoa_pet_12",
    "name": "Diệp Tán Oa",
    "type": "Thực Vật",
    "color": "#27ae60",
    "tier": 1,
    "baseHP": 41,
    "baseMP": 90,
    "baseATK": 18,
    "baseDEF": 14,
    "baseSPD": 15,
    "growth": {
      "hp": 45,
      "mp": 16,
      "atk": 11,
      "def": 8,
      "spd": 9
    },
    "spriteNum": 30,
    "spriteVariant": 0,
    "spriteKey": "npc2_30",
    "sprite": "./img/monsters/npc2_30.png",
    "description": "Ếch đội lá sen ngộ nghĩnh ẩn náu trong đầm nước",
    "evolution": [],
    "skills": [
      {
        "id": 0,
        "name": "Triền Nhiễu",
        "type": "Thực Vật",
        "power": 16,
        "mpCost": 10,
        "accuracy": 95,
        "heal": 0,
        "buffDef": 0,
        "desc": "Dây leo quấn chặt gây sát thương và khống chế"
      },
      {
        "id": 1,
        "name": "Phong Lợi Tiêm Thứ",
        "type": "Thực Vật",
        "power": 22,
        "mpCost": 14,
        "accuracy": 95,
        "heal": 0,
        "buffDef": 0,
        "desc": "Phóng ra gai nhọn sắc bén như lưỡi cưa"
      },
      {
        "id": 2,
        "name": "Phi Diệp Đao Phong",
        "type": "Thực Vật",
        "power": 28,
        "mpCost": 18,
        "accuracy": 95,
        "heal": 0,
        "buffDef": 0,
        "desc": "Phóng bão lá sắc bén tựa ngàn lưỡi kiếm"
      },
      {
        "id": 6,
        "name": "Châm Diệp Trảm",
        "type": "Thực Vật",
        "power": 26,
        "mpCost": 18,
        "accuracy": 95,
        "heal": 0,
        "buffDef": 0,
        "desc": "Lưỡi trảm lá kim xuyên thủng lớp phòng hộ"
      }
    ]
  },
  {
    "id": 115,
    "code": "liethoa_pet_13",
    "name": "Thụ Tán Oa",
    "type": "Thực Vật",
    "color": "#27ae60",
    "tier": 2,
    "baseHP": 47,
    "baseMP": 95,
    "baseATK": 22,
    "baseDEF": 17,
    "baseSPD": 18,
    "growth": {
      "hp": 50,
      "mp": 16,
      "atk": 13,
      "def": 9,
      "spd": 10
    },
    "spriteNum": 31,
    "spriteVariant": 0,
    "spriteKey": "npc2_31",
    "sprite": "./img/monsters/npc2_31.png",
    "description": "Cóc cổ thụ phủ đầy rêu phong với lớp da độc mộc",
    "evolution": [],
    "skills": [
      {
        "id": 0,
        "name": "Triền Nhiễu",
        "type": "Thực Vật",
        "power": 16,
        "mpCost": 10,
        "accuracy": 95,
        "heal": 0,
        "buffDef": 0,
        "desc": "Dây leo quấn chặt gây sát thương và khống chế"
      },
      {
        "id": 1,
        "name": "Phong Lợi Tiêm Thứ",
        "type": "Thực Vật",
        "power": 22,
        "mpCost": 14,
        "accuracy": 95,
        "heal": 0,
        "buffDef": 0,
        "desc": "Phóng ra gai nhọn sắc bén như lưỡi cưa"
      },
      {
        "id": 2,
        "name": "Phi Diệp Đao Phong",
        "type": "Thực Vật",
        "power": 28,
        "mpCost": 18,
        "accuracy": 95,
        "heal": 0,
        "buffDef": 0,
        "desc": "Phóng bão lá sắc bén tựa ngàn lưỡi kiếm"
      },
      {
        "id": 3,
        "name": "Sâm Lâm Bạo Phát",
        "type": "Thực Vật",
        "power": 36,
        "mpCost": 26,
        "accuracy": 95,
        "heal": 0,
        "buffDef": 0,
        "desc": "Sức mạnh rừng thẳm bộc phát đè bẹp đối phương"
      }
    ]
  },
  {
    "id": 116,
    "code": "liethoa_pet_14",
    "name": "Long Oa",
    "type": "Hải Dương",
    "color": "#2980b9",
    "tier": 3,
    "baseHP": 53,
    "baseMP": 100,
    "baseATK": 26,
    "baseDEF": 20,
    "baseSPD": 21,
    "growth": {
      "hp": 55,
      "mp": 16,
      "atk": 15,
      "def": 10,
      "spd": 11
    },
    "spriteNum": 32,
    "spriteVariant": 0,
    "spriteKey": "npc2_32",
    "sprite": "./img/monsters/npc2_32.png",
    "description": "Rồng cóc đầm lầy hô mưa gọi gió",
    "evolution": [],
    "skills": [
      {
        "id": 41,
        "name": "Ba Đào Trọng Kích",
        "type": "Hải Dương",
        "power": 22,
        "mpCost": 14,
        "accuracy": 95,
        "heal": 0,
        "buffDef": 0,
        "desc": "Cơn sóng cuồn cuộn đập mạnh vào kẻ thù"
      },
      {
        "id": 42,
        "name": "Hải Lãng Nộ Đào",
        "type": "Hải Dương",
        "power": 28,
        "mpCost": 19,
        "accuracy": 95,
        "heal": 0,
        "buffDef": 0,
        "desc": "Sóng biển giận dữ cuốn phăng phòng tuyến địch"
      },
      {
        "id": 44,
        "name": "Hải Tiêu Nộ Lãng",
        "type": "Hải Dương",
        "power": 48,
        "mpCost": 36,
        "accuracy": 95,
        "heal": 0,
        "buffDef": 0,
        "desc": "Đại hồng thủy đại dương nuốt chửng đối thủ"
      },
      {
        "id": 48,
        "name": "Thuật Cầu Nguyện",
        "type": "Hồi Phục",
        "power": 0,
        "mpCost": 16,
        "accuracy": 100,
        "heal": 45,
        "buffDef": 0,
        "desc": "Làn nước mát lành chữa lành 45% sinh lực"
      }
    ]
  },
  {
    "id": 117,
    "code": "liethoa_pet_15",
    "name": "Tiên Nhân Cầu Bảo Bảo",
    "type": "Thực Vật",
    "color": "#27ae60",
    "tier": 1,
    "baseHP": 41,
    "baseMP": 90,
    "baseATK": 18,
    "baseDEF": 14,
    "baseSPD": 15,
    "growth": {
      "hp": 45,
      "mp": 16,
      "atk": 11,
      "def": 8,
      "spd": 9
    },
    "spriteNum": 33,
    "spriteVariant": 0,
    "spriteKey": "npc2_33",
    "sprite": "./img/monsters/npc2_33.png",
    "description": "Bé xương rồng sa mạc gai nhọn chi chít đáng yêu",
    "evolution": [],
    "skills": [
      {
        "id": 0,
        "name": "Triền Nhiễu",
        "type": "Thực Vật",
        "power": 16,
        "mpCost": 10,
        "accuracy": 95,
        "heal": 0,
        "buffDef": 0,
        "desc": "Dây leo quấn chặt gây sát thương và khống chế"
      },
      {
        "id": 1,
        "name": "Phong Lợi Tiêm Thứ",
        "type": "Thực Vật",
        "power": 22,
        "mpCost": 14,
        "accuracy": 95,
        "heal": 0,
        "buffDef": 0,
        "desc": "Phóng ra gai nhọn sắc bén như lưỡi cưa"
      },
      {
        "id": 2,
        "name": "Phi Diệp Đao Phong",
        "type": "Thực Vật",
        "power": 28,
        "mpCost": 18,
        "accuracy": 95,
        "heal": 0,
        "buffDef": 0,
        "desc": "Phóng bão lá sắc bén tựa ngàn lưỡi kiếm"
      },
      {
        "id": 6,
        "name": "Châm Diệp Trảm",
        "type": "Thực Vật",
        "power": 26,
        "mpCost": 18,
        "accuracy": 95,
        "heal": 0,
        "buffDef": 0,
        "desc": "Lưỡi trảm lá kim xuyên thủng lớp phòng hộ"
      }
    ]
  },
  {
    "id": 118,
    "code": "liethoa_pet_16",
    "name": "Tinh Vân Hạc",
    "type": "Phi Hành",
    "color": "#9b59b6",
    "tier": 2,
    "baseHP": 47,
    "baseMP": 95,
    "baseATK": 22,
    "baseDEF": 17,
    "baseSPD": 18,
    "growth": {
      "hp": 50,
      "mp": 16,
      "atk": 13,
      "def": 9,
      "spd": 10
    },
    "spriteNum": 34,
    "spriteVariant": 0,
    "spriteKey": "npc2_34",
    "sprite": "./img/monsters/npc2_34.png",
    "description": "Hạc mây tinh khiết sải cánh giữa dải ngân hà",
    "evolution": [],
    "skills": [
      {
        "id": 20,
        "name": "Phong Nhận",
        "type": "Phi Hành",
        "power": 17,
        "mpCost": 10,
        "accuracy": 95,
        "heal": 0,
        "buffDef": 0,
        "desc": "Lưỡi đao gió chém ngọt từ không trung"
      },
      {
        "id": 21,
        "name": "Liệp Dực Trảm",
        "type": "Phi Hành",
        "power": 23,
        "mpCost": 14,
        "accuracy": 95,
        "heal": 0,
        "buffDef": 0,
        "desc": "Sải cánh săn mồi chém rách đối thủ"
      },
      {
        "id": 22,
        "name": "Toàn Phong Xung Kích",
        "type": "Phi Hành",
        "power": 29,
        "mpCost": 19,
        "accuracy": 95,
        "heal": 0,
        "buffDef": 0,
        "desc": "Cuộn trọn theo lốc xoáy đâm sầm vào kẻ địch"
      },
      {
        "id": 23,
        "name": "Vũ Dực Cuồng Phong",
        "type": "Phi Hành",
        "power": 37,
        "mpCost": 26,
        "accuracy": 95,
        "heal": 0,
        "buffDef": 0,
        "desc": "Đập cánh tạo siêu bão càn quét trận đấu"
      }
    ]
  },
  {
    "id": 119,
    "code": "liethoa_pet_17",
    "name": "Tuyệt Đối Linh Độ Khuyển",
    "type": "Hải Dương",
    "color": "#2980b9",
    "tier": 2,
    "baseHP": 47,
    "baseMP": 95,
    "baseATK": 22,
    "baseDEF": 17,
    "baseSPD": 18,
    "growth": {
      "hp": 50,
      "mp": 16,
      "atk": 13,
      "def": 9,
      "spd": 10
    },
    "spriteNum": 35,
    "spriteVariant": 0,
    "spriteKey": "npc2_35",
    "sprite": "./img/monsters/npc2_35.png",
    "description": "Chó tuyết mang hơi thở âm độ đóng băng vạn dặm",
    "evolution": [],
    "skills": [
      {
        "id": 40,
        "name": "Thủy Trụ",
        "type": "Hải Dương",
        "power": 15,
        "mpCost": 10,
        "accuracy": 95,
        "heal": 0,
        "buffDef": 0,
        "desc": "Cột nước áp lực cao bắn thẳng từ mặt đất"
      },
      {
        "id": 41,
        "name": "Ba Đào Trọng Kích",
        "type": "Hải Dương",
        "power": 22,
        "mpCost": 14,
        "accuracy": 95,
        "heal": 0,
        "buffDef": 0,
        "desc": "Cơn sóng cuồn cuộn đập mạnh vào kẻ thù"
      },
      {
        "id": 42,
        "name": "Hải Lãng Nộ Đào",
        "type": "Hải Dương",
        "power": 28,
        "mpCost": 19,
        "accuracy": 95,
        "heal": 0,
        "buffDef": 0,
        "desc": "Sóng biển giận dữ cuốn phăng phòng tuyến địch"
      },
      {
        "id": 43,
        "name": "Hàn Băng Toái Toản",
        "type": "Hải Dương",
        "power": 36,
        "mpCost": 26,
        "accuracy": 95,
        "heal": 0,
        "buffDef": 0,
        "desc": "Những mũi băng nhọn hoắt nghiền nát giáp trụ"
      }
    ]
  },
  {
    "id": 120,
    "code": "liethoa_pet_18",
    "name": "Tà Vân Khuyển Thần",
    "type": "Mãnh Thú",
    "color": "#e74c3c",
    "tier": 3,
    "baseHP": 53,
    "baseMP": 100,
    "baseATK": 26,
    "baseDEF": 20,
    "baseSPD": 21,
    "growth": {
      "hp": 55,
      "mp": 16,
      "atk": 15,
      "def": 10,
      "spd": 11
    },
    "spriteNum": 36,
    "spriteVariant": 0,
    "spriteKey": "npc2_36",
    "sprite": "./img/monsters/npc2_36.png",
    "description": "Chó thần mây quỷ uy nghiêm bảo hộ lãnh địa thần thánh",
    "evolution": [],
    "skills": [
      {
        "id": 31,
        "name": "Cuồng Bạo Xung Chàng",
        "type": "Mãnh Thú",
        "power": 23,
        "mpCost": 14,
        "accuracy": 95,
        "heal": 0,
        "buffDef": 0,
        "desc": "Húc mạnh bạo liệt hất văng đối thủ"
      },
      {
        "id": 32,
        "name": "Viêm Hống Toái Cốt",
        "type": "Mãnh Thú",
        "power": 29,
        "mpCost": 19,
        "accuracy": 95,
        "heal": 0,
        "buffDef": 0,
        "desc": "Tiếng gầm rực lửa làm rúng động và nứt giáp đối thủ"
      },
      {
        "id": 34,
        "name": "Hồng Liên Liệt Hỏa",
        "type": "Mãnh Thú",
        "power": 50,
        "mpCost": 38,
        "accuracy": 95,
        "heal": 0,
        "buffDef": 0,
        "desc": "Hoa sen lửa địa ngục hủy diệt vạn vật"
      },
      {
        "id": 33,
        "name": "Nộ Diễm Liệt Ba",
        "type": "Mãnh Thú",
        "power": 38,
        "mpCost": 27,
        "accuracy": 95,
        "heal": 0,
        "buffDef": 0,
        "desc": "Sóng lửa cuộn trào thiêu đốt toàn bộ vùng xung quanh"
      }
    ]
  },
  {
    "id": 121,
    "code": "liethoa_pet_19",
    "name": "Hồng Nhạn",
    "type": "Phi Hành",
    "color": "#9b59b6",
    "tier": 1,
    "baseHP": 41,
    "baseMP": 90,
    "baseATK": 18,
    "baseDEF": 14,
    "baseSPD": 15,
    "growth": {
      "hp": 45,
      "mp": 16,
      "atk": 11,
      "def": 8,
      "spd": 9
    },
    "spriteNum": 37,
    "spriteVariant": 0,
    "spriteKey": "npc2_37",
    "sprite": "./img/monsters/npc2_37.png",
    "description": "Chim nhạn đỏ rực báo tin xuân và mang đến may mắn",
    "evolution": [],
    "skills": [
      {
        "id": 20,
        "name": "Phong Nhận",
        "type": "Phi Hành",
        "power": 17,
        "mpCost": 10,
        "accuracy": 95,
        "heal": 0,
        "buffDef": 0,
        "desc": "Lưỡi đao gió chém ngọt từ không trung"
      },
      {
        "id": 21,
        "name": "Liệp Dực Trảm",
        "type": "Phi Hành",
        "power": 23,
        "mpCost": 14,
        "accuracy": 95,
        "heal": 0,
        "buffDef": 0,
        "desc": "Sải cánh săn mồi chém rách đối thủ"
      },
      {
        "id": 22,
        "name": "Toàn Phong Xung Kích",
        "type": "Phi Hành",
        "power": 29,
        "mpCost": 19,
        "accuracy": 95,
        "heal": 0,
        "buffDef": 0,
        "desc": "Cuộn trọn theo lốc xoáy đâm sầm vào kẻ địch"
      },
      {
        "id": 26,
        "name": "Lôi Đình Nhất Kích",
        "type": "Phi Hành",
        "power": 38,
        "mpCost": 28,
        "accuracy": 95,
        "heal": 0,
        "buffDef": 0,
        "desc": "Sấm sét cửu thiên giáng thế gây tê liệt"
      }
    ]
  },
  {
    "id": 122,
    "code": "liethoa_pet_20",
    "name": "Quáng Thạch Dực Long",
    "type": "Kim Loại",
    "color": "#f39c12",
    "tier": 3,
    "baseHP": 53,
    "baseMP": 100,
    "baseATK": 26,
    "baseDEF": 20,
    "baseSPD": 21,
    "growth": {
      "hp": 55,
      "mp": 16,
      "atk": 15,
      "def": 10,
      "spd": 11
    },
    "spriteNum": 38,
    "spriteVariant": 0,
    "spriteKey": "npc2_38",
    "sprite": "./img/monsters/npc2_38.png",
    "description": "Dực long bọc quặng thạch cứng hơn kim cương",
    "evolution": [],
    "skills": [
      {
        "id": 11,
        "name": "Cương Thiết Trảm",
        "type": "Kim Loại",
        "power": 22,
        "mpCost": 14,
        "accuracy": 95,
        "heal": 0,
        "buffDef": 0,
        "desc": "Đường kiếm thép sắc lạnh chém đứt giáp trụ"
      },
      {
        "id": 12,
        "name": "Kim Tinh Xung Kích",
        "type": "Kim Loại",
        "power": 28,
        "mpCost": 19,
        "accuracy": 95,
        "heal": 0,
        "buffDef": 0,
        "desc": "Lao thẳng với mũi khoan kim cương cực mạnh"
      },
      {
        "id": 14,
        "name": "Trảm Kim Đoạn Ngọc",
        "type": "Kim Loại",
        "power": 48,
        "mpCost": 36,
        "accuracy": 95,
        "heal": 0,
        "buffDef": 0,
        "desc": "Tuyệt kỹ kim loại chém sắt gãy ngọc vô song"
      },
      {
        "id": 19,
        "name": "Cương Cân Thiết Cốt",
        "type": "Phòng Ngự",
        "power": 0,
        "mpCost": 14,
        "accuracy": 100,
        "heal": 0,
        "buffDef": 45,
        "desc": "Biến cơ thể thành khối kim cương siêu cứng"
      }
    ]
  },
  {
    "id": 123,
    "code": "lienthu_pet_1_1",
    "name": "Thủy Long Tử",
    "type": "Hải Dương",
    "color": "#2980b9",
    "tier": 1,
    "baseHP": 43,
    "baseMP": 96,
    "baseATK": 19,
    "baseDEF": 15,
    "baseSPD": 16,
    "growth": {
      "hp": 48,
      "mp": 18,
      "atk": 12,
      "def": 9,
      "spd": 10
    },
    "spriteNum": 15,
    "spriteVariant": 0,
    "spriteKey": "npc2_15",
    "sprite": "./img/monsters/npc2_15.png",
    "description": "Chuỗi tiến hóa Long Tộc Hải Dương thần thoại thống trị muôn trùng sóng biển (Giai đoạn 1/3).",
    "evolution": [
      124
    ],
    "skills": [
      {
        "id": 40,
        "name": "Thủy Trụ",
        "type": "Hải Dương",
        "power": 15,
        "mpCost": 10,
        "accuracy": 95,
        "heal": 0,
        "buffDef": 0,
        "desc": "Cột nước áp lực cao bắn thẳng từ mặt đất"
      },
      {
        "id": 41,
        "name": "Ba Đào Trọng Kích",
        "type": "Hải Dương",
        "power": 22,
        "mpCost": 14,
        "accuracy": 95,
        "heal": 0,
        "buffDef": 0,
        "desc": "Cơn sóng cuồn cuộn đập mạnh vào kẻ thù"
      },
      {
        "id": 42,
        "name": "Hải Lãng Nộ Đào",
        "type": "Hải Dương",
        "power": 28,
        "mpCost": 19,
        "accuracy": 95,
        "heal": 0,
        "buffDef": 0,
        "desc": "Sóng biển giận dữ cuốn phăng phòng tuyến địch"
      },
      {
        "id": 46,
        "name": "Bạo Phong Tuyết",
        "type": "Hải Dương",
        "power": 36,
        "mpCost": 26,
        "accuracy": 95,
        "heal": 0,
        "buffDef": 0,
        "desc": "Bão tuyết hàn băng đóng băng cả bầu trời"
      }
    ]
  },
  {
    "id": 124,
    "code": "lienthu_pet_1_2",
    "name": "Huyễn Thủy Long",
    "type": "Hải Dương",
    "color": "#2980b9",
    "tier": 2,
    "baseHP": 50,
    "baseMP": 102,
    "baseATK": 23,
    "baseDEF": 18,
    "baseSPD": 19,
    "growth": {
      "hp": 54,
      "mp": 18,
      "atk": 14,
      "def": 10,
      "spd": 11
    },
    "spriteNum": 16,
    "spriteVariant": 0,
    "spriteKey": "npc2_16",
    "sprite": "./img/monsters/npc2_16.png",
    "description": "Chuỗi tiến hóa Long Tộc Hải Dương thần thoại thống trị muôn trùng sóng biển (Giai đoạn 2/3).",
    "evolution": [
      125
    ],
    "skills": [
      {
        "id": 40,
        "name": "Thủy Trụ",
        "type": "Hải Dương",
        "power": 15,
        "mpCost": 10,
        "accuracy": 95,
        "heal": 0,
        "buffDef": 0,
        "desc": "Cột nước áp lực cao bắn thẳng từ mặt đất"
      },
      {
        "id": 41,
        "name": "Ba Đào Trọng Kích",
        "type": "Hải Dương",
        "power": 22,
        "mpCost": 14,
        "accuracy": 95,
        "heal": 0,
        "buffDef": 0,
        "desc": "Cơn sóng cuồn cuộn đập mạnh vào kẻ thù"
      },
      {
        "id": 42,
        "name": "Hải Lãng Nộ Đào",
        "type": "Hải Dương",
        "power": 28,
        "mpCost": 19,
        "accuracy": 95,
        "heal": 0,
        "buffDef": 0,
        "desc": "Sóng biển giận dữ cuốn phăng phòng tuyến địch"
      },
      {
        "id": 43,
        "name": "Hàn Băng Toái Toản",
        "type": "Hải Dương",
        "power": 36,
        "mpCost": 26,
        "accuracy": 95,
        "heal": 0,
        "buffDef": 0,
        "desc": "Những mũi băng nhọn hoắt nghiền nát giáp trụ"
      }
    ]
  },
  {
    "id": 125,
    "code": "lienthu_pet_1_3",
    "name": "Thánh Thiên Long",
    "type": "Hải Dương",
    "color": "#2980b9",
    "tier": 3,
    "baseHP": 57,
    "baseMP": 108,
    "baseATK": 27,
    "baseDEF": 21,
    "baseSPD": 22,
    "growth": {
      "hp": 60,
      "mp": 18,
      "atk": 16,
      "def": 11,
      "spd": 12
    },
    "spriteNum": 17,
    "spriteVariant": 0,
    "spriteKey": "npc2_17",
    "sprite": "./img/monsters/npc2_17.png",
    "description": "Chuỗi tiến hóa Long Tộc Hải Dương thần thoại thống trị muôn trùng sóng biển (Giai đoạn 3/3).",
    "evolution": [],
    "skills": [
      {
        "id": 41,
        "name": "Ba Đào Trọng Kích",
        "type": "Hải Dương",
        "power": 22,
        "mpCost": 14,
        "accuracy": 95,
        "heal": 0,
        "buffDef": 0,
        "desc": "Cơn sóng cuồn cuộn đập mạnh vào kẻ thù"
      },
      {
        "id": 42,
        "name": "Hải Lãng Nộ Đào",
        "type": "Hải Dương",
        "power": 28,
        "mpCost": 19,
        "accuracy": 95,
        "heal": 0,
        "buffDef": 0,
        "desc": "Sóng biển giận dữ cuốn phăng phòng tuyến địch"
      },
      {
        "id": 44,
        "name": "Hải Tiêu Nộ Lãng",
        "type": "Hải Dương",
        "power": 48,
        "mpCost": 36,
        "accuracy": 95,
        "heal": 0,
        "buffDef": 0,
        "desc": "Đại hồng thủy đại dương nuốt chửng đối thủ"
      },
      {
        "id": 48,
        "name": "Thuật Cầu Nguyện",
        "type": "Hồi Phục",
        "power": 0,
        "mpCost": 16,
        "accuracy": 100,
        "heal": 45,
        "buffDef": 0,
        "desc": "Làn nước mát lành chữa lành 45% sinh lực"
      }
    ]
  },
  {
    "id": 126,
    "code": "lienthu_pet_2_1",
    "name": "Lục Lâm Long Tử",
    "type": "Phi Hành",
    "color": "#9b59b6",
    "tier": 1,
    "baseHP": 43,
    "baseMP": 96,
    "baseATK": 19,
    "baseDEF": 15,
    "baseSPD": 16,
    "growth": {
      "hp": 48,
      "mp": 18,
      "atk": 12,
      "def": 9,
      "spd": 10
    },
    "spriteNum": 19,
    "spriteVariant": 0,
    "spriteKey": "npc2_19",
    "sprite": "./img/monsters/npc2_19.png",
    "description": "Chuỗi tiến hóa Long Tộc Phi Hành chúa tể bầu trời và gió lốc (Giai đoạn 1/3).",
    "evolution": [
      127
    ],
    "skills": [
      {
        "id": 20,
        "name": "Phong Nhận",
        "type": "Phi Hành",
        "power": 17,
        "mpCost": 10,
        "accuracy": 95,
        "heal": 0,
        "buffDef": 0,
        "desc": "Lưỡi đao gió chém ngọt từ không trung"
      },
      {
        "id": 21,
        "name": "Liệp Dực Trảm",
        "type": "Phi Hành",
        "power": 23,
        "mpCost": 14,
        "accuracy": 95,
        "heal": 0,
        "buffDef": 0,
        "desc": "Sải cánh săn mồi chém rách đối thủ"
      },
      {
        "id": 22,
        "name": "Toàn Phong Xung Kích",
        "type": "Phi Hành",
        "power": 29,
        "mpCost": 19,
        "accuracy": 95,
        "heal": 0,
        "buffDef": 0,
        "desc": "Cuộn trọn theo lốc xoáy đâm sầm vào kẻ địch"
      },
      {
        "id": 26,
        "name": "Lôi Đình Nhất Kích",
        "type": "Phi Hành",
        "power": 38,
        "mpCost": 28,
        "accuracy": 95,
        "heal": 0,
        "buffDef": 0,
        "desc": "Sấm sét cửu thiên giáng thế gây tê liệt"
      }
    ]
  },
  {
    "id": 127,
    "code": "lienthu_pet_2_2",
    "name": "Phong Linh Long",
    "type": "Phi Hành",
    "color": "#9b59b6",
    "tier": 2,
    "baseHP": 50,
    "baseMP": 102,
    "baseATK": 23,
    "baseDEF": 18,
    "baseSPD": 19,
    "growth": {
      "hp": 54,
      "mp": 18,
      "atk": 14,
      "def": 10,
      "spd": 11
    },
    "spriteNum": 20,
    "spriteVariant": 0,
    "spriteKey": "npc2_20",
    "sprite": "./img/monsters/npc2_20.png",
    "description": "Chuỗi tiến hóa Long Tộc Phi Hành chúa tể bầu trời và gió lốc (Giai đoạn 2/3).",
    "evolution": [
      128
    ],
    "skills": [
      {
        "id": 20,
        "name": "Phong Nhận",
        "type": "Phi Hành",
        "power": 17,
        "mpCost": 10,
        "accuracy": 95,
        "heal": 0,
        "buffDef": 0,
        "desc": "Lưỡi đao gió chém ngọt từ không trung"
      },
      {
        "id": 21,
        "name": "Liệp Dực Trảm",
        "type": "Phi Hành",
        "power": 23,
        "mpCost": 14,
        "accuracy": 95,
        "heal": 0,
        "buffDef": 0,
        "desc": "Sải cánh săn mồi chém rách đối thủ"
      },
      {
        "id": 22,
        "name": "Toàn Phong Xung Kích",
        "type": "Phi Hành",
        "power": 29,
        "mpCost": 19,
        "accuracy": 95,
        "heal": 0,
        "buffDef": 0,
        "desc": "Cuộn trọn theo lốc xoáy đâm sầm vào kẻ địch"
      },
      {
        "id": 23,
        "name": "Vũ Dực Cuồng Phong",
        "type": "Phi Hành",
        "power": 37,
        "mpCost": 26,
        "accuracy": 95,
        "heal": 0,
        "buffDef": 0,
        "desc": "Đập cánh tạo siêu bão càn quét trận đấu"
      }
    ]
  },
  {
    "id": 128,
    "code": "lienthu_pet_2_3",
    "name": "Tật Phong Hoá Long",
    "type": "Phi Hành",
    "color": "#9b59b6",
    "tier": 3,
    "baseHP": 57,
    "baseMP": 108,
    "baseATK": 27,
    "baseDEF": 21,
    "baseSPD": 22,
    "growth": {
      "hp": 60,
      "mp": 18,
      "atk": 16,
      "def": 11,
      "spd": 12
    },
    "spriteNum": 21,
    "spriteVariant": 0,
    "spriteKey": "npc2_21",
    "sprite": "./img/monsters/npc2_21.png",
    "description": "Chuỗi tiến hóa Long Tộc Phi Hành chúa tể bầu trời và gió lốc (Giai đoạn 3/3).",
    "evolution": [],
    "skills": [
      {
        "id": 21,
        "name": "Liệp Dực Trảm",
        "type": "Phi Hành",
        "power": 23,
        "mpCost": 14,
        "accuracy": 95,
        "heal": 0,
        "buffDef": 0,
        "desc": "Sải cánh săn mồi chém rách đối thủ"
      },
      {
        "id": 22,
        "name": "Toàn Phong Xung Kích",
        "type": "Phi Hành",
        "power": 29,
        "mpCost": 19,
        "accuracy": 95,
        "heal": 0,
        "buffDef": 0,
        "desc": "Cuộn trọn theo lốc xoáy đâm sầm vào kẻ địch"
      },
      {
        "id": 24,
        "name": "Thần Phong Liệt Không",
        "type": "Phi Hành",
        "power": 48,
        "mpCost": 36,
        "accuracy": 95,
        "heal": 0,
        "buffDef": 0,
        "desc": "Cơn bão thần thánh xé toạc không gian"
      },
      {
        "id": 23,
        "name": "Vũ Dực Cuồng Phong",
        "type": "Phi Hành",
        "power": 37,
        "mpCost": 26,
        "accuracy": 95,
        "heal": 0,
        "buffDef": 0,
        "desc": "Đập cánh tạo siêu bão càn quét trận đấu"
      }
    ]
  },
  {
    "id": 129,
    "code": "lienthu_pet_3_1",
    "name": "Quỷ Long Tử",
    "type": "Mãnh Thú",
    "color": "#e74c3c",
    "tier": 1,
    "baseHP": 43,
    "baseMP": 96,
    "baseATK": 19,
    "baseDEF": 15,
    "baseSPD": 16,
    "growth": {
      "hp": 48,
      "mp": 18,
      "atk": 12,
      "def": 9,
      "spd": 10
    },
    "spriteNum": 23,
    "spriteVariant": 0,
    "spriteKey": "npc2_23",
    "sprite": "./img/monsters/npc2_23.png",
    "description": "Chuỗi tiến hóa Long Tộc Hắc Ám sở hữu ngọn lửa tà linh diệt thế (Giai đoạn 1/3).",
    "evolution": [
      130
    ],
    "skills": [
      {
        "id": 30,
        "name": "Liệt Trảo",
        "type": "Mãnh Thú",
        "power": 17,
        "mpCost": 10,
        "accuracy": 95,
        "heal": 0,
        "buffDef": 0,
        "desc": "Móng vuốt rực lửa cào xé dữ dội"
      },
      {
        "id": 31,
        "name": "Cuồng Bạo Xung Chàng",
        "type": "Mãnh Thú",
        "power": 23,
        "mpCost": 14,
        "accuracy": 95,
        "heal": 0,
        "buffDef": 0,
        "desc": "Húc mạnh bạo liệt hất văng đối thủ"
      },
      {
        "id": 32,
        "name": "Viêm Hống Toái Cốt",
        "type": "Mãnh Thú",
        "power": 29,
        "mpCost": 19,
        "accuracy": 95,
        "heal": 0,
        "buffDef": 0,
        "desc": "Tiếng gầm rực lửa làm rúng động và nứt giáp đối thủ"
      },
      {
        "id": 36,
        "name": "Diễm Kích",
        "type": "Mãnh Thú",
        "power": 26,
        "mpCost": 17,
        "accuracy": 95,
        "heal": 0,
        "buffDef": 0,
        "desc": "Phóng đạn lửa nổ tung khi va chạm"
      }
    ]
  },
  {
    "id": 130,
    "code": "lienthu_pet_3_2",
    "name": "Huyễn Ma Kiêu",
    "type": "Mãnh Thú",
    "color": "#e74c3c",
    "tier": 2,
    "baseHP": 50,
    "baseMP": 102,
    "baseATK": 23,
    "baseDEF": 18,
    "baseSPD": 19,
    "growth": {
      "hp": 54,
      "mp": 18,
      "atk": 14,
      "def": 10,
      "spd": 11
    },
    "spriteNum": 24,
    "spriteVariant": 0,
    "spriteKey": "npc2_24",
    "sprite": "./img/monsters/npc2_24.png",
    "description": "Chuỗi tiến hóa Long Tộc Hắc Ám sở hữu ngọn lửa tà linh diệt thế (Giai đoạn 2/3).",
    "evolution": [
      131
    ],
    "skills": [
      {
        "id": 30,
        "name": "Liệt Trảo",
        "type": "Mãnh Thú",
        "power": 17,
        "mpCost": 10,
        "accuracy": 95,
        "heal": 0,
        "buffDef": 0,
        "desc": "Móng vuốt rực lửa cào xé dữ dội"
      },
      {
        "id": 31,
        "name": "Cuồng Bạo Xung Chàng",
        "type": "Mãnh Thú",
        "power": 23,
        "mpCost": 14,
        "accuracy": 95,
        "heal": 0,
        "buffDef": 0,
        "desc": "Húc mạnh bạo liệt hất văng đối thủ"
      },
      {
        "id": 32,
        "name": "Viêm Hống Toái Cốt",
        "type": "Mãnh Thú",
        "power": 29,
        "mpCost": 19,
        "accuracy": 95,
        "heal": 0,
        "buffDef": 0,
        "desc": "Tiếng gầm rực lửa làm rúng động và nứt giáp đối thủ"
      },
      {
        "id": 33,
        "name": "Nộ Diễm Liệt Ba",
        "type": "Mãnh Thú",
        "power": 38,
        "mpCost": 27,
        "accuracy": 95,
        "heal": 0,
        "buffDef": 0,
        "desc": "Sóng lửa cuộn trào thiêu đốt toàn bộ vùng xung quanh"
      }
    ]
  },
  {
    "id": 131,
    "code": "lienthu_pet_3_3",
    "name": "Huyễn Ma Đường",
    "type": "Mãnh Thú",
    "color": "#e74c3c",
    "tier": 3,
    "baseHP": 57,
    "baseMP": 108,
    "baseATK": 27,
    "baseDEF": 21,
    "baseSPD": 22,
    "growth": {
      "hp": 60,
      "mp": 18,
      "atk": 16,
      "def": 11,
      "spd": 12
    },
    "spriteNum": 25,
    "spriteVariant": 0,
    "spriteKey": "npc2_25",
    "sprite": "./img/monsters/npc2_25.png",
    "description": "Chuỗi tiến hóa Long Tộc Hắc Ám sở hữu ngọn lửa tà linh diệt thế (Giai đoạn 3/3).",
    "evolution": [],
    "skills": [
      {
        "id": 31,
        "name": "Cuồng Bạo Xung Chàng",
        "type": "Mãnh Thú",
        "power": 23,
        "mpCost": 14,
        "accuracy": 95,
        "heal": 0,
        "buffDef": 0,
        "desc": "Húc mạnh bạo liệt hất văng đối thủ"
      },
      {
        "id": 32,
        "name": "Viêm Hống Toái Cốt",
        "type": "Mãnh Thú",
        "power": 29,
        "mpCost": 19,
        "accuracy": 95,
        "heal": 0,
        "buffDef": 0,
        "desc": "Tiếng gầm rực lửa làm rúng động và nứt giáp đối thủ"
      },
      {
        "id": 34,
        "name": "Hồng Liên Liệt Hỏa",
        "type": "Mãnh Thú",
        "power": 50,
        "mpCost": 38,
        "accuracy": 95,
        "heal": 0,
        "buffDef": 0,
        "desc": "Hoa sen lửa địa ngục hủy diệt vạn vật"
      },
      {
        "id": 33,
        "name": "Nộ Diễm Liệt Ba",
        "type": "Mãnh Thú",
        "power": 38,
        "mpCost": 27,
        "accuracy": 95,
        "heal": 0,
        "buffDef": 0,
        "desc": "Sóng lửa cuộn trào thiêu đốt toàn bộ vùng xung quanh"
      }
    ]
  },
  {
    "id": 132,
    "code": "lienthu_pet_4_1",
    "name": "Sa Long Tử",
    "type": "Kim Loại",
    "color": "#f39c12",
    "tier": 1,
    "baseHP": 43,
    "baseMP": 96,
    "baseATK": 19,
    "baseDEF": 15,
    "baseSPD": 16,
    "growth": {
      "hp": 48,
      "mp": 18,
      "atk": 12,
      "def": 9,
      "spd": 10
    },
    "spriteNum": 27,
    "spriteVariant": 0,
    "spriteKey": "npc2_27",
    "sprite": "./img/monsters/npc2_27.png",
    "description": "Chuỗi tiến hóa Địa Long Kim Loại đục sâu lòng đất bảo vệ khoáng mạch (Giai đoạn 1/3).",
    "evolution": [
      133
    ],
    "skills": [
      {
        "id": 10,
        "name": "Thiết Quyền",
        "type": "Kim Loại",
        "power": 16,
        "mpCost": 10,
        "accuracy": 95,
        "heal": 0,
        "buffDef": 0,
        "desc": "Nắm đấm kim loại nặng nề nện thẳng mục tiêu"
      },
      {
        "id": 11,
        "name": "Cương Thiết Trảm",
        "type": "Kim Loại",
        "power": 22,
        "mpCost": 14,
        "accuracy": 95,
        "heal": 0,
        "buffDef": 0,
        "desc": "Đường kiếm thép sắc lạnh chém đứt giáp trụ"
      },
      {
        "id": 12,
        "name": "Kim Tinh Xung Kích",
        "type": "Kim Loại",
        "power": 28,
        "mpCost": 19,
        "accuracy": 95,
        "heal": 0,
        "buffDef": 0,
        "desc": "Lao thẳng với mũi khoan kim cương cực mạnh"
      },
      {
        "id": 16,
        "name": "Bão Cát",
        "type": "Kim Loại",
        "power": 24,
        "mpCost": 16,
        "accuracy": 90,
        "heal": 0,
        "buffDef": 0,
        "desc": "Cơn bão bụi cát cuốn xé và giảm tầm nhìn địch"
      }
    ]
  },
  {
    "id": 133,
    "code": "lienthu_pet_4_2",
    "name": "Toản Địa Long",
    "type": "Kim Loại",
    "color": "#f39c12",
    "tier": 2,
    "baseHP": 50,
    "baseMP": 102,
    "baseATK": 23,
    "baseDEF": 18,
    "baseSPD": 19,
    "growth": {
      "hp": 54,
      "mp": 18,
      "atk": 14,
      "def": 10,
      "spd": 11
    },
    "spriteNum": 28,
    "spriteVariant": 0,
    "spriteKey": "npc2_28",
    "sprite": "./img/monsters/npc2_28.png",
    "description": "Chuỗi tiến hóa Địa Long Kim Loại đục sâu lòng đất bảo vệ khoáng mạch (Giai đoạn 2/3).",
    "evolution": [
      134
    ],
    "skills": [
      {
        "id": 10,
        "name": "Thiết Quyền",
        "type": "Kim Loại",
        "power": 16,
        "mpCost": 10,
        "accuracy": 95,
        "heal": 0,
        "buffDef": 0,
        "desc": "Nắm đấm kim loại nặng nề nện thẳng mục tiêu"
      },
      {
        "id": 11,
        "name": "Cương Thiết Trảm",
        "type": "Kim Loại",
        "power": 22,
        "mpCost": 14,
        "accuracy": 95,
        "heal": 0,
        "buffDef": 0,
        "desc": "Đường kiếm thép sắc lạnh chém đứt giáp trụ"
      },
      {
        "id": 12,
        "name": "Kim Tinh Xung Kích",
        "type": "Kim Loại",
        "power": 28,
        "mpCost": 19,
        "accuracy": 95,
        "heal": 0,
        "buffDef": 0,
        "desc": "Lao thẳng với mũi khoan kim cương cực mạnh"
      },
      {
        "id": 13,
        "name": "Bạo Liệt Thiết Toản",
        "type": "Kim Loại",
        "power": 36,
        "mpCost": 26,
        "accuracy": 95,
        "heal": 0,
        "buffDef": 0,
        "desc": "Mũi khoan thép bạo nổ gây chấn thương diện rộng"
      }
    ]
  },
  {
    "id": 134,
    "code": "lienthu_pet_4_3",
    "name": "Hậu Thổ Long Vương",
    "type": "Kim Loại",
    "color": "#f39c12",
    "tier": 3,
    "baseHP": 57,
    "baseMP": 108,
    "baseATK": 27,
    "baseDEF": 21,
    "baseSPD": 22,
    "growth": {
      "hp": 60,
      "mp": 18,
      "atk": 16,
      "def": 11,
      "spd": 12
    },
    "spriteNum": 29,
    "spriteVariant": 0,
    "spriteKey": "npc2_29",
    "sprite": "./img/monsters/npc2_29.png",
    "description": "Chuỗi tiến hóa Địa Long Kim Loại đục sâu lòng đất bảo vệ khoáng mạch (Giai đoạn 3/3).",
    "evolution": [],
    "skills": [
      {
        "id": 11,
        "name": "Cương Thiết Trảm",
        "type": "Kim Loại",
        "power": 22,
        "mpCost": 14,
        "accuracy": 95,
        "heal": 0,
        "buffDef": 0,
        "desc": "Đường kiếm thép sắc lạnh chém đứt giáp trụ"
      },
      {
        "id": 12,
        "name": "Kim Tinh Xung Kích",
        "type": "Kim Loại",
        "power": 28,
        "mpCost": 19,
        "accuracy": 95,
        "heal": 0,
        "buffDef": 0,
        "desc": "Lao thẳng với mũi khoan kim cương cực mạnh"
      },
      {
        "id": 14,
        "name": "Trảm Kim Đoạn Ngọc",
        "type": "Kim Loại",
        "power": 48,
        "mpCost": 36,
        "accuracy": 95,
        "heal": 0,
        "buffDef": 0,
        "desc": "Tuyệt kỹ kim loại chém sắt gãy ngọc vô song"
      },
      {
        "id": 19,
        "name": "Cương Cân Thiết Cốt",
        "type": "Phòng Ngự",
        "power": 0,
        "mpCost": 14,
        "accuracy": 100,
        "heal": 0,
        "buffDef": 45,
        "desc": "Biến cơ thể thành khối kim cương siêu cứng"
      }
    ]
  },
  {
    "id": 135,
    "code": "lienthu_pet_5_1",
    "name": "Hoàng Đế Ấu Thú",
    "type": "Kim Loại",
    "color": "#f39c12",
    "tier": 1,
    "baseHP": 43,
    "baseMP": 96,
    "baseATK": 19,
    "baseDEF": 15,
    "baseSPD": 16,
    "growth": {
      "hp": 48,
      "mp": 18,
      "atk": 12,
      "def": 9,
      "spd": 10
    },
    "spriteNum": 31,
    "spriteVariant": 0,
    "spriteKey": "npc2_31",
    "sprite": "./img/monsters/npc2_31.png",
    "description": "Chuỗi tiến hóa Hoàng Đế Tộc bọc chiến giáp hoàng kim uy phong lẫm liệt (Giai đoạn 1/3).",
    "evolution": [
      136
    ],
    "skills": [
      {
        "id": 10,
        "name": "Thiết Quyền",
        "type": "Kim Loại",
        "power": 16,
        "mpCost": 10,
        "accuracy": 95,
        "heal": 0,
        "buffDef": 0,
        "desc": "Nắm đấm kim loại nặng nề nện thẳng mục tiêu"
      },
      {
        "id": 11,
        "name": "Cương Thiết Trảm",
        "type": "Kim Loại",
        "power": 22,
        "mpCost": 14,
        "accuracy": 95,
        "heal": 0,
        "buffDef": 0,
        "desc": "Đường kiếm thép sắc lạnh chém đứt giáp trụ"
      },
      {
        "id": 12,
        "name": "Kim Tinh Xung Kích",
        "type": "Kim Loại",
        "power": 28,
        "mpCost": 19,
        "accuracy": 95,
        "heal": 0,
        "buffDef": 0,
        "desc": "Lao thẳng với mũi khoan kim cương cực mạnh"
      },
      {
        "id": 16,
        "name": "Bão Cát",
        "type": "Kim Loại",
        "power": 24,
        "mpCost": 16,
        "accuracy": 90,
        "heal": 0,
        "buffDef": 0,
        "desc": "Cơn bão bụi cát cuốn xé và giảm tầm nhìn địch"
      }
    ]
  },
  {
    "id": 136,
    "code": "lienthu_pet_5_2",
    "name": "Hoàng Đế Giáp Thú",
    "type": "Kim Loại",
    "color": "#f39c12",
    "tier": 2,
    "baseHP": 50,
    "baseMP": 102,
    "baseATK": 23,
    "baseDEF": 18,
    "baseSPD": 19,
    "growth": {
      "hp": 54,
      "mp": 18,
      "atk": 14,
      "def": 10,
      "spd": 11
    },
    "spriteNum": 32,
    "spriteVariant": 0,
    "spriteKey": "npc2_32",
    "sprite": "./img/monsters/npc2_32.png",
    "description": "Chuỗi tiến hóa Hoàng Đế Tộc bọc chiến giáp hoàng kim uy phong lẫm liệt (Giai đoạn 2/3).",
    "evolution": [
      137
    ],
    "skills": [
      {
        "id": 10,
        "name": "Thiết Quyền",
        "type": "Kim Loại",
        "power": 16,
        "mpCost": 10,
        "accuracy": 95,
        "heal": 0,
        "buffDef": 0,
        "desc": "Nắm đấm kim loại nặng nề nện thẳng mục tiêu"
      },
      {
        "id": 11,
        "name": "Cương Thiết Trảm",
        "type": "Kim Loại",
        "power": 22,
        "mpCost": 14,
        "accuracy": 95,
        "heal": 0,
        "buffDef": 0,
        "desc": "Đường kiếm thép sắc lạnh chém đứt giáp trụ"
      },
      {
        "id": 12,
        "name": "Kim Tinh Xung Kích",
        "type": "Kim Loại",
        "power": 28,
        "mpCost": 19,
        "accuracy": 95,
        "heal": 0,
        "buffDef": 0,
        "desc": "Lao thẳng với mũi khoan kim cương cực mạnh"
      },
      {
        "id": 13,
        "name": "Bạo Liệt Thiết Toản",
        "type": "Kim Loại",
        "power": 36,
        "mpCost": 26,
        "accuracy": 95,
        "heal": 0,
        "buffDef": 0,
        "desc": "Mũi khoan thép bạo nổ gây chấn thương diện rộng"
      }
    ]
  },
  {
    "id": 137,
    "code": "lienthu_pet_5_3",
    "name": "Hoàng Đế Dực Thú",
    "type": "Kim Loại",
    "color": "#f39c12",
    "tier": 3,
    "baseHP": 57,
    "baseMP": 108,
    "baseATK": 27,
    "baseDEF": 21,
    "baseSPD": 22,
    "growth": {
      "hp": 60,
      "mp": 18,
      "atk": 16,
      "def": 11,
      "spd": 12
    },
    "spriteNum": 33,
    "spriteVariant": 0,
    "spriteKey": "npc2_33",
    "sprite": "./img/monsters/npc2_33.png",
    "description": "Chuỗi tiến hóa Hoàng Đế Tộc bọc chiến giáp hoàng kim uy phong lẫm liệt (Giai đoạn 3/3).",
    "evolution": [],
    "skills": [
      {
        "id": 11,
        "name": "Cương Thiết Trảm",
        "type": "Kim Loại",
        "power": 22,
        "mpCost": 14,
        "accuracy": 95,
        "heal": 0,
        "buffDef": 0,
        "desc": "Đường kiếm thép sắc lạnh chém đứt giáp trụ"
      },
      {
        "id": 12,
        "name": "Kim Tinh Xung Kích",
        "type": "Kim Loại",
        "power": 28,
        "mpCost": 19,
        "accuracy": 95,
        "heal": 0,
        "buffDef": 0,
        "desc": "Lao thẳng với mũi khoan kim cương cực mạnh"
      },
      {
        "id": 14,
        "name": "Trảm Kim Đoạn Ngọc",
        "type": "Kim Loại",
        "power": 48,
        "mpCost": 36,
        "accuracy": 95,
        "heal": 0,
        "buffDef": 0,
        "desc": "Tuyệt kỹ kim loại chém sắt gãy ngọc vô song"
      },
      {
        "id": 19,
        "name": "Cương Cân Thiết Cốt",
        "type": "Phòng Ngự",
        "power": 0,
        "mpCost": 14,
        "accuracy": 100,
        "heal": 0,
        "buffDef": 45,
        "desc": "Biến cơ thể thành khối kim cương siêu cứng"
      }
    ]
  },
  {
    "id": 138,
    "code": "mythical_pet_1",
    "name": "Chu Tước",
    "type": "Phi Hành",
    "color": "#9b59b6",
    "tier": 3,
    "baseHP": 60,
    "baseMP": 118,
    "baseATK": 30,
    "baseDEF": 23,
    "baseSPD": 25,
    "growth": {
      "hp": 64,
      "mp": 20,
      "atk": 18,
      "def": 12,
      "spd": 14
    },
    "spriteNum": 1,
    "spriteVariant": 0,
    "spriteKey": "npc2_1",
    "sprite": "./img/monsters/npc2_1.png",
    "description": "Thần thú Chu Tước trong Tứ Tượng cai quản ngọn lửa phương Nam",
    "evolution": [],
    "skills": [
      {
        "id": 21,
        "name": "Liệp Dực Trảm",
        "type": "Phi Hành",
        "power": 23,
        "mpCost": 14,
        "accuracy": 95,
        "heal": 0,
        "buffDef": 0,
        "desc": "Sải cánh săn mồi chém rách đối thủ"
      },
      {
        "id": 22,
        "name": "Toàn Phong Xung Kích",
        "type": "Phi Hành",
        "power": 29,
        "mpCost": 19,
        "accuracy": 95,
        "heal": 0,
        "buffDef": 0,
        "desc": "Cuộn trọn theo lốc xoáy đâm sầm vào kẻ địch"
      },
      {
        "id": 24,
        "name": "Thần Phong Liệt Không",
        "type": "Phi Hành",
        "power": 48,
        "mpCost": 36,
        "accuracy": 95,
        "heal": 0,
        "buffDef": 0,
        "desc": "Cơn bão thần thánh xé toạc không gian"
      },
      {
        "id": 23,
        "name": "Vũ Dực Cuồng Phong",
        "type": "Phi Hành",
        "power": 37,
        "mpCost": 26,
        "accuracy": 95,
        "heal": 0,
        "buffDef": 0,
        "desc": "Đập cánh tạo siêu bão càn quét trận đấu"
      }
    ]
  },
  {
    "id": 139,
    "code": "mythical_pet_2",
    "name": "Nghịch Chu Tước",
    "type": "Mãnh Thú",
    "color": "#e74c3c",
    "tier": 3,
    "baseHP": 60,
    "baseMP": 118,
    "baseATK": 30,
    "baseDEF": 23,
    "baseSPD": 25,
    "growth": {
      "hp": 64,
      "mp": 20,
      "atk": 18,
      "def": 12,
      "spd": 14
    },
    "spriteNum": 2,
    "spriteVariant": 0,
    "spriteKey": "npc2_2",
    "sprite": "./img/monsters/npc2_2.png",
    "description": "Dị bản hắc ám của Chu Tước bộc phát cuồng nộ diệt thế",
    "evolution": [],
    "skills": [
      {
        "id": 31,
        "name": "Cuồng Bạo Xung Chàng",
        "type": "Mãnh Thú",
        "power": 23,
        "mpCost": 14,
        "accuracy": 95,
        "heal": 0,
        "buffDef": 0,
        "desc": "Húc mạnh bạo liệt hất văng đối thủ"
      },
      {
        "id": 32,
        "name": "Viêm Hống Toái Cốt",
        "type": "Mãnh Thú",
        "power": 29,
        "mpCost": 19,
        "accuracy": 95,
        "heal": 0,
        "buffDef": 0,
        "desc": "Tiếng gầm rực lửa làm rúng động và nứt giáp đối thủ"
      },
      {
        "id": 34,
        "name": "Hồng Liên Liệt Hỏa",
        "type": "Mãnh Thú",
        "power": 50,
        "mpCost": 38,
        "accuracy": 95,
        "heal": 0,
        "buffDef": 0,
        "desc": "Hoa sen lửa địa ngục hủy diệt vạn vật"
      },
      {
        "id": 33,
        "name": "Nộ Diễm Liệt Ba",
        "type": "Mãnh Thú",
        "power": 38,
        "mpCost": 27,
        "accuracy": 95,
        "heal": 0,
        "buffDef": 0,
        "desc": "Sóng lửa cuộn trào thiêu đốt toàn bộ vùng xung quanh"
      }
    ]
  },
  {
    "id": 140,
    "code": "mythical_pet_3",
    "name": "Huyễn Vũ",
    "type": "Phi Hành",
    "color": "#9b59b6",
    "tier": 3,
    "baseHP": 60,
    "baseMP": 118,
    "baseATK": 30,
    "baseDEF": 23,
    "baseSPD": 25,
    "growth": {
      "hp": 64,
      "mp": 20,
      "atk": 18,
      "def": 12,
      "spd": 14
    },
    "spriteNum": 3,
    "spriteVariant": 0,
    "spriteKey": "npc2_3",
    "sprite": "./img/monsters/npc2_3.png",
    "description": "Linh điểu huyền ảo mang đôi cánh cầu vồng lộng lẫy",
    "evolution": [],
    "skills": [
      {
        "id": 21,
        "name": "Liệp Dực Trảm",
        "type": "Phi Hành",
        "power": 23,
        "mpCost": 14,
        "accuracy": 95,
        "heal": 0,
        "buffDef": 0,
        "desc": "Sải cánh săn mồi chém rách đối thủ"
      },
      {
        "id": 22,
        "name": "Toàn Phong Xung Kích",
        "type": "Phi Hành",
        "power": 29,
        "mpCost": 19,
        "accuracy": 95,
        "heal": 0,
        "buffDef": 0,
        "desc": "Cuộn trọn theo lốc xoáy đâm sầm vào kẻ địch"
      },
      {
        "id": 24,
        "name": "Thần Phong Liệt Không",
        "type": "Phi Hành",
        "power": 48,
        "mpCost": 36,
        "accuracy": 95,
        "heal": 0,
        "buffDef": 0,
        "desc": "Cơn bão thần thánh xé toạc không gian"
      },
      {
        "id": 23,
        "name": "Vũ Dực Cuồng Phong",
        "type": "Phi Hành",
        "power": 37,
        "mpCost": 26,
        "accuracy": 95,
        "heal": 0,
        "buffDef": 0,
        "desc": "Đập cánh tạo siêu bão càn quét trận đấu"
      }
    ]
  },
  {
    "id": 141,
    "code": "mythical_pet_4",
    "name": "Mộc Tu Long",
    "type": "Thực Vật",
    "color": "#27ae60",
    "tier": 2,
    "baseHP": 54,
    "baseMP": 112,
    "baseATK": 26,
    "baseDEF": 20,
    "baseSPD": 22,
    "growth": {
      "hp": 58,
      "mp": 20,
      "atk": 16,
      "def": 11,
      "spd": 13
    },
    "spriteNum": 4,
    "spriteVariant": 0,
    "spriteKey": "npc2_4",
    "sprite": "./img/monsters/npc2_4.png",
    "description": "Rồng thảo mộc tu luyện ngàn năm giữa rừng sâu",
    "evolution": [],
    "skills": [
      {
        "id": 0,
        "name": "Triền Nhiễu",
        "type": "Thực Vật",
        "power": 16,
        "mpCost": 10,
        "accuracy": 95,
        "heal": 0,
        "buffDef": 0,
        "desc": "Dây leo quấn chặt gây sát thương và khống chế"
      },
      {
        "id": 1,
        "name": "Phong Lợi Tiêm Thứ",
        "type": "Thực Vật",
        "power": 22,
        "mpCost": 14,
        "accuracy": 95,
        "heal": 0,
        "buffDef": 0,
        "desc": "Phóng ra gai nhọn sắc bén như lưỡi cưa"
      },
      {
        "id": 2,
        "name": "Phi Diệp Đao Phong",
        "type": "Thực Vật",
        "power": 28,
        "mpCost": 18,
        "accuracy": 95,
        "heal": 0,
        "buffDef": 0,
        "desc": "Phóng bão lá sắc bén tựa ngàn lưỡi kiếm"
      },
      {
        "id": 3,
        "name": "Sâm Lâm Bạo Phát",
        "type": "Thực Vật",
        "power": 36,
        "mpCost": 26,
        "accuracy": 95,
        "heal": 0,
        "buffDef": 0,
        "desc": "Sức mạnh rừng thẳm bộc phát đè bẹp đối phương"
      }
    ]
  },
  {
    "id": 142,
    "code": "mythical_pet_5",
    "name": "Thần Tộc",
    "type": "Kim Loại",
    "color": "#f39c12",
    "tier": 3,
    "baseHP": 60,
    "baseMP": 118,
    "baseATK": 30,
    "baseDEF": 23,
    "baseSPD": 25,
    "growth": {
      "hp": 64,
      "mp": 20,
      "atk": 18,
      "def": 12,
      "spd": 14
    },
    "spriteNum": 5,
    "spriteVariant": 0,
    "spriteKey": "npc2_5",
    "sprite": "./img/monsters/npc2_5.png",
    "description": "Chiến binh thần tộc khoác áo giáp thánh quang",
    "evolution": [],
    "skills": [
      {
        "id": 11,
        "name": "Cương Thiết Trảm",
        "type": "Kim Loại",
        "power": 22,
        "mpCost": 14,
        "accuracy": 95,
        "heal": 0,
        "buffDef": 0,
        "desc": "Đường kiếm thép sắc lạnh chém đứt giáp trụ"
      },
      {
        "id": 12,
        "name": "Kim Tinh Xung Kích",
        "type": "Kim Loại",
        "power": 28,
        "mpCost": 19,
        "accuracy": 95,
        "heal": 0,
        "buffDef": 0,
        "desc": "Lao thẳng với mũi khoan kim cương cực mạnh"
      },
      {
        "id": 14,
        "name": "Trảm Kim Đoạn Ngọc",
        "type": "Kim Loại",
        "power": 48,
        "mpCost": 36,
        "accuracy": 95,
        "heal": 0,
        "buffDef": 0,
        "desc": "Tuyệt kỹ kim loại chém sắt gãy ngọc vô song"
      },
      {
        "id": 19,
        "name": "Cương Cân Thiết Cốt",
        "type": "Phòng Ngự",
        "power": 0,
        "mpCost": 14,
        "accuracy": 100,
        "heal": 0,
        "buffDef": 45,
        "desc": "Biến cơ thể thành khối kim cương siêu cứng"
      }
    ]
  },
  {
    "id": 143,
    "code": "mythical_pet_6",
    "name": "Thương Mang Lang",
    "type": "Mãnh Thú",
    "color": "#e74c3c",
    "tier": 2,
    "baseHP": 54,
    "baseMP": 112,
    "baseATK": 26,
    "baseDEF": 20,
    "baseSPD": 22,
    "growth": {
      "hp": 58,
      "mp": 20,
      "atk": 16,
      "def": 11,
      "spd": 13
    },
    "spriteNum": 6,
    "spriteVariant": 0,
    "spriteKey": "npc2_6",
    "sprite": "./img/monsters/npc2_6.png",
    "description": "Sói tuyết Thương Mang tiếng hú vang dội đỉnh núi băng",
    "evolution": [],
    "skills": [
      {
        "id": 30,
        "name": "Liệt Trảo",
        "type": "Mãnh Thú",
        "power": 17,
        "mpCost": 10,
        "accuracy": 95,
        "heal": 0,
        "buffDef": 0,
        "desc": "Móng vuốt rực lửa cào xé dữ dội"
      },
      {
        "id": 31,
        "name": "Cuồng Bạo Xung Chàng",
        "type": "Mãnh Thú",
        "power": 23,
        "mpCost": 14,
        "accuracy": 95,
        "heal": 0,
        "buffDef": 0,
        "desc": "Húc mạnh bạo liệt hất văng đối thủ"
      },
      {
        "id": 32,
        "name": "Viêm Hống Toái Cốt",
        "type": "Mãnh Thú",
        "power": 29,
        "mpCost": 19,
        "accuracy": 95,
        "heal": 0,
        "buffDef": 0,
        "desc": "Tiếng gầm rực lửa làm rúng động và nứt giáp đối thủ"
      },
      {
        "id": 33,
        "name": "Nộ Diễm Liệt Ba",
        "type": "Mãnh Thú",
        "power": 38,
        "mpCost": 27,
        "accuracy": 95,
        "heal": 0,
        "buffDef": 0,
        "desc": "Sóng lửa cuộn trào thiêu đốt toàn bộ vùng xung quanh"
      }
    ]
  },
  {
    "id": 144,
    "code": "mythical_pet_7",
    "name": "Xích Vũ Lang",
    "type": "Mãnh Thú",
    "color": "#e74c3c",
    "tier": 2,
    "baseHP": 54,
    "baseMP": 112,
    "baseATK": 26,
    "baseDEF": 20,
    "baseSPD": 22,
    "growth": {
      "hp": 58,
      "mp": 20,
      "atk": 16,
      "def": 11,
      "spd": 13
    },
    "spriteNum": 7,
    "spriteVariant": 0,
    "spriteKey": "npc2_7",
    "sprite": "./img/monsters/npc2_7.png",
    "description": "Sói lửa bờm đỏ rực chuyên săn lùng nơi miệng núi lửa",
    "evolution": [],
    "skills": [
      {
        "id": 30,
        "name": "Liệt Trảo",
        "type": "Mãnh Thú",
        "power": 17,
        "mpCost": 10,
        "accuracy": 95,
        "heal": 0,
        "buffDef": 0,
        "desc": "Móng vuốt rực lửa cào xé dữ dội"
      },
      {
        "id": 31,
        "name": "Cuồng Bạo Xung Chàng",
        "type": "Mãnh Thú",
        "power": 23,
        "mpCost": 14,
        "accuracy": 95,
        "heal": 0,
        "buffDef": 0,
        "desc": "Húc mạnh bạo liệt hất văng đối thủ"
      },
      {
        "id": 32,
        "name": "Viêm Hống Toái Cốt",
        "type": "Mãnh Thú",
        "power": 29,
        "mpCost": 19,
        "accuracy": 95,
        "heal": 0,
        "buffDef": 0,
        "desc": "Tiếng gầm rực lửa làm rúng động và nứt giáp đối thủ"
      },
      {
        "id": 33,
        "name": "Nộ Diễm Liệt Ba",
        "type": "Mãnh Thú",
        "power": 38,
        "mpCost": 27,
        "accuracy": 95,
        "heal": 0,
        "buffDef": 0,
        "desc": "Sóng lửa cuộn trào thiêu đốt toàn bộ vùng xung quanh"
      }
    ]
  },
  {
    "id": 145,
    "code": "mythical_pet_8",
    "name": "Tử Ảnh Ngao",
    "type": "Phi Hành",
    "color": "#9b59b6",
    "tier": 3,
    "baseHP": 60,
    "baseMP": 118,
    "baseATK": 30,
    "baseDEF": 23,
    "baseSPD": 25,
    "growth": {
      "hp": 64,
      "mp": 20,
      "atk": 18,
      "def": 12,
      "spd": 14
    },
    "spriteNum": 8,
    "spriteVariant": 0,
    "spriteKey": "npc2_8",
    "sprite": "./img/monsters/npc2_8.png",
    "description": "Ngao thần bóng tím lướt nhanh như ánh chớp",
    "evolution": [],
    "skills": [
      {
        "id": 21,
        "name": "Liệp Dực Trảm",
        "type": "Phi Hành",
        "power": 23,
        "mpCost": 14,
        "accuracy": 95,
        "heal": 0,
        "buffDef": 0,
        "desc": "Sải cánh săn mồi chém rách đối thủ"
      },
      {
        "id": 22,
        "name": "Toàn Phong Xung Kích",
        "type": "Phi Hành",
        "power": 29,
        "mpCost": 19,
        "accuracy": 95,
        "heal": 0,
        "buffDef": 0,
        "desc": "Cuộn trọn theo lốc xoáy đâm sầm vào kẻ địch"
      },
      {
        "id": 24,
        "name": "Thần Phong Liệt Không",
        "type": "Phi Hành",
        "power": 48,
        "mpCost": 36,
        "accuracy": 95,
        "heal": 0,
        "buffDef": 0,
        "desc": "Cơn bão thần thánh xé toạc không gian"
      },
      {
        "id": 23,
        "name": "Vũ Dực Cuồng Phong",
        "type": "Phi Hành",
        "power": 37,
        "mpCost": 26,
        "accuracy": 95,
        "heal": 0,
        "buffDef": 0,
        "desc": "Đập cánh tạo siêu bão càn quét trận đấu"
      }
    ]
  },
  {
    "id": 146,
    "code": "mythical_pet_9",
    "name": "Băng Ma Sư",
    "type": "Hải Dương",
    "color": "#2980b9",
    "tier": 2,
    "baseHP": 54,
    "baseMP": 112,
    "baseATK": 26,
    "baseDEF": 20,
    "baseSPD": 22,
    "growth": {
      "hp": 58,
      "mp": 20,
      "atk": 16,
      "def": 11,
      "spd": 13
    },
    "spriteNum": 9,
    "spriteVariant": 0,
    "spriteKey": "npc2_9",
    "sprite": "./img/monsters/npc2_9.png",
    "description": "Sư tử băng với bộ lông kết bằng tinh thể tuyết",
    "evolution": [],
    "skills": [
      {
        "id": 40,
        "name": "Thủy Trụ",
        "type": "Hải Dương",
        "power": 15,
        "mpCost": 10,
        "accuracy": 95,
        "heal": 0,
        "buffDef": 0,
        "desc": "Cột nước áp lực cao bắn thẳng từ mặt đất"
      },
      {
        "id": 41,
        "name": "Ba Đào Trọng Kích",
        "type": "Hải Dương",
        "power": 22,
        "mpCost": 14,
        "accuracy": 95,
        "heal": 0,
        "buffDef": 0,
        "desc": "Cơn sóng cuồn cuộn đập mạnh vào kẻ thù"
      },
      {
        "id": 42,
        "name": "Hải Lãng Nộ Đào",
        "type": "Hải Dương",
        "power": 28,
        "mpCost": 19,
        "accuracy": 95,
        "heal": 0,
        "buffDef": 0,
        "desc": "Sóng biển giận dữ cuốn phăng phòng tuyến địch"
      },
      {
        "id": 43,
        "name": "Hàn Băng Toái Toản",
        "type": "Hải Dương",
        "power": 36,
        "mpCost": 26,
        "accuracy": 95,
        "heal": 0,
        "buffDef": 0,
        "desc": "Những mũi băng nhọn hoắt nghiền nát giáp trụ"
      }
    ]
  },
  {
    "id": 147,
    "code": "mythical_pet_10",
    "name": "Đế Ma Sư",
    "type": "Mãnh Thú",
    "color": "#e74c3c",
    "tier": 3,
    "baseHP": 60,
    "baseMP": 118,
    "baseATK": 30,
    "baseDEF": 23,
    "baseSPD": 25,
    "growth": {
      "hp": 64,
      "mp": 20,
      "atk": 18,
      "def": 12,
      "spd": 14
    },
    "spriteNum": 10,
    "spriteVariant": 0,
    "spriteKey": "npc2_10",
    "sprite": "./img/monsters/npc2_10.png",
    "description": "Đế vương ma thú quyền năng tối cao",
    "evolution": [],
    "skills": [
      {
        "id": 31,
        "name": "Cuồng Bạo Xung Chàng",
        "type": "Mãnh Thú",
        "power": 23,
        "mpCost": 14,
        "accuracy": 95,
        "heal": 0,
        "buffDef": 0,
        "desc": "Húc mạnh bạo liệt hất văng đối thủ"
      },
      {
        "id": 32,
        "name": "Viêm Hống Toái Cốt",
        "type": "Mãnh Thú",
        "power": 29,
        "mpCost": 19,
        "accuracy": 95,
        "heal": 0,
        "buffDef": 0,
        "desc": "Tiếng gầm rực lửa làm rúng động và nứt giáp đối thủ"
      },
      {
        "id": 34,
        "name": "Hồng Liên Liệt Hỏa",
        "type": "Mãnh Thú",
        "power": 50,
        "mpCost": 38,
        "accuracy": 95,
        "heal": 0,
        "buffDef": 0,
        "desc": "Hoa sen lửa địa ngục hủy diệt vạn vật"
      },
      {
        "id": 33,
        "name": "Nộ Diễm Liệt Ba",
        "type": "Mãnh Thú",
        "power": 38,
        "mpCost": 27,
        "accuracy": 95,
        "heal": 0,
        "buffDef": 0,
        "desc": "Sóng lửa cuộn trào thiêu đốt toàn bộ vùng xung quanh"
      }
    ]
  }
];

const SKILLS_PRESET = [
  {
    "id": 0,
    "name": "Triền Nhiễu",
    "type": "Thực Vật",
    "power": 16,
    "mpCost": 10,
    "accuracy": 95,
    "heal": 0,
    "buffDef": 0,
    "desc": "Dây leo quấn chặt gây sát thương và khống chế"
  },
  {
    "id": 1,
    "name": "Phong Lợi Tiêm Thứ",
    "type": "Thực Vật",
    "power": 22,
    "mpCost": 14,
    "accuracy": 95,
    "heal": 0,
    "buffDef": 0,
    "desc": "Phóng ra gai nhọn sắc bén như lưỡi cưa"
  },
  {
    "id": 2,
    "name": "Phi Diệp Đao Phong",
    "type": "Thực Vật",
    "power": 28,
    "mpCost": 18,
    "accuracy": 95,
    "heal": 0,
    "buffDef": 0,
    "desc": "Phóng bão lá sắc bén tựa ngàn lưỡi kiếm"
  },
  {
    "id": 3,
    "name": "Sâm Lâm Bạo Phát",
    "type": "Thực Vật",
    "power": 36,
    "mpCost": 26,
    "accuracy": 95,
    "heal": 0,
    "buffDef": 0,
    "desc": "Sức mạnh rừng thẳm bộc phát đè bẹp đối phương"
  },
  {
    "id": 4,
    "name": "Mộc Chi Cứu Thù",
    "type": "Thực Vật",
    "power": 46,
    "mpCost": 35,
    "accuracy": 95,
    "heal": 0,
    "buffDef": 0,
    "desc": "Chiêu thức tối thượng hệ Thực Vật hủy diệt kẻ địch"
  },
  {
    "id": 5,
    "name": "Diệp Toàn",
    "type": "Thực Vật",
    "power": 18,
    "mpCost": 11,
    "accuracy": 95,
    "heal": 0,
    "buffDef": 0,
    "desc": "Lốc xoáy lá cây sắc ngọt bao vây mục tiêu"
  },
  {
    "id": 6,
    "name": "Châm Diệp Trảm",
    "type": "Thực Vật",
    "power": 26,
    "mpCost": 18,
    "accuracy": 95,
    "heal": 0,
    "buffDef": 0,
    "desc": "Lưỡi trảm lá kim xuyên thủng lớp phòng hộ"
  },
  {
    "id": 7,
    "name": "Đằng Mạn Triền Nhiễu",
    "type": "Thực Vật",
    "power": 34,
    "mpCost": 24,
    "accuracy": 95,
    "heal": 0,
    "buffDef": 0,
    "desc": "Đại dây leo cổ thụ cuốn siết mục tiêu liên hồi"
  },
  {
    "id": 8,
    "name": "Thảo Nguyện Thuật",
    "type": "Hồi Phục",
    "power": 0,
    "mpCost": 18,
    "accuracy": 100,
    "heal": 40,
    "buffDef": 0,
    "desc": "Cầu nguyện thảo nguyên hồi 40% lượng máu tối đa"
  },
  {
    "id": 9,
    "name": "Quang Hợp Hiệu Ứng",
    "type": "Hồi Phục",
    "power": 0,
    "mpCost": 28,
    "accuracy": 100,
    "heal": 65,
    "buffDef": 0,
    "desc": "Thu nạp ánh sáng phục hồi 65% sinh lực"
  },
  {
    "id": 10,
    "name": "Thiết Quyền",
    "type": "Kim Loại",
    "power": 16,
    "mpCost": 10,
    "accuracy": 95,
    "heal": 0,
    "buffDef": 0,
    "desc": "Nắm đấm kim loại nặng nề nện thẳng mục tiêu"
  },
  {
    "id": 11,
    "name": "Cương Thiết Trảm",
    "type": "Kim Loại",
    "power": 22,
    "mpCost": 14,
    "accuracy": 95,
    "heal": 0,
    "buffDef": 0,
    "desc": "Đường kiếm thép sắc lạnh chém đứt giáp trụ"
  },
  {
    "id": 12,
    "name": "Kim Tinh Xung Kích",
    "type": "Kim Loại",
    "power": 28,
    "mpCost": 19,
    "accuracy": 95,
    "heal": 0,
    "buffDef": 0,
    "desc": "Lao thẳng với mũi khoan kim cương cực mạnh"
  },
  {
    "id": 13,
    "name": "Bạo Liệt Thiết Toản",
    "type": "Kim Loại",
    "power": 36,
    "mpCost": 26,
    "accuracy": 95,
    "heal": 0,
    "buffDef": 0,
    "desc": "Mũi khoan thép bạo nổ gây chấn thương diện rộng"
  },
  {
    "id": 14,
    "name": "Trảm Kim Đoạn Ngọc",
    "type": "Kim Loại",
    "power": 48,
    "mpCost": 36,
    "accuracy": 95,
    "heal": 0,
    "buffDef": 0,
    "desc": "Tuyệt kỹ kim loại chém sắt gãy ngọc vô song"
  },
  {
    "id": 15,
    "name": "Thổ Thuẫn",
    "type": "Phòng Ngự",
    "power": 0,
    "mpCost": 12,
    "accuracy": 100,
    "heal": 0,
    "buffDef": 35,
    "desc": "Dựng tường đất cứng cáp tăng 35% phòng ngự"
  },
  {
    "id": 16,
    "name": "Bão Cát",
    "type": "Kim Loại",
    "power": 24,
    "mpCost": 16,
    "accuracy": 90,
    "heal": 0,
    "buffDef": 0,
    "desc": "Cơn bão bụi cát cuốn xé và giảm tầm nhìn địch"
  },
  {
    "id": 17,
    "name": "Nham Băng",
    "type": "Kim Loại",
    "power": 32,
    "mpCost": 22,
    "accuracy": 95,
    "heal": 0,
    "buffDef": 0,
    "desc": "Nham thạch nổ tung phá toái trận địa"
  },
  {
    "id": 18,
    "name": "Thổ Chi Loạn Vũ",
    "type": "Kim Loại",
    "power": 44,
    "mpCost": 32,
    "accuracy": 95,
    "heal": 0,
    "buffDef": 0,
    "desc": "Đại địa cuồng nộ nghiền nát tất cả mục tiêu"
  },
  {
    "id": 19,
    "name": "Cương Cân Thiết Cốt",
    "type": "Phòng Ngự",
    "power": 0,
    "mpCost": 14,
    "accuracy": 100,
    "heal": 0,
    "buffDef": 45,
    "desc": "Biến cơ thể thành khối kim cương siêu cứng"
  },
  {
    "id": 20,
    "name": "Phong Nhận",
    "type": "Phi Hành",
    "power": 17,
    "mpCost": 10,
    "accuracy": 95,
    "heal": 0,
    "buffDef": 0,
    "desc": "Lưỡi đao gió chém ngọt từ không trung"
  },
  {
    "id": 21,
    "name": "Liệp Dực Trảm",
    "type": "Phi Hành",
    "power": 23,
    "mpCost": 14,
    "accuracy": 95,
    "heal": 0,
    "buffDef": 0,
    "desc": "Sải cánh săn mồi chém rách đối thủ"
  },
  {
    "id": 22,
    "name": "Toàn Phong Xung Kích",
    "type": "Phi Hành",
    "power": 29,
    "mpCost": 19,
    "accuracy": 95,
    "heal": 0,
    "buffDef": 0,
    "desc": "Cuộn trọn theo lốc xoáy đâm sầm vào kẻ địch"
  },
  {
    "id": 23,
    "name": "Vũ Dực Cuồng Phong",
    "type": "Phi Hành",
    "power": 37,
    "mpCost": 26,
    "accuracy": 95,
    "heal": 0,
    "buffDef": 0,
    "desc": "Đập cánh tạo siêu bão càn quét trận đấu"
  },
  {
    "id": 24,
    "name": "Thần Phong Liệt Không",
    "type": "Phi Hành",
    "power": 48,
    "mpCost": 36,
    "accuracy": 95,
    "heal": 0,
    "buffDef": 0,
    "desc": "Cơn bão thần thánh xé toạc không gian"
  },
  {
    "id": 25,
    "name": "Lôi Kích",
    "type": "Phi Hành",
    "power": 25,
    "mpCost": 16,
    "accuracy": 95,
    "heal": 0,
    "buffDef": 0,
    "desc": "Tia sét rền vang giáng sập mục tiêu"
  },
  {
    "id": 26,
    "name": "Lôi Đình Nhất Kích",
    "type": "Phi Hành",
    "power": 38,
    "mpCost": 28,
    "accuracy": 95,
    "heal": 0,
    "buffDef": 0,
    "desc": "Sấm sét cửu thiên giáng thế gây tê liệt"
  },
  {
    "id": 27,
    "name": "Yến Hồi Thiểm",
    "type": "Phi Hành",
    "power": 32,
    "mpCost": 22,
    "accuracy": 95,
    "heal": 0,
    "buffDef": 0,
    "desc": "Lượn cánh chớp nhoáng phản kích hiểm hóc"
  },
  {
    "id": 28,
    "name": "Phi Yến Hoàn Sào",
    "type": "Phi Hành",
    "power": 45,
    "mpCost": 34,
    "accuracy": 95,
    "heal": 0,
    "buffDef": 0,
    "desc": "Đường bay huyền ảo kết liễu kẻ thù"
  },
  {
    "id": 29,
    "name": "Điện Quang Thạch Hỏa",
    "type": "Phi Hành",
    "power": 42,
    "mpCost": 32,
    "accuracy": 95,
    "heal": 0,
    "buffDef": 0,
    "desc": "Tốc độ tia chớp tấn công dồn dập không kịp trở tay"
  },
  {
    "id": 30,
    "name": "Liệt Trảo",
    "type": "Mãnh Thú",
    "power": 17,
    "mpCost": 10,
    "accuracy": 95,
    "heal": 0,
    "buffDef": 0,
    "desc": "Móng vuốt rực lửa cào xé dữ dội"
  },
  {
    "id": 31,
    "name": "Cuồng Bạo Xung Chàng",
    "type": "Mãnh Thú",
    "power": 23,
    "mpCost": 14,
    "accuracy": 95,
    "heal": 0,
    "buffDef": 0,
    "desc": "Húc mạnh bạo liệt hất văng đối thủ"
  },
  {
    "id": 32,
    "name": "Viêm Hống Toái Cốt",
    "type": "Mãnh Thú",
    "power": 29,
    "mpCost": 19,
    "accuracy": 95,
    "heal": 0,
    "buffDef": 0,
    "desc": "Tiếng gầm rực lửa làm rúng động và nứt giáp đối thủ"
  },
  {
    "id": 33,
    "name": "Nộ Diễm Liệt Ba",
    "type": "Mãnh Thú",
    "power": 38,
    "mpCost": 27,
    "accuracy": 95,
    "heal": 0,
    "buffDef": 0,
    "desc": "Sóng lửa cuộn trào thiêu đốt toàn bộ vùng xung quanh"
  },
  {
    "id": 34,
    "name": "Hồng Liên Liệt Hỏa",
    "type": "Mãnh Thú",
    "power": 50,
    "mpCost": 38,
    "accuracy": 95,
    "heal": 0,
    "buffDef": 0,
    "desc": "Hoa sen lửa địa ngục hủy diệt vạn vật"
  },
  {
    "id": 35,
    "name": "Hỏa Trảo",
    "type": "Mãnh Thú",
    "power": 18,
    "mpCost": 11,
    "accuracy": 95,
    "heal": 0,
    "buffDef": 0,
    "desc": "Vuốt lửa bốc cháy cào xé mục tiêu"
  },
  {
    "id": 36,
    "name": "Diễm Kích",
    "type": "Mãnh Thú",
    "power": 26,
    "mpCost": 17,
    "accuracy": 95,
    "heal": 0,
    "buffDef": 0,
    "desc": "Phóng đạn lửa nổ tung khi va chạm"
  },
  {
    "id": 37,
    "name": "Viêm Lôi Phá",
    "type": "Mãnh Thú",
    "power": 36,
    "mpCost": 26,
    "accuracy": 95,
    "heal": 0,
    "buffDef": 0,
    "desc": "Sự kết hợp giữa sấm sét và lửa đỏ uy lực bão táp"
  },
  {
    "id": 38,
    "name": "Liệt Diễm Phong Bạo",
    "type": "Mãnh Thú",
    "power": 44,
    "mpCost": 34,
    "accuracy": 95,
    "heal": 0,
    "buffDef": 0,
    "desc": "Bão lửa cuồng phong nhấn chìm trận đấu"
  },
  {
    "id": 39,
    "name": "Vĩnh Hằng Hỏa Ảnh",
    "type": "Mãnh Thú",
    "power": 52,
    "mpCost": 40,
    "accuracy": 95,
    "heal": 0,
    "buffDef": 0,
    "desc": "Ngọn lửa vĩnh cửu bất diệt nuốt trọn sinh lực địch"
  },
  {
    "id": 40,
    "name": "Thủy Trụ",
    "type": "Hải Dương",
    "power": 15,
    "mpCost": 10,
    "accuracy": 95,
    "heal": 0,
    "buffDef": 0,
    "desc": "Cột nước áp lực cao bắn thẳng từ mặt đất"
  },
  {
    "id": 41,
    "name": "Ba Đào Trọng Kích",
    "type": "Hải Dương",
    "power": 22,
    "mpCost": 14,
    "accuracy": 95,
    "heal": 0,
    "buffDef": 0,
    "desc": "Cơn sóng cuồn cuộn đập mạnh vào kẻ thù"
  },
  {
    "id": 42,
    "name": "Hải Lãng Nộ Đào",
    "type": "Hải Dương",
    "power": 28,
    "mpCost": 19,
    "accuracy": 95,
    "heal": 0,
    "buffDef": 0,
    "desc": "Sóng biển giận dữ cuốn phăng phòng tuyến địch"
  },
  {
    "id": 43,
    "name": "Hàn Băng Toái Toản",
    "type": "Hải Dương",
    "power": 36,
    "mpCost": 26,
    "accuracy": 95,
    "heal": 0,
    "buffDef": 0,
    "desc": "Những mũi băng nhọn hoắt nghiền nát giáp trụ"
  },
  {
    "id": 44,
    "name": "Hải Tiêu Nộ Lãng",
    "type": "Hải Dương",
    "power": 48,
    "mpCost": 36,
    "accuracy": 95,
    "heal": 0,
    "buffDef": 0,
    "desc": "Đại hồng thủy đại dương nuốt chửng đối thủ"
  },
  {
    "id": 45,
    "name": "Băng Lao",
    "type": "Hải Dương",
    "power": 20,
    "mpCost": 12,
    "accuracy": 95,
    "heal": 0,
    "buffDef": 0,
    "desc": "Hộp băng vĩnh cửu khóa chặt mục tiêu"
  },
  {
    "id": 46,
    "name": "Bạo Phong Tuyết",
    "type": "Hải Dương",
    "power": 36,
    "mpCost": 26,
    "accuracy": 95,
    "heal": 0,
    "buffDef": 0,
    "desc": "Bão tuyết hàn băng đóng băng cả bầu trời"
  },
  {
    "id": 47,
    "name": "Băng Phong Hãm Tịnh",
    "type": "Hải Dương",
    "power": 44,
    "mpCost": 34,
    "accuracy": 95,
    "heal": 0,
    "buffDef": 0,
    "desc": "Bẫy băng đóng băng mọi nỗ lực phản kháng"
  },
  {
    "id": 48,
    "name": "Thuật Cầu Nguyện",
    "type": "Hồi Phục",
    "power": 0,
    "mpCost": 16,
    "accuracy": 100,
    "heal": 45,
    "buffDef": 0,
    "desc": "Làn nước mát lành chữa lành 45% sinh lực"
  },
  {
    "id": 49,
    "name": "Thủy Bích",
    "type": "Phòng Ngự",
    "power": 0,
    "mpCost": 12,
    "accuracy": 100,
    "heal": 0,
    "buffDef": 35,
    "desc": "Tường nước bao bọc giảm 35% sát thương nhận vào"
  },
  {
    "id": 50,
    "name": "Thiên Vương Chiến Ý",
    "type": "Đặc Biệt",
    "power": 0,
    "mpCost": 15,
    "accuracy": 100,
    "heal": 0,
    "buffDef": 25,
    "desc": "Chiến ý ngút trời gia tăng toàn diện công phòng"
  },
  {
    "id": 51,
    "name": "Lực Phách Thiên Quân",
    "type": "Đặc Biệt",
    "power": 36,
    "mpCost": 25,
    "accuracy": 95,
    "heal": 0,
    "buffDef": 0,
    "desc": "Đòn bổ ngàn cân chẻ đôi giáp trụ"
  },
  {
    "id": 52,
    "name": "Càn Khôn Nhất Kích",
    "type": "Đặc Biệt",
    "power": 44,
    "mpCost": 32,
    "accuracy": 95,
    "heal": 0,
    "buffDef": 0,
    "desc": "Xoay chuyển càn khôn xuất kích quyết định"
  },
  {
    "id": 53,
    "name": "Bối Thủy Nhất Chiến",
    "type": "Đặc Biệt",
    "power": 48,
    "mpCost": 36,
    "accuracy": 95,
    "heal": 0,
    "buffDef": 0,
    "desc": "Trận chiến bờ sông không đường lùi sát thương bộc phá"
  },
  {
    "id": 54,
    "name": "Phản Kích",
    "type": "Đặc Biệt",
    "power": 32,
    "mpCost": 20,
    "accuracy": 95,
    "heal": 0,
    "buffDef": 0,
    "desc": "Lợi dụng lực tấn công của địch phản đòn bất ngờ"
  },
  {
    "id": 55,
    "name": "Niết Bàn Kích",
    "type": "Hồi Phục",
    "power": 25,
    "mpCost": 35,
    "accuracy": 95,
    "heal": 50,
    "buffDef": 0,
    "desc": "Vừa tấn công vừa hồi sinh 50% lượng máu tối đa"
  },
  {
    "id": 56,
    "name": "Thần Ân Nghiễm Trạch",
    "type": "Hồi Phục",
    "power": 0,
    "mpCost": 38,
    "accuracy": 100,
    "heal": 80,
    "buffDef": 0,
    "desc": "Ân sủng tối cao phục hồi 80% sinh lực lập tức"
  },
  {
    "id": 57,
    "name": "Minh Kính Chỉ Thủy",
    "type": "Phòng Ngự",
    "power": 0,
    "mpCost": 16,
    "accuracy": 100,
    "heal": 0,
    "buffDef": 50,
    "desc": "Tâm tĩnh như gương chặn 50% sát thương phải chịu"
  }
];

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
