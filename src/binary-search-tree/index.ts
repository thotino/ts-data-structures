/**
 * @see https://www.30secondsofcode.org/articles/s/js-data-structures-binary-search-tree
 * @description A binary search tree is a data structure consisting of a set of ordered linked nodes that represent a hierarchical tree structure
 */
class BinarySearchTreeNode<Key, Value> {
  key;
  value;
  parent;
  left;
  right;
  constructor(
    key: Key,
    value: Value,
    parent?: BinarySearchTreeNode<Key, Value>,
    left?: BinarySearchTreeNode<Key, Value>,
    right?: BinarySearchTreeNode<Key, Value>,
  ) {
    this.key = key;
    this.value = value;
    this.parent = parent;
    this.left = left;
    this.right = right;
  }

  get isLeaf() {
    return !this.left && !this.right;
  }

  get hasChildren() {
    return !this.isLeaf;
  }
}

class BinarySearchTree<Key, Value> {
  readonly root;
  constructor(key: Key, value: Value = key) {
    this.root = new BinarySearchTreeNode(key, value);
  }

  *preOrderTraversal(node = this.root) {
    yield node;
    if (node.hasChildren) {
      if (node.left) yield* this.preOrderTraversal(node.left);
      if (node.right) yield* this.preOrderTraversal(node.right);
    }
  }

  *postOrderTraversal(node = this.root) {
    if (node.hasChildren) {
      if (node.left) yield* this.postOrderTraversal(node.left);
      if (node.right) yield* this.postOrderTraversal(node.right);
    }
    yield node;
  }

  *inOrderTraversal(node = this.root) {
    if (node.left) yield* this.inOrderTraversal(node.left);
    yield node;
    if (node.right) yield* this.inOrderTraversal(node.right);
  }

  insert(key: Key, value: Value = key) {
    const node = this.root;
    while (true) {
      if (node.key === key) return false;
    }
  }

  remove(key: Key) {
    for (const node of this.preOrderTraversal()) {
      if (node.key === key) {
        if (node.left) node.left = null;
        if (node.right) node.right = null;
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
  }
}

export default BinarySearchTree;
