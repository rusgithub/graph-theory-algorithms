const graph = {
  0: [{ to: 1, weight: 3 }, { to: 2, weight: 6 }],
  1: [{ to: 2, weight: 4 }, { to: 3, weight: 4 }, { to: 4, weight: 11 }],
  2: [{ to: 3, weight: 8 }, { to: 6, weight: 11 }],
  3: [{ to: 4, weight: -4 }, { to: 5, weight: 5 }, { to: 6, weight: 2 }],
  4: [{ to: 7, weight: 9 }],
  5: [{ to: 7, weight: 1 }],
  6: [{ to: 7, weight: 2 }],
  7: []
};

function handleNode(nodeIndex, pathCosts, graph, paths) {
  if (pathCosts[nodeIndex] === undefined) pathCosts[nodeIndex] = 0;

  const currentCost = pathCosts[nodeIndex];

  for (const nextNode of graph[nodeIndex]) {
    const newCost = currentCost + nextNode.weight;
    if (pathCosts[nextNode.to] === undefined || newCost < pathCosts[nextNode.to]) {
      pathCosts[nextNode.to] = newCost;
      paths[nextNode.to] = nodeIndex;
    }
    handleNode(nextNode.to, pathCosts, graph, paths);
  }
}

function findShortestPath(graph, start, end) {
  const pathCosts = {};
  const paths = {};

  handleNode(start, pathCosts, graph, paths);
  return { pathCosts, paths };
}

console.log(findShortestPath(graph, 0));

// DIRECTED WEIGHTED
// "For the following graph:
// const graph = {
//   0: [{ to: 1, weight: 3 }, { to: 2, weight: 6 }],
//   1: [{ to: 2, weight: 4 }, { to: 3, weight: 4 }, { to: 4, weight: 11 }],
//   2: [{ to: 3, weight: 8 }, { to: 6, weight: 11 }],
//   3: [{ to: 4, weight: -4 }, { to: 5, weight: 5 }, { to: 6, weight: 2 }],
//   4: [{ to: 7, weight: 9 }],
//   5: [{ to: 7, weight: 1 }],
//   6: [{ to: 7, weight: 2 }],
//   7: []
// };
// Print the result in the following format:

// <total number of nodes>
// <number of connections of the node> <destination node 1> <weight 1> <destination node 2> <weight 2> ...
// ...
// <number of connections of the node> <destination node 1> <weight 1> <destination node 2> <weight 2> ...
// <number of connections of the node> <destination node 1> <weight 1> <destination node 2> <weight 2> ..."

// Example output:
// 8
// 2 1 3 2 6
// 3 2 4 3 4 4 11
// 2 3 8 6 11
// 3 4 -4 5 5 6 2
// 1 7 9
// 1 7 1
// 1 7 2
// 0
