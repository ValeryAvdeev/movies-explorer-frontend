import './Navigation.css';
import logo from "../../images/logo.svg";
import {Link, NavLink} from "react-router-dom";
import iconAccount from '../../images/icon_account.svg';
import {useState} from "react";

function Navigation() {
  const [menuOpen, setMenuOpen] = useState(false);

  const handleMenu = () => {
    setMenuOpen(!menuOpen);
  }

  // const closeBurger = () => {
  //   setMenuOpen(false)
  // }

  return (
    <div className="nav-header">
      <img src={logo}
           alt="логотип" className='logo'
      />
      <div className={menuOpen ? 'nav-header__burger-overlay' : ''}
           onClick={handleMenu}
      />
      <nav className={`nav-header__links ${menuOpen ? 'nav-header__burger-link' : ''}`}>
        <button className="nav-header__burger-close" onClick={handleMenu}/>
        <Link to='/'
              className='nav-header__link-text nav-header__link_toggle'
        >
          Главное
        </Link>
        <NavLink to='/movies'
                 className='nav-header__link'
                 activeclassname='active'
        >
          Фильмы
        </NavLink>
        <NavLink to='/saved-movies'
                 className='nav-header__link'
                 activeclassname='active'
        >
          Сохранённые фильмы
        </NavLink>
        <NavLink to='/profile'
                 className='nav-header__link'
                 activeclassname='nav-header__link_active'
        >
          <img src={iconAccount}
               alt="изображение аккаунта"
               className='nav-header__icon'/>
          Аккаунт
        </NavLink>
      </nav>
      <button type='button'
              className='nav-header__burger'
              onClick={handleMenu}
      >
        <span className="nav-header__burger-span"/>
      </button>
    </div>
  )
}

export default Navigation;
