const g = {
  0: [1, 2, 3],
  1: [0, 4],
  2: [0, 5, 6],
  3: [0, 7],
  4: [1, 8],
  5: [2, 9],
  6: [2, 10],
  7: [3, 11],
  8: [4, 12],
  9: [5, 13],
  10: [6, 14],
  11: [7],
  12: [8],
  13: [9],
  14: [10]
};

function findCenters(g) {
  let leaves = [];
  const degrees = {};
  const nodes = Object.keys(g);
  for (const node in nodes) {
    let degree = g[node].length;
    if (degree === 1) {
      leaves.push(node);
      degree = 0;
    }
    degrees[node] = degree;
  }

  let count = leaves.length;

  while (count < nodes.length) {
    const newLeaves = [];
    for (const leave of leaves) {
      for (const neighbor of g[leave]) {
        if (--degrees[neighbor] === 1) {
          newLeaves.push(neighbor);
          degrees[neighbor] = 0;
        }
      }
    }
    // console.log(newLeaves, newLeaves.length);
    count += newLeaves.length;
    leaves = newLeaves;
  }

  return leaves;
}

console.log(findCenters(g));