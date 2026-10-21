// ========================================================
// GAME ANIMON - MAIN ENGINE (MULTI-MAP & COMBAT SYSTEM)
// ========================================================

const canvas = document.querySelector('canvas');
const ctx = canvas.getContext('2d');

canvas.width = 1024;
canvas.height = 576;
ctx.imageSmoothingEnabled = false;

// Hàm tải ảnh thông minh với fallback đường dẫn
function loadSmartImage(primaryPath, fallbackPath) {
    const img = new Image();
    img.src = primaryPath;
    img.onerror = () => {
        if (fallbackPath && img.src.indexOf(fallbackPath) === -1) {
            img.src = fallbackPath;
        }
    };
    return img;
}

// 1. Trạng thái Trò chơi
const gameState = {
    currentMapId: 'pelletTown',
    isDebug: false,
    isTransitioning: false,
    transitionAlpha: 0,
    transitionDirection: 0, // 1: Fade out (tối dần), -1: Fade in (sáng dần)
    pendingMapChange: null,
    playtime: 0,

    playerTeam: [
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
        }
    ],

    inventory: {
        pokeballs: 5,
        potions: 3,
        gold: 500
    }
};

// 2. Tải Spritesheets của Người chơi
const playerDownImg = loadSmartImage('./img/playerDown.png', './client/img/playerDown.png');
const playerUpImg = loadSmartImage('./img/playerUp.png', './client/img/playerUp.png');
const playerLeftImg = loadSmartImage('./img/playerLeft.png', './client/img/playerLeft.png');
const playerRightImg = loadSmartImage('./img/playerRight.png', './client/img/playerRight.png');

const player = new Sprite({
    position: { x: 488, y: 254 },
    image: playerDownImg,
    frames: { max: 4, hold: 10 },
    sprites: {
        up: playerUpImg,
        left: playerLeftImg,
        right: playerRightImg,
        down: playerDownImg
    },
    fallbackColor: '#e74c3c'
});

// 3. Biến quản lý Thực thể Bản đồ & NPC
let currentOffset = { x: -735, y: -650 };
let backgroundSprite = null;
let foregroundSprite = null;
let boundaries = [];
let battleZones = [];
let portals = [];
let currentNpcs = [];
let activeDialogue = null;
let currentNearestNpc = null;
let moveAbles = [];

// 4. Quản lý Bàn phím
const keys = {
    w: { pressed: false },
    a: { pressed: false },
    s: { pressed: false },
    d: { pressed: false },
    shift: { pressed: false }
};

let lastKey = '';

// Hitbox chuẩn ở phần chân
function getPlayerHitbox() {
    return {
        position: {
            x: player.position.x + 8,
            y: player.position.y + 40
        },
        width: 32,
        height: 24
    };
}

// Kiểm tra va chạm hình chữ nhật
function rectangularCollision({ rectangle1, rectangle2 }) {
    return (
        rectangle1.position.x + rectangle1.width > rectangle2.position.x &&
        rectangle1.position.x < rectangle2.position.x + rectangle2.width &&
        rectangle1.position.y + rectangle1.height > rectangle2.position.y &&
        rectangle1.position.y < rectangle2.position.y + rectangle2.height
    );
}

