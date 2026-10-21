// ========================================================
// Hệ Thống Chiến Đấu Theo Lượt (Turn-based Combat Engine)
// ========================================================

class BattleSystem {
    constructor() {
        this.active = false;
        this.state = 'intro'; // 'intro', 'player_turn', 'enemy_turn', 'action_select', 'skill_select', 'bag_select', 'dialog', 'ended'
        this.wildMonster = null;
        this.playerMonster = null;
        this.playerTeam = [];
        this.inventory = { pokeballs: 5, potions: 3 };
        this.battleBg = new Image();
        this.battleBg.src = './img/battle/pt01.jpg';
        this.wildSprite = new Image();
        this.playerSprite = new Image();

        this.message = '';
        this.dialogQueue = [];
        this.menuIndex = 0; // 0: Fight, 1: Bag, 2: Run
        this.skillIndex = 0;
        this.subState = 'main_menu'; // 'main_menu', 'skills', 'bag'

        this.onBattleEnd = null;
    }

    startBattle({ wildMonster, playerTeam, inventory, onEnd }) {
        this.active = true;
        this.state = 'intro';
        this.subState = 'main_menu';
        this.wildMonster = { ...wildMonster, hp: wildMonster.hp, maxHp: wildMonster.maxHp };
        this.playerTeam = playerTeam;
        this.inventory = inventory || { pokeballs: 5, potions: 3 };
        this.onBattleEnd = onEnd;

        // Chọn quái đầu tiên còn máu của người chơi
        this.playerMonster = this.playerTeam.find(m => m.hp > 0) || this.playerTeam[0];

        // Khởi tạo hoạt họa ghép khung J2ME Animated Sprite
        const wildKey = this.wildMonster.spriteKey || (this.wildMonster.sprite ? this.wildMonster.sprite.split('/').pop().replace('.png', '') : 's0');
        const playerKey = this.playerMonster.spriteKey || (this.playerMonster.sprite ? this.playerMonster.sprite.split('/').pop().replace('.png', '') : 's0');

        if (window.J2MESprite) {
            this.wildJ2MESprite = new window.J2MESprite({ spriteKey: wildKey, scale: 2.8, flipX: false });
            this.playerJ2MESprite = new window.J2MESprite({ spriteKey: playerKey, scale: 2.8, flipX: true });
        } else {
            this.wildJ2MESprite = null;
            this.playerJ2MESprite = null;
        }

        // Tải ảnh sprite dự phòng
        if (this.wildMonster && this.wildMonster.sprite) {
            this.wildSprite = new Image();
            this.wildSprite.src = this.wildMonster.sprite;
        }

        if (this.playerMonster && this.playerMonster.sprite) {
            this.playerSprite = new Image();
            this.playerSprite.src = this.playerMonster.sprite;
        }

        // Chọn ngẫu nhiên nền trận đấu J2ME Cầu Vồng (battle_bg_0 .. 4)
        const bgId = Math.floor(Math.random() * 5);
        this.battleBg = new Image();
        this.battleBg.src = `./img/battle/battle_bg_${bgId}.png`;
        this.battleBg.onerror = () => {
            this.battleBg.src = `./client/img/battle/battle_bg_${bgId}.png`;
        };

        // Khởi tạo MP nếu chưa có
        if (this.playerMonster && this.playerMonster.mp === undefined) {
            this.playerMonster.mp = this.playerMonster.maxMp || 50;
            this.playerMonster.maxMp = this.playerMonster.mp;
        }
        if (this.wildMonster && this.wildMonster.mp === undefined) {
            this.wildMonster.mp = this.wildMonster.maxMp || 50;
            this.wildMonster.maxMp = this.wildMonster.mp;
        }

        window.soundEngine?.playBattleStart();

        const pType = this.playerMonster.type || 'Hỏa';
        const wType = this.wildMonster.type || 'Thủy';
        this.message = `Một chú ${this.wildMonster.name} (${wType}) hoang dã xuất hiện!`;
        this.dialogQueue = [
            `Xuất trận nào, ${this.playerMonster.name} (${pType})!`
        ];

        setTimeout(() => {
            this.nextDialog();
        }, 1500);
    }

    nextDialog() {
        if (this.dialogQueue.length > 0) {
            this.message = this.dialogQueue.shift();
        } else {
            this.state = 'player_turn';
            this.subState = 'main_menu';
            this.message = `Bạn sẽ chọn hành động gì?`;
        }
    }

