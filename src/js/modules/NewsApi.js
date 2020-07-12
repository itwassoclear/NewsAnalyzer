import {MS_IN_DAY, inputElem} from "../constants/constants.js";

// класс апи для новостей
export default class NewsApi {
  constructor (SERVER_URL, API_KEY) {
    this.SERVER_URL = SERVER_URL;
    this.API_KEY = API_KEY;
    this.getNews = this.getNews.bind(this);

    let currentDay = new Date();
    let prevSixDays = MS_IN_DAY * 6;
    let lastDay = new Date(currentDay.getTime() - prevSixDays);
    this.from = lastDay.toISOString().slice(0, 10);
    this.to = currentDay.toISOString().slice(0,10);
  }

  getNews(request) {
    return fetch(`${this.SERVER_URL}q=${request}&from=${this.from}&to=${this.to}&pageSize=100&sortBy=publishedAt&apiKey=${this.API_KEY}&language=ru`, {
      method: 'GET',
    })
    .then(res => {
      if (res.ok) {
        inputElem.removeAttribute('disabled');
        return Promise.resolve(res.json());
      }
      return Promise.reject(`Ошибка: ${res.status}`);
    })
  }
}