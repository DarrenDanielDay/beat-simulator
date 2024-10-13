import { Cache } from './cache';
export type Report = (progress: number) => void;

class DownloadProgressTransformer
  implements Transformer<Uint8Array, Uint8Array>
{
  progress = 0;
  constructor(
    public total: number,
    public readonly report: Report,
  ) {}

  start() {
    this.progress = 0;
  }

  transform: Transformer['transform'] = (chunk, controller) => {
    this.progress += chunk.length;
    this.report(this.progress / this.total);
    controller.enqueue(chunk);
  };
}

type Input = Parameters<typeof fetch>;
type Fetch = (typeof window)['fetch'];
export class FetchCache extends Cache<Input, Blob> {
  constructor(public readonly doFetch: Fetch) {
    super('fetch-caches');
  }
  async get(input: Input): Promise<Blob> {
    const response = await this.doFetch(...input);
    return response.blob();
  }
  key(input: Input): string {
    const [ipt] = input;
    return ipt.toString();
  }
}

export function createFetch(report: Report): Fetch {
  return async (...args) => {
    const response = await fetch(...args);
    if (!response.body) {
      throw new Error('Empty body.');
    }
    return new Response(
      response.body.pipeThrough(
        new TransformStream(
          new DownloadProgressTransformer(
            +(response.headers.get('content-length') || ''),
            report,
          ),
        ),
      ),
    );
  };
}

export function myFetch(report: Report, ...args: Input) {
  const cache = new FetchCache(createFetch(report));
  return cache.fetch(args);
}
