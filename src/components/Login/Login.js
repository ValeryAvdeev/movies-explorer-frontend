import './Login.css';
import logo from "../../images/logo.svg";
import {Link} from "react-router-dom";
import {useForm} from "react-hook-form";
import {useState} from "react";

function Login(props) {
  const {
    register, formState: {
      errors, isValid
    }
  } = useForm({mode: "all"});

  const [email, setEmail] = useState('');
  const [password,  setPassword] = useState('');

  const handleEmail = (e) => setEmail(e.target.value);
  const handlePassoword = (e) => setPassword(e.target.value);

  const handleSubmit = (e) => {
    e.preventDefault();
    props.signIn({email, password});
  }
  return (
    <div className='authentication'>
      <a href='/'>
        <img src={logo} alt="логотип" className='logo logo_sign'/>
      </a>
      <h2 className='authentication__title'>Рады видеть!</h2>
      <form
        className='authentication__form'
        onSubmit={handleSubmit}
      >
        <label className="authentication__label">E-mail
          <input
            type="email"
            name="email"
            value={email || ''}
            className="authentication__input"
            {...register("email", {
                  required: 'поле для обязательного заполнения',
                  onChange: handleEmail,
                  pattern: {
                    value: /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
                    message: 'Введите валидный email'
                  }
            })}
          />
          <span className="authentication__error">{errors.email?.message}</span>
        </label>
        <label className="authentication__label">Пароль
          <input
            type="password"
            name="password"
            className="authentication__input"
            {...register('password', {
              required: 'поле для обязательного заполнения',
              onChange: handlePassoword,
              minLength: {
                value: 4,
                message: 'пароль должен быть минимун 4 символа'
              }
            })}
          />
          <span className="authentication__error">{errors.password?.message}</span>
        </label>
        <p className='authentication__span'>{props.infoMessage}</p>
        <button type="submit"
                className={isValid ?
                  `authentication__button` :
                  `authentication__button_disabled`}
                disabled={!isValid}
        >
          Войти
        </button>
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
