import './AboutProject.css'

function AboutProject() {
  return (
    <div className='aboutProject' id='about-project'>
      <h2 className='aboutProject__title'>О проекте</h2>
      <div className='aboutProject__description'>
        <div className='aboutProject__info'>
          <h3 className='aboutProject__subtitle'>Дипломный проект включал 5 этапов</h3>
          <p className='aboutProject__text'>Составление плана, работу над бэкендом, вёрстку,
            добавление&#x0D;функциональности и финальные доработки.</p>
        </div>
        <div className='aboutProject__info'>
          <h3 className='aboutProject__subtitle'>На выполнение диплома ушло 5 недель</h3>
          <p className='aboutProject__text'>У каждого этапа был мягкий и жёсткий дедлайн, которые нужно
            было&#x0D;соблюдать, чтобы успешно защититься.</p>
        </div>
      </div>
      <div className='aboutProject__timeline'>
        <div className='aboutProject__backend'>
          <p className='aboutProject__text-time aboutProject__text-time_back'>1 неделя</p>
          <p className='aboutProject__caption'>Back-end</p>
        </div>
        <div className='aboutProject__frontend'>
          <p className='aboutProject__text-time aboutProject__text-time_front'>4 неделя</p>
          <p className='aboutProject__caption'>Front-end</p>
        </div>
      </div>
    </div>
  )
}

export default AboutProject;
