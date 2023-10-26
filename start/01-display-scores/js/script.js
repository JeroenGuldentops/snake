let initialFrameRate = 5;

let foodX;
let foodY;
let foodSize;

let snakeX;
let snakeY;
let snakeSize;

let speedX = 0;
let speedY = 0;

let score = 0;

let scoreTimer = 0;

function setup() {
  createCanvas(400, 400);
  spawnFood();
  spawnSnake();
  frameRate(initialFrameRate);
  console.log("Score = " + score);
  console.log(scoreTimer);
}

function draw() {
  background(220);
  drawFood();
  drawSnake();
  moveSnake();
  checkFood();
  showScore();
  console.log("Score = " + score);
  console.log(scoreTimer);
}

function showScore() {
  textAlign(LEFT, CENTER);
  fill('black');
  textSize(15);
  text('Score = ', 5, 15);
  if(scoreTimer > 0){
    fill('green');
    textSize(30);
  } else {
    fill ('black');
    textSize(15);
  }
  text(score, 63, 15);
  scoreTimer--;
  // text('Score = ', 5, 12);
  // text(score, 50, 12);
}

function spawnFood() {
  foodSize = 20;
  // 0 + random * 20. niet meer dan width - foodSize.
  foodX = 0 + floor(random(0, width / foodSize)) * foodSize;
  //foodX = random(0, width - foodSize);
  foodY = 0 + floor(random(0, height / foodSize)) * foodSize;
  // foodY = random(0, height - foodSize);
}

function spawnSnake() {
  snakeSize = 20;
  snakeX = 0 + floor(random(0, width / snakeSize)) * snakeSize;
  //snakeX = random(0, width - snakeSize);
  snakeY = 0 + floor(random(0, height / snakeSize)) * snakeSize;
  //snakeY = random(0, height - snakeSize);
}

/*function moveSnake() {
  if (keyCode === UP_ARROW) {
    if (snakeY >= 0) {
      snakeY = snakeY - snakeSize;
    } else {
      snakeY = height;
    }
    //snakeY = snakeY - 3;
  } else if (keyCode === DOWN_ARROW) {
    if (snakeY <= height) {
      snakeY = snakeY + snakeSize;
    } else {
      snakeY = 0;
    }
    //snakeY = snakeY + 3;
  } else if (keyCode === LEFT_ARROW) {
    if (snakeX >= 0) {
      snakeX = snakeX - snakeSize;
    } else {
      snakeX = width;
    }
    //snakeX = snakeX - 3;
  } else if (keyCode === RIGHT_ARROW) {
    if (snakeX <= width) {
      snakeX = snakeX + snakeSize;
    } else {
      snakeX = 0;
    }
    //snakeX = snakeX + 3;
  } else if (keyCode === 32) {
    snakeX = snakeX;
    snakeY = snakeY;
  }
}*/

function moveSnake() {
  snakeX = snakeX + speedX * snakeSize;
  snakeY = snakeY + speedY * snakeSize;
  checkBorders();
}

function checkBorders() {
  if (snakeX < 0) {
    snakeX = width - snakeSize;
  }
  if (snakeX >= width) {
    snakeX = 0;
  }
  if (snakeY < 0) {
    snakeY = height - snakeSize;
  }
  if (snakeY >= height) {
    snakeY = 0;
  }
}

function keyPressed() {
  switch (keyCode) {
    case LEFT_ARROW:
      if (snakeX <= 0) {
        snakeX = width;
      }
      speedX = -1;
      speedY = 0;
      break;
    case RIGHT_ARROW:
      speedX = 1;
      speedY = 0;
      break;
    case UP_ARROW:
      speedY = -1;
      speedX = 0;
      break;
    case DOWN_ARROW:
      speedY = 1;
      speedX = 0;
      break;
    case 32:
      speedX = 0;
      speedY = 0;
      break;
    case 82:
      speedY = 0;
      speedX = 0;
      spawnFood();
      spawnSnake();
      frameRate(initialFrameRate);
      score = 0;
      break;

  }
}

//Eten geraakt?
function checkFood() {
  if (dist(foodX, foodY, snakeX, snakeY) < 20) {
    score += 1;
    spawnFood();
    //Verhoog snelheid slang
    frameRate(initialFrameRate + score);
    scoreTimer = frameRate();
  }
  /*if(snakeX === foodX && snakeY === foodY){
    score += 1;
    spawnFood();
  }*/
}

//Teken eten
function drawFood() {
  fill("red");
  rect(foodX, foodY, foodSize);
}

//Teken slang
function drawSnake() {
  fill("black");
  rect(snakeX, snakeY, snakeSize);
}
