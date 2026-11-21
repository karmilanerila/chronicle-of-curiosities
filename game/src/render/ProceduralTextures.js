// ProceduralTextures.js — layered painterly helpers for Chronicle of Curiosities.
// Every helper draws with plain Canvas 2D: gradients, soft shadows, wood/brick/
// fabric patterns, glow and foliage, so each scene reads as a hand-painted
// illustration rather than flat geometry. No external assets, no network.
export function rr(ctx, x, y, w, h, r) {
  ctx.beginPath();
  ctx.moveTo(x + r, y); ctx.arcTo(x + w, y, x + w, y + h, r); ctx.arcTo(x + w, y + h, x, y + h, r);
  ctx.arcTo(x, y + h, x, y, r); ctx.arcTo(x, y, x + w, y, r); ctx.closePath();
}
export function circle(ctx, x, y, r) { ctx.beginPath(); ctx.arc(x, y, r, 0, Math.PI * 2); }
export function ellipse(ctx, x, y, rx, ry) { ctx.beginPath(); ctx.ellipse(x, y, rx, ry, 0, 0, Math.PI * 2); }
export function poly(ctx, pts) {
  ctx.beginPath(); ctx.moveTo(pts[0][0], pts[0][1]);
  for (let i = 1; i < pts.length; i++) ctx.lineTo(pts[i][0], pts[i][1]);
  ctx.closePath();
}
export function vgrad(ctx, x, y, h, stops) {
  const g = ctx.createLinearGradient(x, y, x, y + h);
  for (const [o, c] of stops) g.addColorStop(o, c);
  return g;
}
export function sky(ctx, w, h, top, mid, bot) {
  ctx.fillStyle = vgrad(ctx, 0, 0, h, [[0, top], [0.6, mid], [1, bot]]);
  ctx.fillRect(0, 0, w, h);
}
export function stars(ctx, w, h, n, seed) {
  let s = seed;
  const rnd = () => (s = (s * 16807) % 2147483647) / 2147483647;
  ctx.fillStyle = '#fff8d0';
  for (let i = 0; i < n; i++) {
    const x = rnd() * w, y = rnd() * h * 0.55, r = 0.6 + rnd() * 1.4;
    ctx.globalAlpha = 0.4 + rnd() * 0.6; circle(ctx, x, y, r); ctx.fill();
  }
  ctx.globalAlpha = 1;
}
export function moon(ctx, x, y, r, crescent) {
  const g = ctx.createRadialGradient(x - r * 0.3, y - r * 0.3, r * 0.1, x, y, r * 1.6);
  g.addColorStop(0, 'rgba(255,244,190,.85)'); g.addColorStop(1, 'rgba(255,244,190,0)');
  ctx.fillStyle = g; circle(ctx, x, y, r * 1.6); ctx.fill();
  ctx.fillStyle = '#ffeeb0'; circle(ctx, x, y, r); ctx.fill();
  ctx.fillStyle = '#e8d189'; circle(ctx, x - r * 0.3, y - r * 0.2, r * 0.18); ctx.fill();
  circle(ctx, x + r * 0.35, y + r * 0.3, r * 0.12); ctx.fill();
  if (crescent) { ctx.fillStyle = '#1b2a44'; circle(ctx, x + r * 0.55, y - r * 0.25, r * 0.85); ctx.fill(); }
}
export function wood(ctx, x, y, w, h, base, dark) {
  ctx.fillStyle = base; ctx.fillRect(x, y, w, h);
  ctx.strokeStyle = dark; ctx.lineWidth = 1.5; ctx.globalAlpha = 0.55;
  const step = Math.max(18, h / 4);
  for (let yy = y + step; yy < y + h; yy += step) { ctx.beginPath(); ctx.moveTo(x, yy); ctx.lineTo(x + w, yy); ctx.stroke(); }
  ctx.globalAlpha = 1;
}
export function brick(ctx, x, y, w, h, base, mortar) {
  ctx.fillStyle = mortar; ctx.fillRect(x, y, w, h);
  ctx.fillStyle = base;
  const bh = 14, bw = 34;
  for (let row = 0, yy = y; yy < y + h; row++, yy += bh) {
    for (let xx = x + (row % 2 ? -bw / 2 : 0); xx < x + w; xx += bw) ctx.fillRect(xx + 1.5, yy + 1.5, bw - 3, bh - 3);
  }
}
export function glow(ctx, x, y, r, color, alpha) {
  const g = ctx.createRadialGradient(x, y, 1, x, y, r);
  g.addColorStop(0, color.replace('A', String(alpha))); g.addColorStop(1, color.replace('A', '0'));
  ctx.fillStyle = g; circle(ctx, x, y, r); ctx.fill();
}
export function lantern(ctx, x, y, s, hue, lit) {
  ctx.fillStyle = '#3a2a18'; ctx.fillRect(x - 2, y - 14 * s, 4, 6 * s);
  ctx.fillStyle = lit ? hue : '#5a5148';
  rr(ctx, x - 10 * s, y - 8 * s, 20 * s, 22 * s, 4 * s); ctx.fill();
  ctx.fillStyle = '#2b1d10'; ctx.fillRect(x - 11 * s, y - 10 * s, 22 * s, 3 * s); ctx.fillRect(x - 11 * s, y + 14 * s, 22 * s, 3 * s);
  if (lit) { ctx.fillStyle = '#fff3b0'; circle(ctx, x, y + 3 * s, 3.5 * s); ctx.fill(); glow(ctx, x, y + 3 * s, 34 * s, 'rgba(255,210,110,A)', 0.5); }
  ctx.strokeStyle = 'rgba(40,25,10,.7)'; ctx.lineWidth = 1; ctx.beginPath(); ctx.moveTo(x - 6 * s, y - 8 * s); ctx.lineTo(x + 6 * s, y - 8 * s); ctx.moveTo(x - 6 * s, y + 14 * s); ctx.lineTo(x + 6 * s, y + 14 * s); ctx.stroke();
}
export function candle(ctx, x, y, s, lit) {
  ctx.fillStyle = '#f3e6c8'; rr(ctx, x - 4 * s, y, 8 * s, 18 * s, 2 * s); ctx.fill();
  ctx.fillStyle = '#8a6d2b'; ctx.fillRect(x - 6 * s, y + 18 * s, 12 * s, 3 * s);
  if (lit) {
    ctx.fillStyle = '#ffdf6b';
    ctx.beginPath(); ctx.moveTo(x, y - 12 * s); ctx.quadraticCurveTo(x + 5 * s, y - 4 * s, x, y); ctx.quadraticCurveTo(x - 5 * s, y - 4 * s, x, y - 12 * s); ctx.fill();
    glow(ctx, x, y - 4 * s, 26 * s, 'rgba(255,200,90,A)', 0.45);
  }
}
export function foliage(ctx, x, y, r, c1, c2) {
  ctx.fillStyle = c1;
  for (const [dx, dy, rr2] of [[0, 0, r], [-r * 0.7, r * 0.3, r * 0.7], [r * 0.7, r * 0.3, r * 0.7], [0, -r * 0.6, r * 0.75]]) {
    circle(ctx, x + dx, y + dy, rr2); ctx.fill();
  }
  ctx.fillStyle = c2;
  for (const [dx, dy] of [[-r * 0.4, -r * 0.3], [r * 0.4, -r * 0.2], [0, r * 0.3]]) { circle(ctx, x + dx, y + dy, r * 0.22); ctx.fill(); }
}
export function cat(ctx, x, y, s, color, sleeping) {
  ctx.fillStyle = color;
  ellipse(ctx, x, y, 16 * s, 9 * s); ctx.fill();
  circle(ctx, x + 14 * s, y - 6 * s, 7 * s); ctx.fill();
  poly(ctx, [[x + 9 * s, y - 11 * s], [x + 11 * s, y - 19 * s], [x + 14 * s, y - 11 * s]]); ctx.fill();
  poly(ctx, [[x + 15 * s, y - 12 * s], [x + 18 * s, y - 19 * s], [x + 20 * s, y - 11 * s]]); ctx.fill();
  ctx.strokeStyle = color; ctx.lineWidth = 3 * s; ctx.beginPath();
  ctx.moveTo(x - 15 * s, y + 2 * s); ctx.quadraticCurveTo(x - 26 * s, y - 6 * s, x - 20 * s, y - 14 * s); ctx.stroke();
  if (!sleeping) { ctx.fillStyle = '#ffe9a8'; circle(ctx, x + 16 * s, y - 7 * s, 1.6 * s); ctx.fill(); circle(ctx, x + 19 * s, y - 7 * s, 1.6 * s); ctx.fill(); }
}
export function book(ctx, x, y, w, h, color, pages) {
  ctx.fillStyle = color; rr(ctx, x, y, w, h, 2); ctx.fill();
  ctx.fillStyle = pages || '#f3e6c8'; ctx.fillRect(x + w - 4, y + 2, 3, h - 4);
  ctx.fillStyle = 'rgba(255,255,255,.35)'; ctx.fillRect(x + 2, y + 3, 2, h - 6);
}
export function teacup(ctx, x, y, s, color) {
  ctx.fillStyle = color; ctx.beginPath(); ctx.arc(x, y, 9 * s, 0, Math.PI); ctx.fill();
  ctx.fillRect(x - 9 * s, y - 9 * s, 18 * s, 4 * s);
  ctx.strokeStyle = color; ctx.lineWidth = 2.5 * s; ctx.beginPath(); ctx.arc(x + 10 * s, y - 4 * s, 5 * s, -Math.PI / 2, Math.PI / 2); ctx.stroke();
  ctx.strokeStyle = 'rgba(255,255,255,.6)'; ctx.lineWidth = 1.5 * s;
  ctx.beginPath(); ctx.moveTo(x - 3 * s, y - 12 * s); ctx.quadraticCurveTo(x - 6 * s, y - 18 * s, x - 3 * s, y - 22 * s); ctx.stroke();
}
export function dust(ctx, w, h, n, seed) {
  let s = seed; const rnd = () => (s = (s * 16807) % 2147483647) / 2147483647;
  ctx.fillStyle = '#ffe9a8';
  for (let i = 0; i < n; i++) { ctx.globalAlpha = 0.15 + rnd() * 0.35; circle(ctx, rnd() * w, rnd() * h, 0.8 + rnd() * 1.6); ctx.fill(); }
  ctx.globalAlpha = 1;
}
export function frame(ctx, w, h, color) {
  ctx.strokeStyle = color; ctx.lineWidth = 10; ctx.strokeRect(5, 5, w - 10, h - 10);
  ctx.strokeStyle = 'rgba(255,255,255,.18)'; ctx.lineWidth = 2; ctx.strokeRect(12, 12, w - 24, h - 24);
}
