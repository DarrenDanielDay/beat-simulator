import type { Game } from './game';

export interface Evaluation {
  readonly diffs: number[];
  readonly diff: number;
  readonly span: number;
  readonly early: number;
  readonly earlyTime: number;
  readonly late: number;
  readonly lateTime: number;
}

export class Evaluator implements Evaluation {
  prepare = this.game.rhythm.beats.length;
  taps: number[] = [];
  i = -1;
  diffs: number[] = [];
  diff = 0;
  span = 0;
  early = 0;
  earlyTime = 0;
  lateTime = 0;
  late = 0;
  #last = 0;
  #std = this.game.rhythm.intervals(this.game.song.bpm);
  #section = this.game.rhythm.beats.length;
  constructor(public readonly game: Game) {}

  reset() {
    this.prepare = this.game.rhythm.beats.length;
    this.taps = [];
    this.i = -1;
    this.diffs = [];
    this.diff = 0;
    this.span = 0;
    this.early = 0;
    this.earlyTime = 0;
    this.late = 0;
    this.lateTime = 0;
  }

  tap(ts: number) {
    if (this.prepare-- > 0) {
      this.#last = ts;
      return;
    }
    const interval = ts - this.#last;
    this.#last = ts;
    this.i++;
    this.taps.push(interval);
    const span = this.#std[this.i % this.#section];
    this.span += span;
    const diff = interval - span;
    this.diffs.push(diff);
    const diffAbs = Math.abs(diff);
    this.diff += diffAbs;
    if (interval < span) {
      // early
      this.early += +(interval < span - this.game.range.early);
      this.earlyTime += diffAbs;
    } else if (interval > span) {
      // late
      this.late += +(interval > span + this.game.range.late);
      this.lateTime += diffAbs;
    } else {
      console.log('🐉');
    }
  }

  evaluate(): Evaluation {
    return this;
  }

  acc(): number {
    const { diff, span } = this;
    return 1 - (span && diff / span);
  }

  avg() {
    const count = this.count();
    return {
      early: count && this.earlyTime / count,
      late: count && this.lateTime / count,
      diff: count && this.diff / count,
    };
  }

  count() {
    return this.i + 1;
  }

  rank() {
    const acc = this.acc();
    switch (true) {
      case acc >= 0.99:
        return 'EX+';
      case acc >= 0.98:
        return 'EX';
      case acc >= 0.95:
        return 'AA';
      case acc >= 0.92:
        return 'A';
      case acc >= 0.88:
        return 'B';
      case acc >= 0.85:
        return 'C';
      default:
        return 'D';
    }
  }
}
