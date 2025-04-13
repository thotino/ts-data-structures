const { Tree } = require(".");

describe("[unit] Tree", () => {
  const tree = new Tree(1, "AB");
  beforeAll(() => {
    tree.insert(1, 11, "AC");
    tree.insert(1, 12, "BC");
    tree.insert(12, 121, "BG");
  });

  test("Should display nodes", () => {
    expect(tree.root.value).toEqual("AB");
    expect(tree.root.hasChildren).toBeTruthy();
    expect([...tree.preOrderTraversal()].map((x) => x.value)).toStrictEqual([
      "AB",
      "AC",
      "BC",
      "BG",
    ]);
  });

  test("Should find leaves", () => {
    expect(tree.find(12).isLeaf).toBeFalsy();
    expect(tree.find(121).isLeaf).toBeTruthy();
    expect(tree.find(121).parent.value).toEqual("BC");
  });

  test("Should remove a node", () => {
    tree.remove(12);
    expect([...tree.postOrderTraversal()].map((x) => x.value)).toStrictEqual([
      "AC",
      "AB",
    ]);
  });
});
