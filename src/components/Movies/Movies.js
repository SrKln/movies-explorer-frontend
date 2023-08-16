import React from 'react';
import './Movies.css';
import SearchForm from '../SearchForm/SearchForm';
import MoviesCardList from '../MoviesCardList/MoviesCardList';
import Header from '../Header/Header';
import Footer from '../Footer/Footer';

function Movies(props) {


  return (
    <main className="movies">
      <Header loggedIn={props.loggedIn} />
      <SearchForm />
      <MoviesCardList cards={props.cards} />
      <Footer />
    </main>
  );
}

export default Movies;
