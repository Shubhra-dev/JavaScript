import View from './view';
class AddReceipeView extends View {
  _parentElement = document.querySelector('.upload');

  _window = document.querySelector('.add-recipe-window');
  _overlay = document.querySelector('.overlay');
  _btnOpen = document.querySelector('.nav__btn--add-recipe');
  _btnClose = document.querySelector('.btn--close-modal');

  constructor() {
    super();
    this.addReceipeShow();
    this.receipeHide();
  }

  toggler() {
    this._overlay.classList.toggle('hidden');
    this._window.classList.toggle('hidden');
  }

  addReceipeShow() {
    this._btnOpen.addEventListener('click', this.toggler.bind(this));
  }
  receipeHide() {
    this._btnClose.addEventListener('click', this.toggler.bind(this));
    this._overlay.addEventListener('click', this.toggler.bind(this));
  }
  addHandlerUpload(handler) {
    this._parentElement.addEventListener('submit', function (e) {
      e.preventDefault();
      const dataArray = [...new FormData(this)];
      const data = Object.fromEntries(dataArray);
      handler(data);
    });
  }
}

export default new AddReceipeView();
