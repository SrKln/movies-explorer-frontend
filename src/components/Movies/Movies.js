import React, { useEffect, useState } from 'react';
import './Movies.css';
import SearchForm from '../SearchForm/SearchForm';
import MoviesCardList from '../MoviesCardList/MoviesCardList';
import Header from '../Header/Header';
import Footer from '../Footer/Footer';
import Preloader from '../Preloader/Preloader';
import { ADD_MOVIES, BASE_URL_MOVIE, SHORT_MOVIE_DURATION } from '../../utils/constants';
import * as moviesApi from '../../utils/api/MoviesApi';

function Movies({ loggedIn, isFirstTimeRequest, setIsFirstTimeRequest, allMovies, setAllMovies, ...props }) {
  const [filteredMovies, setFilteredMovies] = useState([]);
  const [foundMovies, setFoundMovies] = useState([]);
  const [isPreloaderActive, setIsPreloaderActive] = useState(false);
  const [requestText, setRequestText] = useState((localStorage.getItem('request') ? localStorage.getItem('request') : ''));
  const [isShortMovies, setIsShortMovies] = useState(localStorage.getItem('switch') ? JSON.parse(localStorage.getItem('switch')) : false);

  const [isDisabled, setIsDisabled] = useState(false);

  const [isAddCardsActive, setIsAddCardsActive] = useState(false);
  const [isFound, setIsFound] = useState(true);
  const [currentWidth, setCurrentWidth] = useState(window.innerWidth);
  const [displayedMovies, setDisplayedMovies] = useState([]);

  const getNumberDisplayedMovies = (key) => {
    if (currentWidth >= ADD_MOVIES.desktop[0]) return ADD_MOVIES.desktop[key];
    else if (currentWidth >= ADD_MOVIES.miniDesktop[0]) return ADD_MOVIES.miniDesktop[key];
    else if (currentWidth >= ADD_MOVIES.laptop[0]) return ADD_MOVIES.laptop[key];
    else return ADD_MOVIES.mobile[key];
  }

  const [numberDisplayedMovies, setNumberDisplayedMovies] = useState(getNumberDisplayedMovies(1));

  const filterShortMovies = (searchResult) => {
    return searchResult.filter(movie => movie.duration <= SHORT_MOVIE_DURATION);
  }

  const findMovies = (movies, request, isToggled) => {
    const searchResult = movies.filter((movie) => (movie.nameRU.toLowerCase().includes(request.trim().toLowerCase())));

    setFoundMovies(searchResult);
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
    setRequestText(request);
    setIsShortMovies(isToggled);
    setNumberDisplayedMovies(getNumberDisplayedMovies(1));
    setIsAddCardsActive(false);

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
        .finally(() => {
          setIsPreloaderActive(false);
          setIsDisabled(false);
        });
    } else {
      setFilteredMovies(findMovies(allMovies, request, isToggled));
      setIsPreloaderActive(false);
      setIsDisabled(false);
    }
  }

  function handleAddCardClick() {
    const addNumber = getNumberDisplayedMovies(2);
    if (filteredMovies.length > (numberDisplayedMovies + addNumber)) {
      setNumberDisplayedMovies(prev => (prev + addNumber));
      setIsAddCardsActive(true);
    } else {
      setNumberDisplayedMovies(filteredMovies.length);
      setIsAddCardsActive(false);
    }
  }

  useEffect(() => {
    if (isShortMovies) {
      setFilteredMovies(filterShortMovies(foundMovies));
      localStorage.setItem('switch', isShortMovies);
    } else {
      setFilteredMovies(foundMovies);
      localStorage.setItem('switch', isShortMovies);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isShortMovies])

  useEffect(() => {
    if (localStorage.getItem('movies') && localStorage.getItem('request')) {
      setIsFirstTimeRequest(false);
      setIsFound(true);
      const movies = JSON.parse(localStorage.getItem('movies'));
      setAllMovies(movies);
      setFilteredMovies(findMovies(movies, requestText, isShortMovies));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useEffect(() => {
    if (filteredMovies?.length > 0) {
      let number;
      if (filteredMovies.length > numberDisplayedMovies) {
        number = numberDisplayedMovies;
        setNumberDisplayedMovies(number);
        setIsAddCardsActive(true);
      } else {
        number = filteredMovies.length;
        setIsAddCardsActive(false);
      }
      setDisplayedMovies(filteredMovies.slice(0, numberDisplayedMovies));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filteredMovies, numberDisplayedMovies]);

  useEffect(() => {
    if (filteredMovies?.length) {
      setIsFound(true);

      const handleResize = () => {
        const timeout = setTimeout(() => {
          clearTimeout(timeout);
          setCurrentWidth(window.innerWidth);
        }, 500);
      };

      window.addEventListener("resize", handleResize);
      return () => {
        window.removeEventListener("resize", handleResize);
      };
    } else {
      setIsFound(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filteredMovies])

  return (
    <>
      <Header loggedIn={loggedIn} />
      <main className="movies">
        <SearchForm
          onSearch={handleSearch}
          requestText={requestText}
          isShortMovies={isShortMovies}
          setIsShortMovies={setIsShortMovies}
          isDisabled={isDisabled}
          setIsDisabled={setIsDisabled} />
        {isPreloaderActive ?
          <Preloader />
          :
          (!isFirstTimeRequest &&
            <MoviesCardList {...props}
              movies={displayedMovies}
              handleAddCardClick={handleAddCardClick}
              isFound={isFound}
              isAddCardsActive={isAddCardsActive} />
          )
        }
      </main>
      <Footer />
    </>
  );
}

export default Movies;
