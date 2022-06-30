import { Audio } from  'react-loader-spinner';
import s from './Loader.module.css';

export default function Loader() {
  return (
    <Audio
      className={s.loader}
    // 
      color="#fff"
      height={80}
      width={80}
    //   timeout={4000}
    />
  );
}