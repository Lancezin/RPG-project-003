let inputs = [];
let atributos = ["Força", "Vigor", "Inteligência", "Presença", "Magia"];
let pontosDistribuir = 11;
let pontos = [0, 0, 0, 0, 0]; // Valores iniciais dos atributos
let circulos = []; // Armazena posições dos círculos
let resetButton; // Botão de reset
let classeSelect; // Caixa de seleção para a classe
let classeDescricao; // Texto para a descrição da classe

// Variáveis para HP, Sanidade e Esforço
let hp = 20;
let sanidade = 10;
let esforco = 5;

let imagemUrlInput; // Caixa de texto para o URL da imagem
let imagemPreview;  // (não usado atualmente)
let verificarImagemButton; // Botão "Verificar Imagem"
let imagemDisplay; // Exibindo a imagem

// Variável para definir o layout ("desktop" ou "mobile")
let layout = "desktop";

function setup() {
  createCanvas(windowWidth, windowHeight);
  background(0);
  
  // Define layout com base na largura da janela
  if (windowWidth < 600) {
    layout = "mobile";
  } else {
    layout = "desktop";
  }
  
  // Cria os campos de entrada
  criarCamposDeEntrada();
  
  // Define as posições dos círculos dos atributos conforme o layout
  if (layout === "desktop") {
    let centroX = width / 2 + 250;  // conforme código original
    let centroY = 250;
    let raio = 150;
    circulos = [];
    for (let i = 0; i < atributos.length; i++) {
      let angle = TWO_PI / 5 * i - PI / 2;
      let x = centroX + raio * cos(angle);
      let y = centroY + raio * sin(angle);
      circulos.push({ x: x, y: y, r: 25 });
    }
  } else { // mobile layout: organiza os círculos centralizados e com um raio menor
    let centroX = windowWidth / 2;
    let centroY = 350;
    let raio = 100;
    circulos = [];
    for (let i = 0; i < atributos.length; i++) {
      let angle = TWO_PI / 5 * i - PI / 2;
      let x = centroX + raio * cos(angle);
      let y = centroY + raio * sin(angle);
      circulos.push({ x: x, y: y, r: 20 });
    }
  }
  
  // Cria a caixa de seleção para a classe
  if (layout === "desktop") {
    classeSelect = createSelect();
    classeSelect.position(50, 180);
    classeSelect.size(250, 30);
  } else {
    classeSelect = createSelect();
    classeSelect.position(20, 160);
    classeSelect.size(windowWidth - 40, 30);
  }
  classeSelect.option('Nenhuma classe');
  classeSelect.option('Sábio');
  classeSelect.option('Velocista');
  classeSelect.option('Fisiculturista');
  classeSelect.option('Tagarela');
  classeSelect.option('Especialista');
  classeSelect.changed(atualizarDescricaoClasse);
  
  // Cria a área de descrição da classe
  if (layout === "desktop") {
    classeDescricao = createDiv('Não aumenta nada');
    classeDescricao.position(50, 220);
  } else {
    classeDescricao = createDiv('Não aumenta nada');
    classeDescricao.position(20, 210);
  }
  classeDescricao.style('color', '#fff');
  classeDescricao.style('font-size', '12px');
  
  // Botão de reset
  if (layout === "desktop") {
    resetButton = createButton('Reset');
    resetButton.position(width/2 + 250 - 65, 250 + 20);
    resetButton.size(120, 30);
  } else {
    resetButton = createButton('Reset');
    resetButton.position(20, 260);
    resetButton.size(windowWidth - 40, 30);
  }
  resetButton.mousePressed(resetAtributos);
  
  // Caixa de texto para a URL da imagem
  if (layout === "desktop") {
    imagemUrlInput = createInput('');
    imagemUrlInput.position(50, 490);
    imagemUrlInput.size(250, 30);
  } else {
    imagemUrlInput = createInput('');
    imagemUrlInput.position(20, 550);
    imagemUrlInput.size(windowWidth - 40, 30);
  }
  
  // Botão "Verificar Imagem"
  if (layout === "desktop") {
    verificarImagemButton = createButton('Verificar Imagem');
    verificarImagemButton.position(50, 530);
    verificarImagemButton.size(250, 30);
  } else {
    verificarImagemButton = createButton('Verificar Imagem');
    verificarImagemButton.position(20, 590);
    verificarImagemButton.size(windowWidth - 40, 30);
  }
  verificarImagemButton.mousePressed(exibirImagem);
  
  // Área para exibir a imagem
  if (layout === "desktop") {
    imagemDisplay = createImg('');
    imagemDisplay.position(350, 320);
    imagemDisplay.size(250, 250);
  } else {
    imagemDisplay = createImg('');
    // Em mobile, coloca a imagem abaixo dos botões, centralizada
    imagemDisplay.position((windowWidth - (windowWidth - 40)) / 2 + 20, 650);
    imagemDisplay.size(windowWidth - 40, windowWidth - 40); // quadrado com largura quase total
  }
}

