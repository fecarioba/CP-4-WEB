const filmes = [
  { id: 0, nome: "Harry Potter", genero: "fantasia", lancamento: 2001 },
  { id: 1, nome: "Avatar", genero: "fantasia", lancamento: 2010 },
  { id: 2, nome: "O Senhor dos Anéis", genero: "fantasia", lancamento: 2000 },
  { id: 3, nome: "Branquelas", genero: "comédia", lancamento: 2007 },
  { id: 4, nome: "A Lagoa Azul", genero: "romance", lancamento: 1983 },
];

let filmesFavoritos = [];

const btn1 = document.querySelector("button");
const listaFilmes = document.querySelector("#listaFilmes");
const inputUsuario = document.querySelector("#filmeInput");

window.onload = () => {
  carregarFavoritos();
  renderizarLista();
};

const renderizarLista = () => {
  listaFilmes.innerHTML = "";
  filmes.forEach((filme) => {
    const itemLista = document.createElement("li");
    listaFilmes.append(itemLista);
    itemLista.innerHTML = `Meu filme: ${filme.nome}`;

    const favorito = document.createElement("img");
    favorito.src = filmesFavoritos.some((fav) => fav.id === filme.id)
      ? "/lista-filmes/img/heart-fill.svg"
      : "/lista-filmes/img/heart.svg";
    favorito.style.cursor = "pointer";
    favorito.addEventListener("click", (e) => {
      favoritoClicado(e, filme);
    });
    itemLista.append(favorito);
  });
};

btn1.addEventListener("click", () => {
  const nomeFilme = inputUsuario.value.trim();
  if (nomeFilme === "") {
    alert("Por favor, insira o nome de um filme.");
    return;
  }
  const id = filmes.length;
  filmes.push({ id: id, nome: nomeFilme, genero: "", lancamento: "" });
  renderizarLista();
  inputUsuario.value = "";
});

const favoritoClicado = (eventoDeClique, objetoFilme) => {
  const favoriteState = {
    favorited: "/lista-filmes/img/heart=fill.svg",
    notFavorited: "/lista-filmes/img/heart.svg",
  };
  if (eventoDeClique.target.src.includes(favoriteState.notFavorited)) {
    eventoDeClique.target.src = favoriteState.favorited;
    saveToLocalStorage(objetoFilme);
  } else {
    eventoDeClique.target.src = favoriteState.notFavorited;
    removeFromLocalStorage(objetoFilme.id);
  }
};

const saveToLocalStorage = (objetoFilme) => {
  if (!filmesFavoritos.some((fav) => fav.id === objetoFilme.id)) {
    filmesFavoritos.push(objetoFilme);
  }
  localStorage.setItem("favoritos", JSON.stringify(filmesFavoritos));
};

function removeFromLocalStorage(id) {
  filmesFavoritos = filmesFavoritos.filter((movie) => movie.id !== id);
  localStorage.setItem("favoritos", JSON.stringify(filmesFavoritos));
}

const carregarFavoritos = () => {
  const favoritos = localStorage.getItem("favoritos");
  if (favoritos) {
    filmesFavoritos = JSON.parse(favoritos);
  }
};
