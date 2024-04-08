import './App.css';



function App() {
  
  //POKEDEX INFORMATION----------------------------------------------------------------------
  const pokemonCount = 151;
  var pokedex = {};

  async function getPokemon(num) {
    let url = 'https://pokeapi.co/api/v2/pokemon/' + num.toString();

    let res = await fetch(url);
    let pokemon = await res.json();
    console.log(pokemon)

    let pokemonName = pokemon['name'];
    let pokemonType = pokemon['types'];
    let pokemonImg = pokemon['sprites']['other']['official-artwork']['front_default'];

    res = await fetch(pokemon['species']['url']);
    let pokemonDesc = await res.json();

    pokemonDesc = pokemonDesc['flavor_text_entries'][9]['flavor_text'];

    pokedex[num] = {
      name: pokemonName,
      img: pokemonImg,
      types: pokemonType,
      desc: pokemonDesc,
    };
  }
  //FRESH WINDOW ON LOAD FUNCTION -----------------------------------------------------------------------------------
  window.onload = async function () {
    for (let i = 1; i <= pokemonCount; i++) {
      await getPokemon(i);

      let pokemonListItem = document.createElement("li");
      pokemonListItem.id = i;
      pokemonListItem.classList.add("pokemon-item");

      let pokemonName = document.createElement("span")
      pokemonName.innerText = pokedex[i]["name"].toUpperCase()
      pokemonName.className = "px-1 font-bold"

      let pokemonImg = document.createElement("img")
      pokemonImg.src = pokedex[i]["img"]
      pokemonImg.classList.add("pokemon-image");
      pokemonImg.className = "backdrop-brightness-90"

      let pokemonId = document.createElement("p")
      pokemonId.innerText = "Pokemon N°" + i;
      pokemonId.className = "mb-2 p-2 border-b border-gray-200 text-slate-400"

      let pokemonTypesContainer = document.createElement("div");
      pokemonTypesContainer.className = "flex flex-wrap";

      for (let j = 0; j < pokedex[i]["types"].length; j++) {
        let pokemonType = document.createElement("span");
        pokemonType.innerText = pokedex[i]["types"][j]["type"]["name"];
        pokemonType.className = "rounded bg-gray-200 mr-1 mb-1 p-1 text-xs font-semibold first-letter:uppercase"; 
        pokemonTypesContainer.appendChild(pokemonType); 
      }

      pokemonListItem.append(pokemonImg);
      pokemonListItem.append(pokemonId);
      pokemonListItem.append(pokemonName);
      pokemonListItem.append(pokemonTypesContainer);

      document.getElementById("pokemon-list").append(pokemonListItem)
    }
    console.log(pokedex);
  };


  

  return (
    <>
      <head>
        <title>Pokedex</title>
      </head>

      <body>
        
        <div className="bg-gray-800 text-white py-4 px-[800px] font-semibold">
          <a className="text-2xl px-4 py-2 hover:bg-gray-700 mx-auto" href="#home">
            Home
          </a>
          <a className="text-2xl px-4 py-2 hover:bg-gray-700 mx-auto" href="#news">
            Team
          </a>
          <a className="text-2xl px-4 py-2 hover:bg-gray-700 mx-auto" href="#contact">
            Profile
          </a>
          <a className="text-2xl px-4 py-2 hover:bg-gray-700 mx-auto" href="#about">
            About
          </a>
        </div>
        <div id="container pokedex">
          <section className='text-6xl text-center py-3 font-semibold'>Pokédex</section>
          <section className='text-center font-semibold text-3xl'>Filter Section</section>

          <section class="Resultados">
            <ul id="pokemon-list" className='py-10 grid grid-cols-4 gap-5 w-[1000px] mx-auto'>
            </ul>
          </section>

        </div>
      </body>
    </>
  );
}

export default App;
