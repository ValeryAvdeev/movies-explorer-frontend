import {MAIN_URL, MOVIES} from "./constant";

class MainApi {
  constructor(data) {
    this._baseUrl = data.baseUrl;
  }

  // get _headers() {
  //   return {
  //     'Content-Type': 'application/json',
  //     authorization: `Bearer ${localStorage.getItem("jwt")}`,
  //   }
  // }

  _handleResponse = (response) => {
    if (response.ok) {
      return response.json();
    }
    return Promise.reject(`Ошибка ${response.status}`);
  }

  // _checkResponseAuth = (res) => {
  //   if (res.ok) {
  //     return res.json();
  //   }
  //   return res.json().then((data) => {
  //     const {statusCode} = data;
  //     const {message} = data.message[0].messages[0]
  //     const error = new Error(message || 'Что-то пошло не так');
  //     error.status = statusCode;
  //     throw error;
  //   });
  // }

  getToken(token) {
    return fetch(`${this._baseUrl}/users/me`, {
      method: 'GET',
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`
      }
    })
      .then((res) => this._handleResponse(res))
  }

  signup(name, password, email) {
    return fetch(`${this._baseUrl}/signup`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({name, password, email}),
    })
      .then((res) => this._handleResponse(res));
  }

  signin(password, email) {
    return fetch(`${this._baseUrl}/signin`, {
      method: 'POST',
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({password, email})
    })
      .then((res) => this._handleResponse(res))
      .then((data) => {
        if (data.token) {
          localStorage.setItem("jwt", data.token);
          return data;
        }
      });
  }

  getUserInfo(token) {
    return fetch(`${this._baseUrl}/users/me`, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`
      },
    })
      .then((res) => this._handleResponse(res));
  }

  editProfile(userInfo, token) {
    return fetch(`${this._baseUrl}/users/me`, {
      method: "PATCH",
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`
      },
      body: JSON.stringify(userInfo),
    })
      .then((res) => this._handleResponse(res))
  }

  getMovies(token) {
    return fetch(`${this._baseUrl}/movies`, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`
      },
    })
      .then(this._handleResponse)
  }

  postMovies(movie, token) {
    return fetch(`${this._baseUrl}/movies`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`
      },
      body: JSON.stringify({
        country: movie.country,
        director: movie.director,
        duration: movie.duration,
        year: movie.year,
        description: movie.description,
        image: `${MOVIES}${movie.image.url}`,
        trailerLink: movie.trailerLink,
        thumbnail: `${MOVIES}${movie.image.formats.thumbnail.url}`,
        movieId: movie.id,
        nameRU: movie.nameRU,
        nameEN: movie.nameEN,
      }),
    })
      .then((res) => this._handleResponse(res));
  }

  deleteMovies(movieId, token) {
    return fetch(`${this._baseUrl}/movies/${movieId}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`
      },
    })
      .then((res) => this._handleResponse(res));
  }
}

export const mainApi = new MainApi({
  baseUrl: MAIN_URL
})
