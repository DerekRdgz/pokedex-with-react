// hooks/usePokemonSearch.js
import { useState } from 'react';

const usePokemonSearch = () => {
  const [pokemonData, setPokemonData] = useState(null);

  const fetchPokemon = async (searchTerm) => {
    if (!searchTerm) return;

    try {
      const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${searchTerm.toLowerCase()}`);
      if (!response.ok) throw new Error('Pokemon not found');

      const data = await response.json();
      setPokemonData({
        name: data.name,
        image: data.sprites.other['official-artwork']['front_default'],
        stats: data.stats.map(stat => ({
          name: stat.stat.name,
          baseStat: stat.base_stat
        }))
      });
    } catch (error) {
      console.error(error);
      setPokemonData(null);
    }
  };

  return { pokemonData, fetchPokemon };
};
