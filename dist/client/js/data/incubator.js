/**
 * GAME ANIMON - HỆ THỐNG ẤP TRỨNG & TRÙM ĐẤU TRƯỜNG REA J2ME
 * Dữ liệu giải mã từ data/box.d và data/boss.d
 */

window.INCUBATOR_CONFIG = {
    eggConfig: {
    "item_4": {
        "name": "Trứng Thực Vật",
        "element": "Thực Vật",
        "color": "#4caf50",
        "stepsRequired": 100,
        "pool": [
            0,
            1,
            2,
            3,
            4,
            15,
            16
        ],
        "desc": "Trứng chứa phôi thai sủng vật hệ Thực Vật quý hiếm."
    },
    "item_5": {
        "name": "Trứng Kim Loại",
        "element": "Kim Loại",
        "color": "#ff9800",
        "stepsRequired": 120,
        "pool": [
            20,
            21,
            22,
            23,
            30,
            31
        ],
        "desc": "Trứng sủng vật hệ Kim Loại với lớp vỏ cứng như thép."
    },
    "item_6": {
        "name": "Trứng Phi Hành",
        "element": "Phi Hành",
        "color": "#00bcd4",
        "stepsRequired": 110,
        "pool": [
            40,
            41,
            42,
            43,
            50,
            51
        ],
        "desc": "Trứng sủng vật hệ Phi Hành nhẹ như lông vũ."
    },
    "item_7": {
        "name": "Trứng Mãnh Thú",
        "element": "Mãnh Thú",
        "color": "#f44336",
        "stepsRequired": 130,
        "pool": [
            60,
            61,
            62,
            63,
            70,
            71
        ],
        "desc": "Trứng sủng vật hệ Mãnh Thú toát ra khí tức cuồng bạo."
    },
    "item_8": {
        "name": "Trứng Hải Dương",
        "element": "Hải Dương",
        "color": "#2196f3",
        "stepsRequired": 115,
        "pool": [
            80,
            81,
            82,
            83,
            90,
            91
        ],
        "desc": "Trứng sủng vật hệ Hải Dương bao bọc bởi màng nước mát rượi."
    }
},
    rawBoxTables: [
    [
        0,
        25,
        1,
        45,
        3,
        65,
        6,
        70,
        10,
        80,
        12,
        90,
        14,
        99,
        255,
        100
    ],
    [
        13,
        10,
        32,
        20,
        33,
        40,
        34,
        80,
        255,
        100
    ],
    [
        35,
        15,
        41,
        25,
        51,
        35,
        52,
        45,
        53,
        55,
        54,
        65,
        55,
        75,
        255,
        100
    ],
    [
        26,
        20,
        27,
        40,
        28,
        50,
        30,
        60,
        31,
        70,
        255,
        100
    ]
],
    acceleratorItems: {
        'item_13': { name: 'Dược Thủy Ấp Trứng', speedBoost: 50 },
        'item_3': { name: 'Thức Ăn Thú Cưng', speedBoost: 20 }
    }
};

