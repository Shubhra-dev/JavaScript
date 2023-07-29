import View from './view';
import icons from 'url:../../img/icons.svg';
import { RES_PER_PAGE } from '../config.js';
class PaginationView extends View {
  _parentElement = document.querySelector('.pagination');
  addHandlerClick(handler) {
    this._parentElement.addEventListener('click', function (e) {
      const btn = e.target.closest('.btn--inline');
      console.log(btn);
      if (!btn) return;
      const goToPage = +btn.dataset.goto;
      handler(goToPage);
    });
  }
  _renderMarkup(data) {
    const curPage = data.page;
    const numOfPage = Math.ceil(data.results.length / RES_PER_PAGE);
    if (curPage === 1 && numOfPage > 1) {
      return `
        <button data-goto = ${
          curPage + 1
        } class="btn--inline pagination__btn--next">
            <span>Page ${curPage + 1}</span>
            <svg class="search__icon">
              <use href="${icons}#icon-arrow-right"></use>
            </svg>
          </button>
        `;
    }
    if (curPage === numOfPage && numOfPage > 1) {
      return `
        <button data-goto = ${
          curPage - 1
        } class="btn--inline pagination__btn--prev">
            <svg class="search__icon">
              <use href="${icons}#icon-arrow-left"></use>
            </svg>
            <span>Page ${curPage - 1}</span>
          </button>
        `;
    }
    if (curPage < numOfPage) {
      return `
        <button data-goto = ${
          curPage - 1
        } class="btn--inline pagination__btn--prev">
            <svg class="search__icon">
              <use href="${icons}#icon-arrow-left"></use>
            </svg>
            <span>Page ${curPage - 1}</span>
          </button>
        <button data-goto = ${
          curPage + 1
        } class="btn--inline pagination__btn--next">
            <span>Page ${curPage + 1}</span>
            <svg class="search__icon">
              <use href="${icons}#icon-arrow-right"></use>
            </svg>
          </button>
        `;
    }
    return '';
  }
}
export default new PaginationView();
