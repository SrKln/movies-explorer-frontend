import React from 'react';
import './AboutProject.css'

function AboutProject() {
  return (
    <section className="project-details" id="project-details">
      <h2 className="project-details__title section-title">О&nbsp;проекте</h2>
      <div className="project-details__container">
        <div className="project-details__block">
          <h3 className="project-details__subtitle">Дипломный проект включал 5&nbsp;этапов</h3>
          <p className="project-details__text">Составление плана, работу над бэкендом, вёрстку, добавление функциональности и&nbsp;финальные доработки.</p>
        </div>
        <div className="project-details__block">
          <h3 className="project-details__subtitle">На&nbsp;выполнение диплома ушло 5&nbsp;недель</h3>
          <p className="project-details__text">У&nbsp;каждого этапа был мягкий и&nbsp;жёсткий дедлайн, которые нужно было соблюдать, чтобы успешно защититься.</p>
        </div>
      </div>
      <div className="project-details__time">
        <div className="project-details__backend">
          <p className="project-details__time-title project-details__time-title_backend">1 неделя</p>
          <p className="project-details__time-text">Back-end</p>
        </div>
        <div className="project-details__frontend">
          <p className="project-details__time-title project-details__time-title_frontend">4 недели</p>
          <p className="project-details__time-text">Front-end</p>
        </div>
      </div>
    </section>
  );
}
export default AboutProject
