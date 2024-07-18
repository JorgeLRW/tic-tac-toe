let playerText = document.getElementById('playerText');
let resetBtn = document.getElementById('resetBtn');
let boxes = Array.from(document.getElementsByClassName('box'));

const O = "O";
const X = "X";

//assign current player to X
let player = X;
let playSpace = Array(9).fill(null);
let isGameActive = true;

//game start
const gameStart = () => {
    boxes.forEach(box => box.addEventListener('click', boxClicked))
};

//playing the game
function boxClicked(ck) {
    const id = ck.target.id

    //play conditions
    if (isGameActive && !playSpace[id]) {
        playSpace[id] = player;
        ck.target.innerText = player;

        //win
        if (checkWin() != false) {
            isGameActive = false
            playerText.innerText = `${player} wins!`
            return;
        }

        //draws
        if (!playSpace.includes(null)) {
            playerText.innerText = "It's a draw!";
            isGameActive = false;
            return;
        };

        //switching roles
        player = player == X ? O : X;
        playerText.innerText = `Current Player: ${player}`;
    }
}

//win cons
const winCon = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
];

//winner winner chicken dinner
function checkWin() {
    for(const condition of winCon) {
        const [a, b, c] = condition;
        if (playSpace[a] && playSpace[a] == playSpace[b]  && playSpace[a] == playSpace[c]) {
            return [a, b, c];
        }
    }
    return false;
};

//reseting the game
function reset() {
    playSpace.fill(null)
    isGameActive = true;

    //nothing in boxes
    boxes.forEach(box => {
        box.innerText = '';
    });

    //reset players
    player = X
    playerText.innerText = `Current Player: ${player}`;
    console.log("Game reset.")
}

//reset button listener
resetBtn.addEventListener('click', reset);

//Start
gameStart();