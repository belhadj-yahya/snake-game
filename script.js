let moving;
let game = false;
let hightScore = document.querySelector(".high-score");
let test = localStorage.getItem("high-score") || 0;
let foodX, foodY;
let snakeHeadX = 5, snakeHeadY = 10;
let movementX = 0, movementY = 0;
let snakeBody = [];
let gameState = false;
let score = 0;
let playBord = document.querySelector(".game-bord");
let scorespan = document.querySelector(".score");
let pop = document.querySelector(".pop")
let popbtn = document.querySelector(".pop button")
let black = document.querySelector(".black")
let control = document.querySelector(".p")


hightScore.innerText = `High Score : ${test}`;

let foodplace = function() {
  foodX = Math.floor(Math.random() * 30) + 1;
  foodY = Math.floor(Math.random() * 30) + 1;
};

let gameOver = function() {
  clearInterval(moving);
  document.removeEventListener("keydown", changeDirection);
  pop.style.display = "flex";
  black.style.display = "block";
  popbtn.onclick = () => location.reload()
};

let changeDirection = function(e) {
  control.style.display = "none";
  if (!game) {  
    game = true;
    moving = setInterval(inGameItems, 100); 
  }

  if (e.key === "ArrowUp" && movementY !== 1) {
    movementX = 0;
    movementY = -1;
  } else if (e.key === "ArrowDown" && movementY !== -1) {
    movementX = 0;
    movementY = 1;
  } else if (e.key === "ArrowLeft" && movementX !== 1) {
    movementX = -1;
    movementY = 0;
  } else if (e.key === "ArrowRight" && movementX !== -1) {
    movementX = 1;
    movementY = 0;
  }
};

const inGameItems = function() {
  if (gameState) {
    return gameOver();
  }
  scorespan.innerText = `score : ${score}`;
  let playObjects = `<div class='food' style='grid-area:${foodY} / ${foodX}'></div>`;
  
  if (snakeHeadX === foodX && snakeHeadY === foodY) {
    foodplace();
    snakeBody.push([foodX, foodY]);
    score++;
    test = score >= test ? score : test;
    localStorage.setItem("high-score", test);
    scorespan.innerText = `score : ${score}`;
    hightScore.innerText = `High Score : ${test}`;
  }

  for (let i = snakeBody.length - 1; i > 0; i--) {
    snakeBody[i] = snakeBody[i - 1];
  }
  snakeBody[0] = [snakeHeadX, snakeHeadY];
  snakeHeadX += movementX;
  snakeHeadY += movementY;

  if (snakeHeadX <= 0 || snakeHeadX > 30 || snakeHeadY <= 0 || snakeHeadY > 30) {
    gameState = true;
  }

  for (let i = 0; i < snakeBody.length; i++) {
    playObjects += `<div class='head' style='grid-area: ${snakeBody[i][1]} / ${snakeBody[i][0]}'></div>`;
    if (i !== 0 && snakeBody[0][1] === snakeBody[i][1] && snakeBody[0][0] === snakeBody[i][0]) {
      gameState = true;
    }
  }
  
  playBord.innerHTML = playObjects;
};

foodplace();
document.addEventListener("keydown", changeDirection);
