import React from 'react';
import './BottonProfile.css';
import { NavLink } from 'react-router-dom';
import ProfileIcon from '../../images/icon-user-image.svg';

function BottonProfile() {
  return (
    <NavLink className='botton-profile' to='/profile'>
      <img className='botton-profile__icon' src={ProfileIcon} alt='Иконка аккаунта' />  Аккаунт
    </NavLink>
  )
}

export default BottonProfile;
