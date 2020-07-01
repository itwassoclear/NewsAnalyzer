import "./styles/index.css";

const searchButton = document.querySelector('.search__button'); // кнопка Искать
const searchingResults = document.querySelector('.searching-results'); // общий контейнер для всех результатов поиска
const preloader = document.querySelector('.preloader'); // блок Прелоадер
const notFound = document.querySelector('.not-found'); // блок Ничего не найдено
const results = document.querySelector('.results'); // блок Результаты поиска
const cards = document.querySelector('.cards'); // контейнер для карточек
const showMore = document.querySelector('.results__button'); // кнопка Показать ещё

const monthArray = ['января', 'февраля', 'марта', 'апреля', 'мая', 'июня', 'июля', 'августа', 'сентября', 'октября', 'ноября', 'декабря'];

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

const inputElem = document.querySelector('.search__input'); // инпут
const formElem = document.querySelector('.search__form'); // форма с поиском
const inputErrors = document.querySelector('.search__error-message'); // ошибка валидации

const onSubmitCallback = (event) => {
  event.preventDefault();
  console.log('Submit!!!')
}

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
// form.clearHandlers();

// создание карточки
class NewsCard {
  createCard(link, image, date, title, text, label) {
    const card = document.createElement('div'); // карточка
    card.classList.add('card');

    const cardLink = document.createElement('a'); // контейнер, ссылка
    cardLink.classList.add('card__link');
    cardLink.setAttribute('href',`${link}`);
    cardLink.setAttribute('target','_blank');

    const cardImage = document.createElement('img'); // картинка
    cardImage.classList.add('card__image');
    cardImage.classList.add('style', `background-image: url('${image}')`)
    cardImage.setAttribute('alt', `Изображение из статьи`);

    const cardDate = calculateDate(date); // дата

    const cardDescription = document.createElement('div'); // текстовый блок
    cardDescription.classList.add('card__description');

    const cardTitle = document.createElement('h3'); // заголовок
    cardTitle.classList.add('card__title');
    cardTitle.textContent = title;

    const cardText = document.createElement('p'); // текст
    cardText.classList.add('card__text');
    cardText.textContent = text;

    const cardLabel = document.createElement('p'); // источник
    cardLabel.classList.add('card__label');
    cardLabel.textContent = label;

    card.appendChild(cardLink);
    cardLink.appendChild(cardImage);
    cardLink.appendChild(cardDate);
    cardLink.appendChild(cardDescription);
    cardDescription.appendChild(cardTitle);
    cardDescription.appendChild(cardText);
    cardDescription.appendChild(cardLabel);

    return card;
  }
}

class NewsCardList {
  constructor(list){
    this.list = list;
    this.cardsInPage = 3;
    this.lastCard = 0;
  }
}

// функция вычисления даты
function calculateDate(date) {
  const cardDate = document.createElement('time');
  // cardDate.classList.add('card__date');
  cardDate.setAttribute('datetime', date);
  let dateInfo = new Date(date);
  cardDate.textContent = dateInfo.getDate() + ' ' + monthArray[dateInfo.getMonth()] + ', ' + dateInfo.getFullYear();
 
  return cardDate;
}

const createCard = new NewsCard();
console.log(createCard)

// ньюс апи
var url = 'http://newsapi.org/v2/everything?' +
          'q=Apple&' +
          'from=2020-06-27&' +
          'sortBy=popularity&' +
          'apiKey=772313d1aa0e42c39e8d202c20282aea';

var req = new Request(url);

fetch(req)
  .then(function(response) {
      console.log(response.json());
  });