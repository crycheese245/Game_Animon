// ========================================================
// HỆ THỐNG BẢN ĐỒ THẾ GIỚI MỞ - VƯƠNG QUỐC SỦNG CẦU VỒNG (J2ME)
// ========================================================

// Bộ nhớ đệm cache các ảnh bản đồ đã render
const MAP_CANVAS_CACHE = {};

// Tải trước 11 bộ tilesets PNG trích xuất từ J2ME Cầu Vồng (0.png .. 10.png)
const TILESET_IMAGES = {};
for (let i = 0; i <= 10; i++) {
    const img = new Image();
    img.src = `./img/maps/${i}.png`;
    img.onerror = () => {
        if (img.src.indexOf('client/') === -1) {
            img.src = `./client/img/maps/${i}.png`;
        }
    };
    TILESET_IMAGES[i] = img;
}

// Fallback themes
const TILESETS = {
    nature: './img/maps/0.png',
    city: './img/maps/1.png',
    plain: './img/maps/2.png',
    cave: './img/maps/3.png',
    dungeon: './img/maps/4.png',
    wasteland: './img/maps/8.png',
    interior: './img/maps/10.png'
};

// Hàm vẽ từng tile với các phép biến hình TRANS_* của J2ME MIDP 2.0
function drawTileModule(ctx, img, def, destX, destY, destW, destH, flags) {
    if (!img || !img.complete || img.naturalWidth === 0) return;
    const [imgIdx, srcX, srcY, w, h] = def;

    ctx.save();
    switch (flags) {
        case 0: // TRANS_NONE
            ctx.drawImage(img, srcX, srcY, w, h, destX, destY, destW, destH);
            break;
        case 6: // TRANS_MIRROR (Lật ngang)
            ctx.translate(destX + destW, destY);
            ctx.scale(-1, 1);
            ctx.drawImage(img, srcX, srcY, w, h, 0, 0, destW, destH);
            break;
        case 1: // TRANS_MIRROR_ROT180 (Lật dọc)
            ctx.translate(destX, destY + destH);
            ctx.scale(1, -1);
            ctx.drawImage(img, srcX, srcY, w, h, 0, 0, destW, destH);
            break;
        case 3: // TRANS_ROT180 (Xoay 180 độ)
            ctx.translate(destX + destW, destY + destH);
            ctx.scale(-1, -1);
            ctx.drawImage(img, srcX, srcY, w, h, 0, 0, destW, destH);
            break;
        case 5: // TRANS_ROT90 (Xoay 90 độ)
            ctx.translate(destX + destH, destY);
            ctx.rotate(Math.PI / 2);
            ctx.drawImage(img, srcX, srcY, w, h, 0, 0, destW, destH);
            break;
        case 7: // TRANS_ROT270 (Xoay 270 độ)
            ctx.translate(destX, destY + destW);
            ctx.rotate(-Math.PI / 2);
            ctx.drawImage(img, srcX, srcY, w, h, 0, 0, destW, destH);
            break;
        default:
            ctx.drawImage(img, srcX, srcY, w, h, destX, destY, destW, destH);
            break;
    }
    ctx.restore();
}

