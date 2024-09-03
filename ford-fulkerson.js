class Edge {
  constructor(from, to, capacity) {
    this.from = from;
    this.to = to;
    this.capacity = capacity;
    this.consumed = 0;
  }

  getRemainingCapacity() {
    return this.capacity - this.consumed;
  }

  consumeCapacity(value) {
    this.consumed += value;
    this.residual.consumed -= value;
  }
}

class Solver {
  graph = {}

  addEdge(from, to, capacity) {
    if (this.graph[from] === undefined) this.graph[from] = [];
    if (this.graph[to] === undefined) this.graph[to] = [];
    const e1 = new Edge(from, to, capacity);
    const e2 = new Edge(to, from, 0); // residual edge
    e1.residual = e2;
    e2.residual = e1;
    this.graph[from].push(e1);
    this.graph[to].push(e2);
  }

  getGraph() {
    return this.graph;
  }
}

const solver = new Solver();
solver.addEdge('s', 1, 10);
solver.addEdge(1, 3, 15);
solver.addEdge(3, 0, 6);
solver.addEdge(0, 2, 25);
solver.addEdge(2, 't', 10);
solver.addEdge('s', 0, 10);
solver.addEdge(3, 't', 10);

const graph = solver.getGraph();
console.log('initial graph', graph);

function dfs(node, maxFlow, visited) {
  console.log('visited node:', node);
  visited[node] = true;
  if (node === 't') return maxFlow;

  for (const edge of graph[node]) {
    if (edge.getRemainingCapacity() === 0 || visited[edge.to] === true) continue;

    const flow = dfs(edge.to, Math.min(edge.getRemainingCapacity(), maxFlow), visited);

    if (flow > 0) {
      edge.consumeCapacity(flow);
      return flow;
    }
  }

  return 0;
}

let generalFlow = 0;

do {
  const visited = {};
  const flow = dfs('s', Number.POSITIVE_INFINITY, visited);
  console.log('local flow', flow);
  if (flow === 0) break;
  generalFlow += flow;
} while(true);

console.log('processed graph', graph);
console.log('result flow', generalFlow);

// 2 t
// 0 2
// 3 0
// 1 3
// s 1