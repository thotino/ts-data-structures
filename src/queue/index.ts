/**
 * https://www.30secondsofcode.org/articles/s/js-data-structures-queue
 * @description A queue is a linear data structure that behaves like a real-world queue.
 */
class Queue<Item> {
  items: Item[];
  constructor() {
    this.items = [];
  }

  enqueue(item: Item) {
    this.items.push(item);
  }

  dequeue() {
    this.items.shift();
  }

  peek(): Item {
    return this.items[0];
  }

  isEmpty(): boolean {
    return this.items.length === 0;
  }
}

export default Queue;
