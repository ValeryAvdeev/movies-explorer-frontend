import './Profile.css';
import {Link} from "react-router-dom";
import {useContext, useEffect, useState} from "react";
import {CurrentUserContext} from "../../contexts/CurrentUserContext";

function Profile({
                   onUpdateUser, signOut, infoMessage
                 }) {
  const currentUser = useContext(CurrentUserContext);

  const [edit, setEdit] = useState(false);
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');

  const handleEmail = (e) => setEmail(e.target.value);
  const handleName = (e) => setName(e.target.value);

  const handleSubmit = (e) => {
    e.preventDefault();

    onUpdateUser({
      email: email,
      name: name
    });
    setEdit(false);
  }

  useEffect(() => {
    setEmail(currentUser.email);
    setName(currentUser.name);
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
          <input type="name"
                 name="name"
                 className="profile__input"
                 value={name}
                 onChange={handleName}
                 required
          />
          {/*<span className="authentication__error">{errors.name?.message}</span>*/}
        </div>
        <div className="profile__conteiner">
          <label className="profile__label">E-mail</label>
          <input type="email"
                 name="email"
                 className="profile__input"
                 value={email}
                 onChange={handleEmail}
                 required

          />
          {/*<span className="authentication__error">{errors.email?.message}</span>*/}
        </div>
        <button type="submit"
                className={!(name !== currentUser.name || email !== currentUser.email) || (name === '' || email === '') ?
                  'profile__button_disabled' : 'profile__button'}
          // disabled={!(name !== currentUser.name || email !== currentUser.email) ?
          //   'profile__button_disabled' : ''}
        >
          Редактировать
        </button>
      </form>
      <p>{infoMessage}</p>
      <Link
        to='/'
        className='profile__link'
        onClick={signOut}
        type='button'
      >
        Выйти из аккаунта
      </Link>
    </div>
  )
}

export default Profile;
