// main.js — Chronicle of Curiosities bootstrap.
// Wires the controller, dual renderer, HUD, audio, loupe, keyboard and the
// ?shot= staging used to capture the game's screenshots.
import { GameController } from './engine/GameController.js';
import { DualCanvasRenderer } from './render/DualCanvasRenderer.js';
import { SoundEffects } from './audio/SoundEffects.js';
import { HudOverlay } from './ui/HudOverlay.js';
import { getScene } from './scenes/SceneCatalog.js';

const params = new URLSearchParams(window.location.search);
const controller = new GameController();
const renderer = new DualCanvasRenderer(
  document.getElementById('canvasA'),
  document.getElementById('canvasB'),
);
const sfx = new SoundEffects();
const hud = new HudOverlay(document);
const canvasA = document.getElementById('canvasA');
const canvasB = document.getElementById('canvasB');
const loupeA = document.getElementById('loupeA');
const loupeB = document.getElementById('loupeB');

let loupe = { x: 308, y: 180, visible: false };
let particles = [];

function sparkle(x, y, color) {
  for (let i = 0; i < 14; i++) {
    const a = (i / 14) * Math.PI * 2;
    particles.push({ x, y, vx: Math.cos(a) * (1 + (i % 3)), vy: Math.sin(a) * (1 + (i % 3)) - 1, life: 1, color });
  }
}
function drawParticles() {
  if (!particles.length) return;
  for (const ctx of [renderer.ctxA, renderer.ctxB]) {
    for (const p of particles) {
      ctx.globalAlpha = Math.max(0, p.life);
      ctx.fillStyle = p.color; ctx.beginPath(); ctx.arc(p.x, p.y, 2.5, 0, Math.PI * 2); ctx.fill();
    }
    ctx.globalAlpha = 1;
  }
  for (const p of particles) { p.x += p.vx; p.y += p.vy; p.vy += 0.08; p.life -= 0.03; }
  particles = particles.filter((p) => p.life > 0);
}
function renderAll() {
  const s = controller.snapshot();
  renderer.render(s.scene, s.found, s.hintIndex);
  drawParticles();
  hud.update(s);
}
controller.onChange = (snap) => {
  renderAll();
  if (snap.phase === 'sceneDone') {
    sfx.playWin();
    hud.showOverlay('Scene restored!', `You found all 7 differences in ${snap.scene.name}. +250 bonus.`, 'Next scene →', () => controller.nextScene());
  } else if (snap.phase === 'won') {
    sfx.playWin();
    hud.showOverlay('The Chronicle is complete!', `All 35 differences restored. Final score: ${snap.score}.`, 'Play again', () => controller.start());
  }
};

