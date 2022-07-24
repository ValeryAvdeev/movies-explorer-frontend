import MoviesCardList from '../MoviesCardList/MoviesCardList';
import SearchFrom from '../SearchForm/SearchForm';
import './SavedMovies.css';
import {useEffect, useState} from "react";
import {mainApi} from "../../utils/MainApi";
import Preloader from "../Preloader/Preloader";

function SavedMovies() {
  const [films, setFilms] = useState(null);
  const [preloader, setPreloader] = useState(false);
  const [filmsToggle, setFilmsToggle] = useState(false);
  const [filmsInputSearch, setFilmsInputSearch] = useState('');
  const [filmsShow, setFilmsShow] = useState([]);

  const [filmsWhithToggle, setFilmsWhithToggle] = useState([]);
  const [filmsShowWithToggle, setFilmsShowWithToggle] = useState([]);

  async function handleGetMovies(inputSearch, toggle) {
    setPreloader(true);
    try {
      const film = films;
      let filterFilm = film.filter(({nameRU}) => {
        nameRU.toLowerCase().includes(inputSearch.toLowerCase())
      });
      if (toggle) {
        filterFilm.filter(({duration}) => duration <= 40);
        setFilmsShow(filterFilm);
      }
      if (inputSearch) {
        localStorage.setItem('savedFilms', JSON.stringify(filterFilm));
        localStorage.setItem('savedFilmsToggle', toggle);
        localStorage.setItem('savedFilmsInputSearch', inputSearch);
      } else {
        localStorage.setItem('savedFilms');
        localStorage.setItem('savedFilmsToggle');
        localStorage.setItem('savedFilmsInputSearch');
      }
    } catch (e) {
      setFilms([]);
      localStorage.removeItem('savedFilms');
      localStorage.removeItem('savedFilmsToggle');
      localStorage.removeItem('savedFilmsInputSearch');
      console.log(e)
    } finally {
      setPreloader(false)
    }
  }

  async function handleGetMoviesToggle(inputSearch, toggle) {
    let filterFilmShow = [];
    let filterFilm = [];

    if (toggle) {
      setFilmsShowWithToggle(filmsShow);
      setFilmsWhithToggle(films);

      filterFilmShow = filmsShow.filter(({duration}) => duration <= 40);
      filterFilm = films.filter(({duration}) => duration <= 40);

      handleGetMovies(inputSearch, toggle);
    } else {
      filterFilmShow = filmsShowWithToggle;
      filterFilm = filmsWhithToggle;

      handleGetMovies(inputSearch, toggle);
    }

    localStorage.setItem('saveFilmsToggle', toggle);

    handleGetMovies(inputSearch, toggle);

    setFilmsShow(filterFilmShow);
    setFilms(filterFilm);
  }

  async function saveFilmsToggle(film, choice) {
    if (!choice) {
      try {
        await mainApi.deleteMoviesUser(film._id);
        const newFilm = await mainApi.postMoviesUser();
        setFilmsShow(newFilm);
      } catch (e) {
        console.log(e);
      }
    }
  }

  // useEffect(() => {
  //   const localFilm = localStorage.setItem('savedFilms', films);
  //   if (localFilm) {
  //     setFilms(JSON.stringify(localFilm));
  //   }
  // }, [])

  console.log(films);

  useEffect(() => {
    mainApi.getMoviesUser()
      .then(card => {
        setFilms(card);
        setFilmsShow(card);
      })
      .catch(e => console.log(e));
  })

  return (
    <div className='movies'>
      <SearchFrom handleGetMovies={handleGetMovies}
                  filmsToggle={filmsToggle}
                  filmsInputSearch={filmsInputSearch}
                  handleGetMoviesShort={handleGetMoviesToggle}
      />
      {preloader && <Preloader/>}
      {!preloader && films !== null &&
      <MoviesCardList filmsResult={[]}
                      savedFilmsToggle={saveFilmsToggle}
                      films={filmsShow}
      />
      }
    </div>
  )
}

export default SavedMovies;

