const adjMatrix = {
  'A': [0, 4, 1, 9],
  'B': [3, 0, 6, 11],
  'C': [4, 1, 0, 2],
  'D': [6, 5, -4, 0],
}

// [
//   { path: ['A', 'B', 'C', 'D'], cost: 20 },
// ]

class Path {
  nodes = [];
  cost = 0;

  constructor(nodes) {
    this.nodes = nodes;
  }

  addNode(node) {
    this.nodes.push(node);
  }

  addCost(cost) {
    this.cost = this.cost + cost;
  }

  clone() {
    const newPath = new Path([...this.nodes]);
    newPath.cost = this.cost;
    return new Path([...this.nodes]);
  }
}

// A  B  C

// D  E  F

// G  H  I

class PathFinder {
  paths = [];

  constructor(adjMatrix) {
    this.adjMatrix = adjMatrix;
    
    this.nodes = Object.keys(adjMatrix);
    this.matrixNodesCount = this.nodes.length;
  }

  traverse(startNode) {
    this.paths = [];
    const path = new Path([startNode]);
    for (const nodeToIndex in this.adjMatrix[startNode]) {
      const visited = {};
      this.dfs(this.adjMatrix, startNode, startNode, nodeToIndex, path.clone(), visited);
    }
  
    return this.paths;
  }

  dfs(adjMatrix, startNode, from, toIndex, path, visited) {
    const nodeTo = this.nodes[toIndex];
    const cost = adjMatrix[from][toIndex];
  
    if (nodeTo === startNode) {
      // console.log('returned to startNode', path);
      // console.log(path.nodes.length, this.matrixNodesCount);
      if (path.nodes.length === this.matrixNodesCount) {
        path.addNode(nodeTo);
        path.addCost(cost);
        this.paths.push(path);
      }
      return;
    }
  
    if (nodeTo === from || visited[nodeTo] === true) {
      return;
    };
    visited[nodeTo] = true;
    
    path.addNode(nodeTo);
    path.addCost(cost);

    for (const nodeToIndex in adjMatrix[nodeTo]) {
      this.dfs(adjMatrix, startNode, nodeTo, nodeToIndex, path, visited);
    }
  }
}

const pathFinder = new PathFinder(adjMatrix);

console.log(pathFinder.traverse('A'));
