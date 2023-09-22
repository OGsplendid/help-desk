import './popup.css';

export default class PopupCreator {
  constructor(container) {
    this.container = container;

    this.remove = this.remove.bind(this);
  }

  static create(type) {
    if (type === 'delete') {
      return `
      <form class="popup" method="POST" action="http://localhost:7070">
        <h3 class="popup-title">Удалить тикет</h3>
        <p class="popup-description">Вы уверены, что хотите удалить тикет? Это действие необратимо</p>
        <div class="popup-buttons">
          <button class="popup-button popup-cancel-button">Отмена</button>
          <button class="popup-button popup-save-button">ОК</button>
        </div>
      </form>
      `;
    }
    return `
      <form class="popup">
        <h3 class="popup-title">${type} тикет</h3>
        <div class="input-section">
          <span class="input-title">Краткое описание</span>
          <input name="name" class="input input-description">
        </div>
        <div class="input-section">
          <span class="input-title">Подробное описание</span>
          <textarea name="price" class="input input-full-description"></textarea>
        </div>
        <div class="popup-buttons">
          <button type="button" class="popup-button popup-cancel-button">Отмена</button>
          <button type="submit" class="popup-button popup-save-button">ОК</button>
        </div>
      </form>
    `;
  }

  show(type) {
    const html = PopupCreator.create(type);
    this.container.insertAdjacentHTML('beforeend', html);
    const popup = this.container.querySelector('.popup');
    const closeBtn = popup.querySelector('.popup-cancel-button');
    closeBtn.addEventListener('click', this.remove);
  }

  remove() {
    const popup = this.container.querySelector('.popup');
    if (!popup) return;
    popup.remove();
  }
}