// ========================================================
// HỆ THỐNG KHỞI TẠO BẢN ĐỒ (TILED MAP INITIALIZATION)
// ========================================================
function loadMap(mapId, targetPlayerPos, targetOffset) {
    const config = window.MAPS_CONFIG[mapId];
    if (!config) return;

    gameState.currentMapId = mapId;
    currentOffset = targetOffset ? { ...targetOffset } : { ...config.initialOffset };

    if (targetPlayerPos) {
        player.position.x = targetPlayerPos.x;
        player.position.y = targetPlayerPos.y;
    } else {
        player.position.x = config.initialPlayerPos.x;
        player.position.y = config.initialPlayerPos.y;
    }

    boundaries = [];
    battleZones = [];
    portals = [];

    // Tải Cổng dịch chuyển (Portals)
    if (config.portals) {
        config.portals.forEach(p => {
            portals.push(
                new Portal({
                    position: {
                        x: p.worldX + currentOffset.x,
                        y: p.worldY + currentOffset.y
                    },
                    width: p.width,
                    height: p.height,
                    targetMap: p.targetMap,
                    targetPlayerPos: p.targetPlayerPos,
                    targetOffset: p.targetOffset,
                    name: p.name
                })
            );
        });
    }

    // Tải theo từng loại bản đồ
    if (mapId === 'pelletTown') {
        const bgImg = loadSmartImage(config.bgImageSrc, config.altBgImageSrc);
        backgroundSprite = new Sprite({
            position: { x: currentOffset.x, y: currentOffset.y },
            image: bgImg,
            width: config.width,
            height: config.height,
            fallbackColor: '#5c9442'
        });

        const fgImg = loadSmartImage(config.fgImageSrc, config.altFgImageSrc);
        foregroundSprite = new Sprite({
            position: { x: currentOffset.x, y: currentOffset.y },
            image: fgImg,
            width: config.width,
            height: config.height,
            fallbackColor: 'transparent'
        });

        // Nạp va chạm an toàn từ collisions.js
        const rawCollisions = (window.collisionsData || (typeof collisionsData !== 'undefined' ? collisionsData : []));
        const mapW = config.tileWidth;
        for (let i = 0; i < rawCollisions.length; i += mapW) {
            const row = rawCollisions.slice(i, i + mapW);
            const rowIdx = Math.floor(i / mapW);
            row.forEach((symbol, colIdx) => {
                if (symbol === 1025) {
                    boundaries.push(
                        new Boundary({
                            position: {
                                x: colIdx * Boundary.width + currentOffset.x,
                                y: rowIdx * Boundary.height + currentOffset.y
                            }
                        })
                    );
                }
            });
        }

        // Nạp bụi cỏ an toàn từ battleZones.js
        const rawBattle = (window.battleZonesData || (typeof battleZonesData !== 'undefined' ? battleZonesData : []));
        for (let i = 0; i < rawBattle.length; i += mapW) {
            const row = rawBattle.slice(i, i + mapW);
            const rowIdx = Math.floor(i / mapW);
            row.forEach((symbol, colIdx) => {
                if (symbol === 1025) {
                    battleZones.push(
                        new BattleZone({
                            position: {
                                x: colIdx * BattleZone.width + currentOffset.x,
                                y: rowIdx * BattleZone.height + currentOffset.y
                            }
                        })
                    );
                }
            });
        }
    } else if (mapId === 'playerHouse') {
        // Bản đồ trong nhà (Nội thất ấm cúng)
        backgroundSprite = createInteriorHouseSprite(currentOffset);
        foregroundSprite = null;

        // Bức tường ranh giới trong nhà
        boundaries.push(new Boundary({ position: { x: 100, y: 80 }, width: 824, height: 48 })); // Tường trên
        boundaries.push(new Boundary({ position: { x: 100, y: 80 }, width: 48, height: 440 })); // Tường trái
        boundaries.push(new Boundary({ position: { x: 876, y: 80 }, width: 48, height: 440 })); // Tường phải
        boundaries.push(new Boundary({ position: { x: 100, y: 520 }, width: 360, height: 48 })); // Tường dưới trái
        boundaries.push(new Boundary({ position: { x: 560, y: 520 }, width: 364, height: 48 })); // Tường dưới phải

        // Nội thất: Giường ngủ, Bàn làm việc, TV
        boundaries.push(new Boundary({ position: { x: 180, y: 140 }, width: 100, height: 120 })); // Giường ngủ
        boundaries.push(new Boundary({ position: { x: 680, y: 140 }, width: 140, height: 80 })); // Bàn PC
        boundaries.push(new Boundary({ position: { x: 440, y: 130 }, width: 140, height: 60 })); // Kệ TV
    } else if (mapId === 'route1') {
        // Tuyến đường rừng hoang dã
        backgroundSprite = createForestRouteSprite(currentOffset, config.width, config.height);
        foregroundSprite = null;

        // Ranh giới hai bên vách đá rừng
        boundaries.push(new Boundary({ position: { x: currentOffset.x, y: currentOffset.y }, width: 96, height: config.height }));
        boundaries.push(new Boundary({ position: { x: currentOffset.x + config.width - 96, y: currentOffset.y }, width: 96, height: config.height }));
        boundaries.push(new Boundary({ position: { x: currentOffset.x, y: currentOffset.y }, width: config.width, height: 96 }));

        // Cụm bụi cỏ hoang dã trên Tuyến 1
        const bzCoords = [
            { x: 300, y: 300, w: 240, h: 180 },
            { x: 700, y: 400, w: 280, h: 200 },
            { x: 400, y: 650, w: 320, h: 180 }
        ];

        bzCoords.forEach(bz => {
            battleZones.push(
                new BattleZone({
                    position: { x: bz.x + currentOffset.x, y: bz.y + currentOffset.y },
                    width: bz.w,
                    height: bz.h
                })
            );
        });
    } else {
        // CÁC BẢN ĐỒ TRÍCH XUẤT TỪ J2ME (cun1, cheng1, dating, dong1, huangdi1, pingyuan)
        if (typeof window.generateJ2MEMapCanvas === 'function') {
            const j2meMap = window.generateJ2MEMapCanvas(
                mapId,
                config.theme || 'nature',
                config.baseColor || '#2e7d32',
                config.pathColor || '#8d6e63'
            );

            backgroundSprite = new Sprite({
                position: { x: currentOffset.x, y: currentOffset.y },
                image: j2meMap.image,
                width: j2meMap.width,
                height: j2meMap.height,
                fallbackColor: config.baseColor || '#2e7d32'
            });
            // Tán cây và mái nhà phía trước (Layer 3 J2ME)
            if (j2meMap.foregroundImage) {
                foregroundSprite = new Sprite({
                    position: { x: currentOffset.x, y: currentOffset.y },
                    image: j2meMap.foregroundImage,
                    width: j2meMap.width,
                    height: j2meMap.height
                });
            } else {
                foregroundSprite = null;
            }

            // Ranh giới & Vật cản
            if (j2meMap.boundaries) {
                j2meMap.boundaries.forEach(b => {
                    boundaries.push(
                        new Boundary({
                            position: {
                                x: b.x + currentOffset.x,
                                y: b.y + currentOffset.y
                            },
                            width: b.width,
                            height: b.height
                        })
                    );
                });
            }

            // Bụi cỏ gặp quái
            if (j2meMap.battleZones && config.wildPool && config.wildPool.length > 0) {
                j2meMap.battleZones.forEach(bz => {
                    battleZones.push(
                        new BattleZone({
                            position: {
                                x: bz.x + currentOffset.x,
                                y: bz.y + currentOffset.y
                            },
                            width: bz.width,
                            height: bz.height
                        })
                    );
                });
            }

            // Nạp NPC thế giới J2ME trên bản đồ
            currentNpcs = [];
            if (j2meMap.npcs && j2meMap.npcs.length > 0) {
                j2meMap.npcs.forEach(npc => {
                    const sprite = (window.J2MESprite) 
                        ? new window.J2MESprite({ spriteKey: npc.spriteKey || 'r1', scale: 2.2, flipX: false }) 
                        : null;

                    currentNpcs.push({
                        name: npc.name,
                        dialogue: npc.dialogue,
                        worldX: npc.worldX,
                        worldY: npc.worldY,
                        position: {
                            x: npc.worldX + currentOffset.x,
                            y: npc.worldY + currentOffset.y
                        },
                        sprite
                    });
                });
            }
        }
    }

    moveAbles = [backgroundSprite, ...boundaries, ...battleZones, ...portals, ...currentNpcs];
    if (foregroundSprite) moveAbles.push(foregroundSprite);
}

