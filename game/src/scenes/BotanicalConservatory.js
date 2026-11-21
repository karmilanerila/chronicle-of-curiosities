// BotanicalConservatory.js — Scene 2: Botanical Conservatory at Dusk.
// Arched glasshouse, orchids, a pond, lanterns, a frog and a butterfly.
import { rr, circle, ellipse, poly, vgrad, wood, foliage, lantern, glow, dust, frame, stars } from '../render/ProceduralTextures.js';

export const BotanicalConservatory = {
  id: 2,
  name: 'Scene 2 — Botanical Conservatory at Dusk',
  short: 'Scene 2 — Botanical Conservatory',
  sub: 'Orchids, lantern light and a pond that hums',
  diffs: [
    { x: 120, y: 90, r: 22, label: 'lantern' },
    { x: 308, y: 180, r: 26, label: 'orchid bloom' },
    { x: 520, y: 306, r: 24, label: 'frog on the pond' },
    { x: 90, y: 300, r: 22, label: 'watering can' },
    { x: 430, y: 70, r: 20, label: 'butterfly' },
    { x: 200, y: 210, r: 24, label: 'potted fern' },
    { x: 560, y: 120, r: 18, label: 'glass pane' },
  ],
  draw(ctx, W, H, alt) {
    const A = (i) => alt.has(i);
    // dusk sky through glass
    ctx.fillStyle = vgrad(ctx, 0, 0, H, [[0, '#2c3e5a'], [0.55, '#7a5a6e'], [1, '#3a4a2c']]);
    ctx.fillRect(0, 0, W, H);
    stars(ctx, W, 120, 14, 21);
    // glass arches
    ctx.strokeStyle = '#1d2a1e'; ctx.lineWidth = 8;
    for (const x of [0, 154, 308, 462, 616]) { ctx.beginPath(); ctx.moveTo(x, 300); ctx.lineTo(x, 90); ctx.quadraticCurveTo(x + 77, 10, x + 154, 90); ctx.lineTo(x + 154, 300); ctx.stroke(); }
    ctx.strokeStyle = 'rgba(243,230,200,.5)'; ctx.lineWidth = 2;
    for (const x of [77, 231, 385, 539]) { ctx.beginPath(); ctx.moveTo(x, 300); ctx.lineTo(x, 80); ctx.stroke(); }
    // floor + pond
    ctx.fillStyle = '#4a5a34'; ctx.fillRect(0, 300, W, 60);
    ctx.fillStyle = '#2e5a6e'; ellipse(ctx, 520, 322, 82, 20); ctx.fill();
    ctx.fillStyle = '#7ab8c9'; ellipse(ctx, 520, 318, 62, 13); ctx.fill();
    ctx.strokeStyle = 'rgba(255,255,255,.5)'; ctx.lineWidth = 1.5;
    ctx.beginPath(); ctx.ellipse(500, 318, 30, 5, 0, 0, Math.PI * 2); ctx.stroke();
    // frog on the pond
    if (!A(2)) {
      ctx.fillStyle = '#4a8a3a'; ellipse(ctx, 520, 306, 16, 10); ctx.fill();
      circle(ctx, 512, 296, 6); ctx.fill(); circle(ctx, 528, 296, 6); ctx.fill();
      ctx.fillStyle = '#fff'; circle(ctx, 511, 294, 2.5); ctx.fill(); circle(ctx, 529, 294, 2.5); ctx.fill();
    }
    // lanterns
    lantern(ctx, 120, 92, 1.2, '#ffb84d', !A(0));
    lantern(ctx, 300, 70, 1.0, '#ffb84d', true);
    lantern(ctx, 500, 92, 1.2, '#ffb84d', true);
    // orchid centrepiece
    ctx.fillStyle = '#7a3b5a';
    for (const [dx, dy] of [[-16, -8], [16, -8], [-12, 12], [12, 12], [0, -18]]) { ellipse(ctx, 308 + dx, 180 + dy, 12, 9); ctx.fill(); }
    ctx.fillStyle = A(1) ? '#e8c766' : '#ff8fb0'; circle(ctx, 308, 180, 8); ctx.fill();
    ctx.strokeStyle = '#3f7a4a'; ctx.lineWidth = 4; ctx.beginPath(); ctx.moveTo(308, 196); ctx.lineTo(308, 250); ctx.stroke();
    foliage(ctx, 308, 258, 22, '#3f7a4a', '#5a9a5a');
    // potted fern
    if (!A(5)) {
      ctx.fillStyle = '#a33b2e'; rr(ctx, 180, 250, 40, 26, 4); ctx.fill();
      ctx.strokeStyle = '#2e5a3a'; ctx.lineWidth = 4;
      for (const a of [-0.9, -0.45, 0, 0.45, 0.9]) { ctx.beginPath(); ctx.moveTo(200, 250); ctx.quadraticCurveTo(200 + Math.sin(a) * 34, 210, 200 + Math.sin(a) * 48, 192); ctx.stroke(); }
    }
    // butterfly
    if (!A(4)) {
      ctx.fillStyle = '#e8c766';
      ellipse(ctx, 420, 64, 10, 7); ctx.fill(); ellipse(ctx, 442, 64, 10, 7); ctx.fill();
      ellipse(ctx, 422, 78, 7, 5); ctx.fill(); ellipse(ctx, 440, 78, 7, 5); ctx.fill();
      ctx.fillStyle = '#2b2118'; circle(ctx, 431, 70, 3); ctx.fill();
    }
    // watering can
    ctx.fillStyle = A(3) ? '#2e5a7a' : '#3f7a4a'; rr(ctx, 66, 286, 48, 22, 5); ctx.fill();
    ctx.fillStyle = '#8a6d2b'; rr(ctx, 104, 280, 22, 6, 3); ctx.fill();
    // cracked / intact pane (top right)
    if (A(6)) {
      ctx.strokeStyle = 'rgba(255,255,255,.85)'; ctx.lineWidth = 2;
      ctx.beginPath(); ctx.moveTo(548, 108); ctx.lineTo(566, 122); ctx.lineTo(556, 134); ctx.moveTo(566, 122); ctx.lineTo(580, 112); ctx.stroke();
    }
    // big leaves left + right
    foliage(ctx, 40, 240, 30, '#2e5a3a', '#4a8a4a');
    foliage(ctx, 580, 260, 26, '#2e5a3a', '#4a8a4a');
    dust(ctx, W, H, 22, 23);
    frame(ctx, W, H, '#3f5a34');
  },
};
