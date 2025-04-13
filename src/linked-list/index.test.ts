const { LinkedList } = require(".");

describe("[unit] LinkedList", () => {
  const list = new LinkedList();
  beforeAll(() => {
    list.insertFirst(1);
    list.insertFirst(2);
    list.insertFirst(3);
    list.insertLast(4);
    list.insertAt(3, 5);
  });

  test("Should have elements", () => {
    expect(list.size).toEqual(5);
    expect(list.head.value).toEqual(3);
    expect(list.head.next.value).toEqual(2);
    expect(list.tail.value).toEqual(4);
    expect([...list.nodes.map((node) => node.value)]).toStrictEqual([
      3, 2, 1, 5, 4,
    ]);
  });

  test("Should remove an element", () => {
    list.removeAt(1);
    expect(list.getAt(1).value).toEqual(1);
    expect(list.head.next.value).toEqual(1);
    expect([...list.nodes.map((node) => node.value)]).toStrictEqual([
      3, 1, 5, 4,
    ]);
  });

  test("Should reverse the list", () => {
    list.reverse();
    expect([...list.nodes.map((node) => node.value)]).toStrictEqual([
      4, 5, 1, 3,
    ]);
  });

  test("Should clear the list", () => {
    list.clear();
    expect(list.size).toEqual(0);
  });
});
