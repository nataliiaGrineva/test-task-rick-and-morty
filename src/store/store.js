import thunk from "redux-thunk";
import { createStore, applyMiddleware } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import {
  LOADING_CHARACTERS,
  GET_CHARACTERS,
  GET_CHARACTER,
  GET_FAVORITES,
  LIKE_CHARACTER,
  SET_SELECTED_ITEM,
  SET_PAGE,
  SET_NAME,
  SET_ERR,
} from "./types";

const initialState = {
  name: "",
  suggestions: [],
  characters: [],
  pages: null,
  currentPage: 1,
  favorites: loadFromLocalStorage(),
  isLoading: false,
  currentCharacter: null,
  currentCharactersEpisodes: [],
  selectedItem: null,
  favoritesCharacters: [],
  loadingError: false,
};

const logger = (store) => (next) => (action) => {
  console.group(action.type);
  console.info("dispatching", action);
  let result = next(action);
  console.log("next state", store.getState());
  console.groupEnd(action.type);
  return result;
};

const rootReducer = (state = initialState, action) => {
  const { type, payload } = action;

  switch (type) {
    case LOADING_CHARACTERS:
      return { ...state, isLoading: payload };
    case SET_ERR:
      return {
        ...state,
        loadingError: payload,
      };
    case GET_CHARACTERS:
      return {
        ...state,
        characters: payload.characters,
        pages: payload.pages,
        suggestions: payload.suggestions,
      };
    case GET_CHARACTER:
      return {
        ...state,
        currentCharacter: payload.data,
        currentCharactersEpisodes: payload.episodes,
      };
    case LIKE_CHARACTER: {
      const newFavorites = state.favorites.includes(payload)
        ? state.favorites.filter((item) => item !== payload)
        : [...state.favorites, payload];
      return {
        ...state,
        favorites: newFavorites,
      };
    }
    case SET_SELECTED_ITEM:
      return {
        ...state,
        selectedItem: payload,
      };
    case SET_PAGE:
      return {
        ...state,
        currentPage: payload,
      };
    case SET_NAME:
      return {
        ...state,
        name: payload,
      };
    case GET_FAVORITES:
      return {
        ...state,
        favoritesCharacters: payload,
      };
    default:
      return { ...state };
  }
};

const store = createStore(
  rootReducer,
  initialState,
  composeWithDevTools(applyMiddleware(thunk, logger))
);

function saveToLocalStorage(state) {
  try {
    const localFavorites = JSON.stringify(state.favorites);
    localStorage.setItem("favorites", localFavorites);
  } catch (e) {
    console.warn(e);
  }
}

function loadFromLocalStorage() {
  try {
    const localFavorites = localStorage.getItem("favorites");
    if (localFavorites === null) return [];
    return JSON.parse(localFavorites);
  } catch (e) {
    console.warn(e);
    return undefined;
  }
}

store.subscribe(() => saveToLocalStorage(store.getState()));

export default store;
