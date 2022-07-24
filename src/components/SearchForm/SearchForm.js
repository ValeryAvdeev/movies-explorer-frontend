import './SearchForm.css';
import {useEffect, useState} from "react";

// Фильм короткометражным до 40 минут включительно.
function SearchFrom({
                      handleGetMovies,
                      buttonShort,
                      isSearchInput,
                      handleGetMoviesShort
                    }) {
  const [input, setInput] = useState('');
  const [toggle, setToggle] = useState(false);

  // console.log(typeof handleGetMovies);
  // console.log(buttonShort);

  const handleSubmit = (e) => {
    e.preventDefault();
    handleGetMovies(input, toggle);
  };

  const handleToggle = () => {
    const newToggle = !toggle;
    setToggle(newToggle);
    handleGetMoviesShort(input, newToggle);
  };

  const handleInput = (e) => setInput(e.target.value);

  useEffect(() => {
    setToggle(buttonShort);
    setInput(isSearchInput);
  }, [buttonShort, isSearchInput]);

  return (
    <div className='search'>
      <div className='search__content'>
        <form className='search__form'
              onSubmit={handleSubmit}
        >
          <div className='search__icon search__icon_loupe'>
            <input
              className='search__input'
              placeholder='Фильм'
              name='searchInput'
              type='text'
              value={input}
              onChange={handleInput}
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
                 value={toggle}
                 checked={toggle}
                 onChange={handleToggle}
          />
          <p className='search__text'>Короткометражки</p>
        </div>
      </div>
    </div>
  )
}

export default SearchFrom;
