import React, { useState } from 'react';
import './SearchForm.css';
import Switch from '../Switch/Switch';

function SearchForm() {

  const { isToggled, setIsToggled } = useState(false);

  return (
    <section className='seachform'>
      <div className='seachform__input-container'>

        <input className='seachform__input' placeholder='Фильм' required></input>

        <button className="seachform__btn button">
          Найти
        </button>

      </div>
      <div className='seachform__switch-conteiner'>

        <Switch isToggled={isToggled} onToggle={() => setIsToggled(!isToggled)} />
        <p className='seachform__switch-conteiner_text'>Короткометражки</p>
      </div>


    </section>
  );
}

export default SearchForm;