// Hàm Render Tiled Map từ dữ liệu nhị phân J2ME Cầu Vồng nguyên bản
function generateJ2MEMapCanvas(mapKey, themeKey = 'nature', baseColor = '#2e7d32', pathColor = '#8d6e63') {
    if (MAP_CANVAS_CACHE[mapKey]) {
        return MAP_CANVAS_CACHE[mapKey];
    }

    const j2meMap = (window.J2ME_MAPS_DATA && window.J2ME_MAPS_DATA[mapKey]) ? window.J2ME_MAPS_DATA[mapKey] : null;
    const cols = j2meMap ? j2meMap.cols : 28;
    const rows = j2meMap ? j2meMap.rows : 32;
    const tileSize = 48; // Scale x2.4 từ 20px chuẩn của J2ME

    const width = cols * tileSize;
    const height = rows * tileSize;

    // Canvas nền (Background / Layer 1)
    const offCanvas = document.createElement('canvas');
    offCanvas.width = width;
    offCanvas.height = height;
    const c = offCanvas.getContext('2d');
    c.imageSmoothingEnabled = false;

    // Canvas tán cây / Mái nhà (Foreground / Layer 3)
    const offFgCanvas = document.createElement('canvas');
    offFgCanvas.width = width;
    offFgCanvas.height = height;
    const cfg = offFgCanvas.getContext('2d');
    cfg.imageSmoothingEnabled = false;

    // 1. Tô màu nền cơ bản
    c.fillStyle = baseColor;
    c.fillRect(0, 0, width, height);

    const boundaries = [];
    const battleZones = [];

    // Danh sách cổng dịch chuyển để chừa lối đi không bị boundary chặn
    const mapPortals = (window.MAPS_CONFIG && window.MAPS_CONFIG[mapKey] && window.MAPS_CONFIG[mapKey].portals) 
        ? window.MAPS_CONFIG[mapKey].portals 
        : [];

    const tilesetId = j2meMap ? j2meMap.tilesetId : 0;
    const tilesetImg = TILESET_IMAGES[tilesetId] || TILESET_IMAGES[0];
    const defs = (window.J2ME_TILESETS_DATA && window.J2ME_TILESETS_DATA[tilesetId]) 
        ? window.J2ME_TILESETS_DATA[tilesetId] 
        : null;

    // 2. Vẽ Layer 1 (Ground Tiles)
    if (j2meMap && j2meMap.groundTiles && j2meMap.groundTiles.length > 0 && defs) {
        for (const [tx, ty, tid, flags] of j2meMap.groundTiles) {
            const def = defs[tid];
            if (def) {
                const px = tx * tileSize;
                const py = ty * tileSize;
                drawTileModule(c, tilesetImg, def, px, py, tileSize, tileSize, flags);
            }
        }
    } else {
        // Fallback hoa văn gạch lát nếu ảnh chưa tải xong
        c.fillStyle = pathColor;
        for (let r = 0; r < rows; r++) {
            for (let col = 0; col < cols; col++) {
                if ((r + col) % 2 === 0) {
                    c.fillRect(col * tileSize, r * tileSize, tileSize, tileSize);
                }
            }
        }
    }

    // 3. Xây dựng ranh giới va chạm từ Layer 2 (Collision Grid)
    if (j2meMap && j2meMap.collisionGrid) {
        for (let r = 0; r < rows; r++) {
            for (let col = 0; col < cols; col++) {
                const px = col * tileSize;
                const py = r * tileSize;
                const isBorder = (col === 0 || col === cols - 1 || r === 0 || r === rows - 1);
                const isBlocked = j2meMap.collisionGrid[r][col] === 1;

                const isPortalArea = mapPortals.some(p => (
                    px + tileSize > p.worldX && px < p.worldX + p.width &&
                    py + tileSize > p.worldY && py < p.worldY + p.height
                ));

                if (!isPortalArea) {
                    if (isBorder || isBlocked) {
                        boundaries.push({ x: px, y: py, width: tileSize, height: tileSize });
                    }
                }

                // Vùng bụi cỏ có thể gặp quái hoang dã
                if (!isBorder && !isBlocked && !isPortalArea && (r + col) % 5 === 0 && r > 2 && r < rows - 2) {
                    battleZones.push({ x: px, y: py, width: tileSize, height: tileSize });
                }
            }
        }
    }

    // 4. Vẽ Layer 3 (Overhead Tiles) lên Foreground Canvas
    if (j2meMap && j2meMap.overheadTiles && j2meMap.overheadTiles.length > 0 && defs) {
        for (const [tx, ty, tid, flags] of j2meMap.overheadTiles) {
            const def = defs[tid];
            if (def) {
                const px = tx * tileSize;
                const py = ty * tileSize;
                drawTileModule(cfg, tilesetImg, def, px, py, tileSize, tileSize, flags);
            }
        }
    }

    // 5. Vẽ cổng dịch chuyển phát sáng viền vàng
    mapPortals.forEach(p => {
        c.save();
        c.fillStyle = 'rgba(255, 215, 0, 0.25)';
        c.fillRect(p.worldX, p.worldY, p.width, p.height);
        c.strokeStyle = '#ffd700';
        c.lineWidth = 3;
        c.strokeRect(p.worldX + 2, p.worldY + 2, p.width - 4, p.height - 4);
        c.restore();
    });

    const bgImg = new Image();
    bgImg.src = offCanvas.toDataURL();

    const fgImg = new Image();
    fgImg.src = offFgCanvas.toDataURL();

    // 6. Xây dựng danh sách NPC trên bản đồ
    const npcs = [];
    if (j2meMap && j2meMap.npcNames && j2meMap.npcNames.length > 0) {
        const uniqueNames = [...new Set(j2meMap.npcNames)].slice(0, 6);
        let npcIdx = 0;
        for (let r = 4; r < rows - 4 && npcIdx < uniqueNames.length; r += 4) {
            for (let col = 4; col < cols - 4 && npcIdx < uniqueNames.length; col += 4) {
                if (j2meMap.collisionGrid && j2meMap.collisionGrid[r][col] === 0) {
                    const name = uniqueNames[npcIdx];
                    const dialogue = (j2meMap.dialogues && j2meMap.dialogues[npcIdx]) 
                        ? j2meMap.dialogues[npcIdx] 
                        : `Xin chào! Ta là ${name} thuộc Vương Quốc Cầu Vồng. Chúc bạn thu phục được nhiều sủng vật quý hiếm!`;

                    npcs.push({
                        name,
                        worldX: col * tileSize,
                        worldY: r * tileSize,
                        dialogue,
                        spriteKey: (npcIdx % 2 === 0) ? `r${npcIdx % 6}` : `s${npcIdx % 6}`
                    });
                    npcIdx++;
                }
            }
        }
    }

    const result = {
        image: bgImg,
        foregroundImage: fgImg,
        width,
        height,
        cols,
        rows,
        tileSize,
        boundaries,
        battleZones,
        npcs
    };

    if (tilesetImg && tilesetImg.complete && tilesetImg.naturalWidth > 0) {
        MAP_CANVAS_CACHE[mapKey] = result;
    } else if (tilesetImg) {
        tilesetImg.addEventListener('load', () => {
            delete MAP_CANVAS_CACHE[mapKey];
            generateJ2MEMapCanvas(mapKey, themeKey, baseColor, pathColor);
        }, { once: true });
    }

    return result;
}

