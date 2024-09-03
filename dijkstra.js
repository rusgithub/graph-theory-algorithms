import PQ from 'priority-queue'

const MAX_LENGTH = 20000;
const heap = PQ.create(MAX_LENGTH);
const REVERSE_ORDER_MULTIPLIER = -1;

// PQ.queue(heap, 'e', 1 * REVERSE_ORDER_MULTIPLIER)
// PQ.queue(heap, 'f', 9 * REVERSE_ORDER_MULTIPLIER)
// PQ.queue(heap, 'g', 4 * REVERSE_ORDER_MULTIPLIER)

const graph = {
  0: [{ to: 1, weight: 100 }, { to: 2, weight: 50 }],
  1: [{ to: 2, weight: 40 }, { to: 3, weight: 50 }, { to: 4, weight: 50 }, { to: 5, weight: 6 }],
  2: [{ to: 3, weight: 100 }],
  3: [{ to: 4, weight: 75 }, { to: 5, weight: 4 }],
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


function dijkstra(graph, N, dist, prev, startIndex) {
  PQ.queue(heap, startIndex, 0);
  dist[startIndex] = 0;
  
  while(!PQ.isEmpty(heap)) {
    const currentIndex = PQ.dequeue(heap);
    for (const edge of graph[currentIndex]) {
      if (dist[edge.from] + edge.weight < dist[edge.to]) {
        dist[edge.to] = dist[edge.from] + edge.weight;
        PQ.queue(heap, edge.to, edge.weight * REVERSE_ORDER_MULTIPLIER);
        prev[edge.to] = edge.from;
      }
    }
  }

  return [ dist, prev ];
}

function reconstructShortestPath(prev, startIndex, endIndex) {
  let current = endIndex;
  const path = [endIndex];
  while (current != startIndex) {
    current = prev[current];
    path.push(current);
    console.log(path);
  }
  path.push(startIndex);
  return path;
}

const startIndex = 0;
const endIndex = 5;

const [ sp, prev ] = dijkstra(graph, N, dist, {}, startIndex);
const reconstructedPath = reconstructShortestPath(prev, startIndex, endIndex);

// console.log(reconstructedPath);

// Adjacency List
// 0:	(1, 100)	(2, 50)
// 1:	(2, 40)	(3, 50)	(4, 50)	(5, 6)
// 2:	(3, 100)
// 3:	(4, 75)	(5, 4)
// 4:	(5, 3)
// 5:

// DIRECTED WEIGHTED, 0 indexed, adj list
// 6
// 2 1 100 2 50 
// 4 2 40 3 50 4 50 5 6 
// 1 3 100 
// 2 4 75 5 4 
// 1 5 3 
// 0 
