/**
 * https://www.30secondsofcode.org/articles/s/js-data-structures-queue
 * @description A queue is a linear data structure that behaves like a real-world queue.
 */
class Queue<Type> {
  items: Type[];
  constructor() {
    this.items = [];
  }

  enqueue(item: Type) {
    this.items.push(item);
  }

  dequeue() {
    this.items.shift();
  }

  peek() {
    return this.items[0];
  }

  isEmpty() {
    return this.items.length === 0;
  }
}

export default Queue;
