/**
 * @see https://www.30secondsofcode.org/articles/s/js-data-structures-tree
 * @description A tree is a data structure consisting of a set of linked nodes that represent a hierarchical tree structure.
 */
import { TreeNodeInterface } from "../types/node";
class TreeNode<Key, Value> implements TreeNodeInterface<Key, Value> {
  key;
  value;
  parent?: TreeNode<Key, Value>;
  children: TreeNode<Key, Value>[];
  constructor(key: Key, value: Value, parent?: TreeNode<Key, Value>) {
    this.key = key;
    this.value = value;
    this.parent = parent;
    this.children = [];
  }

  get isLeaf(): boolean {
    return this.children.length === 0;
  }

  get hasChildren(): boolean {
    return !this.isLeaf;
  }
}

class Tree<Key, Value> {
  root;
  constructor(key: Key, value: Value) {
    this.root = new TreeNode(key, value);
  }

  *preOrderTraversal(node = this.root): Generator<TreeNode<Key, Value>> {
    yield node;
    if (node.hasChildren) {
      for (const child of node.children) {
        yield* this.preOrderTraversal(child);
      }
    }
  }

  *postOrderTraversal(node = this.root): Generator<TreeNode<Key, Value>> {
    if (node.hasChildren) {
      for (const child of node.children) {
        yield* this.postOrderTraversal(child);
      }
    }
    yield node;
  }

  insert(parentKey: Key, key: Key, value: Value): boolean {
    for (const node of this.preOrderTraversal()) {
      if (node.key === parentKey) {
        const newNode = new TreeNode(key, value, node);
        node.children.push(newNode);
        return true;
      }
    }
    return false;
  }

  remove(key: Key): boolean {
    for (const node of this.postOrderTraversal()) {
      const filtered = node.children.filter(
        (child: TreeNode<Key, Value>) => child.key !== key,
      );
      if (filtered.length !== node.children.length) {
        node.children = filtered;
        return true;
      }
    }
    return false;
  }

  find(key: Key): TreeNode<Key, Value> | null {
    return (
      [...this.preOrderTraversal()].find(({ key: curKey }) => curKey === key) ??
      null
    );
  }
}

export default Tree;
