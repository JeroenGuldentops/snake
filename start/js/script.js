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

let timeLimit = 60;

//let timeLimit = 60;

let timer;

function setup() {
  createCanvas(400, 400);
  spawnFood();
  spawnSnake();
  frameRate(initialFrameRate);
}

function draw() {
  background(220);
  drawFood();
  drawSnake();
  moveSnake();
  checkFood();
  displayScore();
  displayTimer();
  startTimer(timeLimit);
  frameRate(initialFrameRate);
  //console.log("Score = " + score);
}

function displayScore() {
  fill('black');
  textAlign(LEFT, CENTER);
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

function startTimer(time){
  timer = millis();
  if(timer >= time * 1000){
    endGame();
  }
}

function displayTimer(){
  textSize(15)
  fill('black');
  textAlign(RIGHT);
  text('Tijd: ' + (timeLimit - floor(timer/1000)), width - 10, 15); 
  //text('Tijd: ' + floor(timer/1000), width - 10, 15);
}

function endGame(){
    background(0,0,0);
    textAlign(CENTER, CENTER);
    textSize(35);
    fill('white');
    text('GAME OVER', width/2, height/2 - 30);
    text('Score = ' + score, width/2, height/2 + 30);
    noLoop();
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
      // Pauzeren
    case 32:
      speedX = 0;
      speedY = 0;
      break;
      // Reset, score op 0
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
    initialFrameRate++;
    //Tekst score moet groen worden dmv timer
    scoreTimer = frameRate();
  }
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
