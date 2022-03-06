export default function solve(begin, end) {
  let visited = new Set();
  let parents = {};
  parents[JSON.stringify(begin)] = null;
  let size = begin.board.length;
  let queue = [begin];
  let moves = ["ArrowRight", "ArrowDown", "ArrowUp", "ArrowLeft"];

  let temp = "";
  while (queue.length > 0) {
    let curr = queue.pop();
    if (arrayEq(curr.board, end)) break;
    if (visited.has(JSON.stringify(curr))) continue;
    visited.add(JSON.stringify(curr));
    let children = [
      [curr.holerow, curr.holecol - 1],
      [curr.holerow - 1, curr.holecol],
      [curr.holerow + 1, curr.holecol],
      [curr.holerow, curr.holecol + 1],
    ];
    for (let i = 0; i < 4; i++) {
      let child = children[i];

      if (
        child[0] >= 0 &&
        child[0] < size &&
        child[1] >= 0 &&
        child[1] < size
      ) {
        let newBoard = curr.board.map((arr) => arr.slice());
        newBoard[curr.holerow][curr.holecol] = curr.board[child[0]][child[1]];
        newBoard[child[0]][child[1]] = 0;
        let newState = {
          board: newBoard,
          holerow: child[0],
          holecol: child[1],
        };
        if (visited.has(JSON.stringify(newState))) continue;
        temp = JSON.stringify(newState);
        queue.push(newState);
        parents[JSON.stringify(newState)] = { parent: curr, move: i };
      }
    }
  }
  console.log(visited.size);
  let move;
  let stack = [];
  while (true) {
    stack.push(moves[move]);
    if (parents[temp] == undefined) break;
    move = parents[temp].move;
    temp = JSON.stringify(parents[temp].parent);
  }
  console.log(stack.length);
  //   while (stack.length > 0) {
  //     let curr = stack.pop();
  //     console.log(curr);
  // window.dispatchEvent(
  //   new KeyboardEvent("keydown", {
  //     key: curr,
  //   })
  // );
  //   }
}

function arrayEq(a, b) {
  return a.toString() === b.toString();
}
