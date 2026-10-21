/**
 * Sprite entity with default export.
 * Accepts an options object containing position and image.
 */
export class Sprite {
    constructor({ position = { x: 0, y: 0 }, image = null } = {}) {
        this.position = { ...position };
        this.image = image;
    }

    draw(ctx) {
        if (this.image) {
            ctx.drawImage(this.image, this.position.x, this.position.y);
        }
    }
}

export default Sprite;
