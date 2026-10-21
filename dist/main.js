// ========================================================
// Game Animon - Pokemon HTML5 Canvas Engine
// ========================================================

const canvas = document.querySelector('canvas');
const c = canvas.getContext('2d');

canvas.width = 1024;
canvas.height = 576;
c.imageSmoothingEnabled = false;

// 1. Dữ liệu va chạm & Vùng trận đấu
const rawCollisions = typeof collisions !== 'undefined' ? collisions : (window.collisions || []);
const rawBattleZones = typeof battleZones !== 'undefined' ? battleZones : (window.battleZones || []);

const MAP_WIDTH = 70;
const collisionsMap = [];
for (let i = 0; i < rawCollisions.length; i += MAP_WIDTH) {
    collisionsMap.push(rawCollisions.slice(i, i + MAP_WIDTH));
}

const battleZonesMap = [];
for (let i = 0; i < rawBattleZones.length; i += MAP_WIDTH) {
    battleZonesMap.push(rawBattleZones.slice(i, i + MAP_WIDTH));
}

const INITIAL_OFFSET = {
    x: -735,
    y: -650
};

let offset = { ...INITIAL_OFFSET };

const boundaries = [];
collisionsMap.forEach((row, i) => {
    row.forEach((symbol, j) => {
        if (symbol === 1025) {
            boundaries.push(
                new Boundary({
                    position: {
                        x: j * Boundary.width + offset.x,
                        y: i * Boundary.height + offset.y
                    }
                })
            );
        }
    });
});

const battleZonesList = [];
battleZonesMap.forEach((row, i) => {
    row.forEach((symbol, j) => {
        if (symbol === 1025) {
            battleZonesList.push(
                new BattleZone({
                    position: {
                        x: j * BattleZone.width + offset.x,
                        y: i * BattleZone.height + offset.y
                    }
                })
            );
        }
    });
});

// 2. Tải hình ảnh
const backgroundImage = new Image();
backgroundImage.src = './img/Pellet Town.png';

const foregroundImage = new Image();
foregroundImage.src = './img/foregroundObjects.png';

const playerDownImage = new Image();
playerDownImage.src = './img/playerDown.png';

const playerUpImage = new Image();
playerUpImage.src = './img/playerUp.png';

const playerLeftImage = new Image();
playerLeftImage.src = './img/playerLeft.png';

const playerRightImage = new Image();
playerRightImage.src = './img/playerRight.png';

// 3. Khởi tạo Sprite
const playerWidth = 48;
const playerHeight = 68;

const player = new Sprite({
    position: {
        x: canvas.width / 2 - playerWidth / 2,
        y: canvas.height / 2 - playerHeight / 2
    },
    image: playerDownImage,
    frames: {
        max: 4,
        hold: 10
    },
    sprites: {
        up: playerUpImage,
        left: playerLeftImage,
        right: playerRightImage,
        down: playerDownImage
    }
});

const background = new Sprite({
    position: {
        x: offset.x,
        y: offset.y
    },
    image: backgroundImage
});

const foreground = new Sprite({
    position: {
        x: offset.x,
        y: offset.y
    },
    image: foregroundImage
});

const moveAbles = [background, ...boundaries, ...battleZonesList, foreground];

// 4. Trạng thái phím & Game State
const keys = {
    w: { pressed: false },
    a: { pressed: false },
    s: { pressed: false },
    d: { pressed: false },
    shift: { pressed: false }
};

let lastKey = '';
let isDebug = false;
let isMuted = false;

// Trạng thái trận đấu
const battleState = {
    initiated: false,
    flashing: false,
    flashCount: 0,
    flashMax: 6,
    flashTimer: 0,
    activeDialog: false,
    wildMonster: null,
    message: ''
};

const WILD_MONSTERS = [
    { name: 'Pikachu', level: 5, hp: 35, type: 'Điện' },
    { name: 'Pidgey', level: 3, hp: 28, type: 'Bay' },
    { name: 'Rattata', level: 4, hp: 30, type: 'Thường' },
    { name: 'Bulbasaur', level: 5, hp: 45, type: 'Cỏ/Độc' },
    { name: 'Charmander', level: 5, hp: 39, type: 'Lửa' },
    { name: 'Squirtle', level: 5, hp: 44, type: 'Nước' }
];

