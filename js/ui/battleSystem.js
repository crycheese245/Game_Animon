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

        this.vfxParticles = [];
        this.lastEnemyX = 0;
        this.lastEnemyY = 0;
        this.lastPlayerX = 0;
        this.lastPlayerY = 0;

        this.onBattleEnd = null;
    }

    startBattle({ wildMonster, playerTeam, inventory, onEnd }) {
        this.active = true;
        this.state = 'intro';
        this.subState = 'main_menu';
        this.introTimer = 0;
        this.introDuration = 650;
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

        if (this.introTimer) clearTimeout(this.introTimer);
        this.introTimer = setTimeout(() => {
            this.nextDialog();
        }, 1200);
    }

    nextDialog() {
        if (this.introTimer) {
            clearTimeout(this.introTimer);
            this.introTimer = null;
        }

        if (this.dialogQueue && this.dialogQueue.length > 0) {
            this.message = this.dialogQueue.shift();
            this.introTimer = setTimeout(() => {
                this.nextDialog();
            }, 1200);
        } else {
            this.state = 'player_turn';
            this.subState = 'skills';
            this.message = `Lượt của ${this.playerMonster.name}! Hãy chọn kỹ năng tấn công [1-4]:`;
        }
    }

    // Người chơi chọn kỹ năng tấn công
    playerAttack(skill) {
        if (this.state !== 'player_turn') return;

        // Kiểm tra MP
        const mpCost = skill.mpCost || 0;
        const curMp = this.playerMonster.mp !== undefined ? this.playerMonster.mp : (this.playerMonster.maxMp || 50);
        if (curMp < mpCost) {
            this.message = `Không đủ MP (${curMp}/${mpCost}) để dùng [${skill.name}]!`;
            return;
        }

        this.state = 'executing';
        if (this.playerMonster.mp !== undefined) {
            this.playerMonster.mp = Math.max(0, this.playerMonster.mp - mpCost);
        }

        window.soundEngine?.playAttack();
        if (this.playerJ2MESprite) this.playerJ2MESprite.triggerAttack();

        // Kỹ năng hồi phục
        if (skill.heal || skill.type === 'Hồi Phục') {
            const healPercent = skill.heal || 35;
            const healAmount = Math.floor((this.playerMonster.maxHp * healPercent) / 100);
            this.playerMonster.hp = Math.min(this.playerMonster.maxHp, this.playerMonster.hp + healAmount);
            this.triggerVfx('Hồi Phục', this.lastPlayerX || 220, this.lastPlayerY || 350);
            this.message = `${this.playerMonster.name} thi triển [${skill.name}], hồi phục ${healAmount} HP!`;

            setTimeout(() => {
                this.enemyTurn();
            }, 1200);
            return;
        }

        // Kỹ năng tăng phòng ngự
        if (skill.buffDef || skill.type === 'Phòng Ngự') {
            const buff = skill.buffDef || 30;
            this.playerMonster.defense = Math.floor(this.playerMonster.defense * (1 + buff / 100));
            this.triggerVfx('Phòng Ngự', this.lastPlayerX || 220, this.lastPlayerY || 350);
            this.message = `${this.playerMonster.name} thi triển [${skill.name}], phòng ngự tăng thêm ${buff}%!`;

            setTimeout(() => {
                this.enemyTurn();
            }, 1200);
            return;
        }

        // Tính tương khắc ngũ hành chuẩn Vương Quốc Sủng Cầu Vồng
        // Thực Vật -> Phi Hành -> Hải Dương -> Kim Loại -> Mãnh Thú -> Thực Vật
        const attackerClass = this.playerMonster.type || 'Thực Vật';
        const skillType = skill.type || attackerClass;
        const defenderClass = this.wildMonster.type || 'Thực Vật';
        let elementMult = 1.0;
        let effectMsg = '';

        const effectiveType = (skillType === 'Đặc Biệt' || skillType === 'Thường') ? attackerClass : skillType;

        if (window.TYPE_EFFECTIVENESS && window.TYPE_EFFECTIVENESS[effectiveType]) {
            const eff = window.TYPE_EFFECTIVENESS[effectiveType];
            if (eff.strongAgainst && eff.strongAgainst.includes(defenderClass)) {
                elementMult = 1.75;
                effectMsg = ' (Khắc chế ngũ hành! Chí mạng!)';
            } else if (eff.weakAgainst && eff.weakAgainst.includes(defenderClass)) {
                elementMult = 0.6;
                effectMsg = ' (Bị ngũ hành kháng cự!)';
            }
        }

        // STAB (Same Type Attack Bonus) khi kỹ năng trùng hệ với sủng vật
        let stab = 1.0;
        if (skillType === attackerClass) {
            stab = 1.25;
        }

        // Tính sát thương chuẩn
        const power = skill.power || 20;
        const pAtk = this.playerMonster.attack || 15;
        const wDef = Math.max(1, this.wildMonster.defense || 10);
        const damage = Math.max(5, Math.floor(power * (pAtk / wDef) * elementMult * stab * (0.88 + Math.random() * 0.24)));

        setTimeout(() => {
            this.triggerVfx(effectiveType, this.lastEnemyX || 814, this.lastEnemyY || 180);
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
        const skills = (this.wildMonster.skills && this.wildMonster.skills.length > 0)
            ? this.wildMonster.skills
            : [{ name: 'Cắn Xé', power: 15, type: this.wildMonster.type || 'Mãnh Thú', mpCost: 0 }];

        // Chọn kỹ năng phù hợp với lượng MP còn lại của đối thủ
        const curMp = this.wildMonster.mp !== undefined ? this.wildMonster.mp : (this.wildMonster.maxMp || 50);
        const affordable = skills.filter(s => (s.mpCost || 0) <= curMp);
        const skill = affordable.length > 0
            ? affordable[Math.floor(Math.random() * affordable.length)]
            : (skills[0] || { name: 'Đánh Thường', power: 12, type: 'Đặc Biệt', mpCost: 0 });

        setTimeout(() => {
            if (this.wildMonster.mp !== undefined && skill.mpCost) {
                this.wildMonster.mp = Math.max(0, this.wildMonster.mp - skill.mpCost);
            }

            window.soundEngine?.playAttack();
            if (this.wildJ2MESprite) this.wildJ2MESprite.triggerAttack();

            // Đối thủ hồi phục
            if (skill.heal || skill.type === 'Hồi Phục') {
                const healPercent = skill.heal || 35;
                const healAmt = Math.floor((this.wildMonster.maxHp * healPercent) / 100);
                this.wildMonster.hp = Math.min(this.wildMonster.maxHp, this.wildMonster.hp + healAmt);
                this.triggerVfx('Hồi Phục', this.lastEnemyX || 814, this.lastEnemyY || 180);
                this.message = `${this.wildMonster.name} đối thủ dùng [${skill.name}], hồi phục ${healAmt} HP!`;

                setTimeout(() => {
                    this.state = 'player_turn';
                    this.subState = 'skills';
                    this.message = `Lượt của bạn. Hãy chọn kỹ năng tấn công [1-4]:`;
                }, 1200);
                return;
            }

            // Tính tương khắc ngũ hành của địch
            const attackerClass = this.wildMonster.type || 'Hải Dương';
            const skillType = skill.type || attackerClass;
            const defenderClass = this.playerMonster.type || 'Thực Vật';
            let elementMult = 1.0;
            let effectMsg = '';

            const effectiveType = (skillType === 'Đặc Biệt' || skillType === 'Thường') ? attackerClass : skillType;

            if (window.TYPE_EFFECTIVENESS && window.TYPE_EFFECTIVENESS[effectiveType]) {
                const eff = window.TYPE_EFFECTIVENESS[effectiveType];
                if (eff.strongAgainst && eff.strongAgainst.includes(defenderClass)) {
                    elementMult = 1.65;
                    effectMsg = ' (Khắc chế ngũ hành!)';
                } else if (eff.weakAgainst && eff.weakAgainst.includes(defenderClass)) {
                    elementMult = 0.65;
                    effectMsg = ' (Bị kháng cự!)';
                }
            }

            let stab = 1.0;
            if (skillType === attackerClass) {
                stab = 1.25;
            }

            const power = skill.power || 15;
            const wAtk = this.wildMonster.attack || 14;
            const pDef = Math.max(1, this.playerMonster.defense || 12);
            const damage = Math.max(4, Math.floor(power * (wAtk / pDef) * elementMult * stab * (0.85 + Math.random() * 0.3)));

            setTimeout(() => {
                this.triggerVfx(effectiveType, this.lastPlayerX || 220, this.lastPlayerY || 350);
                if (this.playerJ2MESprite) this.playerJ2MESprite.triggerHurt();
                this.playerMonster.hp = Math.max(0, this.playerMonster.hp - damage);
                this.message = `${this.wildMonster.name} đối thủ dùng [${skill.name}], gây ${damage} sát thương!${effectMsg}`;
            }, 300);

            setTimeout(() => {
                if (this.playerMonster.hp <= 0) {
                    this.playerFainted();
                } else {
                    this.state = 'player_turn';
                    this.subState = 'skills';
                    this.message = `Lượt của bạn. Hãy chọn kỹ năng tấn công [1-4]:`;
                }
            }, 1300);
        }, 800);
    }

    // Dùng bóng bắt quái
    usePokeball() {
        let ballType = null;
        let multiplier = 1.0;
        let ballName = 'Cầu Bắt Thường';

        if ((this.inventory.pokeballs || 0) > 0) {
            ballType = 'pokeballs';
            multiplier = 1.0;
            ballName = 'Cầu Bắt Thường (Animon Ball)';
        } else if ((this.inventory.greatBalls || 0) > 0) {
            ballType = 'greatBalls';
            multiplier = 1.6;
            ballName = 'Cầu Bắt Cao Cấp (Great Ball)';
        } else if ((this.inventory.masterBalls || 0) > 0) {
            ballType = 'masterBalls';
            multiplier = 999.0;
            ballName = 'Cầu Thần Kỳ (Master Ball)';
        }

        if (!ballType) {
            this.message = 'Bạn đã hết Cầu Bắt Quái trong túi đồ!';
            return;
        }

        this.inventory[ballType]--;
        this.state = 'executing';
        this.message = `Bạn ném ${ballName} về phía ${this.wildMonster.name}...`;

        setTimeout(() => {
            const hpPercent = this.wildMonster.hp / (this.wildMonster.maxHp || 1);
            const baseCatchRate = Math.max(0.3, 0.95 - (hpPercent * 0.65));
            const finalCatchRate = Math.min(1.0, baseCatchRate * multiplier);

            if (multiplier >= 100 || Math.random() < finalCatchRate) {
                window.soundEngine?.playCatchSuccess();
                this.message = `Tuyệt vời! Bạn đã bắt thành công ${this.wildMonster.name}!`;

                // Thêm vào đội hình người chơi (tối đa 6 sủng vật)
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

    // Dùng dược phẩm hồi máu (HP)
    usePotion() {
        let itemKey = null;
        let healPercent = 35;
        let itemName = 'Đồ Uống';

        if ((this.inventory.potion || 0) > 0) {
            itemKey = 'potion';
            healPercent = 35;
            itemName = 'Đồ Uống (+35% HP)';
        } else if ((this.inventory.potions || 0) > 0) {
            itemKey = 'potions';
            healPercent = 35;
            itemName = 'Bình Máu (+35% HP)';
        } else if ((this.inventory.superPotion || 0) > 0) {
            itemKey = 'superPotion';
            healPercent = 65;
            itemName = 'Bánh Bích Quy (+65% HP)';
        } else if ((this.inventory.chocolate || 0) > 0) {
            itemKey = 'chocolate';
            healPercent = 100;
            itemName = 'Sô-cô-la (100% HP)';
        }

        if (!itemKey) {
            this.message = 'Bạn đã hết Dược Phẩm hồi HP!';
            return;
        }

        if (this.playerMonster.hp >= this.playerMonster.maxHp) {
            this.message = `${this.playerMonster.name} đã đầy máu, không cần dùng thuốc!`;
            return;
        }

        this.inventory[itemKey]--;
        const heal = Math.max(15, Math.floor((this.playerMonster.maxHp * healPercent) / 100));
        this.playerMonster.hp = Math.min(this.playerMonster.maxHp, this.playerMonster.hp + heal);
        this.triggerVfx('Hồi Phục', this.lastPlayerX || 220, this.lastPlayerY || 350);
        this.message = `Dùng [${itemName}], hồi phục ${heal} HP cho ${this.playerMonster.name}!`;

        setTimeout(() => {
            this.enemyTurn();
        }, 1200);
    }

    // Dùng dược phẩm hồi năng lượng (MP)
    useEther() {
        let itemKey = null;
        let restoreMp = 30;
        let itemName = 'Năng Lượng Thạch';

        const curMp = this.playerMonster.mp !== undefined ? this.playerMonster.mp : (this.playerMonster.maxMp || 50);
        const maxMp = this.playerMonster.maxMp || 50;

        if (curMp >= maxMp) {
            this.message = `${this.playerMonster.name} đã đầy năng lượng MP!`;
            return;
        }

        if ((this.inventory.ether || 0) > 0) {
            itemKey = 'ether';
            restoreMp = Math.max(15, Math.floor(maxMp * 0.5));
            itemName = 'Năng Lượng Thạch (+50% MP)';
        } else if ((this.inventory.elixir || 0) > 0) {
            itemKey = 'elixir';
            restoreMp = maxMp;
            itemName = 'Hoàng Kim Đường (100% MP)';
        }

        if (!itemKey) {
            this.message = 'Bạn đã hết Dược Phẩm hồi MP!';
            return;
        }

        this.inventory[itemKey]--;
        this.playerMonster.mp = Math.min(maxMp, curMp + restoreMp);
        this.triggerVfx('Đặc Biệt', this.lastPlayerX || 220, this.lastPlayerY || 350);
        this.message = `Dùng [${itemName}], hồi phục ${restoreMp} MP cho ${this.playerMonster.name}!`;

        setTimeout(() => {
            this.enemyTurn();
        }, 1200);
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

    // Hiệu ứng hạt chiêu thức theo Hệ (Skill Visual Effects)
    triggerVfx(type, targetX, targetY) {
        if (!this.vfxParticles) this.vfxParticles = [];
        const count = 22;
        const emojis = {
            'Thực Vật': ['🍃', '🌿', '🌱', '✨'],
            'Kim Loại': ['⚡', '⚔️', '✨', '🔶'],
            'Phi Hành': ['🌪️', '🪶', '💨', '✨'],
            'Mãnh Thú': ['🔥', '💥', '🐾', '💢'],
            'Hải Dương': ['💧', '🌊', '❄️', '🫧'],
            'Hồi Phục': ['💚', '✨', '🍀', '💖'],
            'Phòng Ngự': ['🛡️', '🔷', '✨', '💠'],
            'Đặc Biệt': ['⭐', '✨', '⚡', '💥']
        };
        const colors = {
            'Thực Vật': ['#2ecc71', '#27ae60', '#a8e6cf', '#dcedc1'],
            'Kim Loại': ['#f1c40f', '#f39c12', '#ffeaa7', '#dfe6e9'],
            'Phi Hành': ['#9b59b6', '#8e44ad', '#a29bfe', '#dfe6e9'],
            'Mãnh Thú': ['#e74c3c', '#c0392b', '#ff7675', '#d63031'],
            'Hải Dương': ['#3498db', '#2980b9', '#74b9ff', '#0984e3'],
            'Hồi Phục': ['#2ecc71', '#00b894', '#55efc4', '#ffffff'],
            'Phòng Ngự': ['#0984e3', '#74b9ff', '#a29bfe', '#dfe6e9'],
            'Đặc Biệt': ['#e056fd', '#f0932b', '#ffbe76', '#ffffff']
        };

        const charList = emojis[type] || emojis['Đặc Biệt'];
        const colorList = colors[type] || colors['Đặc Biệt'];

        for (let i = 0; i < count; i++) {
            const angle = (Math.PI * 2 * i) / count + (Math.random() - 0.5) * 0.5;
            const speed = 2.5 + Math.random() * 5.5;
            this.vfxParticles.push({
                x: targetX,
                y: targetY,
                vx: Math.cos(angle) * speed,
                vy: Math.sin(angle) * speed - 1.5,
                color: colorList[Math.floor(Math.random() * colorList.length)],
                char: (Math.random() < 0.45) ? charList[Math.floor(Math.random() * charList.length)] : null,
                size: 14 + Math.random() * 12,
                life: 35,
                maxLife: 35,
                gravity: 0.18
            });
        }
    }

    drawVfx(ctx) {
        if (!this.vfxParticles || this.vfxParticles.length === 0) return;
        ctx.save();
        for (let i = this.vfxParticles.length - 1; i >= 0; i--) {
            const p = this.vfxParticles[i];
            p.x += p.vx;
            p.y += p.vy;
            p.vy += p.gravity;
            p.life--;

            const alpha = Math.max(0, p.life / p.maxLife);
            ctx.globalAlpha = alpha;

            if (p.char) {
                ctx.font = `${Math.round(p.size)}px sans-serif`;
                ctx.textAlign = 'center';
                ctx.textBaseline = 'middle';
                ctx.fillText(p.char, p.x, p.y);
            } else {
                ctx.fillStyle = p.color;
                ctx.beginPath();
                ctx.arc(p.x, p.y, Math.max(2, p.size / 3.5), 0, Math.PI * 2);
                ctx.fill();
            }

            if (p.life <= 0) {
                this.vfxParticles.splice(i, 1);
            }
        }
        ctx.restore();
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

        // 2. Tính toán hiệu ứng trượt vào trận đấu (Intro Slide-In Animation)
        this.introTimer = (this.introTimer !== undefined ? this.introTimer : 650) + 16;
        const introP = Math.min(1, this.introTimer / (this.introDuration || 650));
        const easeOut = 1 - Math.pow(1 - introP, 3); // Cubic ease out chuẩn Pokemon

        // ========================================================
        // GIAO DIỆN CHIẾN ĐẤU POKÉMON GBA (ĐỐI XỨNG GÓC - KHÔNG BAO GIỜ BỊ CHE KHUẤT)
        // - Thẻ Đối thủ: Góc TRÊN BÊN TRÁI (Top-Left)
        // - Sủng vật Đối thủ: Góc TRÊN BÊN PHẢI (Top-Right)
        // - Thẻ Người chơi: Góc DƯỚI BÊN PHẢI (Bottom-Right)
        // - Sủng vật Người chơi: Góc DƯỚI BÊN TRÁI (Bottom-Left)
        // ========================================================

        // A. Thẻ Đối thủ ở GÓC TRÊN BÊN TRÁI (trượt từ -350 sang 50)
        const enemyCardTargetX = 50;
        const enemyCardCurrentX = Math.round(-350 + (enemyCardTargetX - (-350)) * easeOut);
        const enemyCardY = 45;
        this.drawMonsterCard(ctx, enemyCardCurrentX, enemyCardY, this.wildMonster, false);

        // B. Sủng vật Đối thủ ở GÓC TRÊN BÊN PHẢI (trượt từ width + 200 sang width - 210)
        const enemyTargetX = width - 210;
        const enemyCurrentX = Math.round((width + 200) - ((width + 200) - enemyTargetX) * easeOut);
        const enemyGroundY = 240;

        let wildDrawn = false;
        if (this.wildJ2MESprite && this.wildJ2MESprite.getData()) {
            this.wildJ2MESprite.update(16);
            // Chuẩn hóa kích thước sủng vật (targetHeight = 140) để mọi loài cân đối
            this.wildJ2MESprite.draw(ctx, enemyCurrentX, enemyGroundY, 140);
            wildDrawn = true;
        }
        if (!wildDrawn && this.wildSprite && this.wildSprite.complete && this.wildSprite.naturalWidth > 0) {
            const sprSize = 135;
            ctx.drawImage(this.wildSprite, enemyCurrentX - 60, enemyGroundY - 100, sprSize, sprSize);
        }

        // C. Sủng vật Người chơi ở GÓC DƯỚI BÊN TRÁI (trượt từ -180 sang 220)
        const playerTargetX = 220;
        const playerCurrentX = Math.round(-180 + (playerTargetX - (-180)) * easeOut);
        const playerGroundY = height - 130;

        let playerDrawn = false;
        if (this.playerJ2MESprite && this.playerJ2MESprite.getData()) {
            this.playerJ2MESprite.update(16);
            // Chuẩn hóa kích thước sủng vật (targetHeight = 140) để mọi loài cân đối
            this.playerJ2MESprite.draw(ctx, playerCurrentX, playerGroundY, 140);
            playerDrawn = true;
        }
        if (!playerDrawn && this.playerSprite && this.playerSprite.complete && this.playerSprite.naturalWidth > 0) {
            const sprSize = 135;
            ctx.drawImage(this.playerSprite, playerCurrentX - 60, playerGroundY - 100, sprSize, sprSize);
        }

        // D. Thẻ Người chơi ở GÓC DƯỚI BÊN PHẢI (trượt từ width + 350 sang width - 330)
        const playerCardTargetX = width - 330;
        const playerCardCurrentX = Math.round((width + 350) - ((width + 350) - playerCardTargetX) * easeOut);
        const playerCardY = height - 225;
        this.drawMonsterCard(ctx, playerCardCurrentX, playerCardY, this.playerMonster, true);

        // Lưu tọa độ thực tế phục vụ hiệu ứng VFX
        this.lastEnemyX = enemyCurrentX;
        this.lastEnemyY = enemyGroundY - 60;
        this.lastPlayerX = playerCurrentX;
        this.lastPlayerY = playerGroundY - 60;

        // E. Vẽ hiệu ứng kỹ năng (Skill Visual Particles) nếu đang thi triển
        this.drawVfx(ctx);

        // 4. Khung điều khiển & Hộp thoại bên dưới
        const boxX = 30;
        const boxY = height - 120;
        const boxW = width - 60;
        const boxH = 100;

        // Viền retro
        ctx.beginPath();
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
        ctx.textAlign = 'left';
        ctx.textBaseline = 'alphabetic';
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

        ctx.beginPath();
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
        ctx.textAlign = 'left';
        ctx.textBaseline = 'alphabetic';
        ctx.fillText(monster.name || 'Sủng Vật', x + 12, y + 24);

        // Huy hiệu Hệ Ngũ Hành (Thực Vật, Kim Loại, Phi Hành, Mãnh Thú, Hải Dương)
        const elem = monster.type || 'Thực Vật';
        const elemColors = {
            'Thực Vật': '#27ae60',
            'Kim Loại': '#f39c12',
            'Phi Hành': '#8e44ad',
            'Mãnh Thú': '#c0392b',
            'Hải Dương': '#2980b9'
        };
        const badgeColor = elemColors[elem] || '#7f8c8d';

        ctx.save();
        ctx.beginPath();
        ctx.fillStyle = badgeColor;
        if (ctx.roundRect) {
            ctx.roundRect(x + cardW - 120, y + 10, 56, 18, 4);
        } else {
            ctx.fillRect(x + cardW - 120, y + 10, 56, 18);
        }
        ctx.fill();
        ctx.fillStyle = '#ffffff';
        ctx.font = 'bold 11px sans-serif';
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.fillText(elem, x + cardW - 92, y + 19);
        ctx.restore();

        // Cấp độ
        ctx.font = 'bold 13px "Segoe UI", sans-serif';
        ctx.fillStyle = '#d35400';
        ctx.textAlign = 'left';
        ctx.textBaseline = 'alphabetic';
        ctx.fillText(`Lv.${monster.level || 5}`, x + cardW - 55, y + 24);

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

    // Nút kỹ năng (Hiển thị trọn vẹn 4 kỹ năng của sủng vật kèm thanh công cụ Túi/Bắt/Chạy)
    drawSkillButtons(ctx, bx, by, bw, bh) {
        const skills = (this.playerMonster.skills && this.playerMonster.skills.length > 0)
            ? this.playerMonster.skills.slice(0, 4)
            : [{ name: 'Đánh Thường', power: 15, type: 'Đặc Biệt', mpCost: 0 }];

        const elemColors = {
            'Thực Vật': '#27ae60',
            'Kim Loại': '#d35400',
            'Phi Hành': '#8e44ad',
            'Mãnh Thú': '#c0392b',
            'Hải Dương': '#2980b9',
            'Hồi Phục': '#16a085',
            'Phòng Ngự': '#2c3e50',
            'Đặc Biệt': '#7f8c8d'
        };

        const actionW = 74;
        const actionGap = 8;
        const actionTotalW = actionW * 3 + actionGap * 2;
        const skillAreaW = bw - actionTotalW - 32;
        const btnW = Math.max(140, Math.floor((skillAreaW - 24) / 4));
        const btnH = 38;
        const startX = bx + 12;
        const btnY = by + bh - 50;
        const curMp = this.playerMonster.mp !== undefined ? this.playerMonster.mp : (this.playerMonster.maxMp || 50);

        // Vẽ 4 nút chiêu thức
        skills.forEach((sk, idx) => {
            const skX = startX + idx * (btnW + 8);
            const skType = sk.type || 'Thực Vật';
            const cost = sk.mpCost || 0;
            const canAfford = curMp >= cost;
            const baseColor = canAfford ? (elemColors[skType] || '#e67e22') : '#3d3d3d';

            ctx.save();
            ctx.beginPath();
            ctx.fillStyle = baseColor;
            ctx.strokeStyle = canAfford ? '#f1c40f' : '#555555';
            ctx.lineWidth = 1.5;
            if (ctx.roundRect) {
                ctx.roundRect(skX, btnY, btnW, btnH, 6);
            } else {
                ctx.fillRect(skX, btnY, btnW, btnH);
            }
            ctx.fill();
            ctx.stroke();

            // Tên kỹ năng & Phím tắt
            ctx.fillStyle = '#ffffff';
            ctx.font = 'bold 12px "Segoe UI", sans-serif';
            ctx.textAlign = 'left';
            ctx.textBaseline = 'top';
            ctx.fillText(`[${idx + 1}] ${sk.name}`, skX + 6, btnY + 5);

            // Chỉ số: Dmg / Hồi máu / MP
            ctx.font = '10px "Segoe UI", sans-serif';
            ctx.fillStyle = canAfford ? '#ffeaa7' : '#e74c3c';
            const infoText = sk.heal ? `+${sk.heal}% HP • MP:${cost}` : (sk.buffDef ? `+${sk.buffDef}% Giáp • MP:${cost}` : `${sk.power || 15} dmg • MP:${cost}`);
            ctx.fillText(infoText, skX + 6, btnY + 22);

            // Badge hệ
            ctx.textAlign = 'right';
            ctx.fillStyle = '#ffffff';
            ctx.font = 'bold 9.5px sans-serif';
            ctx.fillText(skType, skX + btnW - 6, btnY + 6);
            ctx.restore();
        });

        // 3 nút công cụ nhanh bên phải (Túi, Bắt, Chạy)
        const actBaseX = bx + bw - actionTotalW - 12;
        this.drawBtn(ctx, actBaseX, btnY, actionW, btnH, '🎒 Túi (5)', '#f39c12');
        this.drawBtn(ctx, actBaseX + actionW + actionGap, btnY, actionW, btnH, '🔴 Bắt (6)', '#9b59b6');
        this.drawBtn(ctx, actBaseX + (actionW + actionGap) * 2, btnY, actionW, btnH, '🏃 Chạy (7)', '#3498db');
    }

    // Nút túi đồ
    drawBagButtons(ctx, bx, by, bw, bh) {
        const totalBalls = (this.inventory.pokeballs || 0) + (this.inventory.greatBalls || 0) + (this.inventory.masterBalls || 0);
        const totalPotions = (this.inventory.potion || 0) + (this.inventory.potions || 0) + (this.inventory.superPotion || 0) + (this.inventory.chocolate || 0);
        const totalEthers = (this.inventory.ether || 0) + (this.inventory.elixir || 0);

        const btnW = 160;
        const btnH = 38;
        const startX = bx + 16;
        const btnY = by + bh - 50;

        this.drawBtn(ctx, startX, btnY, btnW, btnH, `🔴 Cầu Bắt [${totalBalls}] (1)`, '#9b59b6');
        this.drawBtn(ctx, startX + btnW + 12, btnY, btnW, btnH, `🧪 Hồi HP [${totalPotions}] (2)`, '#2ecc71');
        this.drawBtn(ctx, startX + (btnW + 12) * 2, btnY, btnW, btnH, `⚡ Hồi MP [${totalEthers}] (3)`, '#3498db');
        this.drawBtn(ctx, bx + bw - 130, btnY, 115, btnH, '↩ Trở Về (4)', '#7f8c8d');
    }

    drawBtn(ctx, x, y, w, h, text, color) {
        ctx.save();
        ctx.beginPath();
        ctx.fillStyle = color;
        if (ctx.roundRect) {
            ctx.roundRect(x, y, w, h, 6);
        } else {
            ctx.fillRect(x, y, w, h);
        }
        ctx.fill();

        ctx.fillStyle = '#ffffff';
        ctx.font = 'bold 12.5px "Segoe UI", sans-serif';
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.fillText(text, x + w / 2, y + h / 2);
        ctx.restore();
    }

    // Xử lý phím tắt
    handleInput(key) {
        if (!this.active) return;

        // Bấm phím bất kỳ trong intro sẽ tua nhanh qua intro
        if (this.state === 'intro') {
            this.nextDialog();
            return;
        }

        if (this.state !== 'player_turn') return;

        if (this.subState === 'skills' || this.subState === 'main_menu') {
            const skills = this.playerMonster.skills || [{ name: 'Đánh Thường', power: 15 }];
            if (key === '1' && skills[0]) this.playerAttack(skills[0]);
            else if (key === '2' && skills[1]) this.playerAttack(skills[1]);
            else if (key === '3' && skills[2]) this.playerAttack(skills[2]);
            else if (key === '4' && skills[3]) this.playerAttack(skills[3]);
            else if (key === '5') this.subState = 'bag';
            else if (key === '6') this.usePokeball();
            else if (key === '7' || key === 'Escape') this.flee();
        } else if (this.subState === 'bag') {
            if (key === '1') this.usePokeball();
            else if (key === '2') this.usePotion();
            else if (key === '3') this.useEther();
            else if (key === '4' || key === 'Escape' || key === 'Backspace' || key === '5') this.subState = 'skills';
        }
    }

    // Xử lý click chuột
    handleClick(x, y, width, height) {
        if (!this.active) return;

        // Click trong intro sẽ lập tức bỏ qua hội thoại
        if (this.state === 'intro') {
            this.nextDialog();
            return;
        }

        if (this.state !== 'player_turn') return;

        const boxX = 30;
        const boxY = height - 120;
        const boxW = width - 60;
        const boxH = 100;
        const btnY = boxY + boxH - 50;
        const btnH = 38;

        if (this.subState === 'skills' || this.subState === 'main_menu') {
            const skills = (this.playerMonster.skills && this.playerMonster.skills.length > 0)
                ? this.playerMonster.skills.slice(0, 4)
                : [{ name: 'Đánh Thường', power: 15, type: 'Đặc Biệt', mpCost: 0 }];

            const actionW = 74;
            const actionGap = 8;
            const actionTotalW = actionW * 3 + actionGap * 2;
            const skillAreaW = boxW - actionTotalW - 32;
            const btnW = Math.max(140, Math.floor((skillAreaW - 24) / 4));
            const startX = boxX + 12;

            if (y >= btnY && y <= btnY + btnH) {
                // Click vào 1 trong 4 kỹ năng
                skills.forEach((sk, idx) => {
                    const skX = startX + idx * (btnW + 8);
                    if (x >= skX && x <= skX + btnW) {
                        this.playerAttack(sk);
                    }
                });

                // Click các nút công cụ bên phải: Túi (5), Bắt (6), Chạy (7)
                const actBaseX = boxX + boxW - actionTotalW - 12;
                if (x >= actBaseX && x <= actBaseX + actionW) {
                    this.subState = 'bag';
                } else if (x >= actBaseX + actionW + actionGap && x <= actBaseX + actionW * 2 + actionGap) {
                    this.usePokeball();
                } else if (x >= actBaseX + (actionW + actionGap) * 2 && x <= actBaseX + (actionW + actionGap) * 2 + actionW) {
                    this.flee();
                }
            }
        } else if (this.subState === 'bag') {
            const btnW = 160;
            const startX = boxX + 16;

            if (y >= btnY && y <= btnY + btnH) {
                if (x >= startX && x <= startX + btnW) this.usePokeball();
                else if (x >= startX + btnW + 12 && x <= startX + (btnW * 2) + 12) this.usePotion();
                else if (x >= startX + (btnW + 12) * 2 && x <= startX + (btnW + 12) * 2 + btnW) this.useEther();
                else if (x >= boxX + boxW - 130 && x <= boxX + boxW - 10) this.subState = 'skills';
            }
        }
    }
}

window.battleSystem = new BattleSystem();

