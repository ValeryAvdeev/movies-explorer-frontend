import './MoviesCardList.css';
import MoviesCard from "../MoviesCard/MoviesCard";

function MoviesCardList({films, filmsResult, showFilm, savedFilmsToggle, saveFilm}) {
  // console.log(typeof props.filmsResult);
  // console.log(filmsResult);
  // console.log(typeof props.savedFilmsToggle);
  // console.log(props.savedFilmsToggle);
  // console.log(props.handleGetMovies);

  return (
    <>
      {films.length > 0 ?
        <div className="movies-list">
          {films.map(film => (
              <MoviesCard key={film.id || film.movieId}
                          film={film}
                          savedFilms={saveFilm}
                          savedFilmsToggle={savedFilmsToggle}
              />
            )
          )}
        </div> : <p className='movies-list__dont'>Фильмов с таким названием нет</p>
      }
    </>
  )
}

export default MoviesCardList;
