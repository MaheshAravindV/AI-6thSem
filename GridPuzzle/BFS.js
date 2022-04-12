export const BFS = (board, end) => {
  let visited = new Set();
  let parents = {};
  parents[JSON.stringify(board)] = null;
  let size = board.length;
  let queue = [board];
  let moves = ["ArrowRight", "ArrowDown", "ArrowUp", "ArrowLeft"];
  while (queue.length > 0) {
    let curr = queue.shift();
    if (arrayEq(curr, end)) {
      console.log("test");
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
        queue.push(newState);
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
