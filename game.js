const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

let bat = { x: 750, y: 200, width: 20, height: 80 };
let hats = [];
let score = 0;

canvas.addEventListener("mousemove", (e) => {
  let canvasTop = canvas.getBoundingClientRect().top;
  bat.y = e.clientY - canvasTop - bat.height / 2;
});

function drawBat() {
  ctx.fillStyle = "brown";
  ctx.fillRect(bat.x, bat.y, bat.width, bat.height);
}

function createHat() {
  const hatTypes = ["red", "yellow", "orange", "black"];
  let type = hatTypes[Math.floor(Math.random() * hatTypes.length)];
  
  let speedX, speedY;

  if (type === "red") {
    speedX = 6;
    speedY = 0;
  } else if (type === "yellow") {
    speedX = 4;
    speedY = Math.random() * 4 - 2;
  } else if (type === "orange") {
    speedX = 6;
    speedY = Math.random() * 4 - 2;
  } else if (type === "black") {
    speedX = 20;
    speedY = 0;
  }

  hats.push({
    x: 0,
    y: Math.random() * (canvas.height - 20),
    radius: 15,
    color: type,
    speedX,
    speedY
  });
}

setInterval(createHat, 1500);

function drawHats() {
  hats.forEach(hat => {
    ctx.beginPath();
    ctx.arc(hat.x, hat.y, hat.radius, 0, Math.PI * 2);
    ctx.fillStyle = hat.color;
    ctx.fill();
    ctx.closePath();
  });
}

function moveHats() {
  hats.forEach((hat, index) => {
    hat.x += hat.speedX;
    hat.y += hat.speedY;

    if ((hat.color === "yellow" || hat.color === "orange") &&
        (hat.y <= 0 || hat.y >= canvas.height)) {
      hat.speedY = -hat.speedY;
    }

    if (hat.x + hat.radius > bat.x &&
        hat.y > bat.y &&
        hat.y < bat.y + bat.height) {
      score += 1;
      hats.splice(index, 1);
    }

    if (hat.x > canvas.width) {
      hats.splice(index, 1);
    }
  });
}

function drawScore() {
  ctx.fillStyle = "#333";
  ctx.font = "20px sans-serif";
  ctx.fillText("Score: " + score, 20, 30);
}

function gameLoop() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  drawBat();
  drawHats();
  moveHats();
  drawScore();
  requestAnimationFrame(gameLoop);
}

gameLoop();
