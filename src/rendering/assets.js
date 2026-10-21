/**
 * Minimal assets loader.
 * Returns placeholder images for background, foreground and player.
 */
export function createGameAssets() {
    const placeholder = (color) => {
        const canvas = document.createElement('canvas');
        canvas.width = 240;
        canvas.height = 320;
        const ctx = canvas.getContext('2d');
        ctx.fillStyle = color;
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        const img = new Image();
        img.src = canvas.toDataURL();
        return img;
    };

    return {
        background: placeholder('#a0d8f1'),
        foreground: placeholder('#f1e0a0'),
        player: placeholder('#ff0000')
    };
}
