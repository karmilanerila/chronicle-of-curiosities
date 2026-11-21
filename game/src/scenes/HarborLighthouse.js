// HarborLighthouse.js — Scene 3: Harbor Café & Lighthouse.
// Sunset sea, a striped lighthouse, a café awning, boats and gulls.
import { rr, circle, ellipse, poly, vgrad, wood, moon, glow, dust, frame, stars } from '../render/ProceduralTextures.js';

export const HarborLighthouse = {
  id: 3,
  name: 'Scene 3 — Harbor Café & Lighthouse',
  short: 'Scene 3 — Harbor & Lighthouse',
  sub: 'Salt air, sunset and the last ferry home',
  diffs: [
    { x: 450, y: 55, r: 34, label: 'lighthouse beam' },
    { x: 150, y: 164, r: 26, label: 'café awning' },
    { x: 300, y: 300, r: 24, label: 'rowboat' },
    { x: 240, y: 66, r: 18, label: 'seagull' },
    { x: 211, y: 290, r: 18, label: 'coffee cup' },
    { x: 202, y: 210, r: 20, label: 'window shutter' },
    { x: 380, y: 70, r: 20, label: 'fish sign' },
  ],
  draw(ctx, W, H, alt) {
    const A = (i) => alt.has(i);
    // sunset sky + sea
    ctx.fillStyle = vgrad(ctx, 0, 0, H, [[0, '#e8a04c'], [0.45, '#d97a5a'], [0.6, '#7a5a6e'], [1, '#2e4a5a']]);
    ctx.fillRect(0, 0, W, H);
    ctx.fillStyle = '#ffe9a8'; circle(ctx, 90, 70, 26); ctx.fill(); glow(ctx, 90, 70, 70, 'rgba(255,220,120,A)', 0.5);
    // sea
    ctx.fillStyle = '#2e5a7a'; ctx.fillRect(0, 230, W, 130);
    ctx.strokeStyle = 'rgba(255,255,255,.4)'; ctx.lineWidth = 2;
    for (const y of [250, 272, 296, 322]) { ctx.beginPath(); for (let x = 0; x < W; x += 24) { ctx.moveTo(x, y + (x % 48 ? 3 : -3)); ctx.lineTo(x + 14, y + (x % 48 ? 3 : -3)); } ctx.stroke(); }
    // lighthouse
    ctx.fillStyle = '#f3e6c8'; poly(ctx, [[500, 230], [510, 60], [540, 60], [550, 230]]); ctx.fill();
    ctx.fillStyle = '#a33b2e'; poly(ctx, [[504, 190], [506, 150], [544, 150], [546, 190]]); ctx.fill();
    poly(ctx, [[508, 110], [510, 78], [542, 78], [544, 110]]); ctx.fill();
    ctx.fillStyle = '#2b2118'; rr(ctx, 506, 48, 38, 14, 3); ctx.fill();
    ctx.fillStyle = '#ffe9a8'; circle(ctx, 525, 55, 7); ctx.fill();
    if (!A(0)) { ctx.fillStyle = 'rgba(255,233,168,.35)'; poly(ctx, [[518, 55], [380, 30], [380, 80]]); ctx.fill(); glow(ctx, 525, 55, 40, 'rgba(255,220,120,A)', 0.5); }
    // café building left
    ctx.fillStyle = '#f3e6c8'; ctx.fillRect(60, 140, 200, 90);
    ctx.fillStyle = '#7a3b2e'; ctx.fillRect(60, 140, 200, 12);
    // awning: stripes vs dots
    if (A(1)) {
      ctx.fillStyle = '#2e5a7a'; for (let x = 52; x < 268; x += 24) { circle(ctx, x + 12, 168, 7); ctx.fill(); }
      ctx.fillStyle = '#f3e6c8'; for (let x = 52; x < 268; x += 24) { circle(ctx, x + 12, 168, 4); ctx.fill(); }
    } else {
      for (let x = 52, i = 0; x < 268; x += 24, i++) { ctx.fillStyle = i % 2 ? '#f3e6c8' : '#a33b2e'; ctx.fillRect(x, 152, 24, 24); }
    }
    ctx.fillStyle = '#2b2118'; rr(ctx, 90, 190, 44, 40, 4); ctx.fill(); rr(ctx, 180, 190, 44, 40, 4); ctx.fill();
    ctx.fillStyle = '#ffe9a8'; rr(ctx, 94, 194, 36, 32, 3); ctx.fill(); rr(ctx, 184, 194, 36, 32, 3); ctx.fill();
    // shutter open vs closed on the café's right window
    if (A(5)) { ctx.fillStyle = '#7a3b2e'; ctx.fillRect(180, 190, 44, 40); ctx.strokeStyle = 'rgba(255,255,255,.4)'; ctx.lineWidth = 2; for (let yy = 196; yy < 226; yy += 8) { ctx.beginPath(); ctx.moveTo(182, yy); ctx.lineTo(222, yy); ctx.stroke(); } }
    // fish sign
    ctx.fillStyle = A(6) ? '#2e5a7a' : '#c9a227'; ellipse(ctx, 380, 70, 26, 12); ctx.fill();
    poly(ctx, [[404, 70], [418, 58], [418, 82]]); ctx.fill();
    ctx.fillStyle = '#2b2118'; circle(ctx, 362, 68, 2.5); ctx.fill();
    // rowboat
    if (!A(2)) {
      ctx.fillStyle = '#6b4a2c'; poly(ctx, [[270, 296], [330, 296], [318, 312], [282, 312]]); ctx.fill();
      ctx.fillStyle = '#3f7a4a'; poly(ctx, [[300, 296], [300, 262], [322, 292]]); ctx.fill();
      ctx.strokeStyle = '#6b4a2c'; ctx.lineWidth = 3; ctx.beginPath(); ctx.moveTo(300, 262); ctx.lineTo(300, 296); ctx.stroke();
    }
    // second boat
    ctx.fillStyle = '#8a6d2b'; poly(ctx, [[430, 320], [480, 320], [470, 332], [440, 332]]); ctx.fill();
    // seagulls
    const gull = (x, y) => { ctx.strokeStyle = '#2b2118'; ctx.lineWidth = 2.5; ctx.beginPath(); ctx.arc(x - 8, y, 8, Math.PI * 1.15, Math.PI * 1.85); ctx.arc(x + 8, y, 8, Math.PI * 1.15, Math.PI * 1.85); ctx.stroke(); };
    gull(180, 48); if (!A(3)) gull(240, 66); gull(300, 42);
    // café table + cup
    wood(ctx, 180, 300, 90, 8, '#6b4a2c', '#3a2812');
    ctx.fillStyle = '#2b2118'; ctx.fillRect(222, 308, 6, 28);
    if (!A(4)) { ctx.fillStyle = '#f3e6c8'; rr(ctx, 200, 284, 22, 14, 3); ctx.fill(); ctx.fillStyle = '#a33b2e'; ctx.fillRect(200, 284, 22, 4); }
    dust(ctx, W, H, 18, 31);
    frame(ctx, W, H, '#8a6d2b');
  },
};
