document.addEventListener("DOMContentLoaded", function() {
  const pokemonContainer = document.getElementById("pokemon-container");
  let pokemons = []
  const searchInput = document.getElementById('pokemon-search-input')
  const url = "http://localhost:3000/pokemons";

  init = () => {
    fetch(url)
    .then(resp => resp.json())
    .then(data => {
      pokemons = data
      renderPokemon(pokemons)
      searchFunction()
    })
  }

  searchFunction = () => {
    searchInput.addEventListener('keyup', event => {
      while(pokemonContainer.firstChild) {
        pokemonContainer.removeChild(pokemonContainer.firstChild)
      }
      const filteredPokemon = pokemons.filter(pokemon => pokemon.name.includes(searchInput.value))
      renderPokemon(filteredPokemon)
    })
  }

  renderPokemon = (pokeArray) => {
    pokeArray.forEach(pk => {
      pokeDiv = document.createElement('div')
      pokeDiv.classList.add('pokemon-container')
      pokeDiv.innerHTML = `<div style="width:230px;margin:10px;background:#fecd2f;color:#2d72fc" class="pokemon-frame">
      <h1 class="center-text">${pk.name}</h1>
      <div style="width:239px;margin:auto">
      <div style="width:96px;margin:auto">
      <img data-id="${pk.order}" data-action="flip"
      class="toggle-sprite" src="${pk.sprites.front}">
      </div>
      </div>
      </div>
      `
      pokeDiv.querySelector('img').addEventListener("click", e => {
        e.target.src = pk.sprites.front === e.target.src ? pk.sprites.back : pk.sprites.front
      });
      pokemonContainer.appendChild(pokeDiv)
    });
  }
  init()
});
