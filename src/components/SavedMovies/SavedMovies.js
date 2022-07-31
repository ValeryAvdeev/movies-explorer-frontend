import MoviesCardList from '../MoviesCardList/MoviesCardList';
import SearchFrom from '../SearchForm/SearchForm';
import './SavedMovies.css';
import {useEffect, useMemo, useState} from "react";
import Preloader from "../Preloader/Preloader";

function SavedMovies({
                       isLoading,
                       onDelete,
                       savedMovies,
                       searchKeyword,
                     }) {
  const [tumbler, setTumbler] = useState(false);
  const [filter, setFilter] = useState('');
  // const [isNothingFound, setIsNothingFound] = useState(true)

  const filterShortMovies = (filterMovies) =>
    filterMovies.filter((m) => m.duration < 40);

  function tumblerClick() {
    setTumbler(!tumbler);
  }

  useEffect(() => {
    if (filteredMovies.lenght == 0) {
      // setIsNothingFound(false)
    }
  }, [])

  const filteredMovies = useMemo(
    () =>
      savedMovies.filter((m) =>
        m.nameRU.toLowerCase().includes(filter.toLowerCase())
      ),
    [filter, savedMovies]
  );

  console.log(filteredMovies);

  return (
    <div className='movies'>
      <SearchFrom onSubmit={setFilter}
                  tumblerClick={tumblerClick}
                  searchKeyword={searchKeyword}
      />
      {isLoading && <Preloader/>}
      {!isLoading &&
      <MoviesCardList movies={tumbler ? filterShortMovies(filteredMovies) : filteredMovies}
                      onDelete={onDelete}
                      savedMovies={savedMovies}
      />
      }
    </div>
  )
}

export default SavedMovies;

