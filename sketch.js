let jardineiro;
let plantas = [];
let temperatura = 10;
let totalArvores = 0;
let pontos = 0;
let animais = []; // Array para armazenar animais
let chuva = false; // Variável para ativar/desativar chuva

function setup() {
  createCanvas(600, 400);
  jardineiro = new Jardineiro(width / 2, height - 50);
}

function draw() {
  let corFundo = lerpColor(
    color(217, 112, 26),
    color(219, 239, 208),
    map(totalArvores, 0, 100, 0, 1)
  );
  background(corFundo);

  if (chuva) desenharChuva();

  mostrarInformacoes();

  temperatura += 0.1;

  jardineiro.atualizar();
  jardineiro.mostrar();

  verificarFimDeJogo();

  plantas.forEach((arvore) => {
    arvore.mostrar();
    if (frameCount % 200 === 0) arvore.crescer();
  });

  animais.forEach((animal) => animal.mostrar());

  if (frameCount % 500 === 0) gerarEventoClimatico();
}

function mostrarInformacoes() {
  textSize(16);
  fill(0);
  text("Temperatura: " + temperatura.toFixed(2), 10, 390);
  text("Árvores: " + totalArvores, 460, 390);
  text("Pontos: " + pontos, 250, 390);
  text("Use setas para se mover e 'P' ou espaço para plantar!", 10, 60);
}

function verificarFimDeJogo() {
  if (totalArvores > temperatura) {
    mostrarMensagem("Você venceu! 🌳");
  } else if (temperatura > 50) {
    mostrarMensagem("🔥 Você perdeu! O planeta aqueceu demais.");
  }
}

function mostrarMensagem(mensagem) {
  textSize(20);
  fill(0);
  text(mensagem, 150, 200);
  noLoop();
}

// Adicionando o crescimento das árvores
class Arvore {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.tamanho = 1;
    this.emoji = "🌱";
  }

  crescer() {
    if (this.tamanho < 3) {
      this.tamanho++;
      if (this.tamanho === 2) this.emoji = "🌿";
      if (this.tamanho === 3) this.emoji = "🌳";
    }
  }

  mostrar() {
    textSize(24);
    text(this.emoji, this.x, this.y);
  }
}

// Adicionando animais no ambiente
class Animal {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.emoji = random(["🐦", "🦋", "🐿"]);
  }

  mostrar() {
    textSize(20);
    text(this.emoji, this.x, this.y);
  }
}

// Criando efeito de chuva
function desenharChuva() {
  for (let i = 0; i < 10; i++) {
    let x = random(width);
    let y = random(height);
    fill(0, 0, 255);
    ellipse(x, y, 5, 5);
  }
}

// Gerando eventos climáticos aleatórios
function gerarEventoClimatico() {
  chuva = random() > 0.5;
  if (chuva) temperatura -= 2;
}

// Criando o jardineiro
class Jardineiro {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.emoji = "👨‍🌾";
    this.velocidade = 3;
  }

  atualizar() {
    if (keyIsDown(LEFT_ARROW)) this.x -= this.velocidade;
    if (keyIsDown(RIGHT_ARROW)) this.x += this.velocidade;
    if (keyIsDown(UP_ARROW)) this.y -= this.velocidade;
    if (keyIsDown(DOWN_ARROW)) this.y += this.velocidade;
  }

  mostrar() {
    textSize(32);
    text(this.emoji, this.x, this.y);
  }
}

// Criando árvores e animais ao plantar
function criarArvore() {
  let x = jardineiro.x;
  let y = jardineiro.y - 10;
  plantas.push(new Arvore(x, y));
  totalArvores++;
  pontos += 5;

  if (random() > 0.7) {
    animais.push(new Animal(x + random(-20, 20), y + random(-20, 20)));
  }
}

function keyPressed() {
  if (key === "p" || key === "P" || keyCode === 32) {
    criarArvore();
  }
}