import './Movies.css';
import SearchForm from "../SearchForm/SearchForm";
import MoviesCardList from "../MoviesCardList/MoviesCardList";
// import Still from "../Still/Still";
import Preloader from "../Preloader/Preloader";
import {useEffect, useState} from "react";
import {moviesApi} from "../../utils/MoviesApi";

// import {mainApi} from "../../utils/MainApi";

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
  const [checkBoxActive, setCheckBoxActive] = useState(false);
  const [isShort, setIsShort] = useState(false);

  const checkBoxClick = () => {
    setCheckBoxActive(!checkBoxActive)
    localStorage.setItem('checkBox', !checkBoxActive)
  }

  useEffect(() => {
    const checkBoxLocal = localStorage.getItem('checkBox')
    if (checkBoxLocal === 'true') {
      setIsShort(isShort)
      setCheckBoxActive(true)
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
      <SearchForm
        onSubmit={onSubmit}
        checkBoxClick={checkBoxClick}
        searchKeyword={searchKeyword}
        isShort={checkBoxActive}
      />
      {isLoading && <Preloader/>}
      {!isLoading && (
        <MoviesCardList
          movies={checkBoxActive ? filterShortMovies(movies) : movies}
          onSave={onSave}
          onDelete={onDelete}
          savedMovies={savedMovies}
          checkBox={checkBoxClick}
          searchKeyword={searchKeyword}
        />
      )}
    </div>
  )
}

export default Movies;
