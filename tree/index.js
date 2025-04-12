/**
 * @see https://www.30secondsofcode.org/articles/s/js-data-structures-tree
 * @description A tree is a data structure consisting of a set of linked nodes that represent a hierarchical tree structure.
 */
class TreeNode {
    key;
    value;
    parent;
    children;
    constructor(key, value = key, parent = null) {
        this.key = key;
        this.value = value;
        this.parent = parent;
        this.children = [];
    }
    get isLeaf() {
        return this.children.length === 0;
    }
    get hasChildren() {
        return !this.isLeaf;
    }
}
class Tree {
    root;
    constructor(key, value) {
        this.root = new TreeNode(key, value);
    }
    *preOrderTraversal(node = this.root) {
        yield node;
        if (node.hasChildren) {
            for (const child of node.children) {
                yield* this.preOrderTraversal(child);
            }
        }
    }
    *postOrderTraversal(node = this.root) {
        if (node.hasChildren) {
            for (const child of node.children) {
                yield* this.postOrderTraversal(child);
            }
        }
        yield node;
    }
    insert(parentKey, key, value) {
        for (const node of this.preOrderTraversal()) {
            if (node.key === parentKey) {
                const newNode = new TreeNode(key, value, node);
                node.children.push(newNode);
                return true;
            }
        }
        return false;
    }
    remove(key) {
        for (const node of this.postOrderTraversal()) {
            const filtered = node.children.filter(child => (child.key !== key));
            if (filtered.length !== node.children.length) {
                node.children = filtered;
                return true;
            }
        }
        return false;
    }
    find(key) {
        return [...this.preOrderTraversal()].find(({ key: curKey }) => (curKey === key));
    }
}
export default Tree;
