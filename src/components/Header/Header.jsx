import styles from './Header.module.scss';
import pokemon from '../../assets/pokemon.svg';

function Header() {
  return <img className={styles.logo} src={pokemon} alt="Pokemon" />;
}

export default Header;
