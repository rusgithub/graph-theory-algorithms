// 0: 1
// 1: 2
// 2: 3 4
// 3: 0
// 4: 5
// 5: 6
// 6: 7
// 7: 4

const graph = {
  0: [{ to: 1 }],
  1: [{ to: 2 }],
  2: [{ to: 3 }, { to: 4 }],
  3: [{ to: 0 }],
  4: [{ to: 5 }],
  5: [{ to: 6 }],
  6: [{ to: 7 }],
  7: [{ to: 4 }]
};

class Edge {
  constructor(from, to) {
    this.from = from;
    this.to = to;
  }
}

const low = {};
const visited = {};
// const ids = {};

Object.keys(graph).forEach(key => {
  graph[key] = graph[key].map(item => new Edge(key, item.to, item.weight));
  low[key] = Number.POSITIVE_INFINITY;
})

const bridges = [];

function dfs(graph, index, parentIndex, low, visited) {
  visited[index] = true;
  
  for (const edge of graph[index]) {
    if (visited[edge.to] === true) {
      low[edge.from] = edge.to;
    } else {
      dfs(graph, edge.to, edge.from, low, visited);
      low[edge.from] = Math.min(low[edge.from], low[edge.to]);
      if (low[parentIndex] < low[edge.from]) {
        bridges.push(new Edge(parentIndex, index));
      }
    }
  }
}


function findBridges(graph, index, low, visited) {
  dfs(graph, index, -1, low, visited);
}

findBridges(graph, 0, low, visited);

console.log(low);
console.log(bridges);
