import MoviesCardList from '../MoviesCardList/MoviesCardList';
import SearchFrom from '../SearchForm/SearchForm';
import './SavedMovies.css';
import {useMemo, useState} from "react";
import Preloader from "../Preloader/Preloader";

function SavedMovies({
                       onDelete,
                       savedMovies,
                       searchKeyword,
                       isLoading
                     }) {


  const [tumbler, setTumbler] = useState(false);
  const [filter, setFilter] = useState('');

  const filterShortMovies = (filterMovies) =>
    filterMovies.filter((i) => i.duration < 40);

  function tumblerClick() {
    setTumbler(!tumbler);
  }

  // useEffect(() => {
  //   if (filteredMovies.lenght === 0) {
  //     setIsNothingFound(false)
  //   }
  // }, [])

  const filteredMovies = useMemo(
    () =>
      savedMovies.filter((i) =>
        i.nameRU.toLowerCase().includes(filter.toLowerCase())
      ),
    [filter, savedMovies]
  );

  return (
    <div className='movies'>
      <SearchFrom onSubmit={setFilter}
                  tumblerClick={tumblerClick}
                  searchKeyword={searchKeyword}
      />
      {!isLoading && <Preloader/>}
      {isLoading &&
      <MoviesCardList movies={tumbler ?
        filterShortMovies(filteredMovies)
        : filteredMovies
      }
                      onDelete={onDelete}
                      savedMovies={savedMovies}
      />
      }
    </div>
  )
}

export default SavedMovies;

