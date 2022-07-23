import './MoviesCardList.css';
import MoviesCard from "../MoviesCard/MoviesCard";

function MoviesCardList(props) {
  console.log(props.film);
  return (
    <div className="movies-list">
      {
        props.films > 0 ? props.films.map(film => (
          <MoviesCard key={film._id || film.movieId}
                      film={film}
                      savedFilms={props.savedFilm}
                      savedFilmsToggle={props.savedFilmsToggle}
          />)) : <p>Фильмов с таким названием</p>
      }
    </div>
  )
}

export default MoviesCardList;