    // Người chơi chọn kỹ năng tấn công
    playerAttack(skill) {
        if (this.state !== 'player_turn') return;

        // Kiểm tra MP
        const mpCost = skill.mpCost || 0;
        if (this.playerMonster.mp !== undefined && this.playerMonster.mp < mpCost) {
            this.message = `Không đủ MP (${this.playerMonster.mp}/${mpCost}) để dùng [${skill.name}]!`;
            return;
        }

        this.state = 'executing';
        if (this.playerMonster.mp !== undefined) {
            this.playerMonster.mp = Math.max(0, this.playerMonster.mp - mpCost);
        }

        window.soundEngine?.playAttack();
        if (this.playerJ2MESprite) this.playerJ2MESprite.triggerAttack();

        // Kỹ năng hồi phục
        if (skill.heal) {
            const healAmount = Math.floor((this.playerMonster.maxHp * skill.heal) / 100);
            this.playerMonster.hp = Math.min(this.playerMonster.maxHp, this.playerMonster.hp + healAmount);
            this.message = `${this.playerMonster.name} thi triển [${skill.name}], hồi phục ${healAmount} HP!`;

            setTimeout(() => {
                this.enemyTurn();
            }, 1200);
            return;
        }

        // Kỹ năng tăng phòng ngự
        if (skill.buffDef) {
            this.playerMonster.defense = Math.floor(this.playerMonster.defense * (1 + skill.buffDef / 100));
            this.message = `${this.playerMonster.name} thi triển [${skill.name}], phòng ngự tăng thêm ${skill.buffDef}%!`;

            setTimeout(() => {
                this.enemyTurn();
            }, 1200);
            return;
        }

        // Tính tương khắc ngũ hành J2ME (Kim, Mộc, Thủy, Hỏa, Thổ)
        const attackerType = this.playerMonster.type || 'Kim';
        const defenderType = this.wildMonster.type || 'Mộc';
        let elementMult = 1.0;
        let effectMsg = '';

        if (window.TYPE_EFFECTIVENESS && window.TYPE_EFFECTIVENESS[attackerType]) {
            const eff = window.TYPE_EFFECTIVENESS[attackerType];
            if (eff.strongAgainst && eff.strongAgainst.includes(defenderType)) {
                elementMult = 1.6;
                effectMsg = ' (Khắc chế ngũ hành! Chí mạng!)';
            } else if (eff.weakAgainst && eff.weakAgainst.includes(defenderType)) {
                elementMult = 0.65;
                effectMsg = ' (Bị ngũ hành kháng cự!)';
            }
        }

        // Tính sát thương chuẩn
        const power = skill.power || 20;
        const damage = Math.max(5, Math.floor(power * (this.playerMonster.attack / Math.max(1, this.wildMonster.defense)) * elementMult * (0.85 + Math.random() * 0.3)));

        setTimeout(() => {
            if (this.wildJ2MESprite) this.wildJ2MESprite.triggerHurt();
            this.wildMonster.hp = Math.max(0, this.wildMonster.hp - damage);
            this.message = `${this.playerMonster.name} dùng [${skill.name}], gây ${damage} sát thương!${effectMsg}`;
        }, 300);

        setTimeout(() => {
            if (this.wildMonster.hp <= 0) {
                this.victory();
            } else {
                this.enemyTurn();
            }
        }, 1300);
    }