// 5. Hệ thống âm thanh Retro 8-bit (Web Audio API)
let audioCtx = null;
function getAudioContext() {
    if (!audioCtx) {
        const AudioContextClass = window.AudioContext || window.webkitAudioContext;
        if (AudioContextClass) {
            audioCtx = new AudioContextClass();
        }
    }
    if (audioCtx && audioCtx.state === 'suspended') {
        audioCtx.resume();
    }
    return audioCtx;
}

function playBeep(freq, type = 'square', duration = 0.08, volume = 0.15) {
    if (isMuted) return;
    try {
        const ctx = getAudioContext();
        if (!ctx) return;
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = type;
        osc.frequency.setValueAtTime(freq, ctx.currentTime);
        gain.gain.setValueAtTime(volume, ctx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + duration);
        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start();
        osc.stop(ctx.currentTime + duration);
    } catch (_) {}
}

function playBumpSound() {
    playBeep(90, 'sine', 0.12, 0.2);
}

function playGrassStepSound() {
    playBeep(180, 'triangle', 0.06, 0.08);
}

function playBattleFanfare() {
    if (isMuted) return;
    const notes = [261.63, 329.63, 392.00, 523.25, 659.25, 783.99];
    notes.forEach((freq, idx) => {
        setTimeout(() => {
            playBeep(freq, 'square', 0.12, 0.18);
        }, idx * 70);
    });
}

function playFleeSound() {
    if (isMuted) return;
    const notes = [600, 500, 400, 300];
    notes.forEach((freq, idx) => {
        setTimeout(() => {
            playBeep(freq, 'sawtooth', 0.08, 0.12);
        }, idx * 60);
    });
}

// 6. Kiểm tra va chạm
function rectangularCollision({ rectangle1, rectangle2 }) {
    return (
        rectangle1.position.x + rectangle1.width > rectangle2.position.x &&
        rectangle1.position.x < rectangle2.position.x + rectangle2.width &&
        rectangle1.position.y + rectangle1.height > rectangle2.position.y &&
        rectangle1.position.y < rectangle2.position.y + rectangle2.height
    );
}

// Hitbox chuẩn ở phần chân của nhân vật để di chuyển tự nhiên
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

// 7. Khởi động trận đấu
function triggerWildBattle() {
    battleState.initiated = true;
    battleState.flashing = true;
    battleState.flashCount = 0;
    battleState.flashTimer = 0;
    battleState.activeDialog = false;
    player.moving = false;

    playBattleFanfare();

    const randomMonster = WILD_MONSTERS[Math.floor(Math.random() * WILD_MONSTERS.length)];
    battleState.wildMonster = { ...randomMonster };
    battleState.message = `Một chú ${randomMonster.name} hoang dã (Lv. ${randomMonster.level}) xuất hiện!`;
}

function fleeBattle() {
    playFleeSound();
    battleState.initiated = false;
    battleState.flashing = false;
    battleState.activeDialog = false;
    battleState.wildMonster = null;
    battleState.message = '';
}

function battleFight() {
    playBeep(440, 'square', 0.15, 0.2);
    battleState.message = `Bạn đã chiến thắng ${battleState.wildMonster.name}! Nhận được 45 EXP.`;
    setTimeout(() => {
        fleeBattle();
    }, 1200);
}

// 8. Đặt lại vị trí ban đầu
function resetPlayerPosition() {
    const deltaX = INITIAL_OFFSET.x - background.position.x;
    const deltaY = INITIAL_OFFSET.y - background.position.y;

    moveAbles.forEach(movable => {
        movable.position.x += deltaX;
        movable.position.y += deltaY;
    });

    player.image = player.sprites.down;
    player.moving = false;
    player.frames.val = 0;
}

// 9. Vòng lặp chính Game Loop
let lastTime = 0;
let grassStepTimer = 0;

