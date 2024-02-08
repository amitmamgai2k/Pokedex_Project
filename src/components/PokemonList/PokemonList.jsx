import { useEffect, useState } from "react";
import axios from "axios";
import './PokemonList.css';
import Pokemon from "../Pokemon/Pokemon.jsx";
function PokemonList() {
  const [pokemonList,setPokemonList] = useState([]);
  const[isloading,setIsLoading] = useState(true);
  const[pokedexurl,setPokedexUrl] = useState('https://pokeapi.co/api/v2/pokemon');
  const [nexturl,setNextUrl] = useState('');
  const[prevurl,setPrevUrl] = useState('');
   
  async function downloadPokemons(){
    setIsLoading(true);
    const response = await axios.get(pokedexurl);
    const pokemonResults = response.data.results;

    console.log(response.data);
    setNextUrl(response.data.next);
    setPrevUrl(response.data.previous)
    const pokemonResultPromise = pokemonResults.map((pokemon)=>axios.get(pokemon.url) )
    
    const pokemonData = await axios.all(pokemonResultPromise);
    console.log(pokemonData);
   const res = pokemonData.map((pokedata)=>{
      const pokemon = pokedata.data;
      return {
           id:pokemon.id,
           name:pokemon.name,
           image:(pokemon.sprites.other) ? pokemon.sprites.other.dream_world.front_default :pokemon.sprites.front-shiny,
           types:pokemon.types}
    });
   console.log(res);
   setPokemonList(res);
   setIsLoading(false);
  }
  useEffect(() => {
    downloadPokemons()
  },[pokedexurl]);

  return (
    <>
   <div className="pokemon-list-wrapper">
 
   <div className="pokemon-wrapper">
   {(isloading) ? 'Loading...':
    pokemonList.map((p)=><Pokemon name= {p.name} image={p.image} key={p.id}/>)}
   </div>
   <div className="controls">
    <button disabled={prevurl==null} onClick={()=>setPokedexUrl(prevurl)}>Prev</button>
    <button disabled={nexturl==null} onClick={()=>setPokedexUrl(nexturl)}>Next</button>
   </div>
  </div>
 
    </>
  );
}
export default PokemonList;
