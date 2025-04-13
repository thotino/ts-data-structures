/**
 * @see https://www.30secondsofcode.org/articles/s/js-data-structures-graph
 * @description A graph is a data structure consisting of a set of nodes or vertices and a set of edges that represent connections between those nodes
 */
class Graph<Key, Value> {
  nodes: { key: Key; value: Value }[];
  edges;
  directed;
  constructor(directed = true) {
    this.nodes = [];
    this.edges = new Map<
      Key,
      {
        startingNode: { key: Key; value: Value };
        targetNode: { key: Key; value: Value };
        weight: number;
      }
    >();
    this.directed = directed;
  }

  addNode(key: Key, value?: Value) {
    this.nodes.push({ key, value: value ?? key });
  }

  addEdge(
    startingNode: { key: Key; value: Value },
    targetNode: { key: Key; value: Value },
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
    [...this.edges.values()].forEach(
      ({ startingNode, targetNode, weight = 0 }) => {
        if (startingNode === key || targetNode === key) {
          this.edges.delete(
            JSON.stringify({ startingNode, targetNode }) as Key,
          );
        }
      },
    );
    this.nodes = this.nodes.filter(({ key: curKey }) => curKey !== key);
  }

  removeEdge(startingNodeKey: Key, targetNodeKey: Key) {
    [...this.edges.values()].forEach(
      ({ startingNode, targetNode, weight = 0 }) => {
        if (startingNode === startingNodeKey && targetNode === targetNodeKey) {
          this.edges.delete(
            JSON.stringify({ startingNode, targetNode }) as Key,
          );
        }
      },
    );
  }

  findNode(key: Key) {
    return this.nodes.find(({ key: curKey }) => curKey === key);
  }

  hasEdge(
    startingNode: { key: Key; value: Value },
    targetNode: { key: Key; value: Value },
    weight = 0,
  ) {
    const key = JSON.stringify({ startingNode, targetNode }) as Key;
    return this.edges.has(key);
  }

  setEdgeWeight(
    startingNode: { key: Key; value: Value },
    targetNode: { key: Key; value: Value },
    weight: number,
  ) {
    const key = JSON.stringify({ startingNode, targetNode }) as Key;
    this.edges.set(key, { startingNode, targetNode, weight });
  }

  getEdgeWeight(
    startingNode: { key: Key; value: Value },
    targetNode: { key: Key; value: Value },
  ) {
    const key = JSON.stringify({ startingNode, targetNode }) as Key;
    const { weight } = this.edges.get(key);
    return weight;
  }

  adjacent(key: Key) {
    return [...this.edges.values()].reduce(
      (acc: { key: Key; value: Value }[], { startingNode, targetNode }) => {
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
