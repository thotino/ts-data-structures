interface StringWise {
  length: number;
  charCodeAt: (arg: number) => number;
}
class HashTable<Key extends StringWise, Value> {
  table;
  size;
  constructor(length = 127) {
    this.table = new Array(length);
    this.size = 0;
  }

  hash(key: Key) {
    let hash = 0;
    for (let idx = 0; idx < key.length; idx++) {
      hash += key.charCodeAt(idx);
    }
    return hash % this.table.length;
  }

  set(key: Key, value: Value) {
    const index = this.hash(key);
    this.table[index] = [key, value];
    this.size++;
  }

  get(key: Key) {
    const index = this.hash(key);
    return this.table[index];
  }

  remove(key: Key) {
    const index = this.hash(key);
    if (this.table[index]) {
      this.table[index] = null;
      this.size--;
      return true;
    }
    return false;
  }
}

export default HashTable;
