class Portal {
    static width = 48;
    static height = 48;

    constructor({
        position,
        width = 48,
        height = 48,
        targetMap,
        targetPlayerPos = { x: 488, y: 254 },
        targetOffset = { x: 0, y: 0 },
        name = 'Cổng Dịch Chuyển'
    }) {
        this.position = { ...position };
        this.width = width;
        this.height = height;
        this.targetMap = targetMap;
        this.targetPlayerPos = targetPlayerPos;
        this.targetOffset = targetOffset;
        this.name = name;
    }

    draw(ctx, debug = false) {
        if (!debug || !ctx) return;
        ctx.save();
        ctx.fillStyle = 'rgba(52, 152, 219, 0.45)';
        ctx.fillRect(Math.round(this.position.x), Math.round(this.position.y), this.width, this.height);
        ctx.strokeStyle = 'rgba(41, 128, 185, 0.9)';
        ctx.lineWidth = 2;
        ctx.strokeRect(Math.round(this.position.x), Math.round(this.position.y), this.width, this.height);

        // Chữ Portal nhỏ
        ctx.fillStyle = '#ffffff';
        ctx.font = '10px sans-serif';
        ctx.fillText('PORTAL', Math.round(this.position.x) + 4, Math.round(this.position.y) + 26);
        ctx.restore();
    }
}

if (typeof window !== 'undefined') {
    window.Portal = Portal;
}

