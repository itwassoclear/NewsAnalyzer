import {showMore} from '../constants/constants.js';

// создание кардлиста карточек новостей
export default class NewsCardList {
  constructor(cards){
    this.cards = cards;
    this.cardsInPage = 3;
    this.lastCardIndex = 0;
  }
  // рендер карточек
  renderCards(data, card) {
    const news = data;
    for (let i = this.lastCardIndex; i < Math.min(this.lastCardIndex + this.cardsInPage, news.length); i++) {
      const article = news[i];
      this.cards.appendChild(card.createCard(article.url, article.urlToImage, article.publishedAt, article.title, article.description, article.source.name));
    }
    this.lastCardIndex = this.lastCardIndex + this.cardsInPage;
    this.showCards(data, card);
  }
  // показывает ещё 3 карточки после нажатия на кнопку Показать ещё
  showCards(data, card) {
    if (data.length > this.lastCardIndex) {
      showMore.setAttribute('style', 'display: flex');;
      showMore.onclick = (event) => this.renderCards(data, card);
    } else {
      showMore.setAttribute('style', 'display: none');
    }
  }
  // удаление карточек
  deleteCards() {
    while (this.cards.firstChild) {
      this.cards.removeChild(this.cards.firstChild);
    }
  }
}