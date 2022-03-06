size = window.prompt("Size"); //Size should preferably be between 3 and 6 for UI to look good

board = []; //Board is the current state of the game
goal = []; //This is the final target state

holerow = size - 1;
holecol = size - 1; //To keep track of where the hole is

for (row = 0; row < size; row++) {
  //Creating the initial state. (We will shuffle in the end)
  board.push([]);
  goal.push([]);
  for (col = 0; col < size; col++)
    board[row].push(row * size + col + 1), goal[row].push(board[row][col]); //Goal is copied from board as the target is like [[1,2,3],[4,5,6],[7,8,0]]
}

board[holerow][holecol] = 0;
goal[holerow][holecol] = 0; //Setting the hole

padding = 60 - (size - 3) * 10; //Padding must be programatically given as smaller cells look better when there are more cells 👇🏻Line 30

async function updateTable(board) {
  //Function to update UI based on the board state
  var table = document.getElementsByTagName("table")[0];
  table.innerHTML = "";
  board.forEach((row) => {
    var newRow = document.createElement("tr");
    row.forEach((cell) => {
      var newCell = document.createElement("td");
      if (cell != 0) newCell.textContent = cell;
      //If value is 0, means there is a hole there. If not, add text content to the cell
      else newCell.className = "empty-cell";
      newCell.style.padding = padding + "px"; //This is where Padding is set based on size
      newRow.appendChild(newCell);
    });
    table.appendChild(newRow);
  });
}

async function shuffle() {
  //To shuffle the state in the beginning of each run
  options = ["ArrowDown", "ArrowUp", "ArrowLeft", "ArrowRight"];
  for (i = 0; i < 100 * (size - 2); i++) {
    var rand = options[~~(Math.random() * options.length)]; //Randomly picking a move (Sometimes, the picked move is invalid. In that case, nothing happens)
    window.dispatchEvent(
      new KeyboardEvent("keydown", {
        //Using our own event listener to shuffle by giving moves in a random order
        key: rand,
      })
    );
  }
}

window.addEventListener("keydown", async (e) => {
  switch (
    e.key //Based on the key pressed, if the move is valid, the new cell must come where the hole used to be and the hole must be moved
  ) {
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
    case "r": //r can be pressed to reload the site
      shuffle();
      break;
  }
  updateTable(board);
});

window.onload = shuffle; //Initially the board has to be shuffled once
