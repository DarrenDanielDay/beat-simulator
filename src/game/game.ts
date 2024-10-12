import type { Song } from '../songs/list';
import type { Rhythm } from './rhythm';

export interface Game {
  song: Song;
  rhythm: Rhythm;
  range: {
    early: number;
    late: number;
  };
}
