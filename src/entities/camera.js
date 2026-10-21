/**
 * Camera entity with default export.
 * Handles following a target and applying translation to the context.
 */
export class Camera {
    constructor(viewportWidth, viewportHeight, worldWidth = 0, worldHeight = 0) {
        this.viewportWidth = viewportWidth;
        this.viewportHeight = viewportHeight;
        this.worldWidth = worldWidth;
        this.worldHeight = worldHeight;
        this.x = 0;
        this.y = 0;
    }

    follow(target) {
        this.x = target.position.x - this.viewportWidth / 2;
        this.y = target.position.y - this.viewportHeight / 2;

        // Clamp to world bounds if provided
        if (this.worldWidth) {
            this.x = Math.max(0, Math.min(this.x, this.worldWidth - this.viewportWidth));
        }
        if (this.worldHeight) {
            this.y = Math.max(0, Math.min(this.y, this.worldHeight - this.viewportHeight));
        }
    }

    apply(ctx) {
        ctx.setTransform(1, 0, 0, 1, -this.x, -this.y);
    }
}

export default Camera;
