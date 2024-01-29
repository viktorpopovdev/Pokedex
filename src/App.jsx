import { useState, useEffect } from 'react';
import PokemonsList from './components/PokemonsList/PokemonsList';
import PokemonDetails from './components/PokemonDetails/PokemonDetails';
import Header from './components/Header/Header';
import { getPokemons, getPokemonInfo, getMorePokemons, getPokemonDetailsById } from './services/pokemons';
import { Button } from '@mantine/core';
import ChevronUp from './assets/chevron-up.svg';
import styles from './App.module.scss';

function App() {
  const [pokemons, setPokemons] = useState();
  const [isLoading, setIsLoading] = useState(true);
  const [nextUrl, setNextUrl] = useState();
  const [pokemonInfo, setPokemonInfo] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  const [activePokemon, setActivePokemon] = useState();
  const [pokemonDetails, setPokemonDetails] = useState();
  let disabledLoadMore;

  useEffect(() => {
    getPokemons().then((pokemons) => {
      setPokemons(pokemons);
      setIsLoading(false);
    });
  }, []);

  useEffect(() => {
    if (pokemons && pokemons.next) {
      pokemons.results.map((pokemon) =>
        getPokemonInfo(pokemon.name).then((pokemon) => setPokemonInfo((prev) => [...prev, pokemon])),
      );

      const pattern = /offset=(\d+)/;
      setNextUrl(pokemons.next.match(pattern)[1]);
    }
  }, [pokemons]);

  useEffect(() => {
    if (activePokemon) {
      getPokemonDetailsById(activePokemon).then((details) => setPokemonDetails(details));
    }
  }, [activePokemon]);

  function LoadingMoreInfo() {
    getMorePokemons(nextUrl).then((pokemons) => setPokemons((prev) => ({ ...prev, ...pokemons })));
  }

  if (!nextUrl) {
    disabledLoadMore = true;
  }

  return (
    <div className={styles.container}>
      <Header>Pokedex</Header>
      <div className={styles.content}>
        <div className={styles.pokemonInfo}>
          <PokemonsList
            pokemonInfo={pokemonInfo}
            setIsOpen={setIsOpen}
            setActivePokemon={setActivePokemon}
            isLoading={isLoading}
          />

          <Button
            classNames={{ root: styles.btnLoading }}
            disabled={disabledLoadMore}
            onClick={() => LoadingMoreInfo()}
          >
            Load More
          </Button>

          <Button
            classNames={{ root: styles.btnToTopOfPage }}
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          >
            <img src={ChevronUp} />
          </Button>
        </div>
        <div className={styles.details}>
          {isOpen && <PokemonDetails pokemonDetails={pokemonDetails} setIsOpen={setIsOpen} />}
        </div>
      </div>
    </div>
  );
}

export default App;
