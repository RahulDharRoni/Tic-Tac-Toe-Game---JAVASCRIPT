let boxes = document.querySelectorAll(".box");
let Winning_message = document.querySelector("#Winning_message");
let newGame = document.querySelector("#new-btn");
let msgContainer = document.querySelector(".msg-container");
let resetBtn = document.querySelector("#reset-btn");

let players_turn0 = true;
let count = 0;

const winPatterns = [
  [0, 1, 2],
  [0, 3, 6],
  [0, 4, 8],
  [1, 4, 7],
  [2, 5, 8],
  [2, 4, 6],
  [3, 4, 5],
  [6, 7, 8],
];

boxes.forEach((box) => {
  box.addEventListener("click", () => {
    if (players_turn0) {
      box.innerHTML = "O";
      players_turn0 = false;
    } else {
      box.innerHTML = '<span style="color: black ; font-size: 8vmin;">X</span>';
      players_turn0 = true;
    }
    box.disabled = true;
    count++;
    let winnerPlayer = winner();

    if (count === 9 && !winnerPlayer) {
      gameOver();
    }
  });
});
const gameOver = () => {
  Winning_message.innerHTML = `Game Over ! NO Winner 😒😒 ! Game Draw !`;
  boxDisabled();
};
const boxEnabled = () => {
  for (let box of boxes) {
    box.disabled = false;
    box.innerText = "";
  }
};
const boxDisabled = () => {
  for (let box of boxes) {
    box.disabled = true;
  }
};
const showWinner = (winners, winnerBoxes) => {
  Winning_message.innerHTML = `Congratulations! Winner is ${winners}`;
  boxDisabled();

  winnerBoxes.forEach((index) => {
    boxes[index].style.backgroundColor = "#00D26A"; // Change background color
    console.log(boxes[index]);
  });
};

function winner() {
  for (let pattern of winPatterns) {
    let box1 = boxes[pattern[0]].innerHTML;
    let box2 = boxes[pattern[1]].innerHTML;
    let box3 = boxes[pattern[2]].innerHTML;

    if (box1 != "" && box2 != "" && box3 != "") {
      if (box1 === box2 && box2 === box3) {
        console.log("winner", box1);
        showWinner(box1, pattern);
      }
    }
  }
}

const reset = () => {
  players_turn0 = true;
  count = 0;
  boxEnabled();
  boxes.forEach((box) => {
    box.style.backgroundColor = ""; // Reset background color
  });

  Winning_message.innerHTML = "";
};

newGame.addEventListener("click", reset);
resetBtn.addEventListener("click", reset);
