const renderizaPokemon = (dataPokemon) => {
  const nomePokemon = dataPokemon?.name;
  const urlFotoPokemon = dataPokemon?.sprites.front_default;
  const tipoPokemon = dataPokemon?.types;
  return `
                        <div class="pokemon" onClick="window.abrePokemon(${
                          dataPokemon?.id
                        })">
                            <div class="box-nome-tipo"> 
                                <h2 class="nome"><span class="subtitle-pokemon">#${
                                  dataPokemon?.id
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
};

export default renderizaPokemon;
