import {Audio} from 'react-loader-spinner';
import styles from './Loader.module.css';

export default function Loader() {
  return (
    <Audio
      className={styles.loader}
      color="#fff"
      height={80}
      width={80}
      timeout={4000}
    />
  );
}
