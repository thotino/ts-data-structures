const { Queue } = require(".");

describe("[unit] Queue", () => {
  test("Should be empty at initialization", () => {
    const queue = new Queue();
    expect(queue.isEmpty()).toBeTruthy();
  });
  test("Should enqueue the elements", () => {
    const queue = new Queue();
    queue.enqueue("A");
    queue.enqueue("Z");
    expect(queue.isEmpty()).toBeFalsy();
    expect(queue.peek()).toEqual("A");
  });
  test("Should enqueue and dequeue the elements", () => {
    const queue = new Queue();
    queue.enqueue("A");
    queue.enqueue("Z");
    queue.dequeue();
    expect(queue.isEmpty()).toBeFalsy();
    expect(queue.peek()).toEqual("Z");
  });
  test("Should enqueue and dequeue the elements", () => {
    const queue = new Queue();
    queue.enqueue("A");
    queue.enqueue("Z");
    queue.dequeue();
    queue.dequeue();
    expect(queue.isEmpty()).toBeTruthy();
  });
});
