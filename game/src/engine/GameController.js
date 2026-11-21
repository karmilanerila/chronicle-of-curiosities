// GameController.js — state machine for Chronicle of Curiosities.
// Scenes, found differences, timer, hints, strikes, combo and score.
// Deterministic: no clock reads for gameplay decisions; the timer is a
// countdown driven by a fixed 1s interval, seeded state only.
import { getScene, sceneCount } from '../scenes/SceneCatalog.js';
import { DifferenceDetector } from './DifferenceDetector.js';

export const DIFFS_PER_SCENE = 7;
export const TIME_PER_SCENE = 120;

export class GameController {
  constructor() {
    this.sceneIndex = 0;
    this.found = new Set();
    this.strikes = 0;
    this.hintsLeft = 3;
    this.score = 0;
    this.combo = 0;
    this.timeLeft = TIME_PER_SCENE;
    this.phase = 'title'; // title | playing | paused | sceneDone | won
    this.hintIndex = -1;
    this.onChange = null;
  }
  get scene() { return getScene(this.sceneIndex); }
  get detector() { return new DifferenceDetector(this.scene.diffs); }
  get foundCount() { return this.found.size; }
  get remaining() { return DIFFS_PER_SCENE - this.found.size; }
  get totalFound() { return this.sceneIndex * DIFFS_PER_SCENE + this.found.size; }
  get totalDiffs() { return sceneCount() * DIFFS_PER_SCENE; }
  start() {
    this.sceneIndex = 0; this.score = 0; this.loadScene(0); this.phase = 'playing';
    this.emit();
  }
  loadScene(index) {
    this.sceneIndex = index; this.found = new Set(); this.strikes = 0;
    this.hintsLeft = 3; this.timeLeft = TIME_PER_SCENE; this.hintIndex = -1; this.combo = 0;
  }
  nextScene() {
    if (this.sceneIndex + 1 >= sceneCount()) { this.phase = 'won'; this.emit(); return; }
    this.loadScene(this.sceneIndex + 1); this.phase = 'playing'; this.emit();
  }
  // Click at panel coordinates (x, y) in the 616x360 canvas space.
  click(x, y) {
    if (this.phase !== 'playing') return { type: 'ignored' };
    const idx = this.detector.findAt(x, y);
    if (idx >= 0 && !this.found.has(idx)) {
      this.found.add(idx); this.combo += 1;
      const pts = 100 + (this.combo - 1) * 25 + Math.max(0, this.timeLeft);
      this.score += pts;
      if (this.found.size === DIFFS_PER_SCENE) { this.phase = 'sceneDone'; this.score += 250; }
      this.emit();
      return { type: 'found', index: idx, label: this.detector.label(idx), points: pts };
    }
    if (idx >= 0) return { type: 'already', index: idx };
    this.strikes += 1; this.combo = 0; this.timeLeft = Math.max(0, this.timeLeft - 3);
    this.emit();
    return { type: 'miss', strikes: this.strikes };
  }
  useHint() {
    if (this.phase !== 'playing' || this.hintsLeft <= 0) return -1;
    const unfound = this.scene.diffs.map((d, i) => i).filter((i) => !this.found.has(i));
    if (!unfound.length) return -1;
    this.hintsLeft -= 1;
    // Deterministic hint: the lowest-index unfound difference.
    this.hintIndex = unfound[0]; this.emit();
    return this.hintIndex;
  }
  tick() {
    if (this.phase !== 'playing') return;
    this.timeLeft -= 1;
    if (this.timeLeft <= 0) { this.phase = 'sceneDone'; this.score = Math.max(0, this.score - 50); }
    this.emit();
  }
  togglePause() {
    if (this.phase === 'playing') this.phase = 'paused';
    else if (this.phase === 'paused') this.phase = 'playing';
    this.emit();
  }
  emit() { if (this.onChange) this.onChange(this.snapshot()); }
  snapshot() {
    return {
      phase: this.phase, sceneIndex: this.sceneIndex, scene: this.scene,
      found: new Set(this.found), foundCount: this.foundCount, remaining: this.remaining,
      totalFound: this.totalFound, totalDiffs: this.totalDiffs,
      strikes: this.strikes, hintsLeft: this.hintsLeft, score: this.score,
      combo: this.combo, timeLeft: this.timeLeft, hintIndex: this.hintIndex,
    };
  }
}
