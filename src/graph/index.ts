/**
 * @see https://www.30secondsofcode.org/articles/s/js-data-structures-graph
 * @description A graph is a data structure consisting of a set of nodes or vertices and a set of edges that represent connections between those nodes
 */
import type { GraphNode, GraphEdge } from "../types/node";
class Graph<Key, Value> {
  nodes: GraphNode<Key, Value>[];
  edges: Map<Key, GraphEdge<Key, Value>>;
  directed: boolean;

  constructor(directed = true) {
    this.nodes = [];
    this.edges = new Map<
      Key,
      {
        startingNode: GraphNode<Key, Value>;
        targetNode: GraphNode<Key, Value>;
        weight: number;
      }
    >();
    this.directed = directed;
  }

  addNode(key: Key, value: Value) {
    this.nodes.push({ key, value: value });
  }

  addEdge(
    startingNode: GraphNode<Key, Value>,
    targetNode: GraphNode<Key, Value>,
    weight = 0,
  ) {
    let key = JSON.stringify({ startingNode, targetNode }) as Key;
    this.edges.set(key, { startingNode, targetNode, weight });
    if (!this.directed) {
      key = JSON.stringify({
        startingNode: targetNode,
        targetNode: startingNode,
      }) as Key;
      this.edges.set(key, {
        startingNode: targetNode,
        targetNode: startingNode,
        weight,
      });
    }
  }

  removeNode(key: Key) {
    [...this.edges.values()].forEach(({ startingNode, targetNode }) => {
      if (startingNode === key || targetNode === key) {
        this.edges.delete(JSON.stringify({ startingNode, targetNode }) as Key);
      }
    });
    this.nodes = this.nodes.filter(({ key: curKey }) => curKey !== key);
  }

  removeEdge(startingNodeKey: Key, targetNodeKey: Key) {
    [...this.edges.values()].forEach(({ startingNode, targetNode }) => {
      if (startingNode === startingNodeKey && targetNode === targetNodeKey) {
        this.edges.delete(JSON.stringify({ startingNode, targetNode }) as Key);
      }
    });
  }

  findNode(key: Key) {
    return this.nodes.find(({ key: curKey }) => curKey === key);
  }

  hasEdge(
    startingNode: GraphNode<Key, Value>,
    targetNode: GraphNode<Key, Value>,
  ) {
    const key = JSON.stringify({ startingNode, targetNode }) as Key;
    return this.edges.has(key);
  }

  setEdgeWeight(
    startingNode: GraphNode<Key, Value>,
    targetNode: GraphNode<Key, Value>,
    weight: number,
  ) {
    const key = JSON.stringify({ startingNode, targetNode }) as Key;
    this.edges.set(key, { startingNode, targetNode, weight });
  }

  getEdgeWeight(
    startingNode: GraphNode<Key, Value>,
    targetNode: GraphNode<Key, Value>,
  ) {
    const key = JSON.stringify({ startingNode, targetNode }) as Key;
    const edge = this.edges.get(key);
    return edge?.weight ?? null;
  }

  adjacent(key: Key) {
    return [...this.edges.values()].reduce(
      (acc: GraphNode<Key, Value>[], { startingNode, targetNode }) => {
        if (startingNode === key) acc.push(targetNode);
        return acc;
      },
      [],
    );
  }

  indegree(key: Key) {
    return [...this.edges.values()].reduce((acc, { targetNode }) => {
      if (targetNode === key) {
        acc++;
      }
      return acc;
    }, 0);
  }

  outdegree(key: Key) {
    return [...this.edges.values()].reduce((acc, { startingNode }) => {
      if (startingNode === key) acc++;
      return acc;
    }, 0);
  }
}

export default Graph;
