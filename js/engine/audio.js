class SoundEngine {
    constructor() {
        this.ctx = null;
        this.muted = false;
    }

    getContext() {
        if (!this.ctx) {
            const AudioContextClass = window.AudioContext || window.webkitAudioContext;
            if (AudioContextClass) {
                this.ctx = new AudioContextClass();
            }
        }
        if (this.ctx && this.ctx.state === 'suspended') {
            this.ctx.resume();
        }
        return this.ctx;
    }

    toggleMute() {
        this.muted = !this.muted;
        return this.muted;
    }

    playTone(freq, type = 'square', duration = 0.1, volume = 0.15) {
        if (this.muted) return;
        try {
            const ctx = this.getContext();
            if (!ctx) return;
            const osc = ctx.createOscillator();
            const gain = ctx.createGain();
            osc.type = type;
            osc.frequency.setValueAtTime(freq, ctx.currentTime);
            gain.gain.setValueAtTime(volume, ctx.currentTime);
            gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + duration);
            osc.connect(gain);
            gain.connect(ctx.destination);
            osc.start();
            osc.stop(ctx.currentTime + duration);
        } catch (_) {}
    }

    playMenuSelect() {
        this.playTone(523.25, 'triangle', 0.06, 0.12);
    }

    playMenuClick() {
        this.playTone(659.25, 'square', 0.08, 0.15);
    }

    playBump() {
        this.playTone(85, 'sine', 0.1, 0.2);
    }

    playGrass() {
        this.playTone(160, 'triangle', 0.05, 0.06);
    }

    playWarp() {
        if (this.muted) return;
        const notes = [300, 450, 600, 750, 900];
        notes.forEach((freq, idx) => {
            setTimeout(() => this.playTone(freq, 'sine', 0.1, 0.15), idx * 60);
        });
    }

    playBattleStart() {
        if (this.muted) return;
        const notes = [261.63, 329.63, 392.00, 523.25, 659.25, 783.99];
        notes.forEach((freq, idx) => {
            setTimeout(() => this.playTone(freq, 'square', 0.12, 0.18), idx * 70);
        });
    }

    playVictory() {
        if (this.muted) return;
        const notes = [440, 440, 440, 554.37, 659.25, 880];
        notes.forEach((freq, idx) => {
            setTimeout(() => this.playTone(freq, 'square', 0.14, 0.2), idx * 100);
        });
    }

    playCatchSuccess() {
        if (this.muted) return;
        const notes = [392, 523.25, 659.25, 1046.5];
        notes.forEach((freq, idx) => {
            setTimeout(() => this.playTone(freq, 'triangle', 0.18, 0.22), idx * 120);
        });
    }

    playFlee() {
        if (this.muted) return;
        const notes = [600, 480, 360, 240];
        notes.forEach((freq, idx) => {
            setTimeout(() => this.playTone(freq, 'sawtooth', 0.09, 0.12), idx * 60);
        });
    }

    playAttack() {
        this.playTone(220, 'sawtooth', 0.12, 0.18);
    }
}

window.soundEngine = new SoundEngine();

