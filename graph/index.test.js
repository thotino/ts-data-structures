const { Graph } = require('.');
describe('[unit] Graph', () => {
    const graph = new Graph();
    beforeAll(() => {
        graph.addNode('a');
        graph.addNode('b');
        graph.addNode('c');
        graph.addNode('d');
        graph.addEdge('a', 'c');
        graph.addEdge('b', 'c');
        graph.addEdge('c', 'b');
        graph.addEdge('d', 'a');
    });
    test('Should have nodes', () => {
        expect(graph.nodes.map(node => node.value)).toStrictEqual(['a', 'b', 'c', 'd']);
    });
    test('Should have edges', () => {
        expect([...graph.edges.values()].map(({ startingNode: a, targetNode: b }) => `${a} => ${b}`)).toStrictEqual(['a => c', 'b => c', 'c => b', 'd => a']);
    });
    test('Should return adjacent', () => {
        expect(graph.adjacent('c')).toStrictEqual(['b']);
    });
    test('Should return the number of edges to a node', () => {
        expect(graph.indegree('c')).toEqual(2);
    });
    test('Should return the number of edges from a node', () => {
        expect(graph.outdegree('c')).toEqual(1);
    });
    test('Should check if edge exists', () => {
        expect(graph.hasEdge('d', 'a')).toBeTruthy();
        expect(graph.hasEdge('a', 'd')).toBeFalsy();
    });
    test('Should remove edge', () => {
        graph.removeEdge('c', 'b');
        expect([...graph.edges.values()].map(({ startingNode: a, targetNode: b }) => `${a} => ${b}`)).toStrictEqual(['a => c', 'b => c', 'd => a']);
    });
    test('Should remove node', () => {
        graph.removeNode('c');
        expect(graph.nodes.map(node => node.value)).toStrictEqual(['a', 'b', 'd']);
        expect([...graph.edges.values()].map(({ startingNode: a, targetNode: b }) => `${a} => ${b}`)).toStrictEqual(['d => a']);
    });
    test('Should set edge weight', () => {
        graph.setEdgeWeight('d', 'a', 5);
        expect(graph.getEdgeWeight('d', 'a')).toEqual(5);
    });
});
export {};
