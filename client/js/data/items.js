// ========================================================
// HỆ THỐNG VẬT PHẨM & CỬA HÀNG CHÍNH THỨC (J2ME REA EXPORT)
// 70 Vật Phẩm Chuẩn & 3 Gian Hàng Vương Quốc Cầu Vồng
// ========================================================

const ITEMS_CONFIG = {
  "item_0": {
    "id": 0,
    "code": "item_0",
    "name": "Đồ uống",
    "category": "recovery",
    "icon": "🧪",
    "price": 50,
    "sellPrice": 10,
    "desc": "Hồi phục sinh mệnh 35%",
    "effect": {
      "healHpPercent": 35
    }
  },
  "item_1": {
    "id": 1,
    "code": "item_1",
    "name": "Bánh bích quy",
    "category": "recovery",
    "icon": "🍪",
    "price": 100,
    "sellPrice": 20,
    "desc": "Hồi phục sinh mệnh 65%",
    "effect": {
      "healHpPercent": 65
    }
  },
  "item_2": {
    "id": 2,
    "code": "item_2",
    "name": "Chocolate",
    "category": "recovery",
    "icon": "🍫",
    "price": 300,
    "sellPrice": 60,
    "desc": "Hồi phục toàn bộ sinh mệnh",
    "effect": {
      "healHpPercent": 100
    }
  },
  "item_3": {
    "id": 3,
    "code": "item_3",
    "name": "Năng lượng thạch",
    "category": "recovery",
    "icon": "🔷",
    "price": 100,
    "sellPrice": 20,
    "desc": "Hồi phục giá trị kỹ năng 50%",
    "effect": {
      "healMpPercent": 50
    }
  },
  "item_4": {
    "id": 4,
    "code": "item_4",
    "name": "Tụ năng thạch",
    "category": "recovery",
    "icon": "💠",
    "price": 300,
    "sellPrice": 60,
    "desc": "Khôi phục tất cả giá trị kỹ năng",
    "effect": {
      "healMpPercent": 100
    }
  },
  "item_5": {
    "id": 5,
    "code": "item_5",
    "name": "Cây bạch quả quả",
    "category": "recovery",
    "icon": "🌰",
    "price": 400,
    "sellPrice": 80,
    "desc": "Đồng thời hồi phục giá trị sinh mệnh và kỹ năng 35%",
    "effect": {
      "healHpPercent": 35,
      "healMpPercent": 35
    }
  },
  "item_6": {
    "id": 6,
    "code": "item_6",
    "name": "Hoàng kim đường",
    "category": "recovery",
    "icon": "🍬",
    "price": 1000,
    "sellPrice": 200,
    "desc": "Hồi phục toàn bộ giá trị sinh mệnh và kỹ năng",
    "effect": {
      "healHpPercent": 100,
      "healMpPercent": 100
    }
  },
  "item_7": {
    "id": 7,
    "code": "item_7",
    "name": "sinh mệnh thạch",
    "category": "recovery",
    "icon": "💖",
    "price": 400,
    "sellPrice": 80,
    "desc": "Hồi sinh kéo theo sủng vật hồi phục giá trị sinh mệnh 30%",
    "effect": {
      "revivePercent": 30
    }
  },
  "item_8": {
    "id": 8,
    "code": "item_8",
    "name": "Vạn năng dược",
    "category": "recovery",
    "icon": "💊",
    "price": 100,
    "sellPrice": 20,
    "desc": "Giải trừ nơi có trạng thái dị thường",
    "effect": {
      "cureStatus": true
    }
  },
  "item_9": {
    "id": 9,
    "code": "item_9",
    "name": "Phong ấn cầu",
    "category": "ball",
    "icon": "🔴",
    "price": 150,
    "sellPrice": 30,
    "desc": "Chuẩn bị bắt sủng vật, hiệu quả bình thường",
    "effect": {
      "catchRate": 1
    }
  },
  "item_10": {
    "id": 10,
    "code": "item_10",
    "name": "Cao cấp cầu",
    "category": "ball",
    "icon": "🔵",
    "price": 300,
    "sellPrice": 60,
    "desc": "Chuẩn bị bắt sủng vật, hiệu quả rất tốt",
    "effect": {
      "catchRate": 1.8
    }
  },
  "item_11": {
    "id": 11,
    "code": "item_11",
    "name": "Đại sư cầu",
    "category": "ball",
    "icon": "🟣",
    "price": 200,
    "sellPrice": 40,
    "desc": "Chuẩn bị bắt được, 100% thành công",
    "effect": {
      "catchRate": 99
    }
  },
  "item_12": {
    "id": 12,
    "code": "item_12",
    "name": "Hưng phấn cô",
    "category": "support",
    "icon": "🍯",
    "price": 200,
    "sellPrice": 40,
    "desc": "Hồi phục một phần độ trung thành của sủng vật",
    "effect": {
      "loyalty": 25,
      "repel": 0
    }
  },
  "item_13": {
    "id": 13,
    "code": "item_13",
    "name": "Mật tâm đường",
    "category": "support",
    "icon": "🍯",
    "price": 500,
    "sellPrice": 100,
    "desc": "Hồi phục toàn bộ độ trung thành của sủng vật",
    "effect": {
      "loyalty": 100,
      "repel": 0
    }
  },
  "item_14": {
    "id": 14,
    "code": "item_14",
    "name": "Tránh quái hoàn",
    "category": "support",
    "icon": "💨",
    "price": 300,
    "sellPrice": 60,
    "desc": "Trong thời gian ngắn sẽ không gặp địch",
    "effect": {
      "loyalty": 0,
      "repel": 100
    }
  },
  "item_15": {
    "id": 15,
    "code": "item_15",
    "name": "Nước hoa",
    "category": "support",
    "icon": "💨",
    "price": 400,
    "sellPrice": 80,
    "desc": "Thời gian dài sẽ không gặp địch",
    "effect": {
      "loyalty": 0,
      "repel": 300
    }
  },
  "item_16": {
    "id": 16,
    "code": "item_16",
    "name": "Cứng cỏi thạch",
    "category": "stone",
    "icon": "🔥",
    "price": 500,
    "sellPrice": 100,
    "desc": "Tài liệu tiến hóa cơ bản của sủng vật Mãnh Thú hệ",
    "effect": {
      "isEvolutionMaterial": true,
      "materialId": 16
    }
  },
  "item_17": {
    "id": 17,
    "code": "item_17",
    "name": "Thú hồn",
    "category": "stone",
    "icon": "🦁",
    "price": 1000,
    "sellPrice": 200,
    "desc": "Tài liệu tiến hóa bậc cao của sủng vật Mãnh Thú hệ",
    "effect": {
      "isEvolutionMaterial": true,
      "materialId": 17
    }
  },
  "item_18": {
    "id": 18,
    "code": "item_18",
    "name": "Thụ chướng thạch",
    "category": "stone",
    "icon": "🍃",
    "price": 500,
    "sellPrice": 100,
    "desc": "Tài liệu tiến hóa cơ bản của sủng vật Thực Vật",
    "effect": {
      "isEvolutionMaterial": true,
      "materialId": 18
    }
  },
  "item_19": {
    "id": 19,
    "code": "item_19",
    "name": "Chu quả",
    "category": "stone",
    "icon": "🍒",
    "price": 1000,
    "sellPrice": 200,
    "desc": "Tài liệu tiến hóa bậc cao của sủng vật Thực Vật hệ",
    "effect": {
      "isEvolutionMaterial": true,
      "materialId": 19
    }
  },
  "item_20": {
    "id": 20,
    "code": "item_20",
    "name": "Bong bóng",
    "category": "stone",
    "icon": "💧",
    "price": 500,
    "sellPrice": 100,
    "desc": "Tài liệu tiến hóa cơ bản của sủng vật Hải Dương hệ",
    "effect": {
      "isEvolutionMaterial": true,
      "materialId": 20
    }
  },
  "item_21": {
    "id": 21,
    "code": "item_21",
    "name": "Biển sâu san hô",
    "category": "stone",
    "icon": "🪸",
    "price": 1000,
    "sellPrice": 200,
    "desc": "Tài liệu tiến hóa bậc cao của sủng vật Hải Dương hệ",
    "effect": {
      "isEvolutionMaterial": true,
      "materialId": 21
    }
  },
  "item_22": {
    "id": 22,
    "code": "item_22",
    "name": "Cách không thạch",
    "category": "stone",
    "icon": "🌪️",
    "price": 500,
    "sellPrice": 100,
    "desc": "Tài liệu tiến hóa cơ bản của sủng vật Phi Hành hệ",
    "effect": {
      "isEvolutionMaterial": true,
      "materialId": 22
    }
  },
  "item_23": {
    "id": 23,
    "code": "item_23",
    "name": "Thiên vũ",
    "category": "stone",
    "icon": "🪶",
    "price": 1000,
    "sellPrice": 200,
    "desc": "Tài liệu tiến hóa bậc cao của sủng vật Phi Hành hệ",
    "effect": {
      "isEvolutionMaterial": true,
      "materialId": 23
    }
  },
  "item_24": {
    "id": 24,
    "code": "item_24",
    "name": "Tinh nguyên thạch",
    "category": "stone",
    "icon": "⚡",
    "price": 500,
    "sellPrice": 100,
    "desc": "Tài liệu tiến hóa cơ bản của sủng vật Kim Loại hệ",
    "effect": {
      "isEvolutionMaterial": true,
      "materialId": 24
    }
  },
  "item_25": {
    "id": 25,
    "code": "item_25",
    "name": "Bạch kim",
    "category": "stone",
    "icon": "🪙",
    "price": 1000,
    "sellPrice": 200,
    "desc": "Tài liệu tiến hóa bậc cao của sủng vật Kim Loại hệ",
    "effect": {
      "isEvolutionMaterial": true,
      "materialId": 25
    }
  },
  "item_26": {
    "id": 26,
    "code": "item_26",
    "name": "Bay lượn thiên thạch",
    "category": "stone",
    "icon": "☄️",
    "price": 0,
    "sellPrice": 20,
    "desc": "Chuẩn bị tài liệu tiến hóa Bạch Kim Long",
    "effect": {
      "isEvolutionMaterial": true,
      "materialId": 26
    }
  },
  "item_27": {
    "id": 27,
    "code": "item_27",
    "name": "Cổ thụ chi hạch",
    "category": "stone",
    "icon": "🪵",
    "price": 0,
    "sellPrice": 20,
    "desc": "Chuẩn bị tài liệu tiến hóa Cổ Thụ Chi Vương",
    "effect": {
      "isEvolutionMaterial": true,
      "materialId": 27
    }
  },
  "item_28": {
    "id": 28,
    "code": "item_28",
    "name": "Tinh khiết thủy tinh",
    "category": "stone",
    "icon": "💎",
    "price": 0,
    "sellPrice": 20,
    "desc": "Chuẩn bị tài liệu tiến hóa Thủy Tinh Hùng Sư",
    "effect": {
      "isEvolutionMaterial": true,
      "materialId": 28
    }
  },
  "item_29": {
    "id": 29,
    "code": "item_29",
    "name": "Cổ kình chi tâm",
    "category": "stone",
    "icon": "🐋",
    "price": 0,
    "sellPrice": 20,
    "desc": "Chuẩn bị tài liệu tiến hóa Kình Ngư",
    "effect": {
      "isEvolutionMaterial": true,
      "materialId": 29
    }
  },
  "item_30": {
    "id": 30,
    "code": "item_30",
    "name": "Vương chi chứng minh",
    "category": "stone",
    "icon": "👑",
    "price": 0,
    "sellPrice": 20,
    "desc": "Chuẩn bị tài liệu tiến hóa Hổ Vương",
    "effect": {
      "isEvolutionMaterial": true,
      "materialId": 30
    }
  },
  "item_31": {
    "id": 31,
    "code": "item_31",
    "name": "Trị hết chi tâm",
    "category": "stone",
    "icon": "⚔️",
    "price": 0,
    "sellPrice": 20,
    "desc": "Tìm được tài liệu Đao Thương Tướng Quân",
    "effect": {
      "isEvolutionMaterial": true,
      "materialId": 31
    }
  },
  "item_32": {
    "id": 32,
    "code": "item_32",
    "name": "Bảo rương",
    "category": "key",
    "icon": "📦",
    "price": 0,
    "sellPrice": 20,
    "desc": "Cần chìa khóa mới có thể mở xem vật phẩm bên trong bảo rương",
    "effect": {}
  },
  "item_33": {
    "id": 33,
    "code": "item_33",
    "name": "Cái chìa khóa",
    "category": "key",
    "icon": "🗝️",
    "price": 50,
    "sellPrice": 10,
    "desc": "Dùng chìa khóa mới có thể mở bảo rương",
    "effect": {}
  },
  "item_34": {
    "id": 34,
    "code": "item_34",
    "name": "Dị hoá tài liệu",
    "category": "key",
    "icon": "🔮",
    "price": 0,
    "sellPrice": 20,
    "desc": "Nghe nói sủng vật dị hóa có thể có được hình thái mạnh mẽ hơn để kiềm giữ đạo cụ",
    "effect": {}
  },
  "item_35": {
    "id": 35,
    "code": "item_35",
    "name": "Quân tâm tan rả",
    "category": "skill",
    "icon": "📜",
    "price": 0,
    "sellPrice": 20,
    "desc": "Công kích kẻ địch đồng thời giảm bớt độ trung thành của sủng vật 25%",
    "effect": {
      "isSkillBook": true,
      "bookIndex": 0
    }
  },
  "item_36": {
    "id": 36,
    "code": "item_36",
    "name": "Sơ cấp trị liệu",
    "category": "skill",
    "icon": "📜",
    "price": 0,
    "sellPrice": 20,
    "desc": "Có thể nắm vững các kỹ năng để tự chữa trị thương tổn trong chiến đấu",
    "effect": {
      "isSkillBook": true,
      "bookIndex": 1
    }
  },
  "item_37": {
    "id": 37,
    "code": "item_37",
    "name": "Cao cấp trị liệu",
    "category": "skill",
    "icon": "📜",
    "price": 0,
    "sellPrice": 20,
    "desc": "Sủng vật có thể nắm vững kỹ năng tự chữa trị trong chiến đấu",
    "effect": {
      "isSkillBook": true,
      "bookIndex": 2
    }
  },
  "item_38": {
    "id": 38,
    "code": "item_38",
    "name": "Tử vong chi sờ",
    "category": "skill",
    "icon": "📜",
    "price": 0,
    "sellPrice": 20,
    "desc": "Tiêu hao một lần duy nhất toàn bộ năng lượng hiện tại, cũng như gia tăng thương tổn.",
    "effect": {
      "isSkillBook": true,
      "bookIndex": 3
    }
  },
  "item_39": {
    "id": 39,
    "code": "item_39",
    "name": "Kỹ năng Phong Bế",
    "category": "skill",
    "icon": "📜",
    "price": 0,
    "sellPrice": 20,
    "desc": "Kỹ năng này tạm thời có thể làm cho kẻ địch không thể sử dụng nhiều hơn 3 kỹ năng",
    "effect": {
      "isSkillBook": true,
      "bookIndex": 4
    }
  },
  "item_40": {
    "id": 40,
    "code": "item_40",
    "name": "Nọc độc công kích",
    "category": "skill",
    "icon": "📜",
    "price": 0,
    "sellPrice": 20,
    "desc": "Kỹ năng bị động, nâng cao uy lực Hủ Thực của sủng vật Thực Vật hệ",
    "effect": {
      "isSkillBook": true,
      "bookIndex": 5
    }
  },
  "item_41": {
    "id": 41,
    "code": "item_41",
    "name": "Răng nanh răng nhọn",
    "category": "skill",
    "icon": "📜",
    "price": 0,
    "sellPrice": 20,
    "desc": "Kỹ năng bị động, kéo dài thời gian duy trì liên tục Tê Liệt của sủng vật Mãnh Thú hệ",
    "effect": {
      "isSkillBook": true,
      "bookIndex": 6
    }
  },
  "item_42": {
    "id": 42,
    "code": "item_42",
    "name": "Thép thiết cốt",
    "category": "skill",
    "icon": "📜",
    "price": 0,
    "sellPrice": 20,
    "desc": "Kỹ năng bị động, nâng cao hiệu quả phòng ngự của sủng vật Kim Loại hệ",
    "effect": {
      "isSkillBook": true,
      "bookIndex": 7
    }
  },
  "item_43": {
    "id": 43,
    "code": "item_43",
    "name": "Tinh thần công kích",
    "category": "skill",
    "icon": "📜",
    "price": 0,
    "sellPrice": 20,
    "desc": "Kỹ năng bị động, sủng vật Phi Hành hệ có thể công kích đồng giảm bớt năng lượng đối thủ",
    "effect": {
      "isSkillBook": true,
      "bookIndex": 8
    }
  },
  "item_44": {
    "id": 44,
    "code": "item_44",
    "name": "Triều tịch năng lượng",
    "category": "skill",
    "icon": "📜",
    "price": 0,
    "sellPrice": 20,
    "desc": "Kỹ năng bị động, sủng vật Hải Dương hệ có thể công kích và giảm bớt năng lượng tiêu hao",
    "effect": {
      "isSkillBook": true,
      "bookIndex": 9
    }
  },
  "item_45": {
    "id": 45,
    "code": "item_45",
    "name": "Kinh nghiệm nhiều hơn",
    "category": "skill",
    "icon": "📜",
    "price": 0,
    "sellPrice": 20,
    "desc": "Kỹ năng bị động, nắm vững kỹ năng sủng vật sau khi chiến đấu có thể đạt được gấp đôi kinh nghiệm",
    "effect": {
      "isSkillBook": true,
      "bookIndex": 10
    }
  },
  "item_46": {
    "id": 46,
    "code": "item_46",
    "name": "Kinh nghiệm phong phú",
    "category": "skill",
    "icon": "📜",
    "price": 0,
    "sellPrice": 20,
    "desc": "Kỹ năng bị động, nắm vững kỹ năng sủng vật sau khi chiến đấu có thể đạt được gấp ba kinh nghiệm",
    "effect": {
      "isSkillBook": true,
      "bookIndex": 11
    }
  },
  "item_47": {
    "id": 47,
    "code": "item_47",
    "name": "Trọng sinh làm tâm",
    "category": "skill",
    "icon": "📜",
    "price": 0,
    "sellPrice": 20,
    "desc": "Kỹ năng bị động, sau khi tử vong có 70% tỷ lệ hồi sinh",
    "effect": {
      "isSkillBook": true,
      "bookIndex": 12
    }
  },
  "item_48": {
    "id": 48,
    "code": "item_48",
    "name": "May mắn ngôi sao",
    "category": "skill",
    "icon": "📜",
    "price": 0,
    "sellPrice": 20,
    "desc": "Mang theo sủng vật, làm chủ kỹ năng, di chuyển để gia tăng tỷ lệ gặp được sủng vật quý hiếm",
    "effect": {
      "isSkillBook": true,
      "bookIndex": 13
    }
  },
  "item_49": {
    "id": 49,
    "code": "item_49",
    "name": "Trung thành đồng bọn",
    "category": "skill",
    "icon": "📜",
    "price": 0,
    "sellPrice": 20,
    "desc": "Kỹ năng bị động, độ trung thành của sủng vật vĩnh không giảm thiếu",
    "effect": {
      "isSkillBook": true,
      "bookIndex": 14
    }
  },
  "item_50": {
    "id": 50,
    "code": "item_50",
    "name": "Thân hòa thiên sứ",
    "category": "skill",
    "icon": "📜",
    "price": 0,
    "sellPrice": 20,
    "desc": "nắm vững kỹ năng sau khi bắt được kẻ địch thất bại không chạy trốn [chuẩn bị bắt được sủng vật quý hiếm]",
    "effect": {
      "isSkillBook": true,
      "bookIndex": 15
    }
  },
  "item_51": {
    "id": 51,
    "code": "item_51",
    "name": "Chạy trối chết chuyên gia",
    "category": "skill",
    "icon": "📜",
    "price": 0,
    "sellPrice": 20,
    "desc": "Kỹ năng bị động, chạy trốn nhất định thành công",
    "effect": {
      "isSkillBook": true,
      "bookIndex": 16
    }
  },
  "item_52": {
    "id": 52,
    "code": "item_52",
    "name": "Hoa cỏ Ý Chí",
    "category": "skill",
    "icon": "📜",
    "price": 0,
    "sellPrice": 20,
    "desc": "Kỹ năng bị động, Chiến đấu ở khu vực hoa viên là ưu thế của sủng vật Thực Vật hệ",
    "effect": {
      "isSkillBook": true,
      "bookIndex": 17
    }
  },
  "item_53": {
    "id": 53,
    "code": "item_53",
    "name": "Kim Loại Ý Chí",
    "category": "skill",
    "icon": "📜",
    "price": 0,
    "sellPrice": 20,
    "desc": "Kỹ năng bị động, Chiến đấu trên vùng di tích là ưu thế của sủng vật Kim Loại hệ",
    "effect": {
      "isSkillBook": true,
      "bookIndex": 18
    }
  },
  "item_54": {
    "id": 54,
    "code": "item_54",
    "name": "Bầu trời Ý Chí",
    "category": "skill",
    "icon": "📜",
    "price": 0,
    "sellPrice": 20,
    "desc": "Kỹ năng bị động, Chiến đấu trên không trung là ưu thế của sủng vật Phi Hành hệ",
    "effect": {
      "isSkillBook": true,
      "bookIndex": 19
    }
  },
  "item_55": {
    "id": 55,
    "code": "item_55",
    "name": "Dã thú Ý Chí",
    "category": "skill",
    "icon": "📜",
    "price": 0,
    "sellPrice": 20,
    "desc": "Kỹ năng bị động, Chiến đấu ở vùng đồng bằng là ưu thế của sủng vật Mãnh Thú hệ",
    "effect": {
      "isSkillBook": true,
      "bookIndex": 20
    }
  },
  "item_56": {
    "id": 56,
    "code": "item_56",
    "name": "Biển rộng Ý Chí",
    "category": "skill",
    "icon": "📜",
    "price": 0,
    "sellPrice": 20,
    "desc": "Kỹ năng bị động, Chiến đấu trên đại dương là ưu thế của sủng vật Hải Dương hệ",
    "effect": {
      "isSkillBook": true,
      "bookIndex": 21
    }
  },
  "item_57": {
    "id": 57,
    "code": "item_57",
    "name": "Thế thân tượng gỗ",
    "category": "skill",
    "icon": "📜",
    "price": 0,
    "sellPrice": 20,
    "desc": "Kỹ năng bị động, bị công kích có 30% tỷ lệ né tránh",
    "effect": {
      "isSkillBook": true,
      "bookIndex": 22
    }
  },
  "item_58": {
    "id": 58,
    "code": "item_58",
    "name": "Thực Vật hệ",
    "category": "egg",
    "icon": "🥚",
    "price": 0,
    "sellPrice": 20,
    "desc": "Có thể ấp trứng sủng vật ra sủng vật Thực Vật hệ",
    "effect": {
      "isPetEgg": true
    }
  },
  "item_59": {
    "id": 59,
    "code": "item_59",
    "name": "Thực Vật hệ",
    "category": "egg",
    "icon": "🥚",
    "price": 0,
    "sellPrice": 20,
    "desc": "Có thể ấp trứng sủng vật ra sủng vật Thực Vật hệ",
    "effect": {
      "isPetEgg": true
    }
  },
  "item_60": {
    "id": 60,
    "code": "item_60",
    "name": "Kim Loại hệ",
    "category": "egg",
    "icon": "🥚",
    "price": 0,
    "sellPrice": 20,
    "desc": "Có thể ấp trứng sủng vật ra sủng vật Kim Loại hệ",
    "effect": {
      "isPetEgg": true
    }
  },
  "item_61": {
    "id": 61,
    "code": "item_61",
    "name": "Kim Loại hệ",
    "category": "egg",
    "icon": "🥚",
    "price": 0,
    "sellPrice": 20,
    "desc": "Có thể ấp trứng sủng vật ra sủng vật Kim Loại hệ",
    "effect": {
      "isPetEgg": true
    }
  },
  "item_62": {
    "id": 62,
    "code": "item_62",
    "name": "Bầu trời hệ",
    "category": "egg",
    "icon": "🥚",
    "price": 0,
    "sellPrice": 20,
    "desc": "Có thể ấp trứng sủng vật ra sủng vật Phi Hành hệ",
    "effect": {
      "isPetEgg": true
    }
  },
  "item_63": {
    "id": 63,
    "code": "item_63",
    "name": "Mãnh Thú hệ",
    "category": "egg",
    "icon": "🥚",
    "price": 0,
    "sellPrice": 20,
    "desc": "Có thể ấp trứng sủng vật ra sủng vật Mãnh Thú hệ",
    "effect": {
      "isPetEgg": true
    }
  },
  "item_64": {
    "id": 64,
    "code": "item_64",
    "name": "Hải Dương hệ",
    "category": "egg",
    "icon": "🥚",
    "price": 0,
    "sellPrice": 20,
    "desc": "Có thể ấp trứng sủng vật ra sủng vật Hải Dương hệ",
    "effect": {
      "isPetEgg": true
    }
  },
  "item_65": {
    "id": 65,
    "code": "item_65",
    "name": "Thực Vật hệ",
    "category": "egg",
    "icon": "🥚",
    "price": 100,
    "sellPrice": 20,
    "desc": "Có thể ấp trứng sủng vật ra sủng vật Thực Vật hệ",
    "effect": {
      "isPetEgg": true
    }
  },
  "item_66": {
    "id": 66,
    "code": "item_66",
    "name": "Kim Loại hệ",
    "category": "egg",
    "icon": "🥚",
    "price": 100,
    "sellPrice": 20,
    "desc": "Có thể ấp trứng sủng vật ra sủng vật Kim Loại hệ",
    "effect": {
      "isPetEgg": true
    }
  },
  "item_67": {
    "id": 67,
    "code": "item_67",
    "name": "Bầu trời hệ",
    "category": "egg",
    "icon": "🥚",
    "price": 100,
    "sellPrice": 20,
    "desc": "Có thể ấp trứng sủng vật ra sủng vật Phi Hành hệ",
    "effect": {
      "isPetEgg": true
    }
  },
  "item_68": {
    "id": 68,
    "code": "item_68",
    "name": "Mãnh Thú hệ",
    "category": "egg",
    "icon": "🥚",
    "price": 100,
    "sellPrice": 20,
    "desc": "Có thể ấp trứng sủng vật ra sủng vật Mãnh Thú hệ",
    "effect": {
      "isPetEgg": true
    }
  },
  "item_69": {
    "id": 69,
    "code": "item_69",
    "name": "Hải Dương hệ trứng sủng vật",
    "category": "egg",
    "icon": "🥚",
    "price": 100,
    "sellPrice": 20,
    "desc": "Có thể ấp trứng sủng vật ra sủng vật Hải Dương hệ",
    "effect": {
      "isPetEgg": true
    }
  },
  "potion": {
    "id": "potion",
    "code": "item_0",
    "name": "Đồ uống",
    "category": "recovery",
    "icon": "🧪",
    "price": 50,
    "sellPrice": 10,
    "desc": "Hồi phục sinh mệnh 35%",
    "effect": {
      "healHpPercent": 35
    },
    "aliasTo": "item_0"
  },
  "superPotion": {
    "id": "superPotion",
    "code": "item_1",
    "name": "Bánh bích quy",
    "category": "recovery",
    "icon": "🍪",
    "price": 100,
    "sellPrice": 20,
    "desc": "Hồi phục sinh mệnh 65%",
    "effect": {
      "healHpPercent": 65
    },
    "aliasTo": "item_1"
  },
  "chocolate": {
    "id": "chocolate",
    "code": "item_2",
    "name": "Chocolate",
    "category": "recovery",
    "icon": "🍫",
    "price": 300,
    "sellPrice": 60,
    "desc": "Hồi phục toàn bộ sinh mệnh",
    "effect": {
      "healHpPercent": 100
    },
    "aliasTo": "item_2"
  },
  "ether": {
    "id": "ether",
    "code": "item_3",
    "name": "Năng lượng thạch",
    "category": "recovery",
    "icon": "🔷",
    "price": 100,
    "sellPrice": 20,
    "desc": "Hồi phục giá trị kỹ năng 50%",
    "effect": {
      "healMpPercent": 50
    },
    "aliasTo": "item_3"
  },
  "elixir": {
    "id": "elixir",
    "code": "item_6",
    "name": "Hoàng kim đường",
    "category": "recovery",
    "icon": "🍬",
    "price": 1000,
    "sellPrice": 200,
    "desc": "Hồi phục toàn bộ giá trị sinh mệnh và kỹ năng",
    "effect": {
      "healHpPercent": 100,
      "healMpPercent": 100
    },
    "aliasTo": "item_6"
  },
  "revive": {
    "id": "revive",
    "code": "item_7",
    "name": "sinh mệnh thạch",
    "category": "recovery",
    "icon": "💖",
    "price": 400,
    "sellPrice": 80,
    "desc": "Hồi sinh kéo theo sủng vật hồi phục giá trị sinh mệnh 30%",
    "effect": {
      "revivePercent": 30
    },
    "aliasTo": "item_7"
  },
  "pokeballs": {
    "id": "pokeballs",
    "code": "item_9",
    "name": "Phong ấn cầu",
    "category": "ball",
    "icon": "🔴",
    "price": 150,
    "sellPrice": 30,
    "desc": "Chuẩn bị bắt sủng vật, hiệu quả bình thường",
    "effect": {
      "catchRate": 1
    },
    "aliasTo": "item_9"
  },
  "greatBalls": {
    "id": "greatBalls",
    "code": "item_10",
    "name": "Cao cấp cầu",
    "category": "ball",
    "icon": "🔵",
    "price": 300,
    "sellPrice": 60,
    "desc": "Chuẩn bị bắt sủng vật, hiệu quả rất tốt",
    "effect": {
      "catchRate": 1.8
    },
    "aliasTo": "item_10"
  },
  "masterBalls": {
    "id": "masterBalls",
    "code": "item_11",
    "name": "Đại sư cầu",
    "category": "ball",
    "icon": "🟣",
    "price": 200,
    "sellPrice": 40,
    "desc": "Chuẩn bị bắt được, 100% thành công",
    "effect": {
      "catchRate": 99
    },
    "aliasTo": "item_11"
  },
  "leafStone": {
    "id": "leafStone",
    "code": "item_18",
    "name": "Thụ chướng thạch",
    "category": "stone",
    "icon": "🍃",
    "price": 500,
    "sellPrice": 100,
    "desc": "Tài liệu tiến hóa cơ bản của sủng vật Thực Vật",
    "effect": {
      "isEvolutionMaterial": true,
      "materialId": 18
    },
    "aliasTo": "item_18"
  },
  "waterStone": {
    "id": "waterStone",
    "code": "item_20",
    "name": "Bong bóng",
    "category": "stone",
    "icon": "💧",
    "price": 500,
    "sellPrice": 100,
    "desc": "Tài liệu tiến hóa cơ bản của sủng vật Hải Dương hệ",
    "effect": {
      "isEvolutionMaterial": true,
      "materialId": 20
    },
    "aliasTo": "item_20"
  },
  "fireStone": {
    "id": "fireStone",
    "code": "item_16",
    "name": "Cứng cỏi thạch",
    "category": "stone",
    "icon": "🔥",
    "price": 500,
    "sellPrice": 100,
    "desc": "Tài liệu tiến hóa cơ bản của sủng vật Mãnh Thú hệ",
    "effect": {
      "isEvolutionMaterial": true,
      "materialId": 16
    },
    "aliasTo": "item_16"
  },
  "thunderStone": {
    "id": "thunderStone",
    "code": "item_22",
    "name": "Cách không thạch",
    "category": "stone",
    "icon": "🌪️",
    "price": 500,
    "sellPrice": 100,
    "desc": "Tài liệu tiến hóa cơ bản của sủng vật Phi Hành hệ",
    "effect": {
      "isEvolutionMaterial": true,
      "materialId": 22
    },
    "aliasTo": "item_22"
  },
  "repel": {
    "id": "repel",
    "code": "item_14",
    "name": "Tránh quái hoàn",
    "category": "support",
    "icon": "💨",
    "price": 300,
    "sellPrice": 60,
    "desc": "Trong thời gian ngắn sẽ không gặp địch",
    "effect": {
      "loyalty": 0,
      "repel": 100
    },
    "aliasTo": "item_14"
  }
};

const SHOP_CATALOG = {
  "supplies": {
    "id": "supplies",
    "name": "Tiệm Tạp Hóa & Dược Phẩm",
    "icon": "🧪",
    "itemIds": [
      0,
      1,
      2,
      3,
      4,
      5,
      6,
      7,
      8,
      9,
      10,
      14,
      12,
      15,
      33
    ]
  },
  "evolution": {
    "id": "evolution",
    "name": "Tiệm Đá Tiến Hóa Ngũ Hệ",
    "icon": "💎",
    "itemIds": [
      16,
      17,
      18,
      19,
      20,
      21,
      22,
      23,
      24,
      25
    ]
  },
  "skills": {
    "id": "skills",
    "name": "Tiệm Bí Kíp Sách Kỹ Năng",
    "icon": "📜",
    "itemIds": [
      11,
      36,
      45,
      48,
      50,
      51,
      52,
      53,
      54,
      55,
      56,
      37,
      39,
      40,
      41,
      42,
      43,
      44,
      46,
      57,
      35,
      49,
      38,
      47
    ]
  }
};

if (typeof window !== 'undefined') {
    window.ITEMS_CONFIG = ITEMS_CONFIG;
    window.SHOP_CATALOG = SHOP_CATALOG;
}
