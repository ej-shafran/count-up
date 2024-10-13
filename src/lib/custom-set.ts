/**
 * A [Set](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Set) with a custom hashing function for comparing between items.
 **/
export class CustomSet<T> implements Set<T> {
  private readonly map = new Map<number, T>();
  constructor(
    private readonly hashFunction: (t: T) => number,
    values?: T[],
  ) {
    values?.forEach((value) => {
      this.add(value);
    });
  }
  add(value: T): this {
    const hash = this.hashFunction(value);
    if (!this.map.has(hash)) {
      this.map.set(hash, value);
    }
    return this;
  }
  clear(): void {
    this.map.clear();
  }
  delete(value: T): boolean {
    return this.map.delete(this.hashFunction(value));
  }
  forEach(callbackfn: (value: T, value2: T, set: Set<T>) => void): void {
    this.map.forEach((value) => {
      callbackfn(value, value, this);
    });
  }
  has(value: T): boolean {
    return this.map.has(this.hashFunction(value));
  }
  get size(): number {
    return this.map.size;
  }
  *entries(): SetIterator<[T, T]> {
    const iter = this.map[Symbol.iterator]();
    for (const [, value] of iter) {
      yield [value, value] as [T, T];
    }
  }
  keys(): SetIterator<T> {
    return this.values();
  }
  values(): SetIterator<T> {
    return this[Symbol.iterator]();
  }
  *[Symbol.iterator](): SetIterator<T> {
    const iter = this.map[Symbol.iterator]();
    for (const [, value] of iter) {
      yield value;
    }
  }
  readonly [Symbol.toStringTag] = "[object CustomSet]";
}
