import './MoviesCard.css';
import foto from '../../images/street.png';

function MoviesCard() {
  return (
    <div className="movie">
      <div className="movie__content">
        <h3 className="movie__title">
          33 слова о дизайне
        </h3>
        <p className="movie__timeng">1ч 47м</p>
        <button
          type="button"
          className='movie__save'
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
