import './App.css';
import React, { useState, useEffect } from "react";
import { Route, Routes, useNavigate, Navigate } from 'react-router-dom';
import Main from '../Main/Main';
import Movies from '../Movies/Movies';
import SavedMovies from '../SavedMovies/SavedMovies';
import Register from '../Register/Register';
import Login from '../Login/Login';
import Profile from '../Profile/Profile';
import PageNotFound from '../PageNotFound/PageNotFound';
import Preloader from '../Preloader/Preloader';
import { CurrentUserContext } from '../../contexts/CurrentUserContext';
import ProtectedRoute from '../../ProtectedRoute/ProtectedRoute';
import * as auth from '../../utils/api/auth';
import * as mainApi from '../../utils/api/MainApi';

function App() {
  const navigate = useNavigate();
  const [currentUser, setCurrentUser] = useState({});
  const [loggedIn, setLoggedIn] = useState(false);
  const [isTokenChecked, setIsTokenChecked] = useState(false);

  const [isFirstTimeRequest, setIsFirstTimeRequest] = useState(true);
  const [allMovies, setAllMovies] = useState([]);
  const [savedMovies, setSavedMovies] = useState([]);

  const [isDisabled, setIsDisabled] = useState(false);

  const handleTokenCheck = () => {
    if (localStorage.getItem('token')) {
      mainApi.getUserInfo()
        .then((userInfo) => {
          if (userInfo) {
            setCurrentUser(userInfo);
            setLoggedIn(true);
          }
        })
        .catch(err => {
          alert(err);
          handleLogout();
        })
        .finally(() => setIsTokenChecked(true));
    } else {
      setLoggedIn(false);
      setIsTokenChecked(true);
    }
  }

  const getSavedMovies = () => {
    mainApi.getSavedMovies()
      .then((movies) => {
        setSavedMovies(movies);
      })
  }

  useEffect(() => {
    handleTokenCheck();
    if (loggedIn) {
      getSavedMovies();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [loggedIn])

  const handleSignin = (userData) => {
    auth.authorize(userData)
      .then((data) => {
        if (data.token) {
          localStorage.setItem('token', data.token);
          setLoggedIn(true);
          navigate('/movies', { replace: true });
        }
      })
      .catch(err => alert(err))
      .finally(() => setIsDisabled(false));
  };

  const handleRegister = (userData) => {
    auth.register(userData)
      .then(() => {
        handleSignin({ email: userData.email, password: userData.password });
      })
      .catch(err => alert(err))
      .finally(() => setIsDisabled(false));
  };

  const handleLogout = () => {
    setCurrentUser({});
    setLoggedIn(false);
    setIsTokenChecked(false);
    setIsFirstTimeRequest(true);
    localStorage.clear();
    navigate('/', { replace: true });
  };

  const handleProfileEdit = (userData) => {
    mainApi.updateUserInfo(userData)
      .then((res) => {
        setCurrentUser(res);
        alert('Данные пользователя изменены');
      })
      .catch(err => alert(err))
      .finally(() => setIsDisabled(false));
  };

  const handleIsMovieSaved = (movie) => {
    return savedMovies.some(savedMovie => movie.movieId === savedMovie.movieId);
  }

  const handleSaveMovie = (movie) => {
    mainApi.saveMovie(movie)
      .then((res) => {
        setSavedMovies([res, ...savedMovies])
      })
      .catch(err => alert(err));
  }

  const handleDeleteMovie = (movieId) => {
    const id = savedMovies.find(savedMovie => savedMovie.movieId === movieId)._id;
    mainApi.deleteMovie(id)
      .then(() => {
        setSavedMovies(savedMovies.filter(savedMovie => savedMovie._id !== id))
      })
      .catch(err => alert(err));
  }


  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className="app">
        {isTokenChecked ?
          <Routes>
            <Route path="/" element={<Main loggedIn={loggedIn} />} />

            <Route path="/movies" element={
              <ProtectedRoute
                element={Movies}
                loggedIn={loggedIn}
                isFirstTimeRequest={isFirstTimeRequest}
                setIsFirstTimeRequest={setIsFirstTimeRequest}
                allMovies={allMovies}
                setAllMovies={setAllMovies}
                testIsMovieSaved={handleIsMovieSaved}
                saveMovie={handleSaveMovie}
                deleteMovie={handleDeleteMovie}
              />}
            />
            <Route path="/saved-movies" element={
              <ProtectedRoute
                element={SavedMovies}
                loggedIn={loggedIn}
                savedMovies={savedMovies}
                deleteMovie={handleDeleteMovie}
              />}
            />
            <Route path="/profile" element={
              <ProtectedRoute
                element={Profile}
                loggedIn={loggedIn}
                onLogoutClick={handleLogout}
                onProfileEdit={handleProfileEdit}
                isDisabled={isDisabled}
                setIsDisabled={setIsDisabled}
              />}
            />
            <Route path="/signup" element={
              loggedIn ?
                <Navigate to="/" />
                :
                <Register
                  onRegister={handleRegister}
                  isDisabled={isDisabled}
                  setIsDisabled={setIsDisabled} />
            } />
            <Route path="/signin" element={
              loggedIn ?
                <Navigate to="/" />
                :
                <Login
                  onLogin={handleSignin}
                  isDisabled={isDisabled}
                  setIsDisabled={setIsDisabled} />
            } />

            <Route path="*" element={<PageNotFound />} />
          </Routes>
          :
          <Preloader />
        }
      </div>
    </CurrentUserContext.Provider>
  );
}

export default App;
