import './MoviesCard.css';
// import foto from '../../images/street.png';
import {useState, useEffect} from "react";
import {useLocation} from "react-router-dom";

function MoviesCard(props) {
  const [saveButton, setSaveButton] = useState(false);
  const location = useLocation();

  const poster = `https://api.nomoreparties.co/${props.film.image.url}`;

  // function handleSaveToggle() {
  //   setSaveButton(!saveButton)
  // }

  const handleDeleteFilm = () => {
    props.savedFilmsToggle(props.film, false)
  }

  const handleChangeToggle = () => {
    const newToggle = !saveButton;
    setSaveButton(!saveButton)
    console.log(newToggle);
    const savedFilm = props.savedFilms.filter(film => {
      return film.movieId === film.id;
    })
    props.savedFilmsToggle({...props.film, id: savedFilm.length > 0 ? savedFilm[0].id : null}, newToggle);
  }

  const time = (minutes) => {
    let hours = Math.trunc(minutes / 60);
    let mins = minutes % 60;
    return hours + `ч. ` + mins + `мин.`;
  }

  useEffect(() => {
    if (location.pathname !== '/saved-movies') {
      const savedFilm = props.savedFilms.filter(film => {
        console.log(film);
        return film.movieId === film.id;
      });
      if (savedFilm.length > 0) {
        setSaveButton(true);
      } else {
        setSaveButton(false);
      }
    }
  }, [props.savedFilms]);

  return (
    <div className="movie">
      <div className="movie__content">
        <h3 className="movie__title">
          {props.film.nameRU}
        </h3>
        <p className="movie__timeng">{time(props.film.duration)}</p>
        {/*«Сохранённые фильмы» Клик по ней удаляет карточку
        из сохранённых, отправляя запрос на /movies/movieID нашего API*/}
        <div>
          {location.pathname === '/movies' ?
            <button type="button"
                    className={
                      `movie__save movie__save${saveButton ? '_active' : '_disaible'}`
                    }
                    onClick={handleChangeToggle}
            /> :
            <button type="button"
                    className='movie__save movie__save_delete'
                    onClick={handleDeleteFilm}
            />
          }
        </div>
      </div>
      <img src={poster}
           className="movie__image"
           alt={props.film.nameRU}
      />
    </div>
  )
}

export default MoviesCard;
