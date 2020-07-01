import "../styles/about.css";

const github = 'https://api.github.com/repos/itwassoclear/NewsAnalyzer/commits';
const monthArray = ['января', 'февраля', 'марта', 'апреля', 'мая', 'июня', 'июля', 'августа', 'сентября', 'октября', 'ноября', 'декабря'];

// слайдер
var Flickity = require('flickity');
var flkty = new Flickity('.main-carousel', {
  // options
  draggable: true, // можно свайпать
  freeScroll: true, // свободное пролистывание
  cellAlign: 'center', // выбранный слайд располагается в центре
  // wrapAround: true, // перемотка по кругу
  contain: true, // ограничивает перемотку количеством коммитов
  initialIndex: window.innerWidth >= 800 ? 3 : 0, // выбор начального слайда
});

let slider = document.querySelector('.flickity-viewport');

if (window.innerWidth <= 540) {
  slider.style = `transform: translateX(16px);`
} else if (window.innerWidth <= 800) {
  slider.style = `transform: translateX(40px);`
} else {
  slider.style = `transform: translateX(0);`
}

// апи GitHub
class GithubApi {
  constructor(url) {
    this.url = url;
  }

  getCommits() {
    return fetch(this.url, {
      method: 'GET',
    })
    .then(res => {
    if(res.ok) {
      return Promise.resolve(res.json());
    }
      return Promise.reject(`Ошибка: ${res.status}`);
    })
}
}

const githubApi = new GithubApi(github);

class CommitCard {
  createCard(data) {
    const carouselCard = document.createElement('div'); // карточка коммита
    carouselCard.classList.add('carousel-card');

    const date = calculateDate(data.commit.committer.date); // дата
    date.classList.add('carousel-card__date');

    const block = document.createElement('div'); // блок коммита
    block.classList.add('carousel-card__block');

    const photo = document.createElement('img'); // фото автора коммита
    photo.classList.add('carousel-card__photo');
    photo.setAttribute('alt', 'Фото автора коммита');
    photo.src = `${data.author.avatar_url}`;

    const about = document.createElement('div'); // блок с именем и почтой
    about.classList.add('carousel-card__about');

    const name = document.createElement('h3'); // имя
    name.classList.add('carousel-card__name');
    name.textContent = data.commit.committer.name;

    const mail = document.createElement('p'); // почта
    mail.classList.add('carousel-card__mail');
    mail.textContent = data.commit.committer.email;

    const commit = document.createElement('p'); // коммит
    commit.classList.add('carousel-card__commit');
    commit.textContent = data.commit.message;

    carouselCard.appendChild(date);
    carouselCard.appendChild(block);
    carouselCard.appendChild(commit);
    block.appendChild(photo);
    block.appendChild(about);
    about.appendChild(name);
    about.appendChild(mail);

    return carouselCard;
  }
}

const commitCard = new CommitCard();

class CommitCardList {
  constructor(cardList) {
    this.cardList = cardList;
  }
  renderCards(carouselCard) {
    this.cardList.append(carouselCard);
  }
}

const commitCardList = new CommitCardList(flkty);

githubApi.getCommits()
.then((res) => {
  res.forEach(data => commitCardList.renderCards(commitCard.createCard(data)))
})
.catch((err) => {
  console.log(`Ошибка: ${err}`);
})

// функция вычисления даты
function calculateDate(date) {
  const cardDate = document.createElement('time');
  cardDate.setAttribute('datetime', date);
  let dateInfo = new Date(date);
  cardDate.textContent = dateInfo.getDate() + ' ' + monthArray[dateInfo.getMonth()] + ', ' + dateInfo.getFullYear();
 
  return cardDate;
}

