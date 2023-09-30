import moment from 'moment/moment';

export default class TicketHandler {
  constructor() {
    this.list = document.querySelector('.list');
  }

  add(id, shortDescription, date, status) {
    const formatedTimestamp = moment(date).format('DD.MM.YY HH:MM');
    // const formated = moment(date);
    // const formatedTimestamp = formated.format('DD.MM.YY HH:MM');
    const html = `
      <li class="list-item" data-id="${id}">
        <div class="checkbox-wrapper">
          <button type="checkbox" class="checkbox ${status} item-btn"></button>
        </div>
        <div class="short-description-wrapper">
          <span class="short-description">${shortDescription}</span>
        </div>
        <div class="date-wrapper">
          <time class="date">${formatedTimestamp}</time>
        </div>
        <div class="item-btns-wrapper">
          <button class="change-item item-btn"></button>
          <button class="delete-item item-btn"></button>
        </div>
      </li>
    `;
    this.list.insertAdjacentHTML('beforeend', html);
  }
}
