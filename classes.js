class Sprite {
    constructor({
        position,
        velocity,
        image,
        frames = { max: 1, hold: 10 },
        sprites,
        animate = false,
        rotation = 0
    }) {
        this.position = position;
        this.image = image;
        this.frames = { ...frames, val: 0, elapsed: 0 };
        this.sprites = sprites;
        this.moving = false;
        this.animate = animate;
        this.opacity = 1;
        this.rotation = rotation;

        this.width = 48;
        this.height = 48;

        const updateDimensions = () => {
            if (this.image && this.image.naturalWidth) {
                this.width = this.image.naturalWidth / this.frames.max;
                this.height = this.image.naturalHeight;
            }
        };

        if (this.image) {
            if (this.image.complete && this.image.naturalWidth > 0) {
                updateDimensions();
            } else {
                this.image.addEventListener('load', updateDimensions);
            }
        }
    }

    draw(ctx) {
        const renderCtx = ctx || (typeof c !== 'undefined' ? c : null);
        if (!renderCtx || !this.image || !this.image.complete || this.image.naturalWidth === 0) return;

        renderCtx.save();
        renderCtx.globalAlpha = this.opacity;

        const cropWidth = this.image.naturalWidth / this.frames.max;
        const cropHeight = this.image.naturalHeight;
        const currentFrameWidth = this.width || cropWidth;
        const currentFrameHeight = this.height || cropHeight;

        renderCtx.drawImage(
            this.image,
            this.frames.val * cropWidth,
            0,
            cropWidth,
            cropHeight,
            Math.round(this.position.x),
            Math.round(this.position.y),
            currentFrameWidth,
            currentFrameHeight
        );

        renderCtx.restore();

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

class Boundary {
    static width = 48;
    static height = 48;
    constructor({ position }) {
        this.position = position;
        this.width = 48;
        this.height = 48;
    }

    draw(ctx, debug = false) {
        if (!debug) return;
        const renderCtx = ctx || (typeof c !== 'undefined' ? c : null);
        if (!renderCtx) return;

        renderCtx.save();
        renderCtx.fillStyle = 'rgba(231, 76, 60, 0.4)';
        renderCtx.fillRect(
            Math.round(this.position.x),
            Math.round(this.position.y),
            this.width,
            this.height
        );
        renderCtx.strokeStyle = 'rgba(192, 57, 43, 0.8)';
        renderCtx.lineWidth = 1;
        renderCtx.strokeRect(
            Math.round(this.position.x),
            Math.round(this.position.y),
            this.width,
            this.height
        );
        renderCtx.restore();
    }
}

class BattleZone {
    static width = 48;
    static height = 48;
    constructor({ position }) {
        this.position = position;
        this.width = 48;
        this.height = 48;
    }

    draw(ctx, debug = false) {
        if (!debug) return;
        const renderCtx = ctx || (typeof c !== 'undefined' ? c : null);
        if (!renderCtx) return;

        renderCtx.save();
        renderCtx.fillStyle = 'rgba(46, 204, 113, 0.35)';
        renderCtx.fillRect(
            Math.round(this.position.x),
            Math.round(this.position.y),
            this.width,
            this.height
        );
        renderCtx.strokeStyle = 'rgba(39, 174, 96, 0.8)';
        renderCtx.lineWidth = 1;
        renderCtx.strokeRect(
            Math.round(this.position.x),
            Math.round(this.position.y),
            this.width,
            this.height
        );
        renderCtx.restore();
    }
}
