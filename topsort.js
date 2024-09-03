const graph = {
  0: [1, 2, 3],
  1: [4, 5],
  2: [5, 6],
  3: [6, 7],
  4: [8],
  5: [9],
  6: [7],
  7: [8],
  8: [9],
  9: []
};

function dfs(i, V, graph, visitedNodes) {
  V[i] = true;

  for (let to of graph[i]) {
    if (V[to] !== true) {
      dfs(to, V, graph, visitedNodes);
    }
  }
  visitedNodes.push(i);
}

function topSort(graph) {
  const sorted = [];

  const numOfNodes = Object.keys(graph).length;
  let ordering = numOfNodes - 1;

  const V = {};

  for (let i = 0; i < numOfNodes; i++) {
    const visitedNodes = [];
    if (V[i] !== true) dfs(i, V, graph, visitedNodes);
    for (const visitedNode of visitedNodes) {
      sorted[ordering] = visitedNode;
      ordering--;
    }
  }

  return sorted;
}

console.log(topSort(graph));

// 10
// 3 1 2 3 
// 2 4 5 
// 2 5 6 
// 2 6 7 
// 1 8 
// 1 9 
// 1 7 
// 1 8 
// 1 9 
// 0 

