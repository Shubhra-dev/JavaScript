import * as model from './model.js';
import receipeView from './views/receipeView.js';
import searchResultView from './views/searchResultView.js';
import searchView from './views/searchView.js';
import paginationView from './views/paginationView.js';
import bookMarkView from './views/bookMarkView.js';
import addReceipeView from './views/addReceipeView.js';
import 'regenerator-runtime/runtime';
import { async } from 'regenerator-runtime';

// if (module.hot) {
//   module.hot.accept();
// }

// https://forkify-api.herokuapp.com/v2

///////////////////////////////////////
const showRecipies = async function () {
  try {
    const id = window.location.hash.slice(1);
    if (!id) return;
    // renderSpinner(recipeContainer);
    receipeView.renderSpinner();
    searchResultView.update(model.getResultsPage());
    await model.showRecipies(id);
    receipeView.render(model.state.recipe);
  } catch (err) {
    receipeView.renderError();
  }
};
const showSearchResults = async function () {
  try {
    const query = searchView.getQuery();
    searchResultView.renderSpinner();
    await model.loadSearchResults(query);
    searchResultView.render(model.getResultsPage());
    paginationView.render(model.state.search);
  } catch (err) {}
};

const showPagination = function (page) {
  searchResultView.render(model.getResultsPage(page));
  paginationView.render(model.state.search);
};
const updateServing = function (updateTo) {
  model.updateServing(updateTo);
  receipeView.update(model.state.recipe);
};

const addBookmark = function () {
  if (model.state.recipe.bookMarked) {
    model.deleteBookmark(model.state.recipe.id);
  } else {
    model.addBookmark(model.state.recipe);
  }
  receipeView.update(model.state.recipe);
  bookMarkView.render(model.state.bookMark);
  console.log(model.state.recipe.title);
};
const controlBookmark = function () {
  bookMarkView.render(model.state.bookMark);
};

const controlUploadRecipe = async function (newRecipe) {
  try {
    await model.uploadRecipe(newRecipe);
    console.log(newRecipe);
    receipeView.render(model.state.recipe);
    addReceipeView.toggler();
    window.history.pushState(null, '', `#${model.state.recipe.id}`);
    bookMarkView.render(model.state.bookMark);
  } catch (err) {
    addReceipeView.renderError(err);
  }
};
const init = function () {
  controlBookmark();
  receipeView.addHandlerRender(showRecipies);
  receipeView.addHandlerServing(updateServing);
  receipeView.addHandlerBookmark(addBookmark);
  searchView.addhandlerSearch(showSearchResults);
  paginationView.addHandlerClick(showPagination);
  addReceipeView.addHandlerUpload(controlUploadRecipe);
};
init();