function animate(currentTime = 0) {
    window.requestAnimationFrame(animate);

    // Xóa khung hình
    c.clearRect(0, 0, canvas.width, canvas.height);

    // Vẽ nền thế giới
    background.draw(c);

    // Vẽ ranh giới & bụi cỏ khi bật debug
    if (isDebug) {
        boundaries.forEach(b => b.draw(c, true));
        battleZonesList.forEach(bz => bz.draw(c, true));
    }

    // Vẽ người chơi
    player.draw(c);

    // Vẽ các vật thể phía trước (mái nhà, ngọn cây che trên đầu người chơi)
    foreground.draw(c);

    // Xử lý hiệu ứng Battle Flash & Hộp thoại trận đấu
    if (battleState.initiated) {
        if (battleState.flashing) {
            battleState.flashTimer++;
            if (battleState.flashTimer % 6 === 0) {
                battleState.flashCount++;
            }
            if (battleState.flashCount % 2 === 1) {
                c.fillStyle = '#000000';
                c.fillRect(0, 0, canvas.width, canvas.height);
            }
            if (battleState.flashCount >= battleState.flashMax) {
                battleState.flashing = false;
                battleState.activeDialog = true;
            }
            return;
        }

        if (battleState.activeDialog) {
            drawBattleOverlay();
            return;
        }
    }

    // Xử lý di chuyển
    let moving = true;
    player.moving = false;

    const baseSpeed = 3;
    const speed = keys.shift.pressed ? 5 : baseSpeed;
    player.frames.hold = keys.shift.pressed ? 6 : 10;

    const playerHitbox = getPlayerHitbox();

    if (keys.w.pressed && lastKey === 'w') {
        player.moving = true;
        player.image = player.sprites.up;

        for (let i = 0; i < boundaries.length; i++) {
            const boundary = boundaries[i];
            if (
                rectangularCollision({
                    rectangle1: playerHitbox,
                    rectangle2: {
                        ...boundary,
                        position: {
                            x: boundary.position.x,
                            y: boundary.position.y + speed
                        }
                    }
                })
            ) {
                moving = false;
                playBumpSound();
                break;
            }
        }

        if (moving) {
            moveAbles.forEach(movable => {
                movable.position.y += speed;
            });
        }
    } else if (keys.a.pressed && lastKey === 'a') {
        player.moving = true;
        player.image = player.sprites.left;

        for (let i = 0; i < boundaries.length; i++) {
            const boundary = boundaries[i];
            if (
                rectangularCollision({
                    rectangle1: playerHitbox,
                    rectangle2: {
                        ...boundary,
                        position: {
                            x: boundary.position.x + speed,
                            y: boundary.position.y
                        }
                    }
                })
            ) {
                moving = false;
                playBumpSound();
                break;
            }
        }

        if (moving) {
            moveAbles.forEach(movable => {
                movable.position.x += speed;
            });
        }
    } else if (keys.s.pressed && lastKey === 's') {
        player.moving = true;
        player.image = player.sprites.down;

        for (let i = 0; i < boundaries.length; i++) {
            const boundary = boundaries[i];
            if (
                rectangularCollision({
                    rectangle1: playerHitbox,
                    rectangle2: {
                        ...boundary,
                        position: {
                            x: boundary.position.x,
                            y: boundary.position.y - speed
                        }
                    }
                })
            ) {
                moving = false;
                playBumpSound();
                break;
            }
        }

        if (moving) {
            moveAbles.forEach(movable => {
                movable.position.y -= speed;
            });
        }
    } else if (keys.d.pressed && lastKey === 'd') {
        player.moving = true;
        player.image = player.sprites.right;

        for (let i = 0; i < boundaries.length; i++) {
            const boundary = boundaries[i];
            if (
                rectangularCollision({
                    rectangle1: playerHitbox,
                    rectangle2: {
                        ...boundary,
                        position: {
                            x: boundary.position.x - speed,
                            y: boundary.position.y
                        }
                    }
                })
            ) {
                moving = false;
                playBumpSound();
                break;
            }
        }

        if (moving) {
            moveAbles.forEach(movable => {
                movable.position.x -= speed;
            });
        }
    }

    // Kiểm tra bước chân trong bụi cỏ (Battle Zone)
    if (player.moving) {
        grassStepTimer++;
        for (let i = 0; i < battleZonesList.length; i++) {
            const bz = battleZonesList[i];
            const overlapX = Math.max(
                0,
                Math.min(playerHitbox.position.x + playerHitbox.width, bz.position.x + bz.width) -
                Math.max(playerHitbox.position.x, bz.position.x)
            );
            const overlapY = Math.max(
                0,
                Math.min(playerHitbox.position.y + playerHitbox.height, bz.position.y + bz.height) -
                Math.max(playerHitbox.position.y, bz.position.y)
            );
            const overlapArea = overlapX * overlapY;

            if (overlapArea > (playerHitbox.width * playerHitbox.height) / 2) {
                if (grassStepTimer % 18 === 0) {
                    playGrassStepSound();
                }
                // Tỉ lệ kích hoạt trận đấu hoang dã
                if (Math.random() < 0.012) {
                    triggerWildBattle();
                    break;
                }
            }
        }
    }

    // Cập nhật HUD nhỏ trên canvas
    drawHUD();
}

