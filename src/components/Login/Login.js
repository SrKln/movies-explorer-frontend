import './Login.css';
import React from 'react';
import LogoMain from '../LogoMain/LogoMain';
import { Link } from 'react-router-dom';
import useValidation from '../../utils/validation/useValidation';

function Login({ onLogin, isDisabled, setIsDisabled }) {
  const { values, errors, isValid, handleChange, errorClassName } = useValidation();

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsDisabled(true);
    onLogin({ email: values.email, password: values.password });
  }

  return (
    <section className='login'>
      <LogoMain />
      <h1 className='login__title'>Рады видеть!</h1>
      <form className="login-form"
        onSubmit={handleSubmit}
        noValidate>
        <fieldset className='login-form__fieldset' disabled={isDisabled}>
          <div className='login-form__input-container'>
            <label className='login-form__label'
              htmlFor='login-form__input-email'>
              E-mail
            </label>
            <input type="email" id="login-form__input-email"
              className="login-form__input"
              value={values.email ?? ''}
              onChange={handleChange}
              placeholder='Введите email'
              name="email"
              required />
          </div>

          <span className={`login-form__error ${errorClassName('email')} `} >{errors['email']}</span>
          <div className='login-form__input-container'>
            <label className='login-form__label' htmlFor='login-form__input-password'>Пароль</label>
            <input type="password"
              id="login-form__input-password"
              className="login-form__input"
              value={values.password ?? ''}
              onChange={handleChange}
              placeholder='Введите пароль'
              name="password"
              required minLength="6"
              maxLength="30"
            />
          </div>

          <span className={`login-form__error ${errorClassName('password')} `} >{errors['password']}</span>
        </fieldset>
        <div className='login-form_button-container'>

          <button className={`login-form__button button   ${!isValid ? 'login-form__button_disabled' : ''}`}
            type='submit'
            disabled={!isValid || isDisabled}>
            Войти
          </button>
          <div className='login-form__question-container'>
            <p className='login-form__question'>
              Ещё не зарегистрированы?
            </p>
            <Link className="login-form__question-link link"
              to="/signup">
              Регистрация
            </Link>
          </div>
        </div>
      </form>
    </section>
  );
}

export default Login;
