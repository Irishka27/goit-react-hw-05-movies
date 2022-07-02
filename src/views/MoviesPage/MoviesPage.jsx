import { useState, useEffect } from 'react';
import {
  NavLink,
  useRouteMatch,
  useHistory,
  useLocation,
} from 'react-router-dom';

import apiService from '../../services/apiService';
import Status from '../../services/status';
import Loader from 'components/Loader';
import Button from 'components/Button';
import ErrorComponent from 'components/Error';
import noPhoto from '../../img/no_image.jpg';
import SearchBar from 'components/SearchBar';
import styles from './MoviesPage.module.css';

export default function MoviesPage() {
  const history = useHistory();
  const location = useLocation();
  const { url } = useRouteMatch();
  const [query, setQuery] = useState('');
  const [ , setTotalPage] = useState(0);
  const [page, setPage] = useState(1);
  const [movies, setMovies] = useState(null);
  const [error, setError] = useState(null);
  const [status, setStatus] = useState(Status.IDLE);
  
   useEffect(() => {
    if (location.search === '') {
      return;
    }

    const newSearch = new URLSearchParams(location.search).get('query');
    setQuery(newSearch, page);
  }, [location.search, page]);

  useEffect(() => {
    if (!query) return;
    setStatus(Status.PENDING);
    apiService
      .getMoviesByKeyWord(query, page)
      .then(({ results, total_pages }) => {
        if (results.length === 0) {
          setError(`No results to show for "${query}!"`);
          setStatus(Status.REJECTED);
          return;
        }

        setMovies(results);
        setTotalPage(total_pages);
        setStatus(Status.RESOLVED);
      })
      .catch(error => {
        console.log(error);
        setError(error.message);
        setStatus(Status.REJECTED);
      });
  }, [query, page]);

  const searchImages = newSearch => {
    if (query === newSearch) return;
    setQuery(newSearch);
    setMovies(null);
    setError(null);
    setStatus(Status.IDLE);
    history.push({ ...location, search: `query=${newSearch}&page=1` });
  };

  const onHandlePage = () => {
    setPage(page => page +1)
  }

  return (
    <>
      <SearchBar onHandleSubmit={searchImages} />

      {status === Status.PENDING && <Loader />}

      {status === Status.REJECTED && <ErrorComponent message={error} />}

      {status === Status.RESOLVED && (
        <>
          <ul className={styles.moviesList}>
            {movies.map(movie => (
              <li key={movie.id} className={styles.moviesItem}>
                <img
                  src={
                    movie.poster_path
                      ? `https://image.tmdb.org/t/p/w500/${movie.poster_path}`
                      : noPhoto
                  }
                  alt={movie.title}
                  width="320"
                  className={styles.poster}
                />
                <NavLink
                  to={{
                    pathname: `${url}/${movie.id}`,
                    state: { from: { location } },
                  }}
                  className={styles.link}
                >
                  <p className={styles.movieTitle}>{movie.title}</p>
                </NavLink>
              </li>
            ))}
          </ul>
          <Button onLoadMore={onHandlePage} />
        </>
      )}
    </>
  );
}
