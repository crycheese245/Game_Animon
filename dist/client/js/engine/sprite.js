class Sprite {
    constructor({
        position,
        image,
        frames = { max: 1, hold: 10 },
        sprites,
        animate = false,
        opacity = 1,
        width,
        height,
        fallbackColor = '#27ae60'
    }) {
        this.position = { ...position };
        this.image = image;
        this.frames = { ...frames, val: 0, elapsed: 0 };
        this.sprites = sprites;
        this.moving = false;
        this.animate = animate;
        this.opacity = opacity;
        this.fallbackColor = fallbackColor;

        this.width = width || 48;
        this.height = height || 48;

        const updateSize = () => {
            if (this.image) {
                const w = this.image.naturalWidth || this.image.width;
                const h = this.image.naturalHeight || this.image.height;
                if (w > 0) {
                    this.width = width || (w / this.frames.max);
                    this.height = height || h;
                }
            }
        };

        if (this.image) {
            const isCanvas = (typeof HTMLCanvasElement !== 'undefined' && this.image instanceof HTMLCanvasElement);
            if (isCanvas || (this.image.complete && (this.image.naturalWidth || this.image.width) > 0)) {
                updateSize();
            } else if (this.image.addEventListener) {
                this.image.addEventListener('load', updateSize);
            }
        }
    }

    draw(ctx) {
        if (!ctx) return;

        ctx.save();
        ctx.globalAlpha = this.opacity;

        const isCanvas = (typeof HTMLCanvasElement !== 'undefined' && this.image instanceof HTMLCanvasElement);
        const imgW = this.image ? (this.image.naturalWidth || this.image.width || 0) : 0;
        const imgH = this.image ? (this.image.naturalHeight || this.image.height || 0) : 0;
        const isReady = this.image && (isCanvas || (this.image.complete && imgW > 0));

        // Nếu ảnh hoặc canvas đã sẵn sàng: vẽ bằng drawImage
        if (isReady && imgW > 0) {
            const cropWidth = imgW / this.frames.max;
            const cropHeight = imgH;
            const renderWidth = this.width || cropWidth;
            const renderHeight = this.height || cropHeight;

            ctx.drawImage(
                this.image,
                this.frames.val * cropWidth,
                0,
                cropWidth,
                cropHeight,
                Math.round(this.position.x),
                Math.round(this.position.y),
                renderWidth,
                renderHeight
            );
        } else {
            // DỰ PHÒNG: Nếu ảnh đang tải, vẽ một khối màu pixel để không bao giờ bị đen màn hình
            ctx.fillStyle = this.fallbackColor;
            ctx.fillRect(
                Math.round(this.position.x),
                Math.round(this.position.y),
                this.width || 48,
                this.height || 48
            );
        }

        ctx.restore();

        if (!this.moving && !this.animate) {
            this.frames.val = 0;
            return;
        }

        if (this.frames.max > 1) {
            this.frames.elapsed++;
        }

        const hold = this.frames.hold || 10;
        if (this.frames.elapsed % hold === 0) {
            if (this.frames.val < this.frames.max - 1) {
                this.frames.val++;
            } else {
                this.frames.val = 0;
            }
        }
    }
}

if (typeof window !== 'undefined') {
    window.Sprite = Sprite;
}
