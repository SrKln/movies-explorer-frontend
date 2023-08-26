import React, { useEffect, useState } from 'react';
import './Movies.css';
import SearchForm from '../SearchForm/SearchForm';
import MoviesCardList from '../MoviesCardList/MoviesCardList';
import Header from '../Header/Header';
import Footer from '../Footer/Footer';
import Preloader from '../Preloader/Preloader';
import { BASE_URL_MOVIE, SHORT_MOVIE_DURATION } from '../../utils/constants';
import * as moviesApi from '../../utils/api/MoviesApi';

function Movies({ loggedIn, isFirstTimeRequest, setIsFirstTimeRequest, allMovies, setAllMovies, ...props }) {
  const [filteredMovies, setFilteredMovies] = useState([]);
  const [isPreloaderActive, setIsPreloaderActive] = useState(false);

  useEffect(() => {
    if (localStorage.getItem('movies') && localStorage.getItem('request')) {
      setIsFirstTimeRequest(false);
      const movies = JSON.parse(localStorage.getItem('movies'));
      setAllMovies(movies);
      const request = localStorage.getItem('request');
      const isToggled = JSON.parse(localStorage.getItem('switch'));
      setFilteredMovies(findMovies(movies, request, isToggled));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const filterShortMovies = (searchResult) => {
    return searchResult.filter(movie => movie.duration <= SHORT_MOVIE_DURATION);
  }

  const findMovies = (movies, request, isToggled) => {
    const searchResult = movies.filter((movie) => (movie.nameRU.toLowerCase().includes(request.toLowerCase())));

    localStorage.setItem('foundMovies', JSON.stringify(searchResult));
    localStorage.setItem('request', request);
    localStorage.setItem('switch', isToggled);

    if (isToggled) return filterShortMovies(searchResult);
    return searchResult;
  };

  const convertAllMovies = (movies) => {
    return movies.map(movie => {
      return Object.assign({
        nameRU: movie.nameRU,
        nameEN: movie.nameEN,
        image: `${BASE_URL_MOVIE + movie.image.url}`,
        duration: movie.duration,
        trailerLink: movie.trailerLink,
        description: movie.description,
        country: movie.country,
        movieId: movie.id,
        thumbnail: `${BASE_URL_MOVIE + movie.image.formats.thumbnail.url}`,
        director: movie.director,
        year: movie.year,
      });
    });
  };

  const handleSearch = (request, isToggled) => {
    setIsPreloaderActive(true);
    if (isFirstTimeRequest) {
      moviesApi.findAllMovies()
        .then((movies) => {
          const convertedMovies = convertAllMovies(movies);
          setAllMovies(convertedMovies);
          localStorage.setItem('movies', JSON.stringify(convertedMovies));
          setFilteredMovies(findMovies(allMovies, request, isToggled));
          setIsFirstTimeRequest(false);
        })
        .catch(err => alert(err))
        .finally(() => setIsPreloaderActive(false));
    } else {
      setFilteredMovies(findMovies(allMovies, request, isToggled));
      setIsPreloaderActive(false);
    }
  }

  return (
    <>
      <Header loggedIn={loggedIn} />
      <main className="movies">
        <SearchForm onSearch={handleSearch} />
        {isPreloaderActive ?
          <Preloader />
          :
          <MoviesCardList {...props} movies={filteredMovies} />
        }
      </main>
      <Footer />
    </>
  );
}

export default Movies;
