import {MONTH_ARRAY} from '../constants/constants.js';

// функция вычисления даты
export default function calculateDate(date) {
  const cardDate = document.createElement('time'); // дата для карточек
  cardDate.setAttribute('datetime', date);
  let dateInfo = new Date(date);
  cardDate.textContent = dateInfo.getDate() + ' ' + MONTH_ARRAY[dateInfo.getMonth()] + ', ' + dateInfo.getFullYear();
 
  return cardDate;
}