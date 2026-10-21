/**
 * Minimal TilemapRenderer class with default export.
 * Provides the methods used by main.js.
 */
export default class TilemapRenderer {
    constructor({ context, tileSize }) {
        this.context = context;
        this.tileSize = tileSize;
        this.width = 70;   // fallback dimensions
        this.height = 40;
    }

    load(mapData) {
        this.mapData = mapData;
    }

    createCollisionMap({ blockedTileIds, collisionLayer }) {
        // Return an empty array; real collision data not needed for smoke test.
        return [];
    }

    render({ offset }) {
        // Simple background fill to visualize the canvas.
        this.context.save();
        this.context.fillStyle = '#6b9b45';
        this.context.fillRect(offset.x, offset.y, this.width * this.tileSize, this.height * this.tileSize);
        this.context.restore();
    }
}
