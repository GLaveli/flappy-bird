//-----------------HTML components section---------------------------
const stage = document.getElementById("stage");
const context = stage.getContext("2d");

//-----------------Imagem section------------------------------------

let bird = new Image();
let birdDead = new Image();
let background = new Image();
let chao = new Image();
let pipeNorth = new Image();
let pipeSouth = new Image();

bird.src = "img/bird.png";
birdDead.src = "img/birdDead.png";
background.src = "img/bg.png";
chao.src = "img/fg.png";
pipeNorth.src = "img/pipeNorth.png";
pipeSouth.src = "img/pipeSouth.png";

//-----------------Variables section---------------------------------

let gap = 85;
let constante;
let birdPositionX = 10; //Posi;áo X do passaro
let birdPositionY = 150; // Posi;áo Y do passaro
let gravity = 2.0;
let gravity_backup = gravity;
let score = 0;
let continua = true;
let record = 0;

//-----------------Audio section--------------------------------------

const fly = new Audio();
const scor = new Audio();

fly.src = "som/fly.mp3";
scor.src = "som/score.mp3";

document.addEventListener("keydown", moveUp);
document.getElementById("btn_again").addEventListener("click", playAgayn)

function moveUp() {
  gravity = -6.0;
  fly.play();

  setTimeout(() => {
    gravity = gravity_backup;
  }, 100);

};

function gameOver() {
  context.drawImage(birdDead, birdPositionX, birdPositionY);
  continua = false;
  document.getElementById("pontuacao_visor").innerText = score;
  document.getElementById("gameOver").style = "display:inline";
  gravity = 0;
};

function playAgayn() {

  continua = true;
  recorde = score;
  score = 0;
  gravity = gravity_backup;
  birdPositionY = 150;

  document.getElementById("gameOver").style = "display:none";
  document.getElementById("pontuacao_visor").innerText = 0;

  pipe = [];

  pipe[0] = {
    x: stage.width,
    y: 0
  };

  draw();
};

let pipe = [];

pipe[0] = {
  x: stage.width,
  y: 0
};

function draw() {
  context.drawImage(background, 0, 0);

  for (let i = 0; i < pipe.length; i++) {

    constante = pipeNorth.height + gap;

    //Desenhando as imagens
    context.drawImage(pipeNorth, pipe[i].x, pipe[i].y);
    context.drawImage(pipeSouth, pipe[i].x, pipe[i].y + constante);
    context.drawImage(chao, 0, stage.height - chao.height);
    context.drawImage(bird, birdPositionX, birdPositionY);

    if (!continua) {

      context.drawImage(birdDead, birdPositionX, birdPositionY);
      return null;
    }
    pipe[i].x--;

    if (pipe[i].x == 140) {
      pipe.push({
        x: stage.width,
        y: Math.floor(Math.random() * pipeNorth.height) - pipeNorth.height
      });
    };

    if (birdPositionX + bird.width >= pipe[i].x && birdPositionX <= pipe[i].x + pipeNorth.width &&
      (birdPositionY <= pipe[i].y + pipeNorth.height || birdPositionY + bird.height >= pipe[i].y + constante) ||
      birdPositionY + bird.height >= stage.height - chao.height) {

      gameOver();

    };

    if (pipe[i].x == birdPositionX - 45) {
      score++;
      scor.play();
    }

  };


  birdPositionY += gravity;
  let widthCanvas = (stage.width / 2);
  context.fillStyle = "#000"
  context.strokeStyle = "#fff";
  context.font = "70px FlappyFonte"
  context.fillText(score, widthCanvas, 80);
  context.strokeText(score, widthCanvas, 80);


  requestAnimationFrame(draw);
}

window.onload = () => {
  draw();
}