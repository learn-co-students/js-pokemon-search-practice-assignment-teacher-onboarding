document.addEventListener("DOMContentLoaded", function() {
  const pokemonContainer = document.getElementById("pokemon-container");
  const pokemons = []
  const searchInput = document.getElementById('pokemon-search-input')

  const addListener = () => {
    images = pokemonContainer.querySelectorAll(".toggle-sprite")
    images.forEach(img => {
      img.addEventListener("click", event => {
        pokemons.find(pk => {
          if(String(pk.order)=== img.dataset.id) {
            img.src = pk.sprites.front === img.src ? pk.sprites.back : pk.sprites.front
          }
        })
      });
    });
  }

  searchInput.addEventListener('keyup', event => {
    while(pokemonContainer.firstChild) {
      pokemonContainer.removeChild(pokemonContainer.firstChild)
    }
    pokemons.length = 0
    url = "http://localhost:3000/pokemons";
    fetch(url)
    .then(resp => resp.json())
    .then(data => {
      const filteredPokemon = data.filter(pokemon => pokemon.name.includes(searchInput.value))
      filteredPokemon.forEach(pk => {
        pokemons.push(pk)
        pokemonContainer.insertAdjacentHTML(
          "beforeend",
          `<div class="pokemon-container">
          <div style="width:230px;margin:10px;background:#fecd2f;color:#2d72fc" class="pokemon-frame">
          <h1 class="center-text">${pk.name}</h1>
          <div style="width:239px;margin:auto">
          <div style="width:96px;margin:auto">
          <img data-id="${pk.order}" data-action="flip"
          class="toggle-sprite" src="${pk.sprites.front}">
          </div>
          </div>
          </div>
          </div>`
          );
      });
      addListener()
    })
  })


});
