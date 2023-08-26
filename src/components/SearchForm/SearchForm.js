import React, { useState } from 'react';
import './SearchForm.css';
import Switch from '../Switch/Switch';
import useValidation from '../../utils/validation/useValidation';
import { useLocation } from 'react-router-dom';

function SearchForm({ onSearch }) {
  const location = useLocation();
  const { values, isValid, handleChange } = useValidation();
  const [isToggled, setIsToggled] = useState(localStorage.getItem('switch') ? JSON.parse(localStorage.getItem('switch')) : false);
  const [isSearchOnFocus, setIsSearchOnFocus] = useState(false);
  const firstRequest = (location.pathname === '/movies') ? (localStorage.getItem('request') ? localStorage.getItem('request') : '') : '';

  const handleToggle = () => {
    setIsToggled(!isToggled);
    onSearch((values.request ?? localStorage.getItem('request')), !isToggled);
  }

  const handleSearch = (e) => {
    e.preventDefault();
    onSearch(values.request, isToggled);
  }

  return (
    <section className='seachform' aria-label='Форма поиска'>
      <form className={`seachform__input-container ${isSearchOnFocus ? 'seachform__input-container_focus' : ''}`}
        onSubmit={handleSearch}
        noValidate>

        <input
          className='seachform__input'
          value={values.request ?? firstRequest}
          onChange={handleChange}
          name='request'
          placeholder='Фильм'
          required
          onFocus={() => setIsSearchOnFocus(true)}
          onBlur={() => setIsSearchOnFocus(false)} />

        <button
          className={`seachform__btn button   ${!isValid ? 'seachform__btn_disabled' : ''}`}
          type='submit'
          disabled={!isValid}>
          Найти
        </button>

      </form>
      <div className='seachform__switch-conteiner'>
        <Switch isToggled={isToggled} onToggle={handleToggle} />
        <p className='seachform__switch-conteiner_text'>Короткометражки</p>
      </div>

    </section>
  );
}

export default SearchForm;
