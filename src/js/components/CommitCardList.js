// кардлист для карточек коммитов
export default class CommitCardList {
  constructor(cardList) {
    this.cardList = cardList;
  }
  renderCards(carouselCard) {
    this.cardList.append(carouselCard);
  }
}