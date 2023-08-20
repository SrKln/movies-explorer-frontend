import React from "react";
import "./MoviesCardList.css";
import MoviesCard from "../MoviesCard/MoviesCard";
import { useLocation } from 'react-router-dom';

function MoviesCardList(props) {
  let likeStatus = false;
  const location = useLocation();
  return (
    <section className="moviescardlist">
      <ul className="moviescardlist__list">
        {props.cards.map((card, index) => {
          if ((index === 5) || (index === 0)) {
            likeStatus = true;
          } else { likeStatus = false; }
          return <MoviesCard key={index} card={card} likeStatus={likeStatus} />
        }

        )}
      </ul>

      {(location.pathname === '/movies') && <button
        className='moviescardlist__add-cards moviescardlist__add-cards_activ button'
        type='button'
      >
        Ещё
      </button>
      }
      {(location.pathname === '/saved-movies') && <button
        className='moviescardlist__add-cards button'
        type='button'
      >
        Ещё
      </button>}
    </section>
  );
}

export default MoviesCardList;
