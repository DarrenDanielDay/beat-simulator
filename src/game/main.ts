import { Evaluator } from './evaluator';
import type { Game } from './game';

export class Main {
  #taps: number[] = [];
  evaluator = new Evaluator(this.game);
  constructor(public readonly game: Game) {}

  tap = (e: Event) => {
    const now = performance.now();
    if (!e.isTrusted) {
      return;
    }
    this.evaluator.tap(now);
  };

  start() {
    this.#taps = [];
  }

  rank() {
    return this.evaluator.rank();
  }
}
