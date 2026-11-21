// DualCanvasRenderer.js — draws both panels, found markers, hint ring and loupe.
// The right panel is the altered twin: every active difference is drawn in its
// altered form there, while the left panel always shows the original.
import { circle } from './ProceduralTextures.js';

export class DualCanvasRenderer {
  constructor(canvasA, canvasB) {
    this.a = canvasA; this.b = canvasB;
    this.ctxA = canvasA.getContext('2d'); this.ctxB = canvasB.getContext('2d');
    this.W = canvasA.width; this.H = canvasA.height;
  }
  render(scene, found, hintIndex) {
    const altered = new Set(scene.diffs.map((d, i) => i));
    scene.draw(this.ctxA, this.W, this.H, new Set());
    scene.draw(this.ctxB, this.W, this.H, altered);
    for (const idx of found) this.drawMarker(this.ctxA, scene.diffs[idx], '#e8c766');
    for (const idx of found) this.drawMarker(this.ctxB, scene.diffs[idx], '#3fae7a');
    if (hintIndex >= 0 && !found.has(hintIndex)) {
      const d = scene.diffs[hintIndex];
      const pulse = 1 + 0.12 * Math.sin(Date.now() / 280);
      for (const ctx of [this.ctxA, this.ctxB]) {
        ctx.strokeStyle = 'rgba(232,199,102,.9)'; ctx.lineWidth = 3;
        ctx.setLineDash([8, 6]); circle(ctx, d.x, d.y, d.r * pulse + 6); ctx.stroke(); ctx.setLineDash([]);
      }
    }
  }
  drawMarker(ctx, diff, color) {
    ctx.save();
    ctx.strokeStyle = color; ctx.lineWidth = 4; ctx.lineCap = 'round';
    ctx.beginPath();
    ctx.ellipse(diff.x, diff.y, diff.r + 4, diff.r * 0.82 + 4, -0.12, Math.PI * 0.9, Math.PI * 2.6);
    ctx.stroke();
    ctx.strokeStyle = 'rgba(255,255,255,.85)'; ctx.lineWidth = 1.5;
    ctx.beginPath(); ctx.ellipse(diff.x, diff.y, diff.r + 8, diff.r * 0.82 + 8, -0.12, Math.PI * 1.1, Math.PI * 2.2); ctx.stroke();
    // small check tick at the marker's edge
    ctx.strokeStyle = color; ctx.lineWidth = 3.5;
    ctx.beginPath(); ctx.moveTo(diff.x + diff.r - 2, diff.y - diff.r - 2); ctx.lineTo(diff.x + diff.r + 6, diff.y - diff.r + 4); ctx.lineTo(diff.x + diff.r + 14, diff.y - diff.r - 8); ctx.stroke();
    ctx.restore();
  }
}
