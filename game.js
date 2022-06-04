let tela = document.querySelector("canvas");
let ctx = tela.getContext("2d");

const pontos = document.querySelector(".pontos");
const record = document.querySelector(".record");
const newGame = document.querySelector(".newGame");
const pause = document.querySelector(".pause");
const gameOver = document.querySelector(".fim");

let interval = setInterval(game, 100);

let velocidadeX = 0;
let velocidadeY = 0;
let posicaoX = 2;
let posicaoY = 2;
let largura = 1;
let frutaX = 20;
let frutaY = 20;
let placar = 0;
let body = [];
let tamanho = 3;

if (!localStorage.getItem("record")) {
    localStorage.setItem("record", 0);
}

newGame.addEventListener("click", function () {
    velocidadeX = 0;
    velocidadeY = 0;
    posicaoX = 2;
    posicaoY = 2;
    largura = 1;
    frutaX = 20;
    frutaY = 20;
    placar = 0;
    body = [];
    tamanho = 3;

    pontos.textContent = placar;
    record.textContent = localStorage.getItem("record");
    clearInterval(interval);
    interval = setInterval(game, 100);
    pause.textContent = "Pause";
    gameOver.style.display = "none";
    pause.addEventListener("click", pausar);
});

pause.addEventListener("click", pausar);

pontos.textContent = placar;
record.textContent = localStorage.getItem("record");
document.body.style.backgroundImage = `linear-gradient(${mudarBackground()}, ${mudarBackground()})`;
document.body.style.backgroundRepeat = "no-repeat";

ctx.fillStyle = "black";
ctx.fillRect(0, 0, tela.width, tela.height);

function game() {
    posicaoX += velocidadeX;
    posicaoY += velocidadeY;

    if (posicaoX < 0) {
        posicaoX = tela.width;
    }
    if (posicaoX > tela.width) {
        posicaoX = 0;
    }
    if (posicaoY < 0) {
        posicaoY = tela.height;
    }
    if (posicaoY > tela.height) {
        posicaoY = 0;
    }

    ctx.fillStyle = "black";
    ctx.fillRect(0, 0, tela.width, tela.height);

    body.unshift({ x: posicaoX, y: posicaoY });

    ctx.fillStyle = "red";
    ctx.fillRect(frutaX, frutaY, largura, largura);

    if (posicaoX == frutaX && posicaoY == frutaY) {
        placar += 10;
        tamanho++;
        frutaX = Math.floor(Math.random() * tela.width);
        frutaY = Math.floor(Math.random() * tela.height);

        atualizarRecord(placar);
        exibirPontos(placar);
        document.body.style.backgroundImage = `linear-gradient(${mudarBackground()}, ${mudarBackground()})`;
        document.body.style.backgroundRepeat = "no-repeat";
    }

    if (body.length > tamanho) {
        body.pop();
    }

    for (let z = 1; z < body.length; z++) {
        if (velocidadeX | velocidadeY) {
            if (posicaoX == body[z].x && posicaoY == body[z].y) {
                fimDeJogo();
            }
        }
    }

    for (let i = 0; i < body.length; i++) {
        ctx.fillStyle = "green";
        ctx.fillRect(body[i].x, body[i].y, largura, largura);
    }
}

window.addEventListener("keydown", function (e) {
    if ((e.key == "ArrowLeft") | (e.key == "a") && velocidadeX != 1) {
        velocidadeY = 0;
        velocidadeX = -1;
    }
    if ((e.key == "ArrowRight") | (e.key == "d") && velocidadeX != -1) {
        velocidadeY = 0;
        velocidadeX = 1;
    }
    if ((e.key == "ArrowUp") | (e.key == "w") && velocidadeY != 1) {
        velocidadeX = 0;
        velocidadeY = -1;
    }
    if ((e.key == "ArrowDown") | (e.key == "s") && velocidadeY != -1) {
        velocidadeX = 0;
        velocidadeY = 1;
    }
});

function exibirPontos() {
    pontos.textContent = placar;
    record.textContent = localStorage.getItem("record");
}

function atualizarRecord(pontos) {
    let recordAtual = localStorage.getItem("record");

    if (pontos > recordAtual) {
        localStorage.setItem("record", pontos);
    }
}

function pausar() {
    console.log(this);

    if ((velocidadeX != 0) | (velocidadeY != 0)) {
        if (this.textContent == "Pause") {
            this.textContent = "Resume";
            clearInterval(interval);
        } else {
            this.textContent = "Pause";
            interval = setInterval(game, 100);
        }
    }
}

function mudarBackground() {
    const hexa = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, "A", "B", "C", "D", "E", "F"];

    let hexaColor = "#";

    for (let i = 0; i < 6; i++) {
        let na = Math.floor(Math.random() * hexa.length);

        hexaColor += hexa[na];
    }

    return hexaColor;
}

function fimDeJogo() {
    gameOver.style.display = "flex";
    pause.removeEventListener("click", pausar);
    clearInterval(interval);
}
