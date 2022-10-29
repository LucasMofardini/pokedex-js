import renderizaPokemon from "./RenderizaPokemon.js";
import { gravaNoStorage } from "./HandleStorage.js";

const containerPokemon = document.querySelector(".pokemons");
const previous = document.querySelector("#previous");
const next = document.querySelector("#next");

const inicializaPokemons = (url, limparContainer) => {
  fetch(url)
    .then((req) => {
      gravaNoStorage(req.url);
      return req.json();
    })
    .then((data) => {
      const { results } = data;
      window.urlNext = data.next;
      window.urlPrevious = data.previous;

      // Muda as cores dos botões caso não tenha PreviousPage ou NextPage
      previous.style.color = "#3c3c3c";
      if (!window.urlPrevious) previous.style.color = "rgba(0,0,0,.5)";

      next.style.color = "#3c3c3c";
      if (!window.urlNext) next.style.color = "rgba(0,0,0,.5)";

      if (limparContainer) containerPokemon.innerHTML = "";

      const urls = results.map(({ url }) => fetch(url));

      Promise.all(urls).then((response) => {
        response.forEach((res) => {
          res.json().then((dataPokemon) => {
            containerPokemon.innerHTML += renderizaPokemon(dataPokemon);
          });
        });
      });
    });
};

export default inicializaPokemons;
