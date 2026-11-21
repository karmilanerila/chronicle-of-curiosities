// DifferenceDetector.js — hit-testing for spot-the-difference clicks.
// A click counts when it lands within a difference's radius on either panel.
export class DifferenceDetector {
  constructor(diffs) { this.diffs = diffs; }
  // Returns the index of the difference at (x, y), or -1. Nearest first.
  findAt(x, y) {
    let best = -1, bestD = Infinity;
    this.diffs.forEach((d, i) => {
      const dx = x - d.x, dy = y - d.y, dist = Math.sqrt(dx * dx + dy * dy);
      if (dist <= d.r && dist < bestD) { best = i; bestD = dist; }
    });
    return best;
  }
  label(index) { return this.diffs[index] ? this.diffs[index].label : ''; }
  count() { return this.diffs.length; }
}
