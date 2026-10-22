import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const fileHeader = `// ========================================================
// HỆ THỐNG BẢN ĐỒ THẾ GIỚI MỞ - VƯƠNG QUỐC SỦNG CẦU VỒNG (J2ME)
// ========================================================

// Bộ nhớ đệm cache các ảnh bản đồ đã render
const MAP_CANVAS_CACHE = {};

// Tải trước 11 bộ tilesets PNG trích xuất từ J2ME Cầu Vồng (0.png .. 10.png)
const TILESET_IMAGES = {};
for (let i = 0; i <= 10; i++) {
    const img = new Image();
    img.src = \`./img/maps/\${i}.png\`;
    img.onerror = () => {
        if (img.src.indexOf('client/') === -1) {
            img.src = \`./client/img/maps/\${i}.png\`;
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

// Hàm vẽ từng tile với các phép biến hình TRANS_* của J2ME MIDP 2.0 (Reverse-Engineered từ ah.b & at.b)
function drawTileModule(ctx, img, def, destX, destY, dw, dh, midp) {
    if (!img || !img.complete || img.naturalWidth === 0) return;
    const [imgIdx, srcX, srcY, w, h] = def;

    ctx.save();
    ctx.translate(destX, destY);

    switch (midp) {
        case 0: // TRANS_NONE (0)
            ctx.drawImage(img, srcX, srcY, w, h, 0, 0, dw, dh);
            break;
        case 2: // TRANS_MIRROR (Lật ngang)
            ctx.translate(dw, 0);
            ctx.scale(-1, 1);
            ctx.drawImage(img, srcX, srcY, w, h, 0, 0, dw, dh);
            break;
        case 1: // TRANS_MIRROR_ROT180 (Lật dọc)
            ctx.translate(0, dh);
            ctx.scale(1, -1);
            ctx.drawImage(img, srcX, srcY, w, h, 0, 0, dw, dh);
            break;
        case 3: // TRANS_ROT180 (Xoay 180 độ)
            ctx.translate(dw, dh);
            ctx.scale(-1, -1);
            ctx.drawImage(img, srcX, srcY, w, h, 0, 0, dw, dh);
            break;
        case 5: // TRANS_ROT90 (Xoay 90 độ theo chiều kim đồng hồ)
            ctx.translate(dw, 0);
            ctx.rotate(Math.PI / 2);
            ctx.drawImage(img, srcX, srcY, w, h, 0, 0, dh, dw);
            break;
        case 6: // TRANS_ROT270 (Xoay 270 độ theo chiều kim đồng hồ)
            ctx.translate(0, dh);
            ctx.rotate(-Math.PI / 2);
            ctx.drawImage(img, srcX, srcY, w, h, 0, 0, dh, dw);
            break;
        case 7: // TRANS_MIRROR_ROT90 (Lật ngang rồi xoay 90 độ CW)
            ctx.translate(dw, 0);
            ctx.rotate(Math.PI / 2);
            ctx.translate(dh, 0);
            ctx.scale(-1, 1);
            ctx.drawImage(img, srcX, srcY, w, h, 0, 0, dh, dw);
            break;
        case 4: // TRANS_MIRROR_ROT270 (Lật ngang rồi xoay 270 độ CW)
            ctx.translate(0, dh);
            ctx.rotate(-Math.PI / 2);
            ctx.translate(dh, 0);
            ctx.scale(-1, 1);
            ctx.drawImage(img, srcX, srcY, w, h, 0, 0, dh, dw);
            break;
        default:
            ctx.drawImage(img, srcX, srcY, w, h, 0, 0, dw, dh);
            break;
    }
    ctx.restore();
}

// Hàm Render Tiled Map từ dữ liệu nhị phân J2ME Cầu Vồng nguyên bản
function generateJ2MEMapCanvas(mapKey, themeKey = 'interior', baseColor = '#004e98', pathColor = '#8d6e63') {
    if (MAP_CANVAS_CACHE[mapKey]) {
        return MAP_CANVAS_CACHE[mapKey];
    }

    const j2meMap = (window.J2ME_MAPS_DATA && window.J2ME_MAPS_DATA[mapKey]) ? window.J2ME_MAPS_DATA[mapKey] : null;
    const cols = j2meMap ? j2meMap.cols : 22;
    const rows = j2meMap ? j2meMap.rows : 32;
    const tileSize = 48; // Scale x2.4 từ 20px chuẩn của J2ME (20 * 2.4 = 48px)
    const scale = tileSize / 20;

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

    const bgImg = new Image();
    const fgImg = new Image();

    // Hàm dựng các lớp bản đồ lên canvas
    function renderMapLayers() {
        // 1. Tô màu nền bản đồ (mặc định J2ME là d:I)
        c.fillStyle = baseColor;
        c.fillRect(0, 0, width, height);

        // 2. Vẽ Layer 1 (Ground Tiles) chuẩn công thức Reverse-Engineered J2ME (at.b & ah.b)
        if (j2meMap && j2meMap.groundTiles && j2meMap.groundTiles.length > 0 && defs && tilesetImg.complete && tilesetImg.naturalWidth > 0) {
            for (const [tx, ty, modId, flags] of j2meMap.groundTiles) {
                const def = defs[modId];
                if (!def) continue;
                // Ánh xạ flags (rawTid & 7) sang hằng số phép biến hình MIDP 2.0 (ah.b:[S)
                const midp = [0, 5, 3, 6, 2, 4, 1, 7][flags & 7];
                const isSwapped = (midp === 5 || midp === 6 || midp === 4 || midp === 7);
                const dw = (isSwapped ? def[4] : def[3]) * scale;
                const dh = (isSwapped ? def[3] : def[4]) * scale;
                // J2ME Điểm neo là BOTTOM-LEFT (Graphics.BOTTOM | Graphics.LEFT = 36)
                const destX = tx * tileSize;
                const destY = (ty + 1) * tileSize - dh;
                drawTileModule(c, tilesetImg, def, destX, destY, dw, dh, midp);
            }
        } else {
            // Fallback hoa văn gạch lát nếu dữ liệu chưa sẵn sàng
            c.fillStyle = pathColor;
            for (let r = 0; r < rows; r++) {
                for (let col = 0; col < cols; col++) {
                    if ((r + col) % 2 === 0) {
                        c.fillRect(col * tileSize, r * tileSize, tileSize, tileSize);
                    }
                }
            }
        }

        // 3. Vẽ cổng dịch chuyển phát sáng viền vàng
        mapPortals.forEach(p => {
            c.save();
            c.fillStyle = 'rgba(255, 215, 0, 0.28)';
            c.fillRect(p.worldX, p.worldY, p.width, p.height);
            c.strokeStyle = '#ffd700';
            c.lineWidth = 3;
            c.strokeRect(p.worldX + 2, p.worldY + 2, p.width - 4, p.height - 4);
            c.restore();
        });

        bgImg.src = offCanvas.toDataURL();

        // 4. Vẽ Layer 3 (Overhead Tiles) lên Foreground Canvas
        cfg.clearRect(0, 0, width, height);
        if (j2meMap && j2meMap.overheadTiles && j2meMap.overheadTiles.length > 0 && defs && tilesetImg.complete && tilesetImg.naturalWidth > 0) {
            for (const [tx, ty, modId, flags] of j2meMap.overheadTiles) {
                const def = defs[modId];
                if (!def) continue;
                const midp = [0, 5, 3, 6, 2, 4, 1, 7][flags & 7];
                const isSwapped = (midp === 5 || midp === 6 || midp === 4 || midp === 7);
                const dw = (isSwapped ? def[4] : def[3]) * scale;
                const dh = (isSwapped ? def[3] : def[4]) * scale;
                const destX = tx * tileSize;
                const destY = (ty + 1) * tileSize - dh;
                drawTileModule(cfg, tilesetImg, def, destX, destY, dw, dh, midp);
            }
        }

        fgImg.src = offFgCanvas.toDataURL();
    }

    renderMapLayers();

    // Tự động re-render cập nhật ảnh ngay khi tileset hoàn tất tải về
    if (!tilesetImg.complete || tilesetImg.naturalWidth === 0) {
        tilesetImg.addEventListener('load', () => {
            renderMapLayers();
        }, { once: true });
    }

    // 5. Xây dựng ranh giới va chạm từ Layer 2 (Collision Grid: a[x][y] = rawTid >> 3 > 0)
    if (j2meMap && j2meMap.collisionGrid) {
        const grid = Array.from({ length: rows }, (_, r) => 
            Array.from({ length: cols }, (_, c) => j2meMap.collisionGrid[r] ? (j2meMap.collisionGrid[r][c] || 0) : 0)
        );

        for (let r = 0; r < rows; r++) {
            for (let col = 0; col < cols; col++) {
                const px = col * tileSize;
                const py = r * tileSize;
                const isBorder = (col === 0 || col === cols - 1 || r === 0 || r === rows - 1);
                const isBlocked = grid[r][col] === 1;

                const isPortalArea = mapPortals.some(p => (
                    px + tileSize > p.worldX && px < p.worldX + p.width &&
                    py + tileSize > p.worldY && py < p.worldY + p.height
                ));

                if (!isPortalArea) {
                    if (isBlocked || isBorder) {
                        boundaries.push({ x: px, y: py, width: tileSize, height: tileSize });
                    }
                }

                // Vùng bụi cỏ có thể gặp quái hoang dã
                if (!isBorder && !isBlocked && !isPortalArea && (r + col) % 4 === 0 && r > 2 && r < rows - 2) {
                    battleZones.push({ x: px, y: py, width: tileSize, height: tileSize });
                }
            }
        }
    }

    // 6. Xây dựng danh sách NPC trên bản đồ
    const npcs = [];
    if (mapKey === 'map_0') {
        npcs.push(
            {
                name: 'Quản gia Jess',
                worldX: 5 * tileSize,
                worldY: 14 * tileSize,
                dialogue: 'Chào mừng Huấn Luyện Sư trẻ tuổi! Đại điện Cầu Vồng là nơi khởi đầu mọi huyền thoại sủng thú. Hãy đi về phía Nam để tới Quảng Trường!',
                spriteKey: 'npc_elder'
            },
            {
                name: 'Tuần Sát Hoàng Gia',
                worldX: 4 * tileSize,
                worldY: 18 * tileSize,
                dialogue: 'Bảo vệ Cung Điện Cầu Vồng là trọng trách thiêng liêng của chúng ta. Chúc ngươi sớm trở thành Hoàng Kim Huấn Luyện Sư!',
                spriteKey: 'npc_elder'
            },
            {
                name: 'Yuyu',
                worldX: 12 * tileSize,
                worldY: 14 * tileSize,
                dialogue: 'Thành Phố Cầu Vồng ở phía Nam đại điện là nơi phồn hoa nhất vương quốc! Ngươi hãy đến thăm Trung Tâm Thương Mại nhé.',
                spriteKey: 'npc_trainer'
            },
            {
                name: 'Miro Fan Hâm Mộ',
                worldX: 11 * tileSize,
                worldY: 16 * tileSize,
                dialogue: 'Miro là huấn luyện sư sủng vật lợi hại nhất mà ta từng biết! Ta nhất định cũng sẽ thu phục thật nhiều sủng thú quý hiếm!',
                spriteKey: 'npc_trainer'
            },
            {
                name: 'Nhiệt Huyết Binh Sĩ',
                worldX: 10 * tileSize,
                worldY: 25 * tileSize,
                dialogue: 'Cổng Nam ngay phía trước sẽ dẫn thẳng ra Quảng Trường Thành Phố Cầu Vồng. Hãy dũng cảm tiến lên!',
                spriteKey: 'npc_elder'
            }
        );
    } else if (mapKey === 'map_1') {
        npcs.push(
            {
                name: 'Vệ Binh Thành Cầu Vồng',
                worldX: 10 * tileSize,
                worldY: 6 * tileSize,
                dialogue: 'Chào mừng đã đến với Quảng Trường Thành Phố Cầu Vồng! Phía Nam dẫn ra Bình Nguyên hoang dã, phía Đông dẫn tới Học Viện Sủng Vật.',
                spriteKey: 'npc_elder'
            },
            {
                name: 'Thương Nhân Sủng Vật',
                worldX: 18 * tileSize,
                worldY: 10 * tileSize,
                dialogue: 'Ta có rất nhiều bình hồi máu và bóng thu phục sủng vật tốt nhất thành phố! Ngươi có thể ghé thăm Trung Tâm Thương Mại ở phía Tây.',
                spriteKey: 'npc_trainer'
            },
            {
                name: 'Ông Lão Thông Thái',
                worldX: 8 * tileSize,
                worldY: 16 * tileSize,
                dialogue: 'Các thuộc tính tương sinh tương khắc: Thực Vật khắc Hải Dương, Hải Dương khắc Mãnh Thú, Mãnh Thú khắc Kim Loại, Kim Loại khắc Phi Hành!',
                spriteKey: 'npc_elder'
            },
            {
                name: 'Thiếu Nữ Lữ Hành',
                worldX: 14 * tileSize,
                worldY: 20 * tileSize,
                dialogue: 'Nếu bạn muốn luyện cấp sủng vật, hãy đi ra cổng Nam vào Thảo Nguyên Sủng Vật nhé!',
                spriteKey: 'npc_trainer'
            }
        );
    } else if (mapKey === 'map_2') {
        npcs.push(
            {
                name: 'Huấn Luyện Viên Trưởng',
                worldX: 8 * tileSize,
                worldY: 12 * tileSize,
                dialogue: 'Chào mừng đến Thao Trường Học Viện Cầu Vồng! Phía trên có Phòng Học, Đấu Trường Sơ Cấp và Đấu Trường Bậc Trung.',
                spriteKey: 'npc_trainer'
            },
            {
                name: 'Trọng Tài Sân Đấu',
                worldX: 18 * tileSize,
                worldY: 12 * tileSize,
                dialogue: 'Các đấu trường luôn mở cửa cho những ai muốn chứng minh thực lực. Hãy giành lấy cúp vô địch!',
                spriteKey: 'npc_elder'
            },
            {
                name: 'Học Viên Ưu Tú',
                worldX: 14 * tileSize,
                worldY: 20 * tileSize,
                dialogue: 'Phía Nam thao trường là Khu Ký Túc Xá Học Sinh. Khi mệt mỏi bạn có thể về đó nghỉ ngơi.',
                spriteKey: 'npc_trainer'
            }
        );
    } else if (mapKey === 'map_3') {
        // Phòng học lớp học sủng thú với giáo viên & học sinh chuẩn J2ME
        npcs.push(
            {
                name: 'Giáo Viên Địa Lý',
                worldX: 8 * tileSize,
                worldY: 6 * tileSize,
                dialogue: 'Đại lục Cầu Vồng bao gồm 13 khu vực lớn: Từ Cung Điện, Quảng Trường, Thảo Nguyên Nam, Kim Loại Di Tích cho đến Hải Cảng Bắc Hải và Thiên Không Thành!',
                spriteKey: 'npc_elder'
            },
            {
                name: 'Học Sinh',
                worldX: 12 * tileSize,
                worldY: 6 * tileSize,
                dialogue: 'Thưa thầy, làm sao để tiến hóa Thần Thú lên hình thái tối thượng ạ?',
                spriteKey: 'npc_trainer'
            },
            {
                name: 'Người Anh Song Sinh',
                worldX: 16 * tileSize,
                worldY: 6 * tileSize,
                dialogue: 'Em trai ta bảo rằng ở Kim Loại Di Tích có loài Sư Tử Bạch Kim cực kỳ dũng mãnh!',
                spriteKey: 'npc_trainer'
            },
            {
                name: 'Người Em Song Sinh',
                worldX: 20 * tileSize,
                worldY: 6 * tileSize,
                dialogue: 'Đúng thế! Ta còn nghe nói ở tận cùng di tích có Tổ Xà Hậu Hoàng Kim canh giữ bảo vật bí truyền!',
                spriteKey: 'npc_trainer'
            },
            {
                name: 'Lộ Nhân',
                worldX: 5 * tileSize,
                worldY: 6 * tileSize,
                dialogue: 'Học viện Cầu Vồng là nơi tuyệt vời nhất để nghiên cứu các nhánh tiến hóa của sủng thú!',
                spriteKey: 'npc_elder'
            }
        );
    } else if (j2meMap && j2meMap.npcNames && j2meMap.npcNames.length > 0) {
        const uniqueNames = [...new Set(j2meMap.npcNames)].slice(0, 5);
        let npcIdx = 0;
        for (let r = 4; r < rows - 4 && npcIdx < uniqueNames.length; r += 4) {
            for (let col = 4; col < cols - 4 && npcIdx < uniqueNames.length; col += 4) {
                if (j2meMap.collisionGrid && j2meMap.collisionGrid[r][col] === 0) {
                    const name = uniqueNames[npcIdx];
                    const dialogue = (j2meMap.dialogues && j2meMap.dialogues[npcIdx]) 
                        ? j2meMap.dialogues[npcIdx] 
                        : \`Xin chào! Ta là \${name} thuộc Vương Quốc Cầu Vồng. Chúc bạn thu phục được nhiều sủng vật quý hiếm!\`;

                    npcs.push({
                        name,
                        worldX: col * tileSize,
                        worldY: r * tileSize,
                        dialogue,
                        spriteKey: (npcIdx % 2 === 0) ? 'npc_elder' : 'npc_trainer'
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
    }

    return result;
}
`;

