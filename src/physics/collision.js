/**
 * Simple rectangle collision detection used by the game loop.
 */
export function rectangularCollision({ rectangle1, rectangle2 }) {
    const r1 = rectangle1.position || rectangle1;
    const r2 = rectangle2.position || rectangle2;
    const w1 = rectangle1.width || rectangle1.width;
    const h1 = rectangle1.height || rectangle1.height;
    const w2 = rectangle2.width || rectangle2.width;
    const h2 = rectangle2.height || rectangle2.height;

    return (
        r1.x < r2.x + w2 &&
        r1.x + w1 > r2.x &&
        r1.y < r2.y + h2 &&
        r1.y + h1 > r2.y
    );
}
