import { BinaryHeap } from "./heap.js";
const distance = (goal) => (x) => {
  let n = x.length;
  let coords = {};
  let dist = 0;
  for (let i = 0; i < n; i++) {
    for (let j = 0; j < n; j++) {
      coords[goal[i][j]] = [i, j];
    }
  }

  for (let i = 0; i < n; i++) {
    for (let j = 0; j < n; j++) {
      let exp = coords[x[i][j]];
      dist += Math.abs(i - exp[0]) + Math.abs(j - exp[1]);
    }
  }
  return dist;
};

export const Astar = (board, end) => {
  let visited = new Set();
  let parents = {};
  parents[JSON.stringify(board)] = null;
  let size = board.length;
  let heap = new BinaryHeap(distance(end));
  heap.insert(board);
  let moves = ["ArrowRight", "ArrowDown", "ArrowUp", "ArrowLeft"];
  while (heap.size() > 0) {
    let curr = heap.extractMin();
    if (arrayEq(curr, end)) {
      break;
    }
    if (visited.has(JSON.stringify(curr))) continue;
    visited.add(JSON.stringify(curr));

    let holerow, holecol;

    for (let i = 0; i < size; i++)
      for (let j = 0; j < size; j++)
        if (curr[i][j] == 0) {
          (holerow = i), (holecol = j);
          break;
        }

    let children = [
      [holerow, holecol - 1],
      [holerow - 1, holecol],
      [holerow + 1, holecol],
      [holerow, holecol + 1],
    ];
    for (let i = 0; i < 4; i++) {
      let child = children[i];

      if (
        child[0] >= 0 &&
        child[0] < size &&
        child[1] >= 0 &&
        child[1] < size
      ) {
        let newState = curr.map((arr) => arr.slice());
        newState[holerow][holecol] = curr[child[0]][child[1]];
        newState[child[0]][child[1]] = 0;
        if (visited.has(JSON.stringify(newState))) continue;
        heap.insert(newState);
        parents[JSON.stringify(newState)] = {
          parent: JSON.stringify(curr),
          move: i,
        };
      }
    }
  }

  let move;
  let stack = [];
  let curr = JSON.stringify(end);
  while (true) {
    if (parents[curr] == null) break;
    move = parents[curr].move;
    stack.push(moves[move]);
    curr = parents[curr].parent;
  }
  return stack;
};

function arrayEq(a, b) {
  return a.toString() === b.toString();
}
