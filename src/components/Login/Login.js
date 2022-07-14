import './Login.css';
import logo from "../../images/logo.svg";
import {Link} from "react-router-dom";

function Login() {
  return (
    <div className='authentication'>
      <img src={logo} alt="логотип" className='logo logo_sign'/>
      <h2 className='authentication__title'>Рады видеть!</h2>
      <form
        className='authentication__form'
        // onSubmit={handleSubmit}
      >
        <label className="authentication__label">E-mail
          <input
            type="email"
            name="email"
            minLength="5"
            maxLength="30"
            className="authentication__input"
            id="userEmail"
            required
          />
          <span className="authentication__error"></span>
        </label>
        <label className="authentication__label">Пароль
          <input
            type="password"
            name="password"
            className="authentication__input"
            id="password"
            minLength="4"
            maxLength="40"
            required
          />
          <span className="authentication__error">Что-то пошло не так...</span>
        </label>
        <Link to='/movies'>
          <button type="submit" className="authentication__button">
            Войти
          </button>
        </Link>
      </form>
      <div className='authentication__singnin'>
        <p className='authentication__subtitle'>
          Ещё не зарегистрированы?<Link
          to='/signup'
          className='authentication__login-link'
        >Регистрация</Link>
        </p>
      </div>
    </div>
  )
}

export default Login;
