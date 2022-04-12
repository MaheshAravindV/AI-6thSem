import { BFS } from "./BFS.js";
import { Astar } from "./A-star.js";

export default async function solve(board, end, algo = "BFS") {
  let stack;
  if (algo == "BFS") stack = BFS(board, end);
  else if (algo == "A-star") stack = Astar(board, end);
  while (stack.length > 0) {
    let curr = stack.pop();
    await sleep(100);
    window.dispatchEvent(
      new KeyboardEvent("keydown", {
        key: curr,
      })
    );
  }
}

const sleep = (ms) => new Promise((r) => setTimeout(r, ms));
