import './Register.css';
import logo from "../../images/logo.svg";
import {Link} from "react-router-dom";
import {useState} from "react";
import {useForm} from "react-hook-form";

function Register(props) {
  const {
    register, formState: {
      errors, isValid
    }
  } = useForm({mode: "all"});

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleName = (e) => setName(e.target.value);
  const handleEmail = (e) => setEmail(e.target.value);
  const handlePassoword = (e) => setPassword(e.target.value);

  const handleSubmit = (e) => {
    e.preventDefault();
    props.signUp({name, email, password});
  }

  return (
    <div className='authentication'>
      <a href='/'>
        <img src={logo} alt="логотип" className='logo logo_sign'/>
      </a>
      <h2 className='authentication__title'>Добро пожаловать!</h2>
      <form className='authentication__form'
            onSubmit={handleSubmit}
      >
        <label className="authentication__label">Имя
          <input type="text"
                 name="name"
                 className="authentication__input"
                 value={name || ''}
                 {...register("name", {
                   required: 'поле для обязательного заполнения',
                   onChange: handleName,
                   minLength: {
                     value: 2,
                     message: 'Минимум 2 символа'
                   },
                   maxLength: {
                     value: 30,
                     message: 'Максимум 30 символа'
                   }
                 })}
          />
          <span className="authentication__error">{errors.name?.message}</span>
        </label>
        <label className="authentication__label">E-mail
          <input type="email"
                 name="email"
                 className="authentication__input"
                 value={email || ''}
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
          <input type="password"
                 name="password"
                 className="authentication__input"
                 value={password || ''}
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
        <button type="submit"
                className={isValid ? `authentication__button` : `authentication__button_disabled`}
                disabled={!isValid}
        >
          Зарегистрироваться
        </button>
        {/*Если в ответе на этот запрос сервер возвращает ошибку, сообщение
        о ней должно располагаться над кнопкой «Зарегистрироваться».*/}
      </form>
      <p className='authentication__span'>{props.message}</p>
      <div className='authentication__singnin'>
        <p className='authentication__subtitle'>
          Уже зарегистрированы? 
          <Link to='/signin'
                className='authentication__login-link'
          >Войти</Link>
        </p>
      </div>
    </div>
  )
}

export default Register;