window.ROYAL_BOSSES = [
    {
        "id": "boss_0",
        "bossIndex": 0,
        "monsterId": 0,
        "name": "Trùm Thụ quái",
        "baseLevel": 10,
        "skills": [
            26,
            26
        ],
        "rewardExp": 300,
        "rewardGold": 200
    },
    {
        "id": "boss_1",
        "bossIndex": 1,
        "monsterId": 1,
        "name": "Trùm Bụi gai",
        "baseLevel": 10,
        "skills": [
            26,
            26
        ],
        "rewardExp": 370,
        "rewardGold": 250
    },
    {
        "id": "boss_2",
        "bossIndex": 2,
        "monsterId": 2,
        "name": "Trùm Cây chứa dịch độc",
        "baseLevel": 11,
        "skills": [
            26,
            26
        ],
        "rewardExp": 440,
        "rewardGold": 300
    },
    {
        "id": "boss_3",
        "bossIndex": 3,
        "monsterId": 3,
        "name": "Trùm Cổ Thụ Chi Vương",
        "baseLevel": 12,
        "skills": [
            26,
            26
        ],
        "rewardExp": 510,
        "rewardGold": 350
    },
    {
        "id": "boss_4",
        "bossIndex": 4,
        "monsterId": 4,
        "name": "Trùm Cỏ thơm",
        "baseLevel": 13,
        "skills": [
            26,
            26
        ],
        "rewardExp": 580,
        "rewardGold": 400
    },
    {
        "id": "boss_5",
        "bossIndex": 5,
        "monsterId": 5,
        "name": "Trùm Hoa ngũ sắc",
        "baseLevel": 14,
        "skills": [
            26,
            26
        ],
        "rewardExp": 650,
        "rewardGold": 450
    },
    {
        "id": "boss_6",
        "bossIndex": 6,
        "monsterId": 6,
        "name": "Trùm Hoa ăn thịt người",
        "baseLevel": 14,
        "skills": [
            26,
            26
        ],
        "rewardExp": 720,
        "rewardGold": 500
    },
    {
        "id": "boss_7",
        "bossIndex": 7,
        "monsterId": 7,
        "name": "Trùm Thảo quả",
        "baseLevel": 15,
        "skills": [
            26,
            26
        ],
        "rewardExp": 790,
        "rewardGold": 550
    },
    {
        "id": "boss_8",
        "bossIndex": 8,
        "monsterId": 8,
        "name": "Trùm Mạn đà la",
        "baseLevel": 16,
        "skills": [
            26,
            26
        ],
        "rewardExp": 860,
        "rewardGold": 600
    },
    {
        "id": "boss_9",
        "bossIndex": 9,
        "monsterId": 9,
        "name": "Trùm Hoa Mạn đà la",
        "baseLevel": 17,
        "skills": [
            26,
            26
        ],
        "rewardExp": 930,
        "rewardGold": 650
    },
    {
        "id": "boss_10",
        "bossIndex": 10,
        "monsterId": 10,
        "name": "Trùm Tiên Nhân Chưởng",
        "baseLevel": 18,
        "skills": [
            26,
            26
        ],
        "rewardExp": 1000,
        "rewardGold": 700
    },
    {
        "id": "boss_11",
        "bossIndex": 11,
        "monsterId": 11,
        "name": "Trùm Gai khổng lồ",
        "baseLevel": 18,
        "skills": [
            26,
            26
        ],
        "rewardExp": 1070,
        "rewardGold": 750
    },
    {
        "id": "boss_12",
        "bossIndex": 12,
        "monsterId": 12,
        "name": "Trùm Gai độc",
        "baseLevel": 19,
        "skills": [
            26,
            26
        ],
        "rewardExp": 1140,
        "rewardGold": 800
    },
    {
        "id": "boss_13",
        "bossIndex": 13,
        "monsterId": 13,
        "name": "Trùm Quả Tử Tiểu Tả",
        "baseLevel": 20,
        "skills": [
            26,
            26
        ],
        "rewardExp": 1210,
        "rewardGold": 850
    },
    {
        "id": "boss_14",
        "bossIndex": 14,
        "monsterId": 14,
        "name": "Trùm Tứ Diệp Tiểu Tả",
        "baseLevel": 21,
        "skills": [
            26,
            26
        ],
        "rewardExp": 1280,
        "rewardGold": 900
    },
    {
        "id": "boss_15",
        "bossIndex": 15,
        "monsterId": 15,
        "name": "Trùm Bá Vương Hoa",
        "baseLevel": 22,
        "skills": [
            26,
            26
        ],
        "rewardExp": 1350,
        "rewardGold": 950
    },
    {
        "id": "boss_16",
        "bossIndex": 16,
        "monsterId": 16,
        "name": "Trùm Ái Tâm Thảo",
        "baseLevel": 22,
        "skills": [
            26,
            26
        ],
        "rewardExp": 1420,
        "rewardGold": 1000
    },
    {
        "id": "boss_17",
        "bossIndex": 17,
        "monsterId": 17,
        "name": "Trùm Bạch Liệt Sư",
        "baseLevel": 23,
        "skills": [
            26,
            26
        ],
        "rewardExp": 1490,
        "rewardGold": 1050
    },
    {
        "id": "boss_18",
        "bossIndex": 18,
        "monsterId": 18,
        "name": "Trùm Vương Sư",
        "baseLevel": 24,
        "skills": [
            26,
            26
        ],
        "rewardExp": 1560,
        "rewardGold": 1100
    },
    {
        "id": "boss_19",
        "bossIndex": 19,
        "monsterId": 19,
        "name": "Trùm Đế Vương Sư",
        "baseLevel": 25,
        "skills": [
            26,
            26
        ],
        "rewardExp": 1630,
        "rewardGold": 1150
    },
    {
        "id": "boss_20",
        "bossIndex": 20,
        "monsterId": 20,
        "name": "Trùm Thủy Tinh Hùng Sư",
        "baseLevel": 26,
        "skills": [
            26,
            26
        ],
        "rewardExp": 1700,
        "rewardGold": 1200
    },
    {
        "id": "boss_21",
        "bossIndex": 21,
        "monsterId": 21,
        "name": "Trùm Xích Đồng Xà",
        "baseLevel": 26,
        "skills": [
            26,
            26
        ],
        "rewardExp": 1770,
        "rewardGold": 1250
    },
    {
        "id": "boss_22",
        "bossIndex": 22,
        "monsterId": 22,
        "name": "Trùm Thiết Giáp Xà",
        "baseLevel": 27,
        "skills": [
            26,
            26
        ],
        "rewardExp": 1840,
        "rewardGold": 1300
    },
    {
        "id": "boss_23",
        "bossIndex": 23,
        "monsterId": 23,
        "name": "Trùm Xích Kim Xà Vương",
        "baseLevel": 28,
        "skills": [
            26,
            26
        ],
        "rewardExp": 1910,
        "rewardGold": 1350
    },
    {
        "id": "boss_24",
        "bossIndex": 24,
        "monsterId": 24,
        "name": "Trùm Xích Kim Xà Hậu",
        "baseLevel": 29,
        "skills": [
            26,
            26
        ],
        "rewardExp": 1980,
        "rewardGold": 1400
    },
    {
        "id": "boss_25",
        "bossIndex": 25,
        "monsterId": 25,
        "name": "Trùm Binh lính Thiết Giáp",
        "baseLevel": 30,
        "skills": [
            26,
            26
        ],
        "rewardExp": 2050,
        "rewardGold": 1450
    },
    {
        "id": "boss_26",
        "bossIndex": 26,
        "monsterId": 26,
        "name": "Trùm Đội trưởng Thiết Giáp",
        "baseLevel": 30,
        "skills": [
            26,
            26
        ],
        "rewardExp": 2120,
        "rewardGold": 1500
    },
    {
        "id": "boss_27",
        "bossIndex": 27,
        "monsterId": 27,
        "name": "Trùm Tướng Thiết Giáp",
        "baseLevel": 31,
        "skills": [
            26,
            26
        ],
        "rewardExp": 2190,
        "rewardGold": 1550
    },
    {
        "id": "boss_28",
        "bossIndex": 28,
        "monsterId": 28,
        "name": "Trùm Song Đao Tướng Quân",
        "baseLevel": 32,
        "skills": [
            26,
            26
        ],
        "rewardExp": 2260,
        "rewardGold": 1600
    },
    {
        "id": "boss_29",
        "bossIndex": 29,
        "monsterId": 29,
        "name": "Trùm Đao Thương Tướng Quân",
        "baseLevel": 33,
        "skills": [
            26,
            26
        ],
        "rewardExp": 2330,
        "rewardGold": 1650
    },
    {
        "id": "boss_30",
        "bossIndex": 30,
        "monsterId": 30,
        "name": "Trùm Thiết Đầu",
        "baseLevel": 34,
        "skills": [
            26,
            26
        ],
        "rewardExp": 2400,
        "rewardGold": 1700
    },
    {
        "id": "boss_31",
        "bossIndex": 31,
        "monsterId": 31,
        "name": "Trùm Thiết Cự Nhân",
        "baseLevel": 34,
        "skills": [
            26,
            26
        ],
        "rewardExp": 2470,
        "rewardGold": 1750
    },
    {
        "id": "boss_32",
        "bossIndex": 32,
        "monsterId": 32,
        "name": "Trùm Thiết Cự Linh",
        "baseLevel": 35,
        "skills": [
            26,
            26
        ],
        "rewardExp": 2540,
        "rewardGold": 1800
    },
    {
        "id": "boss_33",
        "bossIndex": 33,
        "monsterId": 33,
        "name": "Trùm Người điện",
        "baseLevel": 36,
        "skills": [
            26,
            26
        ],
        "rewardExp": 2610,
        "rewardGold": 1850
    },
    {
        "id": "boss_34",
        "bossIndex": 34,
        "monsterId": 34,
        "name": "Trùm Đồng Cầu huynh đệ",
        "baseLevel": 37,
        "skills": [
            26,
            26
        ],
        "rewardExp": 2680,
        "rewardGold": 1900
    },
    {
        "id": "boss_35",
        "bossIndex": 35,
        "monsterId": 35,
        "name": "Trùm Thiết Cầu huynh đệ",
        "baseLevel": 38,
        "skills": [
            26,
            26,
            50
        ],
        "rewardExp": 2750,
        "rewardGold": 1950
    },
    {
        "id": "boss_36",
        "bossIndex": 36,
        "monsterId": 36,
        "name": "Trùm Ấu Long",
        "baseLevel": 38,
        "skills": [
            26,
            26
        ],
        "rewardExp": 2820,
        "rewardGold": 2000
    },
    {
        "id": "boss_37",
        "bossIndex": 37,
        "monsterId": 37,
        "name": "Trùm Tiểu Bạch Long",
        "baseLevel": 39,
        "skills": [
            26,
            26
        ],
        "rewardExp": 2890,
        "rewardGold": 2050
    },
    {
        "id": "boss_38",
        "bossIndex": 38,
        "monsterId": 38,
        "name": "Trùm Kim Dực Long",
        "baseLevel": 40,
        "skills": [
            26,
            26
        ],
        "rewardExp": 2960,
        "rewardGold": 2100
    },
    {
        "id": "boss_39",
        "bossIndex": 39,
        "monsterId": 39,
        "name": "Trùm Bạch Kim Long",
        "baseLevel": 41,
        "skills": [
            26,
            26
        ],
        "rewardExp": 3030,
        "rewardGold": 2150
    },
    {
        "id": "boss_40",
        "bossIndex": 40,
        "monsterId": 40,
        "name": "Trùm Ưng",
        "baseLevel": 42,
        "skills": [
            26,
            26
        ],
        "rewardExp": 3100,
        "rewardGold": 2200
    },
    {
        "id": "boss_41",
        "bossIndex": 41,
        "monsterId": 41,
        "name": "Trùm Vương Thứu",
        "baseLevel": 42,
        "skills": [
            26,
            26
        ],
        "rewardExp": 3170,
        "rewardGold": 2250
    },
    {
        "id": "boss_42",
        "bossIndex": 42,
        "monsterId": 42,
        "name": "Trùm Sư Thứu",
        "baseLevel": 43,
        "skills": [
            26,
            26
        ],
        "rewardExp": 3240,
        "rewardGold": 2300
    },
    {
        "id": "boss_43",
        "bossIndex": 43,
        "monsterId": 43,
        "name": "Trùm Dơi khổng lồ",
        "baseLevel": 44,
        "skills": [
            26,
            26
        ],
        "rewardExp": 3310,
        "rewardGold": 2350
    },
    {
        "id": "boss_44",
        "bossIndex": 44,
        "monsterId": 44,
        "name": "Trùm Răng nanh của dơi",
        "baseLevel": 45,
        "skills": [
            26,
            26
        ],
        "rewardExp": 3380,
        "rewardGold": 2400
    },
    {
        "id": "boss_45",
        "bossIndex": 45,
        "monsterId": 45,
        "name": "Trùm Tần số của dơi",
        "baseLevel": 46,
        "skills": [
            26,
            26
        ],
        "rewardExp": 3450,
        "rewardGold": 2450
    },
    {
        "id": "boss_46",
        "bossIndex": 46,
        "monsterId": 46,
        "name": "Trùm Thiên Mã cánh bạc",
        "baseLevel": 46,
        "skills": [
            26,
            26
        ],
        "rewardExp": 3520,
        "rewardGold": 2500
    },
    {
        "id": "boss_47",
        "bossIndex": 47,
        "monsterId": 47,
        "name": "Trùm Thiên Mã một sừng",
        "baseLevel": 47,
        "skills": [
            26,
            26
        ],
        "rewardExp": 3590,
        "rewardGold": 2550
    },
    {
        "id": "boss_48",
        "bossIndex": 48,
        "monsterId": 48,
        "name": "Trùm Thiên Mã Vương",
        "baseLevel": 48,
        "skills": [
            26,
            26
        ],
        "rewardExp": 3660,
        "rewardGold": 2600
    },
    {
        "id": "boss_49",
        "bossIndex": 49,
        "monsterId": 49,
        "name": "Trùm Mao Cầu Điểu",
        "baseLevel": 49,
        "skills": [
            26,
            26
        ],
        "rewardExp": 3730,
        "rewardGold": 2650
    },
    {
        "id": "boss_50",
        "bossIndex": 50,
        "monsterId": 50,
        "name": "Trùm Phiêu Phù Mao Cầu",
        "baseLevel": 50,
        "skills": [
            26,
            26
        ],
        "rewardExp": 3800,
        "rewardGold": 2700
    },
    {
        "id": "boss_51",
        "bossIndex": 51,
        "monsterId": 51,
        "name": "Trùm Pháp Quan Mao Cầu",
        "baseLevel": 50,
        "skills": [
            26,
            26
        ],
        "rewardExp": 3870,
        "rewardGold": 2750
    },
    {
        "id": "boss_52",
        "bossIndex": 52,
        "monsterId": 52,
        "name": "Trùm Hổ Thú",
        "baseLevel": 51,
        "skills": [
            26,
            26
        ],
        "rewardExp": 3940,
        "rewardGold": 2800
    },
    {
        "id": "boss_53",
        "bossIndex": 53,
        "monsterId": 53,
        "name": "Trùm Công phu hổ",
        "baseLevel": 52,
        "skills": [
            26,
            26
        ],
        "rewardExp": 4010,
        "rewardGold": 2850
    },
    {
        "id": "boss_54",
        "bossIndex": 54,
        "monsterId": 54,
        "name": "Trùm Hổ Dũng Sĩ",
        "baseLevel": 53,
        "skills": [
            26,
            26
        ],
        "rewardExp": 4080,
        "rewardGold": 2900
    },
    {
        "id": "boss_55",
        "bossIndex": 55,
        "monsterId": 55,
        "name": "Trùm Hổ Tù Trường",
        "baseLevel": 54,
        "skills": [
            26,
            26
        ],
        "rewardExp": 4150,
        "rewardGold": 2950
    },
    {
        "id": "boss_56",
        "bossIndex": 56,
        "monsterId": 56,
        "name": "Trùm Ngựa núi",
        "baseLevel": 54,
        "skills": [
            26,
            26
        ],
        "rewardExp": 4220,
        "rewardGold": 3000
    },
    {
        "id": "boss_57",
        "bossIndex": 57,
        "monsterId": 57,
        "name": "Trùm Ngựa vằn",
        "baseLevel": 55,
        "skills": [
            26,
            26
        ],
        "rewardExp": 4290,
        "rewardGold": 3050
    },
    {
        "id": "boss_58",
        "bossIndex": 58,
        "monsterId": 58,
        "name": "Trùm Ngựa lưỡi liềm khổng lồ",
        "baseLevel": 56,
        "skills": [
            26,
            26
        ],
        "rewardExp": 4360,
        "rewardGold": 3100
    },
    {
        "id": "boss_59",
        "bossIndex": 59,
        "monsterId": 59,
        "name": "Trùm Heo núi",
        "baseLevel": 57,
        "skills": [
            26,
            26
        ],
        "rewardExp": 4430,
        "rewardGold": 3150
    },
    {
        "id": "boss_60",
        "bossIndex": 60,
        "monsterId": 60,
        "name": "Trùm Heo răng nanh khổng lồ",
        "baseLevel": 58,
        "skills": [
            26,
            26
        ],
        "rewardExp": 4500,
        "rewardGold": 3200
    },
    {
        "id": "boss_61",
        "bossIndex": 61,
        "monsterId": 61,
        "name": "Trùm Trư Vương",
        "baseLevel": 58,
        "skills": [
            26,
            26
        ],
        "rewardExp": 4570,
        "rewardGold": 3250
    },
    {
        "id": "boss_62",
        "bossIndex": 62,
        "monsterId": 62,
        "name": "Trùm Heo đốm",
        "baseLevel": 59,
        "skills": [
            26,
            26
        ],
        "rewardExp": 4640,
        "rewardGold": 3300
    },
    {
        "id": "boss_63",
        "bossIndex": 63,
        "monsterId": 63,
        "name": "Trùm Sơn báo",
        "baseLevel": 60,
        "skills": [
            26,
            26
        ],
        "rewardExp": 4710,
        "rewardGold": 3350
    },
    {
        "id": "boss_64",
        "bossIndex": 64,
        "monsterId": 64,
        "name": "Trùm Beo răng kiếm",
        "baseLevel": 61,
        "skills": [
            26,
            26
        ],
        "rewardExp": 4780,
        "rewardGold": 3400
    },
    {
        "id": "boss_65",
        "bossIndex": 65,
        "monsterId": 65,
        "name": "Trùm Mị Ảnh",
        "baseLevel": 62,
        "skills": [
            26,
            26
        ],
        "rewardExp": 4850,
        "rewardGold": 3450
    },
    {
        "id": "boss_66",
        "bossIndex": 66,
        "monsterId": 66,
        "name": "Trùm Dị Thú",
        "baseLevel": 62,
        "skills": [
            26,
            26
        ],
        "rewardExp": 4920,
        "rewardGold": 3500
    },
    {
        "id": "boss_67",
        "bossIndex": 67,
        "monsterId": 67,
        "name": "Trùm Chân Dị Thú",
        "baseLevel": 63,
        "skills": [
            26,
            26
        ],
        "rewardExp": 4990,
        "rewardGold": 3550
    },
    {
        "id": "boss_68",
        "bossIndex": 68,
        "monsterId": 68,
        "name": "Trùm Tiểu Lam Kình",
        "baseLevel": 64,
        "skills": [
            26,
            26
        ],
        "rewardExp": 5060,
        "rewardGold": 3600
    },
    {
        "id": "boss_69",
        "bossIndex": 69,
        "monsterId": 69,
        "name": "Trùm Cá Kình khổng lồ",
        "baseLevel": 65,
        "skills": [
            26,
            26
        ],
        "rewardExp": 5130,
        "rewardGold": 3650
    },
    {
        "id": "boss_70",
        "bossIndex": 70,
        "monsterId": 70,
        "name": "Trùm Cá Kình một sừng",
        "baseLevel": 66,
        "skills": [
            26,
            26
        ],
        "rewardExp": 5200,
        "rewardGold": 3700
    },
    {
        "id": "boss_71",
        "bossIndex": 71,
        "monsterId": 71,
        "name": "Trùm Yếu Tắc Kình",
        "baseLevel": 66,
        "skills": [
            26,
            26
        ],
        "rewardExp": 5270,
        "rewardGold": 3750
    },
    {
        "id": "boss_72",
        "bossIndex": 72,
        "monsterId": 72,
        "name": "Trùm Tiểu Cánh Cụt",
        "baseLevel": 67,
        "skills": [
            26,
            26
        ],
        "rewardExp": 5340,
        "rewardGold": 3800
    },
    {
        "id": "boss_73",
        "bossIndex": 73,
        "monsterId": 73,
        "name": "Trùm Đao Phong Cánh Cụt",
        "baseLevel": 68,
        "skills": [
            26,
            26
        ],
        "rewardExp": 5410,
        "rewardGold": 3850
    },
    {
        "id": "boss_74",
        "bossIndex": 74,
        "monsterId": 74,
        "name": "Trùm Đế Vương Cánh Cụt",
        "baseLevel": 69,
        "skills": [
            26,
            26
        ],
        "rewardExp": 5480,
        "rewardGold": 3900
    },
    {
        "id": "boss_75",
        "bossIndex": 75,
        "monsterId": 75,
        "name": "Trùm Hải Quy (rùa biển)",
        "baseLevel": 70,
        "skills": [
            26,
            26
        ],
        "rewardExp": 5550,
        "rewardGold": 3950
    },
    {
        "id": "boss_76",
        "bossIndex": 76,
        "monsterId": 76,
        "name": "Trùm Rùa trinh sát",
        "baseLevel": 70,
        "skills": [
            26,
            26
        ],
        "rewardExp": 5620,
        "rewardGold": 4000
    },
    {
        "id": "boss_77",
        "bossIndex": 77,
        "monsterId": 77,
        "name": "Trùm Rùa ma biển sâu",
        "baseLevel": 71,
        "skills": [
            26,
            26
        ],
        "rewardExp": 5690,
        "rewardGold": 4050
    },
    {
        "id": "boss_78",
        "bossIndex": 78,
        "monsterId": 78,
        "name": "Trùm Rùa khổng lồ biển sâu",
        "baseLevel": 72,
        "skills": [
            26,
            26
        ],
        "rewardExp": 5760,
        "rewardGold": 4100
    },
    {
        "id": "boss_79",
        "bossIndex": 79,
        "monsterId": 79,
        "name": "Trùm Cua vàng",
        "baseLevel": 73,
        "skills": [
            26,
            26
        ],
        "rewardExp": 5830,
        "rewardGold": 4150
    },
    {
        "id": "boss_80",
        "bossIndex": 80,
        "monsterId": 80,
        "name": "Trùm Cua vân Bạc",
        "baseLevel": 74,
        "skills": [
            26,
            26
        ],
        "rewardExp": 5900,
        "rewardGold": 4200
    },
    {
        "id": "boss_81",
        "bossIndex": 81,
        "monsterId": 81,
        "name": "Trùm Cua thiên sứ",
        "baseLevel": 74,
        "skills": [
            26,
            26
        ],
        "rewardExp": 5970,
        "rewardGold": 4250
    },
    {
        "id": "boss_82",
        "bossIndex": 82,
        "monsterId": 82,
        "name": "Trùm Cá heo",
        "baseLevel": 75,
        "skills": [
            26,
            26
        ],
        "rewardExp": 6040,
        "rewardGold": 4300
    },
    {
        "id": "boss_83",
        "bossIndex": 83,
        "monsterId": 83,
        "name": "Trùm Cá heo tốc độ",
        "baseLevel": 76,
        "skills": [
            26,
            26
        ],
        "rewardExp": 6110,
        "rewardGold": 4350
    },
    {
        "id": "boss_84",
        "bossIndex": 84,
        "monsterId": 84,
        "name": "Trùm Ngựa chiến",
        "baseLevel": 77,
        "skills": [
            26,
            26
        ],
        "rewardExp": 6180,
        "rewardGold": 4400
    },
    {
        "id": "boss_85",
        "bossIndex": 85,
        "monsterId": 85,
        "name": "Trùm Quỷ Vương Địa Phủ",
        "baseLevel": 78,
        "skills": [
            26,
            26
        ],
        "rewardExp": 6250,
        "rewardGold": 4450
    }
];

if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        INCUBATOR_CONFIG: window.INCUBATOR_CONFIG,
        ROYAL_BOSSES: window.ROYAL_BOSSES
    };
}
