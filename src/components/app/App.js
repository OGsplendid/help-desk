import PopupCreator from '../popup-creator/PopupCreator';

export default class App {
  constructor(parentElement) {
    this.parentElement = parentElement;
    this.wrapper = this.parentElement.querySelector('.wrapper');
    this.popupCreator = new PopupCreator(this.parentElement);
    this.addTicketBtn = this.wrapper.querySelector('.add-new-ticket');

    this.showCreatePopup = this.showCreatePopup.bind(this);
    this.showChangePopup = this.showChangePopup.bind(this);
    this.showDeletePopup = this.showDeletePopup.bind(this);

    this.wrapper.addEventListener('click', App.toggleItemStatus);
    this.addTicketBtn.addEventListener('click', this.showCreatePopup);
    this.wrapper.addEventListener('click', this.showChangePopup);
    this.wrapper.addEventListener('click', this.showDeletePopup);
  }

  static toggleItemStatus(e) {
    if (!e.target.classList.contains('checkbox')) return;
    e.target.classList.toggle('task-done');
  }

  showCreatePopup() {
    this.popupCreator.show('Добавить');

    document.querySelector('.popup-save-button').addEventListener('click', async (e) => {
      e.preventDefault();

      const shortDescription = document.querySelector('.input-description').value;
      const fullDescription = document.querySelector('.input-full-description').value;
      const obj = {
        name: shortDescription,
        description: fullDescription,
        status: false,
      };
      try {
        const response = await fetch('http://localhost:7070?method=createTicket', {
          id: null,
          method: 'POST',
          body: JSON.stringify(obj),
          headers: {
            'Content-Type': 'application/json',
          },
        });
        const json = await response.json();
        console.log('Успех:', JSON.stringify(json));
      } catch (error) {
        console.error('Ошибка:', error);
      }
    });
  }

  showChangePopup(e) {
    if (!e.target.classList.contains('change-item')) return;
    this.popupCreator.show('Изменить');
  }

  showDeletePopup(e) {
    if (!e.target.classList.contains('delete-item')) return;
    this.popupCreator.show('delete');
  }
}