    // Lượt quái vật đối thủ phản công
    enemyTurn() {
        this.state = 'enemy_turn';
        const skills = this.wildMonster.skills || [{ name: 'Cắn Xé', power: 15, type: this.wildMonster.type || 'Thường' }];
        const skill = skills[Math.floor(Math.random() * skills.length)];

        setTimeout(() => {
            window.soundEngine?.playAttack();
            if (this.wildJ2MESprite) this.wildJ2MESprite.triggerAttack();

            // Tính tương khắc ngũ hành của địch
            const attackerType = this.wildMonster.type || 'Thủy';
            const defenderType = this.playerMonster.type || 'Hỏa';
            let elementMult = 1.0;
            let effectMsg = '';

            if (window.TYPE_EFFECTIVENESS && window.TYPE_EFFECTIVENESS[attackerType]) {
                const eff = window.TYPE_EFFECTIVENESS[attackerType];
                if (eff.strongAgainst && eff.strongAgainst.includes(defenderType)) {
                    elementMult = 1.5;
                    effectMsg = ' (Khắc chế ngũ hành!)';
                } else if (eff.weakAgainst && eff.weakAgainst.includes(defenderType)) {
                    elementMult = 0.7;
                    effectMsg = ' (Bị kháng cự!)';
                }
            }

            const power = skill.power || 15;
            const damage = Math.max(4, Math.floor(power * (this.wildMonster.attack / Math.max(1, this.playerMonster.defense)) * elementMult * (0.85 + Math.random() * 0.3)));

            setTimeout(() => {
                if (this.playerJ2MESprite) this.playerJ2MESprite.triggerHurt();
                this.playerMonster.hp = Math.max(0, this.playerMonster.hp - damage);
                this.message = `${this.wildMonster.name} đối thủ dùng [${skill.name}], gây ${damage} sát thương!${effectMsg}`;
            }, 300);

            setTimeout(() => {
                if (this.playerMonster.hp <= 0) {
                    this.playerFainted();
                } else {
                    this.state = 'player_turn';
                    this.subState = 'main_menu';
                    this.message = `Lượt của bạn. Hãy chọn hành động!`;
                }
            }, 1300);
        }, 800);
    }

    // Dùng bóng bắt quái
    usePokeball() {
        if (this.inventory.pokeballs <= 0) {
            this.message = 'Bạn đã hết Bóng Bắt Quái (Animon Ball)!';
            return;
        }

        this.inventory.pokeballs--;
        this.state = 'executing';
        this.message = `Bạn ném Bóng Bắt Quái về phía ${this.wildMonster.name}...`;

        setTimeout(() => {
            // Tỉ lệ bắt: Máu càng thấp tỉ lệ càng cao (tối đa 90%, tối thiểu 30%)
            const hpPercent = this.wildMonster.hp / this.wildMonster.maxHp;
            const catchRate = Math.max(0.3, 0.95 - (hpPercent * 0.65));

            if (Math.random() < catchRate) {
                window.soundEngine?.playCatchSuccess();
                this.message = `Tuyệt vời! Bạn đã bắt thành công ${this.wildMonster.name}!`;

                // Thêm vào đội hình người chơi
                if (this.playerTeam.length < 6) {
                    this.playerTeam.push({ ...this.wildMonster });
                }

                setTimeout(() => {
                    this.endBattle(true);
                }, 1600);
            } else {
                window.soundEngine?.playBump();
                this.message = `${this.wildMonster.name} đã thoát khỏi bóng bắt!`;
                setTimeout(() => {
                    this.enemyTurn();
                }, 1200);
            }
        }, 1200);
    }

    // Dùng bình máu
    usePotion() {
        if (this.inventory.potions <= 0) {
            this.message = 'Bạn đã hết Bình Hồi Máu (Potion)!';
            return;
        }

        this.inventory.potions--;
        const heal = 30;
        this.playerMonster.hp = Math.min(this.playerMonster.maxHp, this.playerMonster.hp + heal);
        this.message = `Đã hồi phục ${heal} HP cho ${this.playerMonster.name}!`;

        setTimeout(() => {
            this.enemyTurn();
        }, 1000);
    }

    // Chạy trốn
    flee() {
        this.state = 'executing';
        window.soundEngine?.playFlee();
        this.message = 'Bạn đã chạy trốn an toàn khỏi trận đấu!';

        setTimeout(() => {
            this.endBattle(false);
        }, 1000);
    }

    // Chiến thắng
    victory() {
        window.soundEngine?.playVictory();
        this.message = `${this.wildMonster.name} đã bị đánh bại! Nhận được 50 EXP và 120 Vàng!`;

        setTimeout(() => {
            this.endBattle(true);
        }, 1600);
    }

    // Thất bại
    playerFainted() {
        this.message = `${this.playerMonster.name} đã gục ngã! Bạn phải rút lui về nhà dưỡng thương...`;
        setTimeout(() => {
            // Hồi máu tối thiểu
            this.playerMonster.hp = Math.floor(this.playerMonster.maxHp / 2);
            this.endBattle(false, true);
        }, 1600);
    }

    // Kết thúc trận đấu
    endBattle(won = false, needHeal = false) {
        this.active = false;
        if (this.onBattleEnd) {
            this.onBattleEnd({ won, needHeal });
        }
    }

