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

const lows = {}; //nodeIndex: lowLinkId
const ids = {}; //nodeIndex: id
const visited = {};
let lastId = 0;

Object.keys(graph).forEach(key => {
  graph[key] = graph[key].map(item => new Edge(key, item.to, item.weight));
  lows[key] = Number.POSITIVE_INFINITY;
})

const currentChainIds = {};
const stack = [];

function clearComponentStack(stack, clearToIndex, lowLinkId) {
  let current = stack.pop();
  lows[current] = lowLinkId;
  delete currentChainIds[ids[current]];
  let index = stack.length;

  while (current !== clearToIndex) {
    current = stack[index];
    if (currentChainIds[ids[current]] === true) {
      stack.splice(index, 1);
      delete currentChainIds[ids[current]];
      lows[current] = lowLinkId;
    }
    index = index - 1;
  }
}

function tarjansConnectedComponentsFinder(graph, visited) {
  for (const nodeIndex of Object.keys(graph)) {
    if (visited[nodeIndex] === true) continue;
    
    stack.push(Number(nodeIndex));

    while (stack.length > 0) {
      const currentIndex = stack[stack.length - 1];

      if (visited[currentIndex] === true) {
        stack.pop();
        if (currentChainIds[ids[currentIndex]] === true) {
          clearComponentStack(stack, currentIndex, ids[currentIndex]);
        }
        continue;
      }

      ids[currentIndex] = ++lastId;
      currentChainIds[ids[currentIndex]] = true;
      visited[currentIndex] = true;

      for (const node of graph[currentIndex]) {
        stack.push(node.to);
      }
    }
  }
}

tarjansConnectedComponentsFinder(graph, visited);
console.log(lows);

// e: true
// c: true
// a: true
// ---
// e a
// c e - vis
// c d
// a c  - vis
// a b
// a - vis     

// const currentChainIds = { '1': true, '3': true, '5': true };
// const stack = [1, 2, 3, 4, 5];
// clearComponentStack(stack, 3); // [ 1, 2 ]       { '1': true }





//



1