// Vẽ thông tin HUD ở góc
function drawHUD() {
    c.save();
    c.fillStyle = 'rgba(0, 0, 0, 0.55)';
    c.roundRect ? c.roundRect(12, 12, 230, 48, 8) : c.fillRect(12, 12, 230, 48);
    c.fill();

    c.fillStyle = '#ffffff';
    c.font = '13px "Segoe UI", sans-serif';
    c.fillText(`Vị trí: X: ${Math.round(-background.position.x)} | Y: ${Math.round(-background.position.y)}`, 22, 32);

    c.fillStyle = isDebug ? '#2ecc71' : '#bdc3c7';
    c.fillText(`Debug: ${isDebug ? 'BẬT (Phím B)' : 'TẮT (Phím B)'}`, 22, 50);
    c.restore();
}

// Vẽ giao diện Trận đấu giả lập trên Canvas
function drawBattleOverlay() {
    c.save();
    // Nền tối mờ
    c.fillStyle = 'rgba(10, 15, 25, 0.88)';
    c.fillRect(0, 0, canvas.width, canvas.height);

    // Khung chiến đấu
    const boxX = 64;
    const boxY = 64;
    const boxW = canvas.width - 128;
    const boxH = canvas.height - 128;

    c.fillStyle = '#f8f9fa';
    c.strokeStyle = '#2c3e50';
    c.lineWidth = 6;
    if (c.roundRect) {
        c.roundRect(boxX, boxY, boxW, boxH, 16);
    } else {
        c.fillRect(boxX, boxY, boxW, boxH);
    }
    c.fill();
    c.stroke();

    // Tiêu đề
    c.fillStyle = '#e74c3c';
    c.font = 'bold 28px "Segoe UI", sans-serif';
    c.fillText('⚔️ CHẠM TRÁN POKÉMON HOANG DÃ!', boxX + 32, boxY + 54);

    // Thông tin quái vật
    if (battleState.wildMonster) {
        const mon = battleState.wildMonster;
        c.fillStyle = '#2c3e50';
        c.font = 'bold 24px "Segoe UI", sans-serif';
        c.fillText(`${mon.name}`, boxX + 48, boxY + 120);

        c.font = '16px "Segoe UI", sans-serif';
        c.fillStyle = '#7f8c8d';
        c.fillText(`Cấp độ: ${mon.level} | Hệ: ${mon.type} | HP: ${mon.hp}/${mon.hp}`, boxX + 48, boxY + 150);

        // Thanh máu
        c.fillStyle = '#e0e0e0';
        c.fillRect(boxX + 48, boxY + 165, 300, 16);
        c.fillStyle = '#2ecc71';
        c.fillRect(boxX + 48, boxY + 165, 300, 16);
        c.strokeStyle = '#27ae60';
        c.lineWidth = 1;
        c.strokeRect(boxX + 48, boxY + 165, 300, 16);
    }

    // Thông điệp hiện tại
    c.fillStyle = '#2c3e50';
    c.font = 'italic 18px "Segoe UI", sans-serif';
    c.fillText(battleState.message, boxX + 48, boxY + 230);

    // Các lựa chọn hành động
    const btnY = boxY + 280;
    drawButton(boxX + 48, btnY, 160, 48, '⚔️ Chiến Đấu (1)', '#e74c3c');
    drawButton(boxX + 224, btnY, 160, 48, '🎒 Túi Đồ (2)', '#f39c12');
    drawButton(boxX + 400, btnY, 160, 48, '🏃 Chạy Trốn (3)', '#3498db');

    c.fillStyle = '#7f8c8d';
    c.font = '14px "Segoe UI", sans-serif';
    c.fillText('Nhấn phím 1 (Chiến đấu), 3 hoặc Phím Cách/Escape để tiếp tục khám phá.', boxX + 48, boxY + 365);

    c.restore();
}