function criarCamposDeEntrada() {
  let campos = ["Nome", "Idade"];
  for (let i = 0; i < campos.length; i++) {
    let input = createInput("");
    if (layout === "desktop") {
      input.position(50, 100 + i * 40);
      input.size(250, 30);
    } else {
      input.position(20, 50 + i * 50);
      input.size(windowWidth - 40, 40);
    }
    input.style("background", "#fff");
    input.style("color", "#000");
    input.attribute("placeholder", campos[i]);
    if (campos[i] === "Idade") {
      input.attribute("type", "number");
      input.input(verificarIdade);
    }
    inputs.push(input);
  }
}

function verificarIdade() {
  let idade = this.value();
  if (isNaN(idade) || idade < 0) {
    this.value('');
  }
}

function draw() {
  background(0);
  
  // Desenha os círculos dos atributos e seus textos
  for (let i = 0; i < atributos.length; i++) {
    fill(255);
    ellipse(circulos[i].x, circulos[i].y, layout === "desktop" ? 50 : 40, layout === "desktop" ? 50 : 40);
    
    fill(0);
    textSize(layout === "desktop" ? 16 : 14);
    textAlign(CENTER, CENTER);
    text(pontos[i], circulos[i].x, circulos[i].y);

    fill(255);
    textSize(layout === "desktop" ? 12 : 10);
    text(atributos[i], circulos[i].x, circulos[i].y + (layout === "desktop" ? 30 : 25));
  }
  
  // Texto "Atributos"
  fill(255);
  textSize(24);
  textAlign(CENTER, CENTER);
  if (layout === "desktop") {
    text("Atributos", width / 2 + 250, 250);
  } else {
    text("Atributos", windowWidth / 2, 320);
  }
  
  // Atualiza valores de HP, Sanidade e Esforço
  hp = calcularHP();
  sanidade = calcularSanidade();
  esforco = calcularEsforco();
  
  // Desenha as barras de HP, Sanidade e Esforço
  if (layout === "desktop") {
    desenharBarra("HP", hp, 50, 270, color(255, 0, 0), 10, 36);
    desenharBarra("Sanidade", sanidade, 50, 320, color(0, 0, 255), 5, 24);
    desenharBarra("Esforço", esforco, 50, 370, color(255, 255, 0), 3, 8);
  } else {
    // Em mobile, as barras podem ser empilhadas verticalmente
    desenharBarra("HP", hp, 20, 400, color(255, 0, 0), 10, 36);
    desenharBarra("Sanidade", sanidade, 20, 450, color(0, 0, 255), 5, 24);
    desenharBarra("Esforço", esforco, 20, 500, color(255, 255, 0), 3, 8);
  }
  
  // Texto "Defesa" e escudo
  if (layout === "desktop") {
    fill(255);
    textSize(14);
    textAlign(CENTER, CENTER);
    text("Defesa", 70, 410);
    let defesa = calcularDefesa();
    desenharEscudo(50, 420, defesa);
  } else {
    fill(255);
    textSize(14);
    textAlign(CENTER, CENTER);
    text("Defesa", 20, 560);
    let defesa = calcularDefesa();
    desenharEscudo(20, 570, defesa);
  }
  
  // O botão Reset é um elemento HTML, portanto é mostrado automaticamente
}

