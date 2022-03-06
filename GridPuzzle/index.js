size = window.prompt("Size");

board = [];
goal = [];

holerow = size - 1;
holecol = size - 1;
for (row = 0; row < size; row++) {
  board.push([]);
  goal.push([]);
  for (col = 0; col < size; col++)
    board[row].push(row * size + col + 1), goal[row].push(board[row][col]);
}

board[holerow][holecol] = 0;
goal[holerow][holecol] = 0;

padding = 60 - (size - 3) * 10;

async function updateTable(board) {
  var table = document.getElementsByTagName("table")[0];
  table.innerHTML = "";
  board.forEach((row) => {
    var newRow = document.createElement("tr");
    row.forEach((cell) => {
      var newCell = document.createElement("td");
      if (cell != 0) newCell.textContent = cell;
      else newCell.className = "empty-cell";
      newCell.style.padding = padding + "px";
      newRow.appendChild(newCell);
    });
    table.appendChild(newRow);
  });
}

async function shuffle() {
  options = ["ArrowDown", "ArrowUp", "ArrowLeft", "ArrowRight"];
  for (i = 0; i < 100 * (size - 3); i++) {
    var rand = options[~~(Math.random() * options.length)];
    window.dispatchEvent(
      new KeyboardEvent("keydown", {
        key: rand,
      })
    );
  }
}

window.addEventListener("keydown", async (e) => {
  switch (e.key) {
    case "ArrowDown":
      if (holerow > 0) {
        board[holerow][holecol] = board[holerow - 1][holecol];
        holerow--;
        board[holerow][holecol] = 0;
      }
      break;
    case "ArrowLeft":
      if (holecol < size - 1) {
        board[holerow][holecol] = board[holerow][holecol + 1];
        holecol++;
        board[holerow][holecol] = 0;
      }
      break;
    case "ArrowRight":
      if (holecol > 0) {
        board[holerow][holecol] = board[holerow][holecol - 1];
        holecol--;
        board[holerow][holecol] = 0;
      }
      break;
    case "ArrowUp":
      if (holerow < size - 1) {
        board[holerow][holecol] = board[holerow + 1][holecol];
        holerow++;
        board[holerow][holecol] = 0;
      }
      break;
    case "r":
      shuffle();
      break;
  }
  updateTable(board);
});

window.onload = shuffle;