function drawButton(x, y, w, h, text, bgColor) {
    c.save();
    c.fillStyle = bgColor;
    if (c.roundRect) {
        c.roundRect(x, y, w, h, 8);
    } else {
        c.fillRect(x, y, w, h);
    }
    c.fill();

    c.fillStyle = '#ffffff';
    c.font = 'bold 15px "Segoe UI", sans-serif';
    c.textAlign = 'center';
    c.textBaseline = 'middle';
    c.fillText(text, x + w / 2, y + h / 2);
    c.restore();
}

// 10. Lắng nghe sự kiện bàn phím
window.addEventListener('keydown', (e) => {
    getAudioContext();

    if (battleState.activeDialog) {
        if (e.key === '1') {
            battleFight();
        } else if (e.key === '2') {
            battleState.message = 'Bạn chưa có vật phẩm nào trong túi!';
        } else if (e.key === '3' || e.key === 'Escape' || e.key === ' ') {
            fleeBattle();
        }
        return;
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
            isDebug = !isDebug;
            break;
        case 'r':
        case 'R':
            resetPlayerPosition();
            break;
        case 'm':
        case 'M':
            isMuted = !isMuted;
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

// Xử lý click chuột trong trận đấu
canvas.addEventListener('click', (e) => {
    getAudioContext();
    if (!battleState.activeDialog) return;

    const rect = canvas.getBoundingClientRect();
    const scaleX = canvas.width / rect.width;
    const scaleY = canvas.height / rect.height;
    const clickX = (e.clientX - rect.left) * scaleX;
    const clickY = (e.clientY - rect.top) * scaleY;

    const boxX = 64;
    const boxY = 64;
    const btnY = boxY + 280;

    // Nút 1: Chiến đấu
    if (clickX >= boxX + 48 && clickX <= boxX + 208 && clickY >= btnY && clickY <= btnY + 48) {
        battleFight();
    }
    // Nút 2: Túi đồ
    else if (clickX >= boxX + 224 && clickX <= boxX + 384 && clickY >= btnY && clickY <= btnY + 48) {
        battleState.message = 'Bạn chưa có vật phẩm nào trong túi!';
    }
    // Nút 3: Chạy trốn
    else if (clickX >= boxX + 400 && clickX <= boxX + 560 && clickY >= btnY && clickY <= btnY + 48) {
        fleeBattle();
    }
});

// API xuất ra window để UI ngoài HTML gọi được
window.gameEngine = {
    toggleDebug: () => {
        isDebug = !isDebug;
        return isDebug;
    },
    toggleMute: () => {
        isMuted = !isMuted;
        return isMuted;
    },
    resetPosition: resetPlayerPosition,
    triggerVirtualKey: (direction, isPressed) => {
        getAudioContext();
        if (direction === 'up') {
            keys.w.pressed = isPressed;
            if (isPressed) lastKey = 'w';
        } else if (direction === 'down') {
            keys.s.pressed = isPressed;
            if (isPressed) lastKey = 's';
        } else if (direction === 'left') {
            keys.a.pressed = isPressed;
            if (isPressed) lastKey = 'a';
        } else if (direction === 'right') {
            keys.d.pressed = isPressed;
            if (isPressed) lastKey = 'd';
        }
    }
};

// Bắt đầu vòng lặp game
animate();
