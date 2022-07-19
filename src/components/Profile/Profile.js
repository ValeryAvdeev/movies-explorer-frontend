import './Profile.css';
import {Link} from "react-router-dom";
import {useContext, useEffect, useState} from "react";
import {CurrentUserContext} from "../../contexts/CurrentUserContext";
import {useForm} from "react-hook-form";

function Profile(onSubmitLogOut, patchUser) {
  const currentUser = useContext(CurrentUserContext);
  console.log(currentUser)

  const [email, setEmail] = useState('');
  const [name, setName] = useState('');

  const handleEmail = (e) => setEmail(e.target.value);
  const handleName = (e) => setName(e.target.value);

  const {
    register, formState: {
      isValid
    }
  } = useForm({mode: "all"});

  const handleSubmit = (e) => {
    e.preventDefault();

    patchUser({
      email: email,
      name: name
    })
  }

  useEffect(() => {
    if (currentUser) {
      setEmail(currentUser.email);
      setName(currentUser.name);
    }
  }, [currentUser])

  return (
    <div className='profile'>
      <h2 className='profile__name'>
        Привет, {currentUser.name}!
      </h2>
      <form className='profile__form'
            onSubmit={handleSubmit}
      >
        <div className="profile__conteiner">
          <label className="profile__label">Имя</label>
          <input
            type="name"
            name="name"
            className="profile__input"
            value={currentUser.name || ''}
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
        </div>
        <div className="profile__conteiner">
          <label className="profile__label">E-mail</label>
          <input
            type="email"
            name="email"
            className="profile__input"
            value={currentUser.email || ''}
            {...register("email", {
              required: 'поле для обязательного заполнения',
              onChange: handleEmail,
              pattern: {
                value: /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
                message: 'Введите валидный email'
              }
            })}
            required
          />
        </div>
        <button type="submit" className={isValid ? `profile__button` : `profile__button_disabled`}>
          Редактировать
        </button>
      </form>
      <Link
        to='/'
        className='profile__link'
        onClick={onSubmitLogOut}
        type='button'
      >
        Выйти из аккаунта
      </Link>
    </div>
  )
}

export default Profile;
