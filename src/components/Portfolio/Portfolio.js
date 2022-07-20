import './Portfolio.css';
// import {Link} from "react-router-dom";

function Portfolio() {
  return (
    <section className="portfolio">
      <h2 className="portfolio__title">Портфолио</h2>
      <div className="portfolio__info">
        <a className="portfolio__project"
           href='https://github.com/ValeryAvdeev/how-to-learn'
           target="_blank"
        >
          <h3 className="portfolio__subtitle">Статичный сайт</h3>
          <div className="portfolio__link"/>
        </a>
        <a className="portfolio__project"
           href='https://valeryavdeev.github.io/russian-travel/'
           target="_blank"
        >
          <h3 className="portfolio__subtitle">Адаптивный сайт</h3>
          <div className="portfolio__link"/>
        </a>
        <a className="portfolio__project"
           href='https://github.com/ValeryAvdeev/react-mesto-api-full'
           target="_blank"
        >
          <p className="portfolio__subtitle">Одностраничное приложение</p>
          <div className="portfolio__link"/>
        </a>
      </div>
    </section>
  )
}

export default Portfolio;
