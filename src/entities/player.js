/**
 * Player entity with default export.
 * Minimal implementation sufficient for the game loop.
 */
export class Player {
    constructor({ position = { x: 0, y: 0 }, assets = {} } = {}) {
        this.position = { ...position };
        this.velocity = { x: 0, y: 0 };
        this.width = 48;
        this.height = 48;
        this.assets = assets;
        this.image = assets.player || null;
    }

    draw(ctx) {
        if (this.image) {
            ctx.drawImage(this.image, this.position.x, this.position.y);
        } else {
            ctx.save();
            ctx.fillStyle = '#0000ff';
            ctx.fillRect(this.position.x, this.position.y, this.width, this.height);
            ctx.restore();
        }
    }
}

export default Player;
