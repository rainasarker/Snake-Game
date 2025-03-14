let xDirectionArray = [1, 0, -1, 0];
let yDirectionArray = [0, 1, 0, -1];
let directionIndex = 0;

let cX = [];
let cY = [];
let len = 1;
let diameter = 10;

let foodX, foodY;

let song;
let bell;
let gameStarted = false;

function setup() {
  noLoop();
  frameRate(5);
  cX[0] = 35;
  cY[0] = 15;

  createCanvas(400, 500);
  plotFood();

//Create directional buttons
            buttonUp = createButton("Up");
            buttonUp.mousePressed(moveUp);
            buttonUp.size(60, 30);
            buttonUp.position(250, 410);
            buttonDown = createButton("Down");
            buttonDown.mousePressed(moveDown);
            buttonDown.size(60, 30);
            buttonDown.position(250, 460);
            buttonLeft = createButton("Left");
            buttonLeft.mousePressed(moveLeft);
            buttonLeft.size(60, 30);
            buttonLeft.position(180, 440);
            buttonRight = createButton("Right");
            buttonRight.mousePressed(moveRight);
            buttonRight.size(60, 30);
            buttonRight.position(320, 440);

  // Create "Start" and "Restart" buttons
  createStartButton();

  song = loadSound("smb.mp3");
  bell = loadSound("smb_powerup.mp3");
}

function createStartButton() {
  button = createButton("Start");
  button.mouseClicked(startGame);
  button.size(100, 50);
  button.position(5, 410);
  button.style("font-family", "Comic Sans MS");
  button.style("font-size", "28px");
}

function createRestartButton() {
  restartButton = createButton("Restart");
  restartButton.mouseClicked(restartGame);
  restartButton.size(100, 50);
  restartButton.position(5, 410);
  button.style("font-family", "Comic Sans MS");
  button.style("font-size", "28px"); // Initially hide the restart button
}

function startGame() {
  gameStarted = true;
  loop();
  if (!song.isPlaying()) {
    song.play();
  }
  button.hide(); // Hide the "Start" button
  createRestartButton();
  gameStartTime = millis();
  if(millis() - gameStartTime >= 120000){
    textSize(48);
    stroke('black');
    fill('black');
    text('GAME OVER', 100, 200);
    textSize(32);
    text('Score: ' + len, 160, 260);
  }
}

function restartGame() {
  gameStarted = false;
  len = 1;
  cX = [35];
  cY = [15];
  directionIndex = 0;
  createStartButton(); // Show the "Start" button again
  restartButton.hide(); // Hide the "Restart" button
  noLoop();
  song.stop();
  clear();
  plotFood();
}

function plotFood() {
  let success = false;
  while (!success) {
    foodX = round(random(5, 399));
    foodX -= foodX % 10;
    foodX += 5;
    foodY = round(random(5, 401));
    foodY -= foodY % 10;
    foodY += 5;
    for (let i = 0; i < len; i++) {
      if (cX[i] == foodX && cY[i] == foodY) {
        success = false;
        break;
      }
      if (i == len - 1) {
        success = true;
      }
    }
  }
}

function draw() {
  background("pink");
  if (gameStarted) {
    caterpillar();
    fill("red");
    circle(foodX, foodY, 10);
    fill("beige");
    rect(0, 400, 400, 100);

    // Display the score
    textSize(32);
    stroke('black');
    fill('black');
    text('score = ' + len, 10, 490);

    // Check for game over
    crossOver();
  }
}

function crossOver() {
  if (gameStarted && cX[0] > 5 && cX[0] < 395 && cY[0] > 5 && cY[0] < 395 && len > 1) {
    for (let i = 1; i < len; i++) {
      if (cX[0] == cX[i] && cY[0] == cY[i]) {
        text("Game Over",100,100);
        noLoop();
        song.stop();
        createRestartButton(); // Show the "Restart" button
      }
    }
  }
}

function keyPressed() {
  if (gameStarted) {
    if (keyCode === RIGHT_ARROW && directionIndex != 2) {
      directionIndex = 0;
    }
    if (keyCode === LEFT_ARROW && directionIndex != 0) {
      directionIndex = 2;
    }
    if (keyCode === UP_ARROW && directionIndex != 1) {
      directionIndex = 3;
    }
    if (keyCode === DOWN_ARROW && directionIndex != 3) {
      directionIndex = 1;
    }
  }
}

function moveUp() {
  if (gameStarted) {
    directionIndex = 3;
  }
}

function moveDown() {
  if (gameStarted) {
    directionIndex = 1;
  }
}

function moveLeft() {
  if (gameStarted) {
    directionIndex = 2;
  }
}

function moveRight() {
  if (gameStarted) {
    directionIndex = 0;
  }
}

function caterpillar() {
  if (gameStarted) {
    if (cX[0] == foodX && cY[0] == foodY) {
      plotFood();
      len += 1;
      bell.play();
    }
    for (let i = len - 1; i > 0; i--) {
      cX[i] = cX[i - 1];
      cY[i] = cY[i - 1];
    }
    cX[0] += xDirectionArray[directionIndex] * 10;
    cY[0] += yDirectionArray[directionIndex] * 10;
    for (let i = 0; i < len; i++) {
      fill("green");
      cX[i] = constrain(cX[i], 5, 400 - 5);
      cY[i] = constrain(cY[i], 5, 400 - 5);
      circle(cX[i], cY[i], diameter);
    }
  }
}
