import {WEEK_DAYS} from '../constants/constants.js';

// функция возвращает день недели
export default function getWeekDay(date) {
  return WEEK_DAYS[date.getDay()];
}