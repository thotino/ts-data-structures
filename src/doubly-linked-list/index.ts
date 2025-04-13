/**
 * @see https://www.30secondsofcode.org/articles/s/js-data-structures-doubly-linked-list
 * @description A doubly linked list is a linear data structure that represents a collection of elements, where each element points both to the next and the previous one
 */

class DoublyLinkedList<Type> {
  nodes: Type[];
  constructor() {
    this.nodes = [];
  }

  get size() {
    return this.nodes.length;
  }

  get head() {
    return this.size ? this.nodes[0] : null;
  }

  get tail() {
    return this.size ? this.nodes[this.size - 1] : null;
  }

  insertAt(idx: number, value: Type) {
    const previousNode = this.nodes[idx - 1] || null;
    const nextNode = this.nodes[idx] || null;
    const node = { value, next: nextNode, previous: previousNode };

    if (previousNode) previousNode.next = node;
    if (nextNode) nextNode.previous = node;
    this.nodes.splice(idx, 0, node);
  }

  insertFirst(value: Type) {
    this.insertAt(0, value);
  }

  insertLast(value: Type) {
    this.insertAt(this.size, value);
  }

  getAt(idx: number) {
    return this.nodes[idx];
  }

  removeAt(idx: number) {
    const previousNode = this.nodes[idx - 1] || null;
    const nextNode = this.nodes[idx + 1] || null;
    if (previousNode) previousNode.next = nextNode;
    if (nextNode) nextNode.previous = previousNode;
    this.nodes.splice(idx, 1);
  }

  clear() {
    this.nodes = [];
  }

  reverse() {
    this.nodes = this.nodes.reduce((acc, { value }) => {
      const nextNode = acc[0] || null;
      const node = { value, next: nextNode, previous: null };
      if (nextNode) nextNode.previous = node;
      return [node, ...acc];
    }, []);
  }

  /* Generator method */
  *[Symbol.iterator]() {
    yield* this.nodes;
  }
}

export default DoublyLinkedList;