    // Vẽ giao diện Trận đấu trên Canvas
    draw(ctx, width, height) {
        if (!this.active) return;

        ctx.save();

        // 1. Vẽ nền chiến trường
        if (this.battleBg && this.battleBg.complete && this.battleBg.naturalWidth > 0) {
            ctx.drawImage(this.battleBg, 0, 0, width, height);
        } else {
            ctx.fillStyle = '#1e3799';
            ctx.fillRect(0, 0, width, height);
        }

        // Lớp phủ tối nhẹ để nổi bật quái và UI
        ctx.fillStyle = 'rgba(0, 0, 0, 0.25)';
        ctx.fillRect(0, 0, width, height);

        // 2. Vẽ Quái vật đối thủ (Phía trên bên phải)
        const enemyX = width - 360;
        const enemyY = 80;
        this.drawMonsterCard(ctx, enemyX, enemyY, this.wildMonster, false);

        if (this.wildJ2MESprite) {
            this.wildJ2MESprite.update(16);
            this.wildJ2MESprite.draw(ctx, width - 200, 260);
        } else if (this.wildSprite && this.wildSprite.complete && this.wildSprite.naturalWidth > 0) {
            const sprSize = 140;
            ctx.drawImage(this.wildSprite, width - 260, 160, sprSize, sprSize);
        }

        // 3. Vẽ Quái vật người chơi (Phía dưới bên trái)
        const playerX = 60;
        const playerY = height - 290;
        this.drawMonsterCard(ctx, playerX, playerY, this.playerMonster, true);

        if (this.playerJ2MESprite) {
            this.playerJ2MESprite.update(16);
            this.playerJ2MESprite.draw(ctx, playerX + 220, height - 150);
        } else if (this.playerSprite && this.playerSprite.complete && this.playerSprite.naturalWidth > 0) {
            const sprSize = 140;
            ctx.drawImage(this.playerSprite, playerX + 160, height - 250, sprSize, sprSize);
        }

        // 4. Khung điều khiển & Hộp thoại bên dưới
        const boxX = 30;
        const boxY = height - 120;
        const boxW = width - 60;
        const boxH = 100;

        // Viền retro
        ctx.fillStyle = '#2c3e50';
        ctx.strokeStyle = '#f1c40f';
        ctx.lineWidth = 4;
        if (ctx.roundRect) {
            ctx.roundRect(boxX, boxY, boxW, boxH, 12);
        } else {
            ctx.fillRect(boxX, boxY, boxW, boxH);
        }
        ctx.fill();
        ctx.stroke();

        // Thông điệp chính
        ctx.fillStyle = '#ffffff';
        ctx.font = 'bold 18px "Segoe UI", sans-serif';
        ctx.fillText(this.message, boxX + 24, boxY + 38);

        // Các nút bấm tương tác
        if (this.state === 'player_turn') {
            if (this.subState === 'main_menu') {
                this.drawActionButtons(ctx, boxX, boxY, boxW, boxH);
            } else if (this.subState === 'skills') {
                this.drawSkillButtons(ctx, boxX, boxY, boxW, boxH);
            } else if (this.subState === 'bag') {
                this.drawBagButtons(ctx, boxX, boxY, boxW, boxH);
            }
        }

        ctx.restore();
    }

