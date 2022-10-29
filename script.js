import inicializaPokemons from "./modules/IniciaPokemon.js";
import { recuperaNoStorage, gravaNoStorage } from "./modules/HandleStorage.js";
import { abrePokemon, fechaPokemon } from "./modules/ModalPokemon.js";
import pesquisaPorPokemon from "./modules/PesquisaPokemon.js";

const titlePage = document.querySelector('#title-page');
const verMais = document.querySelector('.container-verMais span');
const formInput = document.querySelector('#form-input');

const previous = document.querySelector("#previous");
const next = document.querySelector("#next");

window.urlNext;
window.urlPrevious;

window.abrePokemon = abrePokemon;
window.fechaPokemon = fechaPokemon;


next.addEventListener("click", () => {
  inicializaPokemons(window.urlNext, true);
});

previous.addEventListener("click", () => {
  if (window.urlPrevious) inicializaPokemons(window.urlPrevious, true);
});

titlePage.addEventListener('click', (e) => {
    e.preventDefault();
    gravaNoStorage("https://pokeapi.co/api/v2/pokemon/");
    recuperaNoStorage();
})

verMais.addEventListener('click', () => {
  inicializaPokemons(window.urlNext, false);
})

formInput.addEventListener('submit', (e) => {
  e.preventDefault();
  const input = formInput.texto.value;
  
  if(input) pesquisaPorPokemon(input.toLowerCase());
})

recuperaNoStorage();
