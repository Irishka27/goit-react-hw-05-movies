import PropTypes from 'prop-types';
import errorImage from '../../img/no_results_found.png';
import style from'./Error.module.css';

export default function ErrorComponent({ message }) {
  return (
    <div role="alert" className={style.wrapper}>
      <img src={errorImage} width="400" alt="no results found" />
      <p text={message} className={style.text}>
        {message}
      </p>
    </div>
  );
}

ErrorComponent.propTypes = {
  message: PropTypes.string,
};
