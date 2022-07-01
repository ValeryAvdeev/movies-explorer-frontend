import './Header.css';
import logo from '../../images/logo.svg';
import {Link} from 'react-router-dom';


function Header(props) {
  return (
    <header className="header">
      <img src={logo} alt="логотип" className='header__logo'/>
      <div className="header__links">
        <Link to='/signup' className='header__link'>
          <p className="header__link-reg">зугистрация</p>
        </Link>
        <Link
          to='/signin'
          className='header__link'
          type='button'
          onClick={props.onClick}
        ></Link>
      </div>
    </header>
  )
};

export default Header;
