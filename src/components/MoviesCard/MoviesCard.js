import './MoviesCard.css';
// import foto from '../../images/street.png';
// import {useState, useEffect} from "react";
import {useLocation} from "react-router-dom";
import {MOVIES} from '../../utils/constant';

function MoviesCard({
                      movie,
                      onSave,
                      onDelete,
                      savedMovies
                    }) {
  const location = useLocation();
  let hours = Math.floor(movie.duration / 60)
  let minutes = Math.floor(movie.duration - hours * 60)
    .toString()
    .padStart(2, "0");

  const isSaved = savedMovies.some((i) => i.movieId === movie.id);
  console.log(isSaved);

  function handleSaveClick() {
    if (isSaved) {
      onDelete(savedMovies.filter((i) => i.movieId === movie.id)[0]);
    } else {
      onSave(movie);
    }
  }

  function handleDeleteMovie() {
    onDelete(movie);
  }

  return (
    <div className="movie">
      <div className="movie__content">
        <h3 className="movie__title">
          {movie.nameRU}
        </h3>
        <p className="movie__timeng">{`${hours}ч ${minutes}м`}</p>
        <div>
          {location.pathname === '/movies' ?
            <button type="button"
                    className={
                      `movie__save movie__save${isSaved ? '_active' : '_disaible'}`
                    }
                    onClick={handleSaveClick}
            /> :
            <button type="button"
                    className='movie__save movie__save_delete'
                    onClick={handleDeleteMovie}
            />
          }
        </div>
      </div>
      {/* <a className="movies-card__trailer-link"
         href={movie.trailerLink}
         target='_blank'
         rel="noreferrer"
      > */}
        <img src={ location.pathname === '/movies' ? `${MOVIES}${movie.image.url}` : `${movie.image}` }
             className="movie__image"
             alt={movie.nameRU}
        />
      {/* </a> */}
    </div>
  )
}

export default MoviesCard;
