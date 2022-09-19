import './MoviesCardList.css';
import MoviesCard from "../MoviesCard/MoviesCard";
import {useCallback, useEffect, useState} from "react";
import {MOBILE_SIZE, SHOW_FILMS} from "../../utils/constant";
import {useLocation} from "react-router-dom";
import Still from "../Still/Still";

function MoviesCardList({
                          movies,
                          onSave,
                          onDelete,
                          savedMovies
                        }) {

  const location = useLocation();
  const [currentCards, setCurrentCards] = useState(0);
  const [addCards, setAddCards] = useState(SHOW_FILMS);
  const [moviesToShow, setMoviesToShow] = useState([]);
  // const [hiddenButton, setHiddenButton] = useState(false);

  const getCards = (windowSize) => {
    console.log('getCards')
    if (windowSize > MOBILE_SIZE) {
      return {first: SHOW_FILMS, extra: SHOW_FILMS};
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
    console.log('windowSize ' + windowSize)
    // console.log(setAddCards(getCards(windowSize)))
    // setAddCards(getCards(windowSize));
    getCards(windowSize)
  }, []);

  useEffect(() => {
    window.addEventListener("resize", resize);

    return () => {
      window.removeEventListener("resize", resize);
    };
  }, [resize]);

  useEffect(() => {
    const windowSize = window.innerWidth;
    console.log(setAddCards(getCards(windowSize).extra))
    setAddCards(getCards(windowSize).extra);
    const count = Math.min(movies.length, getCards(windowSize).first);
    setMoviesToShow(movies.slice(0, count));
    setCurrentCards(count);
  }, [movies]);

  // useEffect(() => {
  //   if ((currentCards > movies.length) || (currentCards === movies.length)) {
  //     setHiddenButton(true);
  //   }
  // }, [currentCards]);

  // const renderMovies = useCallback(() => {
  //   renderAddCards();
  // }, [renderAddCards]);

  // console.log('movies' + movies.length);
  console.log('addCards' + addCards);

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
        ) : location.pathname === "/saved-movies" && movies.length ? (
          moviesToShow.map((movie) => (
            <MoviesCard movie={movie}
                        onSave={onSave}
                        onDelete={onDelete}
                        savedMovies={savedMovies}
                        key={movie._id}
            />
          ))
        ) : (<p className='movies-list__dont'>Фильмов нет</p>)
        }
      </section>
      <div>
        {movies.length > addCards &&
        (<Still onClick={renderAddCards}
          // hiddingButton={hiddenButton}
        />)
        }
      </div>
    </>
  )
}

export default MoviesCardList;
