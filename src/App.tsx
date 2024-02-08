import "./App.css";
import Pokedex from "./components/Pokedex/Pokedex.jsx";
import Search from "./components/Search/Search";
import PokemonList from "./components/PokemonList/PokemonList.jsx";
import "./components/Pokedex/Pokedex.css";
function App() {
  return (
    <>
      <div className="pokedex-wrapper">
        <h1 id="pokedex-title">Pokedex</h1>
        <Search />
      </div>
      <PokemonList />
    </>
  );
}

export default App;