    // Vẽ thẻ thông tin máu HP của quái
    drawMonsterCard(ctx, x, y, monster, isPlayer) {
        if (!monster) return;
        ctx.save();

        const cardW = 270;
        const cardH = 88;

        ctx.fillStyle = 'rgba(255, 255, 255, 0.94)';
        ctx.strokeStyle = '#34495e';
        ctx.lineWidth = 3;
        if (ctx.roundRect) {
            ctx.roundRect(x, y, cardW, cardH, 8);
        } else {
            ctx.fillRect(x, y, cardW, cardH);
        }
        ctx.fill();
        ctx.stroke();

        // Tên sủng vật
        ctx.fillStyle = '#2c3e50';
        ctx.font = 'bold 15px "Segoe UI", sans-serif';
        ctx.fillText(monster.name, x + 12, y + 24);

        // Huy hiệu Hệ Ngũ Hành (Kim, Mộc, Thủy, Hỏa, Thổ)
        const elem = monster.type || 'Hỏa';
        const elemColors = {
            'Kim': '#f39c12',
            'Mộc': '#27ae60',
            'Thủy': '#2980b9',
            'Hỏa': '#c0392b',
            'Thổ': '#d35400'
        };
        const badgeColor = elemColors[elem] || '#7f8c8d';

        ctx.save();
        ctx.fillStyle = badgeColor;
        if (ctx.roundRect) {
            ctx.roundRect(x + cardW - 110, y + 10, 42, 18, 4);
        } else {
            ctx.fillRect(x + cardW - 110, y + 10, 42, 18);
        }
        ctx.fill();
        ctx.fillStyle = '#ffffff';
        ctx.font = 'bold 11px sans-serif';
        ctx.textAlign = 'center';
        ctx.fillText(elem, x + cardW - 89, y + 23);
        ctx.restore();

        // Cấp độ
        ctx.font = 'bold 13px "Segoe UI", sans-serif';
        ctx.fillStyle = '#d35400';
        ctx.fillText(`Lv.${monster.level || 5}`, x + cardW - 60, y + 24);

        // Thanh HP (Máu)
        const barX = x + 12;
        const barY = y + 36;
        const barW = cardW - 24;
        const barH = 10;

        ctx.fillStyle = '#bdc3c7';
        ctx.fillRect(barX, barY, barW, barH);
        const hpRatio = Math.max(0, monster.hp / (monster.maxHp || 1));
        ctx.fillStyle = hpRatio > 0.5 ? '#2ecc71' : (hpRatio > 0.2 ? '#f39c12' : '#e74c3c');
        ctx.fillRect(barX, barY, barW * hpRatio, barH);
        ctx.strokeStyle = '#7f8c8d';
        ctx.lineWidth = 1;
        ctx.strokeRect(barX, barY, barW, barH);

        // Thanh MP (Năng lượng)
        const mpBarY = y + 54;
        const mpBarH = 6;
        ctx.fillStyle = '#ecf0f1';
        ctx.fillRect(barX, mpBarY, barW, mpBarH);
        const curMp = monster.mp !== undefined ? monster.mp : (monster.maxMp || 50);
        const maxMp = monster.maxMp || 50;
        const mpRatio = Math.max(0, Math.min(1, curMp / maxMp));
        ctx.fillStyle = '#3498db';
        ctx.fillRect(barX, mpBarY, barW * mpRatio, mpBarH);
        ctx.strokeStyle = '#2980b9';
        ctx.strokeRect(barX, mpBarY, barW, mpBarH);

        // Số HP & MP
        ctx.fillStyle = '#34495e';
        ctx.font = '11px sans-serif';
        ctx.fillText(`HP: ${monster.hp}/${monster.maxHp}`, barX, y + 78);
        ctx.fillStyle = '#2980b9';
        ctx.fillText(`MP: ${curMp}/${maxMp}`, barX + 110, y + 78);

        ctx.restore();
    }

    // Nút chức năng chính
    drawActionButtons(ctx, bx, by, bw, bh) {
        const btnW = 120;
        const btnH = 34;
        const startX = bx + bw - (btnW * 4 + 40);
        const btnY = by + bh - 48;

        this.drawBtn(ctx, startX, btnY, btnW, btnH, '⚔️ Tấn Công (1)', '#e74c3c');
        this.drawBtn(ctx, startX + btnW + 10, btnY, btnW, btnH, '🎒 Túi Đồ (2)', '#f39c12');
        this.drawBtn(ctx, startX + (btnW + 10) * 2, btnY, btnW, btnH, '🔴 Bắt Quái (3)', '#9b59b6');
        this.drawBtn(ctx, startX + (btnW + 10) * 3, btnY, btnW, btnH, '🏃 Bỏ Chạy (4)', '#3498db');
    }

    // Nút kỹ năng
    drawSkillButtons(ctx, bx, by, bw, bh) {
        const skills = this.playerMonster.skills || [{ name: 'Đánh Thường', power: 15 }];
        const btnW = 160;
        const btnH = 34;
        const startX = bx + 24;
        const btnY = by + bh - 48;

        skills.slice(0, 3).forEach((sk, idx) => {
            this.drawBtn(ctx, startX + idx * (btnW + 12), btnY, btnW, btnH, `⚡ ${sk.name} (${sk.power} dmg)`, '#e67e22');
        });

        // Nút quay lại
        this.drawBtn(ctx, bx + bw - 110, btnY, 90, btnH, '↩ Quay lại', '#7f8c8d');
    }

