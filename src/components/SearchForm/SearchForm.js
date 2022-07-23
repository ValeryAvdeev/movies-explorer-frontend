import './SearchForm.css';
import {useEffect, useState} from "react";

// Фильм короткометражным до 40 минут включительно.
function SearchFrom(props) {
  const [input, setInput] = useState('');
  const [toggle, setToggle] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    props.handleGetMovies(input, toggle);
  };
  console.log(props.buttonShort);

  const handleToggle = () => {
    const newToggle = !toggle;
    setToggle(newToggle);
    props.handleGetMoviesShort(input, newToggle);
  };

  const handleInput = (e) => setInput(e.target.value);

  useEffect(() => {
    setToggle(props.buttonShort);
    setInput(props.isSearchInput);
  }, [props.buttonShort, props.isSearchInput]);

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