// Tạo hình ảnh nội thất nhà bằng Canvas procedural
function createInteriorHouseSprite(offset) {
    const offCanvas = document.createElement('canvas');
    offCanvas.width = 1024;
    offCanvas.height = 576;
    const c = offCanvas.getContext('2d');

    // Nền tối ngoài phòng
    c.fillStyle = '#0f172a';
    c.fillRect(0, 0, 1024, 576);

    // Sàn gỗ ấm áp
    c.fillStyle = '#b45309';
    c.fillRect(100, 80, 824, 440);

    c.fillStyle = '#d97706';
    for (let y = 80; y < 520; y += 32) {
        c.fillRect(100, y, 824, 28);
    }

    // Thảm trải sàn lớn
    c.fillStyle = '#1d4ed8';
    c.fillRect(360, 260, 300, 180);
    c.fillStyle = '#3b82f6';
    c.fillRect(375, 275, 270, 150);

    // Giường ngủ
    c.fillStyle = '#991b1b';
    c.fillRect(180, 140, 100, 120);
    c.fillStyle = '#f8fafc';
    c.fillRect(190, 145, 80, 35); // Gối
    c.fillStyle = '#dc2626';
    c.fillRect(185, 185, 90, 70); // Chăn

    // Bàn máy tính PC
    c.fillStyle = '#475569';
    c.fillRect(680, 140, 140, 80);
    c.fillStyle = '#1e293b';
    c.fillRect(720, 150, 60, 45); // Màn hình PC
    c.fillStyle = '#38bdf8';
    c.fillRect(725, 155, 50, 35); // Màn hình sáng

    // TV kệ
    c.fillStyle = '#334155';
    c.fillRect(440, 130, 140, 60);
    c.fillStyle = '#000000';
    c.fillRect(455, 135, 110, 45);

    // Bậc cửa ra vào phía dưới
    c.fillStyle = '#eab308';
    c.fillRect(460, 510, 104, 10);

    const img = new Image();
    img.src = offCanvas.toDataURL();
    return new Sprite({
        position: { x: offset.x, y: offset.y },
        image: img,
        width: 1024,
        height: 576,
        fallbackColor: '#b45309'
    });
}

// Tạo hình ảnh Tuyến đường Rừng bằng Canvas procedural
function createForestRouteSprite(offset, width, height) {
    const offCanvas = document.createElement('canvas');
    offCanvas.width = width;
    offCanvas.height = height;
    const c = offCanvas.getContext('2d');

    // Nền cỏ rừng
    c.fillStyle = '#15803d';
    c.fillRect(0, 0, width, height);

    // Con đường đất mòn uốn lượn
    c.fillStyle = '#9a3412';
    c.fillRect(width / 2 - 120, 0, 240, height);
    c.fillStyle = '#c2410c';
    c.fillRect(width / 2 - 100, 0, 200, height);

    // Cây cối hai bên rìa
    c.fillStyle = '#166534';
    for (let y = 30; y < height; y += 75) {
        c.beginPath();
        c.arc(50, y, 45, 0, Math.PI * 2);
        c.fill();

        c.beginPath();
        c.arc(width - 50, y, 45, 0, Math.PI * 2);
        c.fill();
    }

    // Các cụm cỏ hoang dã
    c.fillStyle = '#14532d';
    const bzCoords = [
        { x: 300, y: 300, w: 240, h: 180 },
        { x: 700, y: 400, w: 280, h: 200 },
        { x: 400, y: 650, w: 320, h: 180 }
    ];
    bzCoords.forEach(b => {
        c.fillRect(b.x, b.y, b.w, b.h);
        c.strokeStyle = '#052e16';
        c.strokeRect(b.x, b.y, b.w, b.h);
    });

    const img = new Image();
    img.src = offCanvas.toDataURL();
    return new Sprite({
        position: { x: offset.x, y: offset.y },
        image: img,
        width,
        height,
        fallbackColor: '#15803d'
    });
}

