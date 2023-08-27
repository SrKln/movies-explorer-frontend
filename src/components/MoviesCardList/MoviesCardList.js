import React from "react";
import "./MoviesCardList.css";
import MoviesCard from "../MoviesCard/MoviesCard";
import { useLocation } from "react-router-dom";
import { NOT_SEARCHED_ERROR } from "../../utils/constants";

function MoviesCardList({ movies, isFound, handleAddCardClick, isAddCardsActive, ...props }) {
  const location = useLocation();

  return (
    <section className="moviescardlist">
      {isFound ?
        <ul className="moviescardlist__list">
          {movies.map((movie) => <MoviesCard key={movie.movieId} movie={movie} {...props} />)}
        </ul>
        :
        <p className='moviescardlist__not-found'>{NOT_SEARCHED_ERROR}</p>
      }

      {(location.pathname === '/movies') &&
        isAddCardsActive &&
        <button onClick={handleAddCardClick} className='moviescardlist__add-cards button' type='button'>
          Ещё
        </button>
      }
    </section>
  );
}

export default MoviesCardList;
