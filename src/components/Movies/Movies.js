import './Movies.css';
import SearchForm from "../SearchForm/SearchForm";
import MoviesCardList from "../MoviesCardList/MoviesCardList";
import Preloader from "../Preloader/Preloader";
import {useEffect, useState} from "react";
import {moviesApi} from "../../utils/MoviesApi";

function Movies({
                  isLoading,
                  movies,
                  savedMovies,
                  onSubmit,
                  onSave,
                  onDelete,
                  searchKeyword,
                  setAllMovies
                }) {
  const [tumbler, setTumbler] = useState(false);
  const [isShort, setIsShort] = useState(false);

  const tumblerClick = () => {
    setTumbler(!tumbler)
    localStorage.setItem('checkBox', !tumbler)
  }

  useEffect(() => {
    const checkBoxLocal = localStorage.getItem('checkBox')
    if (checkBoxLocal === 'true') {
      setIsShort(isShort)
      setTumbler(true)
    }
  }, [])

  useEffect(() => {
    if (!localStorage.loadedMovies) {
      moviesApi
        .getAllMovies()
        .then((data) => {
          setAllMovies(data);
          localStorage.setItem("loadedMovies", JSON.stringify(data));
        })
        .catch((err) => console.log(err));
    }
  }, [])

  const filterShortMovies = (filterMovies) =>
    filterMovies.filter((m) => m.duration < 40)


  return (
    <div className='movies'>
      <SearchForm onSubmit={onSubmit}
                  tumblerClick={tumblerClick}
                  searchKeyword={searchKeyword}
                  isShort={tumbler}
      />
      {isLoading && <Preloader/>}
      {!isLoading && (
        <MoviesCardList movies={tumbler ? filterShortMovies(movies) : movies}
                        onSave={onSave}
                        onDelete={onDelete}
                        savedMovies={savedMovies}
                        checkBox={tumblerClick}
                        searchKeyword={searchKeyword}
        />
      )}
    </div>
  )
}

export default Movies;
