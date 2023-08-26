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
  const [isPreloaderActive, setIsPreloaderActive] = useState(false);

  useEffect(() => {
    setFilteredMovies(savedMovies);
  }, [savedMovies])

  const filterShortMovies = (searchResult) => {
    return searchResult.filter(movie => movie.duration <= SHORT_MOVIE_DURATION);
  }

  const findMovies = (movies, request, isToggled) => {
    const searchResult = movies.filter((movie) => (movie.nameRU.toLowerCase().includes(request.toLowerCase())));

    if (isToggled) return filterShortMovies(searchResult);
    return searchResult;
  };

  const handleSearch = (request, isToggled) => {
    setIsPreloaderActive(true);
    setFilteredMovies(findMovies(savedMovies, request, isToggled));
    setIsPreloaderActive(false);
  }

  return (
    <>
      <Header loggedIn={loggedIn} />
      <main className="savedmovies">
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

export default SavedMovies;
