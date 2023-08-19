import React from 'react';
import './Movies.css';
import SearchForm from '../SearchForm/SearchForm';
import MoviesCardList from '../MoviesCardList/MoviesCardList';
import Header from '../Header/Header';
import Footer from '../Footer/Footer';

function Movies(props) {


  return (
    <>
      <Header loggedIn={props.loggedIn} />
      <main className="movies">
        <SearchForm />
        <MoviesCardList cards={props.cards} />
      </main>
      <Footer />
    </>

  );
}

export default Movies;
