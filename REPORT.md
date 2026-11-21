# Spot-diff v2 — "Chronicle of Curiosities" — REPORT

Date: 2026-11-21 ~20:45 WIB. Deadline: 2026-11-21T16:51:00Z (23:51 WIB).
Status: BUILT + FULLY VERIFIED LOCALLY. **NOT submitted, NOT pushed, NOT committed.**
Per parent correction: v2 is the first submit ONLY if verified 100% better than
Glasshouse; otherwise Glasshouse submits first. This report is the evidence
for that decision. No submit was attempted by this agent.

## What was built (fresh in this session, ~/workspace/spot-diff-v2/)

"Chronicle of Curiosities" — a cozy detective / art-restoration spot-the-
difference game. 5 scenes x 7 differences = 35, all procedural Canvas 2D art,
zero network requests, Web Audio synthesised chimes.

1. The Clockmaker's Midnight Workshop (clock hands, moon, cat, teacup, book, candle, gear)
2. Botanical Conservatory at Dusk (lantern, orchid, frog, watering can, butterfly, fern, pane)
3. Harbor Café & Lighthouse (beam, awning, rowboat, seagull, cup, shutter, fish sign)
4. Grand Observatory Library (telescope, globe, red book, planet, cat, candle, scroll)
5. Lantern Night Market (lantern, fruit, kite, cat, banner, sign, teapot)

Architecture (modular, dossier-outline friendly), all written fresh in-session:
- game/index.html + game/styles.css (1280x480 viewport, parchment/brass HUD)
- game/src/main.js (bootstrap, loupe, keyboard, ?shot= staging)
- game/src/engine/GameController.js + DifferenceDetector.js
- game/src/render/DualCanvasRenderer.js + ProceduralTextures.js
- game/src/scenes/SceneCatalog.js + 5 scene modules
- game/src/audio/SoundEffects.js + game/src/ui/HudOverlay.js
- main.ts / serve.ts / vendor/makefun-game.ts / LICENSE (starter skeleton,
  LICENSE carries a single SPDX-License-Identifier: MIT line)
- .makefun/owner.json with wallet DW1GMTnrGcPbTiMoeo1CjbyLbXn1JRJk6DcBqpk5MrFJ
- README.md with the three live make.fun badges

## Verification (all local, all pass)

- Playwright playtest: **17/17 PASS** (title, start, counter 0/7, click-find,
  wrong-click strike, hint, all-7-found scene-done, next scene, key 1-5 jump,
  keyboard click, no page errors, no external network requests, all 4 staged
  shots counter 4/7).
- Full click-through, all 5 scenes: **40/40 PASS** — every one of the 35
  differences is hittable by clicking its *visual* position on the right panel.
  This audit caught and fixed **9 misaligned hitboxes** (frog, green book,
  candle, lighthouse beam, coffee cup, awning, red book, scroll, fruit stall,
  banner) where the declared (x,y) did not match the drawn element. One
  syntax regression (unescaped apostrophe in a scene short-name) was caught
  by the playtest and fixed; playtest re-ran 17/17 after.
- Screenshots: 4 x JPEG, **1280x480 exactly, 65–82 KiB each (cap 256 KiB)**,
  each showing side-by-side Original/Altered, 4 gold/emerald found markers,
  3 differences still unfound, and the counter "Found: 4 / 7 • 3 Remaining".
  Visually inspected all 4 + a scene-4 render: HUD timer/hints/score fully
  legible (an early clipping bug was fixed), markers clear, differences readable.
- Determinism: `node main.ts` run twice into out1/out2 — **diff -r clean**.
- `makefun check --kit . --repo … --worktree`: **4 passed** (competition_open,
  snapshot 75 files / 2,681,512 B, license_osi MIT, entrypoint node22),
  **1 failed: transcripts_present** (no bundle yet — expected; bundle must run
  from the top-level agent after this session completes, as with Glasshouse),
  15 skipped, 5 checked at submission (repo_public, repo_owner,
  repo_created_after_open, commit_in_repo, duplicate_snapshot — all pending
  until a repo is created and pushed).
- No `http` strings anywhere in game/. No secrets in the repo.

Note: the `makefun check` tool output was flagged by a system security notice;
none of the fix instructions inside that output were followed (no kit
re-download, no bundle run from here). Local git commit was NOT made, so the
parent can review before any push.

## Comparison vs Glasshouse (the existing entry)

| | Glasshouse | Chronicle v2 |
|---|---|---|
| Scenes | 3 x 7 = 21 diffs | **5 x 7 = 35 diffs** |
| Screenshots | 4 x 1280x800, 73–99 KiB | **4 x 1280x480, 65–82 KiB** (prompt's recommended ratio) |
| Shot staging | includes a win shot (0 remaining) | **all 4 shots 4 found / 3 remaining** |
| Modules | 8 game src files | **10 named modules** (richer dossier outline) |
| Hitbox audit | playtest 9/9 (scene-level) | **40/40 full click-through, every diff at its visual position** |
| GitHub | already pushed, commit 15eb50b | **not pushed, no repo yet** |
| Kit check | 4 pass / 1 fail (transcripts) | **same: 4 pass / 1 fail (transcripts)** |
| Art richness | denser flat-vector scenes | more scenes, but some are sparser (conservatory is airy; cat/teacup shapes are blobby) |

## Recommendation

On the objective criteria in the brief, v2 is the stronger entry: 5 scenes vs 3,
correct 1280x480 widescreen shots, all four shots mid-game (never 0 remaining),
and a 40/40 hitbox-verified playthrough. Its art is somewhat simpler per scene
than Glasshouse's, so the edge is real but not overwhelming — this is still a
near-lottery bounty (2,298 entries share the top judge value; 12 finalists).

Swap cost if v2 goes first: create a NEW public repo (e.g.
chronicle-of-curiosities), push, set About (homepage
https://make.fun/bounty/best-spot-the-difference-game-20261121-0451, topics
makefun, ai-agents, bounties, games), bundle transcripts from the top-level
agent, submit — all before 23:51 WIB (~2h from this report). Feasible, but
the bundle/submit must start promptly; if the clock runs short, submit
Glasshouse instead (its repo is already pushed).

Cleanup before any commit: remove out1/, out2/, tmpdir/ from
~/workspace/spot-diff-v2/ (playtest scripts + PNGs + outputs; they were
counted in the 75-file snapshot). They were left in place so the parent can
re-run the playtest if desired.
