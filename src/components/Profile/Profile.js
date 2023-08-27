import React, { useContext, useState } from 'react';
import './Profile.css';
import Header from '../Header/Header';
import useValidation from '../../utils/validation/useValidation';
import { CurrentUserContext } from '../../contexts/CurrentUserContext';

function Profile({ loggedIn, onLogoutClick, onProfileEdit, isDisabled, setIsDisabled }) {
  const currentUser = useContext(CurrentUserContext);
  const { values, errors, isValid, handleChange, errorClassName } = useValidation({ name: currentUser.name, email: currentUser.email });
  const [isProfileEdit, setIsProfileEdit] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsDisabled(true);
    onProfileEdit({ name: values.name, email: values.email });
  };

  return (
    <>
      <Header loggedIn={loggedIn} />
      <section className='profile'>
        <h1 className='profile__title'>{`Привет, ${currentUser.name}!`}</h1>
        <form className='profile__form' onSubmit={handleSubmit}>
          <fieldset className='profile__fieldset' disabled={isDisabled}>
            <div className='profile__input-container'>
              <label className='profile__label'
                htmlFor='profile__input-name'>
                Имя
              </label>
              <input type='text'
                id='profile__input-name'
                className={`profile__input ${isProfileEdit ? 'profile__input_activ' : ''}`}
                value={!isProfileEdit ? currentUser.name : values.name}
                onChange={handleChange}
                name='name'
                required
                minLength='2'
                maxLength='30'
                disabled={!isProfileEdit}
              />
            </div>
            <span className={`profile__error ${isProfileEdit ? errorClassName('name') : ''} `} >
              {errors['name']}
            </span>

            <div className='profile__input-container'>
              <label className='profile__label'
                htmlFor='profile__input-email'>
                E-mail
              </label>
              <input type='email'
                id='profile__input-email'
                className={`profile__input ${isProfileEdit ? 'profile__input_activ' : ''}`}
                value={!isProfileEdit ? currentUser.email : values.email}
                onChange={handleChange}
                name='email'
                required
                disabled={!isProfileEdit}
              />
            </div>
            <span className={`profile__error ${isProfileEdit ? errorClassName('email') : ''} `} >
              {errors['email']}
            </span>

          </fieldset>
          <div className='profile_button-container'>
            <button
              className={`profile__button button ${isProfileEdit ? `profile__button_activ ${(isValid && (values.name !== currentUser.name || values.email !== currentUser.email)) ? '' : 'profile__button_disabled'}` : ''}`}
              type='submit'
              disabled={!isValid || (values.name === currentUser.name || values.email === currentUser.email || isDisabled)}
            >
              Сохранить
            </button>
            <div className='profile__buttons'>
              <button
                className='profile__button-text profile__button_edit button'
                type='button'
                onClick={() => { setIsProfileEdit(prev => !prev) }}
              >
                {!isProfileEdit ? 'Редактировать' : 'Не сохранять'}
              </button>
              <button
                className='profile__button-text profile__button_exit button'
                type='button'
                onClick={onLogoutClick}
              >
                Выйти из аккаунта
              </button>
            </div>
          </div>
        </form>
      </section>
    </>
  );
}

export default Profile;
