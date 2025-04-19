
// Doodle-Style Baseball Game (Cartoony, Casual)
// Inspired by your image and classic Doodle Baseball mechanics

// Canvas Setup
const canvas = document.createElement('canvas');
canvas.width = 800;
canvas.height = 600;
document.body.appendChild(canvas);
const ctx = canvas.getContext('2d');

// Game Variables
let score = 0;
let strikes = 0;
let currentHat = 'White';
let ballX = 400, ballY = 300;
let ballSpeedX = 0, ballSpeedY = 0;
let ballVisible = true;

// Hat Colors and Their Behaviors
const hatColors = [
  'White', 'Blue', 'Green', 'Yellow', 'Purple', 'Red',
  'LeafGreen', 'SunsetOrange', 'SkyBlue', 'GoldenYellow', 'ShadowBlack'
];

function pickRandomHat() {
  const randomIndex = Math.floor(Math.random() * hatColors.length);
  currentHat = hatColors[randomIndex];
  setBallBehavior(currentHat);
}

function setBallBehavior(color) {
  ballX = 400;
  ballY = 0;
  ballVisible = true;
  
  switch (color) {
    case 'White':
      ballSpeedX = 0;
      ballSpeedY = 5;
      break;
    case 'Blue':
      ballSpeedX = 2;
      ballSpeedY = 3;
      break;
    case 'Green':
      ballSpeedX = 3;
      ballSpeedY = 3;
      break;
    case 'Yellow':
      ballSpeedX = 5;
      ballSpeedY = 5;
      break;
    case 'Purple':
      ballSpeedX = 0;
      ballSpeedY = 5;
      break;
    case 'Red':
      ballSpeedX = 0;
      ballSpeedY = 12;
      break;
    case 'LeafGreen':
      ballSpeedX = 1;
      ballSpeedY = 2;
      break;
    case 'SunsetOrange':
      ballSpeedX = 0;
      ballSpeedY = 10;
      break;
    case 'SkyBlue':
      ballSpeedX = 0;
      ballSpeedY = 1;
      break;
    case 'GoldenYellow':
      ballSpeedX = 6;
      ballSpeedY = 6;
      break;
    case 'ShadowBlack':
      ballSpeedX = 0;
      ballSpeedY = 10;
      break;
  }
}

// Draw Everything
function draw() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  // Background
  ctx.fillStyle = '#d0f0c0';
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  // Batter
  ctx.fillStyle = '#ffcc00';
  ctx.fillRect(360, 550, 80, 30);

  // Ball
  if (ballVisible) {
    ctx.beginPath();
    ctx.arc(ballX, ballY, 10, 0, Math.PI * 2);
    ctx.fillStyle = 'white';
    ctx.fill();
  }

  // Score
  ctx.fillStyle = 'black';
  ctx.font = '20px Arial';
  ctx.fillText(`Score: ${score}`, 10, 30);
  ctx.fillText(`Strikes: ${strikes}`, 10, 60);
  ctx.fillText(`Hat: ${currentHat}`, 10, 90);
}

// Update Ball Position
function update() {
  ballX += ballSpeedX;
  ballY += ballSpeedY;

  if (currentHat === 'Green') {
    ballX += Math.sin(ballY / 20) * 3;
  }

  if (currentHat === 'Yellow' || currentHat === 'GoldenYellow') {
    ballX += Math.sin(ballY / 10) * 5;
  }

  if (currentHat === 'Purple' && ballY > 200) {
    ballVisible = false;
  }

  if (ballY > 600) {
    strikes++;
    if (strikes >= 3) {
      alert(`Game Over! Final Score: ${score}`);
      score = 0;
      strikes = 0;
    }
    pickRandomHat();
  }
}

// Hit Detection
function swing() {
  if (ballY > 500 && ballY < 580) {
    score++;
    pickRandomHat();
  } else {
    strikes++;
    if (strikes >= 3) {
      alert(`Game Over! Final Score: ${score}`);
      score = 0;
      strikes = 0;
    }
  }
}

// Game Loop
function gameLoop() {
  update();
  draw();
  requestAnimationFrame(gameLoop);
}

// Input
canvas.addEventListener('click', swing);

// Start Game
pickRandomHat();
gameLoop();
