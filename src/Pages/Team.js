//Team.js

import React, { useState, useEffect } from 'react';
import Navbar from '../components/Navbar';
import { db, auth } from '../components/firebase_config'; // Assuming firebase_config.js is in the same directory
import { doc, setDoc, getDoc } from "firebase/firestore";

function Team() {
  const [isCreatingTeam, setIsCreatingTeam] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [pokemonData, setPokemonData] = useState(null);
  const [teams, setTeams] = useState([{ name: 'Team 1', pokemons: [] }]);
  const [selectedTeamIndex, setSelectedTeamIndex] = useState(0);
  const [showTeamDetails, setShowTeamDetails] = useState(false);
  const [selectedPokemonIndex, setSelectedPokemonIndex] = useState(null);
  const [isRenaming, setIsRenaming] = useState(false);
  const [newTeamName, setNewTeamName] = useState('');
  const [isLoadingTeams, setIsLoadingTeams] = useState(true);


  const fetchTeams = async (uid) => {
    setIsLoadingTeams(true);
    const userRef = doc(db, "users", uid);
    const docSnap = await getDoc(userRef);

    if (docSnap.exists() && docSnap.data().teams) {
      setTeams(docSnap.data().teams);
    } else {
      setTeams([]);
    }
    setIsLoadingTeams(false); 
  };


  useEffect(() => {
    if (auth.currentUser) {
      fetchTeams(auth.currentUser.uid);
    } else {
      setIsLoadingTeams(false); // Not loading if not logged in
    }
  }, []);




  const saveProfile = async () => {
    if (auth.currentUser) {
      try {
        const userRef = doc(db, "users", auth.currentUser.uid);
        await setDoc(userRef, { teams });
        alert('Profile saved successfully!');
      } catch (error) {
        console.error('Error saving profile:', error);
        alert('Failed to save profile.');
      }
    } else {
      alert('You must be logged in to save your profile.');
    }
  };

  const createNewTeam = () => {
    if (teams.length >= 10) {
      alert('No se pueden crear más de 10 equipos.');
      return;
    }
    setTeams([...teams, { name: `Team ${teams.length + 1}`, pokemons: [] }]);
  };

  const removeTeam = () => {
    if (teams.length > 1 && selectedTeamIndex !== null) {
      const updatedTeams = teams.filter((_, index) => index !== selectedTeamIndex);
      setTeams(updatedTeams);
      setSelectedTeamIndex(null);
      setShowTeamDetails(false); 
    } else {
      alert('You must have at least one team, or no team is selected for deletion.');
    }
  };

  const selectTeam = (index) => {
    setSelectedTeamIndex(index);
    setShowTeamDetails(false);
  };

  const displayTeamDetails = (index) => {
    setSelectedTeamIndex(index);
    setShowTeamDetails(true);
  };
  const addToTeam = () => {
    if (!pokemonData) {
      alert('No Pokémon selected, Please search for a Pokémon first.')
      return;
    }

    const currentTeam = teams[selectedTeamIndex].pokemons;
  
    if (currentTeam.some(pokemon => pokemon.name === pokemonData.name)) {
      alert('This Pokémon is already in your team.');
      return;
    }
  
    if (currentTeam.length >= 6) {
      alert('Six Pokémon in the Team already.');
      return;
    }
  
    const updatedTeams = [...teams];
    updatedTeams[selectedTeamIndex].pokemons.push(pokemonData);
    setTeams(updatedTeams);
  };

  const removePokemonFromTeam = () => {
    if (selectedPokemonIndex !== null) {
      const updatedTeams = [...teams];
      updatedTeams[selectedTeamIndex].pokemons.splice(selectedPokemonIndex, 1);
      setTeams(updatedTeams);
      setSelectedPokemonIndex(null);
    }
  };

  const startRenaming = () => {
    if (selectedTeamIndex !== null) {
      setNewTeamName(teams[selectedTeamIndex].name);
      setIsRenaming(true);
    } else {
      alert('Please select a team to rename.');
    }
  };
  
  const cancelRenaming = () => {
    setIsRenaming(false);
    setNewTeamName('');
  };
  
  const saveNewTeamName = () => {
    if (newTeamName.trim() === '') {
      alert('The team name cannot be empty.');
      return;
    }
    const updatedTeams = teams.map((team, index) => {
      if (index === selectedTeamIndex) {
        return { ...team, name: newTeamName };
      }
      return team;
    });
    setTeams(updatedTeams);
    setIsRenaming(false);
  };
  
  async function fetchPokemon() {
    if (!searchTerm) return;

    try {
      const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${searchTerm.toLowerCase()}`);
      if (!response.ok) throw new Error('Pokemon not found');
      
      const data = await response.json();

      let pokemonName = data['name'];
      let pokemonImg = data['sprites']['other']['official-artwork']['front_default'];
      let pokemonStats = data['stats'].map(statItem => ({
        name: statItem.stat.name,
        baseStat: statItem.base_stat
      }));

      setPokemonData({
        name: pokemonName,
        image: pokemonImg,
        stats: pokemonStats,
      });
    } catch (error) {
      console.error(error);
      setPokemonData(null);
    }
  }

  return (
    <>
      <Navbar />
      {isLoadingTeams ? (
        <div className="text-center py-3">Loading teams...</div>
      ) : (!isCreatingTeam && (teams.length === 1 && teams[0].pokemons.length === 0)) ? (
        <section className='text-6xl text-center py-3 font-semibold'>
          It looks like you don't have a team, create one!
          <div className='flex items-center justify-center'>
            <button
              onClick={() => setIsCreatingTeam(true)}
              className="text-4xl mt-5 bg-blue-500 hover:bg-blue-400 text-white font-bold py-8 px-10 border-b-4 border-blue-700 hover:border-blue-500 rounded"
            >
              CREATE A TEAM
            </button>
          </div>
        </section>
      ) : (
        <div className='flex'>
          <div className='p-4 w-1/4'>
            {teams.map((team, index) => (
              <div
                key={index}
                onDoubleClick={() => displayTeamDetails(index)}
                className={`team p-4 border ${selectedTeamIndex === index ? 'border-blue-500 bg-blue-100' : 'border-gray-300'} rounded-lg mb-4 cursor-pointer`}
                onClick={() => selectTeam(index)}
              >
                <h3 className='text-xl font-bold mb-4'>{team.name}</h3>
                <ul>
                  {team.pokemons.map((pokemon, pokeIndex) => (
                    <li key={pokeIndex}>{pokemon.name}</li>
                  ))}
                </ul>
              </div>
            ))}
            {teams.length < 10 && (
              <button
                onClick={createNewTeam}
                className="bg-blue-500 hover:bg-blue-400 text-white font-bold py-2 px-4 rounded my-2"
              >
                Create New Team
              </button>
            )}
            {selectedTeamIndex !== null && (
              <button
                onClick={startRenaming}
                className="bg-orange-500 hover:bg-orange-400 text-white font-bold py-2 ml-2 px-4 rounded my-2"
              >
                Rename Team
              </button>
            )}
            {isRenaming && (
              <div>
                <input
                  value={newTeamName}
                  onChange={(e) => setNewTeamName(e.target.value)}
                  className="border p-2 rounded"
                />
                <button
                  onClick={saveNewTeamName}
                  className="bg-green-500 hover:bg-green-400 text-white font-bold py-1 px-2 rounded ml-2"
                >
                  Save
                </button>
                <button
                  onClick={cancelRenaming}
                  className="bg-red-500 hover:bg-red-400 text-white font-bold py-1 px-2 rounded ml-2"
                >
                  Cancel
                </button>
              </div>
            )}
            {teams.length > 1 && (
              <button
                onClick={removeTeam}
                className="bg-red-500 hover:bg-red-400 text-white font-bold py-2 px-4 rounded my-2 ml-4"
              >
                Remove Selected Team
              </button>
            )}
          </div>
          <div className="team-creation-interface w-3/4">
            {showTeamDetails ? (
              <>
                <div className="mt-5 flex flex-wrap justify-center">
                  {teams[selectedTeamIndex].pokemons.map((pokemon, index) => (
                    <div
                      key={index}
                      onClick={() => setSelectedPokemonIndex(index)}
                      className={`hover:scale-110 transition pokemon-container ${selectedPokemonIndex === index ? 'selected border-4 border-red-700 rounded' : ''}`}
                    >
                      <img src={pokemon.image} alt={pokemon.name} className="scale-75" />
                      <p className='font-bold text-center'>{pokemon.name.toUpperCase()}</p>
                    </div>
                  ))}
                </div>
                <div className='flex justify-center mt-12 scale-110'>
                  <button
                    onClick={() => setShowTeamDetails(false)}
                    className="bg-yellow-500 hover:bg-yellow-400 text-white font-bold py-2 px-4 rounded mx-3"
                  >
                    Back to Search
                  </button>
                  <button
                    onClick={removePokemonFromTeam}
                    className="bg-red-500 hover:bg-red-400 text-white font-bold py-2 px-4 rounded mx-3"
                  >
                    Delete Pokémon 
                  </button>
                </div>
              </>
            ) : (
              <>
                <div className="mt-5 flex justify-center container items-center ml-40 mr-auto w-1/2 h-auto bg-gray-200 border-4 border-zinc-800/100 rounded-2xl">
                  {pokemonData ? (
                    <><img src={pokemonData.image} alt={pokemonData.name} className="max-w-full h-auto" />
                      {pokemonData.stats && (
                        <div className='pokemon-stats'>
                          <ul className='text-2xl font-semibold'>
                            {pokemonData.name.toUpperCase()}
                            {pokemonData.stats.map((stat, index) => (
                              <li key={index}>{`${stat.name.toUpperCase()}: ${stat.baseStat}`}</li>
                            ))}
                          </ul>
                        </div>
                      )}
                    </>
                  ) : (
                    <img src={"./no_pokemon_image.svg"} alt={"no_pokemon_image"} className='h-[700px] scale-75 opacity-10' />
                  )}
                </div>
                <div className='flex ml-[500px] mt-4 scale-125'>
                  <input
                    type="text"
                    placeholder="Search a Pokémon by name or ID..."
                    value={searchTerm}
                    onChange={e => setSearchTerm(e.target.value)}
                    className="mt-2 p-2 border rounded" />
                  <button
                    onClick={fetchPokemon}
                    className="bg-red-600 hover:bg-red-800 text-white font-bold py-1 px-4 ml-2 rounded"
                  >
                    Search
                  </button>
                  <button
                    onClick={addToTeam}
                    className="bg-blue-500 hover:bg-blue-400 text-white font-bold py-2 px-4 rounded mx-3"
                  >
                    Add to Team
                  </button>
                  <button
              onClick={saveProfile}
              className="bg-green-500 hover:bg-green-400 text-white font-bold py-2 px-4 rounded"
            >
              Save Profile
            </button>
                </div>
              </>
            )}
          </div>
        </div>
      )}
    </>
  );
}

export default Team;
