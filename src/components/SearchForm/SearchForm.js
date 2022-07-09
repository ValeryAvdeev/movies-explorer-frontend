import './SearchForm.css';
import icon from '../../images/icon_search.svg';

function SearchFrom() {
  return (
    <div className='search'>
      <div className='search__content'>
        <form className='search__form'>
          <img src={icon} alt='иконка поиска' className='search__span'/>
          <input 
            className='search__input'
            placeholder='Фильм'
            name='searchInput'
            type='text'
          />
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
