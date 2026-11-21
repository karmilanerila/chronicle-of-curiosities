// SceneCatalog.js — the five scenes of Chronicle of Curiosities, in order.
import { ClockmakerWorkshop } from './ClockmakerWorkshop.js';
import { BotanicalConservatory } from './BotanicalConservatory.js';
import { HarborLighthouse } from './HarborLighthouse.js';
import { ObservatoryLibrary } from './ObservatoryLibrary.js';
import { LanternNightMarket } from './LanternNightMarket.js';

export const SceneCatalog = [
  ClockmakerWorkshop,
  BotanicalConservatory,
  HarborLighthouse,
  ObservatoryLibrary,
  LanternNightMarket,
];

export function getScene(index) { return SceneCatalog[((index % 5) + 5) % 5]; }
export function sceneCount() { return SceneCatalog.length; }
