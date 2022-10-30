import renderizaPokemon from "./RenderizaPokemon.js";

const containerPokemon = document.querySelector(".pokemons");
const spanMensagem = document.querySelector('.container-mensagem span');

const pesquisaPorPokemon = async (value) => {
  mensagemPesquisa('Carregando...',false);
  const req = await fetch(`https://pokeapi.co/api/v2/pokemon/${value}`);

  if (req.status === 404) return mensagemPesquisa("Não foi encontrado...", true);
  if (req.status !== 200) return mensagemPesquisa("Erro na pesquisa", true);

  const data = await req.json();

  containerPokemon.innerHTML = renderizaPokemon(data);
  mensagemPesquisa('',false)
};

const mensagemPesquisa = (mensagem, erro) => {
  spanMensagem.innerText = mensagem;
  if (erro) { 
    setTimeout(() => {
      spanMensagem.innerText = '';
    },5000)
  }
};

export default pesquisaPorPokemon;