// ========================================================
// HIỆU ỨNG CHUYỂN BẢN ĐỒ (PORTAL TRANSITION)
// ========================================================
function triggerPortalTransition(portal) {
    if (gameState.isTransitioning) return;
    gameState.isTransitioning = true;
    gameState.transitionDirection = 1; // Fade out sang đen
    gameState.transitionAlpha = 0;
    gameState.pendingMapChange = portal;

    window.soundEngine?.playWarp();
}

function processMapTransition() {
    if (!gameState.isTransitioning) return;

    if (gameState.transitionDirection === 1) {
        gameState.transitionAlpha += 0.08;
        if (gameState.transitionAlpha >= 1) {
            gameState.transitionAlpha = 1;
            // Thực hiện tải map mới
            const p = gameState.pendingMapChange;
            if (p) {
                loadMap(p.targetMap, p.targetPlayerPos, p.targetOffset);
                gameState.pendingMapChange = null;
            }
            gameState.transitionDirection = -1; // Fade in sáng lại
        }
    } else if (gameState.transitionDirection === -1) {
        gameState.transitionAlpha -= 0.08;
        if (gameState.transitionAlpha <= 0) {
            gameState.transitionAlpha = 0;
            gameState.isTransitioning = false;
        }
    }

    // Vẽ màn đen chuyển cảnh
    ctx.save();
    ctx.fillStyle = `rgba(0, 0, 0, ${gameState.transitionAlpha})`;
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    ctx.restore();
}

// ========================================================
// KÍCH HOẠT TRẬN ĐẤU POKÉMON HOANG DÃ
// ========================================================
function checkWildBattleEncounter(playerHitbox) {
    if (gameState.isTransitioning || window.battleSystem.active) return;

    const mapConfig = window.MAPS_CONFIG[gameState.currentMapId];
    if (!mapConfig || !mapConfig.wildPool || mapConfig.wildPool.length === 0) return;

    for (let i = 0; i < battleZones.length; i++) {
        const bz = battleZones[i];
        const overlapX = Math.max(0, Math.min(playerHitbox.position.x + playerHitbox.width, bz.position.x + bz.width) - Math.max(playerHitbox.position.x, bz.position.x));
        const overlapY = Math.max(0, Math.min(playerHitbox.position.y + playerHitbox.height, bz.position.y + bz.height) - Math.max(playerHitbox.position.y, bz.position.y));

        if (overlapX * overlapY > (playerHitbox.width * playerHitbox.height) / 2) {
            window.soundEngine?.playGrass();

            if (Math.random() < (mapConfig.encounterRate || 0.015)) {
                const pool = mapConfig.wildPool;
                const chosenCode = pool[Math.floor(Math.random() * pool.length)];
                const presetList = window.MONSTERS_PRESET || [];
                let wildMon = presetList.find(m => m.code === chosenCode);
                if (!wildMon) {
                    wildMon = presetList[Math.floor(Math.random() * Math.min(25, presetList.length))];
                }

                // Scale cấp độ và chỉ số quái hoang dã chuẩn J2ME
                const wildLevel = Math.floor(Math.random() * 4) + 4;
                const scaledWild = (window.calculateMonsterStats && wildMon)
                    ? window.calculateMonsterStats(wildMon, wildLevel)
                    : { ...wildMon, level: wildLevel };

                player.moving = false;
                window.battleSystem.startBattle({
                    wildMonster: scaledWild,
                    playerTeam: gameState.playerTeam,
                    inventory: gameState.inventory,
                    onEnd: ({ won, needHeal }) => {
                        if (needHeal) {
                            loadMap('playerHouse', { x: 488, y: 380 }, { x: 0, y: 0 });
                        }
                    }
                });
                break;
            }
        }
    }
}

