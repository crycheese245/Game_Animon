import { rectangularCollision } from '../physics/collision.js';
import { createKeyboardInput } from '../input/keyboard.js';

export function createGameLoop({
    context,
    canvas,
    camera,
    player,
    background,
    foreground,
    boundaries,
    movableObjects,
    input = createKeyboardInput()
}) {
    function movePlayer() {
        const direction = input.getLastKey();
        const movement = {
            w: { x: 0, y: 3, axis: 'y', image: player.sprites.up },
            a: { x: 3, y: 0, axis: 'x', image: player.sprites.left },
            s: { x: 0, y: -3, axis: 'y', image: player.sprites.down },
            d: { x: -3, y: 0, axis: 'x', image: player.sprites.right }
        }[direction];

        if (!movement || !input.keys[direction].pressed) {
            player.moving = false;
            return;
        }

        player.moving = true;
        player.image = movement.image;

        const blocked = boundaries.some((boundary) => {
            const position = {
                x: boundary.position.x + (movement.axis === 'x' ? movement.x : 0),
                y: boundary.position.y + (movement.axis === 'y' ? movement.y : 0)
            };

            return rectangularCollision({
                rectangle1: player,
                rectangle2: { ...boundary, position }
            });
        });

        if (!blocked) {
            movableObjects.forEach((object) => {
                object.position.x -= movement.x;
                object.position.y -= movement.y;
            });
        }
    }

    function animate() {
        window.requestAnimationFrame(animate);
        camera.follow(player);
        camera.apply(context);

        background.draw(context);
        boundaries.forEach((boundary) => boundary.draw(context));
        player.draw(context);
        foreground.draw(context);

        movePlayer();
        context.setTransform(1, 0, 0, 1, 0, 0);
    }

    return { start: animate };
}
