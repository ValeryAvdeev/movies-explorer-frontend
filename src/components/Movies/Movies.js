import './Movies.css';
import SearchForm from "../SearchForm/SearchForm";
import MoviesCardList from "../MoviesCardList/MoviesCardList";
import Still from "../Still/Still";
import Preloader from "../Preloader/Preloader";
import {useEffect, useState} from "react";
import {moviesApi} from "../../utils/MoviesApi";
import {mainApi} from "../../utils/MainApi";

function Movies() {
  //фильмы с сервера
  const [films, setFilms] = useState(null);
  //фильмы которые показывают
  const [showFilm, setShowFilm] = useState(null);
  // сохраненные фильмы
  const [saveFilm, setSaveFilm] = useState(null);
  //кнопка поиска
  const [buttonFilms, setButtonFilms] = useState(null);

  // тумблер на короткометражки
  const [buttonShort, setButtonShort] = useState(false);

  const [isSearchInput, setIsSearchInput] = useState('');

  const [isSuccseed, setIsSuccseed] = useState(true);

  const [preloader, setPreloader] = useState(false);

  async function handleGetMovies(searchInput, toggle) {
    setPreloader(true);
    try {
      // const jwt = localStorage.getItem('jwt');
      // const cardLocal = localStorage.getItem(JSON.stringify('films'));
      const card = await moviesApi.getMovies();
      // console.log(card);
      let filterCard = card.filter(({nameRU}) => nameRU.toLowerCase().includes(searchInput.toLowerCase()));
      // console.log(filterCard)
      if (toggle) {
        localStorage.setItem('films', JSON.stringify(filterCard));
        localStorage.setItem('filmsInputSearch', searchInput);
        const shortFilm = filterCard.filter(({select}) => select <= 40);
        setButtonShort(shortFilm);
        setShowFilm(shortFilm);
        const spliceShow = shortFilm.splice(0, 6)
        localStorage.setItem('savedResults', JSON.stringify(spliceShow));
        setShowFilm(spliceShow);
        setFilms(spliceShow);
      } else {
        localStorage.setItem('films', JSON.stringify(filterCard));
        // console.log(localStorage.setItem('films', JSON.stringify(filterCard)))
        localStorage.setItem('filmsInputSearch', searchInput);

        // setFilmsButton
        setShowFilm(filterCard);

        const spliceShow = filterCard.splice(0, 6);
        // console.log(spliceShow)
        localStorage.setItem('savedResults', JSON.stringify(spliceShow));
        // console.log(localStorage.setItem('savedResults', JSON.stringify(spliceShow)));
        setShowFilm(spliceShow);
        setFilms(spliceShow);
        // console.log(setFilms)

      }
    } catch (e) {
      setFilms([]);
      // console.log(setFilms);
      localStorage.removeItem('films');
      localStorage.removeItem('filmsTumbler');
      localStorage.removeItem('filmsInputSearch');
    } finally {
      setPreloader(false);
    }
  }

  // console.log(`handleGetMovies ${typeof handleGetMovies}`);

  async function handleGetMoviesShort(searchInput, toggle) {
    console.log(searchInput);
    let filterCardShow = [];
    let filterCard = [];
    console.log(searchInput, toggle);
    handleGetMovies(searchInput, toggle);

    localStorage.setItem('films', JSON.stringify(filterCardShow.concat(filterCard)));
    localStorage.setItem('filmsTumbler', toggle);
    setShowFilm(filterCardShow);
    setFilms(filterCard);
  }

  const handleStill = () => {
    const newFilms = showFilm.concat(films.splice(0, 10));
    setShowFilm(newFilms);
  }

  async function savedFilmsToggle(film, choice) {
    console.log(choice);
    if (choice) {
      // const jwt = localStorage.getItem('token')
      const savedMovie = {
        country: film.country || 'none',
        director: film.director || 'none',
        duration: film.duration,
        year: film.year,
        description: film.description || 'none',
        nameRU: film.nameRU,
        nameEN: film.nameEN,
        image: `${film.image.url}` || 'https://www.youtube.com/',
        trailer: film.trailerLink || 'https://www.youtube.com',
        thumbnail: `${film.image.url}` || 'https://www.youtube.com/',
        movieId: film.id,
      }
      console.log(savedMovie);
      try {
        // await mainApi.postMoviesUser(savedMovie);
        const newFilm = await mainApi.getMoviesUser();
        setSaveFilm(newFilm);
      } catch (e) {
        setIsSuccseed(false);
        // информация об ошибки added setIsInfoToolTipOpened
        console.log(e);
      }
    } else {
      try {
        // const jwt = localStorage.getItem('jwt');
        // await mainApi.deleteMoviesUser(film._id);
        const newSave = await mainApi.getMoviesUser();
        console.log(newSave);
        setSaveFilm(newSave);
      } catch (e) {
        setIsSuccseed(false);
        // информация об ошибки added setIsInfoToolTipOpened
        console.log(e);
      }
    }
  }

  useEffect(() => {
    // const jwt = localStorage.getItem('jwt');
    mainApi.getMoviesUser()
      .then(card => {
        // console.log(card);
        setSaveFilm(card)
      })
      .catch(e => console.log(`ошибка в useEffect Movies при монтировании ${e}`));

    const localSaveFilms = localStorage.getItem('savedResult');
    const localFilm = localStorage.getItem('films');

    if (localSaveFilms) {
      const filterCard = JSON.stringify(localSaveFilms);
      const allFindFilm = JSON.stringify(localFilm);
      setButtonFilms(filterCard);
      setShowFilm(filterCard);
      setFilms(allFindFilm.splice(10));
      setPreloader(false);
    }
    const localFilmsSearch = localStorage.getItem('filmsInputSearch');
    const localFilmsTumbler = localStorage.getItem('filmsTumbler');
    if (localFilmsTumbler) {
      setButtonShort(localFilmsTumbler === 'true');
    }
    if (localFilmsSearch) {
      setIsSearchInput(localFilmsSearch);
    }
  }, []);

  // console.log(films);

  return (
    <div className='movies'>
      <SearchForm handleGetMovies={handleGetMovies}
                  buttonShort={buttonShort}
                  isSearchInput={isSearchInput}
                  handleGetMoviesShort={handleGetMoviesShort}
      />
      {preloader && <Preloader/>}
      {!preloader && films !== null && saveFilm !== null && showFilm !== null &&
      <MoviesCardList filmsResult={films}
        // handleGetMovies={handleGetMovies}
        // buttonFilms={buttonFilms}
                      films={showFilm}
                      savedFilmsToggle={savedFilmsToggle}
                      saveFilm={saveFilm}
      />
      }
      <Still handleStill={handleStill}
        // savedMoviesToggle
      />
    </div>
  )
}

export default Movies;
