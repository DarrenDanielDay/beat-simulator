import './style.css';
import type { ArrayOr } from 'hyplate/types';
import { html, Panel, ref } from '../html';
import { AutoRender, element, signal } from 'hyplate';
import { Main } from '../../game/main';
import type { Game } from '../../game/game';

export class GamePanel extends Panel {
  audio = element('audio');
  playZone = element('div');
  main = new Main(this.game);
  info = signal(false);
  onend?: () => void;
  #touch = false;
  constructor(public readonly game: Game) {
    super();
  }

  render(): ArrayOr<JSX.Element> {
    return html`<div>
      <${AutoRender}>${() => {
        this.info();
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
      <audio ref=${ref(this.audio)} onEnded=${this.end}>
        <source src=${this.game.song.path} />
      </audio>
      <div ref=${ref(this.playZone)} class="play-zone"></div>
    </div>`;
  }

  async start() {
    this.#touch = !window.matchMedia('(hover: hover)').matches;
    if (this.#touch) {
      this.playZone.addEventListener('touchstart', this.tap);
    } else {
      this.playZone.addEventListener('mousedown', this.tap);
    }
    window.addEventListener('keydown', this.key);
    this.main.start();
    await this.audio.play();
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
    this.audio.pause();
    this.playZone.removeEventListener('touchstart', this.tap);
    this.playZone.removeEventListener('mousedown', this.tap);
    window.removeEventListener('keydown', this.key);
    this.onend?.();
  };
}
