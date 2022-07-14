import {MOVIES_URL} from "./constant";

class MoviesApi {
  constructor() {
  }
}

export const moviesApi = new MoviesApi({
  baseUrl: MOVIES_URL,
  headers: {'Content-Type': 'application/json'}
});
