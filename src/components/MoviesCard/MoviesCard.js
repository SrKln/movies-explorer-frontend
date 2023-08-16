import React from 'react';
import { useLocation } from 'react-router-dom';
import './MoviesCard.css';
import Movie from '../../images/pic__COLOR_pic.png';

function MoviesCard({ likeStatus }) {
  const location = useLocation();
  const buttonClassName = `card__button ${likeStatus ? 'card__button_type_saved' : 'card__button_type_blank'}  button`

  return (
    <li className='card'>
      <a href="https://www.youtube.com/" className='card__link link' target="_blank" rel="noreferrer">
        <img className='card__img' src={Movie} alt='Обложка фильма' />
      </a>
      <div className='card__content'>
        <h2 className='card__name'>33 слова о дизайне</h2>
        {(location.pathname === '/movies') && <button className={buttonClassName} type='button'></button>
        }
        {(location.pathname === '/saved-movies') && <button className='card__button card__button_type_delete ' type='button'></button>}
      </div>
      <p className='card__duration'>1ч 42м</p>
    </li>
  );
}

export default MoviesCard;
