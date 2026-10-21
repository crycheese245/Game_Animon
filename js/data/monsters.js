// ========================================================
// DANH SÁCH 102 SỦNG VẬT & NGŨ HÀNH (VƯƠNG QUỐC SỦNG CẦU VỒNG)
// ========================================================
const TYPE_EFFECTIVENESS = {
  "Kim": {
    "strongAgainst": [
      "Thủy",
      "Hỏa"
    ],
    "weakAgainst": [
      "Thổ"
    ]
  },
  "Mộc": {
    "strongAgainst": [
      "Hỏa",
      "Thổ"
    ],
    "weakAgainst": [
      "Kim"
    ]
  },
  "Thủy": {
    "strongAgainst": [
      "Thổ",
      "Kim"
    ],
    "weakAgainst": [
      "Mộc"
    ]
  },
  "Hỏa": {
    "strongAgainst": [
      "Kim",
      "Mộc"
    ],
    "weakAgainst": [
      "Thủy"
    ]
  },
  "Thổ": {
    "strongAgainst": [
      "Mộc",
      "Thủy"
    ],
    "weakAgainst": [
      "Hỏa"
    ]
  }
};

const MONSTERS_PRESET = [
  {
    "id": 1,
    "code": "cauvong_pet_1",
    "name": "Viêm Hỏa Khuyển",
    "type": "Kim",
    "color": "#f1c40f",
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
    "evolutionTarget": 4,
    "spriteKey": "s0",
    "sprite": "./img/monsters/s0.png",
    "skills": [
      {
        "name": "Kim Kích",
        "power": 30,
        "mpCost": 10,
        "type": "Kim",
        "desc": "Tấn công gây sát thương vật lý hệ Kim."
      },
      {
        "name": "Kim Vũ Cuồng Phong",
        "power": 46,
        "mpCost": 22,
        "type": "Kim",
        "desc": "Chiêu thức nguyên tố bậc cao, gây sát thương cực lớn."
      },
      {
        "name": "Kim Loại Ngoại Xác",
        "power": 0,
        "buffDef": 30,
        "mpCost": 12,
        "type": "Kim",
        "desc": "Gia tăng 30% phòng ngự."
      }
    ]
  },
  {
    "id": 2,
    "code": "cauvong_pet_2",
    "name": "Lam Thủy Kình",
    "type": "Kim",
    "color": "#f1c40f",
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
    "evolutionTarget": 3,
    "spriteKey": "s1",
    "sprite": "./img/monsters/s1.png",
    "skills": [
      {
        "name": "Kim Kích",
        "power": 32,
        "mpCost": 10,
        "type": "Kim",
        "desc": "Tấn công gây sát thương vật lý hệ Kim."
      },
      {
        "name": "Kim Vũ Cuồng Phong",
        "power": 48,
        "mpCost": 22,
        "type": "Kim",
        "desc": "Chiêu thức nguyên tố bậc cao, gây sát thương cực lớn."
      },
      {
        "name": "Kim Loại Ngoại Xác",
        "power": 0,
        "buffDef": 30,
        "mpCost": 12,
        "type": "Kim",
        "desc": "Gia tăng 30% phòng ngự."
      }
    ]
  },
  {
    "id": 3,
    "code": "cauvong_pet_3",
    "name": "Thanh Mộc Long",
    "type": "Kim",
    "color": "#f1c40f",
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
    "evolutionTarget": 2,
    "spriteKey": "s2",
    "sprite": "./img/monsters/s2.png",
    "skills": [
      {
        "name": "Kim Kích",
        "power": 33,
        "mpCost": 10,
        "type": "Kim",
        "desc": "Tấn công gây sát thương vật lý hệ Kim."
      },
      {
        "name": "Kim Vũ Cuồng Phong",
        "power": 50,
        "mpCost": 22,
        "type": "Kim",
        "desc": "Chiêu thức nguyên tố bậc cao, gây sát thương cực lớn."
      },
      {
        "name": "Kim Loại Ngoại Xác",
        "power": 0,
        "buffDef": 30,
        "mpCost": 12,
        "type": "Kim",
        "desc": "Gia tăng 30% phòng ngự."
      }
    ]
  },
  {
    "id": 4,
    "code": "cauvong_pet_4",
    "name": "Lôi Lân Thú",
    "type": "Kim",
    "color": "#f1c40f",
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
    "evolutionTarget": null,
    "spriteKey": "s3",
    "sprite": "./img/monsters/s3.png",
    "skills": [
      {
        "name": "Kim Kích",
        "power": 35,
        "mpCost": 10,
        "type": "Kim",
        "desc": "Tấn công gây sát thương vật lý hệ Kim."
      },
      {
        "name": "Kim Vũ Cuồng Phong",
        "power": 52,
        "mpCost": 22,
        "type": "Kim",
        "desc": "Chiêu thức nguyên tố bậc cao, gây sát thương cực lớn."
      },
      {
        "name": "Kim Loại Ngoại Xác",
        "power": 0,
        "buffDef": 30,
        "mpCost": 12,
        "type": "Kim",
        "desc": "Gia tăng 30% phòng ngự."
      }
    ]
  },
  {
    "id": 5,
    "code": "cauvong_pet_5",
    "name": "Bạch Hổ Chiến Thú",
    "type": "Kim",
    "color": "#f1c40f",
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
    "evolutionTarget": 2,
    "spriteKey": "s4",
    "sprite": "./img/monsters/s4.png",
    "skills": [
      {
        "name": "Kim Kích",
        "power": 30,
        "mpCost": 10,
        "type": "Kim",
        "desc": "Tấn công gây sát thương vật lý hệ Kim."
      },
      {
        "name": "Kim Vũ Cuồng Phong",
        "power": 46,
        "mpCost": 22,
        "type": "Kim",
        "desc": "Chiêu thức nguyên tố bậc cao, gây sát thương cực lớn."
      },
      {
        "name": "Kim Loại Ngoại Xác",
        "power": 0,
        "buffDef": 30,
        "mpCost": 12,
        "type": "Kim",
        "desc": "Gia tăng 30% phòng ngự."
      }
    ]
  },
  {
    "id": 6,
    "code": "cauvong_pet_6",
    "name": "Ám Dạ Ma Miêu",
    "type": "Kim",
    "color": "#f1c40f",
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
    "evolutionTarget": null,
    "spriteKey": "s5",
    "sprite": "./img/monsters/s5.png",
    "skills": [
      {
        "name": "Kim Kích",
        "power": 32,
        "mpCost": 10,
        "type": "Kim",
        "desc": "Tấn công gây sát thương vật lý hệ Kim."
      },
      {
        "name": "Kim Vũ Cuồng Phong",
        "power": 48,
        "mpCost": 22,
        "type": "Kim",
        "desc": "Chiêu thức nguyên tố bậc cao, gây sát thương cực lớn."
      },
      {
        "name": "Kim Loại Ngoại Xác",
        "power": 0,
        "buffDef": 30,
        "mpCost": 12,
        "type": "Kim",
        "desc": "Gia tăng 30% phòng ngự."
      }
    ]
  },
  {
    "id": 7,
    "code": "cauvong_pet_7",
    "name": "Thiên Sứ Sa Ngã",
    "type": "Kim",
    "color": "#f1c40f",
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
    "evolutionTarget": null,
    "spriteKey": "r0",
    "sprite": "./img/monsters/r0.png",
    "skills": [
      {
        "name": "Kim Kích",
        "power": 33,
        "mpCost": 10,
        "type": "Kim",
        "desc": "Tấn công gây sát thương vật lý hệ Kim."
      },
      {
        "name": "Kim Vũ Cuồng Phong",
        "power": 50,
        "mpCost": 22,
        "type": "Kim",
        "desc": "Chiêu thức nguyên tố bậc cao, gây sát thương cực lớn."
      },
      {
        "name": "Kim Loại Ngoại Xác",
        "power": 0,
        "buffDef": 30,
        "mpCost": 12,
        "type": "Kim",
        "desc": "Gia tăng 30% phòng ngự."
      }
    ]
  },
  {
    "id": 8,
    "code": "cauvong_pet_8",
    "name": "Hắc Ám Ma Nữ",
    "type": "Kim",
    "color": "#f1c40f",
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
    "evolutionTarget": 3,
    "spriteKey": "r1",
    "sprite": "./img/monsters/r1.png",
    "skills": [
      {
        "name": "Kim Kích",
        "power": 30,
        "mpCost": 10,
        "type": "Kim",
        "desc": "Tấn công gây sát thương vật lý hệ Kim."
      },
      {
        "name": "Kim Vũ Cuồng Phong",
        "power": 46,
        "mpCost": 22,
        "type": "Kim",
        "desc": "Chiêu thức nguyên tố bậc cao, gây sát thương cực lớn."
      },
      {
        "name": "Kim Loại Ngoại Xác",
        "power": 0,
        "buffDef": 30,
        "mpCost": 12,
        "type": "Kim",
        "desc": "Gia tăng 30% phòng ngự."
      }
    ]
  },
  {
    "id": 9,
    "code": "cauvong_pet_9",
    "name": "Long Kỵ Sĩ",
    "type": "Kim",
    "color": "#f1c40f",
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
    "evolutionTarget": 2,
    "spriteKey": "r2",
    "sprite": "./img/monsters/r2.png",
    "skills": [
      {
        "name": "Kim Kích",
        "power": 32,
        "mpCost": 10,
        "type": "Kim",
        "desc": "Tấn công gây sát thương vật lý hệ Kim."
      },
      {
        "name": "Kim Vũ Cuồng Phong",
        "power": 48,
        "mpCost": 22,
        "type": "Kim",
        "desc": "Chiêu thức nguyên tố bậc cao, gây sát thương cực lớn."
      },
      {
        "name": "Kim Loại Ngoại Xác",
        "power": 0,
        "buffDef": 30,
        "mpCost": 12,
        "type": "Kim",
        "desc": "Gia tăng 30% phòng ngự."
      }
    ]
  },
  {
    "id": 10,
    "code": "cauvong_pet_10",
    "name": "Kiếm Thánh Hoàng Kim",
    "type": "Kim",
    "color": "#f1c40f",
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
    "evolutionTarget": null,
    "spriteKey": "r3",
    "sprite": "./img/monsters/r3.png",
    "skills": [
      {
        "name": "Kim Kích",
        "power": 33,
        "mpCost": 10,
        "type": "Kim",
        "desc": "Tấn công gây sát thương vật lý hệ Kim."
      },
      {
        "name": "Kim Vũ Cuồng Phong",
        "power": 50,
        "mpCost": 22,
        "type": "Kim",
        "desc": "Chiêu thức nguyên tố bậc cao, gây sát thương cực lớn."
      },
      {
        "name": "Kim Loại Ngoại Xác",
        "power": 0,
        "buffDef": 30,
        "mpCost": 12,
        "type": "Kim",
        "desc": "Gia tăng 30% phòng ngự."
      }
    ]
  },
  {
    "id": 11,
    "code": "cauvong_pet_11",
    "name": "Cuồng Đao Ma Tộc",
    "type": "Kim",
    "color": "#f1c40f",
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
    "evolutionTarget": 3,
    "spriteKey": "r4",
    "sprite": "./img/monsters/r4.png",
    "skills": [
      {
        "name": "Kim Kích",
        "power": 30,
        "mpCost": 10,
        "type": "Kim",
        "desc": "Tấn công gây sát thương vật lý hệ Kim."
      },
      {
        "name": "Kim Vũ Cuồng Phong",
        "power": 46,
        "mpCost": 22,
        "type": "Kim",
        "desc": "Chiêu thức nguyên tố bậc cao, gây sát thương cực lớn."
      },
      {
        "name": "Kim Loại Ngoại Xác",
        "power": 0,
        "buffDef": 30,
        "mpCost": 12,
        "type": "Kim",
        "desc": "Gia tăng 30% phòng ngự."
      }
    ]
  },
  {
    "id": 12,
    "code": "cauvong_pet_12",
    "name": "Băng Tuyết Tiên Nữ",
    "type": "Kim",
    "color": "#f1c40f",
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
    "evolutionTarget": 2,
    "spriteKey": "r5",
    "sprite": "./img/monsters/r5.png",
    "skills": [
      {
        "name": "Kim Kích",
        "power": 32,
        "mpCost": 10,
        "type": "Kim",
        "desc": "Tấn công gây sát thương vật lý hệ Kim."
      },
      {
        "name": "Kim Vũ Cuồng Phong",
        "power": 48,
        "mpCost": 22,
        "type": "Kim",
        "desc": "Chiêu thức nguyên tố bậc cao, gây sát thương cực lớn."
      },
      {
        "name": "Kim Loại Ngoại Xác",
        "power": 0,
        "buffDef": 30,
        "mpCost": 12,
        "type": "Kim",
        "desc": "Gia tăng 30% phòng ngự."
      }
    ]
  },
  {
    "id": 13,
    "code": "cauvong_pet_13",
    "name": "Tiểu Hỏa Kỳ Lân",
    "type": "Kim",
    "color": "#f1c40f",
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
    "evolutionTarget": null,
    "spriteKey": "npc2_1",
    "sprite": "./img/monsters/npc2_1.png",
    "skills": [
      {
        "name": "Kim Kích",
        "power": 33,
        "mpCost": 10,
        "type": "Kim",
        "desc": "Tấn công gây sát thương vật lý hệ Kim."
      },
      {
        "name": "Kim Vũ Cuồng Phong",
        "power": 50,
        "mpCost": 22,
        "type": "Kim",
        "desc": "Chiêu thức nguyên tố bậc cao, gây sát thương cực lớn."
      },
      {
        "name": "Kim Loại Ngoại Xác",
        "power": 0,
        "buffDef": 30,
        "mpCost": 12,
        "type": "Kim",
        "desc": "Gia tăng 30% phòng ngự."
      }
    ]
  },
  {
    "id": 14,
    "code": "cauvong_pet_14",
    "name": "Tiểu Giác Quy",
    "type": "Kim",
    "color": "#f1c40f",
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
    "evolutionTarget": null,
    "spriteKey": "npc2_2",
    "sprite": "./img/monsters/npc2_2.png",
    "skills": [
      {
        "name": "Kim Kích",
        "power": 30,
        "mpCost": 10,
        "type": "Kim",
        "desc": "Tấn công gây sát thương vật lý hệ Kim."
      },
      {
        "name": "Kim Vũ Cuồng Phong",
        "power": 46,
        "mpCost": 22,
        "type": "Kim",
        "desc": "Chiêu thức nguyên tố bậc cao, gây sát thương cực lớn."
      },
      {
        "name": "Kim Loại Ngoại Xác",
        "power": 0,
        "buffDef": 30,
        "mpCost": 12,
        "type": "Kim",
        "desc": "Gia tăng 30% phòng ngự."
      }
    ]
  },
  {
    "id": 15,
    "code": "cauvong_pet_15",
    "name": "Tiểu Miêu Thảo",
    "type": "Kim",
    "color": "#f1c40f",
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
    "evolutionTarget": null,
    "spriteKey": "npc2_3",
    "sprite": "./img/monsters/npc2_3.png",
    "skills": [
      {
        "name": "Kim Kích",
        "power": 32,
        "mpCost": 10,
        "type": "Kim",
        "desc": "Tấn công gây sát thương vật lý hệ Kim."
      },
      {
        "name": "Kim Vũ Cuồng Phong",
        "power": 48,
        "mpCost": 22,
        "type": "Kim",
        "desc": "Chiêu thức nguyên tố bậc cao, gây sát thương cực lớn."
      },
      {
        "name": "Kim Loại Ngoại Xác",
        "power": 0,
        "buffDef": 30,
        "mpCost": 12,
        "type": "Kim",
        "desc": "Gia tăng 30% phòng ngự."
      }
    ]
  },
  {
    "id": 16,
    "code": "cauvong_pet_16",
    "name": "Lôi Điện Hồ Ly",
    "type": "Kim",
    "color": "#f1c40f",
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
    "evolutionTarget": null,
    "spriteKey": "npc2_4",
    "sprite": "./img/monsters/npc2_4.png",
    "skills": [
      {
        "name": "Kim Kích",
        "power": 33,
        "mpCost": 10,
        "type": "Kim",
        "desc": "Tấn công gây sát thương vật lý hệ Kim."
      },
      {
        "name": "Kim Vũ Cuồng Phong",
        "power": 50,
        "mpCost": 22,
        "type": "Kim",
        "desc": "Chiêu thức nguyên tố bậc cao, gây sát thương cực lớn."
      },
      {
        "name": "Kim Loại Ngoại Xác",
        "power": 0,
        "buffDef": 30,
        "mpCost": 12,
        "type": "Kim",
        "desc": "Gia tăng 30% phòng ngự."
      }
    ]
  },
  {
    "id": 17,
    "code": "cauvong_pet_17",
    "name": "Bạch Kim Long",
    "type": "Kim",
    "color": "#f1c40f",
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
    "evolutionTarget": null,
    "spriteKey": "npc2_5",
    "sprite": "./img/monsters/npc2_5.png",
    "skills": [
      {
        "name": "Kim Kích",
        "power": 33,
        "mpCost": 10,
        "type": "Kim",
        "desc": "Tấn công gây sát thương vật lý hệ Kim."
      },
      {
        "name": "Kim Vũ Cuồng Phong",
        "power": 50,
        "mpCost": 22,
        "type": "Kim",
        "desc": "Chiêu thức nguyên tố bậc cao, gây sát thương cực lớn."
      },
      {
        "name": "Kim Loại Ngoại Xác",
        "power": 0,
        "buffDef": 30,
        "mpCost": 12,
        "type": "Kim",
        "desc": "Gia tăng 30% phòng ngự."
      }
    ]
  },
  {
    "id": 18,
    "code": "cauvong_pet_18",
    "name": "Ấu Long Thần",
    "type": "Mộc",
    "color": "#2ecc71",
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
    "evolutionTarget": 4,
    "spriteKey": "npc2_6",
    "sprite": "./img/monsters/npc2_6.png",
    "skills": [
      {
        "name": "Mộc Kích",
        "power": 32,
        "mpCost": 10,
        "type": "Mộc",
        "desc": "Tấn công gây sát thương vật lý hệ Mộc."
      },
      {
        "name": "Mộc Vũ Cuồng Phong",
        "power": 48,
        "mpCost": 22,
        "type": "Mộc",
        "desc": "Chiêu thức nguyên tố bậc cao, gây sát thương cực lớn."
      }
    ]
  },
  {
    "id": 19,
    "code": "cauvong_pet_19",
    "name": "Kình Ngư Vương",
    "type": "Mộc",
    "color": "#2ecc71",
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
    "evolutionTarget": 3,
    "spriteKey": "npc2_7",
    "sprite": "./img/monsters/npc2_7.png",
    "skills": [
      {
        "name": "Mộc Kích",
        "power": 33,
        "mpCost": 10,
        "type": "Mộc",
        "desc": "Tấn công gây sát thương vật lý hệ Mộc."
      },
      {
        "name": "Mộc Vũ Cuồng Phong",
        "power": 50,
        "mpCost": 22,
        "type": "Mộc",
        "desc": "Chiêu thức nguyên tố bậc cao, gây sát thương cực lớn."
      }
    ]
  },
  {
    "id": 20,
    "code": "cauvong_pet_20",
    "name": "Thủy Tinh Hồng Ngưu",
    "type": "Mộc",
    "color": "#2ecc71",
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
    "evolutionTarget": 2,
    "spriteKey": "npc2_8",
    "sprite": "./img/monsters/npc2_8.png",
    "skills": [
      {
        "name": "Mộc Kích",
        "power": 35,
        "mpCost": 10,
        "type": "Mộc",
        "desc": "Tấn công gây sát thương vật lý hệ Mộc."
      },
      {
        "name": "Mộc Vũ Cuồng Phong",
        "power": 52,
        "mpCost": 22,
        "type": "Mộc",
        "desc": "Chiêu thức nguyên tố bậc cao, gây sát thương cực lớn."
      }
    ]
  },
  {
    "id": 21,
    "code": "cauvong_pet_21",
    "name": "Đao Thương Tướng",
    "type": "Mộc",
    "color": "#2ecc71",
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
    "evolutionTarget": null,
    "spriteKey": "npc2_9",
    "sprite": "./img/monsters/npc2_9.png",
    "skills": [
      {
        "name": "Mộc Kích",
        "power": 36,
        "mpCost": 10,
        "type": "Mộc",
        "desc": "Tấn công gây sát thương vật lý hệ Mộc."
      },
      {
        "name": "Mộc Vũ Cuồng Phong",
        "power": 54,
        "mpCost": 22,
        "type": "Mộc",
        "desc": "Chiêu thức nguyên tố bậc cao, gây sát thương cực lớn."
      }
    ]
  },
  {
    "id": 22,
    "code": "cauvong_pet_22",
    "name": "Thiên Mã Vương",
    "type": "Mộc",
    "color": "#2ecc71",
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
    "evolutionTarget": 3,
    "spriteKey": "npc2_10",
    "sprite": "./img/monsters/npc2_10.png",
    "skills": [
      {
        "name": "Mộc Kích",
        "power": 32,
        "mpCost": 10,
        "type": "Mộc",
        "desc": "Tấn công gây sát thương vật lý hệ Mộc."
      },
      {
        "name": "Mộc Vũ Cuồng Phong",
        "power": 48,
        "mpCost": 22,
        "type": "Mộc",
        "desc": "Chiêu thức nguyên tố bậc cao, gây sát thương cực lớn."
      }
    ]
  },
  {
    "id": 23,
    "code": "cauvong_pet_23",
    "name": "Xích Kim Xà Hậu",
    "type": "Mộc",
    "color": "#2ecc71",
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
    "evolutionTarget": 2,
    "spriteKey": "npc2_11",
    "sprite": "./img/monsters/npc2_11.png",
    "skills": [
      {
        "name": "Mộc Kích",
        "power": 33,
        "mpCost": 10,
        "type": "Mộc",
        "desc": "Tấn công gây sát thương vật lý hệ Mộc."
      },
      {
        "name": "Mộc Vũ Cuồng Phong",
        "power": 50,
        "mpCost": 22,
        "type": "Mộc",
        "desc": "Chiêu thức nguyên tố bậc cao, gây sát thương cực lớn."
      }
    ]
  },
  {
    "id": 24,
    "code": "cauvong_pet_24",
    "name": "Hỏa Diễm Tước",
    "type": "Mộc",
    "color": "#2ecc71",
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
    "evolutionTarget": null,
    "spriteKey": "npc2_12",
    "sprite": "./img/monsters/npc2_12.png",
    "skills": [
      {
        "name": "Mộc Kích",
        "power": 35,
        "mpCost": 10,
        "type": "Mộc",
        "desc": "Tấn công gây sát thương vật lý hệ Mộc."
      },
      {
        "name": "Mộc Vũ Cuồng Phong",
        "power": 52,
        "mpCost": 22,
        "type": "Mộc",
        "desc": "Chiêu thức nguyên tố bậc cao, gây sát thương cực lớn."
      }
    ]
  },
  {
    "id": 25,
    "code": "cauvong_pet_25",
    "name": "Băng Giáp Tê Giác",
    "type": "Mộc",
    "color": "#2ecc71",
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
    "evolutionTarget": null,
    "spriteKey": "npc2_13",
    "sprite": "./img/monsters/npc2_13.png",
    "skills": [
      {
        "name": "Mộc Kích",
        "power": 35,
        "mpCost": 10,
        "type": "Mộc",
        "desc": "Tấn công gây sát thương vật lý hệ Mộc."
      },
      {
        "name": "Mộc Vũ Cuồng Phong",
        "power": 52,
        "mpCost": 22,
        "type": "Mộc",
        "desc": "Chiêu thức nguyên tố bậc cao, gây sát thương cực lớn."
      }
    ]
  },
  {
    "id": 26,
    "code": "cauvong_pet_26",
    "name": "Độc Giác Mã",
    "type": "Mộc",
    "color": "#2ecc71",
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
    "evolutionTarget": 3,
    "spriteKey": "npc2_14",
    "sprite": "./img/monsters/npc2_14.png",
    "skills": [
      {
        "name": "Mộc Kích",
        "power": 32,
        "mpCost": 10,
        "type": "Mộc",
        "desc": "Tấn công gây sát thương vật lý hệ Mộc."
      },
      {
        "name": "Mộc Vũ Cuồng Phong",
        "power": 48,
        "mpCost": 22,
        "type": "Mộc",
        "desc": "Chiêu thức nguyên tố bậc cao, gây sát thương cực lớn."
      }
    ]
  },
  {
    "id": 27,
    "code": "cauvong_pet_27",
    "name": "Bạch Lân Cự Mãng",
    "type": "Mộc",
    "color": "#2ecc71",
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
    "evolutionTarget": 2,
    "spriteKey": "npc2_15",
    "sprite": "./img/monsters/npc2_15.png",
    "skills": [
      {
        "name": "Mộc Kích",
        "power": 33,
        "mpCost": 10,
        "type": "Mộc",
        "desc": "Tấn công gây sát thương vật lý hệ Mộc."
      },
      {
        "name": "Mộc Vũ Cuồng Phong",
        "power": 50,
        "mpCost": 22,
        "type": "Mộc",
        "desc": "Chiêu thức nguyên tố bậc cao, gây sát thương cực lớn."
      }
    ]
  },
  {
    "id": 28,
    "code": "cauvong_pet_28",
    "name": "Hắc Giáp Bọ Hung",
    "type": "Mộc",
    "color": "#2ecc71",
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
    "evolutionTarget": null,
    "spriteKey": "npc2_16",
    "sprite": "./img/monsters/npc2_16.png",
    "skills": [
      {
        "name": "Mộc Kích",
        "power": 33,
        "mpCost": 10,
        "type": "Mộc",
        "desc": "Tấn công gây sát thương vật lý hệ Mộc."
      },
      {
        "name": "Mộc Vũ Cuồng Phong",
        "power": 50,
        "mpCost": 22,
        "type": "Mộc",
        "desc": "Chiêu thức nguyên tố bậc cao, gây sát thương cực lớn."
      }
    ]
  },
  {
    "id": 29,
    "code": "cauvong_pet_29",
    "name": "Hoàng Kim Sư Tử",
    "type": "Mộc",
    "color": "#2ecc71",
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
    "evolutionTarget": null,
    "spriteKey": "npc2_17",
    "sprite": "./img/monsters/npc2_17.png",
    "skills": [
      {
        "name": "Mộc Kích",
        "power": 35,
        "mpCost": 10,
        "type": "Mộc",
        "desc": "Tấn công gây sát thương vật lý hệ Mộc."
      },
      {
        "name": "Mộc Vũ Cuồng Phong",
        "power": 52,
        "mpCost": 22,
        "type": "Mộc",
        "desc": "Chiêu thức nguyên tố bậc cao, gây sát thương cực lớn."
      }
    ]
  },
  {
    "id": 30,
    "code": "cauvong_pet_30",
    "name": "Vũ Dực Điêu",
    "type": "Mộc",
    "color": "#2ecc71",
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
    "evolutionTarget": null,
    "spriteKey": "npc2_18",
    "sprite": "./img/monsters/npc2_18.png",
    "skills": [
      {
        "name": "Mộc Kích",
        "power": 35,
        "mpCost": 10,
        "type": "Mộc",
        "desc": "Tấn công gây sát thương vật lý hệ Mộc."
      },
      {
        "name": "Mộc Vũ Cuồng Phong",
        "power": 52,
        "mpCost": 22,
        "type": "Mộc",
        "desc": "Chiêu thức nguyên tố bậc cao, gây sát thương cực lớn."
      }
    ]
  },
  {
    "id": 31,
    "code": "cauvong_pet_31",
    "name": "Sủng Vật #31 (Mộc)",
    "type": "Mộc",
    "color": "#2ecc71",
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
    "evolutionTarget": 3,
    "spriteKey": "npc2_19",
    "sprite": "./img/monsters/npc2_19.png",
    "skills": [
      {
        "name": "Mộc Kích",
        "power": 32,
        "mpCost": 10,
        "type": "Mộc",
        "desc": "Tấn công gây sát thương vật lý hệ Mộc."
      },
      {
        "name": "Mộc Vũ Cuồng Phong",
        "power": 48,
        "mpCost": 22,
        "type": "Mộc",
        "desc": "Chiêu thức nguyên tố bậc cao, gây sát thương cực lớn."
      }
    ]
  },
  {
    "id": 32,
    "code": "cauvong_pet_32",
    "name": "Sủng Vật #32 (Mộc)",
    "type": "Mộc",
    "color": "#2ecc71",
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
    "evolutionTarget": 2,
    "spriteKey": "npc2_20",
    "sprite": "./img/monsters/npc2_20.png",
    "skills": [
      {
        "name": "Mộc Kích",
        "power": 33,
        "mpCost": 10,
        "type": "Mộc",
        "desc": "Tấn công gây sát thương vật lý hệ Mộc."
      },
      {
        "name": "Mộc Vũ Cuồng Phong",
        "power": 50,
        "mpCost": 22,
        "type": "Mộc",
        "desc": "Chiêu thức nguyên tố bậc cao, gây sát thương cực lớn."
      }
    ]
  },
  {
    "id": 33,
    "code": "cauvong_pet_33",
    "name": "Sủng Vật #33 (Mộc)",
    "type": "Mộc",
    "color": "#2ecc71",
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
    "evolutionTarget": null,
    "spriteKey": "npc2_21",
    "sprite": "./img/monsters/npc2_21.png",
    "skills": [
      {
        "name": "Mộc Kích",
        "power": 35,
        "mpCost": 10,
        "type": "Mộc",
        "desc": "Tấn công gây sát thương vật lý hệ Mộc."
      },
      {
        "name": "Mộc Vũ Cuồng Phong",
        "power": 52,
        "mpCost": 22,
        "type": "Mộc",
        "desc": "Chiêu thức nguyên tố bậc cao, gây sát thương cực lớn."
      }
    ]
  },
  {
    "id": 34,
    "code": "cauvong_pet_34",
    "name": "Sủng Vật #34 (Mộc)",
    "type": "Mộc",
    "color": "#2ecc71",
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
    "evolutionTarget": null,
    "spriteKey": "npc2_22",
    "sprite": "./img/monsters/npc2_22.png",
    "skills": [
      {
        "name": "Mộc Kích",
        "power": 35,
        "mpCost": 10,
        "type": "Mộc",
        "desc": "Tấn công gây sát thương vật lý hệ Mộc."
      },
      {
        "name": "Mộc Vũ Cuồng Phong",
        "power": 52,
        "mpCost": 22,
        "type": "Mộc",
        "desc": "Chiêu thức nguyên tố bậc cao, gây sát thương cực lớn."
      }
    ]
  },
  {
    "id": 35,
    "code": "cauvong_pet_35",
    "name": "Sủng Vật #35 (Mộc)",
    "type": "Mộc",
    "color": "#2ecc71",
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
    "evolutionTarget": 2,
    "spriteKey": "npc2_23",
    "sprite": "./img/monsters/npc2_23.png",
    "skills": [
      {
        "name": "Mộc Kích",
        "power": 32,
        "mpCost": 10,
        "type": "Mộc",
        "desc": "Tấn công gây sát thương vật lý hệ Mộc."
      },
      {
        "name": "Mộc Vũ Cuồng Phong",
        "power": 48,
        "mpCost": 22,
        "type": "Mộc",
        "desc": "Chiêu thức nguyên tố bậc cao, gây sát thương cực lớn."
      }
    ]
  },
  {
    "id": 36,
    "code": "cauvong_pet_36",
    "name": "Sủng Vật #36 (Mộc)",
    "type": "Mộc",
    "color": "#2ecc71",
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
    "evolutionTarget": null,
    "spriteKey": "npc2_24",
    "sprite": "./img/monsters/npc2_24.png",
    "skills": [
      {
        "name": "Mộc Kích",
        "power": 35,
        "mpCost": 10,
        "type": "Mộc",
        "desc": "Tấn công gây sát thương vật lý hệ Mộc."
      },
      {
        "name": "Mộc Vũ Cuồng Phong",
        "power": 52,
        "mpCost": 22,
        "type": "Mộc",
        "desc": "Chiêu thức nguyên tố bậc cao, gây sát thương cực lớn."
      }
    ]
  },
  {
    "id": 37,
    "code": "cauvong_pet_37",
    "name": "Sủng Vật #37 (Thủy)",
    "type": "Thủy",
    "color": "#3498db",
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
    "evolutionTarget": 4,
    "spriteKey": "npc2_25",
    "sprite": "./img/monsters/npc2_25.png",
    "skills": [
      {
        "name": "Thủy Kích",
        "power": 30,
        "mpCost": 10,
        "type": "Thủy",
        "desc": "Tấn công gây sát thương vật lý hệ Thủy."
      },
      {
        "name": "Thủy Vũ Cuồng Phong",
        "power": 46,
        "mpCost": 22,
        "type": "Thủy",
        "desc": "Chiêu thức nguyên tố bậc cao, gây sát thương cực lớn."
      },
      {
        "name": "Thủy Liệu Thuật",
        "power": 0,
        "heal": 35,
        "mpCost": 15,
        "type": "Thủy",
        "desc": "Hồi phục 35% lượng sinh mệnh."
      }
    ]
  },
  {
    "id": 38,
    "code": "cauvong_pet_38",
    "name": "Sủng Vật #38 (Thủy)",
    "type": "Thủy",
    "color": "#3498db",
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
    "evolutionTarget": 3,
    "spriteKey": "npc2_26",
    "sprite": "./img/monsters/npc2_26.png",
    "skills": [
      {
        "name": "Thủy Kích",
        "power": 32,
        "mpCost": 10,
        "type": "Thủy",
        "desc": "Tấn công gây sát thương vật lý hệ Thủy."
      },
      {
        "name": "Thủy Vũ Cuồng Phong",
        "power": 48,
        "mpCost": 22,
        "type": "Thủy",
        "desc": "Chiêu thức nguyên tố bậc cao, gây sát thương cực lớn."
      },
      {
        "name": "Thủy Liệu Thuật",
        "power": 0,
        "heal": 35,
        "mpCost": 15,
        "type": "Thủy",
        "desc": "Hồi phục 35% lượng sinh mệnh."
      }
    ]
  },
  {
    "id": 39,
    "code": "cauvong_pet_39",
    "name": "Sủng Vật #39 (Thủy)",
    "type": "Thủy",
    "color": "#3498db",
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
    "evolutionTarget": 2,
    "spriteKey": "npc2_27",
    "sprite": "./img/monsters/npc2_27.png",
    "skills": [
      {
        "name": "Thủy Kích",
        "power": 33,
        "mpCost": 10,
        "type": "Thủy",
        "desc": "Tấn công gây sát thương vật lý hệ Thủy."
      },
      {
        "name": "Thủy Vũ Cuồng Phong",
        "power": 50,
        "mpCost": 22,
        "type": "Thủy",
        "desc": "Chiêu thức nguyên tố bậc cao, gây sát thương cực lớn."
      },
      {
        "name": "Thủy Liệu Thuật",
        "power": 0,
        "heal": 35,
        "mpCost": 15,
        "type": "Thủy",
        "desc": "Hồi phục 35% lượng sinh mệnh."
      }
    ]
  },
  {
    "id": 40,
    "code": "cauvong_pet_40",
    "name": "Sủng Vật #40 (Thủy)",
    "type": "Thủy",
    "color": "#3498db",
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
    "evolutionTarget": null,
    "spriteKey": "npc2_28",
    "sprite": "./img/monsters/npc2_28.png",
    "skills": [
      {
        "name": "Thủy Kích",
        "power": 35,
        "mpCost": 10,
        "type": "Thủy",
        "desc": "Tấn công gây sát thương vật lý hệ Thủy."
      },
      {
        "name": "Thủy Vũ Cuồng Phong",
        "power": 52,
        "mpCost": 22,
        "type": "Thủy",
        "desc": "Chiêu thức nguyên tố bậc cao, gây sát thương cực lớn."
      },
      {
        "name": "Thủy Liệu Thuật",
        "power": 0,
        "heal": 35,
        "mpCost": 15,
        "type": "Thủy",
        "desc": "Hồi phục 35% lượng sinh mệnh."
      }
    ]
  },
  {
    "id": 41,
    "code": "cauvong_pet_41",
    "name": "Sủng Vật #41 (Thủy)",
    "type": "Thủy",
    "color": "#3498db",
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
    "evolutionTarget": 3,
    "spriteKey": "npc2_29",
    "sprite": "./img/monsters/npc2_29.png",
    "skills": [
      {
        "name": "Thủy Kích",
        "power": 30,
        "mpCost": 10,
        "type": "Thủy",
        "desc": "Tấn công gây sát thương vật lý hệ Thủy."
      },
      {
        "name": "Thủy Vũ Cuồng Phong",
        "power": 46,
        "mpCost": 22,
        "type": "Thủy",
        "desc": "Chiêu thức nguyên tố bậc cao, gây sát thương cực lớn."
      },
      {
        "name": "Thủy Liệu Thuật",
        "power": 0,
        "heal": 35,
        "mpCost": 15,
        "type": "Thủy",
        "desc": "Hồi phục 35% lượng sinh mệnh."
      }
    ]
  },
  {
    "id": 42,
    "code": "cauvong_pet_42",
    "name": "Sủng Vật #42 (Thủy)",
    "type": "Thủy",
    "color": "#3498db",
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
    "evolutionTarget": 2,
    "spriteKey": "npc2_30",
    "sprite": "./img/monsters/npc2_30.png",
    "skills": [
      {
        "name": "Thủy Kích",
        "power": 32,
        "mpCost": 10,
        "type": "Thủy",
        "desc": "Tấn công gây sát thương vật lý hệ Thủy."
      },
      {
        "name": "Thủy Vũ Cuồng Phong",
        "power": 48,
        "mpCost": 22,
        "type": "Thủy",
        "desc": "Chiêu thức nguyên tố bậc cao, gây sát thương cực lớn."
      },
      {
        "name": "Thủy Liệu Thuật",
        "power": 0,
        "heal": 35,
        "mpCost": 15,
        "type": "Thủy",
        "desc": "Hồi phục 35% lượng sinh mệnh."
      }
    ]
  },
  {
    "id": 43,
    "code": "cauvong_pet_43",
    "name": "Sủng Vật #43 (Thủy)",
    "type": "Thủy",
    "color": "#3498db",
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
    "evolutionTarget": null,
    "spriteKey": "npc2_31",
    "sprite": "./img/monsters/npc2_31.png",
    "skills": [
      {
        "name": "Thủy Kích",
        "power": 33,
        "mpCost": 10,
        "type": "Thủy",
        "desc": "Tấn công gây sát thương vật lý hệ Thủy."
      },
      {
        "name": "Thủy Vũ Cuồng Phong",
        "power": 50,
        "mpCost": 22,
        "type": "Thủy",
        "desc": "Chiêu thức nguyên tố bậc cao, gây sát thương cực lớn."
      },
      {
        "name": "Thủy Liệu Thuật",
        "power": 0,
        "heal": 35,
        "mpCost": 15,
        "type": "Thủy",
        "desc": "Hồi phục 35% lượng sinh mệnh."
      }
    ]
  },
  {
    "id": 44,
    "code": "cauvong_pet_44",
    "name": "Sủng Vật #44 (Thủy)",
    "type": "Thủy",
    "color": "#3498db",
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
    "evolutionTarget": 3,
    "spriteKey": "npc2_32",
    "sprite": "./img/monsters/npc2_32.png",
    "skills": [
      {
        "name": "Thủy Kích",
        "power": 30,
        "mpCost": 10,
        "type": "Thủy",
        "desc": "Tấn công gây sát thương vật lý hệ Thủy."
      },
      {
        "name": "Thủy Vũ Cuồng Phong",
        "power": 46,
        "mpCost": 22,
        "type": "Thủy",
        "desc": "Chiêu thức nguyên tố bậc cao, gây sát thương cực lớn."
      },
      {
        "name": "Thủy Liệu Thuật",
        "power": 0,
        "heal": 35,
        "mpCost": 15,
        "type": "Thủy",
        "desc": "Hồi phục 35% lượng sinh mệnh."
      }
    ]
  },
  {
    "id": 45,
    "code": "cauvong_pet_45",
    "name": "Sủng Vật #45 (Thủy)",
    "type": "Thủy",
    "color": "#3498db",
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
    "evolutionTarget": 2,
    "spriteKey": "npc2_33",
    "sprite": "./img/monsters/npc2_33.png",
    "skills": [
      {
        "name": "Thủy Kích",
        "power": 32,
        "mpCost": 10,
        "type": "Thủy",
        "desc": "Tấn công gây sát thương vật lý hệ Thủy."
      },
      {
        "name": "Thủy Vũ Cuồng Phong",
        "power": 48,
        "mpCost": 22,
        "type": "Thủy",
        "desc": "Chiêu thức nguyên tố bậc cao, gây sát thương cực lớn."
      },
      {
        "name": "Thủy Liệu Thuật",
        "power": 0,
        "heal": 35,
        "mpCost": 15,
        "type": "Thủy",
        "desc": "Hồi phục 35% lượng sinh mệnh."
      }
    ]
  },
  {
    "id": 46,
    "code": "cauvong_pet_46",
    "name": "Sủng Vật #46 (Thủy)",
    "type": "Thủy",
    "color": "#3498db",
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
    "evolutionTarget": null,
    "spriteKey": "npc2_34",
    "sprite": "./img/monsters/npc2_34.png",
    "skills": [
      {
        "name": "Thủy Kích",
        "power": 33,
        "mpCost": 10,
        "type": "Thủy",
        "desc": "Tấn công gây sát thương vật lý hệ Thủy."
      },
      {
        "name": "Thủy Vũ Cuồng Phong",
        "power": 50,
        "mpCost": 22,
        "type": "Thủy",
        "desc": "Chiêu thức nguyên tố bậc cao, gây sát thương cực lớn."
      },
      {
        "name": "Thủy Liệu Thuật",
        "power": 0,
        "heal": 35,
        "mpCost": 15,
        "type": "Thủy",
        "desc": "Hồi phục 35% lượng sinh mệnh."
      }
    ]
  },
  {
    "id": 47,
    "code": "cauvong_pet_47",
    "name": "Sủng Vật #47 (Thủy)",
    "type": "Thủy",
    "color": "#3498db",
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
    "evolutionTarget": null,
    "spriteKey": "npc2_35",
    "sprite": "./img/monsters/npc2_35.png",
    "skills": [
      {
        "name": "Thủy Kích",
        "power": 30,
        "mpCost": 10,
        "type": "Thủy",
        "desc": "Tấn công gây sát thương vật lý hệ Thủy."
      },
      {
        "name": "Thủy Vũ Cuồng Phong",
        "power": 46,
        "mpCost": 22,
        "type": "Thủy",
        "desc": "Chiêu thức nguyên tố bậc cao, gây sát thương cực lớn."
      },
      {
        "name": "Thủy Liệu Thuật",
        "power": 0,
        "heal": 35,
        "mpCost": 15,
        "type": "Thủy",
        "desc": "Hồi phục 35% lượng sinh mệnh."
      }
    ]
  },
  {
    "id": 48,
    "code": "cauvong_pet_48",
    "name": "Sủng Vật #48 (Thủy)",
    "type": "Thủy",
    "color": "#3498db",
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
    "evolutionTarget": null,
    "spriteKey": "npc2_36",
    "sprite": "./img/monsters/npc2_36.png",
    "skills": [
      {
        "name": "Thủy Kích",
        "power": 32,
        "mpCost": 10,
        "type": "Thủy",
        "desc": "Tấn công gây sát thương vật lý hệ Thủy."
      },
      {
        "name": "Thủy Vũ Cuồng Phong",
        "power": 48,
        "mpCost": 22,
        "type": "Thủy",
        "desc": "Chiêu thức nguyên tố bậc cao, gây sát thương cực lớn."
      },
      {
        "name": "Thủy Liệu Thuật",
        "power": 0,
        "heal": 35,
        "mpCost": 15,
        "type": "Thủy",
        "desc": "Hồi phục 35% lượng sinh mệnh."
      }
    ]
  },
  {
    "id": 49,
    "code": "cauvong_pet_49",
    "name": "Sủng Vật #49 (Thủy)",
    "type": "Thủy",
    "color": "#3498db",
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
    "evolutionTarget": null,
    "spriteKey": "npc2_37",
    "sprite": "./img/monsters/npc2_37.png",
    "skills": [
      {
        "name": "Thủy Kích",
        "power": 33,
        "mpCost": 10,
        "type": "Thủy",
        "desc": "Tấn công gây sát thương vật lý hệ Thủy."
      },
      {
        "name": "Thủy Vũ Cuồng Phong",
        "power": 50,
        "mpCost": 22,
        "type": "Thủy",
        "desc": "Chiêu thức nguyên tố bậc cao, gây sát thương cực lớn."
      },
      {
        "name": "Thủy Liệu Thuật",
        "power": 0,
        "heal": 35,
        "mpCost": 15,
        "type": "Thủy",
        "desc": "Hồi phục 35% lượng sinh mệnh."
      }
    ]
  },
  {
    "id": 50,
    "code": "cauvong_pet_50",
    "name": "Sủng Vật #50 (Thủy)",
    "type": "Thủy",
    "color": "#3498db",
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
    "evolutionTarget": 2,
    "spriteKey": "npc2_38",
    "sprite": "./img/monsters/npc2_38.png",
    "skills": [
      {
        "name": "Thủy Kích",
        "power": 32,
        "mpCost": 10,
        "type": "Thủy",
        "desc": "Tấn công gây sát thương vật lý hệ Thủy."
      },
      {
        "name": "Thủy Vũ Cuồng Phong",
        "power": 48,
        "mpCost": 22,
        "type": "Thủy",
        "desc": "Chiêu thức nguyên tố bậc cao, gây sát thương cực lớn."
      },
      {
        "name": "Thủy Liệu Thuật",
        "power": 0,
        "heal": 35,
        "mpCost": 15,
        "type": "Thủy",
        "desc": "Hồi phục 35% lượng sinh mệnh."
      }
    ]
  },
  {
    "id": 51,
    "code": "cauvong_pet_51",
    "name": "Sủng Vật #51 (Thủy)",
    "type": "Thủy",
    "color": "#3498db",
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
    "evolutionTarget": null,
    "spriteKey": "npc2_39",
    "sprite": "./img/monsters/npc2_39.png",
    "skills": [
      {
        "name": "Thủy Kích",
        "power": 33,
        "mpCost": 10,
        "type": "Thủy",
        "desc": "Tấn công gây sát thương vật lý hệ Thủy."
      },
      {
        "name": "Thủy Vũ Cuồng Phong",
        "power": 50,
        "mpCost": 22,
        "type": "Thủy",
        "desc": "Chiêu thức nguyên tố bậc cao, gây sát thương cực lớn."
      },
      {
        "name": "Thủy Liệu Thuật",
        "power": 0,
        "heal": 35,
        "mpCost": 15,
        "type": "Thủy",
        "desc": "Hồi phục 35% lượng sinh mệnh."
      }
    ]
  },
  {
    "id": 52,
    "code": "cauvong_pet_52",
    "name": "Sủng Vật #52 (Thủy)",
    "type": "Thủy",
    "color": "#3498db",
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
    "evolutionTarget": null,
    "spriteKey": "npc2_40",
    "sprite": "./img/monsters/npc2_40.png",
    "skills": [
      {
        "name": "Thủy Kích",
        "power": 33,
        "mpCost": 10,
        "type": "Thủy",
        "desc": "Tấn công gây sát thương vật lý hệ Thủy."
      },
      {
        "name": "Thủy Vũ Cuồng Phong",
        "power": 50,
        "mpCost": 22,
        "type": "Thủy",
        "desc": "Chiêu thức nguyên tố bậc cao, gây sát thương cực lớn."
      },
      {
        "name": "Thủy Liệu Thuật",
        "power": 0,
        "heal": 35,
        "mpCost": 15,
        "type": "Thủy",
        "desc": "Hồi phục 35% lượng sinh mệnh."
      }
    ]
  },
  {
    "id": 53,
    "code": "cauvong_pet_53",
    "name": "Sủng Vật #53 (Hỏa)",
    "type": "Hỏa",
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
    "evolutionTarget": 4,
    "spriteKey": "npc2_41",
    "sprite": "./img/monsters/npc2_41.png",
    "skills": [
      {
        "name": "Hỏa Kích",
        "power": 32,
        "mpCost": 10,
        "type": "Hỏa",
        "desc": "Tấn công gây sát thương vật lý hệ Hỏa."
      },
      {
        "name": "Hỏa Vũ Cuồng Phong",
        "power": 48,
        "mpCost": 22,
        "type": "Hỏa",
        "desc": "Chiêu thức nguyên tố bậc cao, gây sát thương cực lớn."
      },
      {
        "name": "Hỏa Diễm Bạo Phát",
        "power": 45,
        "mpCost": 35,
        "type": "Hỏa",
        "desc": "Tấn công hủy diệt."
      }
    ]
  },
  {
    "id": 54,
    "code": "cauvong_pet_54",
    "name": "Sủng Vật #54 (Hỏa)",
    "type": "Hỏa",
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
    "evolutionTarget": 2,
    "spriteKey": "npc2_42",
    "sprite": "./img/monsters/npc2_42.png",
    "skills": [
      {
        "name": "Hỏa Kích",
        "power": 33,
        "mpCost": 10,
        "type": "Hỏa",
        "desc": "Tấn công gây sát thương vật lý hệ Hỏa."
      },
      {
        "name": "Hỏa Vũ Cuồng Phong",
        "power": 50,
        "mpCost": 22,
        "type": "Hỏa",
        "desc": "Chiêu thức nguyên tố bậc cao, gây sát thương cực lớn."
      },
      {
        "name": "Hỏa Diễm Bạo Phát",
        "power": 45,
        "mpCost": 35,
        "type": "Hỏa",
        "desc": "Tấn công hủy diệt."
      }
    ]
  },
  {
    "id": 55,
    "code": "cauvong_pet_55",
    "name": "Sủng Vật #55 (Hỏa)",
    "type": "Hỏa",
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
    "evolutionTarget": null,
    "spriteKey": "npc2_43",
    "sprite": "./img/monsters/npc2_43.png",
    "skills": [
      {
        "name": "Hỏa Kích",
        "power": 35,
        "mpCost": 10,
        "type": "Hỏa",
        "desc": "Tấn công gây sát thương vật lý hệ Hỏa."
      },
      {
        "name": "Hỏa Vũ Cuồng Phong",
        "power": 52,
        "mpCost": 22,
        "type": "Hỏa",
        "desc": "Chiêu thức nguyên tố bậc cao, gây sát thương cực lớn."
      },
      {
        "name": "Hỏa Diễm Bạo Phát",
        "power": 45,
        "mpCost": 35,
        "type": "Hỏa",
        "desc": "Tấn công hủy diệt."
      }
    ]
  },
  {
    "id": 56,
    "code": "cauvong_pet_56",
    "name": "Sủng Vật #56 (Hỏa)",
    "type": "Hỏa",
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
    "evolutionTarget": null,
    "spriteKey": "npc2_44",
    "sprite": "./img/monsters/npc2_44.png",
    "skills": [
      {
        "name": "Hỏa Kích",
        "power": 35,
        "mpCost": 10,
        "type": "Hỏa",
        "desc": "Tấn công gây sát thương vật lý hệ Hỏa."
      },
      {
        "name": "Hỏa Vũ Cuồng Phong",
        "power": 52,
        "mpCost": 22,
        "type": "Hỏa",
        "desc": "Chiêu thức nguyên tố bậc cao, gây sát thương cực lớn."
      },
      {
        "name": "Hỏa Diễm Bạo Phát",
        "power": 45,
        "mpCost": 35,
        "type": "Hỏa",
        "desc": "Tấn công hủy diệt."
      }
    ]
  },
  {
    "id": 57,
    "code": "cauvong_pet_57",
    "name": "Sủng Vật #57 (Hỏa)",
    "type": "Hỏa",
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
    "evolutionTarget": 2,
    "spriteKey": "npc2_45",
    "sprite": "./img/monsters/npc2_45.png",
    "skills": [
      {
        "name": "Hỏa Kích",
        "power": 30,
        "mpCost": 10,
        "type": "Hỏa",
        "desc": "Tấn công gây sát thương vật lý hệ Hỏa."
      },
      {
        "name": "Hỏa Vũ Cuồng Phong",
        "power": 46,
        "mpCost": 22,
        "type": "Hỏa",
        "desc": "Chiêu thức nguyên tố bậc cao, gây sát thương cực lớn."
      },
      {
        "name": "Hỏa Diễm Bạo Phát",
        "power": 45,
        "mpCost": 35,
        "type": "Hỏa",
        "desc": "Tấn công hủy diệt."
      }
    ]
  },
  {
    "id": 58,
    "code": "cauvong_pet_58",
    "name": "Sủng Vật #58 (Hỏa)",
    "type": "Hỏa",
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
    "evolutionTarget": null,
    "spriteKey": "npc2_46",
    "sprite": "./img/monsters/npc2_46.png",
    "skills": [
      {
        "name": "Hỏa Kích",
        "power": 32,
        "mpCost": 10,
        "type": "Hỏa",
        "desc": "Tấn công gây sát thương vật lý hệ Hỏa."
      },
      {
        "name": "Hỏa Vũ Cuồng Phong",
        "power": 48,
        "mpCost": 22,
        "type": "Hỏa",
        "desc": "Chiêu thức nguyên tố bậc cao, gây sát thương cực lớn."
      },
      {
        "name": "Hỏa Diễm Bạo Phát",
        "power": 45,
        "mpCost": 35,
        "type": "Hỏa",
        "desc": "Tấn công hủy diệt."
      }
    ]
  },
  {
    "id": 59,
    "code": "cauvong_pet_59",
    "name": "Sủng Vật #59 (Hỏa)",
    "type": "Hỏa",
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
    "evolutionTarget": null,
    "spriteKey": "npc2_47",
    "sprite": "./img/monsters/npc2_47.png",
    "skills": [
      {
        "name": "Hỏa Kích",
        "power": 33,
        "mpCost": 10,
        "type": "Hỏa",
        "desc": "Tấn công gây sát thương vật lý hệ Hỏa."
      },
      {
        "name": "Hỏa Vũ Cuồng Phong",
        "power": 50,
        "mpCost": 22,
        "type": "Hỏa",
        "desc": "Chiêu thức nguyên tố bậc cao, gây sát thương cực lớn."
      },
      {
        "name": "Hỏa Diễm Bạo Phát",
        "power": 45,
        "mpCost": 35,
        "type": "Hỏa",
        "desc": "Tấn công hủy diệt."
      }
    ]
  },
  {
    "id": 60,
    "code": "cauvong_pet_60",
    "name": "Sủng Vật #60 (Hỏa)",
    "type": "Hỏa",
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
    "evolutionTarget": 3,
    "spriteKey": "npc2_48",
    "sprite": "./img/monsters/npc2_48.png",
    "skills": [
      {
        "name": "Hỏa Kích",
        "power": 30,
        "mpCost": 10,
        "type": "Hỏa",
        "desc": "Tấn công gây sát thương vật lý hệ Hỏa."
      },
      {
        "name": "Hỏa Vũ Cuồng Phong",
        "power": 46,
        "mpCost": 22,
        "type": "Hỏa",
        "desc": "Chiêu thức nguyên tố bậc cao, gây sát thương cực lớn."
      },
      {
        "name": "Hỏa Diễm Bạo Phát",
        "power": 45,
        "mpCost": 35,
        "type": "Hỏa",
        "desc": "Tấn công hủy diệt."
      }
    ]
  },
  {
    "id": 61,
    "code": "cauvong_pet_61",
    "name": "Sủng Vật #61 (Hỏa)",
    "type": "Hỏa",
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
    "evolutionTarget": 2,
    "spriteKey": "npc2_49",
    "sprite": "./img/monsters/npc2_49.png",
    "skills": [
      {
        "name": "Hỏa Kích",
        "power": 32,
        "mpCost": 10,
        "type": "Hỏa",
        "desc": "Tấn công gây sát thương vật lý hệ Hỏa."
      },
      {
        "name": "Hỏa Vũ Cuồng Phong",
        "power": 48,
        "mpCost": 22,
        "type": "Hỏa",
        "desc": "Chiêu thức nguyên tố bậc cao, gây sát thương cực lớn."
      },
      {
        "name": "Hỏa Diễm Bạo Phát",
        "power": 45,
        "mpCost": 35,
        "type": "Hỏa",
        "desc": "Tấn công hủy diệt."
      }
    ]
  },
  {
    "id": 62,
    "code": "cauvong_pet_62",
    "name": "Sủng Vật #62 (Hỏa)",
    "type": "Hỏa",
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
    "evolutionTarget": null,
    "spriteKey": "npc2_50",
    "sprite": "./img/monsters/npc2_50.png",
    "skills": [
      {
        "name": "Hỏa Kích",
        "power": 33,
        "mpCost": 10,
        "type": "Hỏa",
        "desc": "Tấn công gây sát thương vật lý hệ Hỏa."
      },
      {
        "name": "Hỏa Vũ Cuồng Phong",
        "power": 50,
        "mpCost": 22,
        "type": "Hỏa",
        "desc": "Chiêu thức nguyên tố bậc cao, gây sát thương cực lớn."
      },
      {
        "name": "Hỏa Diễm Bạo Phát",
        "power": 45,
        "mpCost": 35,
        "type": "Hỏa",
        "desc": "Tấn công hủy diệt."
      }
    ]
  },
  {
    "id": 63,
    "code": "cauvong_pet_63",
    "name": "Sủng Vật #63 (Hỏa)",
    "type": "Hỏa",
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
    "evolutionTarget": null,
    "spriteKey": "npc2_51",
    "sprite": "./img/monsters/npc2_51.png",
    "skills": [
      {
        "name": "Hỏa Kích",
        "power": 33,
        "mpCost": 10,
        "type": "Hỏa",
        "desc": "Tấn công gây sát thương vật lý hệ Hỏa."
      },
      {
        "name": "Hỏa Vũ Cuồng Phong",
        "power": 50,
        "mpCost": 22,
        "type": "Hỏa",
        "desc": "Chiêu thức nguyên tố bậc cao, gây sát thương cực lớn."
      },
      {
        "name": "Hỏa Diễm Bạo Phát",
        "power": 45,
        "mpCost": 35,
        "type": "Hỏa",
        "desc": "Tấn công hủy diệt."
      }
    ]
  },
  {
    "id": 64,
    "code": "cauvong_pet_64",
    "name": "Sủng Vật #64 (Hỏa)",
    "type": "Hỏa",
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
    "evolutionTarget": 2,
    "spriteKey": "npc2_52",
    "sprite": "./img/monsters/npc2_52.png",
    "skills": [
      {
        "name": "Hỏa Kích",
        "power": 30,
        "mpCost": 10,
        "type": "Hỏa",
        "desc": "Tấn công gây sát thương vật lý hệ Hỏa."
      },
      {
        "name": "Hỏa Vũ Cuồng Phong",
        "power": 46,
        "mpCost": 22,
        "type": "Hỏa",
        "desc": "Chiêu thức nguyên tố bậc cao, gây sát thương cực lớn."
      },
      {
        "name": "Hỏa Diễm Bạo Phát",
        "power": 45,
        "mpCost": 35,
        "type": "Hỏa",
        "desc": "Tấn công hủy diệt."
      }
    ]
  },
  {
    "id": 65,
    "code": "cauvong_pet_65",
    "name": "Sủng Vật #65 (Hỏa)",
    "type": "Hỏa",
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
    "evolutionTarget": null,
    "spriteKey": "npc2_53",
    "sprite": "./img/monsters/npc2_53.png",
    "skills": [
      {
        "name": "Hỏa Kích",
        "power": 32,
        "mpCost": 10,
        "type": "Hỏa",
        "desc": "Tấn công gây sát thương vật lý hệ Hỏa."
      },
      {
        "name": "Hỏa Vũ Cuồng Phong",
        "power": 48,
        "mpCost": 22,
        "type": "Hỏa",
        "desc": "Chiêu thức nguyên tố bậc cao, gây sát thương cực lớn."
      },
      {
        "name": "Hỏa Diễm Bạo Phát",
        "power": 45,
        "mpCost": 35,
        "type": "Hỏa",
        "desc": "Tấn công hủy diệt."
      }
    ]
  },
  {
    "id": 66,
    "code": "cauvong_pet_66",
    "name": "Sủng Vật #66 (Hỏa)",
    "type": "Hỏa",
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
    "evolutionTarget": null,
    "spriteKey": "s5",
    "sprite": "./img/monsters/s5.png",
    "skills": [
      {
        "name": "Hỏa Kích",
        "power": 33,
        "mpCost": 10,
        "type": "Hỏa",
        "desc": "Tấn công gây sát thương vật lý hệ Hỏa."
      },
      {
        "name": "Hỏa Vũ Cuồng Phong",
        "power": 50,
        "mpCost": 22,
        "type": "Hỏa",
        "desc": "Chiêu thức nguyên tố bậc cao, gây sát thương cực lớn."
      },
      {
        "name": "Hỏa Diễm Bạo Phát",
        "power": 45,
        "mpCost": 35,
        "type": "Hỏa",
        "desc": "Tấn công hủy diệt."
      }
    ]
  },
  {
    "id": 67,
    "code": "cauvong_pet_67",
    "name": "Sủng Vật #67 (Hỏa)",
    "type": "Hỏa",
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
    "evolutionTarget": null,
    "spriteKey": "s0",
    "sprite": "./img/monsters/s0.png",
    "skills": [
      {
        "name": "Hỏa Kích",
        "power": 32,
        "mpCost": 10,
        "type": "Hỏa",
        "desc": "Tấn công gây sát thương vật lý hệ Hỏa."
      },
      {
        "name": "Hỏa Vũ Cuồng Phong",
        "power": 48,
        "mpCost": 22,
        "type": "Hỏa",
        "desc": "Chiêu thức nguyên tố bậc cao, gây sát thương cực lớn."
      },
      {
        "name": "Hỏa Diễm Bạo Phát",
        "power": 45,
        "mpCost": 35,
        "type": "Hỏa",
        "desc": "Tấn công hủy diệt."
      }
    ]
  },
  {
    "id": 68,
    "code": "cauvong_pet_68",
    "name": "Sủng Vật #68 (Hỏa)",
    "type": "Hỏa",
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
    "evolutionTarget": null,
    "spriteKey": "s1",
    "sprite": "./img/monsters/s1.png",
    "skills": [
      {
        "name": "Hỏa Kích",
        "power": 33,
        "mpCost": 10,
        "type": "Hỏa",
        "desc": "Tấn công gây sát thương vật lý hệ Hỏa."
      },
      {
        "name": "Hỏa Vũ Cuồng Phong",
        "power": 50,
        "mpCost": 22,
        "type": "Hỏa",
        "desc": "Chiêu thức nguyên tố bậc cao, gây sát thương cực lớn."
      },
      {
        "name": "Hỏa Diễm Bạo Phát",
        "power": 45,
        "mpCost": 35,
        "type": "Hỏa",
        "desc": "Tấn công hủy diệt."
      }
    ]
  },
  {
    "id": 69,
    "code": "cauvong_pet_69",
    "name": "Sủng Vật #69 (Thổ)",
    "type": "Thổ",
    "color": "#e67e22",
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
    "evolutionTarget": 4,
    "spriteKey": "s2",
    "sprite": "./img/monsters/s2.png",
    "skills": [
      {
        "name": "Thổ Kích",
        "power": 33,
        "mpCost": 10,
        "type": "Thổ",
        "desc": "Tấn công gây sát thương vật lý hệ Thổ."
      },
      {
        "name": "Thổ Vũ Cuồng Phong",
        "power": 50,
        "mpCost": 22,
        "type": "Thổ",
        "desc": "Chiêu thức nguyên tố bậc cao, gây sát thương cực lớn."
      }
    ]
  },
  {
    "id": 70,
    "code": "cauvong_pet_70",
    "name": "Sủng Vật #70 (Thổ)",
    "type": "Thổ",
    "color": "#e67e22",
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
    "evolutionTarget": 3,
    "spriteKey": "s3",
    "sprite": "./img/monsters/s3.png",
    "skills": [
      {
        "name": "Thổ Kích",
        "power": 35,
        "mpCost": 10,
        "type": "Thổ",
        "desc": "Tấn công gây sát thương vật lý hệ Thổ."
      },
      {
        "name": "Thổ Vũ Cuồng Phong",
        "power": 52,
        "mpCost": 22,
        "type": "Thổ",
        "desc": "Chiêu thức nguyên tố bậc cao, gây sát thương cực lớn."
      }
    ]
  },
  {
    "id": 71,
    "code": "cauvong_pet_71",
    "name": "Sủng Vật #71 (Thổ)",
    "type": "Thổ",
    "color": "#e67e22",
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
    "evolutionTarget": 2,
    "spriteKey": "s4",
    "sprite": "./img/monsters/s4.png",
    "skills": [
      {
        "name": "Thổ Kích",
        "power": 36,
        "mpCost": 10,
        "type": "Thổ",
        "desc": "Tấn công gây sát thương vật lý hệ Thổ."
      },
      {
        "name": "Thổ Vũ Cuồng Phong",
        "power": 54,
        "mpCost": 22,
        "type": "Thổ",
        "desc": "Chiêu thức nguyên tố bậc cao, gây sát thương cực lớn."
      }
    ]
  },
  {
    "id": 72,
    "code": "cauvong_pet_72",
    "name": "Sủng Vật #72 (Thổ)",
    "type": "Thổ",
    "color": "#e67e22",
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
    "evolutionTarget": null,
    "spriteKey": "s5",
    "sprite": "./img/monsters/s5.png",
    "skills": [
      {
        "name": "Thổ Kích",
        "power": 38,
        "mpCost": 10,
        "type": "Thổ",
        "desc": "Tấn công gây sát thương vật lý hệ Thổ."
      },
      {
        "name": "Thổ Vũ Cuồng Phong",
        "power": 57,
        "mpCost": 22,
        "type": "Thổ",
        "desc": "Chiêu thức nguyên tố bậc cao, gây sát thương cực lớn."
      }
    ]
  },
  {
    "id": 73,
    "code": "cauvong_pet_73",
    "name": "Sủng Vật #73 (Thổ)",
    "type": "Thổ",
    "color": "#e67e22",
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
    "evolutionTarget": 3,
    "spriteKey": "s0",
    "sprite": "./img/monsters/s0.png",
    "skills": [
      {
        "name": "Thổ Kích",
        "power": 33,
        "mpCost": 10,
        "type": "Thổ",
        "desc": "Tấn công gây sát thương vật lý hệ Thổ."
      },
      {
        "name": "Thổ Vũ Cuồng Phong",
        "power": 50,
        "mpCost": 22,
        "type": "Thổ",
        "desc": "Chiêu thức nguyên tố bậc cao, gây sát thương cực lớn."
      }
    ]
  },
  {
    "id": 74,
    "code": "cauvong_pet_74",
    "name": "Sủng Vật #74 (Thổ)",
    "type": "Thổ",
    "color": "#e67e22",
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
    "evolutionTarget": 2,
    "spriteKey": "s1",
    "sprite": "./img/monsters/s1.png",
    "skills": [
      {
        "name": "Thổ Kích",
        "power": 35,
        "mpCost": 10,
        "type": "Thổ",
        "desc": "Tấn công gây sát thương vật lý hệ Thổ."
      },
      {
        "name": "Thổ Vũ Cuồng Phong",
        "power": 52,
        "mpCost": 22,
        "type": "Thổ",
        "desc": "Chiêu thức nguyên tố bậc cao, gây sát thương cực lớn."
      }
    ]
  },
  {
    "id": 75,
    "code": "cauvong_pet_75",
    "name": "Sủng Vật #75 (Thổ)",
    "type": "Thổ",
    "color": "#e67e22",
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
    "evolutionTarget": null,
    "spriteKey": "s2",
    "sprite": "./img/monsters/s2.png",
    "skills": [
      {
        "name": "Thổ Kích",
        "power": 36,
        "mpCost": 10,
        "type": "Thổ",
        "desc": "Tấn công gây sát thương vật lý hệ Thổ."
      },
      {
        "name": "Thổ Vũ Cuồng Phong",
        "power": 54,
        "mpCost": 22,
        "type": "Thổ",
        "desc": "Chiêu thức nguyên tố bậc cao, gây sát thương cực lớn."
      }
    ]
  },
  {
    "id": 76,
    "code": "cauvong_pet_76",
    "name": "Sủng Vật #76 (Thổ)",
    "type": "Thổ",
    "color": "#e67e22",
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
    "evolutionTarget": 2,
    "spriteKey": "s3",
    "sprite": "./img/monsters/s3.png",
    "skills": [
      {
        "name": "Thổ Kích",
        "power": 33,
        "mpCost": 10,
        "type": "Thổ",
        "desc": "Tấn công gây sát thương vật lý hệ Thổ."
      },
      {
        "name": "Thổ Vũ Cuồng Phong",
        "power": 50,
        "mpCost": 22,
        "type": "Thổ",
        "desc": "Chiêu thức nguyên tố bậc cao, gây sát thương cực lớn."
      }
    ]
  },
  {
    "id": 77,
    "code": "cauvong_pet_77",
    "name": "Sủng Vật #77 (Thổ)",
    "type": "Thổ",
    "color": "#e67e22",
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
    "evolutionTarget": null,
    "spriteKey": "s4",
    "sprite": "./img/monsters/s4.png",
    "skills": [
      {
        "name": "Thổ Kích",
        "power": 35,
        "mpCost": 10,
        "type": "Thổ",
        "desc": "Tấn công gây sát thương vật lý hệ Thổ."
      },
      {
        "name": "Thổ Vũ Cuồng Phong",
        "power": 52,
        "mpCost": 22,
        "type": "Thổ",
        "desc": "Chiêu thức nguyên tố bậc cao, gây sát thương cực lớn."
      }
    ]
  },
  {
    "id": 78,
    "code": "cauvong_pet_78",
    "name": "Sủng Vật #78 (Thổ)",
    "type": "Thổ",
    "color": "#e67e22",
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
    "evolutionTarget": null,
    "spriteKey": "s5",
    "sprite": "./img/monsters/s5.png",
    "skills": [
      {
        "name": "Thổ Kích",
        "power": 36,
        "mpCost": 10,
        "type": "Thổ",
        "desc": "Tấn công gây sát thương vật lý hệ Thổ."
      },
      {
        "name": "Thổ Vũ Cuồng Phong",
        "power": 54,
        "mpCost": 22,
        "type": "Thổ",
        "desc": "Chiêu thức nguyên tố bậc cao, gây sát thương cực lớn."
      }
    ]
  },
  {
    "id": 79,
    "code": "cauvong_pet_79",
    "name": "Sủng Vật #79 (Thổ)",
    "type": "Thổ",
    "color": "#e67e22",
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
    "evolutionTarget": null,
    "spriteKey": "s0",
    "sprite": "./img/monsters/s0.png",
    "skills": [
      {
        "name": "Thổ Kích",
        "power": 38,
        "mpCost": 10,
        "type": "Thổ",
        "desc": "Tấn công gây sát thương vật lý hệ Thổ."
      },
      {
        "name": "Thổ Vũ Cuồng Phong",
        "power": 57,
        "mpCost": 22,
        "type": "Thổ",
        "desc": "Chiêu thức nguyên tố bậc cao, gây sát thương cực lớn."
      }
    ]
  },
  {
    "id": 80,
    "code": "cauvong_pet_80",
    "name": "Sủng Vật #80 (Thổ)",
    "type": "Thổ",
    "color": "#e67e22",
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
    "evolutionTarget": 3,
    "spriteKey": "s1",
    "sprite": "./img/monsters/s1.png",
    "skills": [
      {
        "name": "Thổ Kích",
        "power": 33,
        "mpCost": 10,
        "type": "Thổ",
        "desc": "Tấn công gây sát thương vật lý hệ Thổ."
      },
      {
        "name": "Thổ Vũ Cuồng Phong",
        "power": 50,
        "mpCost": 22,
        "type": "Thổ",
        "desc": "Chiêu thức nguyên tố bậc cao, gây sát thương cực lớn."
      }
    ]
  },
  {
    "id": 81,
    "code": "cauvong_pet_81",
    "name": "Sủng Vật #81 (Thổ)",
    "type": "Thổ",
    "color": "#e67e22",
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
    "evolutionTarget": 2,
    "spriteKey": "s2",
    "sprite": "./img/monsters/s2.png",
    "skills": [
      {
        "name": "Thổ Kích",
        "power": 35,
        "mpCost": 10,
        "type": "Thổ",
        "desc": "Tấn công gây sát thương vật lý hệ Thổ."
      },
      {
        "name": "Thổ Vũ Cuồng Phong",
        "power": 52,
        "mpCost": 22,
        "type": "Thổ",
        "desc": "Chiêu thức nguyên tố bậc cao, gây sát thương cực lớn."
      }
    ]
  },
  {
    "id": 82,
    "code": "cauvong_pet_82",
    "name": "Sủng Vật #82 (Thổ)",
    "type": "Thổ",
    "color": "#e67e22",
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
    "evolutionTarget": null,
    "spriteKey": "s3",
    "sprite": "./img/monsters/s3.png",
    "skills": [
      {
        "name": "Thổ Kích",
        "power": 36,
        "mpCost": 10,
        "type": "Thổ",
        "desc": "Tấn công gây sát thương vật lý hệ Thổ."
      },
      {
        "name": "Thổ Vũ Cuồng Phong",
        "power": 54,
        "mpCost": 22,
        "type": "Thổ",
        "desc": "Chiêu thức nguyên tố bậc cao, gây sát thương cực lớn."
      }
    ]
  },
  {
    "id": 83,
    "code": "cauvong_pet_83",
    "name": "Sủng Vật #83 (Thổ)",
    "type": "Thổ",
    "color": "#e67e22",
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
    "evolutionTarget": null,
    "spriteKey": "s4",
    "sprite": "./img/monsters/s4.png",
    "skills": [
      {
        "name": "Thổ Kích",
        "power": 38,
        "mpCost": 10,
        "type": "Thổ",
        "desc": "Tấn công gây sát thương vật lý hệ Thổ."
      },
      {
        "name": "Thổ Vũ Cuồng Phong",
        "power": 57,
        "mpCost": 22,
        "type": "Thổ",
        "desc": "Chiêu thức nguyên tố bậc cao, gây sát thương cực lớn."
      }
    ]
  },
  {
    "id": 84,
    "code": "cauvong_pet_84",
    "name": "Sủng Vật #84 (Thổ)",
    "type": "Thổ",
    "color": "#e67e22",
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
    "evolutionTarget": null,
    "spriteKey": "s5",
    "sprite": "./img/monsters/s5.png",
    "skills": [
      {
        "name": "Thổ Kích",
        "power": 39,
        "mpCost": 10,
        "type": "Thổ",
        "desc": "Tấn công gây sát thương vật lý hệ Thổ."
      },
      {
        "name": "Thổ Vũ Cuồng Phong",
        "power": 59,
        "mpCost": 22,
        "type": "Thổ",
        "desc": "Chiêu thức nguyên tố bậc cao, gây sát thương cực lớn."
      }
    ]
  },
  {
    "id": 85,
    "code": "cauvong_pet_85",
    "name": "Sủng Vật #85 (Hỏa)",
    "type": "Hỏa",
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
    "evolutionTarget": null,
    "spriteKey": "s0",
    "sprite": "./img/monsters/s0.png",
    "skills": [
      {
        "name": "Hỏa Kích",
        "power": 33,
        "mpCost": 10,
        "type": "Hỏa",
        "desc": "Tấn công gây sát thương vật lý hệ Hỏa."
      },
      {
        "name": "Hỏa Vũ Cuồng Phong",
        "power": 50,
        "mpCost": 22,
        "type": "Hỏa",
        "desc": "Chiêu thức nguyên tố bậc cao, gây sát thương cực lớn."
      },
      {
        "name": "Hỏa Diễm Bạo Phát",
        "power": 45,
        "mpCost": 35,
        "type": "Hỏa",
        "desc": "Tấn công hủy diệt."
      }
    ]
  },
  {
    "id": 86,
    "code": "cauvong_pet_86",
    "name": "Sủng Vật #86 (undefined)",
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
    "evolutionTarget": null,
    "spriteKey": "s1",
    "sprite": "./img/monsters/s1.png",
    "skills": [
      {
        "name": "undefined Kích",
        "power": 36,
        "mpCost": 10,
        "desc": "Tấn công gây sát thương vật lý hệ undefined."
      },
      {
        "name": "undefined Vũ Cuồng Phong",
        "power": 54,
        "mpCost": 22,
        "desc": "Chiêu thức nguyên tố bậc cao, gây sát thương cực lớn."
      }
    ]
  },
  {
    "id": 87,
    "code": "cauvong_pet_87",
    "name": "Sủng Vật #87 (undefined)",
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
    "evolutionTarget": null,
    "spriteKey": "s2",
    "sprite": "./img/monsters/s2.png",
    "skills": [
      {
        "name": "undefined Kích",
        "power": 39,
        "mpCost": 10,
        "desc": "Tấn công gây sát thương vật lý hệ undefined."
      },
      {
        "name": "undefined Vũ Cuồng Phong",
        "power": 59,
        "mpCost": 22,
        "desc": "Chiêu thức nguyên tố bậc cao, gây sát thương cực lớn."
      }
    ]
  },
  {
    "id": 88,
    "code": "cauvong_pet_88",
    "name": "Sủng Vật #88 (Kim)",
    "type": "Kim",
    "color": "#f1c40f",
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
    "evolutionTarget": 2,
    "spriteKey": "s3",
    "sprite": "./img/monsters/s3.png",
    "skills": [
      {
        "name": "Kim Kích",
        "power": 33,
        "mpCost": 10,
        "type": "Kim",
        "desc": "Tấn công gây sát thương vật lý hệ Kim."
      },
      {
        "name": "Kim Vũ Cuồng Phong",
        "power": 50,
        "mpCost": 22,
        "type": "Kim",
        "desc": "Chiêu thức nguyên tố bậc cao, gây sát thương cực lớn."
      },
      {
        "name": "Kim Loại Ngoại Xác",
        "power": 0,
        "buffDef": 30,
        "mpCost": 12,
        "type": "Kim",
        "desc": "Gia tăng 30% phòng ngự."
      }
    ]
  },
  {
    "id": 89,
    "code": "cauvong_pet_89",
    "name": "Sủng Vật #89 (Kim)",
    "type": "Kim",
    "color": "#f1c40f",
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
    "evolutionTarget": null,
    "spriteKey": "s4",
    "sprite": "./img/monsters/s4.png",
    "skills": [
      {
        "name": "Kim Kích",
        "power": 35,
        "mpCost": 10,
        "type": "Kim",
        "desc": "Tấn công gây sát thương vật lý hệ Kim."
      },
      {
        "name": "Kim Vũ Cuồng Phong",
        "power": 52,
        "mpCost": 22,
        "type": "Kim",
        "desc": "Chiêu thức nguyên tố bậc cao, gây sát thương cực lớn."
      },
      {
        "name": "Kim Loại Ngoại Xác",
        "power": 0,
        "buffDef": 30,
        "mpCost": 12,
        "type": "Kim",
        "desc": "Gia tăng 30% phòng ngự."
      }
    ]
  },
  {
    "id": 90,
    "code": "cauvong_pet_90",
    "name": "Sủng Vật #90 (Kim)",
    "type": "Kim",
    "color": "#f1c40f",
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
    "evolutionTarget": null,
    "spriteKey": "s5",
    "sprite": "./img/monsters/s5.png",
    "skills": [
      {
        "name": "Kim Kích",
        "power": 36,
        "mpCost": 10,
        "type": "Kim",
        "desc": "Tấn công gây sát thương vật lý hệ Kim."
      },
      {
        "name": "Kim Vũ Cuồng Phong",
        "power": 54,
        "mpCost": 22,
        "type": "Kim",
        "desc": "Chiêu thức nguyên tố bậc cao, gây sát thương cực lớn."
      },
      {
        "name": "Kim Loại Ngoại Xác",
        "power": 0,
        "buffDef": 30,
        "mpCost": 12,
        "type": "Kim",
        "desc": "Gia tăng 30% phòng ngự."
      }
    ]
  },
  {
    "id": 91,
    "code": "cauvong_pet_91",
    "name": "Sủng Vật #91 (Mộc)",
    "type": "Mộc",
    "color": "#2ecc71",
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
    "evolutionTarget": 2,
    "spriteKey": "s0",
    "sprite": "./img/monsters/s0.png",
    "skills": [
      {
        "name": "Mộc Kích",
        "power": 35,
        "mpCost": 10,
        "type": "Mộc",
        "desc": "Tấn công gây sát thương vật lý hệ Mộc."
      },
      {
        "name": "Mộc Vũ Cuồng Phong",
        "power": 52,
        "mpCost": 22,
        "type": "Mộc",
        "desc": "Chiêu thức nguyên tố bậc cao, gây sát thương cực lớn."
      }
    ]
  },
  {
    "id": 92,
    "code": "cauvong_pet_92",
    "name": "Sủng Vật #92 (Mộc)",
    "type": "Mộc",
    "color": "#2ecc71",
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
    "evolutionTarget": null,
    "spriteKey": "s1",
    "sprite": "./img/monsters/s1.png",
    "skills": [
      {
        "name": "Mộc Kích",
        "power": 36,
        "mpCost": 10,
        "type": "Mộc",
        "desc": "Tấn công gây sát thương vật lý hệ Mộc."
      },
      {
        "name": "Mộc Vũ Cuồng Phong",
        "power": 54,
        "mpCost": 22,
        "type": "Mộc",
        "desc": "Chiêu thức nguyên tố bậc cao, gây sát thương cực lớn."
      }
    ]
  },
  {
    "id": 93,
    "code": "cauvong_pet_93",
    "name": "Sủng Vật #93 (Mộc)",
    "type": "Mộc",
    "color": "#2ecc71",
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
    "evolutionTarget": null,
    "spriteKey": "s2",
    "sprite": "./img/monsters/s2.png",
    "skills": [
      {
        "name": "Mộc Kích",
        "power": 38,
        "mpCost": 10,
        "type": "Mộc",
        "desc": "Tấn công gây sát thương vật lý hệ Mộc."
      },
      {
        "name": "Mộc Vũ Cuồng Phong",
        "power": 57,
        "mpCost": 22,
        "type": "Mộc",
        "desc": "Chiêu thức nguyên tố bậc cao, gây sát thương cực lớn."
      }
    ]
  },
  {
    "id": 94,
    "code": "cauvong_pet_94",
    "name": "Sủng Vật #94 (Thủy)",
    "type": "Thủy",
    "color": "#3498db",
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
    "evolutionTarget": 2,
    "spriteKey": "s3",
    "sprite": "./img/monsters/s3.png",
    "skills": [
      {
        "name": "Thủy Kích",
        "power": 32,
        "mpCost": 10,
        "type": "Thủy",
        "desc": "Tấn công gây sát thương vật lý hệ Thủy."
      },
      {
        "name": "Thủy Vũ Cuồng Phong",
        "power": 48,
        "mpCost": 22,
        "type": "Thủy",
        "desc": "Chiêu thức nguyên tố bậc cao, gây sát thương cực lớn."
      },
      {
        "name": "Thủy Liệu Thuật",
        "power": 0,
        "heal": 35,
        "mpCost": 15,
        "type": "Thủy",
        "desc": "Hồi phục 35% lượng sinh mệnh."
      }
    ]
  },
  {
    "id": 95,
    "code": "cauvong_pet_95",
    "name": "Sủng Vật #95 (Thủy)",
    "type": "Thủy",
    "color": "#3498db",
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
    "evolutionTarget": null,
    "spriteKey": "s4",
    "sprite": "./img/monsters/s4.png",
    "skills": [
      {
        "name": "Thủy Kích",
        "power": 33,
        "mpCost": 10,
        "type": "Thủy",
        "desc": "Tấn công gây sát thương vật lý hệ Thủy."
      },
      {
        "name": "Thủy Vũ Cuồng Phong",
        "power": 50,
        "mpCost": 22,
        "type": "Thủy",
        "desc": "Chiêu thức nguyên tố bậc cao, gây sát thương cực lớn."
      },
      {
        "name": "Thủy Liệu Thuật",
        "power": 0,
        "heal": 35,
        "mpCost": 15,
        "type": "Thủy",
        "desc": "Hồi phục 35% lượng sinh mệnh."
      }
    ]
  },
  {
    "id": 96,
    "code": "cauvong_pet_96",
    "name": "Sủng Vật #96 (Thủy)",
    "type": "Thủy",
    "color": "#3498db",
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
    "evolutionTarget": null,
    "spriteKey": "s5",
    "sprite": "./img/monsters/s5.png",
    "skills": [
      {
        "name": "Thủy Kích",
        "power": 35,
        "mpCost": 10,
        "type": "Thủy",
        "desc": "Tấn công gây sát thương vật lý hệ Thủy."
      },
      {
        "name": "Thủy Vũ Cuồng Phong",
        "power": 52,
        "mpCost": 22,
        "type": "Thủy",
        "desc": "Chiêu thức nguyên tố bậc cao, gây sát thương cực lớn."
      },
      {
        "name": "Thủy Liệu Thuật",
        "power": 0,
        "heal": 35,
        "mpCost": 15,
        "type": "Thủy",
        "desc": "Hồi phục 35% lượng sinh mệnh."
      }
    ]
  },
  {
    "id": 97,
    "code": "cauvong_pet_97",
    "name": "Sủng Vật #97 (Hỏa)",
    "type": "Hỏa",
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
    "evolutionTarget": 2,
    "spriteKey": "s0",
    "sprite": "./img/monsters/s0.png",
    "skills": [
      {
        "name": "Hỏa Kích",
        "power": 35,
        "mpCost": 10,
        "type": "Hỏa",
        "desc": "Tấn công gây sát thương vật lý hệ Hỏa."
      },
      {
        "name": "Hỏa Vũ Cuồng Phong",
        "power": 52,
        "mpCost": 22,
        "type": "Hỏa",
        "desc": "Chiêu thức nguyên tố bậc cao, gây sát thương cực lớn."
      },
      {
        "name": "Hỏa Diễm Bạo Phát",
        "power": 45,
        "mpCost": 35,
        "type": "Hỏa",
        "desc": "Tấn công hủy diệt."
      }
    ]
  },
  {
    "id": 98,
    "code": "cauvong_pet_98",
    "name": "Sủng Vật #98 (Hỏa)",
    "type": "Hỏa",
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
    "evolutionTarget": null,
    "spriteKey": "s1",
    "sprite": "./img/monsters/s1.png",
    "skills": [
      {
        "name": "Hỏa Kích",
        "power": 35,
        "mpCost": 10,
        "type": "Hỏa",
        "desc": "Tấn công gây sát thương vật lý hệ Hỏa."
      },
      {
        "name": "Hỏa Vũ Cuồng Phong",
        "power": 52,
        "mpCost": 22,
        "type": "Hỏa",
        "desc": "Chiêu thức nguyên tố bậc cao, gây sát thương cực lớn."
      },
      {
        "name": "Hỏa Diễm Bạo Phát",
        "power": 45,
        "mpCost": 35,
        "type": "Hỏa",
        "desc": "Tấn công hủy diệt."
      }
    ]
  },
  {
    "id": 99,
    "code": "cauvong_pet_99",
    "name": "Sủng Vật #99 (Hỏa)",
    "type": "Hỏa",
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
    "evolutionTarget": null,
    "spriteKey": "s2",
    "sprite": "./img/monsters/s2.png",
    "skills": [
      {
        "name": "Hỏa Kích",
        "power": 36,
        "mpCost": 10,
        "type": "Hỏa",
        "desc": "Tấn công gây sát thương vật lý hệ Hỏa."
      },
      {
        "name": "Hỏa Vũ Cuồng Phong",
        "power": 54,
        "mpCost": 22,
        "type": "Hỏa",
        "desc": "Chiêu thức nguyên tố bậc cao, gây sát thương cực lớn."
      },
      {
        "name": "Hỏa Diễm Bạo Phát",
        "power": 45,
        "mpCost": 35,
        "type": "Hỏa",
        "desc": "Tấn công hủy diệt."
      }
    ]
  },
  {
    "id": 100,
    "code": "cauvong_pet_100",
    "name": "Sủng Vật #100 (Thổ)",
    "type": "Thổ",
    "color": "#e67e22",
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
    "evolutionTarget": 2,
    "spriteKey": "s3",
    "sprite": "./img/monsters/s3.png",
    "skills": [
      {
        "name": "Thổ Kích",
        "power": 35,
        "mpCost": 10,
        "type": "Thổ",
        "desc": "Tấn công gây sát thương vật lý hệ Thổ."
      },
      {
        "name": "Thổ Vũ Cuồng Phong",
        "power": 52,
        "mpCost": 22,
        "type": "Thổ",
        "desc": "Chiêu thức nguyên tố bậc cao, gây sát thương cực lớn."
      }
    ]
  },
  {
    "id": 101,
    "code": "cauvong_pet_101",
    "name": "Sủng Vật #101 (Thổ)",
    "type": "Thổ",
    "color": "#e67e22",
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
    "evolutionTarget": null,
    "spriteKey": "s4",
    "sprite": "./img/monsters/s4.png",
    "skills": [
      {
        "name": "Thổ Kích",
        "power": 36,
        "mpCost": 10,
        "type": "Thổ",
        "desc": "Tấn công gây sát thương vật lý hệ Thổ."
      },
      {
        "name": "Thổ Vũ Cuồng Phong",
        "power": 54,
        "mpCost": 22,
        "type": "Thổ",
        "desc": "Chiêu thức nguyên tố bậc cao, gây sát thương cực lớn."
      }
    ]
  },
  {
    "id": 102,
    "code": "cauvong_pet_102",
    "name": "Sủng Vật #102 (Thổ)",
    "type": "Thổ",
    "color": "#e67e22",
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
    "evolutionTarget": null,
    "spriteKey": "s5",
    "sprite": "./img/monsters/s5.png",
    "skills": [
      {
        "name": "Thổ Kích",
        "power": 39,
        "mpCost": 10,
        "type": "Thổ",
        "desc": "Tấn công gây sát thương vật lý hệ Thổ."
      },
      {
        "name": "Thổ Vũ Cuồng Phong",
        "power": 59,
        "mpCost": 22,
        "type": "Thổ",
        "desc": "Chiêu thức nguyên tố bậc cao, gây sát thương cực lớn."
      }
    ]
  }
];

// Hàm tính toán chỉ số theo Cấp độ (Chuẩn công thức J2ME)
function calculateMonsterStats(baseMonster, level = 5) {
    const g = baseMonster.growth;
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
    window.calculateMonsterStats = calculateMonsterStats;
}
