
export type CacheEntry<T> = {
    createdAt: number;
    val: T;
};

export class Cache {
    #cache = new Map<string, CacheEntry<any>>();
    #reapIntervalId: NodeJS.Timeout | undefined = undefined;
    #interval: number;

    constructor(interval: number) {
        this.#interval = interval;
        this.#startReapLoop();
    }

    add<T>(key: string, val: T): void {
        const entry: CacheEntry<T> = {
            createdAt: Date.now(),
            val: val,
        };
        this.#cache.set(key, entry);
    }

    get<T>(key: string) {
        const entry = this.#cache.get(key);
        if (!entry) {
            return undefined;
        }
        return entry.val as T;
    }

    stopReapLoop() {
        if (this.#reapIntervalId) {
            clearInterval(this.#reapIntervalId);
            this.#reapIntervalId = undefined;
        }
    }

    #reap() {
        const now = Date.now()
        for (const [k, v] of this.#cache) {
            if (now - v.createdAt > this.#interval) {
                this.#cache.delete(k);
            }
        }
    }

    #startReapLoop() {
        this.#reapIntervalId = setInterval(()=>this.#reap(), this.#interval);
    }
}