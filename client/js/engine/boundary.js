class Boundary {
    static width = 48;
    static height = 48;

    constructor({ position, width = 48, height = 48 }) {
        this.position = { ...position };
        this.width = width;
        this.height = height;
    }

    draw(ctx, debug = false) {
        if (!debug || !ctx) return;
        ctx.save();
        ctx.fillStyle = 'rgba(231, 76, 60, 0.4)';
        ctx.fillRect(Math.round(this.position.x), Math.round(this.position.y), this.width, this.height);
        ctx.strokeStyle = 'rgba(192, 57, 43, 0.8)';
        ctx.lineWidth = 1;
        ctx.strokeRect(Math.round(this.position.x), Math.round(this.position.y), this.width, this.height);
        ctx.restore();
    }
}

class BattleZone {
    static width = 48;
    static height = 48;

    constructor({ position, width = 48, height = 48 }) {
        this.position = { ...position };
        this.width = width;
        this.height = height;
    }

    draw(ctx, debug = false) {
        if (!debug || !ctx) return;
        ctx.save();
        ctx.fillStyle = 'rgba(46, 204, 113, 0.35)';
        ctx.fillRect(Math.round(this.position.x), Math.round(this.position.y), this.width, this.height);
        ctx.strokeStyle = 'rgba(39, 174, 96, 0.8)';
        ctx.lineWidth = 1;
        ctx.strokeRect(Math.round(this.position.x), Math.round(this.position.y), this.width, this.height);
        ctx.restore();
    }
}

if (typeof window !== 'undefined') {
    window.Boundary = Boundary;
    window.BattleZone = BattleZone;
}

