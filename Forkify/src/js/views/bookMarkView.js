import View from './view';

class BookmarkView extends View {
  _parentElement = document.querySelector('.bookmarks__list');

  _renderMarkup(bookmarks) {
    return bookmarks
      .map(
        res =>
          `<li class="preview">
        <a class="preview__link" href="#${res.id}">
          <figure class="preview__fig">
            <img src="${res.image_url}" alt="Test" />
          </figure>
          <div class="preview__data">
            <h4 class="preview__title">${res.title} ...</h4>
            <p class="preview__publisher">${res.publisher}</p>
            </div>
          </div>
        </a>
      </li>`
      )
      .join('');
  }
}

export default new BookmarkView();
