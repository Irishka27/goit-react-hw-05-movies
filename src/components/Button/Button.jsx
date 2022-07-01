import PropTypes from 'prop-types';
import style from './Button.module.css';

export default function Button({ onLoadMore }) {
  return (
    <button className={style.button} type="button" onClick={() => onLoadMore()}>
      Load more
    </button>
  );
}

Button.propTypes = {
  onLoadMore: PropTypes.func.isRequired,
};