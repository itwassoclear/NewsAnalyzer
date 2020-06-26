import "../styles/about.css";

console.log('About')

var Flickity = require('flickity');

var flkty = new Flickity( '.main-carousel', {
  // options
  draggable: true, // можно свайпать
  // freeScroll: true, // свободное пролистывание
  cellAlign: 'center', // выбранный слайд располагается в центре
  // wrapAround: true, // перемотка по кругу
  contain: true, // ограничивает перемотку количеством коммитов
  initialIndex: window.innerWidth >= 800 ? 3 : 0, // выбор начального (центрального) слайда
});

let slider = document.querySelector('.flickity-slider');

if (window.innerWidth <= 540) {
  slider.style = `transform: translateX(16px);`
} else if (window.innerWidth <= 800) {
  slider.style = `transform: translateX(40px);`
} else {
  slider.style = `transform: translateX(0);`
}