/**
 * Boundary entity with default export.
 * Provides simple rectangle collision and rendering.
 */
export class Boundary {
    static width = 48; // default tile width

    constructor({ x = 0, y = 0, width = Boundary.width, height = Boundary.width } = {}) {
        this.position = { x, y };
        this.width = width;
        this.height = height;
    }

    collidesWith(entity) {
        return !(
            entity.position.x + entity.width < this.position.x ||
            entity.position.x > this.position.x + this.width ||
            entity.position.y + entity.height < this.position.y ||
            entity.position.y > this.position.y + this.height
        );
    }

    draw(ctx) {
        ctx.save();
        ctx.fillStyle = 'rgba(255,0,0,0.3)';
        ctx.fillRect(this.position.x, this.position.y, this.width, this.height);
        ctx.restore();
    }
}

export default Boundary;
