"use strict";

type CompareFunction<V> = (a: V, b: V) => number;

export default class Collection<K, V> extends Map<K, V> {
  get size(): number {
    return super.size;
  }

  map<U>(fn: (val: V, key: K, map: Collection<K, V>) => U): U[] {
    const array: U[] = [];
    for (const [key, val] of this) {
      array.push(fn(val, key, this));
    }
    return array;
  }

  mapVal<U>(fn: (val: V, key: K, map: Collection<K, V>) => U): U[] {
    const val = this.values();
    return Array.from({length: this.size}, () => {
      const values = val.next();
      return fn(values.value, values.value, this);
    }).filter((item) => item);
  }

  first(): V | undefined {
    if (this.size <= 0) return undefined;
    return this.values().next().value;
  }

  find(fn: (val: V, key: K, map: Collection<K, V>) => boolean): V | undefined {
    for (const [key, val] of this) {
      if (fn(val, key, this)) return val;
    }
    return undefined;
  }

  filter(fn: (val: V, key: K, map: Collection<K, V>) => boolean): Collection<K, V> {
    const result = new Collection<K, V>();
    for (const [key, val] of this) {
      if (fn(val, key, this)) result.set(key, val);
    }
    return result;
  }

  filterKey(fn: (key: K) => boolean): Collection<K, V> {
    const result = new Collection<K, V>();
    for (const [key, val] of this) {
      if (fn(key)) result.set(key, val);
    }
    return result;
  }

  last(): V | undefined {
    if (this.size <= 0) return undefined;
    return Array.from(this.values())[Array.from(this.values()).length - 1];
  }

  lastKey(): K | undefined {
    const keys = Array.from(this.keys());
    return keys[keys.length - 1];
  }

  tap(fn: (map: Collection<K, V>) => void): Collection<K, V> {
    fn(this);
    return this;
  }

  has(k: K): boolean {
    return super.has(k);
  }

  array(): V[] {
    return Array.from(this.values());
  }

  keyArray(): K[] {
    return Array.from(this.keys());
  }

  hasAll(...c: K[]): boolean {
    if (Array.isArray(c[0])) {
      return c[0].every((o) => super.has(o));
    } else {
      return c.every((o) => super.has(o));
    }
  }

  hasAny(...keys: K[]): boolean {
    if (Array.isArray(keys[0])) {
      return keys[0]?.some((o) => super.has(o));
    } else {
      return keys?.some((o) => super.has(o));
    }
  }

  some(fn: (val: V, key: K, map: Collection<K, V>) => boolean): boolean {
    for (const [key, val] of this.entries()) {
      if (fn(val, key, this)) return true;
    }
    return false;
  }

  random(): V | undefined {
    const values = Array.from(this.values());
    return values[Math.floor(Math.random() * values.length)];
  }

  get(k: K): V | undefined {
    return super.get(k);
  }

  every(fn: (val: V, key: K, map: Collection<K, V>) => boolean): boolean {
    for (const [key, val] of this) {
      if (!fn(val, key, this)) return false;
    }
    return true;
  }

  each(fn: (val: V, key: K, map: Collection<K, V>) => void): Collection<K, V> {
    this.forEach((val, key) => fn(val, key, this));
    return this;
  }

  randomKey(): K | undefined {
    const keys = Array.from(this.keys());
    return keys[Math.floor(Math.random() * keys.length)];
  }

  equals(collection: Collection<K, V>): boolean {
    if (!collection) return false;
    if (this.size !== collection.size) return false;
    if (this === collection) return true;
    for (const [key, val] of this) {
      if (!collection.has(key) || val !== collection.get(key)) return false;
    }
    return true;
  }

  difference(collection: Collection<K, V>): K[] | string {
    if (this.size !== collection.size) return `size difference by: ${Math.abs(this.size - collection.size)}`;
    return Array.from(collection.keys()).filter((value) => !this.has(value));
  }

  findKey(fn: (val: V, key: K, map: Collection<K, V>) => boolean): K | undefined {
    for (const [key, val] of this) {
      if (fn(val, key, this)) return key;
    }
    return undefined;
  }

  sort(compareFn: CompareFunction<V> = Collection.defaultCompareFunction): Collection<K, V> {
    const entries = [...this.entries()];
    entries.sort((a, b) => compareFn(a[1], b[1]));
    super.clear();
    for (const [key, val] of entries) {
      super.set(key, val);
    }
    return this;
  }

  clear(): void {
    super.clear();
  }

  at(index: number = 0): V | undefined {
    const collectionArr = this.array();
    return collectionArr[index];
  }

  static defaultCompareFunction<V>(a: V, b: V): number {
    return Number(a > b || a === b) - 1;
  }
}
