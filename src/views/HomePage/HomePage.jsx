import { useState, useEffect } from 'react';
import { Link, useLocation, useHistory } from 'react-router-dom';
import apiService from 'services/apiService';
import Status from 'services/status';
import Loader from 'components/Loader';
import ErrorComponent from 'components/Error';
import noPhoto from '../../img/no_image.jpg';
import styles from './HomePage.module.css';
import Button from 'components/Button';

export default function HomePage() {
  const history = useHistory();
  const location = useLocation();
  const [movies, setMovies] = useState(null);
  const [page, setPage] = useState(1);
  const [totalPage, setTotalPage] = useState(0);
  const [error, setError] = useState(null);
  const [status, setStatus] = useState(Status.IDLE);

   useEffect(() => {
    setStatus(Status.PENDING);
    apiService
      .getPopularMovies(page)
      .then(({ results, total_pages }) => {
        setMovies(results);
        setTotalPage(total_pages);
        setStatus(Status.RESOLVED);
        console.log(page);
      })
      .catch(error => {
        console.log(error);
        setError('Something went wrong. Please try again.');
        setStatus(Status.REJECTED);
      });
  }, [page]);

   const onHandlePage = () => {
    setPage(page => page +1)
  }

  return (
    <main className={styles.main}>
      <h1 className={styles.title}>Trending today</h1>

      {status === Status.PENDING && <Loader />}

      {status === Status.REJECTED && <ErrorComponent message={error.message} />}

      {status === Status.RESOLVED && (
        <>
          <ul className={styles.moviesList}>
            {movies.map(movie => (
              <li key={movie.id} className={styles.moviesItem}>
                <Link
                  to={{
                    pathname: `movies/${movie.id}`,
                    state: { from: location },
                  }}
                  className={styles.link}
                >
                  <img
                    src={
                      movie.poster_path
                        ? `https://image.tmdb.org/t/p/w500/${movie.poster_path}`
                        : noPhoto
                    }
                    alt={movie.title}
                    className={styles.poster}
                  />
                </Link>
                <span className={styles.movieTitle}>{movie.title}</span>
              </li>
            ))}
          </ul>
      <Button onLoadMore={onHandlePage} />
        </>
      )}
    </main>
  );
}
