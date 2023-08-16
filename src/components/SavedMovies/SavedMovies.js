import React from "react";
import "./SavedMovies.css";
import SearchForm from "../SearchForm/SearchForm";
import MoviesCardList from "../MoviesCardList/MoviesCardList";
import Header from "../Header/Header";
import Footer from "../Footer/Footer";

function SavedMovies(props) {
  return (
    <main className="savedmovies">
      <Header loggedIn={props.loggedIn} />
      <SearchForm />
      <MoviesCardList cards={props.cards} />
      <Footer />
    </main>
  );
}

export default SavedMovies;
