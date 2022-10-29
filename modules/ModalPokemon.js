const root = document.querySelector(".root-modal");

export const abrePokemon = (id) => {
  const url = `https://pokeapi.co/api/v2/pokemon/${id}/`;

  fetch(url)
    .then((res) => res.json())
    .then((data) => {
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
                  <div class="container-close" onClick="fechaPokemon()">
                      <div class="box-close"><p>x</p></div>
                  </div>
              </div>
            </div>
            </div>
          `;

      root.innerHTML += div;
    });
};

export const fechaPokemon = () => {
  document.querySelector(".bg-modal").remove();
};
