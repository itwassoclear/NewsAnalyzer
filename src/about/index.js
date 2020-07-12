import "../styles/about.css";

import CommitCard from '../js/components/CommitCard.js';
import CommitCardList from '../js/components/CommitCardList.js';
import GithubApi from '../js/modules/GithubApi.js';
import {GITHUB_URL} from '../js/constants/constants.js';

// слайдер
var Flickity = require('flickity');
var flkty = new Flickity('.main-carousel', {
  draggable: true, // можно свайпать
  // freeScroll: true, // свободное пролистывание
  cellAlign: window.innerWidth >= 800 ? 'center' : 'left', // выбранный слайд располагается в центре
  // wrapAround: window.innerWidth >= 800 ? true : false, // перемотка по кругу
  contain: true, // ограничивает перемотку количеством коммитов
});

let slider = document.querySelector('.flickity-viewport');

if (window.innerWidth <= 540) {
  slider.setAttribute('style', 'transform: translateX(16px)');
} else if (window.innerWidth <= 800) {
  slider.setAttribute('style', 'transform: translateX(40px)');
} else {
  slider.setAttribute('style', 'transform: translateX(0)');
}

const githubApi = new GithubApi(GITHUB_URL);
const commitCard = new CommitCard();
const commitCardList = new CommitCardList(flkty);

githubApi.getCommits()
.then((res) => {
  res.forEach(data => commitCardList.renderCards(commitCard.createCard(data)))
})
.catch((err) => {
  console.log(`Ошибка: ${err}`);
})