import logo from "../../images/logo.svg";
import {Link} from "react-router-dom";

function Register() {
  return (
    <div className='authentication'>
      <img src={logo} alt="логотип" className='logo logo_sign'/>
      <h2 className='authentication__title'>Добро пожаловать!</h2>
      <form
        className='authentication__form'
        // onSubmit={handleSubmit}
      >
        <label className="authentication__label">Имя
          <input
            type="text"
            name="userName"
            minLength="2"
            maxLength="30"
            className="authentication__input"
            id="username"
            required
          />
          <span className="authentication__error"></span>
        </label>
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
        <button type="submit" className="authentication__button">
          Зарегистрироваться
        </button>
      </form>
      <div className='authentication__singnin'>
        <p className='authentication__subtitle'>
          Уже зарегистрированы? <Link
          to='/signin'
          className='authentication__login-link'
        >Войти</Link>
        </p>
      </div>
    </div>
  )
}

export default Register;
