import logo from './logo.svg';
import './App.css';
import { useEffect, useState } from 'react';
import Card from './components/Card.js';

const App = () => {
  const [allPokemon, setAllPokemon] = useState([])
  const [loadMore, setLoadMore] = useState('https://pokeapi.co/api/v2/pokemon/?limit=20');
  const menuItems = ["Lowest Number (first)",
  "Highest Number (first)",
  "A-Z",
  "Z-A"];

  const [clickedDropdown, setClickDropdown] = useState(false);
  const [sort, setSort] = useState(menuItems[0]);

  console.log(allPokemon);
  function createPokemonObject(result, spec){
    
    result.forEach( async (pokemon) => {
      if (spec === true){ //this check and assignment is pretty ugly but I want to avoid issues right now
        pokemon = pokemon.pokemon; 
      }
      console.log(pokemon);
      const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemon.name}`)
      const data = await res.json();
      await setAllPokemon(currentList => [...currentList, data]);
    })
  }

  const searchPokemon = async (entry) => {
    setAllPokemon([]);
    if(!Number.isInteger(entry)){
      return;
    }

    const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${entry}`);
    const data = await res.json();
    console.log(data);
    setAllPokemon([data]);
    console.log("this is so called all pokemon" + allPokemon);
  }

  const getRandomPokemon = async () => {
    setAllPokemon([]);
    let min = Math.ceil(1); //bulbasaur
    let max = Math.floor(899); //898 pokemon in the national pokedex
    let pokedexEntry = Math.floor(Math.random() * (max - min) + min);
    await searchPokemon(pokedexEntry);
  }

  const getAllPokemon = async () => {
    setLoadMore(loadMore);
    console.log(loadMore);
    let res = await fetch(loadMore);
    let data = await res.json();
    console.log(data);
    setLoadMore(data.next); 
    await createPokemonObject(data.results);   
    console.log(allPokemon); 
  }

  const getPokemonByType = async (pokeType) =>{

    if(!Number.isInteger(pokeType) && !(typeof pokeType === 'string')){
      return;
    }
    setAllPokemon([]);
    let entry = pokeType.toLowerCase();
    const res = await fetch(`https://pokeapi.co/api/v2/type/${entry}`);
    const data = await res.json();
    console.log(data.pokemon);
    createPokemonObject(data.pokemon, true);
  }

  const getPokemonByAbility = async (ability) =>{
    setAllPokemon([]);
    if(!Number.isInteger(ability) && !(typeof ability === 'string')){
      return;
    }
    if(typeof ability === 'string'){
      ability = ability.toLowerCase();
    }
    const res = await fetch(`https://pokeapi.co/api/v2/ability/${ability}`);
    const data = await res.json();
    console.log(data.pokemon);
    createPokemonObject(data.pokemon, true);
  }

  function SortArray(x, y){
    if (x.name < y.name) {return -1;}
    if (x.name > y.name) {return 1;}
    return 0;
  }

  const sortPokemon = (sortType) => {
    if((sortType == menuItems[0] && sort != menuItems[0]) || (sortType == menuItems[1]) && sort != menuItems[1]){
      setAllPokemon(allPokemon.reverse());
    }
    else if(sortType == menuItems[2]){
      setAllPokemon(allPokemon.sort(SortArray));
    }
  }

  useEffect(() => {
    getPokemonByType("fire");
  }, []);

  useEffect(() =>{

  }, [sort]);

  return (
    <div className="App">
      <div className="header-home">
            <div class="search-bar flex">
                <div class="search">
                        <h1>Name or Number</h1>
                        <div id="search-field">
                            <input type="text"/>
                            <button></button>
                            <p>Use the Advanced Search to explore Pokemon by type, weakness, Ability, and more!</p>
                        </div>
                </div>
                <div class="search-info">
                        <p>Search for a Pokemon by name or using its National Pokedex number</p>
                </div>
            </div>
      </div>
      <div className="flex" idName="surprise">
        <button>Surprise Me!</button>
      </div>
      
      <div className="dropdown">
        <ul>
          <li>Sort results by...</li>
            {menuItems.map((item,index) =>{
              return(
                <li onClick={() => setSort(item)} key={index}>
                  {item}</li>   
                  )
                })}
        </ul>
      </div>
        <div className="card-container">
          {allPokemon.map((pokeKey) =>{
            console.log(pokeKey)
            return(
              <Card props={pokeKey} />
            );
          })}
        </div>
      
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;
