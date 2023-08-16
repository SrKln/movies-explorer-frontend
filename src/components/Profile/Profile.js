import React from 'react';
import './Profile.css';
import Header from '../Header/Header';

function Profile({ loggedIn }) {

  return (
    <>
      <Header loggedIn={loggedIn} />
      <section className='profile'>
        <h1 className='profile__hi'>Привет, Сергей!</h1>
        <form className='profile__form'>
          <fieldset className='profile__user'>
            <div className='profile__data'>
              <label className='profile__field'>Имя</label>
              <input
                id='profile__name'
                className='profile__input'
                type='text'
                name='name'
                placeholder='Ваше имя'
                required
                minLength='2'
                maxLength='28'
                defaultValue='Сергей'
              />
            </div>
            <div className='profile__data'>
              <label className='profile__field'>E-mail</label>
              <input
                id='profile__email'
                className='profile__input'
                type='text'
                name='email'
                placeholder='Ваш email'
                defaultValue='pochta@yandex.ru'
                required
              />
            </div>
          </fieldset>
          <div className='profile__buttons'>
            <button className='profile__button profile__button_edit button' type='button'  >Редактировать</button>
            <button className='profile__button profile__button_exit button' type='button'>Выйти из аккаунта</button>
          </div>
        </form>
      </section>
    </>
  );
}

export default Profile;
