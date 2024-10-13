import './style.css';
import type { ArrayOr } from 'hyplate/types';
import { html, Panel } from '../html';
import { AutoRender, element, nil, signal } from 'hyplate';
import { Main } from '../../game/main';
import type { Game } from '../../game/game';
import { myFetch, type Report } from '../../utils/fetch';

export class GamePanel extends Panel {
  audio = element('audio');
  playZone = element('div');
  main = new Main(this.game);
  info = signal(false);
  src = signal<string | null>(null);
  onend?: () => void;
  #touch = false;
  constructor(public readonly game: Game) {
    super();
  }

  render(): ArrayOr<JSX.Element> {
    return html`<div>
      <${AutoRender}>${() => {
        this.info();
        if (!this.src()) {
          return nil;
        }
        const { evaluator } = this.main;
        const { early, late } = evaluator.evaluate();
        const avg = evaluator.avg();
        const p6 = (n: number) => (n * 100).toFixed(6);
        const f2 = (n: number) => n.toFixed(2);
        return html`
        <div class='score'>
          <div>Hits: ${evaluator.count()}</div>
          <div>ACC: ${p6(evaluator.acc())}%</div>
          <div>Early: ${f2(avg.early)}(${early})</div>
          <div>Late: ${f2(avg.late)}(${late})</div>
          <div>Deviation: ${f2(avg.diff)}</div>
          <div>Grade: ${evaluator.rank()}</div>
        </div>
        `;
      }}</${AutoRender}>
      <audio ref=${this.audio} onEnded=${this.end}>
      </audio>
      <div ref=${this.playZone} class="play-zone"></div>
    </div>`;
  }

  async start(report: Report) {
    this.#touch = !window.matchMedia('(hover: hover)').matches;
    if (this.#touch) {
      this.playZone.addEventListener('touchstart', this.tap);
    } else {
      this.playZone.addEventListener('mousedown', this.tap);
    }
    window.addEventListener('keydown', this.key);
    const blob = await myFetch(report, this.game.song.path);
    const src = URL.createObjectURL(blob);
    this.src.set(src);
    this.audio.src = src;
    await this.audio.play();
    this.main.start();
  }

  key = (e: KeyboardEvent) => {
    if (e.key !== ' ') {
      return;
    }
    e.stopPropagation();
    e.preventDefault();
    this.tap(e);
  };

  tap = (e: Event) => {
    this.main.tap(e);
    this.info.set(!this.info());
  };

  end = () => {
    console.log('ended!');
    const src = this.src();
    if (src) {
      URL.revokeObjectURL(src);
    }
    this.audio.pause();
    this.playZone.removeEventListener('touchstart', this.tap);
    this.playZone.removeEventListener('mousedown', this.tap);
    window.removeEventListener('keydown', this.key);
    this.onend?.();
  };
}
