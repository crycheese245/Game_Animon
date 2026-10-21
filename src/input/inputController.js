/**
 * Input controller with default export.
 * Handles arrow keys and updates the attached player's velocity.
 */
export default class InputController {
    constructor(player) {
        this.player = player;
        this.keys = {};

        window.addEventListener('keydown', (e) => this._onKey(e, true));
        window.addEventListener('keyup', (e) => this._onKey(e, false));
    }

    _onKey(e, isDown) {
        const map = {
            ArrowUp: 'up',
            ArrowDown: 'down',
            ArrowLeft: 'left',
            ArrowRight: 'right',
            w: 'up',
            a: 'left',
            s: 'down',
            d: 'right'
        };
        const dir = map[e.key];
        if (dir) {
            this.keys[dir] = isDown;
            this._updatePlayerVelocity();
        }
    }

    _updatePlayerVelocity() {
        const speed = 3;
        this.player.velocity.x = 0;
        this.player.velocity.y = 0;
        if (this.keys.left) this.player.velocity.x = -speed;
        if (this.keys.right) this.player.velocity.x = speed;
        if (this.keys.up) this.player.velocity.y = -speed;
        if (this.keys.down) this.player.velocity.y = speed;
    }

    update() {
        // No additional per‑frame logic needed for this stub.
    }
}
