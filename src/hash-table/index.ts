class HashTable {
  table;
  size;
  constructor(length = 127) {
    this.table = new Array(length);
    this.size = 0;
  }

  hash(key) {
    let hash = 0;
    for (let idx = 0; idx < key.length; idx++) {
      hash += key.charCodeAt(idx);
    }
    return hash % this.table.length;
  }

  set(key, value) {
    const index = this.hash(key);
    this.table[index] = [key, value];
    this.size++;
  }

  get(key) {
    const index = this.hash(key);
    return this.table[index];
  }

  remove(key) {
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
