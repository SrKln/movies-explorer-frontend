import React from 'react';
import './Promo.css';
import promo from '../../images/image-page.svg';

const Promo = () => {
  return (
    <section className='promo'>
      <h1 className='promo__title'>
        Учебный проект студента факультета Веб-разработки.
      </h1>
      <img className='promo__img' src={promo} alt='абстракция - спираль ' />
    </section>
  )
};

export default Promo;
