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
    static B_MAP = [
        [0, 1, 2, 3, 4, 5, 6, 7],
        [4, 5, 6, 7, 0, 1, 2, 3]
    ];
    static B_STATIC = [0, 5, 3, 6, 2, 4, 1, 7];

    getBBox() {
        const data = this.getData();
        if (!data || !data.anims || !data.anims[this.animIndex]) return { w: 44, h: 45 };
        const anim = data.anims[this.animIndex];
        const step = anim[this.stepIndex] || anim[0];
        if (!step) return { w: 44, h: 45 };
        const frame = data.frames[step[0]];
        if (frame && frame.bbox && frame.bbox.w > 0) return frame.bbox;
        return { w: 44, h: 45 };
    }

    draw(ctx, groundX, groundY, targetHeight = 0) {
        if (!ctx) return;
        const data = this.getData();

        // Tự động chuẩn hóa tỉ lệ (uniform scale) nếu có targetHeight
        const bbox = this.getBBox();
        const baseH = Math.max(32, bbox.h || 45);
        const effectiveScale = targetHeight > 0
            ? Math.min(3.6, Math.max(1.9, targetHeight / baseH))
            : this.scale;

        if (!data) {
            if (this.image && this.image.complete && this.image.naturalWidth > 0) {
                const sprSize = 90 * (effectiveScale / 2.8);
                ctx.save();
                ctx.fillStyle = 'rgba(0, 0, 0, 0.35)';
                ctx.beginPath();
                ctx.ellipse(groundX, groundY + 2, 30 * (effectiveScale / 2.8), 9 * (effectiveScale / 2.8), 0, 0, Math.PI * 2);
                ctx.fill();
                if (this.flipX) {
                    ctx.translate(groundX + sprSize / 2, groundY - sprSize);
                    ctx.scale(-1, 1);
                    ctx.drawImage(this.image, 0, 0, sprSize, sprSize);
                } else {
                    ctx.drawImage(this.image, groundX - sprSize / 2, groundY - sprSize, sprSize, sprSize);
                }
                ctx.restore();
            }
            return;
        }

        ctx.save();

        const drawX = Math.round(groundX + this.shakeX);
        const drawY = Math.round(groundY + this.shakeY);

        // 1. Vẽ bóng sủng vật dưới chân (tỷ lệ chuẩn theo thân hình)
        ctx.save();
        ctx.fillStyle = 'rgba(0, 0, 0, 0.35)';
        ctx.beginPath();
        const shadowW = Math.max(35, Math.min(85, bbox.w || 44)) * effectiveScale * 0.75;
        const shadowH = shadowW * 0.3;
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

        // 3. Ghép và vẽ từng bộ phận (parts) theo đúng chuẩn J2ME MIDP 2.0 (ah.class)
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
            this.drawModule(ctx, srcX, srcY, w, h, drawX, drawY, ox, oy, flags, effectiveScale);
        }

        ctx.restore();
    }

    // Vẽ từng module với các phép xoay lật (TRANS_*) chuẩn J2ME MIDP 2.0 (ah.class bytecode)
    drawModule(ctx, srcX, srcY, w, h, groundX, groundY, ox, oy, flags, scale) {
        if (!this.image || !this.image.complete || this.image.naturalWidth === 0) return;

        const sc = scale || this.scale;
        const flipMode = this.flipX ? 1 : 0;
        const internalTransform = J2MESprite.B_MAP[flipMode][flags & 7];
        const midp = J2MESprite.B_STATIC[internalTransform];

        // Nếu MIDP transform có phép xoay 90 hoặc 270 độ (5, 6, 4, 7): kích thước width và height hoán đổi
        const isSwapped = (midp === 5 || midp === 6 || midp === 4 || midp === 7);
        const rendW = isSwapped ? h : w;
        const rendH = isSwapped ? w : h;

        const dw = w * sc;
        const dh = h * sc;
        const rendDw = rendW * sc;
        const rendDh = rendH * sc;

        // Chuẩn ah.class bytecode:
        // partX = groundX + (flipMode === 1 ? -ox : ox) * scale
        // partY = groundY + oy * scale
        // Anchor: TOP|LEFT (20) khi flipMode === 0 -> destX = partX
        //         TOP|RIGHT (24) khi flipMode === 1 -> destX = partX - rendDw
        const partX = groundX + (flipMode === 1 ? -ox : ox) * sc;
        const partY = groundY + oy * sc;

        const destX = (flipMode === 1) ? (partX - rendDw) : partX;
        const destY = partY;

        ctx.save();

        switch (midp) {
            case 0: // TRANS_NONE
                ctx.drawImage(this.image, srcX, srcY, w, h, destX, destY, dw, dh);
                break;
            case 2: // TRANS_MIRROR (Lật ngang)
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
            case 6: // TRANS_ROT270 (Xoay 270 độ xuôi chiều kim đồng hồ)
                ctx.translate(destX, destY + dw);
                ctx.rotate(-Math.PI / 2);
                ctx.drawImage(this.image, srcX, srcY, w, h, 0, 0, dw, dh);
                break;
            case 7: // TRANS_MIRROR_ROT90 (Lật ngang + xoay 90 độ)
                ctx.translate(destX + dh, destY + dw);
                ctx.rotate(Math.PI / 2);
                ctx.scale(-1, 1);
                ctx.drawImage(this.image, srcX, srcY, w, h, 0, 0, dw, dh);
                break;
            case 4: // TRANS_MIRROR_ROT270 (Lật ngang + xoay 270 độ)
                ctx.translate(destX, destY);
                ctx.rotate(Math.PI / 2);
                ctx.scale(1, -1);
                ctx.drawImage(this.image, srcX, srcY, w, h, 0, 0, dw, dh);
                break;
            default:
                ctx.drawImage(this.image, srcX, srcY, w, h, destX, destY, dw, dh);
                break;
        }

        ctx.restore();
    }

    // Dựng frame đơn lẻ lên một Context bất kỳ (dùng để sinh spritesheet cho nhân vật / overworld)
    static renderFrameToContext(ctx, spriteKey, frameId, centerX, centerY, scale = 1.6, flipX = false, customImg = null) {
        const spriteData = (typeof window !== 'undefined' && window.J2ME_SPRITES_DATA)
            ? window.J2ME_SPRITES_DATA[spriteKey]
            : null;
        if (!spriteData || !spriteData.frames || !spriteData.frames[frameId]) return false;

        const frame = spriteData.frames[frameId];
        const parts = frame.parts || [];
        const modules = spriteData.modules || [];
        const img = customImg;
        if (!img || !img.complete || img.naturalWidth === 0) return false;

        const flipMode = flipX ? 1 : 0;
        const sc = scale;

        for (let i = 0; i < parts.length; i++) {
            const part = parts[i];
            const modId = part[0];
            const ox = part[1];
            const oy = part[2];
            const flags = part[3];

            const mod = modules[modId];
            if (!mod) continue;

            const [srcX, srcY, w, h] = mod;

            const internalTransform = J2MESprite.B_MAP[flipMode][flags & 7];
            const midp = J2MESprite.B_STATIC[internalTransform];

            const isSwapped = (midp === 5 || midp === 6 || midp === 4 || midp === 7);
            const rendW = isSwapped ? h : w;
            const rendH = isSwapped ? w : h;

            const dw = w * sc;
            const dh = h * sc;
            const rendDw = rendW * sc;
            const rendDh = rendH * sc;

            const partX = centerX + (flipMode === 1 ? -ox : ox) * sc;
            const partY = centerY + oy * sc;

            const destX = (flipMode === 1) ? (partX - rendDw) : partX;
            const destY = partY;

            ctx.save();
            switch (midp) {
                case 0: // TRANS_NONE
                    ctx.drawImage(img, srcX, srcY, w, h, destX, destY, dw, dh);
                    break;
                case 2: // TRANS_MIRROR
                    ctx.translate(destX + dw, destY);
                    ctx.scale(-1, 1);
                    ctx.drawImage(img, srcX, srcY, w, h, 0, 0, dw, dh);
                    break;
                case 1: // TRANS_MIRROR_ROT180
                    ctx.translate(destX, destY + dh);
                    ctx.scale(1, -1);
                    ctx.drawImage(img, srcX, srcY, w, h, 0, 0, dw, dh);
                    break;
                case 3: // TRANS_ROT180
                    ctx.translate(destX + dw, destY + dh);
                    ctx.scale(-1, -1);
                    ctx.drawImage(img, srcX, srcY, w, h, 0, 0, dw, dh);
                    break;
                case 5: // TRANS_ROT90
                    ctx.translate(destX + dh, destY);
                    ctx.rotate(Math.PI / 2);
                    ctx.drawImage(img, srcX, srcY, w, h, 0, 0, dw, dh);
                    break;
                case 6: // TRANS_ROT270
                    ctx.translate(destX, destY + dw);
                    ctx.rotate(-Math.PI / 2);
                    ctx.drawImage(img, srcX, srcY, w, h, 0, 0, dw, dh);
                    break;
                case 7: // TRANS_MIRROR_ROT90
                    ctx.translate(destX + dh, destY + dw);
                    ctx.rotate(Math.PI / 2);
                    ctx.scale(-1, 1);
                    ctx.drawImage(img, srcX, srcY, w, h, 0, 0, dw, dh);
                    break;
                case 4: // TRANS_MIRROR_ROT270
                    ctx.translate(destX, destY);
                    ctx.rotate(Math.PI / 2);
                    ctx.scale(1, -1);
                    ctx.drawImage(img, srcX, srcY, w, h, 0, 0, dw, dh);
                    break;
                default:
                    ctx.drawImage(img, srcX, srcY, w, h, destX, destY, dw, dh);
                    break;
            }
            ctx.restore();
        }
        return true;
    }
}

if (typeof window !== 'undefined') {
    window.J2MESprite = J2MESprite;
}

