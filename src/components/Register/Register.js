import React from 'react';
import LogoMain from '../LogoMain/LogoMain';
import { Link } from 'react-router-dom';
import './Register.css';
import useValidation from '../../utils/validation/useValidation';


function Register() {
  const { values, errors, handleChange, errorClassName } = useValidation();

  return (
    <section className='authorization'>
      <LogoMain />
      <h1 className='authorization__title'>Добро пожаловать!</h1>
      <form className='authorization-form'
        action='#'
        name='authorization-form'
        noValidate>
        <fieldset className='authorization-form__fieldset'>
          <div className='authorization-form__input-container'>
            <label className='authorization-form__label'
              htmlFor='authorization-form__input-name'>
              Имя
            </label>
            <input type='text'
              id='authorization-form__input-name'
              className='authorization-form__input'
              value={values.name ?? ''}
              onChange={handleChange}
              placeholder='Введите ваше имя'
              name='name'
              required
              minLength='2'
              maxLength='30' />
          </div>
          <span className={`authorization-form__error ${errorClassName('name')} `} >{errors['name']}</span>

          <div className='authorization-form__input-container'>
            <label className='authorization-form__label'
              htmlFor='authorization-form__input-email'>
              E-mail
            </label>
            <input type='email'
              id='authorization-form__input-email'
              className='authorization-form__input'
              value={values.email ?? ''}
              onChange={handleChange}
              placeholder='Введите ваш email'
              name='email'
              required />
          </div>
          <span className={`authorization-form__error ${errorClassName('email')} `} >{errors['email']}</span>
          <div className='authorization-form__input-container'>
            <label className='authorization-form__label'
              htmlFor='authorization-form__input-password'>
              Пароль
            </label>
            <input type='password'
              id='authorization-form__input-password'
              className='authorization-form__input'
              value={values.password ?? ''}
              onChange={handleChange}
              placeholder='Введите пароль'
              name='password'
              required
              minLength='8'
              maxLength='30' />
          </div>

          <span className={`authorization-form__error ${errorClassName('password')} `} >{errors['password']}</span>
        </fieldset>

        <div className='authorization-form_button-container'>

          <button className='authorization-form__button button'
            type='submit'>
            Зарегистрироваться
          </button>
          <div className='authorization-form__question-container'>
            <p className='authorization-form__question'>
              Уже зарегистрированы?
            </p>
            <Link className='authorization-form__question-link link'
              to='/signin'>
              Войти
            </Link>
          </div>
        </div>

      </form>
    </section>
  );
}

export default Register;
