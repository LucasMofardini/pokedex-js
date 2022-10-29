import inicializaPokemons from "./IniciaPokemon.js";

export const gravaNoStorage = (url) => {
  localStorage.url = url;
};

export const recuperaNoStorage = () => {
  const url = localStorage.url;

  if (url) return inicializaPokemons(url, true);
  inicializaPokemons("https://pokeapi.co/api/v2/pokemon/", true);
};
