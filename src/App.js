import React, { useState, useEffect } from 'react';
import './App.css';
import Navbar from './Navbar';
import  { fetchAllPokemon } from './api/Pokemon';
 
function App() {
  const pokemonCount = 151;
  const [pokedex, setPokedex] = useState({});

  useEffect(() => {
    const loadPokedex = async () => {
      const pokemons = await fetchAllPokemon(pokemonCount);
      setPokedex(pokemons);
    };

    loadPokedex();
  }, []);

  return (
    <>
      <Navbar />
      <div id="container pokedex">
        <section className='text-6xl text-center py-3 font-semibold'>Pokédex</section>
        <section className='text-center font-semibold text-3xl'>Filter Section</section>
        <section className="Resultados">
          <ul id="pokemon-list" className='py-10 grid grid-cols-4 gap-5 w-[1000px] mx-auto'>
            {Object.values(pokedex).map(pokemon => (
              <li key={pokemon.id} className="pokemon-item hover:scale-110 transition">
                <img src={pokemon.img} className="pokemon-image backdrop-brightness-90" alt={pokemon.name} />
                <p className="mb-2 p-2 border-b border-gray-200 text-slate-400">Pokemon N°{pokemon.id}</p>
                <span className="px-1 font-bold">{pokemon.name.toUpperCase()}</span>
                <div className="flex flex-wrap">
                  {pokemon.types.map((type, index) => (
                    <span key={index} className="rounded bg-gray-200 mr-1 mb-1 p-1 text-xs font-semibold first-letter:uppercase">
                      {type.type.name}
                    </span>
                  ))}
                </div>
              </li>
            ))}
          </ul>
        </section>
      </div>
    </>
  );
}

export default App;
