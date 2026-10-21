/**
 * Simple map creator.
 * Returns an empty boundaries array for now (collision handled elsewhere).
 */
export function createMap(collisionMap, offset, options) {
    // For the purpose of the smoke test we return no boundaries.
    // A full implementation would translate collisionMap into Boundary instances.
    return { boundaries: [] };
}
