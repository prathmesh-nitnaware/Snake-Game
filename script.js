const playBoard = document.querySelector(".play-board");
const scoreElement = document.querySelector(".score");
const highScoreElement = document.querySelector(".high-score");
const controlButtons = document.querySelectorAll(".controls button");

let foodX, foodY;
let snakeX = 5, snakeY = 10;
let snakeBody = [];
let velocityX = 0, velocityY = 0;
let score = 0;
let highScore = localStorage.getItem("high-score") || 0;
highScoreElement.innerText = `High Score: ${highScore}`;

const changeFoodPosition = () => {
    foodX = Math.floor(Math.random() * 30) + 1;
    foodY = Math.floor(Math.random() * 30) + 1;
};

const changeDirection = (key) => {
    key = key.toLowerCase();
    if ((key === "w" ) && velocityY === 0) {
        velocityX = 0;
        velocityY = -1;
    } else if ((key === "s") && velocityY === 0) {
        velocityX = 0;
        velocityY = 1;
    } else if ((key === "a") && velocityX === 0) {
        velocityX = -1;
        velocityY = 0;
    } else if ((key === "d") && velocityX === 0) {
        velocityX = 1;
        velocityY = 0;
    }
};

const initGame = () => {
    let htmlMarkup = `<div class="food" style="grid-area: ${foodY} / ${foodX}"></div>`;

    if (snakeX === foodX && snakeY === foodY) {
        changeFoodPosition();
        snakeBody.push([snakeY, snakeX]);
        score++;
        scoreElement.innerText = `Score: ${score}`;
        if (score > highScore) {
            highScore = score;
            localStorage.setItem("high-score", highScore);
            highScoreElement.innerText = `High Score: ${highScore}`;
        }
    }

    for (let i = snakeBody.length - 1; i > 0; i--) {
        snakeBody[i] = [...snakeBody[i - 1]];
    }

    if (snakeBody.length) {
        snakeBody[0] = [snakeY, snakeX];
    }

    snakeX += velocityX;
    snakeY += velocityY;

    if (snakeX <= 0 || snakeX > 30 || snakeY <= 0 || snakeY > 30) return gameOver();

    for (let i = 0; i < snakeBody.length; i++) {
        if (snakeBody[i][0] === snakeY && snakeBody[i][1] === snakeX) return gameOver();
    }

    for (let i = 0; i < snakeBody.length; i++) {
        htmlMarkup += `<div class="body" style="grid-area: ${snakeBody[i][0]} / ${snakeBody[i][1]}"></div>`;
    }

    htmlMarkup += `<div class="head" style="grid-area: ${snakeY} / ${snakeX}"></div>`;
    playBoard.innerHTML = htmlMarkup;
};

const gameOver = () => {
    alert("Game Over! Press OK to restart.");
    location.reload();
};

changeFoodPosition();
setInterval(initGame, 125);

document.addEventListener("keydown", e => changeDirection(e.key));

controlButtons.forEach(btn => {
    btn.addEventListener("click", () => changeDirection(btn.dataset.key));
});
