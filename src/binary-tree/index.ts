/**
 * @see https://www.30secondsofcode.org/articles/s/js-data-structures-binary-tree
 * @description A binary tree is a data structure consisting of a set of linked nodes that represent a hierarchical tree structure.
 */
class BinaryTreeNode<Key, Value> {
  key: Key;
  value: Value;
  parent?: BinaryTreeNode<Key, Value>;
  left?: BinaryTreeNode<Key, Value>;
  right?: BinaryTreeNode<Key, Value>;
  constructor(
    key: Key,
    value: Value,
    parent?: BinaryTreeNode<Key, Value>,
    left?: BinaryTreeNode<Key, Value>,
    right?: BinaryTreeNode<Key, Value>,
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

class BinaryTree<Key, Value> {
  readonly root;
  constructor(key: Key, value: Value) {
    this.root = new BinaryTreeNode(key, value);
  }

  *preOrderTraversal(node = this.root) {
    yield node;
    if (node.hasChildren) {
      if (node.left) yield* this.preOrderTraversal(node.left);
      if (node.right) yield* this.preOrderTraversal(node.right);
    }
  }

  *postOrderTraversal(node = this.root) {
    // if (node.hasChildren) {
    if (node.left) yield* this.postOrderTraversal(node.left);
    if (node.right) yield* this.postOrderTraversal(node.right);
    // }
    yield node;
  }

  *inOrderTraversal(node = this.root) {
    if (node.left) yield* this.inOrderTraversal(node.left);
    yield node;
    if (node.right) yield* this.inOrderTraversal(node.right);
  }

  insert(
    parentKey: Key,
    childKey: Key,
    childValue: Value,
    { left, right } = { left: true, right: true },
  ) {
    for (const node of this.preOrderTraversal()) {
      if (node.key === parentKey) {
        const canInsertLeft = left && !node.left;
        const canInsertRight = right && !node.right;
        if (!canInsertLeft && !canInsertRight) return false;
        const newNode = new BinaryTreeNode(childKey, childValue, node);
        if (canInsertLeft) {
          node.left = newNode;
          return true;
        }
        if (canInsertRight) {
          node.right = newNode;
          return true;
        }
      }
    }
    return false;
  }

  remove(key: Key) {
    for (const node of this.preOrderTraversal()) {
      if (node.left.key === key) {
        node.left = null;
        return true;
      }
      if (node.right.key === key) {
        node.right = null;
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

export default BinaryTree;
