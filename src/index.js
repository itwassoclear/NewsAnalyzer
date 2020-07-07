import "./styles/index.css";

import NewsCard from './js/components/NewsCard.js';
import NewsCardList from './js/components/NewsCardList.js';
import NewsApi from './js/modules/NewsApi.js';
import DataStorage from './js/modules/DataStorage.js';
import {searchButton, searchingResults, preloader, notFound, serverError, results, cards, inputElem, formElem, inputErrors, SERVER_URL, API_KEY} from './js/constants/constants.js';

// базовый компонент
class BaseComponent {
  constructor(handlers = []) {
    this.handlers = handlers;
  }

  _setHandlers() {
    this.handlers.forEach(handler => this.addHandler(handler));
  }
  addHandler({ elem, event, callback }) {
    elem.addEventListener(event, callback);
  }
  clearHandlers() {
    this.handlers.forEach(handler => this.removeHandler(handler));
  }
  removeHandler({ elem, event, callback }) {
    elem.removeEventListener(event, callback);
  }
}

// наследование базового компонента для формы
class Form extends BaseComponent {
  constructor(handlers) {
    super(handlers);
  }
}

const dataStorage = new DataStorage();

// коллбэк для сабмита формы
const onSubmitCallback = (event) => {
  event.preventDefault();
  localStorage.clear();
  inputElem.setAttribute('disabled', true); // дизейблим инпут
  searchingResults.setAttribute('style', 'display: flex'); // общий блок результатов показывается
  notFound.setAttribute('style', 'display: none');
  results.setAttribute('style', 'display: none');
  preloader.setAttribute('style', 'display: flex'); // прелоадер крутится
  newsApi.getNews(inputElem.value) // 
    .then((data) => {
      dataStorage.setData(data);
      dataStorage.setRequest(inputElem.value);
      dataStorage.setArray(data);
      newsCardList.deleteCards();
    })
    .then (() => {
      const storageCards = dataStorage.getArray();
      if (storageCards.length != 0) {
        results.setAttribute('style', 'display: flex');
        newsCardList.renderCards(storageCards, newsCard);
      } else {
        checkRes(data.articles);
      }
    })
    .catch((err) => {
      console.log(err);
      serverError.setAttribute('style', 'display: flex');
      results.setAttribute('style', 'display: none');
    })
    .finally (() => {
      searchButton.removeAttribute('disabled');
      inputElem.removeAttribute('disabled');
      preloader.setAttribute('style', 'display: none');
    })
}

// коллбэк для заполнения инпута
const onInputCallback = (event) => {
  const inputElem = event.target;
  if (inputElem.validity.valueMissing) {
    inputElem.setCustomValidity('Нужно ввести ключевое слово');
    searchButton.setAttribute('disabled', true);
  } else if (inputElem.validity.tooShort) {
    inputElem.setCustomValidity('Должно быть от 2 до 30 символов');
    searchButton.setAttribute('disabled', true);
  } else {
    inputElem.setCustomValidity('');
    searchButton.removeAttribute('disabled');
  }
  inputErrors.textContent = inputElem.validationMessage;
}

const form = new Form([
  {
    elem: inputElem,
    event: 'input',
    callback: onInputCallback,
  },
  {
    elem: formElem,
    event: 'submit',
    callback: onSubmitCallback,
  },
]);

form._setHandlers();

const newsCard = new NewsCard();
const newsCardList = new NewsCardList(cards);
const newsApi = new NewsApi(SERVER_URL, API_KEY);

function checkRes(data) {
  if (data == 0) {
    results.setAttribute('style', 'display: none');
    notFound.setAttribute('style', 'display: flex');
  } else {
    notFound.setAttribute('style', 'display: none');
    results.setAttribute('style', 'display: flex');
    newsCardList.renderCards(data, newsCard);
  }
}

// отрисовка карточек по последнему запросу при перезагрузке страницы
if (dataStorage.getArray() === null) {
  searchingResults.setAttribute('style', 'display: none');
} else {
  inputElem.value = dataStorage.getRequest();
  const cardsFromStorage = dataStorage.getArray();
  searchingResults.setAttribute('style', 'display: flex');
  results.setAttribute('style', 'display: flex');
  checkRes(cardsFromStorage);
}