// ========================================================
// VÒNG LẶP CHÍNH CỦA TRÒ CHƠI (MAIN GAME LOOP)
// ========================================================
function animate() {
    window.requestAnimationFrame(animate);

    // 1. Luôn xóa khung hình
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // 2. Luôn vẽ nền thế giới (Map)
    if (backgroundSprite) backgroundSprite.draw(ctx);

    // 3. Vẽ boundaries, battlezones, portals khi debug
    if (gameState.isDebug) {
        boundaries.forEach(b => b.draw(ctx, true));
        battleZones.forEach(bz => bz.draw(ctx, true));
        portals.forEach(p => p.draw(ctx, true));
    }

    // 4. Vẽ Người chơi
    player.draw(ctx);

    // 4.5. Vẽ các NPC Thế Giới J2ME Cầu Vồng
    let nearestNpc = null;
    let minNpcDist = Infinity;

    currentNpcs.forEach(npc => {
        const nx = npc.position.x;
        const ny = npc.position.y;

        // Vẽ Sprite NPC
        if (npc.sprite) {
            npc.sprite.update(16);
            npc.sprite.draw(ctx, nx + 24, ny + 40);
        } else {
            ctx.fillStyle = '#f39c12';
            ctx.beginPath();
            ctx.arc(nx + 24, ny + 24, 18, 0, Math.PI * 2);
            ctx.fill();
        }

        // Tên NPC
        ctx.save();
        ctx.fillStyle = 'rgba(0, 0, 0, 0.7)';
        if (ctx.roundRect) {
            ctx.roundRect(nx + 24 - 45, ny - 16, 90, 18, 4);
        } else {
            ctx.fillRect(nx + 24 - 45, ny - 16, 90, 18);
        }
        ctx.fill();
        ctx.fillStyle = '#f1c40f';
        ctx.font = 'bold 11px sans-serif';
        ctx.textAlign = 'center';
        ctx.fillText(npc.name, nx + 24, ny - 3);
        ctx.restore();

        // Tính khoảng cách tới người chơi
        const dist = Math.hypot(player.position.x - nx, player.position.y - ny);
        if (dist < minNpcDist) {
            minNpcDist = dist;
            nearestNpc = npc;
        }
    });

    currentNearestNpc = (nearestNpc && minNpcDist < 70) ? nearestNpc : null;

    // Gợi ý tương tác khi đứng gần NPC
    if (currentNearestNpc && !activeDialogue) {
        ctx.save();
        const nx = currentNearestNpc.position.x + 24;
        const ny = currentNearestNpc.position.y - 28;
        ctx.fillStyle = '#e74c3c';
        if (ctx.roundRect) {
            ctx.roundRect(nx - 55, ny - 12, 110, 22, 5);
        } else {
            ctx.fillRect(nx - 55, ny - 12, 110, 22);
        }
        ctx.fill();
        ctx.strokeStyle = '#ffffff';
        ctx.lineWidth = 1.5;
        if (ctx.roundRect) ctx.roundRect(nx - 55, ny - 12, 110, 22, 5); else ctx.strokeRect(nx - 55, ny - 12, 110, 22);
        ctx.stroke();

        ctx.fillStyle = '#ffffff';
        ctx.font = 'bold 11px sans-serif';
        ctx.textAlign = 'center';
        ctx.fillText('💬 [E] Nói chuyện', nx, ny + 3);
        ctx.restore();
    }

    // 5. Vẽ Vật thể che phía trước (ngọn cây, mái nhà)
    if (foregroundSprite) foregroundSprite.draw(ctx);

    // 5.5. Vẽ hộp thoại nếu đang tương tác
    if (activeDialogue) {
        drawDialogueBox(ctx);
    }

    // 6. Xử lý hiệu ứng chuyển cảnh bản đồ
    processMapTransition();

    // 7. Vẽ HUD thông tin
    drawGameHUD();

    // 8. Nếu đang trong trận đấu: Vẽ giao diện trận đấu và dừng di chuyển
    if (window.battleSystem && window.battleSystem.active) {
        window.battleSystem.draw(ctx, canvas.width, canvas.height);
        return;
    }

    // 9. Nếu đang ở màn hình Menu chính:
    if (window.menuManager?.isInMainMenu) {
        // Vẽ lớp phủ làm mờ nhẹ thế giới phía sau Menu để tôn Menu nổi bật
        ctx.save();
        ctx.fillStyle = 'rgba(15, 23, 42, 0.55)';
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        ctx.restore();
        return; // Dừng di chuyển nhân vật khi Menu đang mở
    }

    // 10. Xử lý di chuyển & Va chạm khi Menu đóng và không mở đối thoại
    if (!gameState.isTransitioning && !activeDialogue) {
        handlePlayerMovement();
    }
}

