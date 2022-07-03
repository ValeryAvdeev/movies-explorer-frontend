import './NavTab.css';
import {Link} from "react-router-dom";

function navTab() {
  return (
    <nav className='navTab'>
      <Link
        to='#abuotProject'
        className='navTab__link'
        type='button'
      >
        <button className='navTab__button' type='button'>О проекте</button>
      </Link>
      <Link
        to='#techs'
        className='navTab__link'
        type='button'
      >
        <button className='navTab__button' type='button'>Технологии</button>
      </Link>
      <Link
        to='#me'
        className='navTab__link'
        type='button'
      >
        <button className='navTab__button' type='button'>Студент</button>
      </Link>
    </nav>
  )
};

export default navTab;
