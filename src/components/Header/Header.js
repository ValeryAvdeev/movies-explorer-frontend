import './Header.css';
import logo from '../../images/logo.svg';
import {Link} from 'react-router-dom';
import Navigation from '../Navigation/Navigation';

// import {CurrentUserContext} from "../../contexts/CurrentUserContext";

function Header({isLoading}) {
  // console.log(isLoading);
  return (
    <>
      {isLoading ?
        (<header className="header">
          <a href='/' className='header__logo-link'>
            <img src={logo} alt="логотип" className='logo'/>
          </a>
          <div className="header__links">
            <Link to='/signup' className='header__link'>
              <p className="header__link-text">Регистрация</p>
            </Link>
            <Link
              to='/signin'
              className='header__link'
            >
              <button className="header__button">Войти</button>
            </Link>
          </div>
        </header>) : (<Navigation/>)
      }
    </>
  )
};

export default Header;
