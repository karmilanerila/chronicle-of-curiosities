// SoundEffects.js — synthesised Web Audio chimes, thuds and sparkles.
// No audio files: every sound is built from oscillators, so the game stays
// 100% offline and self-contained.
export class SoundEffects {
  constructor() { this.ctx = null; this.enabled = true; }
  ensure() {
    if (!this.ctx) { try { this.ctx = new (window.AudioContext || window.webkitAudioContext)(); } catch (e) { this.ctx = null; } }
    if (this.ctx && this.ctx.state === 'suspended') this.ctx.resume();
    return this.ctx;
  }
  tone(freq, start, dur, type, vol) {
    const ac = this.ensure(); if (!ac || !this.enabled) return;
    const o = ac.createOscillator(), g = ac.createGain();
    o.type = type || 'sine'; o.frequency.value = freq;
    g.gain.setValueAtTime(0.0001, ac.currentTime + start);
    g.gain.exponentialRampToValueAtTime(vol || 0.12, ac.currentTime + start + 0.02);
    g.gain.exponentialRampToValueAtTime(0.0001, ac.currentTime + start + dur);
    o.connect(g); g.connect(ac.destination);
    o.start(ac.currentTime + start); o.stop(ac.currentTime + start + dur + 0.05);
  }
  playFound() { this.tone(660, 0, 0.35, 'sine', 0.14); this.tone(880, 0.09, 0.4, 'sine', 0.12); this.tone(1320, 0.18, 0.5, 'triangle', 0.07); }
  playMiss() { this.tone(160, 0, 0.22, 'triangle', 0.12); this.tone(110, 0.05, 0.25, 'sine', 0.1); }
  playHint() { this.tone(520, 0, 0.3, 'sine', 0.09); this.tone(780, 0.12, 0.35, 'sine', 0.08); }
  playWin() { [523, 659, 784, 1047].forEach((f, i) => this.tone(f, i * 0.13, 0.45, 'triangle', 0.11)); }
  playClick() { this.tone(440, 0, 0.08, 'sine', 0.05); }
}