function handlePlayerMovement() {
    let moving = true;
    player.moving = false;

    const baseSpeed = 3;
    const speed = keys.shift.pressed ? 5 : baseSpeed;
    player.frames.hold = keys.shift.pressed ? 6 : 10;

    const playerHitbox = getPlayerHitbox();

    // Kiểm tra Cổng dịch chuyển (Portals)
    for (let i = 0; i < portals.length; i++) {
        const portal = portals[i];
        if (rectangularCollision({ rectangle1: playerHitbox, rectangle2: portal })) {
            triggerPortalTransition(portal);
            return;
        }
    }

    if (keys.w.pressed && lastKey === 'w') {
        player.moving = true;
        player.image = player.sprites.up;

        for (let i = 0; i < boundaries.length; i++) {
            const b = boundaries[i];
            if (rectangularCollision({ rectangle1: playerHitbox, rectangle2: { ...b, position: { x: b.position.x, y: b.position.y + speed } } })) {
                moving = false;
                window.soundEngine?.playBump();
                break;
            }
        }

        if (moving) {
            moveAbles.forEach(m => { m.position.y += speed; });
            currentOffset.y += speed;
        }
    } else if (keys.a.pressed && lastKey === 'a') {
        player.moving = true;
        player.image = player.sprites.left;

        for (let i = 0; i < boundaries.length; i++) {
            const b = boundaries[i];
            if (rectangularCollision({ rectangle1: playerHitbox, rectangle2: { ...b, position: { x: b.position.x + speed, y: b.position.y } } })) {
                moving = false;
                window.soundEngine?.playBump();
                break;
            }
        }

        if (moving) {
            moveAbles.forEach(m => { m.position.x += speed; });
            currentOffset.x += speed;
        }
    } else if (keys.s.pressed && lastKey === 's') {
        player.moving = true;
        player.image = player.sprites.down;

        for (let i = 0; i < boundaries.length; i++) {
            const b = boundaries[i];
            if (rectangularCollision({ rectangle1: playerHitbox, rectangle2: { ...b, position: { x: b.position.x, y: b.position.y - speed } } })) {
                moving = false;
                window.soundEngine?.playBump();
                break;
            }
        }

        if (moving) {
            moveAbles.forEach(m => { m.position.y -= speed; });
            currentOffset.y -= speed;
        }
    } else if (keys.d.pressed && lastKey === 'd') {
        player.moving = true;
        player.image = player.sprites.right;

        for (let i = 0; i < boundaries.length; i++) {
            const b = boundaries[i];
            if (rectangularCollision({ rectangle1: playerHitbox, rectangle2: { ...b, position: { x: b.position.x - speed, y: b.position.y } } })) {
                moving = false;
                window.soundEngine?.playBump();
                break;
            }
        }

        if (moving) {
            moveAbles.forEach(m => { m.position.x -= speed; });
            currentOffset.x -= speed;
        }
    }

    // Kiểm tra bước chân vào cỏ
    if (player.moving) {
        checkWildBattleEncounter(playerHitbox);
    }
}

// ========================================================
// HỘP THOẠI NPC THẾ GIỚI J2ME (NPC DIALOGUE SYSTEM)
// ========================================================
function drawDialogueBox(ctx) {
    if (!activeDialogue) return;

    ctx.save();
    const boxX = 80;
    const boxY = canvas.height - 150;
    const boxW = canvas.width - 160;
    const boxH = 130;

    // 1. Bóng đổ hộp thoại
    ctx.shadowColor = 'rgba(0, 0, 0, 0.65)';
    ctx.shadowBlur = 18;
    ctx.shadowOffsetY = 6;

    // 2. Nền hộp thoại gradient sang trọng
    const grad = ctx.createLinearGradient(boxX, boxY, boxX, boxY + boxH);
    grad.addColorStop(0, 'rgba(15, 23, 42, 0.96)');
    grad.addColorStop(1, 'rgba(30, 41, 59, 0.98)');
    ctx.fillStyle = grad;

    if (ctx.roundRect) ctx.roundRect(boxX, boxY, boxW, boxH, 12);
    else ctx.fillRect(boxX, boxY, boxW, boxH);
    ctx.fill();

    // 3. Viền phát sáng kim loại vàng hoàng gia
    ctx.shadowBlur = 0;
    ctx.lineWidth = 2.5;
    ctx.strokeStyle = '#f59e0b';
    if (ctx.roundRect) ctx.roundRect(boxX, boxY, boxW, boxH, 12);
    else ctx.strokeRect(boxX, boxY, boxW, boxH);
    ctx.stroke();

    // 4. Badge Tên NPC ở góc trên
    const nameText = activeDialogue.name || 'Người Dân Cầu Vồng';
    ctx.font = 'bold 14px "Segoe UI", sans-serif';
    const nameMetrics = ctx.measureText(nameText);
    const badgeW = Math.max(120, nameMetrics.width + 36);
    const badgeH = 28;
    const badgeX = boxX + 24;
    const badgeY = boxY - 14;

    ctx.fillStyle = '#b45309';
    if (ctx.roundRect) ctx.roundRect(badgeX, badgeY, badgeW, badgeH, 6);
    else ctx.fillRect(badgeX, badgeY, badgeW, badgeH);
    ctx.fill();

    ctx.strokeStyle = '#fef08a';
    ctx.lineWidth = 1.5;
    if (ctx.roundRect) ctx.roundRect(badgeX, badgeY, badgeW, badgeH, 6);
    else ctx.strokeRect(badgeX, badgeY, badgeW, badgeH);
    ctx.stroke();

    ctx.fillStyle = '#ffffff';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText(nameText, badgeX + badgeW / 2, badgeY + badgeH / 2);

    // 5. Khung chân dung NPC (Avatar / Sprite)
    const avatarSize = 80;
    const avatarX = boxX + 24;
    const avatarY = boxY + 28;

    ctx.fillStyle = 'rgba(0, 0, 0, 0.4)';
    if (ctx.roundRect) ctx.roundRect(avatarX, avatarY, avatarSize, avatarSize, 8);
    else ctx.fillRect(avatarX, avatarY, avatarSize, avatarSize);
    ctx.fill();
    ctx.strokeStyle = '#64748b';
    ctx.lineWidth = 1.5;
    if (ctx.roundRect) ctx.roundRect(avatarX, avatarY, avatarSize, avatarSize, 8);
    else ctx.strokeRect(avatarX, avatarY, avatarSize, avatarSize);
    ctx.stroke();

    if (activeDialogue.sprite) {
        activeDialogue.sprite.draw(ctx, avatarX + avatarSize / 2, avatarY + avatarSize - 8);
    } else {
        ctx.fillStyle = '#38bdf8';
        ctx.font = 'bold 32px sans-serif';
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.fillText('👤', avatarX + avatarSize / 2, avatarY + avatarSize / 2);
    }

    // 6. Nội dung hội thoại (tự động ngắt dòng thông minh)
    ctx.textAlign = 'left';
    ctx.textBaseline = 'top';
    ctx.font = '15px "Segoe UI", sans-serif';
    ctx.fillStyle = '#f8fafc';

    const textX = avatarX + avatarSize + 24;
    const textY = boxY + 32;
    const maxTextW = boxW - (avatarSize + 70);
    const lineHeight = 24;

    const words = (activeDialogue.text || '').split(' ');
    let currentLine = '';
    let lineCount = 0;

    for (let i = 0; i < words.length; i++) {
        const testLine = currentLine ? (currentLine + ' ' + words[i]) : words[i];
        const metrics = ctx.measureText(testLine);
        if (metrics.width > maxTextW && currentLine) {
            ctx.fillText(currentLine, textX, textY + lineCount * lineHeight);
            currentLine = words[i];
            lineCount++;
            if (lineCount >= 3) break;
        } else {
            currentLine = testLine;
        }
    }
    if (currentLine && lineCount < 3) {
        ctx.fillText(currentLine, textX, textY + lineCount * lineHeight);
    }

    // 7. Nhấp nháy phím hướng dẫn tiếp tục / đóng
    const blink = Math.floor(Date.now() / 400) % 2 === 0;
    if (blink) {
        ctx.textAlign = 'right';
        ctx.textBaseline = 'bottom';
        ctx.font = 'italic 12px "Segoe UI", sans-serif';
        ctx.fillStyle = '#fbbf24';
        ctx.fillText('▼ Nhấn [E] / [Cách] hoặc Nhấp chuột để tiếp tục', boxX + boxW - 20, boxY + boxH - 12);
    }

    ctx.restore();
}

