// - class를 만들어서 this.edge 와 this.vertex를 만든다.
// - 거기에 그것들을 조작하는 메서드들을 만든다.
// - addVertex(vertex)는 this.edge에 새로운 edge를 추가한다. 
// - addEdge(v1,v2)는 두 엣지에 연결을 하는데 v1에 key 값을 줘서 그 value는 배열로 줘서 안에 연결 되는 vertex 를 넣는다.
// 그리고 this.edges에 v1: v2, v2:v1를 해서 표현한다.
// - addDirectedEdge는 위와 달리 v1:v2 만 넣는다.
// - hasVertex는 this.vertices에 그 해당되는 vertex 의 키값이 있는지 확인 후 반환.
// - isConnected는 this.Edge를 확인해서 있는지 확인후 반환.
// - getGraph는 this.vertices와 this.edge 반환.


// - BFS 는 찾는 vertex 부터 시작해서 그 vertex를 넣어서 
// 그 vertex에 edge로 연결된 vertex를 queue에 넣어 준다. 반복한다.

// - DFS는 binary search 처럼 stack 에 vertex를 넣어서 edge로 
// 연결된 vertices를 넣으면서 재귀로 돌리자.
const Queue = require('../Queue.test');
const Stack = require('../stack.test');


class Graph {
    constructor() {
        this.edges = {};
        this.vertices = [];
        this.queue = new Queue();
        this.path = [];
        this.completed = {};
    }

    addVertex(vertex) {
        if (this.hasVertex(vertex)) {
            return;
        }
        this.vertices.push(vertex);
        this.edges[vertex] = [];
    }

    hasVertex(vertex) {
        return this.edges.hasOwnProperty(vertex);
    }

    addEdge(vertex1, vertex2) {
        this.edges[vertex1].push(vertex2);
        this.edges[vertex2].push(vertex1);
    }

    addDirectedEdge(from, to) {
        if (this.isConnected(from, to) || this.isConnected(to, from)) {
            throw new Error('error already has edge');
        }
        this.edges[from].push(to);
    }

    isConnected(from, to) {
        return !!this.edges[from].find(x => x === to);
    }

    getGraph() {
        return this.vertices
            .map(x => `${x} => ${this.edges[x].join(' ')}`
            );
    }

    bfs(vertex) {
        const findPath = [];
        const queue = new Queue();
        let completed = {};
        queue.enqueue(vertex);
        findPath.push(vertex);
        completed[vertex] = true;
        while (!queue.isEmpty()) {
            const head = queue.dequeue()
            this.edges[head].forEach(connectedVertex => {
                if (!completed[connectedVertex]) {
                    completed[connectedVertex] = true;
                    findPath.push(connectedVertex)
                    queue.enqueue(connectedVertex)
                }
            })
        }
        return findPath
    }


    DFS(vertex, path = [], completed = {}) {

        path.push(vertex)
        completed[vertex] = true;
        this.edges[vertex].forEach(connectedVertex => {
            if (!completed[connectedVertex]) {
                return this.DFS(connectedVertex, path, completed);
            }
        })
        console.log(path)
        return path
    }

}

test('BFS', () => {
    const graph = new Graph();

    const vertices = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H'];
    vertices.forEach(vertex =>
        graph.addVertex(vertex)
    );

    const edges = [['A', 'B'], ['A', 'C'], ['B', 'D'], ['B', 'E'], ['D', 'G'], ['E', 'H'], ['C', 'F']];
    edges.forEach(([from, to]) =>
        graph.addDirectedEdge(from, to)
    );

    expect(graph.bfs('A')).toEqual(['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H']);

    expect(graph.bfs('C')).toEqual(['C', 'F']);

    graph.addDirectedEdge('E', 'C')

    expect(graph.bfs('A')).toEqual(['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H']);


    graph.addDirectedEdge('H', 'F')
    expect(graph.bfs('A')).toEqual(['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H']);


    const graphBothWay = new Graph();

    vertices.forEach(vertex =>
        graphBothWay.addVertex(vertex)
    );

    edges.forEach(([from, to]) =>
        graphBothWay.addEdge(from, to)
    );

    expect(graphBothWay.bfs('A')).toEqual(['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H']);

    expect(graphBothWay.bfs('C')).toEqual([
        'C', 'A', 'F',
        'B', 'D', 'E',
        'G', 'H'
    ]);

    graphBothWay.addEdge('E', 'C')

    expect(graphBothWay.bfs('A')).toEqual(['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H']);


    graphBothWay.addEdge('H', 'F')
    expect(graphBothWay.bfs('A')).toEqual(['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H']);


})

