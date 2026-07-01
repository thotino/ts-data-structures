/**
 * @see https://www.30secondsofcode.org/articles/s/js-data-structures-stack
 * @description A stack is a linear data structure that behaves like a real-world stack of items.
 */
class Stack<Item> {
  items: Item[];
  constructor() {
    this.items = [];
  }

  push(item: Item) {
    this.items.unshift(item);
  }

  pop() {
    this.items.shift();
  }

  peek(): Item {
    return this.items[0];
  }

  isEmpty(): boolean {
    return this.items.length === 0;
  }
}

export default Stack;
