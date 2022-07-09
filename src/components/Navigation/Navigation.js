import './Navigation.css';
import logo from "../../images/logo.svg";
import {Link} from "react-router-dom";
import iconAccount from '../../images/icon_account.svg';

function Navigation() {
  return (
    <div className="navigation-header">
      <img src={logo} alt="логотип" className='logo'/>
      <div className="navigation-header__links">
        <Link to='/movies' className='navigation-header__link'>
          <p className="navigation-header__link-text">Фильмы</p>
        </Link>
        <Link to='/saved-movies' className='navigation-header__link'>
          <p className="navigation-header__link-text">Сохранённые фильмы</p>
        </Link>
        <Link
          to='/profile'
          className='navigation-header__link'
        >
          <img src={iconAccount} alt="изображение аккаунта" className='navigation-header__icon'/>
          Аккаунт
        </Link>
      </div>
    </div>
  )
}

export default Navigation;
