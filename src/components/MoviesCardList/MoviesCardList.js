import React, { useEffect, useState } from "react";
import "./MoviesCardList.css";
import MoviesCard from "../MoviesCard/MoviesCard";
import { ADD_MOVIES } from "../../utils/constants";

function MoviesCardList({ movies, ...props }) {
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

  useEffect(() => {
    if (movies?.length) {
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
  }, [movies])



  useEffect(() => {
    if (movies?.length > 0) {
      let number;
      if (movies.length > numberDisplayedMovies) {
        number = numberDisplayedMovies;
        setNumberDisplayedMovies(number);
        setIsAddCardsActive(true);
      } else {
        number = movies.length;
        setIsAddCardsActive(false);
      }
      setDisplayedMovies(movies.slice(0, numberDisplayedMovies));
    }
  }, [movies, numberDisplayedMovies]);

  function handleAddCardClick() {
    const addNumber = getNumberDisplayedMovies(2);
    if (movies.length > (numberDisplayedMovies + addNumber)) {
      setNumberDisplayedMovies(prev => (prev + addNumber));
      setIsAddCardsActive(true);
    } else {
      setNumberDisplayedMovies(movies.length);
      setIsAddCardsActive(false);
    }
  }


  return (
    <section className="moviescardlist">
      {isFound ?
        <ul className="moviescardlist__list">
          {displayedMovies.map((movie) => <MoviesCard key={movie.movieId} movie={movie} {...props} />)}
        </ul>
        :
        <p className='moviescardlist__not-found'>Ничего не найдено</p>
      }

      {isAddCardsActive &&
        <button onClick={handleAddCardClick} className='moviescardlist__add-cards button' type='button'>
          Ещё
        </button>
      }
    </section>
  );
}

export default MoviesCardList;
