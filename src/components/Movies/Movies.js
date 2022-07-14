import './Movies.css';
import SearchForm from "../SearchForm/SearchForm";
import MoviesCardList from "../MoviesCardList/MoviesCardList";
import Still from "../Still/Still";
import Preloader from "../Preloader/Preloader";

function Movies() {
  return (
    <div className='movies'>
      <SearchForm/>
      <MoviesCardList/>
      <Preloader/>
      {/*Если ничего не найдено, на месте прелоадера появляется надпись
      «Ничего не найдено»*/}

      {/*Если в процессе получения и обработки данных происходит ошибка,
      в окне результатов выводится надпись:
      «Во время запроса произошла ошибка.
      Возможно, проблема с соединением или сервер недоступен.
      Подождите немного и попробуйте ещё раз».*/}

      {/*Ширина 1280px — 12 карточек по 3 в ряд. Кнопка «Ещё» загружает по 3 карточки.*/}
      {/*Ширина 768px — 8 карточек по 2 в ряд. Кнопка «Ещё» загружает по 2 карточки.*/}
      {/*Ширина от 320px до 480px — 5 карточек по 1 в ряд.
      Кнопка «Ещё» загружает по 2 карточки.*/}
      <Still/>
    </div>
  )
}

export default Movies;