function desenharBarra(nome, valor, x, y, cor, min, max) {
  fill(255);
  textSize(14);
  textAlign(LEFT, CENTER);
  text(nome + ": " + valor, x, y - 10);
  fill(cor);
  noStroke();
  rect(x, y, map(valor, min, max, 0, 250), 20);
}

function calcularHP() {
  let hpBase = 20;
  switch (classeSelect.value()) {
    case 'Sábio': hpBase -= 2; break;
    case 'Velocista': hpBase += 5; break;
    case 'Fisiculturista': hpBase += 7; break;
    case 'Tagarela': hpBase += 3; break;
    case 'Especialista': hpBase -= 3; break;
  }
  hpBase += pontos[0] * 2;
  hpBase += pontos[1] * 1;
  return constrain(hpBase, 10, 36);
}

function calcularSanidade() {
  let sanidadeBase = 10;
  switch (classeSelect.value()) {
    case 'Sábio': sanidadeBase += 5; break;
    case 'Velocista': sanidadeBase -= 1; break;
    case 'Fisiculturista': sanidadeBase -= 2; break;
    case 'Tagarela': sanidadeBase += 2; break;
    case 'Especialista': sanidadeBase += 3; break;
  }
  sanidadeBase += pontos[2] * 2;
  sanidadeBase += pontos[3] * 1;
  return constrain(sanidadeBase, 5, 24);
}

function calcularEsforco() {
  let esforcoBase = 5;
  switch (classeSelect.value()) {
    case 'Sábio': esforcoBase += 1; break;
    case 'Velocista': esforcoBase += 1; break;
    case 'Fisiculturista': esforcoBase += 1; break;
    case 'Tagarela': esforcoBase += 1; break;
    case 'Especialista': esforcoBase += 2; break;
  }
  if (pontos[4] >= 2) {
    esforcoBase += 1;
  }
  return constrain(esforcoBase, 3, 8);
}

function mousePressed() {
  for (let i = 0; i < circulos.length; i++) {
    let d = dist(mouseX, mouseY, circulos[i].x, circulos[i].y);
    if (d < circulos[i].r) {
      let proximoValor = (pontos[i] + 1) % 4;
      let diferenca = proximoValor - pontos[i];
      if (pontosDistribuir - diferenca >= 0) {
        pontosDistribuir -= diferenca;
        pontos[i] = proximoValor;
      }
    }
  }
}

function resetAtributos() {
  pontosDistribuir = 11;
  pontos = [0, 0, 0, 0, 0];
  hp = 20;
  sanidade = 10;
  esforco = 5;
}

function desenharEscudo(x, y, defesa) {
  fill(200);
  stroke(173, 216, 230);
  strokeWeight(4);
  beginShape();
  vertex(x, y);
  vertex(x + 40, y);
  vertex(x + 50, y + 20);
  vertex(x + 20, y + 50);
  vertex(x - 10, y + 20);
  endShape(CLOSE);
  fill(0);
  noStroke();
  textSize(18);
  textAlign(CENTER, CENTER);
  text(defesa, x + 20, y + 20);
}

function calcularDefesa() {
  let defesaBase = 10;
  switch (classeSelect.value()) {
    case 'Fisiculturista': defesaBase += 2; break;
    case 'Velocista': defesaBase += 1; break;
    case 'Tagarela': defesaBase -= 1; break;
    case 'Sábio': defesaBase -= 2; break;
  }
  defesaBase += pontos[1];
  return max(defesaBase, 0);
}

function atualizarDescricaoClasse() {
  switch (classeSelect.value()) {
    case 'Sábio': classeDescricao.html('Modifica principalmente HP e Sanidade.'); break;
    case 'Velocista': classeDescricao.html('Aumenta Agilidade e Esforço.'); break;
    case 'Fisiculturista': classeDescricao.html('Modifica Força e Defesa.'); break;
    case 'Tagarela': classeDescricao.html('Aumenta Inteligência e Sanidade.'); break;
    case 'Especialista': classeDescricao.html('Possui bônus em Magia e Defesa.'); break;
    default: classeDescricao.html('Não aumenta nada'); break;
  }
}

function exibirImagem() {
  let urlImagem = imagemUrlInput.value();
  imagemDisplay.attribute('src', urlImagem);
}
