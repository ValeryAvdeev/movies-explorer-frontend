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
    props.signUp(name, email, password);
  }

  return (
    <div className='authentication'>
      <img src={logo} alt="логотип" className='logo logo_sign'/>
      <h2 className='authentication__title'>Добро пожаловать!</h2>
      <form className='authentication__form'
            onSubmit={handleSubmit}
      >
        <label className="authentication__label">Имя
          <input type="text"
                 name="name"
                 className="authentication__input"
                 value={name || ''}
            // id="username"
                 {...register("name", {
                   required: 'name',
                   onChange: handleName,
                   minLength: {
                     value: 2,
                     message: 'Минимум 2 симлова'
                   },
                   maxLength: {
                     value: 30,
                     message: 'Максимум 30 симлова'
                   }
                 })}
          />
          <span className="authentication__error">{errors.name?.message}</span>
        </label>
        <label className="authentication__label">E-mail
          <input type="email"
                 name="email"
                 minLength="5"
                 maxLength="30"
                 className="authentication__input"
                 id="userEmail"
                 required
                 onChange={handleEmail}
          />
          <span className="authentication__error"></span>
        </label>
        <label className="authentication__label">Пароль
          <input type="password"
                 name="password"
                 className="authentication__input"
                 id="password"
                 minLength="4"
                 maxLength="40"
                 required
                 onChange={handlePassoword}
          />
          <span className="authentication__error"></span>
          {/*Что-то пошло не так...*/}
        </label>
        <button type="submit" className="authentication__button">
          Зарегистрироваться
        </button>
        {/*Если в ответе на этот запрос сервер возвращает ошибку, сообщение
        о ней должно располагаться над кнопкой «Зарегистрироваться».*/}
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
