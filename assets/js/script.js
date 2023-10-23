let tocando_agora = document.querySelector(".quantidade-musicas");
let foto_album = document.querySelector(".album-imagem");
let nome_musica = document.querySelector(".nome-musica");
let nome_artista = document.querySelector(".nome-artista");

let playpause_btn = document.querySelector(".playpause-musica");
let proximo_btn = document.querySelector(".proximo-musica");
let anterior_btn = document.querySelector(".anterior-musica");

let duracao_range = document.querySelector(".duracao-range");
let volume_range = document.querySelector(".volume-range");
let tempo_atual = document.querySelector(".tempo-atual");
let tempo_total = document.querySelector(".duracao-total");
let musica_atual = document.createElement("audio");
let iconeAleatorio = document.querySelector(".aleatorio-musica svg");
let iconeRepetir = document.querySelector(".repetir-musica svg path");
console.log(iconeAleatorio);

let musica_index = 0;
let estaTocando = false;
let aleatorio = false;
let atualizaTimer;

const playlist = [
  {
    img: "./assets/capa/Heaven&Hell.jpg",
    nome: "Sweet but Psycho",
    artista: "Ava Max",
    musica: "./assets/musicas/SweetbutPsycho.mp3",
  },
  {
    img: "./assets/capa/OneMoreLight.jpg",
    nome: "Sharp Edges",
    artista: "Linkin Park",
    musica: "./assets/musicas/SharpEdges.mp3",
  },
  {
    img: "./assets/capa/Riot.jpg",
    nome: "Misery Business",
    artista: "Paramore",
    musica: "./assets/musicas/MiseryBusiness.mp3",
  },
  {
    img: "./assets/capa/Positions.jpg",
    nome: "Positions",
    artista: "Ariana Grande",
    musica: "./assets/musicas/Positions.mp3",
  },
];

carregarMusica(musica_index);

function carregarMusica(musica_index) {
  clearInterval(atualizaTimer);
  reset();

  musica_atual.src = playlist[musica_index].musica;
  musica_atual.load();

  foto_album.style.backgroundImage = "url(" + playlist[musica_index].img + ")";
  nome_musica.textContent = playlist[musica_index].nome;
  nome_artista.textContent = playlist[musica_index].artista;
  tocando_agora.textContent =
    "Tocando " + (musica_index + 1) + " de " + playlist.length;

  atualizaTimer = setInterval(setUpdate, 1000);
  musica_atual.addEventListener("ended", proximaMusica);
}

function reset() {
  tempo_atual.textContent = "00:00";
  tempo_total.textContent = "00:00";
  duracao_range.value = 0;
}

function musicaAleatoria() {
  aleatorio ? pararAleatorio() : iniciarAleatorio();
}

function iniciarAleatorio() {
  aleatorio = true;
  iconeAleatorio.setAttribute("fill", "#42f581");
}

function pararAleatorio() {
  aleatorio = false;
  iconeAleatorio.setAttribute("fill", "#ffffff");
}

function repetirMusica() {
  let index = musica_index;
  carregarMusica(index);
  iniciarMusica();
}

function iniciarPausarMusica() {
  estaTocando ? pararMusica() : iniciarMusica();
}

function iniciarMusica() {
  musica_atual.play();
  estaTocando = true;
  playpause_btn.innerHTML =
    '<img src="./assets/icones/pause.svg" width="32" height="32" alt="">';
}

function pararMusica() {
  musica_atual.pause();
  estaTocando = false;
  playpause_btn.innerHTML =
    '<img src="./assets/icones/play.svg" width="32" height="32" alt="">';
}
function proximaMusica() {
  if (musica_index < playlist.length - 1 && aleatorio === false) {
    musica_index += 1;
  } else if (musica_index < playlist.length - 1 && aleatorio === true) {
    let index_aleatorio = Number.parseInt(Math.random() * playlist.length);
    musica_index = index_aleatorio;
  } else {
    musica_index = 0;
  }
  carregarMusica(musica_index);
  iniciarMusica();
}

function anteriorMusica() {
  if (musica_index > 0) {
    musica_index -= 1;
  } else {
    musica_index = playlist.length - 1;
  }
  carregarMusica(musica_index);
  iniciarMusica();
}

function duracaoMusica() {
  let duracao = musica_atual.duration * (duracao_range.value / 100);
  musica_atual.currentTime = duracao;
}

function mudarVolume() {
  musica_atual.volume = volume_range.value / 100;
}

function setUpdate() {
  let posicaoScroll = 0;
  if (!isNaN(musica_atual.duration)) {
    posicaoScroll = musica_atual.currentTime * (100 / musica_atual.duration);
    duracao_range.value = posicaoScroll;

    let minutosAtuais = Math.floor(musica_atual.currentTime / 60);
    let segundosAtuais = Math.floor(
      musica_atual.currentTime - minutosAtuais * 60
    );
    let duracaoMinutos = Math.floor(musica_atual.duration / 60);
    let duracaoSegundos = Math.floor(
      musica_atual.duration - duracaoMinutos * 60
    );

    if (segundosAtuais < 10) {
      segundosAtuais = "0" + segundosAtuais;
    }
    if (duracaoSegundos < 10) {
      duracaoSegundos = "0" + duracaoSegundos;
    }
    if (minutosAtuais < 10) {
      minutosAtuais = "0" + minutosAtuais;
    }
    if (duracaoMinutos < 10) {
      duracaoMinutos = "0" + duracaoMinutos;
    }

    tempo_atual.textContent = minutosAtuais + ":" + segundosAtuais;
    tempo_total.textContent = duracaoMinutos + ":" + duracaoSegundos;
  }
}
