import {MAIN_URL} from "./constant";

class MainApi {
  constructor(data) {
    this._baseUrl = data.baseUrl;
  }

  get _headers() {
    return {
      'Content-Type': 'application/json',
      authorization: `Bearer ${localStorage.getItem("jwt")}`,
    }
  }

  _handleResponse = (response) => {
    if (response.ok) {
      return response.json();
    }
    return Promise.reject(`Ошибка ${response.status}`);
  }

  _checkResponseAuth = (res) => {
    if (res.ok) {
      return res.json();
    }
    return res.json().then((data) => {
      const {statusCode} = data;
      const {message} = data.message[0].messages[0]
      const error = new Error(message || 'Что-то пошло не так');
      error.status = statusCode;
      throw error;
    });
  }

  signup(password, name, email) {
    return fetch(`${this._baseUrl}/signup`, {
      method: 'POST',
      headers: this._headers,
      body: JSON.stringify({name, password, email})
    })
      .then(this._checkResponseAuth)
  }

  signin(email, password) {
    return fetch(`${this._baseUrl}/signin`, {
      method: 'POST',
      headers: this._headers,
      body: JSON.stringify({email, password})
    })
      .then(this._checkResponseAuth)
  }

  getUser() {
    return fetch(`${this._baseUrl}/users/me`, {
      headers: this._headers,
    })
      .then(this._handleResponse)
  }

  patchUser({email, name}) {
    return fetch(`${this._baseUrl}/users/me`, {
      method: 'PATCH',
      headers: this._headers,
      body: JSON.stringify({
        email,
        name
      })
    })
      .then(this._handleResponse)
  }

  getMoviesUser() {
    return fetch(`${this._baseUrl}/movies`, {
      headers: this._headers,
    })
      .then(this._handleResponse)
  }

  postMoviesUser(country,
                 director,
                 duration,
                 year,
                 description,
                 image,
                 trailerLink,
                 thumbnail,
                 movieId,
                 nameRU,
                 nameEN,) {
    return fetch(`${this._baseUrl}/movies`, {
      method: 'POST',
      headers: this._headers,
      body: JSON.stringify({
        country,
        director,
        duration,
        year,
        description,
        image,
        trailerLink,
        thumbnail,
        movieId,
        nameRU,
        nameEN,
      })
    })
      .then(this._handleResponse)
  }

  deleteMoviesUser(_id) {
    return fetch(`${this._baseUrl}/movies/${_id}`, {
      method: 'DELETE',
      headers: this._headers,
    })
      .then(this._handleResponse)
  }
}

export const mainApi = new MainApi({
  baseUrl: MAIN_URL
})
