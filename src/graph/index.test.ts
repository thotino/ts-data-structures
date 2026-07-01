import Graph from ".";
import { describe, beforeAll, test, expect } from "vitest";

describe("Graph", () => {
  const graph = new Graph();
  beforeAll(() => {
    graph.addNode("a", "a");
    graph.addNode("b", "b");
    graph.addNode("c", "c");
    graph.addNode("d", "d");

    graph.addEdge({ key: "a", value: "a" }, { key: "c", value: "c" });
    graph.addEdge({ key: "b", value: "b" }, { key: "c", value: "c" });
    graph.addEdge({ key: "c", value: "c" }, { key: "b", value: "b" });
    graph.addEdge({ key: "d", value: "d" }, { key: "a", value: "a" });
  });

  test("Should have nodes", () => {
    expect(graph.nodes.map((node) => node.value)).toStrictEqual([
      "a",
      "b",
      "c",
      "d",
    ]);
  });
  test("Should have edges", () => {
    expect(
      [...graph.edges.values()].map(
        ({ startingNode: a, targetNode: b }) => `${a} => ${b}`,
      ),
    ).toStrictEqual(["a => c", "b => c", "c => b", "d => a"]);
  });
  test("Should return adjacent", () => {
    expect(graph.adjacent("c")).toStrictEqual(["b"]);
  });
  test("Should return the number of edges to a node", () => {
    expect(graph.indegree("c")).toEqual(2);
  });
  test("Should return the number of edges from a node", () => {
    expect(graph.outdegree("c")).toEqual(1);
  });
  test("Should check if edge exists", () => {
    expect(graph.hasEdge({ key: "d", value: "d" }, { key: "a", value: "a" })).toBeTruthy();
    expect(graph.hasEdge({ key: "a", value: "a" }, { key: "d", value: "d" })).toBeFalsy();
  });
  test("Should remove edge", () => {
    graph.removeEdge("c", "b");
    expect(
      [...graph.edges.values()].map(
        ({ startingNode: a, targetNode: b }) => `${a} => ${b}`,
      ),
    ).toStrictEqual(["a => c", "b => c", "d => a"]);
  });
  test("Should remove node", () => {
    graph.removeNode("c");
    expect(graph.nodes.map((node) => node.value)).toStrictEqual([
      "a",
      "b",
      "d",
    ]);
    expect(
      [...graph.edges.values()].map(
        ({ startingNode: a, targetNode: b }) => `${a} => ${b}`,
      ),
    ).toStrictEqual(["d => a"]);
  });
  test("Should set edge weight", () => {
    graph.setEdgeWeight({key: "d", value: "d"}, {key: "a", value: "a"}, 5);
    expect(graph.getEdgeWeight({key: "d", value: "d"}, {key: "a", value: "a"})).toEqual(5);
  });
});
