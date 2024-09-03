const graph = {
  0: [{ to: 1, weight: 100 }, { to: 2, weight: 50 }],
  1: [{ to: 2, weight: 40 }, { to: 3, weight: 50 }, { to: 4, weight: 50 }, { to: 5, weight: 6 }],
  2: [{ to: 3, weight: 100 }],
  3: [{ to: 4, weight: 75 }, { to: 5, weight: 4 }, { to: 2, weight: -10 }], // { to: 2, weight: -10 } is a part of a negative cycle
  4: [{ to: 5, weight: 3 }],
  5: []
};

class Edge {
  constructor(from, to, weight) {
    this.from = from;
    this.to = to;
    this.weight = weight;
  }
}

Object.keys(graph).forEach(key => {
  graph[key] = graph[key].map(item => new Edge(key, item.to, item.weight));
})

const N = Object.keys(graph).length;
const dist = (new Array(N)).fill(Number.POSITIVE_INFINITY);


function bellmanFord(graph, N, dist, prev, startIndex) {
  dist[startIndex] = 0;

  for (let i = 0; i < N; i++) {
    Object.entries(graph).forEach(([index, edges]) => {
      edges.forEach(edge => {
        const newDist = dist[edge.from] + edge.weight;
        if (newDist < dist[edge.to]) {
          dist[edge.to] = newDist;
        }
      })
    })
  } 

  for (let i = 0; i < N; i++) {
    Object.entries(graph).forEach(([index, edges]) => {
      edges.forEach(edge => {
        const newDist = dist[edge.from] + edge.weight;
        if (newDist < dist[edge.to]) {
          dist[edge.to] = Number.NEGATIVE_INFINITY;
        }
      })
    })
  }

  return [ dist, undefined ];
}

const startIndex = 0;
const endIndex = 5;

const [ sp, prev ] = bellmanFord(graph, N, dist, {}, startIndex);

// console.log(reconstructedPath);

// Adjacency List
// 0:	(1, 100)	(2, 50)
// 1:	(2, 40)	(3, 50)	(4, 50)	(5, 6)
// 2:	(3, 100)
// 3:	(4, 75)	(5, 4), (2, -10)
// 4:	(5, 3)
// 5:

// DIRECTED WEIGHTED, 0 indexed, adj list
// 6
// 2 1 100 2 50 
// 4 2 40 3 50 4 50 5 6 
// 1 3 100 
// 3 4 75 5 4 2 -10
// 1 5 3 
// 0 
