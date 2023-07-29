import icons from 'url:../../img/icons.svg';
export default class View {
  _data;

  render(data) {
    console.log(!data || (Array.isArray(data) && data.length === 0));
    if (!data || (Array.isArray(data) && data.length === 0)) {
      return this.renderError();
    }
    this._data = data;
    const html = this._renderMarkup(this._data);
    this._clear();
    this._addMarkup(html);
  }
  update(data) {
    this._data = data;
    const html = this._renderMarkup(this._data);
    const newDom = document.createRange().createContextualFragment(html);
    const newEl = Array.from(newDom.querySelectorAll('*'));
    const curEl = Array.from(this._parentElement.querySelectorAll('*'));

    newEl.forEach((nEl, i) => {
      const cEl = curEl[i];

      if (!nEl.isEqualNode(cEl) && nEl.firstChild?.nodeValue.trim() !== '') {
        cEl.textContent = nEl.textContent;
      }

      if (!nEl.isEqualNode(cEl)) {
        Array.from(nEl.attributes).forEach(att => {
          cEl.setAttribute(att.name, att.value);
        });
      }
    });
  }

  renderError(err = 'Sorry! We can not find the receipe.') {
    const html = `
    <div class="error">
            <div>
              <svg>
                <use href="${icons}#icon-alert-triangle"></use>
              </svg>
            </div>
            <p>${err}</p>
          </div>
    `;
    this._clear();
    this._addMarkup(html);
  }
  _clear() {
    this._parentElement.innerHTML = '';
  }
  _addMarkup(html) {
    this._parentElement.insertAdjacentHTML('afterbegin', html);
  }
  renderSpinner() {
    const html = `
        <div class="spinner">
        <svg>
            <use href="${icons}#icon-loader"></use>
        </svg>
        </div>
  `;
    this._clear();
    this._addMarkup(html);
  }
}
