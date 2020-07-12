import calculateDate from '../utils/calculateDate.js';

export default class CommitCard {
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