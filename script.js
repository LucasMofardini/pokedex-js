const containerPokemon = document.querySelector('.pokemons');
const modalPokemon = document.querySelector('.bg-modal');

const inicializaPokemons = () => {
    fetch('https://pokeapi.co/api/v2/pokemon/')
    .then((req) => req.json())
    .then((data) => {
        const { results } = data;
        results.forEach((item) => {
            fetch(item.url).then((requestPokemon) => requestPokemon.json() )
            .then((dataPokemon) => {
                const nomePokemon = dataPokemon.name;
                const urlFotoPokemon = dataPokemon.sprites.front_default;
                const tipoPokemon = dataPokemon.types;

                const pokemon = `
                <div class="pokemon" onClick="abrePokemon(${dataPokemon.id})">
                    <div class="box-nome-tipo"> 
                        <h2 class="nome">${nomePokemon}</h2>
                        <ul class="tipo">
                            <li>
                                ${tipoPokemon.map((tipo) => {
                                        return tipo.type.name
                                }).join('</li><li>')}
                            </li>
                        </ul>
                    </div>
                    <img src="${urlFotoPokemon}">
                </div>`;

            containerPokemon.innerHTML += pokemon;
            });
        })
    })
 
}

const abrePokemon = (id) => {
    const url = `https://pokeapi.co/api/v2/pokemon/${id}/`;

    fetch(url).then((res) => res.json())
    .then((data) => {
        console.log(data)
       
        const div = `
        <div class="bg-modal active">
        <div class="modal active">
            <div class="box-modal active">  
                <div>
                    <h2>${data.name}</h2>
                </div>
                <div class="infos">
                    <div>
                        <p><b>Altura : </b> <span class="show">${data.height}</span></p>
                        <p><b>Peso : </b> <span class="show">${data.weight}</span> </p>
                        <p><b>Experiencia Base :</b> <span class="show">${data.base_experience}</span></p>
                        <p><b>Status: </b></p>
                        <ul> ${data.stats.map((item)=>{
                            return `<li>${item.stat.name} = ${item.base_stat}</li>`;
                        }).join('</li><li>')} </ul>
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
        document.body.innerHTML += div;        
    })
}

const fecharModal = () => {
    document.querySelector('.bg-modal').remove();
}

inicializaPokemons();

