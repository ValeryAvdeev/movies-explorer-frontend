import MoviesCardList from '../MoviesCardList/MoviesCardList';
import SearchFrom from '../SearchForm/SearchForm';
import './SavedMovies.css';

function SavedMovies() {
  return (
    <div className='movies'>
      <SearchFrom/>
      <MoviesCardList/>
    </div>
  )
}

export default SavedMovies;

