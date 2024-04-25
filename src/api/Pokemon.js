const getPokemon = async (num) => {
    let url = 'https://pokeapi.co/api/v2/pokemon/' + num.toString();
    let res = await fetch(url);
    let pokemon = await res.json();
  
    let pokemonName = pokemon['name'];
    let pokemonType = pokemon['types'];
    let pokemonImg = pokemon['sprites']['other']['official-artwork']['front_default'];
  
    res = await fetch(pokemon['species']['url']);
    let pokemonDesc = await res.json();
    pokemonDesc = pokemonDesc['flavor_text_entries'][9]['flavor_text'];
  
    return {
      id: num,
      name: pokemonName,
      img: pokemonImg,
      types: pokemonType,
      desc: pokemonDesc,
    };
  };
  
  export const fetchAllPokemon = async (pokemonCount) => {
    let newPokedex = {};
    for (let i = 1; i <= pokemonCount; i++) {
      newPokedex[i] = await getPokemon(i);
    }
    return newPokedex;
  };
  