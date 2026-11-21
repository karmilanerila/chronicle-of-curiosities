// ClockmakerWorkshop.js — Scene 1: The Clockmaker's Midnight Workshop.
// Warm lamplight, brick wall, a great wall clock, workbench, gears and a cat.
import { rr, circle, ellipse, poly, vgrad, wood, brick, stars, moon, candle, cat, book, teacup, dust, frame, glow } from '../render/ProceduralTextures.js';

export const ClockmakerWorkshop = {
  id: 1,
  name: "Scene 1 — The Clockmaker's Midnight Workshop",
  short: "Scene 1 — Clockmaker's Workshop",
  sub: 'Gears, candlelight and one very patient cat',
  diffs: [
    { x: 308, y: 118, r: 34, label: 'clock hands' },
    { x: 540, y: 52, r: 24, label: 'moon' },
    { x: 470, y: 296, r: 26, label: 'cat on the bench' },
    { x: 120, y: 300, r: 18, label: 'teacup' },
    { x: 78, y: 100, r: 20, label: 'green book' },
    { x: 210, y: 232, r: 18, label: 'candle flame' },
    { x: 500, y: 170, r: 22, label: 'wall gear' },
  ],
  draw(ctx, W, H, alt) {
    const A = (i) => alt.has(i);
    // wall + floor
    ctx.fillStyle = vgrad(ctx, 0, 0, H, [[0, '#3a2a1c'], [0.7, '#4a3423'], [1, '#2c1e12']]);
    ctx.fillRect(0, 0, W, H);
    brick(ctx, 0, 0, W, 210, '#6b4a34', '#3a2a1c');
    wood(ctx, 0, 300, W, 60, '#5d4126', '#3a2812');
    // window with night sky
    ctx.fillStyle = '#1b2a44'; rr(ctx, 500, 28, 96, 84, 6); ctx.fill();
    ctx.fillStyle = '#0e1830'; rr(ctx, 508, 36, 80, 68, 4); ctx.fill();
    stars(ctx, 80, 68, 10, 7); moon(ctx, 548, 62, 14, A(1));
    ctx.strokeStyle = '#8a6d2b'; ctx.lineWidth = 4; ctx.beginPath(); ctx.moveTo(548, 36); ctx.lineTo(548, 104); ctx.moveTo(508, 70); ctx.lineTo(588, 70); ctx.stroke();
    // shelf with books
    wood(ctx, 56, 120, 180, 10, '#6b4a2c', '#3a2812');
    book(ctx, 66, 84, 18, 36, A(4) ? '#a33b2e' : '#3f7a4a');
    book(ctx, 86, 88, 16, 32, '#c9a227'); book(ctx, 104, 80, 18, 40, '#2e5a7a');
    book(ctx, 124, 90, 15, 30, '#7a3b5a'); book(ctx, 141, 86, 17, 34, '#4a6b3a');
    // great wall clock
    ctx.fillStyle = '#2b1d10'; circle(ctx, 308, 118, 62); ctx.fill();
    ctx.fillStyle = '#f3e6c8'; circle(ctx, 308, 118, 54); ctx.fill();
    ctx.strokeStyle = '#8a6d2b'; ctx.lineWidth = 4; circle(ctx, 308, 118, 54); ctx.stroke();
    ctx.fillStyle = '#2b2118';
    for (let i = 0; i < 12; i++) { const a = i * Math.PI / 6; circle(ctx, 308 + Math.sin(a) * 44, 118 - Math.cos(a) * 44, 3); ctx.fill(); }
    ctx.strokeStyle = '#2b2118'; ctx.lineWidth = 5; ctx.lineCap = 'round';
    ctx.beginPath(); ctx.moveTo(308, 118);
    if (A(0)) { ctx.lineTo(308 + 30, 118 - 18); } else { ctx.lineTo(308 - 22, 118 - 28); }
    ctx.stroke();
    ctx.lineWidth = 3; ctx.beginPath(); ctx.moveTo(308, 118);
    if (A(0)) { ctx.lineTo(308 - 14, 118 + 34); } else { ctx.lineTo(308 + 30, 118 + 10); }
    ctx.stroke();
    circle(ctx, 308, 118, 5); ctx.fill();
    // wall gears
    const gear = (x, y, r, teeth, col) => {
      ctx.fillStyle = col; ctx.save(); ctx.translate(x, y);
      for (let i = 0; i < teeth; i++) { ctx.rotate(Math.PI * 2 / teeth); ctx.fillRect(-3, -r - 6, 6, 8); }
      circle(ctx, 0, 0, r); ctx.fill(); ctx.fillStyle = '#2b1d10'; circle(ctx, 0, 0, r * 0.35); ctx.fill(); ctx.restore();
    };
    gear(430, 170, 20, 8, '#c9a227'); if (!A(6)) gear(500, 170, 16, 7, '#a8873a'); gear(462, 205, 12, 6, '#8a6d2b');
    // workbench tools
    ctx.fillStyle = '#8a6d2b'; rr(ctx, 150, 268, 120, 8, 3); ctx.fill();
    circle(ctx, 180, 250, 10); ctx.fillStyle = '#c9a227'; circle(ctx, 180, 250, 6); ctx.fill();
    ctx.fillStyle = '#2e5a7a'; rr(ctx, 240, 240, 26, 22, 3); ctx.fill();
    // candle
    candle(ctx, 210, 232, 1.2, !A(5));
    // teacup
    teacup(ctx, 120, 296, 1.3, A(3) ? '#2e5a7a' : '#a33b2e');
    // cat on the bench (right)
    if (!A(2)) cat(ctx, 470, 296, 1.1, '#3a3a3a', true);
    // hanging lamp glow + dust
    glow(ctx, 308, 40, 90, 'rgba(255,210,110,A)', 0.22);
    dust(ctx, W, H, 26, 11);
    frame(ctx, W, H, '#8a6d2b');
  },
};
