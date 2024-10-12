import './style.css';
import type { ArrayOr } from 'hyplate/types';
import { html, Panel, ref } from '../html';
import { list } from '../../songs/list';
import { computed, element, signal } from 'hyplate';
import { GamePanel } from '../game-panel';
import { quarter, Rhythm } from '../../game/rhythm';

export class App extends Panel {
  select = element('select');
  panel = element('div');
  ingame = signal(false);
  gamePanel?: GamePanel;

  render(): ArrayOr<JSX.Element> {
    return html`<div id="root">
      <div>
        <select ref=${ref(this.select)}>
          ${list.map((song) => html`<option value=${song.id}>(bpm=${song.bpm}) ${song.title} - ${song.artist}</option>`)}
        </select>
      </div>
      <div>
        <button onClick=${this.start}>${computed(() => (this.ingame() ? 'stop' : 'start'))}</button>
      </div>
      <div ref=${ref(this.panel)}></div>
    </div>`;
  }

  start = async () => {
    if (this.ingame()) {
      this.gamePanel?.end();
      return;
    }
    this.gamePanel?.unmount();
    const song = list.find((song) => song.id === this.select.value);
    if (!song) {
      return;
    }
    this.gamePanel = new GamePanel({
      song,
      rhythm: new Rhythm([quarter, quarter, quarter, quarter]),
      range: {
        early: 25,
        late: 25,
      },
    });
    this.gamePanel.onend = () => {
      this.ingame.set(false);
    };
    this.gamePanel.mount(this.panel);
    await this.gamePanel.start();
    this.ingame.set(true);
  };
}
