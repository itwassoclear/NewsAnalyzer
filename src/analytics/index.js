import "../styles/analytics.css";

import DataStorage from '../js/modules/DataStorage.js';
import Statistics from '../js/components/Statistics.js';

const dataStorage = new DataStorage();

const statistics = new Statistics(dataStorage.getData(), dataStorage.getRequest());
statistics.setTitle();
statistics.setNewsInWeek();
statistics.setNewsInTitle();
statistics.setMonth();
statistics.setWeekBlock();
statistics.setCountingBlock();