    // Nút túi đồ
    drawBagButtons(ctx, bx, by, bw, bh) {
        const btnW = 200;
        const btnH = 34;
        const startX = bx + 24;
        const btnY = by + bh - 48;

        this.drawBtn(ctx, startX, btnY, btnW, btnH, `🔴 Animon Ball (Còn: ${this.inventory.pokeballs})`, '#9b59b6');
        this.drawBtn(ctx, startX + btnW + 16, btnY, btnW, btnH, `🧪 Bình Máu (Còn: ${this.inventory.potions})`, '#2ecc71');
        this.drawBtn(ctx, bx + bw - 110, btnY, 90, btnH, '↩ Quay lại', '#7f8c8d');
    }

    drawBtn(ctx, x, y, w, h, text, color) {
        ctx.save();
        ctx.fillStyle = color;
        if (ctx.roundRect) {
            ctx.roundRect(x, y, w, h, 6);
        } else {
            ctx.fillRect(x, y, w, h);
        }
        ctx.fill();

        ctx.fillStyle = '#ffffff';
        ctx.font = 'bold 13px "Segoe UI", sans-serif';
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.fillText(text, x + w / 2, y + h / 2);
        ctx.restore();
    }

    // Xử lý click phím số hoặc chuột
    handleInput(key) {
        if (!this.active || this.state !== 'player_turn') return;

        if (this.subState === 'main_menu') {
            if (key === '1') {
                this.subState = 'skills';
            } else if (key === '2') {
                this.subState = 'bag';
            } else if (key === '3') {
                this.usePokeball();
            } else if (key === '4' || key === 'Escape') {
                this.flee();
            }
        } else if (this.subState === 'skills') {
            const skills = this.playerMonster.skills || [{ name: 'Đánh Thường', power: 15 }];
            if (key === '1' && skills[0]) this.playerAttack(skills[0]);
            else if (key === '2' && skills[1]) this.playerAttack(skills[1]);
            else if (key === '3' && skills[2]) this.playerAttack(skills[2]);
            else if (key === 'Escape' || key === '4' || key === 'Backspace') this.subState = 'main_menu';
        } else if (this.subState === 'bag') {
            if (key === '1') this.usePokeball();
            else if (key === '2') this.usePotion();
            else if (key === 'Escape' || key === 'Backspace') this.subState = 'main_menu';
        }
    }

    handleClick(x, y, width, height) {
        if (!this.active || this.state !== 'player_turn') return;
        const boxX = 30;
        const boxY = height - 120;
        const boxW = width - 60;
        const boxH = 100;
        const btnY = boxY + boxH - 48;

        if (this.subState === 'main_menu') {
            const btnW = 120;
            const startX = boxX + boxW - (btnW * 4 + 40);

            if (y >= btnY && y <= btnY + 34) {
                if (x >= startX && x <= startX + btnW) this.subState = 'skills';
                else if (x >= startX + btnW + 10 && x <= startX + btnW * 2 + 10) this.subState = 'bag';
                else if (x >= startX + (btnW + 10) * 2 && x <= startX + (btnW + 10) * 2 + btnW) this.usePokeball();
                else if (x >= startX + (btnW + 10) * 3 && x <= startX + (btnW + 10) * 3 + btnW) this.flee();
            }
        } else if (this.subState === 'skills') {
            const skills = this.playerMonster.skills || [{ name: 'Đánh Thường', power: 15 }];
            const btnW = 160;
            const startX = boxX + 24;

            if (y >= btnY && y <= btnY + 34) {
                skills.slice(0, 3).forEach((sk, idx) => {
                    if (x >= startX + idx * (btnW + 12) && x <= startX + idx * (btnW + 12) + btnW) {
                        this.playerAttack(sk);
                    }
                });
                if (x >= boxX + boxW - 110 && x <= boxX + boxW - 20) {
                    this.subState = 'main_menu';
                }
            }
        } else if (this.subState === 'bag') {
            const btnW = 200;
            const startX = boxX + 24;

            if (y >= btnY && y <= btnY + 34) {
                if (x >= startX && x <= startX + btnW) this.usePokeball();
                else if (x >= startX + btnW + 16 && x <= startX + (btnW * 2) + 16) this.usePotion();
                else if (x >= boxX + boxW - 110 && x <= boxX + boxW - 20) this.subState = 'main_menu';
            }
        }
    }
}

window.battleSystem = new BattleSystem();