test('DFS', () => {
    const graph = new Graph();

    const vertices = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H'];
    vertices.forEach(vertex =>
        graph.addVertex(vertex)
    );

    const edges = [['A', 'B'], ['A', 'C'], ['B', 'D'], ['B', 'E'], ['D', 'G'], ['E', 'H'], ['C', 'F']];
    edges.forEach(([from, to]) =>
        graph.addDirectedEdge(from, to)
    );

    expect(graph.DFS('A')).toEqual(
        [
            'A', 'B', 'D',
            'G', 'E', 'H',
            'C', 'F'
        ]);

    expect(graph.DFS('D')).toEqual(
        ['D', 'G']);

    graph.addDirectedEdge('E', 'C')

    expect(graph.DFS('E')).toEqual(
        ['E', 'H', 'C', 'F']);


    expect(graph.DFS('A')).toEqual(  
        [
           'A', 'B', 'D',
           'G', 'E', 'H',
           'C', 'F'
         ]);

    const graphBothWay = new Graph();

    vertices.forEach(vertex =>
        graphBothWay.addVertex(vertex)
    );

    edges.forEach(([from, to]) =>
        graphBothWay.addEdge(from, to)
    );

    expect(graphBothWay.DFS('A')).toEqual(
        [
            'A', 'B', 'D',
            'G', 'E', 'H',
            'C', 'F'
        ]);

    expect(graphBothWay.DFS('D')).toEqual(
        [
            'D', 'B', 'A',
            'C', 'F', 'E',
            'H', 'G'
        ]);

    graphBothWay.addEdge('E', 'C')

    expect(graphBothWay.DFS('D')).toEqual(
        [
            'D', 'B', 'A',
            'C', 'F', 'E',
            'H', 'G'
        ]);

    graphBothWay.addEdge('H', 'F')

    expect(graphBothWay.DFS('D')).toEqual(
        [
            'D', 'B', 'A',
            'C', 'F', 'H',
            'E', 'G'
        ]);

    graphBothWay.addEdge('F', 'G')

    expect(graphBothWay.DFS('D')).toEqual(
        [
            'D', 'B', 'A',
            'C', 'F', 'H', 'E',
            'G'
        ]);
})

test('addVertex', () => {
    const graph = new Graph();

    graph.addVertex('A');
    graph.addVertex('A');

    expect(graph.vertices.length).toBe(1);

    expect(graph.hasVertex('A')).toBe(true);

    expect(graph.hasVertex('B')).toBe(false);

})

test('addEdge', () => {
    const graph = new Graph();

    const vertices = ['A', 'B', 'C', 'A'];
    vertices.forEach(vertex =>
        graph.addVertex(vertex)
    );

    graph.addEdge('A', 'B');

    expect(graph.isConnected('A', 'B')).toBe(true);
    expect(graph.isConnected('B', 'A')).toBe(true);
    expect(graph.isConnected('A', 'C')).toBe(false);
})

test('addDirectedEdge', () => {
    const graph = new Graph();

    const vertices = ['A', 'B', 'C'];
    vertices.forEach(vertex =>
        graph.addVertex(vertex)
    );

    graph.addDirectedEdge('A', 'B');

    expect(graph.isConnected('A', 'B')).toBe(true);

    expect(graph.isConnected('B', 'A')).toBe(false);

    expect(() => graph.addDirectedEdge('B', 'A')).toThrowError('error already has edge');
})

test('getGraph', () => {
    const graph = new Graph();

    const vertices = ['A', 'B', 'C'];
    vertices.forEach(vertex =>
        graph.addVertex(vertex)
    );

    const edges = [['A', 'B'], ['A', 'C']];
    edges.forEach(([from, to]) =>
        graph.addDirectedEdge(from, to)
    );

    expect(graph.getGraph()).toEqual([
        'A => B C',
        'B => ',
        'C => ',
    ]);
});
