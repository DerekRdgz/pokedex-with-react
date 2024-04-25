// components/TeamList.js
const TeamList = ({ teams, onSelect, onRemove }) => (
    <div className='p-4 w-1/4'>
      {teams.map((team, index) => (
        <div
          key={index}
          onClick={() => onSelect(index)}
          className={`team p-4 border ${team.selected ? 'border-blue-500 bg-blue-100' : 'border-gray-300'} rounded-lg mb-4 cursor-pointer`}
        >
          <h3 className='text-xl font-bold mb-4'>{team.name}</h3>
          <ul>
            {team.pokemons.map((pokemon, pokeIndex) => (
              <li key={pokeIndex}>{pokemon.name}</li>
            ))}
          </ul>
        </div>
      ))}
      {teams.length > 1 && (
        <button onClick={onRemove} className="bg-red-500 hover:bg-red-400 text-white font-bold py-2 px-4 rounded my-2 ml-4">
          Remove Selected Team
        </button>
      )}
    </div>
  );
  