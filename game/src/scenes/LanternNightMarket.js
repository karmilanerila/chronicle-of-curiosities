// LanternNightMarket.js — Scene 5: Lantern Night Market.
// Paper lanterns, market stalls, a kite, fruit and a street cat.
import { rr, circle, ellipse, poly, vgrad, wood, lantern, moon, glow, dust, frame, stars, cat } from '../render/ProceduralTextures.js';

export const LanternNightMarket = {
  id: 5,
  name: 'Scene 5 — Lantern Night Market',
  short: 'Scene 5 — Lantern Night Market',
  sub: 'Paper lanterns, sweet stalls and a kite that got away',
  diffs: [
    { x: 150, y: 90, r: 22, label: 'red lantern' },
    { x: 110, y: 205, r: 26, label: 'fruit stall' },
    { x: 475, y: 105, r: 22, label: 'kite' },
    { x: 90, y: 300, r: 22, label: 'street cat' },
    { x: 460, y: 245, r: 20, label: 'banner pattern' },
    { x: 200, y: 120, r: 18, label: 'stall sign' },
    { x: 560, y: 260, r: 18, label: 'tea pot' },
  ],
  draw(ctx, W, H, alt) {
    const A = (i) => alt.has(i);
    // night sky
    ctx.fillStyle = vgrad(ctx, 0, 0, H, [[0, '#141a33'], [0.55, '#3a2a4a'], [1, '#1d2733']]);
    ctx.fillRect(0, 0, W, H);
    stars(ctx, W, 140, 20, 53);
    moon(ctx, 540, 52, 16, A(2) ? false : true);
    // kite in the sky (altered: kite gone, moon full instead)
    if (!A(2)) {
      ctx.strokeStyle = 'rgba(243,230,200,.7)'; ctx.lineWidth = 1.5;
      ctx.beginPath(); ctx.moveTo(475, 105); ctx.quadraticCurveTo(455, 150, 440, 180); ctx.stroke();
      ctx.fillStyle = '#a33b2e'; poly(ctx, [[475, 85], [495, 109], [475, 125], [455, 107]]); ctx.fill();
      ctx.fillStyle = '#e8c766'; poly(ctx, [[475, 125], [483, 143], [471, 141]]); ctx.fill();
    }
    // lantern strings
    ctx.strokeStyle = '#2b2118'; ctx.lineWidth = 2;
    ctx.beginPath(); ctx.moveTo(0, 60); ctx.quadraticCurveTo(308, 110, 616, 60); ctx.stroke();
    ctx.beginPath(); ctx.moveTo(0, 100); ctx.quadraticCurveTo(308, 140, 616, 100); ctx.stroke();
    lantern(ctx, 150, 92, 1.3, A(0) ? '#2e5a7a' : '#ff5a4d', true);
    lantern(ctx, 300, 108, 1.1, '#ffb84d', true);
    lantern(ctx, 460, 92, 1.3, '#ff5a4d', true);
    lantern(ctx, 230, 128, 0.9, '#ff8fb0', true);
    lantern(ctx, 380, 128, 0.9, '#ffb84d', true);
    // stalls
    wood(ctx, 40, 220, 220, 90, '#6b4a2c', '#3a2812');
    wood(ctx, 356, 220, 220, 90, '#5d4126', '#3a2812');
    // stall awnings
    for (let x = 32, i = 0; x < 268; x += 24, i++) { ctx.fillStyle = i % 2 ? '#f3e6c8' : '#a33b2e'; ctx.fillRect(x, 196, 24, 26); }
    for (let x = 348, i = 0; x < 584; x += 24, i++) { ctx.fillStyle = i % 2 ? '#f3e6c8' : '#2e5a7a'; ctx.fillRect(x, 196, 24, 26); }
    // banner on right stall: stripes vs dots
    ctx.fillStyle = '#f3e6c8'; ctx.fillRect(400, 232, 120, 26);
    if (A(4)) { ctx.fillStyle = '#a33b2e'; for (let x = 410; x < 512; x += 18) { circle(ctx, x, 245, 5); ctx.fill(); } }
    else { ctx.fillStyle = '#a33b2e'; for (let x = 404; x < 516; x += 16) ctx.fillRect(x, 236, 6, 18); }
    // fruit stall (left): apples vs oranges
    const fruit = A(1) ? '#e8862e' : '#a33b2e';
    ctx.fillStyle = fruit;
    for (const [fx, fy] of [[90, 218], [110, 218], [130, 218], [100, 202], [120, 202], [110, 186]]) { circle(ctx, fx, fy, 8); ctx.fill(); }
    ctx.fillStyle = '#3f7a4a'; ellipse(ctx, 110, 180, 12, 5); ctx.fill();
    // stall sign
    ctx.fillStyle = '#2b2118'; rr(ctx, 180, 108, 52, 24, 4); ctx.fill();
    ctx.fillStyle = A(5) ? '#7ab8c9' : '#e8c766'; ctx.font = 'bold 13px Georgia'; ctx.textAlign = 'center'; ctx.fillText(A(5) ? 'TEA' : 'FRUIT', 206, 125);
    // tea pot on right stall
    if (!A(6)) {
      ctx.fillStyle = '#2e5a7a'; ellipse(ctx, 560, 262, 16, 12); ctx.fill();
      ctx.fillStyle = '#8a6d2b'; rr(ctx, 556, 244, 8, 8, 3); ctx.fill();
      ctx.strokeStyle = '#2e5a7a'; ctx.lineWidth = 3; ctx.beginPath(); ctx.moveTo(544, 258); ctx.quadraticCurveTo(534, 252, 536, 244); ctx.stroke();
    }
    // street cat
    if (!A(3)) cat(ctx, 90, 322, 1.0, '#2b2b2b', false);
    // cobblestones
    ctx.fillStyle = '#3a3a44'; ctx.fillRect(0, 310, W, 50);
    ctx.strokeStyle = 'rgba(255,255,255,.12)'; ctx.lineWidth = 1.5;
    for (let y = 322; y < 360; y += 14) { ctx.beginPath(); ctx.moveTo(0, y); ctx.lineTo(W, y); ctx.stroke(); }
    for (let x = 0; x < W; x += 34) { ctx.beginPath(); ctx.moveTo(x, 310); ctx.lineTo(x + 12, 360); ctx.stroke(); }
    glow(ctx, 150, 92, 60, 'rgba(255,120,90,A)', 0.25);
    dust(ctx, W, H, 20, 59);
    frame(ctx, W, H, '#8a6d2b');
  },
};