// ========================================================
// CẤU HÌNH THẾ GIỚI MỞ VƯƠNG QUỐC SỦNG CẦU VỒNG (MAPS_CONFIG)
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
        wildPool: ['cauvong_pet_1', 'cauvong_pet_2', 'cauvong_pet_3', 'cauvong_pet_4'],
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
                name: 'Cổng Vực Vào Vương Quốc Cầu Vồng (Cung Điện)',
                worldX: 1344,
                worldY: 48,
                width: 96,
                height: 48,
                targetMap: 'map_0',
                targetPlayerPos: { x: 488, y: 450 },
                targetOffset: { x: -200, y: -450 }
            }
        ]
    },

    // 2. CUNG ĐIỆN CẦU VỒNG (MAP 0 NGUYÊN BẢN J2ME)
    map_0: {
        id: 'map_0',
        name: 'Cung Điện Cầu Vồng (Khởi Đầu)',
        theme: 'interior',
        baseColor: '#2b2d42',
        pathColor: '#d90429',
        width: 1056,
        height: 1536,
        initialOffset: { x: -200, y: -450 },
        initialPlayerPos: { x: 488, y: 450 },
        wildPool: ['cauvong_pet_1', 'cauvong_pet_2', 'cauvong_pet_3'],
        encounterRate: 0.012,
        portals: [
            {
                name: 'Cổng Nam Quay Về Pellet Town',
                worldX: 480,
                worldY: 1440,
                width: 96,
                height: 48,
                targetMap: 'pelletTown',
                targetPlayerPos: { x: 488, y: 254 },
                targetOffset: { x: -850, y: -60 }
            },
            {
                name: 'Cổng Bắc Đến Thành Phố Cầu Vồng',
                worldX: 480,
                worldY: 48,
                width: 96,
                height: 48,
                targetMap: 'map_1',
                targetPlayerPos: { x: 488, y: 440 },
                targetOffset: { x: -350, y: -800 }
            }
        ]
    },

    // 3. THÀNH PHỐ CẦU VỒNG (MAP 1 NGUYÊN BẢN J2ME)
    map_1: {
        id: 'map_1',
        name: 'Thành Phố Cầu Vồng (Quảng Trường)',
        theme: 'city',
        baseColor: '#34495e',
        pathColor: '#ecf0f1',
        width: 1344,
        height: 1536,
        initialOffset: { x: -350, y: -800 },
        initialPlayerPos: { x: 488, y: 440 },
        wildPool: [], // Thành phố an toàn
        encounterRate: 0,
        portals: [
            {
                name: 'Cổng Nam Về Cung Điện',
                worldX: 624,
                worldY: 1440,
                width: 96,
                height: 48,
                targetMap: 'map_0',
                targetPlayerPos: { x: 488, y: 254 },
                targetOffset: { x: -200, y: -100 }
            },
            {
                name: 'Cổng Bắc Đi Đấu Trường Huấn Luyện Sư',
                worldX: 624,
                worldY: 48,
                width: 96,
                height: 48,
                targetMap: 'map_2',
                targetPlayerPos: { x: 488, y: 440 },
                targetOffset: { x: -300, y: -700 }
            },
            {
                name: 'Cổng Đông Ra Bình Nguyên Xanh',
                worldX: 1248,
                worldY: 720,
                width: 48,
                height: 96,
                targetMap: 'map_3',
                targetPlayerPos: { x: 488, y: 254 },
                targetOffset: { x: -200, y: -200 }
            }
        ]
    },

    // 4. ĐẤU TRƯỜNG HUẤN LUYỆN SƯ (MAP 2 NGUYÊN BẢN J2ME)
    map_2: {
        id: 'map_2',
        name: 'Đấu Trường Huấn Luyện Sư (Đại Điện)',
        theme: 'interior',
        baseColor: '#4a148c',
        pathColor: '#ffd700',
        width: 1344,
        height: 1536,
        initialOffset: { x: -300, y: -700 },
        initialPlayerPos: { x: 488, y: 440 },
        wildPool: ['cauvong_pet_7', 'cauvong_pet_8', 'cauvong_pet_9', 'cauvong_pet_10'],
        encounterRate: 0.02,
        portals: [
            {
                name: 'Cổng Nam Về Thành Phố',
                worldX: 624,
                worldY: 1440,
                width: 96,
                height: 48,
                targetMap: 'map_1',
                targetPlayerPos: { x: 488, y: 254 },
                targetOffset: { x: -350, y: -380 }
            }
        ]
    },

    // 5. BÌNH NGUYÊN XANH (MAP 3 NGUYÊN BẢN J2ME)
    map_3: {
        id: 'map_3',
        name: 'Bình Nguyên Xanh (Thảo Nguyên Sủng Vật)',
        theme: 'plain',
        baseColor: '#27ae60',
        pathColor: '#2ecc71',
        width: 1344,
        height: 1536,
        initialOffset: { x: -200, y: -200 },
        initialPlayerPos: { x: 488, y: 254 },
        wildPool: ['cauvong_pet_2', 'cauvong_pet_3', 'cauvong_pet_4', 'cauvong_pet_5'],
        encounterRate: 0.025,
        portals: [
            {
                name: 'Lối Tây Về Thành Phố Cầu Vồng',
                worldX: 48,
                worldY: 720,
                width: 48,
                height: 96,
                targetMap: 'map_1',
                targetPlayerPos: { x: 488, y: 254 },
                targetOffset: { x: -700, y: -450 }
            },
            {
                name: 'Cổng Đông Đi Hang Động Pha Lê',
                worldX: 1248,
                worldY: 720,
                width: 48,
                height: 96,
                targetMap: 'map_4',
                targetPlayerPos: { x: 488, y: 254 },
                targetOffset: { x: -100, y: -300 }
            }
        ]
    },

    // 6. HANG ĐỘNG PHA LÊ (MAP 4 NGUYÊN BẢN J2ME)
    map_4: {
        id: 'map_4',
        name: 'Hang Động Pha Lê (Vùng Đất U Tối)',
        theme: 'cave',
        baseColor: '#1a237e',
        pathColor: '#283593',
        width: 768,
        height: 1536,
        initialOffset: { x: -100, y: -300 },
        initialPlayerPos: { x: 488, y: 254 },
        wildPool: ['cauvong_pet_6', 'cauvong_pet_10', 'cauvong_pet_11', 'cauvong_pet_12'],
        encounterRate: 0.03,
        portals: [
            {
                name: 'Cổng Tây Về Bình Nguyên',
                worldX: 48,
                worldY: 720,
                width: 48,
                height: 96,
                targetMap: 'map_3',
                targetPlayerPos: { x: 488, y: 254 },
                targetOffset: { x: -600, y: -200 }
            },
            {
                name: 'Lối Đi Trang Trại Locke',
                worldX: 336,
                worldY: 48,
                width: 96,
                height: 48,
                targetMap: 'map_49',
                targetPlayerPos: { x: 488, y: 400 },
                targetOffset: { x: -200, y: -400 }
            }
        ]
    },

    // 7. TRANG TRẠI SỦNG VẬT LOCKE (MAP 49 NGUYÊN BẢN J2ME)
    map_49: {
        id: 'map_49',
        name: 'Trang Trại Sủng Vật Locke (Thần Thú Nơi Ở)',
        theme: 'nature',
        baseColor: '#1b5e20',
        pathColor: '#8d6e63',
        width: 960,
        height: 1536,
        initialOffset: { x: -200, y: -400 },
        initialPlayerPos: { x: 488, y: 400 },
        wildPool: ['cauvong_pet_17', 'cauvong_pet_18', 'cauvong_pet_19'], // Bạch Kim Long, Ấu Long Thần
        encounterRate: 0.02,
        portals: [
            {
                name: 'Cổng Nam Quay Về Hang Động',
                worldX: 432,
                worldY: 1440,
                width: 96,
                height: 48,
                targetMap: 'map_4',
                targetPlayerPos: { x: 488, y: 254 },
                targetOffset: { x: -100, y: -300 }
            },
            {
                name: 'Cổng Bí Mật Đi Tổ Xà Hậu (Boss)',
                worldX: 432,
                worldY: 48,
                width: 96,
                height: 48,
                targetMap: 'map_52',
                targetPlayerPos: { x: 488, y: 440 },
                targetOffset: { x: -200, y: -400 }
            }
        ]
    },

    // 8. TỔ XÀ HẬU HOÀNG KIM (MAP 52 NGUYÊN BẢN J2ME - BOSS LAIR)
    map_52: {
        id: 'map_52',
        name: 'Tổ Xà Hậu Hoàng Kim (Boss Chiến)',
        theme: 'dungeon',
        baseColor: '#b71c1c',
        pathColor: '#d32f2f',
        width: 960,
        height: 1536,
        initialOffset: { x: -200, y: -400 },
        initialPlayerPos: { x: 488, y: 440 },
        wildPool: ['cauvong_pet_23', 'cauvong_pet_11'], // Xích Kim Xà Hậu, Thiên Sứ Sa Ngã
        encounterRate: 0.035,
        portals: [
            {
                name: 'Cổng Nam Quay Về Trang Trại Locke',
                worldX: 432,
                worldY: 1440,
                width: 96,
                height: 48,
                targetMap: 'map_49',
                targetPlayerPos: { x: 488, y: 254 },
                targetOffset: { x: -200, y: -200 }
            }
        ]
    },

    // 9. NHÀ NHÂN VẬT CHÍNH (PLAYER HOUSE)
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
