// ========================================================
// TRÌNH DỰNG & HOẠT HỌA SPRITE J2ME (J2ME SPRITE ENGINE)
// ========================================================

class J2MESprite {
    constructor({ spriteKey, scale = 2.8, flipX = false }) {
        this.spriteKey = spriteKey;
        this.scale = scale;
        this.flipX = flipX;

        this.animIndex = 0; // 0: Đứng yên (Idle), 1: Tấn công (Attack), 2: Trúng đòn (Hurt)
        this.stepIndex = 0;
        this.timer = 0;
        this.loop = true;
        this.isFinished = false;

        // Hiệu ứng chiến đấu (Rung lắc khi bị đánh, giật sáng)
        this.shakeX = 0;
        this.shakeY = 0;
        this.flashRed = false;

        // Tải ảnh atlas
        this.image = new Image();
        this.image.src = `./img/monsters/${spriteKey}.png`;
        this.image.onerror = () => {
            if (this.image.src.indexOf('client/') === -1) {
                this.image.src = `./client/img/monsters/${spriteKey}.png`;
            }
        };

        // Lấy dữ liệu ghép khung
        this.data = (typeof window !== 'undefined' && window.J2ME_SPRITES_DATA)
            ? window.J2ME_SPRITES_DATA[spriteKey]
            : null;
    }

    getData() {
        if (!this.data && typeof window !== 'undefined' && window.J2ME_SPRITES_DATA) {
            this.data = window.J2ME_SPRITES_DATA[this.spriteKey];
        }
        return this.data;
    }

    setAnimation(animIdx, loop = true) {
        const data = this.getData();
        if (!data || !data.anims || data.anims.length === 0) return;

        const maxAnim = data.anims.length - 1;
        const validIdx = Math.min(Math.max(0, animIdx), maxAnim);

        if (this.animIndex !== validIdx) {
            this.animIndex = validIdx;
            this.stepIndex = 0;
            this.timer = 0;
            this.loop = loop;
            this.isFinished = false;
        }
    }

    update(deltaTimeMs = 16) {
        const data = this.getData();
        if (!data || !data.anims || !data.anims[this.animIndex]) return;

        const anim = data.anims[this.animIndex];
        if (anim.length === 0) return;

        const currentStep = anim[this.stepIndex];
        const delayUnits = currentStep ? currentStep[1] : 2;
        // Mỗi đơn vị delay của J2ME khoảng 70ms
        const stepDuration = Math.max(1, delayUnits) * 70;

        this.timer += deltaTimeMs;
        if (this.timer >= stepDuration) {
            this.timer = 0;
            if (this.stepIndex + 1 < anim.length) {
                this.stepIndex++;
            } else {
                if (this.loop) {
                    this.stepIndex = 0;
                } else {
                    this.isFinished = true;
                }
            }
        }

        // Giảm dần hiệu ứng rung lắc
        if (Math.abs(this.shakeX) > 0.5) this.shakeX *= 0.8; else this.shakeX = 0;
        if (Math.abs(this.shakeY) > 0.5) this.shakeY *= 0.8; else this.shakeY = 0;
    }

    triggerHurt() {
        this.shakeX = (Math.random() - 0.5) * 16;
        this.shakeY = (Math.random() - 0.5) * 8;
        this.flashRed = true;
        this.setAnimation(2, false); // Animation bị đánh
        setTimeout(() => {
            this.flashRed = false;
            this.setAnimation(0, true); // Quay lại Idle
        }, 500);
    }

    triggerAttack() {
        this.setAnimation(1, false); // Animation tấn công
        setTimeout(() => {
            this.setAnimation(0, true); // Quay lại Idle
        }, 700);
    }

