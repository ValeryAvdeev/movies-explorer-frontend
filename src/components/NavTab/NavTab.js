import './NavTab.css';

function navTab() {
  return (
    <nav className='navTab'>
      <ul className='navTab__links'>
        <li className="navTab__item">
          <a href='#aboutProject' className='navTab__link' type='button'>О проекте</a>
        </li>
        <li className="navTab__item">
          <a href='#techs' className='navTab__link' type='button'>Технологии</a>
        </li>
        <li className="navTab__item">
          <a href='#me' className='navTab__link' type='button'>Студент</a>
        </li>
      </ul>

      {/*<Link*/}
      {/*  to='#aboutProject'*/}
      {/*  className='navTab__link'*/}
      {/*  type='button'*/}
      {/*>*/}
      {/*  <a className='navTab__button' type='button'>О проекте</a>*/}
      {/*</Link>*/}
      {/*<Link*/}
      {/*  to='#techs'*/}
      {/*  className='navTab__link'*/}
      {/*  type='button'*/}
      {/*>*/}
      {/*  <button className='navTab__button' type='button'>Технологии</button>*/}
      {/*</Link>*/}
      {/*<Link*/}
      {/*  to='#me'*/}
      {/*  className='navTab__link'*/}
      {/*  type='button'*/}
      {/*>*/}
      {/*  <button className='navTab__button' type='button'>Студент</button>*/}
      {/*</Link>*/}
    </nav>
  )
};

export default navTab;
