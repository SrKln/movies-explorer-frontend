import React, { useState } from 'react';
import './SearchForm.css';
import Switch from '../Switch/Switch';
import useValidation from '../../utils/validation/useValidation';
import { NEED_REQUEST_ERROR } from '../../utils/constants';

function SearchForm({ onSearch, requestText, isShortMovies, setIsShortMovies, isDisabled, setIsDisabled }) {
  const { values, isValid, handleChange } = useValidation({ request: requestText });
  const [isToggled, setIsToggled] = useState(isShortMovies ?? false);
  const [isSearchOnFocus, setIsSearchOnFocus] = useState(false);
  const [error, setError] = useState('');

  const handleToggle = () => {
    setIsToggled(!isToggled);
    setIsShortMovies(!isToggled);
  }

  const handleSearch = (e) => {
    e.preventDefault();
    setIsDisabled(true);

    if (!values.request) {
      setError(NEED_REQUEST_ERROR);
    } else {
      setError('');
      onSearch(values.request, isToggled);
    }
  }

  return (
    <section className='seachform' aria-label='Форма поиска'>
      <form className={`seachform__input-container ${isSearchOnFocus ? 'seachform__input-container_focus' : ''}`}
        onSubmit={handleSearch}
        noValidate>

        <input
          className='seachform__input'
          value={values.request}
          onChange={handleChange}
          name='request'
          placeholder='Фильм'
          onFocus={() => setIsSearchOnFocus(true)}
          onBlur={() => setIsSearchOnFocus(false)}
          disabled={isDisabled} />

        <button
          className={`seachform__btn button   ${!isValid ? 'seachform__btn_disabled' : ''}`}
          type='submit'
          disabled={!isValid || isDisabled}>
          Найти
        </button>

      </form>
      <span className='seachform__error'>{error}</span>
      <div className='seachform__switch-conteiner'>
        <Switch isToggled={isToggled} onToggle={handleToggle} />
        <p className='seachform__switch-conteiner_text'>Короткометражки</p>
      </div>

    </section>
  );
}

export default SearchForm;
