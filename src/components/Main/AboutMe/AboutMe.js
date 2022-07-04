import Valery from '../../../images/valery.jpg';

function AboutMe() {
  return (
    <section className='about-me' id='me'>
      <h2 className="section__title">Студент</h2>
      <div className="about-me__info">
        <div className="about-me__info-text">
          <h3 className="about-me__name">Валерий</h3>
          <h4 className="about-me__profession">Фронтенд-разработчик, 31 год</h4>
          <p className="abuot-me__biography">
            Я родился и живу в Луховицах, закончил Коломинский полетехнический институт (МАМИ).
            У меня есть дочь. Я люблю проводить свободное время в фитнес клубе. Недавно увлекся фронтенд разработкой
            С 2019 года работаю в АО "Транснефть-Диаскан". После того, как прошел курсы по веб-разработке,
            хочу дальше развиваться и расти по этой профессии.
          </p>
          <div className="about-me__media">
            <a href="https://vk.com/id698958306" className="about-me__link">VK</a>
            <a href="https://github.com/ValeryAvdeev" className="about-me__link">Github</a>
          </div>
        </div>
        <img src={Valery} alt="моя фотография" className='about-me__foto'/>
      </div>
    </section>
  )
}

export default AboutMe;
