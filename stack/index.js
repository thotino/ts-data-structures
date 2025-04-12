/**
 * @see https://www.30secondsofcode.org/articles/s/js-data-structures-stack
 * @description A stack is a linear data structure that behaves like a real-world stack of items.
 */
class Stack {
    constructor() {
        this.items = [];
    }
    push(item) {
        this.items.unshift(item);
    }
    pop() {
        this.items.shift();
    }
    peek() {
        return this.items[0];
    }
    isEmpty() {
        return this.items.length === 0;
    }
}
export default Stack;
