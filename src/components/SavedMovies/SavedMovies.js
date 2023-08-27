import React, { useEffect, useState } from "react";
import "./SavedMovies.css";
import SearchForm from "../SearchForm/SearchForm";
import MoviesCardList from "../MoviesCardList/MoviesCardList";
import Header from "../Header/Header";
import Footer from "../Footer/Footer";
import Preloader from "../Preloader/Preloader";
import { SHORT_MOVIE_DURATION } from "../../utils/constants";

function SavedMovies({ loggedIn, savedMovies, ...props }) {
  const [filteredMovies, setFilteredMovies] = useState([]);
  const [foundMovies, setFoundMovies] = useState([]);
  const [isPreloaderActive, setIsPreloaderActive] = useState(false);
  const [requestText, setRequestText] = useState('');
  const [isShortMovies, setIsShortMovies] = useState(false);
  const [isFound, setIsFound] = useState(true);

  const [isDisabled, setIsDisabled] = useState(false);

  const filterShortMovies = (searchResult) => {
    return searchResult.filter(movie => movie.duration <= SHORT_MOVIE_DURATION);
  }

  const findMovies = (movies, request, isToggled) => {
    const searchResult = movies.filter((movie) => (movie.nameRU.toLowerCase().includes(request.trim().toLowerCase())));
    setFoundMovies(searchResult);
    if (isToggled) return filterShortMovies(searchResult);
    return searchResult;
  };

  const handleSearch = (request, isToggled) => {
    setIsPreloaderActive(true);
    setRequestText(request);
    setIsShortMovies(isToggled);
    const movies = findMovies(savedMovies, request, isToggled);
    if (movies.length === 0) setIsFound(false);
    else {
      setFilteredMovies(movies);
      setIsFound(true);
    }
    setIsPreloaderActive(false);
    setIsDisabled(false);
  }

  useEffect(() => {
    if (isShortMovies) {
      setFilteredMovies(filterShortMovies(foundMovies));
    } else {
      setFilteredMovies(foundMovies);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isShortMovies])

  useEffect(() => {
    setFilteredMovies(findMovies(savedMovies, requestText, isShortMovies))
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [savedMovies])

  return (
    <>
      <Header loggedIn={loggedIn} />
      <main className="savedmovies">
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
          <MoviesCardList {...props}
            movies={filteredMovies}
            isFound={isFound} />
        }
      </main>
      <Footer />
    </>
  );
}

export default SavedMovies;
