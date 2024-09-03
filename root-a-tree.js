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

class Node {
  id;
  children;

  constructor(id) {
    this.id = id;
    this.children = [];
  }

  addChild(node) {
    this.children.push(node);
  }
}

class Graph {
  root;

  constructor(g, rootNodeId) {
    const rootNode = new Node(rootNodeId);
    this.root = rootNode;
    this.buildTree(g, this.root, null);
  }

  buildTree(g, node, parent) {
    for (const childNodeId of g[node.id]) {
      if (parent !== null && childNodeId === parent.id) continue;
      const childNode = new Node(childNodeId);
      node.addChild(childNode);
      this.buildTree(g, childNode, node);
    }
  }

  encode(node) {
    const result = node.children.reduce((carry, current) => carry + this.encode(current), '');
    return `(${result})`
  }
}

const graph = new Graph(g, 4);

console.log(graph);
console.log(graph.encode(graph.root));