const mapsConfigCode = `// ========================================================
// CẤU HÌNH THẾ GIỚI MỞ VƯƠNG QUỐC SỦNG CẦU VỒNG (MAPS_CONFIG)
// Kết nối toàn diện 18 bản đồ trích xuất nguyên bản từ J2ME
// ========================================================
const MAPS_CONFIG = {
    // 1. CUNG ĐIỆN CẦU VỒNG (MAP 0 NGUYÊN BẢN J2ME - KHỞI ĐẦU CHÍNH)
    map_0: {
        id: 'map_0',
        name: 'Khu Quý Tộc (Cung Điện Cầu Vồng)',
        theme: 'interior',
        baseColor: '#2e7d32',
        pathColor: '#d90429',
        width: 1056,
        height: 1536,
        initialOffset: { x: -8, y: -444 },
        initialPlayerPos: { x: 448, y: 224 },
        wildPool: ['cauvong_pet_1', 'cauvong_pet_2', 'cauvong_pet_3'],
        encounterRate: 0.0,
        portals: [
            {
                name: 'Cổng Nam Ra Quảng Trường Cầu Vồng',
                worldX: 456,
                worldY: 1488,
                width: 144,
                height: 48,
                targetMap: 'map_1',
                targetPlayerPos: { x: 672, y: 120 },
                targetOffset: { x: -152, y: 0 }
            }
        ]
    },

    // 2. THÀNH PHỐ CẦU VỒNG (MAP 1 NGUYÊN BẢN J2ME - QUẢNG TRƯỜNG TRUNG TÂM)
    map_1: {
        id: 'map_1',
        name: 'Quảng Trường Cầu Vồng (Kinh Đô)',
        theme: 'city',
        baseColor: '#2e7d32',
        pathColor: '#ecf0f1',
        width: 1344,
        height: 1536,
        initialOffset: { x: -152, y: -400 },
        initialPlayerPos: { x: 672, y: 224 },
        wildPool: [], // Thành phố an toàn
        encounterRate: 0,
        portals: [
            {
                name: 'Cổng Bắc Lên Cung Điện Cầu Vồng',
                worldX: 600,
                worldY: 0,
                width: 144,
                height: 48,
                targetMap: 'map_0',
                targetPlayerPos: { x: 504, y: 1440 },
                targetOffset: { x: -8, y: -1020 }
            },
            {
                name: 'Cổng Nam Ra Thảo Nguyên Sủng Vật',
                worldX: 600,
                worldY: 1488,
                width: 144,
                height: 48,
                targetMap: 'map_11',
                targetPlayerPos: { x: 768, y: 100 },
                targetOffset: { x: -248, y: 0 }
            },
            {
                name: 'Cổng Đông Ra Học Viện Sủng Vật',
                worldX: 1296,
                worldY: 672,
                width: 48,
                height: 144,
                targetMap: 'map_2',
                targetPlayerPos: { x: 100, y: 720 },
                targetOffset: { x: 0, y: -444 }
            },
            {
                name: 'Cửa Vào Trung Tâm Thương Mại',
                worldX: 336,
                worldY: 672,
                width: 96,
                height: 48,
                targetMap: 'map_43',
                targetPlayerPos: { x: 480, y: 1150 },
                targetOffset: { x: -100, y: -600 }
            }
        ]
    },

    // 3. THAO TRƯỜNG HỌC VIỆN CẦU VỒNG (MAP 2 NGUYÊN BẢN J2ME)
    map_2: {
        id: 'map_2',
        name: 'Thao Trường Học Viện Cầu Vồng',
        theme: 'interior',
        baseColor: '#4a148c',
        pathColor: '#ffd700',
        width: 1344,
        height: 1536,
        initialOffset: { x: -300, y: -700 },
        initialPlayerPos: { x: 488, y: 440 },
        wildPool: ['cauvong_pet_7', 'cauvong_pet_8'],
        encounterRate: 0.015,
        portals: [
            {
                name: 'Cổng Tây Về Quảng Trường Cầu Vồng',
                worldX: 0,
                worldY: 672,
                width: 48,
                height: 144,
                targetMap: 'map_1',
                targetPlayerPos: { x: 1240, y: 720 },
                targetOffset: { x: -684, y: -396 }
            },
            {
                name: 'Cửa Vào Phòng Học Sủng Thú',
                worldX: 336,
                worldY: 384,
                width: 96,
                height: 48,
                targetMap: 'map_3',
                targetPlayerPos: { x: 672, y: 1440 },
                targetOffset: { x: -200, y: -900 }
            },
            {
                name: 'Cửa Vào Đấu Trường Sơ Cấp',
                worldX: 672,
                worldY: 384,
                width: 96,
                height: 48,
                targetMap: 'map_8',
                targetPlayerPos: { x: 384, y: 1150 },
                targetOffset: { x: -50, y: -600 }
            },
            {
                name: 'Cửa Vào Đấu Trường Bậc Trung',
                worldX: 1008,
                worldY: 384,
                width: 96,
                height: 48,
                targetMap: 'map_4',
                targetPlayerPos: { x: 384, y: 1440 },
                targetOffset: { x: -50, y: -900 }
            },
            {
                name: 'Cửa Vào Khu Ký Túc Xá',
                worldX: 672,
                worldY: 1488,
                width: 96,
                height: 48,
                targetMap: 'map_59',
                targetPlayerPos: { x: 480, y: 100 },
                targetOffset: { x: -100, y: 0 }
            }
        ]
    },

    // 4. PHÒNG HỌC HỌC VIỆN CẦU VỒNG (MAP 3 NGUYÊN BẢN J2ME - LỚP HỌC THẦN THÚ)
    map_3: {
        id: 'map_3',
        name: 'Phòng Học Học Viện Cầu Vồng (Lớp Học)',
        theme: 'interior',
        baseColor: '#1e3a8a',
        pathColor: '#3b82f6',
        width: 1344,
        height: 1536,
        initialOffset: { x: -200, y: -900 },
        initialPlayerPos: { x: 672, y: 1440 },
        wildPool: [], // Lớp học an toàn
        encounterRate: 0,
        portals: [
            {
                name: 'Cửa Ra Thao Trường Học Viện',
                worldX: 600,
                worldY: 1488,
                width: 144,
                height: 48,
                targetMap: 'map_2',
                targetPlayerPos: { x: 384, y: 460 },
                targetOffset: { x: -100, y: -200 }
            }
        ]
    },

    // 5. CẦU VỒNG ĐẤU TRƯỜNG BẬC TRUNG (MAP 4 NGUYÊN BẢN J2ME)
    map_4: {
        id: 'map_4',
        name: 'Cầu Vồng Đấu Trường Bậc Trung',
        theme: 'interior',
        baseColor: '#1a237e',
        pathColor: '#ffd700',
        width: 768,
        height: 1536,
        initialOffset: { x: -50, y: -900 },
        initialPlayerPos: { x: 384, y: 1440 },
        wildPool: ['cauvong_pet_9', 'cauvong_pet_10'],
        encounterRate: 0.02,
        portals: [
            {
                name: 'Cửa Ra Thao Trường Học Viện',
                worldX: 336,
                worldY: 1488,
                width: 96,
                height: 48,
                targetMap: 'map_2',
                targetPlayerPos: { x: 1056, y: 460 },
                targetOffset: { x: -500, y: -200 }
            }
        ]
    },

    // 6. CẦU VỒNG ĐẤU TRƯỜNG SƠ CẤP (MAP 8 NGUYÊN BẢN J2ME)
    map_8: {
        id: 'map_8',
        name: 'Cầu Vồng Đấu Trường Sơ Cấp',
        theme: 'interior',
        baseColor: '#0f766e',
        pathColor: '#14b8a6',
        width: 768,
        height: 1248,
        initialOffset: { x: -50, y: -600 },
        initialPlayerPos: { x: 384, y: 1150 },
        wildPool: ['cauvong_pet_8', 'cauvong_pet_9'],
        encounterRate: 0.02,
        portals: [
            {
                name: 'Cửa Ra Thao Trường Học Viện',
                worldX: 336,
                worldY: 1200,
                width: 96,
                height: 48,
                targetMap: 'map_2',
                targetPlayerPos: { x: 720, y: 460 },
                targetOffset: { x: -300, y: -200 }
            }
        ]
    },

    // 7. TRUNG TÂM THƯƠNG MẠI VƯƠNG QUỐC (MAP 43 NGUYÊN BẢN J2ME)
    map_43: {
        id: 'map_43',
        name: 'Trung Tâm Thương Mại Vương Quốc',
        theme: 'interior',
        baseColor: '#b45309',
        pathColor: '#fbbf24',
        width: 960,
        height: 1248,
        initialOffset: { x: -100, y: -600 },
        initialPlayerPos: { x: 480, y: 1150 },
        wildPool: [], // Khu mua sắm an toàn
        encounterRate: 0,
        portals: [
            {
                name: 'Cửa Ra Quảng Trường Cầu Vồng',
                worldX: 432,
                worldY: 1200,
                width: 96,
                height: 48,
                targetMap: 'map_1',
                targetPlayerPos: { x: 384, y: 750 },
                targetOffset: { x: -152, y: -400 }
            }
        ]
    },

    // 8. KHU KÝ TÚC XÁ HỌC SINH (MAP 59 NGUYÊN BẢN J2ME)
    map_59: {
        id: 'map_59',
        name: 'Khu Ký Túc Xá Học Sinh',
        theme: 'interior',
        baseColor: '#334155',
        pathColor: '#64748b',
        width: 960,
        height: 1248,
        initialOffset: { x: -100, y: 0 },
        initialPlayerPos: { x: 480, y: 100 },
        wildPool: [],
        encounterRate: 0,
        portals: [
            {
                name: 'Cửa Ra Thao Trường Học Viện',
                worldX: 432,
                worldY: 0,
                width: 96,
                height: 48,
                targetMap: 'map_2',
                targetPlayerPos: { x: 720, y: 1440 },
                targetOffset: { x: -300, y: -900 }
            }
        ]
    },

    // 9. BÊN NGOÀI THÀNH PHÍA NAM (MAP 11 NGUYÊN BẢN J2ME - THẢO NGUYÊN SỦNG VẬT HOANG DÃ)
    map_11: {
        id: 'map_11',
        name: 'Bên Ngoài Thành Phía Nam (Thảo Nguyên Sủng Vật)',
        theme: 'plain',
        baseColor: '#166534',
        pathColor: '#22c55e',
        width: 1536,
        height: 864,
        initialOffset: { x: -248, y: 0 },
        initialPlayerPos: { x: 768, y: 100 },
        wildPool: ['cauvong_pet_1', 'cauvong_pet_2', 'cauvong_pet_3', 'cauvong_pet_4', 'cauvong_pet_5'],
        encounterRate: 0.03,
        portals: [
            {
                name: 'Cổng Bắc Về Thành Phố Cầu Vồng',
                worldX: 720,
                worldY: 0,
                width: 144,
                height: 48,
                targetMap: 'map_1',
                targetPlayerPos: { x: 672, y: 1440 },
                targetOffset: { x: -152, y: -1000 }
            },
            {
                name: 'Cổng Nam Vào Kim Loại Di Tích 1',
                worldX: 720,
                worldY: 816,
                width: 144,
                height: 48,
                targetMap: 'map_5',
                targetPlayerPos: { x: 480, y: 100 },
                targetOffset: { x: -100, y: 0 }
            },
            {
                name: 'Cổng Đông Sang Cao Nguyên Phía Đông',
                worldX: 1488,
                worldY: 384,
                width: 48,
                height: 96,
                targetMap: 'map_12',
                targetPlayerPos: { x: 100, y: 624 },
                targetOffset: { x: 0, y: -300 }
            },
            {
                name: 'Cổng Tây Sang Rừng Rậm Phía Tây',
                worldX: 0,
                worldY: 384,
                width: 48,
                height: 96,
                targetMap: 'map_16',
                targetPlayerPos: { x: 780, y: 384 },
                targetOffset: { x: -300, y: -100 }
            }
        ]
    },

    // 10. KIM LOẠI DI TÍCH 1 (MAP 5 NGUYÊN BẢN J2ME)
    map_5: {
        id: 'map_5',
        name: 'Kim Loại Di Tích 1 (Tầng 1)',
        theme: 'ruins',
        baseColor: '#374151',
        pathColor: '#4b5563',
        width: 960,
        height: 1536,
        initialOffset: { x: -100, y: 0 },
        initialPlayerPos: { x: 480, y: 100 },
        wildPool: ['cauvong_pet_6', 'cauvong_pet_11', 'cauvong_pet_12', 'cauvong_pet_18'],
        encounterRate: 0.03,
        portals: [
            {
                name: 'Cổng Bắc Lên Thảo Nguyên Phía Nam',
                worldX: 432,
                worldY: 0,
                width: 96,
                height: 48,
                targetMap: 'map_11',
                targetPlayerPos: { x: 792, y: 760 },
                targetOffset: { x: -248, y: -400 }
            },
            {
                name: 'Cổng Nam Xuống Kim Loại Di Tích 2',
                worldX: 432,
                worldY: 1488,
                width: 96,
                height: 48,
                targetMap: 'map_6',
                targetPlayerPos: { x: 384, y: 100 },
                targetOffset: { x: -50, y: 0 }
            }
        ]
    },

    // 11. KIM LOẠI DI TÍCH 2 (MAP 6 NGUYÊN BẢN J2ME)
    map_6: {
        id: 'map_6',
        name: 'Kim Loại Di Tích 2 (Tầng 2)',
        theme: 'ruins',
        baseColor: '#1f2937',
        pathColor: '#374151',
        width: 768,
        height: 1536,
        initialOffset: { x: -50, y: 0 },
        initialPlayerPos: { x: 384, y: 100 },
        wildPool: ['cauvong_pet_11', 'cauvong_pet_12', 'cauvong_pet_18', 'cauvong_pet_19'],
        encounterRate: 0.035,
        portals: [
            {
                name: 'Cổng Bắc Lên Kim Loại Di Tích 1',
                worldX: 336,
                worldY: 0,
                width: 96,
                height: 48,
                targetMap: 'map_5',
                targetPlayerPos: { x: 480, y: 1440 },
                targetOffset: { x: -100, y: -1000 }
            },
            {
                name: 'Cổng Đông Sang Kim Loại Di Tích 3',
                worldX: 720,
                worldY: 720,
                width: 48,
                height: 96,
                targetMap: 'map_10',
                targetPlayerPos: { x: 100, y: 384 },
                targetOffset: { x: 0, y: -100 }
            }
        ]
    },

    // 12. KIM LOẠI DI TÍCH 3 (MAP 10 NGUYÊN BẢN J2ME)
    map_10: {
        id: 'map_10',
        name: 'Kim Loại Di Tích 3 (Tầng Trung Gian)',
        theme: 'ruins',
        baseColor: '#111827',
        pathColor: '#1f2937',
        width: 1440,
        height: 864,
        initialOffset: { x: 0, y: -100 },
        initialPlayerPos: { x: 100, y: 384 },
        wildPool: ['cauvong_pet_18', 'cauvong_pet_19', 'cauvong_pet_23'],
        encounterRate: 0.04,
        portals: [
            {
                name: 'Cổng Tây Về Kim Loại Di Tích 2',
                worldX: 0,
                worldY: 384,
                width: 48,
                height: 96,
                targetMap: 'map_6',
                targetPlayerPos: { x: 672, y: 720 },
                targetOffset: { x: -200, y: -400 }
            },
            {
                name: 'Cổng Bắc Vào Tổ Xà Hậu Hoàng Kim (Boss)',
                worldX: 672,
                worldY: 0,
                width: 96,
                height: 48,
                targetMap: 'map_52',
                targetPlayerPos: { x: 624, y: 1380 },
                targetOffset: { x: -150, y: -900 }
            }
        ]
    },

    // 13. CAO NGUYÊN PHÍA ĐÔNG 1 (MAP 12 NGUYÊN BẢN J2ME)
    map_12: {
        id: 'map_12',
        name: 'Cao Nguyên Phía Đông 1',
        theme: 'plain',
        baseColor: '#78350f',
        pathColor: '#b45309',
        width: 1248,
        height: 1344,
        initialOffset: { x: 0, y: -300 },
        initialPlayerPos: { x: 100, y: 624 },
        wildPool: ['cauvong_pet_7', 'cauvong_pet_8', 'cauvong_pet_9', 'cauvong_pet_10'],
        encounterRate: 0.03,
        portals: [
            {
                name: 'Cổng Tây Về Thảo Nguyên Phía Nam',
                worldX: 0,
                worldY: 624,
                width: 48,
                height: 96,
                targetMap: 'map_11',
                targetPlayerPos: { x: 1440, y: 432 },
                targetOffset: { x: -600, y: -100 }
            },
            {
                name: 'Cổng Bắc Đi Bến Tàu Bắc Hải',
                worldX: 576,
                worldY: 0,
                width: 96,
                height: 48,
                targetMap: 'map_28',
                targetPlayerPos: { x: 576, y: 1380 },
                targetOffset: { x: -100, y: -900 }
            }
        ]
    },

    // 14. RỪNG RẬM PHÍA TÂY 1 (MAP 16 NGUYÊN BẢN J2ME)
    map_16: {
        id: 'map_16',
        name: 'Rừng Rậm Phía Tây 1',
        theme: 'plain',
        baseColor: '#064e3b',
        pathColor: '#059669',
        width: 864,
        height: 864,
        initialOffset: { x: -300, y: -100 },
        initialPlayerPos: { x: 780, y: 384 },
        wildPool: ['cauvong_pet_1', 'cauvong_pet_14', 'cauvong_pet_15', 'cauvong_pet_16'],
        encounterRate: 0.03,
        portals: [
            {
                name: 'Cổng Đông Về Thảo Nguyên Phía Nam',
                worldX: 816,
                worldY: 384,
                width: 48,
                height: 96,
                targetMap: 'map_11',
                targetPlayerPos: { x: 80, y: 432 },
                targetOffset: { x: 0, y: -100 }
            }
        ]
    },

    // 15. BẾN TÀU PHÍA NAM BẮC HẢI (MAP 28 NGUYÊN BẢN J2ME)
    map_28: {
        id: 'map_28',
        name: 'Bến Tàu Phía Nam Bắc Hải',
        theme: 'city',
        baseColor: '#0c4a6e',
        pathColor: '#0284c7',
        width: 1152,
        height: 1440,
        initialOffset: { x: -100, y: -900 },
        initialPlayerPos: { x: 576, y: 1380 },
        wildPool: ['cauvong_pet_69', 'cauvong_pet_70'],
        encounterRate: 0.025,
        portals: [
            {
                name: 'Cổng Nam Về Cao Nguyên Phía Đông',
                worldX: 528,
                worldY: 1392,
                width: 96,
                height: 48,
                targetMap: 'map_12',
                targetPlayerPos: { x: 624, y: 80 },
                targetOffset: { x: -100, y: 0 }
            },
            {
                name: 'Cổng Bắc Đi Quảng Trường Bắc Hải',
                worldX: 528,
                worldY: 0,
                width: 96,
                height: 48,
                targetMap: 'map_48',
                targetPlayerPos: { x: 576, y: 1380 },
                targetOffset: { x: -100, y: -900 }
            }
        ]
    },

    // 16. QUẢNG TRƯỜNG BẮC HẢI (MAP 48 NGUYÊN BẢN J2ME)
    map_48: {
        id: 'map_48',
        name: 'Quảng Trường Bắc Hải',
        theme: 'city',
        baseColor: '#075985',
        pathColor: '#38bdf8',
        width: 1152,
        height: 1440,
        initialOffset: { x: -100, y: -900 },
        initialPlayerPos: { x: 576, y: 1380 },
        wildPool: ['cauvong_pet_71', 'cauvong_pet_72'],
        encounterRate: 0.025,
        portals: [
            {
                name: 'Cổng Nam Về Bến Tàu Bắc Hải',
                worldX: 528,
                worldY: 1392,
                width: 96,
                height: 48,
                targetMap: 'map_28',
                targetPlayerPos: { x: 576, y: 80 },
                targetOffset: { x: -100, y: 0 }
            },
            {
                name: 'Cổng Bắc Lên Thiên Không Thành 1',
                worldX: 528,
                worldY: 0,
                width: 96,
                height: 48,
                targetMap: 'map_49',
                targetPlayerPos: { x: 576, y: 1440 },
                targetOffset: { x: -100, y: -900 }
            }
        ]
    },

    // 17. THIÊN KHÔNG THÀNH 1 (MAP 49 NGUYÊN BẢN J2ME - VƯƠNG QUỐC TRÊN MÂY)
    map_49: {
        id: 'map_49',
        name: 'Thiên Không Thành 1 (Thành Phố Trên Mây)',
        theme: 'nature',
        baseColor: '#0369a1',
        pathColor: '#7dd3fc',
        width: 1152,
        height: 1536,
        initialOffset: { x: -100, y: -900 },
        initialPlayerPos: { x: 576, y: 1440 },
        wildPool: ['cauvong_pet_37', 'cauvong_pet_38'],
        encounterRate: 0.03,
        portals: [
            {
                name: 'Cổng Nam Xuống Quảng Trường Bắc Hải',
                worldX: 528,
                worldY: 1488,
                width: 96,
                height: 48,
                targetMap: 'map_48',
                targetPlayerPos: { x: 576, y: 80 },
                targetOffset: { x: -100, y: 0 }
            },
            {
                name: 'Cổng Bắc Lên Bầu Trời Phương Bắc',
                worldX: 528,
                worldY: 0,
                width: 96,
                height: 48,
                targetMap: 'map_24',
                targetPlayerPos: { x: 720, y: 1440 },
                targetOffset: { x: -200, y: -900 }
            }
        ]
    },

    // 18. BẦU TRỜI PHƯƠNG BẮC 1 (MAP 24 NGUYÊN BẢN J2ME - THIÊN MÃ CUNG)
    map_24: {
        id: 'map_24',
        name: 'Bầu Trời Phương Bắc 1 (Thiên Mã Cung)',
        theme: 'ruins',
        baseColor: '#1e1b4b',
        pathColor: '#6366f1',
        width: 1440,
        height: 1536,
        initialOffset: { x: -200, y: -900 },
        initialPlayerPos: { x: 720, y: 1440 },
        wildPool: ['cauvong_pet_38', 'cauvong_pet_40', 'cauvong_pet_41'],
        encounterRate: 0.035,
        portals: [
            {
                name: 'Cổng Nam Xuống Thiên Không Thành',
                worldX: 672,
                worldY: 1488,
                width: 96,
                height: 48,
                targetMap: 'map_49',
                targetPlayerPos: { x: 576, y: 80 },
                targetOffset: { x: -100, y: 0 }
            }
        ]
    },

    // 19. TỔ XÀ HẬU HOÀNG KIM (MAP 52 NGUYÊN BẢN J2ME - BOSS LAIR)
    map_52: {
        id: 'map_52',
        name: 'Tổ Xà Hậu Hoàng Kim (Nam Chi Phế Tích 4)',
        theme: 'dungeon',
        baseColor: '#7f1d1d',
        pathColor: '#dc2626',
        width: 1248,
        height: 1440,
        initialOffset: { x: -150, y: -900 },
        initialPlayerPos: { x: 624, y: 1380 },
        wildPool: ['cauvong_pet_23', 'cauvong_pet_11'],
        encounterRate: 0.04,
        portals: [
            {
                name: 'Cổng Nam Quay Về Kim Loại Di Tích 3',
                worldX: 576,
                worldY: 1392,
                width: 96,
                height: 48,
                targetMap: 'map_10',
                targetPlayerPos: { x: 720, y: 80 },
                targetOffset: { x: 0, y: 0 }
            }
        ]
    },

    // 20. THỊ TRẤN KHỞI ĐẦU DỰ PHÒNG (PELLET TOWN)
    pelletTown: {
        id: 'pelletTown',
        name: 'Thị Trấn Cầu Vồng (Dự Phòng)',
        bgImageSrc: './img/Pellet Town.png',
        altBgImageSrc: './client/img/Pellet Town.png',
        fgImageSrc: './img/foregroundObjects.png',
        altFgImageSrc: './client/img/foregroundObjects.png',
        width: 3360,
        height: 1920,
        tileWidth: 70,
        tileHeight: 40,
        initialOffset: { x: -735, y: -650 },
        initialPlayerPos: { x: 448, y: 160 },
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
                name: 'Cổng Vực Vào Cung Điện Cầu Vồng',
                worldX: 1344,
                worldY: 48,
                width: 96,
                height: 48,
                targetMap: 'map_0',
                targetPlayerPos: { x: 448, y: 224 },
                targetOffset: { x: -80, y: -76 }
            }
        ]
    },

    // 21. NHÀ NHÂN VẬT CHÍNH (PLAYER HOUSE)
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

// ========================================================
// BẢN ĐỒ THẾ GIỚI MỞ CHUẨN POKÉMON TOWN MAP / POKÉ-GEAR
// Mạng lưới 18 vùng đại lục kết nối trực quan
// ========================================================
const WORLD_MAP_REGIONS = [
    {
        id: 'palace',
        mapId: 'map_0',
        name: 'Cung Điện Cầu Vồng',
        subName: 'Khu Quý Tộc Hoàng Gia',
        icon: '👑',
        gridX: 3, gridY: 1,
        theme: 'royal',
        levelRec: 'Cấp 1 - 5',
        description: 'Đại điện hoàng gia nguy nga tráng lệ, nơi khởi đầu hành trình của mọi Hoàng Kim Huấn Luyện Sư.',
        wildPool: ['cauvong_pet_1', 'cauvong_pet_2'],
        connectedTo: ['square']
    },
    {
        id: 'square',
        mapId: 'map_1',
        name: 'Quảng Trường Cầu Vồng',
        subName: 'Kinh Đô Trung Tâm',
        icon: '🏛️',
        gridX: 3, gridY: 2,
        theme: 'city',
        levelRec: 'Cấp 1 - 10',
        description: 'Trái tim của Vương Quốc Cầu Vồng, nơi giao thương sầm uất và hội tụ các huấn luyện sư tài ba.',
        wildPool: [],
        connectedTo: ['palace', 'academy', 'south_plains', 'mall']
    },
    {
        id: 'academy',
        mapId: 'map_2',
        name: 'Học Viện Sủng Vật',
        subName: 'Thao Trường & Lớp Học',
        icon: '🎓',
        gridX: 4, gridY: 2,
        theme: 'academy',
        levelRec: 'Cấp 5 - 15',
        description: 'Khuôn viên đào tạo huấn luyện sư chuyên nghiệp với các lớp học lý thuyết và ký túc xá học sinh.',
        wildPool: ['cauvong_pet_7', 'cauvong_pet_8'],
        connectedTo: ['square', 'classroom', 'arena_junior', 'arena_mid', 'dormitory']
    },
    {
        id: 'classroom',
        mapId: 'map_3',
        name: 'Phòng Học Học Viện',
        subName: 'Lớp Học Thần Thú',
        icon: '📚',
        gridX: 5, gridY: 2,
        theme: 'indoor',
        levelRec: 'Cấp 5 - 10',
        description: 'Nơi các giáo viên truyền thụ kiến thức về thuộc tính tương sinh tương khắc và bí kíp thu phục sủng vật.',
        wildPool: [],
        connectedTo: ['academy']
    },
    {
        id: 'arena_junior',
        mapId: 'map_8',
        name: 'Đấu Trường Sơ Cấp',
        subName: 'Cầu Vồng Sân Đấu Sơ Cấp',
        icon: '⚔️',
        gridX: 5, gridY: 1,
        theme: 'arena',
        levelRec: 'Cấp 10 - 18',
        description: 'Sàn đấu thử lửa đầu tiên dành cho tân thủ để kiểm tra sức mạnh đội hình sủng vật.',
        wildPool: ['cauvong_pet_8', 'cauvong_pet_9'],
        connectedTo: ['academy']
    },
    {
        id: 'arena_mid',
        mapId: 'map_4',
        name: 'Đấu Trường Bậc Trung',
        subName: 'Cầu Vồng Sân Đấu Trung Cấp',
        icon: '🏆',
        gridX: 6, gridY: 1,
        theme: 'arena',
        levelRec: 'Cấp 18 - 28',
        description: 'Sân đấu dành cho các huấn luyện sư dày dạn kinh nghiệm với những phần thưởng quý giá.',
        wildPool: ['cauvong_pet_9', 'cauvong_pet_10'],
        connectedTo: ['academy']
    },
    {
        id: 'mall',
        mapId: 'map_43',
        name: 'Trung Tâm Thương Mại',
        subName: 'Đại Siêu Thị Vương Quốc',
        icon: '🏪',
        gridX: 2, gridY: 2,
        theme: 'shop',
        levelRec: 'An toàn',
        description: 'Trung tâm cung cấp đầy đủ các loại bóng thu phục, đá tiến hóa ngũ hành và dược phẩm cao cấp.',
        wildPool: [],
        connectedTo: ['square']
    },
    {
        id: 'dormitory',
        mapId: 'map_59',
        name: 'Khu Ký Túc Xá',
        subName: 'Ký Túc Xá Học Sinh',
        icon: '🛏️',
        gridX: 4, gridY: 3,
        theme: 'indoor',
        levelRec: 'An toàn',
        description: 'Khu nhà nghỉ ngơi và sinh hoạt của các học viên và huấn luyện viên học viện.',
        wildPool: [],
        connectedTo: ['academy']
    },
    {
        id: 'south_plains',
        mapId: 'map_11',
        name: 'Bình Nguyên Phía Nam',
        subName: 'Bên Ngoài Thành Nam',
        icon: '🌾',
        gridX: 3, gridY: 3,
        theme: 'plain',
        levelRec: 'Cấp 5 - 12',
        description: 'Thảo nguyên bao la ngút ngàn bên ngoài cổng nam, nơi sinh sống của rất nhiều sủng vật hệ Cỏ và hệ Mãnh Thú.',
        wildPool: ['cauvong_pet_1', 'cauvong_pet_2', 'cauvong_pet_3', 'cauvong_pet_4', 'cauvong_pet_5'],
        connectedTo: ['square', 'ruins_1', 'east_highland', 'west_forest']
    },
    {
        id: 'west_forest',
        mapId: 'map_16',
        name: 'Rừng Rậm Phía Tây',
        subName: 'Rừng Cổ Thụ 1 - 5',
        icon: '🌲',
        gridX: 1, gridY: 3,
        theme: 'forest',
        levelRec: 'Cấp 12 - 20',
        description: 'Cánh rừng nguyên sinh rậm rạp che phủ bởi tán cây cổ thụ, nơi ẩn náu của các loài sủng vật hoang dã bí hiểm.',
        wildPool: ['cauvong_pet_1', 'cauvong_pet_14', 'cauvong_pet_15', 'cauvong_pet_16'],
        connectedTo: ['south_plains']
    },
    {
        id: 'east_highland',
        mapId: 'map_12',
        name: 'Cao Nguyên Phía Đông',
        subName: 'Dãy Núi Đông 1 - 4',
        icon: '⛰️',
        gridX: 5, gridY: 3,
        theme: 'highland',
        levelRec: 'Cấp 15 - 25',
        description: 'Vùng cao nguyên đá gồ ghề lộng gió, con đường hiểm trở dẫn thẳng ra hải cảng Bắc Hải.',
        wildPool: ['cauvong_pet_7', 'cauvong_pet_8', 'cauvong_pet_9', 'cauvong_pet_10'],
        connectedTo: ['south_plains', 'north_sea_pier']
    },
    {
        id: 'ruins_1',
        mapId: 'map_5',
        name: 'Kim Loại Di Tích 1',
        subName: 'Phế Tích Cổ Đại Tầng 1',
        icon: '⚙️',
        gridX: 3, gridY: 4,
        theme: 'ruins',
        levelRec: 'Cấp 20 - 30',
        description: 'Tàn tích văn minh cơ khí cổ xưa chìm sâu dưới lòng đất, chứa đầy cạm bẫy và sủng vật hệ Kim Loại hung hãn.',
        wildPool: ['cauvong_pet_6', 'cauvong_pet_11', 'cauvong_pet_12', 'cauvong_pet_18'],
        connectedTo: ['south_plains', 'ruins_2']
    },
    {
        id: 'ruins_2',
        mapId: 'map_6',
        name: 'Kim Loại Di Tích 2',
        subName: 'Phế Tích Cổ Đại Tầng 2',
        icon: '🛡️',
        gridX: 3, gridY: 5,
        theme: 'ruins',
        levelRec: 'Cấp 25 - 35',
        description: 'Tầng sâu hơn của phế tích cơ khí, nơi dòng năng lượng cổ đại vẫn còn vận hành các cỗ máy canh gác bí ẩn.',
        wildPool: ['cauvong_pet_11', 'cauvong_pet_12', 'cauvong_pet_18', 'cauvong_pet_19'],
        connectedTo: ['ruins_1', 'ruins_3']
    },
    {
        id: 'ruins_3',
        mapId: 'map_10',
        name: 'Kim Loại Di Tích 3',
        subName: 'Phế Tích Trung Gian',
        icon: '🗿',
        gridX: 4, gridY: 5,
        theme: 'ruins',
        levelRec: 'Cấp 30 - 40',
        description: 'Cửa ngõ dẫn tới sào huyệt sâu nhất của phế tích phương nam, nơi canh giữ linh hồn Xích Kim Xà Hậu.',
        wildPool: ['cauvong_pet_18', 'cauvong_pet_19', 'cauvong_pet_23'],
        connectedTo: ['ruins_2', 'boss_lair']
    },
    {
        id: 'boss_lair',
        mapId: 'map_52',
        name: 'Tổ Xà Hậu Hoàng Kim',
        subName: 'Nam Chi Phế Tích 4 (Boss)',
        icon: '🐍',
        gridX: 5, gridY: 5,
        theme: 'boss',
        levelRec: 'Boss Cấp 45+',
        description: 'Sào huyệt cấm địa của Xích Kim Xà Hậu - vị chúa tể cổ xưa canh giữ kho tàng vĩ đại của vương quốc.',
        wildPool: ['cauvong_pet_23', 'cauvong_pet_11'],
        connectedTo: ['ruins_3']
    },
    {
        id: 'north_sea_pier',
        mapId: 'map_28',
        name: 'Bến Tàu Bắc Hải',
        subName: 'Hải Cảng Phương Bắc',
        icon: '⚓',
        gridX: 5, gridY: 0,
        theme: 'ocean',
        levelRec: 'Cấp 25 - 35',
        description: 'Bến cảng tấp nập kết nối đại lục với vùng biển Bắc Hải đầy bão tố và các loài thủy quái to lớn.',
        wildPool: ['cauvong_pet_69', 'cauvong_pet_70'],
        connectedTo: ['east_highland', 'north_sea_square']
    },
    {
        id: 'north_sea_square',
        mapId: 'map_48',
        name: 'Quảng Trường Bắc Hải',
        subName: 'Đô Thị Băng Tuyết',
        icon: '❄️',
        gridX: 4, gridY: 0,
        theme: 'ocean',
        levelRec: 'Cấp 30 - 40',
        description: 'Thị trấn tuyết trắng xóa bên bờ biển phía bắc, nơi lưu truyền truyền thuyết về Thiên Không Thành trên chín tầng mây.',
        wildPool: ['cauvong_pet_71', 'cauvong_pet_72'],
        connectedTo: ['north_sea_square', 'sky_city']
    },
    {
        id: 'sky_city',
        mapId: 'map_49',
        name: 'Thiên Không Thành',
        subName: 'Vương Quốc Trên Mây',
        icon: '☁️',
        gridX: 2, gridY: 0,
        theme: 'sky',
        levelRec: 'Cấp 35 - 45',
        description: 'Thành phố bay lơ lửng giữa những tầng mây ngũ sắc, nơi cư ngụ của các thần thú Phi Hành và Ấu Long.',
        wildPool: ['cauvong_pet_37', 'cauvong_pet_38'],
        connectedTo: ['north_sea_square', 'sky_north']
    },
    {
        id: 'sky_north',
        mapId: 'map_24',
        name: 'Bầu Trời Phương Bắc',
        subName: 'Thiên Mã Cung Đỉnh Mây',
        icon: '🪽',
        gridX: 1, gridY: 0,
        theme: 'sky',
        levelRec: 'Cấp 40 - 50',
        description: 'Đỉnh cao nhất của bầu trời, nơi luồng gió thần thánh hội tụ và sinh ra những sinh vật truyền thuyết tối cao.',
        wildPool: ['cauvong_pet_38', 'cauvong_pet_40', 'cauvong_pet_41'],
        connectedTo: ['sky_city']
    }
];

if (typeof window !== 'undefined') {
    window.MAPS_CONFIG = MAPS_CONFIG;
    window.WORLD_MAP_REGIONS = WORLD_MAP_REGIONS;
    window.generateJ2MEMapCanvas = generateJ2MEMapCanvas;
}
`;

const fullCode = fileHeader + '\n' + mapsConfigCode;
fs.writeFileSync(path.join(__dirname, '../client/js/data/maps.js'), fullCode, 'utf8');
console.log('✅ Successfully updated client/js/data/maps.js');
