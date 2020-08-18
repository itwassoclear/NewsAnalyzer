export const SERVER_URL = NODE_ENV === 'development' ? 'http://newsapi.org/v2/everything?' : 'https://nomoreparties.co/news/v2/everything?';
export const API_KEY = '772313d1aa0e42c39e8d202c20282aea'; // ключ newsApi
export const MONTH_ARRAY = ['января', 'февраля', 'марта', 'апреля', 'мая', 'июня', 'июля', 'августа', 'сентября', 'октября', 'ноября', 'декабря'];
export const MS_IN_DAY = 8.64e+7; // количество милисекунд в одном дне
export const GITHUB_URL = 'https://api.github.com/repos/itwassoclear/NewsAnalyzer/commits'; // ссылка на коммиты
export const WEEK_DAYS = ['вс', 'пн', 'вт', 'ср', 'чт', 'пт', 'сб'];

export const searchButton = document.querySelector('.search__button'); // кнопка Искать
export const searchingResults = document.querySelector('.searching-results'); // общий контейнер для всех результатов поиска
export const preloader = document.querySelector('.preloader'); // блок Прелоадер
export const notFound = document.querySelector('.not-found'); // блок Ничего не найдено
export const serverError = document.querySelector('.server-error'); // блок Ошибка сервера
export const results = document.querySelector('.results'); // блок Результаты поиска
export const cards = document.querySelector('.cards'); // контейнер для карточек
export const showMore = document.querySelector('.results__button'); // кнопка Показать ещё
export const inputElem = document.querySelector('.search__input'); // инпут
export const formElem = document.querySelector('.search__form'); // форма с поиском
export const inputErrors = document.querySelector('.search__error-message'); // ошибка валидации

export const statisticsTitle = document.querySelector('.output__title_key'); // ключевое слово в заголовке
export const statisticsMonth = document.querySelector('.analytics__table-title_month'); // месяц, за который были упоминания
