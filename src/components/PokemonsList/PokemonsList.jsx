import PokemonItem from '../PokemonItem/PokemonItem';
import styles from './PokemonsList.module.scss';

function PokemonsList({ pokemonInfo, setIsOpen, setActivePokemon }) {
  return (
    <>
      <ul className={styles.grid}>
        {pokemonInfo.map((pokemon) => (
          <PokemonItem pokemon={pokemon} key={pokemon.name} setIsOpen={setIsOpen} setActivePokemon={setActivePokemon} />
        ))}
      </ul>
    </>
  );
}

export default PokemonsList;
