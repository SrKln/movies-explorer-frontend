import { FULL_URL_MOVIE } from "../constants";

const checkStatus = (res) => {
  if (res.ok) {
    return res.json();
  }
  return Promise.reject(`Ошибка: ${res.status}`);
};

const request = (url, options) => {
  return fetch(url, options)
    .then(res => checkStatus(res))
};

export const findAllMovies = () => {
  return request(FULL_URL_MOVIE, {
    headers: {
      'Content-Type': 'application/json',
    }
  })
};
