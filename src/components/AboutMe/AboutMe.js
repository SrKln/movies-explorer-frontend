import React from 'react';
import './AboutMe.css';
import avatar from '../../images/profile-foto.jpg';

function AboutMe() {
  return (
    <section className="aboutme " id="aboutme">

      <h2 className="aboutme__title section-title">Студент</h2>


      <div className="aboutme__profile">
        <img className="aboutme__avatar" src={avatar} alt="Сергей, начинающий фронтенд-разработчик" />

        <div className="aboutme__content">
          <h3 className="aboutme__name">Сергей</h3>

          <p className="aboutme__job">Фронтенд-разработчик, 32 года</p>

          <p className="aboutme__text">Я&nbsp;родился в&nbsp;небольшом селе Малиновка, расположенном в&nbsp;Кировской области. Однако мои амбиции и&nbsp;стремление к&nbsp;развитию привели меня в&nbsp;Москву. По пути я&nbsp;окончил Факультет Прикладной Математики и&nbsp;Телекоммуникаций в&nbsp;ВятГУ.</p>

          <p className="aboutme__text">На&nbsp;данный момент у&nbsp;меня есть замечательная жена, и&nbsp;вместе мы&nbsp;преображаем нашу квартиру, занимаясь ремонтом. Однако моя страсть и&nbsp;профессиональное направление связаны с&nbsp;CRM&#8209;маркетингом. Я&nbsp;являюсь опытным CRM&#8209;маркетологом и&nbsp;руководителем коммуникаций в&nbsp;ed&#8209;tech.</p>

          <p className="aboutme__text">Меня привлекает digital сфера во&nbsp;всех ее&nbsp;проявлениях&nbsp;&mdash; от&nbsp;дизайна до&nbsp;программирования и&nbsp;маркетинга. Именно поэтому я&nbsp;решил пройти курс по&nbsp;Веб&#8209;Разработке от&nbsp;ЯП, чтобы систематизировать свои знания во&nbsp;фронтенд разработке. Этот курс расширил мой кругозор и&nbsp;укрепил мои навыки в&nbsp;данной области.</p>

          <a className="aboutme__link link" href="https://github.com/SrKln" target="_blank" rel="noreferrer">Github</a>
        </div>


      </div>

    </section>
  )
}

export default AboutMe;
