import './Navigation.css';
import logo from "../../images/logo.svg";
import {Link} from "react-router-dom";
import iconAccount from '../../images/icon_account.svg';

function Navigation() {
  return (
    <div className="nav-header">
      <img src={logo} alt="логотип" className='logo'/>
      <nav className="nav-header__links">
        <Link to='/movies' className='nav-header__link'>
          <p className="nav-header__link-text">Фильмы</p>
        </Link>
        <Link to='/saved-movies' className='nav-header__link'>
          <p className="nav-header__link-text">Сохранённые фильмы</p>
        </Link>
        <Link
          to='/profile'
          className='nav-header__link'
        >
          <img src={iconAccount} alt="изображение аккаунта" className='nav-header__icon'/>
          Аккаунт
        </Link>
      </nav>
      <button type='button' className='nav-header__burger'>
        <span className="nav-header__burger-span"/>
      </button>
    </div>
  )
}

export default Navigation;
