import htm from 'htm';
import { Fragment, h, mount, unmount } from 'hyplate';
import type { ArrayOr, Mountable, Rendered } from 'hyplate/types';

export const html = htm.bind(h);

export const ref = (el: unknown) => el as string;

export abstract class Panel {
  #rendered: Rendered<unknown> | null = null;
  abstract render(): ArrayOr<JSX.Element>;

  mount(el: Element) {
    this.#rendered = mount(h(Fragment, { children: this.render() }), el);
  }
  unmount() {
    if (this.#rendered) {
      unmount(this.#rendered);
    }
  }
}
