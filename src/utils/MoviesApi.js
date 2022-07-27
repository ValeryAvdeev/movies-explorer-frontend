import {MOVIES_URL} from "./constant";

class MoviesApi {
  constructor(baseUrl) {
    this._baseUrl = baseUrl;
  }

  get _headers() {
    return {
      'Content-Type': 'application/json',
      // authorization: `Bearer ${localStorage.getItem("jwt")}`,
    }
  }

  _handleResponse = (response) => {
    if (response.ok) {
      return response.json();
    }
    return Promise.reject(`Ошибка ${response.status}`);
  }

  getAllMovies() {
    return fetch(`${this._baseUrl}`, {
      headers: this._headers,
    })
      .then(this._handleResponse)
  }
}

export const moviesApi = new MoviesApi(MOVIES_URL);
