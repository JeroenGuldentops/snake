let foodX;
let foodY;
let foodSize = 20;

let snakeSize = 20;
let snakeSpeedX = 0;
let snakeSpeedY = 1;
let snakeX = 0;
let snakeY = 0;

let score = 0;
let greenTexTimer = 0;


function setup() {
  createCanvas(400, 400);
  spawnFood();
  frameRate(10);
}

function draw() {
  background(220);
  moveSnake();
  checkFood();
  drawSnake();
  drawFood();
  showScore();
}

function spawnFood() {
  foodX = random(0, width - foodSize)
  foodY = random(0, height - foodSize)
}

function showScore() {
  textAlign(CENTER);

  if (greenTexTimer > 0) {
    fill("green")
    textSize(30);
  } else {
    textSize(20);
    fill("black")
  }

  text(score, height / 2, width / 2);
  greenTexTimer--;

}

function checkFood() {
  const foodSnakeDistance = dist(snakeX, snakeY, foodX, foodY);

  if (foodSnakeDistance < 20) {
    spawnFood();
    score++
    greenTexTimer = 5;
  }
}

function drawFood() {
  fill(255, 0, 0);
  noStroke();
  rect(foodX, foodY, foodSize);
}

function moveSnake() {
  snakeX += snakeSpeedX * snakeSize;
  snakeY += snakeSpeedY * snakeSize;
}

function drawSnake() {
  fill(0);
  rect(snakeX, snakeY, snakeSize);

}

function keyPressed() {
  switch (keyCode) {
    case LEFT_ARROW:
      if (snakeSpeedX !== 1) {
        snakeSpeedX = -1;
        snakeSpeedY = 0;
      }
      break;
    case RIGHT_ARROW:
      if (snakeSpeedX !== -1) {
        snakeSpeedX = 1;
        snakeSpeedY = 0;
      }
      break;
    case DOWN_ARROW:
      if (snakeSpeedY !== -1) {
        snakeSpeedX = 0;
        snakeSpeedY = 1;
      }
      break;
    case UP_ARROW:
      if (snakeSpeedY !== 1) {
        snakeSpeedX = 0;
        snakeSpeedY = -1;
      }
      break;
  }
}

