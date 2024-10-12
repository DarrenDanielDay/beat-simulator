export class Fraction {
  constructor(
    public readonly molecule: number,
    public readonly denominator: number,
  ) {}
  valueOf() {
    return this.molecule / this.denominator;
  }
}

export const fraction = (a: number, b: number) => new Fraction(a, b)

export const quarter = fraction(1, 4);

export class Rhythm {
  constructor(
    public readonly beats: Fraction[],
    public readonly length: Fraction = quarter,
  ) {}

  beat(bpm: number) {
    return 60 * 1e3 / bpm;
  }

  semibreve(bpm: number) {
    return this.beat(bpm) / this.length.valueOf();
  }

  intervals(bpm: number) {
    const semibreve  = this.semibreve(bpm)
    return this.beats.map(beat => semibreve * beat.valueOf());
  }
}
