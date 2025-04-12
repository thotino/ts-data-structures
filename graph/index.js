/**
 * @see https://www.30secondsofcode.org/articles/s/js-data-structures-graph
 * @description A graph is a data structure consisting of a set of nodes or vertices and a set of edges that represent connections between those nodes
 */
class Graph {
    constructor(directed = true) {
        this.nodes = [];
        this.edges = new Map();
        this.directed = directed;
    }
    addNode(key, value = key) {
        this.nodes.push({ key, value });
    }
    addEdge(startingNode, targetNode, weight = 0) {
        let key = JSON.stringify({ startingNode, targetNode });
        this.edges.set(key, { startingNode, targetNode, weight });
        if (!this.directed) {
            key = JSON.stringify({ startingNode: targetNode, targetNode: startingNode });
            this.edges.set(key, { startingNode: targetNode, targetNode: startingNode, weight });
        }
    }
    removeNode(key) {
        [...this.edges.values()].forEach(({ startingNode, targetNode, weight = 0 }) => {
            if (startingNode === key || targetNode === key) {
                this.edges.delete(JSON.stringify({ startingNode, targetNode }));
            }
        });
        this.nodes = this.nodes.filter(({ key: curKey }) => (curKey !== key));
    }
    removeEdge(startingNodeKey, targetNodeKey) {
        [...this.edges.values()].forEach(({ startingNode, targetNode, weight = 0 }) => {
            if (startingNode === startingNodeKey && targetNode === targetNodeKey) {
                this.edges.delete(JSON.stringify({ startingNode, targetNode }));
            }
        });
    }
    findNode(key) {
        return this.nodes.find(({ key: curKey }) => { curKey === key; });
    }
    hasEdge(startingNode, targetNode, weight = 0) {
        const key = JSON.stringify({ startingNode, targetNode });
        return this.edges.has(key);
    }
    setEdgeWeight(startingNode, targetNode, weight) {
        const key = JSON.stringify({ startingNode, targetNode });
        this.edges.set(key, { startingNode, targetNode, weight });
    }
    getEdgeWeight(startingNode, targetNode) {
        const key = JSON.stringify({ startingNode, targetNode });
        const { weight } = this.edges.get(key);
        return weight;
    }
    adjacent(key) {
        return [...this.edges.values()].reduce((acc, { startingNode, targetNode }) => {
            if (startingNode === key)
                acc.push(targetNode);
            return acc;
        }, []);
    }
    indegree(key) {
        return [...this.edges.values()].reduce((acc, { targetNode }) => {
            if (targetNode === key) {
                acc++;
            }
            return acc;
        }, 0);
    }
    outdegree(key) {
        return [...this.edges.values()].reduce((acc, { startingNode }) => {
            if (startingNode === key)
                acc++;
            return acc;
        }, 0);
    }
}
export default Graph;
