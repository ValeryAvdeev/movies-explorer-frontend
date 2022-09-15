import './SearchForm.css';
import {useEffect, useState} from "react";
import {useLocation} from "react-router-dom";

// Фильм короткометражным до 40 минут включительно.
function SearchFrom({
                      onSubmit, tumblerClick, searchKeyword, isShort
                    }) {
  const location = useLocation();

  const [movie, setMovies] = useState('');

  useEffect(() => {
    if (searchKeyword && location.pathname === "/movies") {
      setMovies(searchKeyword);
    }
  }, []);

  const handleChange = (event) => {
    setMovies(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    onSubmit(movie);
  };

  return (
    <div className='search'>
      <div className='search__content'>
        <form className='search__form'
              onSubmit={handleSubmit}
              noValidate
        >
          <div className='search__icon search__icon_loupe'>
            <input
              className='search__input'
              placeholder='Фильм'
              name='searchInput'
              type='text'
              value={movie}
              onChange={handleChange}
              required
            />
          </div>
          <button
            className='search__button'
            type='submit'
          />
        </form>
        <div className="search__switch">
          <input type="checkbox"
                 className='search__toggle'
            //  value={toggle}
                 checked={isShort}
                 onChange={tumblerClick}
          />
          <p className='search__text'>Короткометражки</p>
        </div>
        {/* <span className='search__error'>Нужно ввести ключевое слово</span> */}

      </div>
    </div>
  )
}

export default SearchFrom;