function drawGameHUD() {
    ctx.save();
    ctx.fillStyle = 'rgba(15, 23, 42, 0.75)';
    if (ctx.roundRect) ctx.roundRect(14, 14, 300, 54, 8);
    else ctx.fillRect(14, 14, 300, 54);
    ctx.fill();

    const mapName = window.MAPS_CONFIG[gameState.currentMapId]?.name || 'Thị trấn';
    ctx.fillStyle = '#f1c40f';
    ctx.font = 'bold 13px "Segoe UI", sans-serif';
    ctx.fillText(`📍 ${mapName}`, 24, 34);

    ctx.fillStyle = '#ecf0f1';
    ctx.font = '12px "Segoe UI", sans-serif';
    ctx.fillText(`🐾 Sủng vật: ${gameState.playerTeam.length}/6 | 🔴 Bóng: ${gameState.inventory.pokeballs}`, 24, 54);
    ctx.restore();
}

// ========================================================
// KẾT NỐI MENU & API LƯU/TẢI GAME (SEQUELIZE)
// ========================================================
window.menuManager.onStartGame = () => {
    if (!backgroundSprite) {
        loadMap('pelletTown');
    }
};

window.menuManager.onSaveGame = async (slot) => {
    const payload = {
        saveName: `Lưu tại ${window.MAPS_CONFIG[gameState.currentMapId]?.name || 'Thị trấn'}`,
        mapId: gameState.currentMapId,
        playerX: player.position.x,
        playerY: player.position.y,
        offsetX: currentOffset.x,
        offsetY: currentOffset.y,
        teamData: gameState.playerTeam,
        inventoryData: gameState.inventory,
        playtime: gameState.playtime
    };

    const res = await window.GameAPI.saveGame(slot, payload);
    return res && res.success;
};

window.menuManager.onLoadGame = async (slot) => {
    const data = await window.GameAPI.loadGame(slot);
    if (data) {
        gameState.playerTeam = data.teamData || gameState.playerTeam;
        gameState.inventory = data.inventoryData || gameState.inventory;
        gameState.playtime = data.playtime || 0;

        loadMap(
            data.mapId || 'pelletTown',
            { x: data.playerX || 488, y: data.playerY || 254 },
            { x: data.offsetX || -735, y: data.offsetY || -650 }
        );
        alert(`📂 Tải bản lưu Slot ${slot} thành công!`);
        return true;
    }
    alert(`Không tìm thấy dữ liệu ở Slot ${slot}!`);
    return false;
};

