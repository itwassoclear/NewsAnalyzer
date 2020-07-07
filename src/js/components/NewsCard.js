import calculateDate from '../utils/calculateDate.js';

// создание карточки
export default class NewsCard {
  createCard(link, image, date, title, text, label) {
    const card = document.createElement('div'); // карточка
    card.classList.add('card');

    const cardLink = document.createElement('a'); // контейнер, ссылка
    cardLink.classList.add('card__link');
    cardLink.setAttribute('href',`${link}`);
    cardLink.setAttribute('target','_blank');

    const cardImage = document.createElement('img'); // картинка
    cardImage.classList.add('card__image');
    cardImage.src = image;
    cardImage.setAttribute('alt', `Изображение из статьи`);

    const cardDate = calculateDate(date); // дата
    cardDate.classList.add('card__date');

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