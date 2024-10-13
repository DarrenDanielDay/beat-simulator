const CACHE_STORE = 'cache';

export abstract class Cache<I, O> {
  constructor(public readonly name: string) {}
  abstract get(input: I): Promise<O>;
  abstract key(input: I): string;
  async fetch(input: I): Promise<O> {
    const db = await this.#open();
    let transaction = db.transaction(CACHE_STORE, 'readonly');
    try {
      const key = this.key(input);
      const cache = await this.#load(transaction, key);
      if (cache != null) {
        return cache;
      }
      const object = await this.get(input);
      transaction = db.transaction(CACHE_STORE, 'readwrite');
      await this.#save(transaction, key, object);
      return object;
    } catch (error) {
      console.error(error);
      throw error;
    } finally {
      db.close();
    }
  }
  #open() {
    return new Promise<IDBDatabase>((resolve, reject) => {
      const request = indexedDB.open(this.name, 1);
      request.onerror = reject;
      request.onupgradeneeded = (event) => {
        if (!(event instanceof IDBVersionChangeEvent)) {
          return;
        }
        const db = request.result;
        db.createObjectStore(CACHE_STORE);
      };
      request.onsuccess = () => {
        resolve(request.result);
      };
    });
  }
  #load(transaction: IDBTransaction, key: string): Promise<O | null> {
    return new Promise<O | null>((resolve, reject) => {
      const request = transaction.objectStore(CACHE_STORE).get(key);
      request.onerror = () => {
        resolve(null);
      };
      request.onsuccess = () => {
        resolve(request.result);
      };
    });
  }
  #save(transaction: IDBTransaction, key: string, value: O) {
    return new Promise<void>((resolve, reject) => {
      const request = transaction.objectStore(CACHE_STORE).put(value, key);
      request.onerror = reject;
      request.onsuccess = () => {
        resolve();
      };
    });
  }
}
