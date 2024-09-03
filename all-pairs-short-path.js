// const dp = [];

// for (let i = 0; i < nodes; i++) {
//   dp[i] = Array.from({length: nodes}, () => Number.POSITIVE_INFINITY);
//   dp[i][i] = 0;
// }

//        C   
//     5 	   5
// A	    11	   B
// const dp = [
//   [0, 11, 5],
//   [11, 0, 5],
//   [5, 5, 0]
// ];

// --------------------------------------
//     C   3   D
//   5  	        1
// A	      11	     B

// result:
// [ [ 0, 9, 5, 8 ], [ 9, 0, 4, 1 ], [ 5, 4, 0, 3 ], [ 8, 1, 3, 0 ] ]
// [ 
//   [ 0, 9, 5, 8 ], 
//   [ 9, 0, 4, 1 ], 
//   [ 5, 4, 0, 3 ], 
//   [ 8, 1, 3, 0 ]
// ]

const O = Number.POSITIVE_INFINITY;
const dp = [
  [0, 11, 5, O],
  [11, 0, O, 1],
  [5, O, 0, 3],
  [O, 1, 3, 0]
];

const n = dp.length;

const N = ['A', 'B', 'C', 'D'];



// for (let j = 0; j < n; j++) { // incorrect
//   for (let k = 0; k < n; k++) { // incorrect
//     for (let i = 0; i < n; i++) { // incorrect
for (let k = 0; k < n; k++) {
  for (let i = 0; i < n; i++) {
    for (let j = 0; j < n; j++) {
      console.log(`${N[i]}->${N[k]} + ${N[k]}->${N[j]} < ${N[i]}->${N[j]}`);
      if (dp[i][k] + dp[k][j] < dp[i][j]) {
        console.log('true', dp[i][j], '->' , dp[i][k] + dp[k][j]);
        dp[i][j] = dp[i][k] + dp[k][j];
      }
    }
  }
}

console.log(dp);

// [ [ 0, 9,  5, 8 ], [ 9, 0, 4, 1 ], [ 5, 4, 0, 3 ], [ 8, 1, 3, 0 ] ]  A->D + D->B < A->B      B->D + D->A < B->A
// [ [ 0, 11, 5, 8 ], [ 9, 0, 4, 1 ], [ 5, 4, 0, 3 ], [ 8, 1, 3, 0 ] ]