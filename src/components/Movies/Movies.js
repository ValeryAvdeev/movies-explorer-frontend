import './Movies.css';
import SearchForm from "../SearchForm/SearchForm";
import MoviesCardList from "../MoviesCardList/MoviesCardList";
import Still from "../Still/Still";

function Movies() {
  return (
    <div className='movies'>
      <SearchForm/>
      <MoviesCardList/>
      <Still/>
    </div>
  )
}

export default Movies;
