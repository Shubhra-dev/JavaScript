import View from './view';
import icons from 'url:../../img/icons.svg';
class SearchResultView extends View {
  _parentElement = document.querySelector('.results');
  _renderMarkup(data) {
    const id = window.location.hash.slice(1);
    console.log(id);
    return data
      .map(
        res =>
          `<li class="preview">
        <a class="preview__link ${
          id === res.id ? 'preview__link--active' : ''
        }" href="#${res.id}">
          <figure class="preview__fig">
            <img src="${res.image_url}" alt="Test" />
          </figure>
          <div class="preview__data">
            <h4 class="preview__title">${res.title} ...</h4>
            <p class="preview__publisher">${res.publisher}</p>
            <div class="preview__user-generated">
              <svg>
                <use href="${icons}#icon-user"></use>
              </svg>
            </div>
          </div>
        </a>
      </li>`
      )
      .join('');
  }
}
export default new SearchResultView();
