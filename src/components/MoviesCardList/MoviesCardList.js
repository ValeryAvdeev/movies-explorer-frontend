import './MoviesCardList.css';
import MoviesCard from "../MoviesCard/MoviesCard";
import {useCallback, useEffect, useState} from "react";
import {MOBILE_SIZE} from "../../utils/constant";
import {useLocation} from "react-router-dom";
import Still from "../Still/Still";

function MoviesCardList({
                          movies,
                          onSave,
                          onDelete,
                          savedMovies,
                        }) {
  const location = useLocation();
  const [currentCards, setCurrentCards] = useState(0);
  const [addCards, setAddCards] = useState(7);
  const [moviesToShow, setMoviesToShow] = useState([]);
  const [hiddenButton, setHiddenButton] = useState(false);

  const getCards = (windowSize) => {
    if (windowSize > MOBILE_SIZE) {
      return {first: 7, extra: 7};
    }
    return {first: 5, extra: 1};
  };


  const renderAddCards = useCallback(() => {
    const count = Math.min(movies.length, currentCards + addCards);
    const moreCards = movies.slice(currentCards, count);
    setMoviesToShow([...moviesToShow, ...moreCards]);
    setCurrentCards(count);
  }, [currentCards, addCards, movies, moviesToShow]);

  const resize = useCallback(() => {
    const windowSize = window.innerWidth;
    setAddCards(getCards(windowSize));
  }, []);

  useEffect(() => {
    window.addEventListener("resize", resize);

    return () => {
      window.removeEventListener("resize", resize);
    };
  }, [resize]);

  useEffect(() => {
    const windowSize = window.innerWidth;
    setAddCards(getCards(windowSize).extra);
    const count = Math.min(movies.length, getCards(windowSize).first);
    setMoviesToShow(movies.slice(0, count));
    setCurrentCards(count);
  }, [movies]);

  useEffect(() => {
    if ((currentCards > movies.length) || (currentCards === movies.length)) {
      setHiddenButton(true);
    }
  }, [currentCards]);

  const renderMovies = useCallback(() => {
    renderAddCards();
  }, [renderAddCards]);

  console.log(movies);
  // console.log(location.pathname);
  return (
    <>
      <section className="movies-list">
        {location.pathname === "/movies" && movies.length ? (
          moviesToShow.map((movie) => (
            <MoviesCard movie={movie}
                        onSave={onSave}
                        onDelete={onDelete}
                        savedMovies={savedMovies}
                        key={movie.id}
            />
          ))
        ) : (<p className='movies-list__dont'>Фильмов с таким названием нет</p>)
        }
        {location.pathname === "/saved-movies" && movies.length ? (
          moviesToShow.map((movie) => (
            <MoviesCard movie={movie}
                        onSave={onSave}
                        onDelete={onDelete}
                        savedMovies={savedMovies}
                        key={movie._id}
            />
          ))
        ) : (<p className='movies-list__dont'>у Вас пока нет сохраненых фильмов</p>)
        }
{/* 
        {
          location.pathname === '/movies' ? (
          moviesToShow.map((movie) => (
            <MoviesCard
              movie={movie}
              onSave={onSave}
              onDelete={onDelete}
              savedMovies={savedMovies}
              key={movie.id}
            />
          ))
        ) : (
          moviesToShow.map((movie) => (
            <MoviesCard
              movie={movie}
              onSave={onSave}
              onDelete={onDelete}
              savedMovies={savedMovies}
              key={movie.id}
            />
          ))
        )} */}
      </section>
      <div>
        {location.pathname === '/movies' &&
        (<Still onClick={renderMovies} 
                hiddingButton={hiddenButton}
        />)
        }
      </div>
    </>
  )
}

export default MoviesCardList;
