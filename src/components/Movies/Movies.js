import './Movies.css';
import SearchForm from "../SearchForm/SearchForm";
import MoviesCardList from "../MoviesCardList/MoviesCardList";
import Still from "../Still/Still";
import Preloader from "../Preloader/Preloader";

function Movies() {
  return (
    <div className='movies'>
      <SearchForm/>
      <MoviesCardList/>
      <Preloader/>
      <Still/>
    </div>
  )
}

export default Movies;
