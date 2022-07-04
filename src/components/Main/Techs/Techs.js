// import './Techs.css'

function Techs() {
  return (
    <section className='techs' id='techs'>
      <div className="content">
        <h2 className="section__title section__title_black">Технологии</h2>
        <h3 className="techs__title">7 технологий</h3>
        <p className="techs__text">На курсе веб-разработки мы освоили технологии, которые применили в дипломном
          проекте.</p>
        <div className="techs__list">
          <li className="techs__item">HTML</li>
          <li className="techs__item">CSS</li>
          <li className="techs__item">JS</li>
          <li className="techs__item">React</li>
          <li className="techs__item">Git</li>
          <li className="techs__item">Express js</li>
          <li className="techs__item">monogoDB</li>
        </div>
      </div>
    </section>
  )
}

export default Techs;
