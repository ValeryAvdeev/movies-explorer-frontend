import './NotFoundPage.css';
import {Link} from "react-router-dom";

function NotFoundPage() {
  return (
    <div className="page-error">
      <h2 className="page-error__title">
        404
      </h2>
      <p className="page-error__text">Страница не найдена</p>
      <Link
        to='/'
        type='button'
        className='page-error__link'
      >
        Назад
      </Link>
    </div>
  )
}

export default NotFoundPage;
