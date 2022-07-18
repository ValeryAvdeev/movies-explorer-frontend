import './Profile.css';
import {Link} from "react-router-dom";
import {useContext} from "react";
import {CurrentUserContext} from "../../contexts/CurrentUserContext";

function Profile(onSubmitLogOut) {
  const currentUser = useContext(CurrentUserContext);

  return (
    <div className='profile'>
      <h2 className='profile__name'>
        Привет, {currentUser.name}!
      </h2>
      <form className='profile__form'>
        <div className="profile__conteiner">
          <label className="profile__label">Имя</label>
          <input
            type="name"
            name="name"
            minLength="5"
            maxLength="30"
            className="profile__input"
            id="userEmail"
            value={currentUser.name}
            required
          />
        </div>
        <div className="profile__conteiner">
          <label className="profile__label">E-mail</label>
          <input
            type="email"
            name="email"
            className="profile__input"
            id="password"
            minLength="4"
            maxLength="40"
            value={currentUser.email}
            required
          />
        </div>
        <button type="submit" className="profile__button">
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
