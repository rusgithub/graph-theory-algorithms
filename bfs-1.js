const matrix = [
  [ 0, 'S', 0, '#', 0,  0],
  [ 0, '#', 0,  0, '#', 0],
  [ 0, '#', 0,  0,  0,  0],
  [ 0,  0, '#','#', 0,  0],
  ['#', 0, '#','E', 0,  0]
];

const cr = [0, 0, -1, 1];
const cc = [-1, 1, 0, 0];

const queueX = [];
const queueY = [];

const vizited = {};

let stepsCount = 0;

let remainingNodesCount = 0;
let nextNodesCount = 0;

function exploreNeighbors(r, c) {
  for (let i = 0; i < 4; i++) {
    const newR = r + cr[i];
    const newC = c + cc[i];
    if (vizited[newR] && vizited[newR][newC]) continue;
    if (newR < 0 || newC < 0 || newR > matrix.length - 1 || newC > matrix[0].length - 1) continue;
    const neighborNode = matrix[newR][newC];
    if (!vizited[newR]) vizited[newR] = {};
    vizited[newR][newC] = true;
    if (neighborNode === '#') continue;

    queueX.push(newR);
    queueY.push(newC);

    nextNodesCount++;
  }
}

function run(startX, startY) {
  queueX.push(startX);
  queueY.push(startY);

  vizited[startX] = {[startY]: true}
  // first passed
  stepsCount++;
  remainingNodesCount++;

  while(queueX.length > 0) {
    const r = queueX.pop();
    const c = queueY.pop();
    console.log(r, c);
    const value = matrix[r][c];
    if (value === 'E') {
      console.log('finished', r, c);
      break;
    };
    exploreNeighbors(r, c);
    remainingNodesCount--;
    if (remainingNodesCount === 0) {
      stepsCount++;
      remainingNodesCount = nextNodesCount;
      nextNodesCount = 0;
    }
  }
}

run(0, 1);

console.log('stepsCount', stepsCount); // 4