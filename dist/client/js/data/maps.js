// ========================================================
// HỆ THỐNG BẢN ĐỒ THẾ GIỚI MỞ (PORTED FROM J2ME GAMES)
// ========================================================

// Bộ nhớ đệm cache các ảnh bản đồ đã render
const MAP_CANVAS_CACHE = {};

// Tải trước các tileset PNG trích xuất từ J2ME Cầu Vồng
const TILESETS = {
    nature: './img/maps/0.png',    // Cỏ, cây, hàng rào làng thôn
    city: './img/maps/1.png',      // Nhà cửa, tường gạch thành thị
    plain: './img/maps/2.png',     // Bình nguyên, hoa cỏ
    cave: './img/maps/3.png',      // Hang động vách đá
    dungeon: './img/maps/4.png',   // Hầm ngục u tối
    wasteland: './img/maps/8.png', // Hoang địa, sa mạc
    interior: './img/maps/10.png'  // Nội thất cung điện, gạch men
};

const TILESET_IMAGES = {};
Object.keys(TILESETS).forEach(k => {
    const img = new Image();
    img.src = TILESETS[k];
    TILESET_IMAGES[k] = img;
});

// Hàm Render Tiled Map từ dữ liệu nhị phân J2ME đã trích xuất
function generateJ2MEMapCanvas(mapKey, themeKey, baseColor, pathColor) {
    if (MAP_CANVAS_CACHE[mapKey]) {
        return MAP_CANVAS_CACHE[mapKey];
    }

    const j2meMap = window.J2ME_MAPS_DATA ? window.J2ME_MAPS_DATA[mapKey] : null;
    const cols = j2meMap ? j2meMap.cols : 24;
    const rows = j2meMap ? j2meMap.rows : 24;
    const tileSize = 48; // Phóng to x3 từ 16px gốc để chơi sắc nét trên Canvas 1024x576

    const width = cols * tileSize;
    const height = rows * tileSize;

    const offCanvas = document.createElement('canvas');
    offCanvas.width = width;
    offCanvas.height = height;
    const c = offCanvas.getContext('2d');
    c.imageSmoothingEnabled = false;

    // 1. Nền móng địa hình
    c.fillStyle = baseColor;
    c.fillRect(0, 0, width, height);

    // 2. Lưới ô gạch & Texture theo ma trận J2ME
    const tilesetImg = TILESET_IMAGES[themeKey];
    const data = j2meMap ? j2meMap.data : [];

    const boundaries = [];
    const battleZones = [];

    // Danh sách cổng dịch chuyển để chừa lối đi không bị boundary chặn
    const mapPortals = (window.MAPS_CONFIG && window.MAPS_CONFIG[mapKey] && window.MAPS_CONFIG[mapKey].portals) 
        ? window.MAPS_CONFIG[mapKey].portals 
        : [];

    for (let r = 0; r < rows; r++) {
        for (let col = 0; col < cols; col++) {
            const idx = r * cols + col;
            const tileVal = data[idx] !== undefined ? data[idx] : 0;
            const px = col * tileSize;
            const py = r * tileSize;

            // Ranh giới biên ngoài bản đồ
            const isBorder = (col === 0 || col === cols - 1 || r === 0 || r === rows - 1);

            // Kiểm tra xem vị trí này có trùng với Portal nào không
            const isPortalArea = mapPortals.some(p => (
                px + tileSize > p.worldX && px < p.worldX + p.width &&
                py + tileSize > p.worldY && py < p.worldY + p.height
            ));

            // Vẽ địa hình từ tileset nếu đã tải xong
            if (tilesetImg && tilesetImg.complete && tilesetImg.naturalWidth > 0) {
                const tw = 16;
                const th = 16;
                const tilesPerRow = Math.max(1, Math.floor(tilesetImg.naturalWidth / tw));
                const maxRows = Math.max(1, Math.floor(tilesetImg.naturalHeight / th));
                const srcX = (tileVal % tilesPerRow) * tw;
                const srcY = (Math.floor(tileVal / tilesPerRow) % maxRows) * th;

                c.drawImage(tilesetImg, srcX, srcY, tw, th, px, py, tileSize, tileSize);
            } else {
                // Fallback texture pixel-art nếu ảnh đang tải
                if (tileVal % 3 === 0) {
                    c.fillStyle = pathColor;
                    c.fillRect(px, py, tileSize, tileSize);
                } else if (tileVal % 5 === 0) {
                    c.fillStyle = 'rgba(0, 0, 0, 0.08)';
                    c.fillRect(px + 4, py + 4, tileSize - 8, tileSize - 8);
                }
            }

            // Phân loại vật cản & Bụi cỏ
            if (!isPortalArea) {
                if (isBorder) {
                    boundaries.push({ x: px, y: py, width: tileSize, height: tileSize });
                } else if (tileVal > 0 && tileVal % 7 === 0) {
                    // Vật cản (Cây lớn, tảng đá, tường)
                    boundaries.push({ x: px, y: py, width: tileSize, height: tileSize });
                }
            }

            if (tileVal > 0 && tileVal % 4 === 0 && !isBorder && !isPortalArea) {
                // Bụi cỏ sủng vật (Battle Zone)
                battleZones.push({ x: px, y: py, width: tileSize, height: tileSize });
            }
        }
    }

    // 3. Vẽ hoa văn cổng dịch chuyển (Portals) trên nền đất
    mapPortals.forEach(p => {
        c.save();
        c.fillStyle = 'rgba(255, 215, 0, 0.25)';
        c.fillRect(p.worldX, p.worldY, p.width, p.height);
        c.strokeStyle = '#ffd700';
        c.lineWidth = 3;
        c.strokeRect(p.worldX + 2, p.worldY + 2, p.width - 4, p.height - 4);
        c.restore();
    });

    const img = new Image();
    img.src = offCanvas.toDataURL();

    const result = {
        image: img,
        width,
        height,
        cols,
        rows,
        tileSize,
        boundaries,
        battleZones
    };

    if (tilesetImg && tilesetImg.complete && tilesetImg.naturalWidth > 0) {
        MAP_CANVAS_CACHE[mapKey] = result;
    } else if (tilesetImg) {
        // Tự động vẽ lại khi ảnh tileset tải xong
        tilesetImg.addEventListener('load', () => {
            delete MAP_CANVAS_CACHE[mapKey];
            generateJ2MEMapCanvas(mapKey, themeKey, baseColor, pathColor);
        }, { once: true });
    }

    return result;
}