    draw(ctx, groundX, groundY) {
        if (!ctx) return;
        const data = this.getData();
        if (!data) return;

        ctx.save();

        const drawX = Math.round(groundX + this.shakeX);
        const drawY = Math.round(groundY + this.shakeY);

        // 1. Vẽ bóng sủng vật dưới chân
        ctx.save();
        ctx.fillStyle = 'rgba(0, 0, 0, 0.35)';
        ctx.beginPath();
        const shadowW = 35 * this.scale;
        const shadowH = 10 * this.scale;
        ctx.ellipse(drawX, drawY + 2, shadowW / 2, shadowH / 2, 0, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();

        // 2. Lấy frame hiện tại
        const anim = data.anims[this.animIndex] || data.anims[0];
        if (!anim || anim.length === 0) {
            ctx.restore();
            return;
        }

        const step = anim[this.stepIndex] || anim[0];
        const frameId = step[0];
        const frame = data.frames[frameId];
        if (!frame || !frame.parts) {
            ctx.restore();
            return;
        }

        // Hiệu ứng giật đỏ khi trúng sát thương
        if (this.flashRed) {
            ctx.filter = 'brightness(1.8) sepia(1) hue-rotate(-50deg) saturate(5)';
        }

        // 3. Ghép và vẽ từng bộ phận (parts) theo đúng tọa độ và phép biến hình
        const parts = frame.parts;
        const modules = data.modules;

        for (let i = 0; i < parts.length; i++) {
            const part = parts[i];
            const modId = part[0];
            const ox = part[1];
            const oy = part[2];
            const flags = part[3];

            const mod = modules[modId];
            if (!mod) continue;

            const [srcX, srcY, w, h] = mod;
            this.drawModule(ctx, srcX, srcY, w, h, drawX, drawY, ox, oy, flags);
        }

        ctx.restore();
    }

    // Vẽ từng module với các phép xoay lật (TRANS_*) của J2ME MIDP 2.0
    drawModule(ctx, srcX, srcY, w, h, groundX, groundY, ox, oy, flags) {
        if (!this.image || !this.image.complete || this.image.naturalWidth === 0) return;

        const scale = this.scale;
        const dw = w * scale;
        const dh = h * scale;

        // Tọa độ đích (Destination X, Y)
        let destX = groundX + (this.flipX ? (-ox - w) : ox) * scale;
        let destY = groundY + oy * scale;

        ctx.save();

        // Nếu cả thực thể bị lật ngang (ví dụ quái người chơi quay mặt sang phải)
        let effectiveFlags = flags;
        if (this.flipX) {
            // Đảo cờ lật ngang
            if (effectiveFlags === 0) effectiveFlags = 6; // None -> Mirror
            else if (effectiveFlags === 6) effectiveFlags = 0; // Mirror -> None
            else if (effectiveFlags === 1) effectiveFlags = 3; // Mirror_Rot180 -> Rot180
            else if (effectiveFlags === 3) effectiveFlags = 1;
            else if (effectiveFlags === 2) effectiveFlags = 5;
            else if (effectiveFlags === 5) effectiveFlags = 2;
            else if (effectiveFlags === 4) effectiveFlags = 7;
            else if (effectiveFlags === 7) effectiveFlags = 4;
        }

        switch (effectiveFlags) {
            case 0: // TRANS_NONE (Gốc)
                ctx.drawImage(this.image, srcX, srcY, w, h, destX, destY, dw, dh);
                break;
            case 6: // TRANS_MIRROR (Lật ngang)
                ctx.translate(destX + dw, destY);
                ctx.scale(-1, 1);
                ctx.drawImage(this.image, srcX, srcY, w, h, 0, 0, dw, dh);
                break;
            case 1: // TRANS_MIRROR_ROT180 (Lật dọc)
                ctx.translate(destX, destY + dh);
                ctx.scale(1, -1);
                ctx.drawImage(this.image, srcX, srcY, w, h, 0, 0, dw, dh);
                break;
            case 3: // TRANS_ROT180 (Xoay 180 độ)
                ctx.translate(destX + dw, destY + dh);
                ctx.scale(-1, -1);
                ctx.drawImage(this.image, srcX, srcY, w, h, 0, 0, dw, dh);
                break;
            case 5: // TRANS_ROT90 (Xoay 90 độ xuôi chiều kim đồng hồ)
                ctx.translate(destX + dh, destY);
                ctx.rotate(Math.PI / 2);
                ctx.drawImage(this.image, srcX, srcY, w, h, 0, 0, dw, dh);
                break;
            case 7: // TRANS_ROT270 (Xoay 270 độ)
                ctx.translate(destX, destY + dw);
                ctx.rotate(-Math.PI / 2);
                ctx.drawImage(this.image, srcX, srcY, w, h, 0, 0, dw, dh);
                break;
            case 2: // TRANS_MIRROR_ROT90
                ctx.translate(destX + dh, destY);
                ctx.rotate(Math.PI / 2);
                ctx.scale(-1, 1);
                ctx.drawImage(this.image, srcX, srcY, w, h, 0, 0, dw, dh);
                break;
            case 4: // TRANS_MIRROR_ROT270
                ctx.translate(destX, destY + dw);
                ctx.rotate(-Math.PI / 2);
                ctx.scale(-1, 1);
                ctx.drawImage(this.image, srcX, srcY, w, h, 0, 0, dw, dh);
                break;
            default:
                ctx.drawImage(this.image, srcX, srcY, w, h, destX, destY, dw, dh);
                break;
        }

        ctx.restore();
    }
}

if (typeof window !== 'undefined') {
    window.J2MESprite = J2MESprite;
}

