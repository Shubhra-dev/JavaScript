import { async } from 'regenerator-runtime';
import { API_URL, RES_PER_PAGE, API_KEY } from './config.js';
import { getJSON, setJSON } from './helper.js';

export const state = {
  recipe: {},
  search: {
    query: {},
    results: [],
    page: 1,
  },
  bookMark: [],
};

export const showRecipies = async function (id) {
  try {
    const data = await getJSON(`${API_URL}${id}`);
    state.recipe = data.data.recipe;
    state.recipe.bookMarked = state.bookMark.some(b => id === b.id)
      ? true
      : false;
    return state.recipe;
  } catch (err) {
    throw err;
  }
};
export const loadSearchResults = async function (query) {
  try {
    state.search.query = query;
    state.search.page = 1;
    const data = await getJSON(`${API_URL}?search=${query}`);
    state.search.results = data.data.recipes;
    return state.recipe;
  } catch (err) {
    throw err;
  }
};
const persistBookmark = function () {
  localStorage.setItem('bookmark', JSON.stringify(state.bookMark));
};

export const getResultsPage = function (page = state.search.page) {
  state.search.page = page;
  const start = (page - 1) * RES_PER_PAGE;
  const end = page * RES_PER_PAGE;

  return state.search.results.slice(start, end);
};

export const updateServing = function (updateTo) {
  state.recipe.ingredients.forEach(element => {
    if (element.quantity)
      element.quantity = (element.quantity * updateTo) / state.recipe.servings;
  });
  state.recipe.servings = updateTo;
  return state.recipe;
};
export const addBookmark = function (receipe) {
  state.bookMark.push(receipe);
  state.recipe.bookMarked = true;
  persistBookmark();
};
export const deleteBookmark = function (id) {
  const index = state.bookMark.findIndex(b => b.id === id);
  state.bookMark.splice(index, 1);
  state.recipe.bookMarked = false;
  persistBookmark();
};

const init = function () {
  const bk = localStorage.getItem('bookmark');
  if (bk) state.bookMark = JSON.parse(bk);
};
init();

export const uploadRecipe = async function (receipe) {
  try {
    const ingredients = Object.entries(receipe)
      .filter(ent => ent[0].startsWith('ingredient') && ent[1] !== '')
      .map(ing => {
        const ingArray = ing[1].replaceAll(' ', '').split(',');
        if (ingArray.length !== 3)
          throw new Error('Wrong Format! Please Use Correct Format!');
        const [quantity, unit, description] = ingArray;
        return { quantity: quantity ? +quantity : null, unit, description };
      });

    const newRecipe = {
      publisher: receipe.publisher,
      source_url: receipe.source_url,
      image_url: receipe.image_url,
      title: receipe.title,
      servings: +receipe.servings,
      cooking_time: +receipe.cooking_time,
      ingredients,
    };

    const data = await setJSON(`${API_URL}?key=${API_KEY}`, newRecipe);
    state.recipe = data.data.recipe;
    addBookmark(state.recipe);
    console.log(state.recipe);
  } catch (err) {
    throw err;
  }
};
