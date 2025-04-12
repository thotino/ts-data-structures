/**
 * @see https://www.30secondsofcode.org/articles/s/js-data-structures-linked-list
 * @description
 * A linked list is a linear data structure that represents a collection of elements, where each element points to the next one.
 * The first element in the linked list is the head and the last element is the tail.
 */
class LinkedList {
  nodes
  constructor () {
    this.nodes = []
  }

  get size () {
    return this.nodes.length
  }

  get head () {
    return (this.size) ? this.nodes[0] : null
  }

  get tail () {
    return (this.size) ? this.nodes[this.size - 1] : null
  }

  insertAt (idx, value) {
    const previousNode = this.nodes[idx - 1] || null
    const nextNode = this.nodes[idx] || null
    const node = { value, next: nextNode }
    if (previousNode) previousNode.next = node
    this.nodes.splice(idx, 0, node)
  }

  insertFirst (value) {
    this.insertAt(0, value)
  }

  insertLast (value) {
    this.insertAt(this.size, value)
  }

  getAt (idx) {
    return this.nodes[idx]
  }

  removeAt (idx) {
    const previousNode = this.nodes[idx - 1] || null
    const nextNode = this.nodes[idx + 1] || null
    if (previousNode) previousNode.next = nextNode
    return this.nodes.splice(idx, 1)
  }

  clear () {
    return this.nodes.splice(0)
  }

  reverse () {
    this.nodes = this.nodes.reduce(
      (acc, { value }) => [{ value, next: acc[0] || null }, ...acc],
      []
    )
  }

  /* Generator method */
  * [Symbol.iterator] () {
    yield * this.nodes
  }
}

export default LinkedList
