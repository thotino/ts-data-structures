/**
 * @see https://www.30secondsofcode.org/articles/s/js-data-structures-binary-search-tree
 * @description A binary search tree is a data structure consisting of a set of ordered linked nodes that represent a hierarchical tree structure
 */
import { TreeNodeInterface } from "../types/node";
class BinarySearchTreeNode<Key, Value> implements TreeNodeInterface<Key, Value> {
  key;
  value;
  parent?;
  left?;
  right?;
  constructor(
    key: Key,
    value: Value,
    parent?: BinarySearchTreeNode<Key, Value> | null,
    left?: BinarySearchTreeNode<Key, Value> | null,
    right?: BinarySearchTreeNode<Key, Value> | null,
  ) {
    this.key = key;
    this.value = value;
    this.parent = parent;
    this.left = left;
    this.right = right;
  }

  get isLeaf(): boolean {
    return this.left == null && this.right == null;
  }

  get hasChildren(): boolean {
    return !this.isLeaf;
  }
}

class BinarySearchTree<Key, Value> {
  readonly root;
  constructor(key: Key, value: Value) {
    this.root = new BinarySearchTreeNode(key, value);
  }

  *preOrderTraversal(
    node = this.root,
  ): Generator<BinarySearchTreeNode<Key, Value>> {
    yield node;
    if (node.hasChildren) {
      if (node.left) yield* this.preOrderTraversal(node.left);
      if (node.right) yield* this.preOrderTraversal(node.right);
    }
  }

  *postOrderTraversal(
    node = this.root,
  ): Generator<BinarySearchTreeNode<Key, Value>> {
    if (node.hasChildren) {
      if (node.left) yield* this.postOrderTraversal(node.left);
      if (node.right) yield* this.postOrderTraversal(node.right);
    }
    yield node;
  }

  *inOrderTraversal(
    node = this.root,
  ): Generator<BinarySearchTreeNode<Key, Value>> {
    if (node.left) yield* this.inOrderTraversal(node.left);
    yield node;
    if (node.right) yield* this.inOrderTraversal(node.right);
  }

  insert(key: Key, value: Value) {
    let node = this.root;
    while (true) {
      if (node.key === key) return false;
      if (node.key > key) {
        if (node.left != null) node = node.left;
        else {
          node.left = new BinarySearchTreeNode(key, value, node);
          return true;
        }
      } else if (node.key < key) {
        if (node.right != null) node = node.right;
        else {
          node.right = new BinarySearchTreeNode(key, value, node);
          return true;
        }
      }
    }
  }

  has(key: Key) {
    for (const node of this.postOrderTraversal()) {
      if (node.key === key) return true;
    }
    return false;
  }

  remove(key: Key) {
    for (let node of this.preOrderTraversal()) {
      if (node.key === key) {
        if (node.left) node.left = null;
        if (node.right) node.right = null;
        // @ts-expect-error
        node = null;
        return true;
      }
    }
    return false;
  }

  find(key: Key) {
    for (const node of this.preOrderTraversal()) {
      if (node.key === key) {
        return node;
      }
    }
    return null;
  }
}

export default BinarySearchTree;