// ========================================================
// CẤU HÌNH TỔNG THỂ 8 BẢN ĐỒ LIÊN KẾT THẾ GIỚI MỞ
// ========================================================
const MAPS_CONFIG = {
    // 1. THỊ TRẤN KHỞI ĐẦU (PELLET TOWN)
    pelletTown: {
        id: 'pelletTown',
        name: 'Thị Trấn Khởi Đầu (Pellet Town)',
        bgImageSrc: './img/Pellet Town.png',
        altBgImageSrc: './client/img/Pellet Town.png',
        fgImageSrc: './img/foregroundObjects.png',
        altFgImageSrc: './client/img/foregroundObjects.png',
        width: 3360,
        height: 1920,
        tileWidth: 70,
        tileHeight: 40,
        initialOffset: { x: -735, y: -650 },
        initialPlayerPos: { x: 488, y: 254 },
        hasCollisionData: true,
        hasBattleData: true,
        wildPool: ['animon_01', 'animon_07', 'animon_08', 'animon_09'],
        encounterRate: 0.015,
        portals: [
            {
                name: 'Cửa Nhà Nhân Vật',
                worldX: 1224,
                worldY: 864,
                width: 48,
                height: 48,
                targetMap: 'playerHouse',
                targetPlayerPos: { x: 488, y: 380 },
                targetOffset: { x: 0, y: 0 }
            },
            {
                name: 'Cổng Bắc Đến Tân Thủ Thôn',
                worldX: 1344,
                worldY: 48,
                width: 96,
                height: 48,
                targetMap: 'cun1',
                targetPlayerPos: { x: 488, y: 450 },
                targetOffset: { x: -200, y: -450 }
            }
        ]
    },

    // 2. TÂN THỦ THÔN (CUN 1 - TỪ LIÊN THÚ CHIẾN KỶ J2ME)
    cun1: {
        id: 'cun1',
        name: 'Tân Thủ Thôn (Thôn Dã Ngoại 1)',
        theme: 'nature',
        baseColor: '#2e7d32',
        pathColor: '#8d6e63',
        width: 1104,
        height: 1104,
        initialOffset: { x: -200, y: -450 },
        initialPlayerPos: { x: 488, y: 450 },
        wildPool: ['animon_07', 'animon_08', 'animon_09', 'animon_01'],
        encounterRate: 0.018,
        portals: [
            {
                name: 'Về Thị Trấn Pellet',
                worldX: 528,
                worldY: 1040,
                width: 96,
                height: 48,
                targetMap: 'pelletTown',
                targetPlayerPos: { x: 488, y: 254 },
                targetOffset: { x: -850, y: -60 }
            },
            {
                name: 'Cổng Bắc Đi Đô Thành',
                worldX: 528,
                worldY: 16,
                width: 96,
                height: 48,
                targetMap: 'cheng1',
                targetPlayerPos: { x: 488, y: 440 },
                targetOffset: { x: -350, y: -800 }
            },
            {
                name: 'Cổng Tây Vào Hang Động',
                worldX: 16,
                worldY: 528,
                width: 48,
                height: 96,
                targetMap: 'dong1',
                targetPlayerPos: { x: 488, y: 254 },
                targetOffset: { x: -500, y: -500 }
            },
            {
                name: 'Cổng Đông Ra Bình Nguyên',
                worldX: 1040,
                worldY: 528,
                width: 48,
                height: 96,
                targetMap: 'pingyuan',
                targetPlayerPos: { x: 488, y: 254 },
                targetOffset: { x: -200, y: -200 }
            }
        ]
    },

    // 3. ĐÔ THÀNH SỦNG VẬT (CHENG 1 - TỪ LIÊN THÚ CHIẾN KỶ J2ME)
    cheng1: {
        id: 'cheng1',
        name: 'Đô Thành Vương Quốc (Thành 1)',
        theme: 'city',
        baseColor: '#546e7a',
        pathColor: '#cfd8dc',
        width: 1632,
        height: 1536,
        initialOffset: { x: -350, y: -800 },
        initialPlayerPos: { x: 488, y: 440 },
        wildPool: [], // Thành phố an toàn, không có quái hoang dã
        encounterRate: 0,
        portals: [
            {
                name: 'Cổng Nam Quay Về Thôn',
                worldX: 768,
                worldY: 1472,
                width: 96,
                height: 48,
                targetMap: 'cun1',
                targetPlayerPos: { x: 488, y: 254 },
                targetOffset: { x: -200, y: -100 }
            },
            {
                name: 'Cửa Đại Điện Vương Quốc',
                worldX: 768,
                worldY: 300,
                width: 96,
                height: 48,
                targetMap: 'dating',
                targetPlayerPos: { x: 488, y: 400 },
                targetOffset: { x: -100, y: -300 }
            },
            {
                name: 'Lối Mòn Ra Hoang Địa',
                worldX: 1568,
                worldY: 768,
                width: 48,
                height: 96,
                targetMap: 'huangdi1',
                targetPlayerPos: { x: 488, y: 254 },
                targetOffset: { x: -200, y: -400 }
            }
        ]
    },

    // 4. ĐẠI SẢNH VƯƠNG ĐIỆN (DATING - TỪ LIÊN THÚ CHIẾN KỶ J2ME)
    dating: {
        id: 'dating',
        name: 'Đại Điện Vương Quốc (Nội Điện)',
        theme: 'interior',
        baseColor: '#b71c1c',
        pathColor: '#ffc107',
        width: 768,
        height: 960,
        initialOffset: { x: -100, y: -300 },
        initialPlayerPos: { x: 488, y: 400 },
        wildPool: [],
        encounterRate: 0,
        isInterior: true,
        portals: [
            {
                name: 'Bậc Cửa Ra Đô Thành',
                worldX: 336,
                worldY: 896,
                width: 96,
                height: 48,
                targetMap: 'cheng1',
                targetPlayerPos: { x: 488, y: 254 },
                targetOffset: { x: -350, y: -380 }
            }
        ]
    },

    // 5. HANG ĐỘNG HUYỀN BÍ (DONG 1 - TỪ LIÊN THÚ CHIẾN KỶ J2ME)
    dong1: {
        id: 'dong1',
        name: 'Hang Động Sủng Vật (Động 1)',
        theme: 'cave',
        baseColor: '#263238',
        pathColor: '#37474f',
        width: 1248,
        height: 1392,
        initialOffset: { x: -500, y: -500 },
        initialPlayerPos: { x: 488, y: 254 },
        wildPool: ['animon_06', 'animon_10', 'animon_04'],
        encounterRate: 0.025,
        portals: [
            {
                name: 'Miệng Hang Quay Về Thôn',
                worldX: 576,
                worldY: 1328,
                width: 96,
                height: 48,
                targetMap: 'cun1',
                targetPlayerPos: { x: 488, y: 254 },
                targetOffset: { x: -50, y: -450 }
            }
        ]
    },

    // 6. HOANG ĐỊA SA MẠC (HUANGDI 1 - TỪ LIÊN THÚ CHIẾN KỶ J2ME)
    huangdi1: {
        id: 'huangdi1',
        name: 'Hoang Địa Sa Mạc (Vùng Cát Cháy)',
        theme: 'wasteland',
        baseColor: '#d7ccc8',
        pathColor: '#ffb74d',
        width: 1200,
        height: 1200,
        initialOffset: { x: -200, y: -400 },
        initialPlayerPos: { x: 488, y: 254 },
        wildPool: ['animon_01', 'animon_05', 'animon_07'],
        encounterRate: 0.022,
        portals: [
            {
                name: 'Lối Mòn Về Đô Thành',
                worldX: 16,
                worldY: 576,
                width: 48,
                height: 96,
                targetMap: 'cheng1',
                targetPlayerPos: { x: 488, y: 254 },
                targetOffset: { x: -900, y: -700 }
            }
        ]
    },

    // 7. BÌNH NGUYÊN SỦNG VẬT (PINGYUAN - TỪ LIÊN THÚ CHIẾN KỶ J2ME)
    pingyuan: {
        id: 'pingyuan',
        name: 'Bình Nguyên Xanh (Thảo Nguyên Sủng Vật)',
        theme: 'plain',
        baseColor: '#388e3c',
        pathColor: '#66bb6a',
        width: 1344,
        height: 960,
        initialOffset: { x: -200, y: -200 },
        initialPlayerPos: { x: 488, y: 254 },
        wildPool: ['animon_02', 'animon_03', 'animon_04', 'animon_05'],
        encounterRate: 0.02,
        portals: [
            {
                name: 'Lối Đi Về Tân Thủ Thôn',
                worldX: 16,
                worldY: 456,
                width: 48,
                height: 96,
                targetMap: 'cun1',
                targetPlayerPos: { x: 488, y: 254 },
                targetOffset: { x: -700, y: -450 }
            }
        ]
    },

    // 8. NHÀ NHÂN VẬT CHÍNH (PLAYER HOUSE)
    playerHouse: {
        id: 'playerHouse',
        name: 'Nhà Của Bạn (Tầng 1)',
        width: 1024,
        height: 576,
        initialOffset: { x: 0, y: 0 },
        initialPlayerPos: { x: 488, y: 380 },
        isInterior: true,
        portals: [
            {
                name: 'Cửa Ra Thị Trấn',
                worldX: 464,
                worldY: 490,
                width: 96,
                height: 48,
                targetMap: 'pelletTown',
                targetPlayerPos: { x: 488, y: 254 },
                targetOffset: { x: -735, y: -650 }
            }
        ]
    }
};

if (typeof window !== 'undefined') {
    window.MAPS_CONFIG = MAPS_CONFIG;
    window.generateJ2MEMapCanvas = generateJ2MEMapCanvas;
}
