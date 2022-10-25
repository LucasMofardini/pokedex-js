const containerPokemon = document.querySelector('.pokemons');

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
        
    })
}

inicializaPokemons();

