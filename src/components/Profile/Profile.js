import React from 'react';
import './Profile.css';
import Header from '../Header/Header';
import useValidation from '../../utils/validation/useValidation';


function Profile({ loggedIn }) {
  const { values, errors, handleChange, errorClassName } = useValidation();

  return (
    <>
      <Header loggedIn={loggedIn} />
      <section className='profile'>
        <h1 className='profile__title'>Привет, Сергей!</h1>
        <form className='profile__form'>
          <fieldset className='profile__fieldset'>
            <div className='profile__input-container'>
              <label className='profile__label'
                htmlFor='profile__input-name'>
                Имя
              </label>
              <input type='text'
                id='profile__input-name'
                className='profile__input'
                value={values.name ?? ''}
                onChange={handleChange}
                name='name'
                placeholder='Ваше имя'
                required
                minLength='2'
                maxLength='30'
                defaultValue='Сергей'
              />

            </div>
            <span className={`profile__error ${errorClassName('name')} `} >{errors['name']}</span>

            <div className='profile__input-container'>
              <label className='profile__label'
                htmlFor='profile__input-email'>
                E-mail
              </label>
              <input type='email'
                id='profile__input-email'
                className='profile__input'
                value={values.email ?? ''}
                onChange={handleChange}
                defaultValue='pochta@yandex.ru'
                placeholder='Ваш email'
                name='email'
                required
              />

            </div>
            <span className={`profile__error ${errorClassName('email')} `} >{errors['email']}</span>

          </fieldset>
          <div className='profile_button-container'>

            <button className='profile__button button'
              type='submit'>
              Сохранить
            </button>
            <div className='profile__buttons'>

              <button className='profile__button-text profile__button_edit button' type='button'  >Редактировать</button>
              <button className='profile__button-text profile__button_exit button' type='button'>Выйти из аккаунта</button>

            </div>

          </div>
        </form>
      </section>
    </>
  );
}

export default Profile;
