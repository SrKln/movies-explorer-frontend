import React from 'react';
import { useLocation } from 'react-router-dom';
import './MoviesCard.css';
import { MINUTES_PER_HOUR } from '../../utils/constants';

function MoviesCard({ movie, testIsMovieSaved=null, saveMovie=null, deleteMovie }) {
  const location = useLocation();
  const isMovieSaved = (location.pathname === '/movies') ? testIsMovieSaved(movie) : '';
  const buttonClassName = `card__button ${isMovieSaved ? 'card__button_type_saved' : 'card__button_type_blank'}  button`
  const duration = `${movie.duration >= MINUTES_PER_HOUR ? (Math.floor(movie.duration / MINUTES_PER_HOUR) + 'ч') : ''} ${movie.duration % MINUTES_PER_HOUR + 'м'}`;

  const handleSaveButtonClick = () => {
    isMovieSaved ? deleteMovie(movie.movieId) : saveMovie(movie);
  }

  const handleDeleteButtonClick = () => {
    deleteMovie(movie.movieId);
  }

  return (
    <li className='card'>
      <a href={movie.trailerLink} className='card__link link' target="_blank" rel="noreferrer">
        <img className='card__img' src={movie.image} alt='Обложка фильма' />
      </a>
      <div className='card__content'>
        <h2 className='card__name'>{movie.nameRU}</h2>
        {(location.pathname === '/movies') && <button onClick={handleSaveButtonClick} className={buttonClassName} type='button' />}
        {(location.pathname === '/saved-movies') && <button onClick={handleDeleteButtonClick} className='card__button card__button_type_delete button ' type='button' />}
      </div>
      <p className='card__duration'>{duration}</p>
    </li>
  );
}

export default MoviesCard;