// ========================================================
// LẮNG NGHE PHÍM BẤM
// ========================================================
window.addEventListener('keydown', (e) => {
    window.soundEngine?.getContext();

    // Nếu đang trong trận đấu
    if (window.battleSystem && window.battleSystem.active) {
        window.battleSystem.handleInput(e.key);
        return;
    }

    // Phím ESC mở/đóng Menu
    if (e.key === 'Escape') {
        if (window.menuManager.isInMainMenu) {
            window.menuManager.hideMainMenu();
        } else {
            window.menuManager.showMainMenu();
        }
        return;
    }

    // Tương tác với NPC (Phím E, Phím cách Space, Enter)
    if (e.key === 'e' || e.key === 'E' || e.key === ' ' || e.key === 'Enter') {
        if (activeDialogue) {
            activeDialogue = null;
            window.soundEngine?.playSelect?.();
            return;
        } else if (currentNearestNpc) {
            activeDialogue = {
                name: currentNearestNpc.name,
                text: currentNearestNpc.dialogue,
                sprite: currentNearestNpc.sprite
            };
            window.soundEngine?.playSelect?.();
            return;
        }
    }

    switch (e.key) {
        case 'w':
        case 'W':
        case 'ArrowUp':
            keys.w.pressed = true;
            lastKey = 'w';
            break;
        case 'a':
        case 'A':
        case 'ArrowLeft':
            keys.a.pressed = true;
            lastKey = 'a';
            break;
        case 's':
        case 'S':
        case 'ArrowDown':
            keys.s.pressed = true;
            lastKey = 's';
            break;
        case 'd':
        case 'D':
        case 'ArrowRight':
            keys.d.pressed = true;
            lastKey = 'd';
            break;
        case 'Shift':
            keys.shift.pressed = true;
            break;
        case 'b':
        case 'B':
            gameState.isDebug = !gameState.isDebug;
            break;
        case 'm':
        case 'M':
            window.soundEngine?.toggleMute();
            break;
        case 'r':
        case 'R':
            loadMap('pelletTown', { x: 488, y: 254 }, { x: -735, y: -650 });
            break;
    }
});

window.addEventListener('keyup', (e) => {
    switch (e.key) {
        case 'w':
        case 'W':
        case 'ArrowUp':
            keys.w.pressed = false;
            if (keys.s.pressed) lastKey = 's';
            else if (keys.a.pressed) lastKey = 'a';
            else if (keys.d.pressed) lastKey = 'd';
            break;
        case 'a':
        case 'A':
        case 'ArrowLeft':
            keys.a.pressed = false;
            if (keys.d.pressed) lastKey = 'd';
            else if (keys.w.pressed) lastKey = 'w';
            else if (keys.s.pressed) lastKey = 's';
            break;
        case 's':
        case 'S':
        case 'ArrowDown':
            keys.s.pressed = false;
            if (keys.w.pressed) lastKey = 'w';
            else if (keys.a.pressed) lastKey = 'a';
            else if (keys.d.pressed) lastKey = 'd';
            break;
        case 'd':
        case 'D':
        case 'ArrowRight':
            keys.d.pressed = false;
            if (keys.a.pressed) lastKey = 'a';
            else if (keys.w.pressed) lastKey = 'w';
            else if (keys.s.pressed) lastKey = 's';
            break;
        case 'Shift':
            keys.shift.pressed = false;
            break;
    }
});

// Click chuột trên Canvas (Tương tác hoặc điều khiển trận đấu)
canvas.addEventListener('click', (e) => {
    window.soundEngine?.getContext();
    if (window.battleSystem && window.battleSystem.active) {
        const rect = canvas.getBoundingClientRect();
        const scaleX = canvas.width / rect.width;
        const scaleY = canvas.height / rect.height;
        const clickX = (e.clientX - rect.left) * scaleX;
        const clickY = (e.clientY - rect.top) * scaleY;
        window.battleSystem.handleClick(clickX, clickY, canvas.width, canvas.height);
        return;
    }

    if (activeDialogue) {
        activeDialogue = null;
        window.soundEngine?.playSelect?.();
        return;
    }

    if (currentNearestNpc) {
        activeDialogue = {
            name: currentNearestNpc.name,
            text: currentNearestNpc.dialogue,
            sprite: currentNearestNpc.sprite
        };
        window.soundEngine?.playSelect?.();
        return;
    }
});

// Xuất engine ra window
window.loadMap = loadMap;
window.gameState = gameState;
window.gameEngine = {
    toggleDebug: () => {
        gameState.isDebug = !gameState.isDebug;
        return gameState.isDebug;
    },
    changeMap: loadMap,
    triggerVirtualKey: (dir, isPressed) => {
        window.soundEngine?.getContext();
        if (dir === 'up') { keys.w.pressed = isPressed; if (isPressed) lastKey = 'w'; }
        else if (dir === 'down') { keys.s.pressed = isPressed; if (isPressed) lastKey = 's'; }
        else if (dir === 'left') { keys.a.pressed = isPressed; if (isPressed) lastKey = 'a'; }
        else if (dir === 'right') { keys.d.pressed = isPressed; if (isPressed) lastKey = 'd'; }
    }
};

// Khởi tạo map đầu tiên
loadMap('pelletTown');

// Bắt đầu vòng lặp game
animate();
