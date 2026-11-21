// HudOverlay.js — updates the counter, scene name, timer, hints and messages.
export class HudOverlay {
  constructor(doc) {
    this.counter = doc.getElementById('counter');
    this.sceneName = doc.getElementById('sceneName');
    this.sceneSub = doc.getElementById('sceneSub');
    this.timer = doc.getElementById('timer');
    this.hints = doc.getElementById('hints');
    this.score = doc.getElementById('score');
    this.message = doc.getElementById('message');
    this.overlay = doc.getElementById('overlay');
    this.overlayTitle = doc.getElementById('overlayTitle');
    this.overlayText = doc.getElementById('overlayText');
    this.overlayBtn = doc.getElementById('overlayBtn');
  }
  update(snap) {
    this.counter.textContent = `Found: ${snap.foundCount} / 7  •  ${snap.remaining} Remaining`;
    this.sceneName.textContent = snap.scene.short || snap.scene.name;
    this.sceneSub.textContent = snap.scene.sub;
    const mm = Math.floor(snap.timeLeft / 60), ss = String(snap.timeLeft % 60).padStart(2, '0');
    this.timer.textContent = `⏱ ${mm}:${ss}`;
    this.hints.textContent = `🔍 Hints: ${snap.hintsLeft}`;
    this.score.textContent = `Score ${snap.score}`;
  }
  say(text) { this.message.textContent = text; }
  showOverlay(title, text, btn, onClick) {
    this.overlayTitle.textContent = title; this.overlayText.textContent = text;
    this.overlayBtn.textContent = btn; this.overlay.classList.remove('hidden');
    this.overlayBtn.onclick = () => { this.overlay.classList.add('hidden'); if (onClick) onClick(); };
  }
  hideOverlay() { this.overlay.classList.add('hidden'); }
}
