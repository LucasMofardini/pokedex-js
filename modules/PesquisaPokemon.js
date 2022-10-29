import renderizaPokemon from "./RenderizaPokemon.js";

const containerPokemon = document.querySelector(".pokemons");

const pesquisaPorPokemon = async (value) => {
  const req = await fetch(`https://pokeapi.co/api/v2/pokemon/${value}`);

  if (req.status === 404) return mensagemPesquisa("Não foi encontrado...");
  if (req.status !== 200) return mensagemPesquisa("Erro na pesquisa");

  const data = await req.json();

  containerPokemon.innerHTML = renderizaPokemon(data);
  console.log(data);
};

const mensagemPesquisa = (mensagem) => {
  alert(mensagem);
};

export default pesquisaPorPokemon;
