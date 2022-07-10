import './SearchForm.css';

function SearchFrom() {
  return (
    <div className='search'>
      <div className='search__content'>
        <form className='search__form'>
          <div className='search__icon search__icon_loupe'>
            <input
              className='search__input'
              placeholder='Фильм'
              name='searchInput'
              type='text'
            />
          </div>
          <button
            className='search__button'
            type='submit'
          />
        </form>
        <div className="search__switch">
          <input type="checkbox" className='search__toggle'/>
          <p className='search__text'>Короткометражки</p>
        </div>
      </div>
    </div>
  )
}

export default SearchFrom;
