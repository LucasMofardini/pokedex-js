const containerPokemon = document.querySelector(".pokemons");
const modalPokemon = document.querySelector(".bg-modal");
const root = document.querySelector(".root-modal");
const titlePage = document.querySelector('#title-page');
let previous = document.querySelector("#previous");
let next = document.querySelector("#next");

let urlNow;
let urlNext;
let urlPrevious;

const inicializaPokemons = (url, limparContainer) => {
  fetch(url)
    .then((req) => {
      gravaNoStorage(req.url);
      return req.json();
    })
    .then((data) => {
      const { results } = data;
      urlNext = data.next;
      urlPrevious = data.previous;

      // Muda as cores dos botões caso não tenha PreviousPage ou NextPage
      previous.style.color = "#3c3c3c";
      if (!urlPrevious) previous.style.color = "rgba(0,0,0,.5)";

      next.style.color = "#3c3c3c";
      if (!urlNext) next.style.color = "rgba(0,0,0,.5)";

      if (limparContainer) containerPokemon.innerHTML = "";

      const urls = results.map(({ url }) => fetch(url));

      Promise.all(urls).then((response) => {
        response.forEach((res) => {
          res.json().then((dataPokemon) => {
            const nomePokemon = dataPokemon?.name;
            const urlFotoPokemon = dataPokemon?.sprites.front_default;
            const tipoPokemon = dataPokemon?.types;
            let pokemon = `
                                <div class="pokemon" onClick="abrePokemon(${
                                  dataPokemon?.id
                                })">
                                    <div class="box-nome-tipo"> 
                                        <h2 class="nome"><span class="subtitle-pokemon">#${
                                          dataPokemon?.order
                                        }</span> ${nomePokemon}</h2>
                                        <ul class="tipo">
                                            <li>
                                                ${tipoPokemon
                                                  .map((tipo) => {
                                                    return tipo.type.name;
                                                  })
                                                  .join("</li><li>")}
                                            </li>
                                        </ul>
                                    </div>
                                    <img src="${urlFotoPokemon}">
                                </div>`;

            containerPokemon.innerHTML += pokemon;
          });
        });
      });
    });
};

const abrePokemon = (id) => {
  const url = `https://pokeapi.co/api/v2/pokemon/${id}/`;

  fetch(url)
    .then((res) => res.json())
    .then((data) => {
      console.log(data);

      const div = `
        <div class="bg-modal active">
        <div class="modal active">
            <div class="box-modal active">  
                <div>
                    <h2>${data.name}</h2>
                </div>
                <div class="infos">
                    <div>
                        <p><b>Altura : </b> <span class="show">${
                          data.height
                        }</span></p>
                        <p><b>Peso : </b> <span class="show">${
                          data.weight
                        }</span> </p>
                        <p><b>Experiencia Base :</b> <span class="show">${
                          data.base_experience
                        }</span></p>
                        <p><b>Status: </b></p>
                        <ul> ${data.stats
                          .map((item) => {
                            return `<li>${item.stat.name} = ${item.base_stat}</li>`;
                          })
                          .join("</li><li>")} </ul>
                    </div>
                    <div class="box-image">
                        <img src="${data.sprites.front_default}">
                    </div>
                </div>
                <div class="container-close" onClick="fecharModal()">
                    <div class="box-close"><p>x</p></div>
                </div>
            </div>
          </div>
          </div>
        `;

      root.innerHTML += div;
    });
};

const fecharModal = () => {
  document.querySelector(".bg-modal").remove();
};

const gravaNoStorage = (url) => {
  localStorage.url = url;
};

const recuperaNoStorage = () => {
  const url = localStorage.url;

  if (url)  return inicializaPokemons(url, true);
  inicializaPokemons("https://pokeapi.co/api/v2/pokemon/", true);
};

next.addEventListener("click", () => {
  inicializaPokemons(urlNext, true);
  gravaNoStorage(urlNext);
});

previous.addEventListener("click", () => {
  if (urlPrevious) {
    gravaNoStorage(urlPrevious);
    return inicializaPokemons(urlPrevious, true);
  }
});

titlePage.addEventListener('click', (e) => {
    e.preventDefault();
    gravaNoStorage("https://pokeapi.co/api/v2/pokemon/");
    recuperaNoStorage()
})

recuperaNoStorage();
