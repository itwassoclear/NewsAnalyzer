import {statisticsTitle, statisticsMonth} from '../constants/constants.js';
import getWeekDay from '../utils/getWeekDay.js';

export default class Statistics {
  constructor(data, request) {
    this.data = data;
    this.request = request;
  }
  // меняет заголовок
  setTitle() {
    statisticsTitle.textContent = this.request;
  }
  // количество новостей за неделю
  setNewsInWeek() {
    const newsInWeek = document.querySelector('.output__numbers_in-week');
    newsInWeek.textContent = this.data.totalResults;
  }
  // количество новостей в заголовках
  setNewsInTitle() {
    const newsInTitle = document.querySelector('.output__numbers_in-title');
    const mentions = this.data.articles.filter((item) => {
      return item.title.toLowerCase().includes(this.request.toLowerCase());
    })
    newsInTitle.textContent = mentions.length;
  }
  // месяц в шапке таблицы аналитики
  setMonth() {
    let monthInfo = new Date(this.data.articles[0].publishedAt); 
    statisticsMonth.textContent = '(' + monthInfo.toLocaleString('ru-RU', {month: 'long'}) + ')';
  }
  // дата и день недели
  setWeekBlock() {
    const period = 7;
    const info = {day: 'numeric'};
    for (let i = 1; i <= period; i++) {
      document.querySelector(`.analytics__day_${i}`).textContent = new Date(new Date().setDate(new Date().getDate() - `${i - 1}`)).toLocaleString('ru-RU', info) + ', ' + (getWeekDay(new Date(new Date().setDate(new Date().getDate() - `${i - 1}`))));
    }
  }
  // количество упоминаний и длина блоков диаграммы
  setCountingBlock() {
    const period = 7;
    const info = {day: 'numeric'};
    for (let i = 1; i <= period; i++) {
      let mentionsArray = this.data.articles.filter((item) => {
        return document.querySelector(`.analytics__day_${i}`).textContent === (new Date(item.publishedAt).toLocaleString('ru-RU', info) + ', ' + (getWeekDay(new Date(new Date().setDate(new Date().getDate() - `${i - 1}`)))));
      });
      let metnionsInTitle = mentionsArray;
      metnionsInTitle.filter((item) => {
        item.title.toLowerCase().includes(this.request.toLowerCase());
      })
      let mentionsInDescription = mentionsArray.filter((item) => {
        if (item.description !== null) {
          item.description.toLowerCase().includes(this.request.toLowerCase());
        }
      })
      let allMentions = metnionsInTitle.length + mentionsInDescription.length;
      document.querySelector(`.analytics__counting_${i}`).textContent = allMentions;
      document.querySelector(`.analytics__counting_${i}`).setAttribute('style', `width: ${allMentions}%`);
    }
  }
}