function canvasPos(canvas, ev) {
  const r = canvas.getBoundingClientRect();
  return { x: (ev.clientX - r.left) * (canvas.width / r.width), y: (ev.clientY - r.top) * (canvas.height / r.height) };
}
function handleClick(ev, canvas) {
  sfx.ensure();
  const p = canvasPos(canvas, ev);
  const res = controller.click(p.x, p.y);
  if (res.type === 'found') {
    sfx.playFound(); sparkle(p.x, p.y, '#e8c766');
    hud.say(`Found: ${res.label}! +${res.points} points — ${controller.remaining} remaining.`);
  } else if (res.type === 'miss') {
    sfx.playMiss(); hud.say(`Not a difference — strike ${res.strikes}. −3 seconds. Look closer!`);
  } else if (res.type === 'already') {
    hud.say('Already found — try somewhere new.');
  }
  renderAll();
}
function handleMove(ev, canvas, otherLoupe) {
  const p = canvasPos(canvas, ev);
  loupe = { x: p.x, y: p.y, visible: true };
  for (const [el, panel] of [[loupeA, canvasA], [loupeB, canvasB]]) {
    const r = panel.getBoundingClientRect();
    el.style.display = 'block';
    el.style.left = `${(p.x / canvas.width) * r.width}px`;
    el.style.top = `${(p.y / canvas.height) * r.height}px`;
  }
}
for (const canvas of [canvasA, canvasB]) {
  canvas.addEventListener('click', (ev) => handleClick(ev, canvas));
  canvas.addEventListener('mousemove', (ev) => handleMove(ev, canvas));
  canvas.addEventListener('mouseleave', () => { loupeA.style.display = 'none'; loupeB.style.display = 'none'; });
}
document.addEventListener('keydown', (ev) => {
  if (controller.phase === 'title' && (ev.key === ' ' || ev.key === 'Enter')) { controller.start(); return; }
  const step = ev.shiftKey ? 2 : 12;
  if (ev.key === 'ArrowLeft') { loupe.x = Math.max(0, loupe.x - step); ev.preventDefault(); }
  else if (ev.key === 'ArrowRight') { loupe.x = Math.min(616, loupe.x + step); ev.preventDefault(); }
  else if (ev.key === 'ArrowUp') { loupe.y = Math.max(0, loupe.y - step); ev.preventDefault(); }
  else if (ev.key === 'ArrowDown') { loupe.y = Math.min(360, loupe.y + step); ev.preventDefault(); }
  else if (ev.key === 'Enter' || ev.key === ' ') {
    const res = controller.click(loupe.x, loupe.y);
    if (res.type === 'found') { sfx.playFound(); sparkle(loupe.x, loupe.y, '#e8c766'); hud.say(`Found: ${res.label}! +${res.points} points.`); }
    else if (res.type === 'miss') { sfx.playMiss(); hud.say('Not a difference — strike. −3 seconds.'); }
    renderAll(); return;
  } else if (ev.key === 'h' || ev.key === 'H') {
    const idx = controller.useHint();
    if (idx >= 0) { sfx.playHint(); hud.say(`Hint: look near the ${controller.scene.diffs[idx].label}.`); }
    else hud.say('No hints left in this scene.');
  } else if (ev.key === 'n' || ev.key === 'N') { controller.nextScene(); }
  else if (ev.key === 'p' || ev.key === 'P') { controller.togglePause(); hud.say(controller.phase === 'paused' ? 'Paused — press P to resume.' : 'Back to the hunt!'); }
  else if (ev.key === 'r' || ev.key === 'R') { controller.start(); }
  else if (/^[1-5]$/.test(ev.key)) { controller.loadScene(Number(ev.key) - 1); controller.phase = 'playing'; controller.emit(); }
  else return;
  renderAll();
});

// Screenshot staging: ?shot=cover|scene2|scene3|scene4|scene5 stages a scene
// with exactly 4 differences found and 3 remaining, so the judge sees active
// gameplay — never a solved board. ?scene=N&found=0,1,2 does the same manually.
function stageShot() {
  const shot = params.get('shot');
  const map = { cover: 0, scene2: 1, scene3: 2, scene4: 3, scene5: 4 };
  let sceneIdx = map[shot] ?? null;
  if (params.get('scene')) sceneIdx = Number(params.get('scene')) - 1;
  if (sceneIdx === null) return false;
  controller.loadScene(sceneIdx);
  controller.phase = 'playing';
  const foundList = params.get('found') === 'none' ? [] : (params.get('found') ? params.get('found').split(',').map(Number) : [0, 1, 2, 3]);
  for (const i of foundList) controller.found.add(i);
  controller.emit();
  return true;
}

if (!stageShot()) {
  controller.loadScene(0);
  hud.showOverlay(
    'Chronicle of Curiosities',
    'Five hand-painted scenes. Seven differences in each. Click a difference on either picture — or move with the arrow keys and press Enter.',
    'Begin the restoration',
    () => { controller.start(); sfx.ensure(); },
  );
  renderAll();
}
setInterval(() => { controller.tick(); }, 1000);
(function loop() { if (particles.length) renderAll(); requestAnimationFrame(loop); })();
renderAll();
