import BinaryTree from ".";
import { describe, beforeAll, test, expect } from "vitest";

describe("[unit] BinaryTree", () => {
  const tree = new BinaryTree(1, "AB");
  beforeAll(() => {
    tree.insert(1, 11, "AC");
    tree.insert(1, 12, "BC");
    tree.insert(12, 121, "BG", { right: true });
  });
  test("Should traverse the tree", () => {
    expect([...tree.preOrderTraversal()].map((x) => x.value)).toStrictEqual([
      "AB",
      "AC",
      "BC",
      "BG",
    ]);
    expect([...tree.inOrderTraversal()].map((x) => x.value)).toStrictEqual([
      "AC",
      "AB",
      "BC",
      "BG",
    ]);
  });
  test("Should check root and leaves", () => {
    expect(tree.root.value).toEqual("AB");
    expect(tree.root.hasChildren).toBeTruthy();
    expect(tree.find(12).isLeaf).toBeFalsy();
    expect(tree.find(121).isLeaf).toBeTruthy();
    expect(tree.find(121).parent.value).toEqual("BC");
    expect(tree.find(12).left).toBeUndefined();
    expect(tree.find(12).right.value).toEqual("BG");
  });
  test("Should remove leaves", () => {
    tree.remove(12);
    expect([...tree.postOrderTraversal()].map((x) => x.value)).toStrictEqual([
      "AC",
      "AB",
    ]);
  });
});
