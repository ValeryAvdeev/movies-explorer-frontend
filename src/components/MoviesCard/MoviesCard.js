import './MoviesCard.css';
import foto from '../../images/street.png';
import {useState} from "react";
import {useLocation} from "react-router-dom";

function MoviesCard() {
  const [saveButton, setSaveButton] = useState(false);
  const location = useLocation();

  function handleSaveToogle() {
    setSaveButton(!saveButton)
  }

  return (
    <div className="movie">
      <div className="movie__content">
        <h3 className="movie__title">
          33 слова о дизайне
        </h3>
        <p className="movie__timeng">1ч 47м</p>
        <button
          type="button"
          className={
            `movie__save movie__save${
              location.pathname == '/saved-movies' ? '_delete' :
                saveButton ? '_active' : '_disaible'
            }`
          }
          onClick={handleSaveToogle}
        />
      </div>
      <img
        src={foto}
        className="movie__image"
        alt='имя из заголовка'
      />
    </div>
  )
}

export default MoviesCard;
