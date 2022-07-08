import './Portfolio.css';

function Portfolio() {
  return (
    <section className="portfolio">
      <h2 className="portfolio__title">Портфолио</h2>
      <div className="portfolio__info">
        <div className="portfolio__project">
          <h3 className="portfolio__subtitle">Статичный сайт</h3>
          <a href='https://github.com/ValeryAvdeev/how-to-learn' target="_blank" className="portfolio__link"/>
        </div>
        <div className="portfolio__project">
          <h3 className="portfolio__subtitle">Адаптивный сайт</h3>
          <a href='https://valeryavdeev.github.io/russian-travel/' target="_blank" className="portfolio__link"/>
        </div>
        <div className="portfolio__project">
          <h3 className="portfolio__subtitle">Одностраничное приложение</h3>
          <a href='https://github.com/ValeryAvdeev/react-mesto-api-full' target="_blank" className="portfolio__link"/>
        </div>
      </div>
    </section>
  )
}

export default Portfolio;
