import './Footer.css'

function Footer() {
  return (
    <footer className="footer">
      <h2 className="footer__title">Учебный проект Яндекс.Практикум х BeatFilm.</h2>
      <div className="footer__info">
        <p className="footer__copyright">&copy; 2022</p>
        <nav className="footer__nav">
          <a href="https://practicum.yandex.ru/" className="footer__link">Яндекс.Практикум</a>
          <a href="https://github.com/yandex" className="footer__link">Github</a>
          <a href="https://yandex.ru/q/tag/facebook/" className="footer__link">Facebook</a>
        </nav>
      </div>
    </footer>
  )
}

export default Footer;
