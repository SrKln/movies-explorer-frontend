import './App.css';
import React from "react";
import { Route, Routes } from 'react-router-dom';
import Main from '../Main/Main';
import Movies from '../Movies/Movies';
import SavedMovies from '../SavedMovies/SavedMovies';
import Register from '../Register/Register';
import Login from '../Login/Login';
import Profile from '../Profile/Profile';
import PageNotFound from '../PageNotFound/PageNotFound';

function App() {
  const loggedIn = true;

  const CARDS = 8
  const CARDS_SAVE = 3;
  const cards = Array(CARDS).fill(null);
  const saveCards = Array(CARDS_SAVE).fill(null);

  return (
    <div className="app">
      <Routes>
        <Route path="/" element={<Main loggedIn={loggedIn} />} />
        <Route path="/movies"
          element={
            <Movies
              cards={cards}
              loggedIn={loggedIn}
            />
          }
        />
        <Route path="/saved-movies"
          element={
            <SavedMovies
              cards={saveCards}
              loggedIn={loggedIn}
            />
          }
        />
        <Route path="/signup" element={<Register />} />


        <Route path="/profile" element={<Profile loggedIn={loggedIn} />} />

        <Route path="/signin" element={<Login />} />

        <Route path="*" element={<PageNotFound />} />
      </Routes>
    </div>
  );
}

export default App;
