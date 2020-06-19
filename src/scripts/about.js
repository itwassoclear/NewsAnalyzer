import "../pages/about.css";

console.log('About')

var Flickity = require('flickity');

var flkty = new Flickity( '.main-carousel', {
  // options
  draggable: true, // можно свайпать
  // freeScroll: true, // свободное пролистывание
  cellAlign: 'center', // выбранный слайд располагается в центре
  // wrapAround: true, // перемотка по кругу
  contain: true, // ограничивает перемотку количеством коммитов
  initialIndex: 2, // выбор начального (центрального) слайда
});


