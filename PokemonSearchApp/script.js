const searchInput = document.getElementById('search-input');
const searchButton = document.getElementById('search-button');
const pokemonName = document.getElementById('pokemon-name');
const pokemonId = document.getElementById('pokemon-id');
const weight = document.getElementById('weight');
const height = document.getElementById('height');
const types = document.getElementById('types');
const hp = document.getElementById('hp');
const attack = document.getElementById('attack');
const defense = document.getElementById('defense');
const specialAttack = document.getElementById('special-attack');
const specialDefense = document.getElementById('special-defense');
const speed = document.getElementById('speed');
const spriteContainer = document.getElementById('sprite-container');
const pokemonUrl = 'https://pokeapi-proxy.freecodecamp.rocks/api/pokemon';

let pokemonLists = {}

async function getPokemon(IdOrName) {
  try {
    const res = await fetch(`${pokemonUrl}/${IdOrName}`);
    const pokemonInfo = await res.json();
    console.log(pokemonInfo);
    return pokemonInfo;
  } catch (err) {
    console.log(err);
  }
}

const updateUI = (pokemonInfo) => {
  if (!pokemonInfo) {
    alert('Pokémon not found');
    return;
  }
  pokemonName.textContent = pokemonInfo.name;
  pokemonId.textContent = '#' + pokemonInfo.id;
  weight.textContent = `Weight: ${pokemonInfo.weight}`
  height.textContent = `Height: ${pokemonInfo.height}`
  spriteContainer.innerHTML = `<img id="sprite" src="${pokemonInfo.sprites.front_default}" alt="${pokemonInfo.name} font default"/>`
  hp.textContent = pokemonInfo.stats[0].base_stat;
  attack.textContent = pokemonInfo.stats[1].base_stat;
  defense.textContent = pokemonInfo.stats[2].base_stat;
  specialAttack.textContent = pokemonInfo.stats[3].base_stat;
  specialDefense.textContent = pokemonInfo.stats[4].base_stat;
  speed.textContent = pokemonInfo.stats[5].base_stat;

  types.innerHTML = pokemonInfo.types.map(({ type: { name } }) => `<span class="type ${name}">${name}</span>`).join('');
}

// const getPokemonInfos = (id) => {

//   const index = id - (id <= 1025 ? 1 : 8976);
//   if (pokemonLists[index]) {
//     console.log(pokemonLists[index]);
//   } else
//     alert('Pokémon not found');
// }

const handleSearch = async (e) => {
  e.preventDefault();
  const input = searchInput.value;
  if (!input) {
    return;
  }
  updateUI(await getPokemon(input.toLowerCase()));
}

searchButton.addEventListener('click', handleSearch);



