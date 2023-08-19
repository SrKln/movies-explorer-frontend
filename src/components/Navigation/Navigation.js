import React from 'react';
import './Navigation.css';
import { NavLink } from 'react-router-dom';
import BottonProfile from "../BottonProfile/BottonProfile";



function Navigation({ loggedIn }) {

  const navigationClass = (`navigation ${loggedIn ? '' : 'navigation_logout'}`);

  const [isNavigationBurger, setIsNavigationBurger] = React.useState(false);

  function openNavigationBurger() {
    setIsNavigationBurger(true)
  }

  function closeNavigationBurger() {
    setIsNavigationBurger(false)
  }


  return (
    <nav className={navigationClass}>

      {loggedIn && <nav className='navigation-menu'>
        <ul className='navigation-menu__menu' >
          <li className='navigation-menu__item'>
            <NavLink to='/movies' className={({ isActive }) => `navigation-menu__title link ${isActive ? 'navigation-menu__title_active' : ''}`}>
              Фильмы
            </NavLink>
          </li>
          <li className='navigation-menu__item'>
            <NavLink to='/saved-movies' className={({ isActive }) => `navigation-menu__title link ${isActive ? 'navigation-menu__title_active' : ''}`}>
              Сохранённые фильмы
            </NavLink>
          </li>
          <li className='navigation-menu__item navigation-menu__item-profile'><BottonProfile /></li>


        </ul>
      </nav>}

      {!loggedIn && <nav className='navigation-btns'>
        <NavLink to='/signup' className='navigation-btns__button navigation-btns__button_type_reg button'>
          Регистрация
        </NavLink>
        <NavLink to='/signin' className='navigation-btns__button button'>
          Войти
        </NavLink>
      </nav>}

      {loggedIn && <button className='navigation-icon-burger button' type='button' onClick={openNavigationBurger}></button>}

      {loggedIn && <div className={`navigation-menu-burger ${isNavigationBurger ? 'navigation-menu-burger_opened' : ''}`} >

        <nav className='navigation-menu-burger__content'>
          <ul className='navigation-menu-burger__menu'>
            <li className='navigation-menu-burger__item'><NavLink to='/' className={({ isActive }) => `navigation-menu-burger__link link ${isActive ? 'navigation-menu-burger__link_type_active' : ''}`}>Главная</NavLink></li>
            <li className='navigation-menu-burger__item'><NavLink to='/movies' className={({ isActive }) => `navigation-menu-burger__link link ${isActive ? 'navigation-menu-burger__link_type_active' : ''}`}>Фильмы</NavLink></li>
            <li className='navigation-menu-burger__item'><NavLink to='/saved-movies' className={({ isActive }) => `navigation-menu-burger__link link ${isActive ? 'navigation-menu-burger__link_type_active' : ''}`}>Сохранённые фильмы</NavLink></li>
            <li className='navigation-menu-burger__item navigation-menu-burger__item-profile'>
              <BottonProfile /></li>
          </ul>


          <button className='navigation-burger-close button' type='button' onClick={closeNavigationBurger}></button>
        </nav>

      </div>}

    </nav>
  );
}

export default Navigation;
