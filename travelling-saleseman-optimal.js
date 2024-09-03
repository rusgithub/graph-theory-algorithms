class TspDynamicProgrammingIterative {
  constructor(start, distance) {
    this.N = distance.length;
    if (this.N <= 2) throw new Error("N <= 2 not yet supported.");
    if (this.N !== distance[0].length) throw new Error("Matrix must be square (n x n)");
    if (start < 0 || start >= this.N) throw new Error("Invalid start node.");
    if (this.N > 32) throw new Error(
      "Matrix too large! A matrix that size for the DP TSP problem with a time complexity of " +
      "O(n^2*2^n) requires way too much computation for any modern home computer to handle"
    );

    this.start = start;
    this.distance = distance;
    this.tour = [];
    this.minTourCost = Number.POSITIVE_INFINITY;
    this.ranSolver = false;
  }

  getTour() {
    if (!this.ranSolver) this.solve();
    return this.tour;
  }

  getTourCost() {
    if (!this.ranSolver) this.solve();
    return this.minTourCost;
  }

  solve() {
    if (this.ranSolver) return;

    const END_STATE = (1 << this.N) - 1;
    const memo = Array.from({ length: this.N }, () => Array(1 << this.N).fill(null)); 

    for (let end = 0; end < this.N; end++) {
      if (end === this.start) continue;
      // const a = (1 << this.start) | (1 << end);
      // const b = a.toString(2);
      memo[end][(1 << this.start) | (1 << end)] = this.distance[this.start][end];
    }

    for (let r = 3; r <= this.N; r++) {
      for (let subset of this.combinations(r, this.N)) {
        if (this.notIn(this.start, subset)) continue;
        for (let next = 0; next < this.N; next++) {
          if (next === this.start || this.notIn(next, subset)) continue;
          const subsetWithoutNext = subset ^ (1 << next);
          let minDist = Number.POSITIVE_INFINITY;
          for (let end = 0; end < this.N; end++) {
            if (end === this.start || end === next || this.notIn(end, subset)) continue;
            const newDistance = memo[end][subsetWithoutNext] + this.distance[end][next];
            if (newDistance < minDist) {
              minDist = newDistance;
            }
          }
          memo[next][subset] = minDist;
        }
      }
    }

    for (let i = 0; i < this.N; i++) {
      if (i === this.start) continue;
      const tourCost = memo[i][END_STATE] + this.distance[i][this.start];
      if (tourCost < this.minTourCost) {
        this.minTourCost = tourCost;
      }
    }

    let lastIndex = this.start;
    let state = END_STATE;
    this.tour.push(this.start);

    for (let i = 1; i < this.N; i++) {
      let bestIndex = -1;
      let bestDist = Number.POSITIVE_INFINITY;
      for (let j = 0; j < this.N; j++) {
        if (j === this.start || this.notIn(j, state)) continue;
        const newDist = memo[j][state] + this.distance[j][lastIndex];
        if (newDist < bestDist) {
          bestIndex = j;
          bestDist = newDist;
        }
      }

      this.tour.push(bestIndex);
      state = state ^ (1 << bestIndex);
      lastIndex = bestIndex;
    }

    this.tour.push(this.start);
    this.tour.reverse();

    this.ranSolver = true;
  }

  notIn(elem, subset) {
    return ((1 << elem) & subset) === 0;
  }

  combinations(r, n) {
    const subsets = [];
    this._combinations(0, 0, r, n, subsets);
    // r=3 n=4 [7,11,13,14] [0111, 1011, 1101, 1110]
    // 0111
    // 1011
    // 1101
    // 1110
    return subsets;
  }

  _combinations(set, at, r, n, subsets) {
    const elementsLeftToPick = n - at;
    if (elementsLeftToPick < r) return;

    if (r === 0) {
      subsets.push(set);
    } else {
      for (let i = at; i < n; i++) {
        // const oneShifted = (1 << i).toString(2);
        // const setBinaryBefore1 = set.toString(2);
        set ^= (1 << i);
        // const setBinaryAfter1 = set.toString(2);

        this._combinations(set, i + 1, r - 1, n, subsets);

        // const setBinaryBefore2 = set.toString(2);
        set ^= (1 << i);
        // const setBinaryAfter2 = set.toString(2);
      }
    }
  }
}

// Example usage 2
const adjMatrix = {
  'A': [0, 4, 1, 9],
  'B': [3, 0, 6, 11],
  'C': [4, 1, 0, 2],
  'D': [6, 5, -4, 0],
};

// const distanceMatrix = [
//   [0, 4, 1, 9],
//   [3, 0, 6, 11],
//   [4, 1, 0, 2],
//   [6, 5, -4, 0],
// ];

const nodes = Object.keys(adjMatrix);
const n = nodes.length;
const distanceMatrix = Array.from({ length: n }, () => Array(n).fill(Infinity));

nodes.forEach((node, i) => {
  adjMatrix[node].forEach((value, j) => {
    distanceMatrix[i][j] = value;
  });
});

const startNode = 0;
const solver = new TspDynamicProgrammingIterative(startNode, distanceMatrix);

console.log("Tour:", solver.getTour()); // Prints: [ 0, 3, 2, 1, 0 ] == A D C B A
console.log("Tour cost:", solver.getTourCost()); // Prints: 9

// Example usage 1 
// const n = 6;
// const distanceMatrix = Array.from({ length: n }, () => Array(n).fill(10000));
// distanceMatrix[5][0] = 10;
// distanceMatrix[1][5] = 12;
// distanceMatrix[4][1] = 2;
// distanceMatrix[2][4] = 4;
// distanceMatrix[3][2] = 6;
// distanceMatrix[0][3] = 8;

// const startNode = 0;
// const solver = new TspDynamicProgrammingIterative(startNode, distanceMatrix);

// console.log("Tour:", solver.getTour()); // Prints: [0, 3, 2, 4, 1, 5, 0]
// console.log("Tour cost:", solver.getTourCost()); // Prints: 42.0
