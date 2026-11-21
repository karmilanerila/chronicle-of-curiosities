// ObservatoryLibrary.js — Scene 4: Grand Observatory Library.
// Dome, brass telescope, tall bookshelves, a globe and a ringed planet chart.
import { rr, circle, ellipse, poly, vgrad, wood, brick, book, candle, cat, glow, dust, frame, stars, moon } from '../render/ProceduralTextures.js';

export const ObservatoryLibrary = {
  id: 4,
  name: 'Scene 4 — Grand Observatory Library',
  short: 'Scene 4 — Observatory Library',
  sub: 'Star charts, old books and one brass telescope',
  diffs: [
    { x: 308, y: 150, r: 30, label: 'telescope angle' },
    { x: 500, y: 280, r: 24, label: 'globe' },
    { x: 35, y: 152, r: 20, label: 'red book' },
    { x: 540, y: 60, r: 20, label: 'planet chart' },
    { x: 200, y: 300, r: 22, label: 'sleeping cat' },
    { x: 430, y: 260, r: 16, label: 'candle' },
    { x: 90, y: 305, r: 18, label: 'scroll' },
  ],
  draw(ctx, W, H, alt) {
    const A = (i) => alt.has(i);
    // dome sky
    ctx.fillStyle = vgrad(ctx, 0, 0, H, [[0, '#0e1830'], [0.6, '#1b2a44'], [1, '#3a2a1c']]);
    ctx.fillRect(0, 0, W, H);
    stars(ctx, W, 180, 26, 41);
    // dome arch
    ctx.fillStyle = '#2b3a4a'; ctx.beginPath(); ctx.arc(308, 300, 210, Math.PI, 0); ctx.fill();
    ctx.fillStyle = '#0e1830'; ctx.beginPath(); ctx.arc(308, 300, 190, Math.PI, 0); ctx.fill();
    stars(ctx, 380, 160, 18, 43);
    moon(ctx, 420, 80, 18, false);
    // planet chart (ringed vs plain)
    ctx.fillStyle = '#c9a227'; circle(ctx, 540, 60, 14); ctx.fill();
    if (!A(3)) { ctx.strokeStyle = '#e8c766'; ctx.lineWidth = 3; ctx.beginPath(); ctx.ellipse(540, 60, 26, 8, -0.4, 0, Math.PI * 2); ctx.stroke(); }
    // bookshelves left + right
    for (const bx of [20, 496]) {
      wood(ctx, bx, 120, 100, 190, '#5d4126', '#3a2812');
      for (let s = 0; s < 3; s++) {
        const y = 132 + s * 56;
        const cols = ['#a33b2e', '#2e5a7a', '#3f7a4a', '#c9a227', '#7a3b5a'];
        for (let b = 0; b < 5; b++) book(ctx, bx + 8 + b * 18, y, 15, 40, cols[(b + s) % 5]);
        if (bx === 20 && s === 0 && A(2)) { ctx.fillStyle = '#5d4126'; ctx.fillRect(bx + 8, y, 15, 40); }
      }
    }
    // telescope on tripod
    ctx.strokeStyle = '#8a6d2b'; ctx.lineWidth = 5;
    ctx.beginPath(); ctx.moveTo(308, 250); ctx.lineTo(268, 320); ctx.moveTo(308, 250); ctx.lineTo(348, 320); ctx.moveTo(308, 250); ctx.lineTo(308, 320); ctx.stroke();
    ctx.save(); ctx.translate(308, 150); ctx.rotate(A(0) ? 0.5 : -0.35);
    ctx.fillStyle = '#c9a227'; rr(ctx, -70, -12, 140, 24, 10); ctx.fill();
    ctx.fillStyle = '#8a6d2b'; rr(ctx, 55, -16, 22, 32, 6); ctx.fill();
    ctx.fillStyle = '#7ab8c9'; circle(ctx, 80, 0, 9); ctx.fill();
    ctx.restore();
    // desk
    wood(ctx, 150, 300, 316, 14, '#6b4a2c', '#3a2812');
    ctx.fillStyle = '#2b1d10'; ctx.fillRect(160, 314, 10, 34); ctx.fillRect(446, 314, 10, 34);
    // globe
    ctx.fillStyle = A(1) ? '#7a3b5a' : '#2e5a7a'; circle(ctx, 500, 280, 18); ctx.fill();
    ctx.fillStyle = '#3f7a4a'; ellipse(ctx, 494, 276, 8, 6); ctx.fill(); ellipse(ctx, 506, 286, 6, 5); ctx.fill();
    ctx.strokeStyle = '#c9a227'; ctx.lineWidth = 2; circle(ctx, 500, 280, 18); ctx.stroke();
    // candle on desk
    candle(ctx, 430, 268, 1.1, !A(5));
    // scroll
    if (!A(6)) {
      ctx.fillStyle = '#f3e6c8'; rr(ctx, 66, 296, 48, 18, 4); ctx.fill();
      ctx.fillStyle = '#a33b2e'; ctx.fillRect(66, 296, 4, 18); ctx.fillRect(110, 296, 4, 18);
      ctx.strokeStyle = '#2b2118'; ctx.lineWidth = 1.5; ctx.beginPath(); ctx.moveTo(76, 305); ctx.lineTo(104, 305); ctx.stroke();
    }
    // cat sleeping on desk rug
    if (!A(4)) cat(ctx, 200, 322, 1.0, '#c9a227', true);
    // star chart on wall
    ctx.fillStyle = '#f3e6c8'; rr(ctx, 250, 40, 116, 44, 4); ctx.fill();
    ctx.fillStyle = '#2b2118'; circle(ctx, 280, 62, 3); ctx.fill(); circle(ctx, 320, 56, 3); ctx.fill(); circle(ctx, 340, 72, 3); ctx.fill();
    ctx.strokeStyle = '#2b2118'; ctx.lineWidth = 1.5; ctx.beginPath(); ctx.moveTo(280, 62); ctx.lineTo(320, 56); ctx.lineTo(340, 72); ctx.stroke();
    glow(ctx, 308, 150, 80, 'rgba(255,220,120,A)', 0.18);
    dust(ctx, W, H, 24, 47);
    frame(ctx, W, H, '#8a6d2b');
  },
};
