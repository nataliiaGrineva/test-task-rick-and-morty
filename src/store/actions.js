import axios from "axios";

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

export const loadingCharacters = (isLoading) => ({
  type: LOADING_CHARACTERS,
  payload: isLoading,
});

export const setErr = (isErr) => ({ type: SET_ERR, payload: isErr });

export const likeCharacter = (id) => ({ type: LIKE_CHARACTER, payload: id });
export const setName = (name) => ({ type: SET_NAME, payload: name });

export const getCharacters =
  (page = 1, name) =>
  async (dispatch) => {
    dispatch(loadingCharacters(true));

    try {
      const config = {
        params: {
          name,
          page,
        },
      };

      const { data } = await axios.get(
        `https://rickandmortyapi.com/api/character`,
        config
      );
      const characters = data.results;
      const pages = data.info?.pages;
      const suggestions = characters?.map((item) => ({
        label: item.name,
        id: item.id,
      }));
      dispatch({
        type: GET_CHARACTERS,
        payload: { characters, pages, suggestions },
      });
      dispatch(setErr(false));
    } catch (error) {
      console.warn(error);
      dispatch(setErr(true));
    } finally {
      dispatch(loadingCharacters(false));
    }
  };

export const getCharacter = (id) => async (dispatch) => {
  dispatch(loadingCharacters(true));

  try {
    const { data } = await axios.get(
      `https://rickandmortyapi.com/api/character/${id}`
    );

    const ids = data.episode.map((item) => +item.replace(/^.*\//g, ""));
    let result = await axios.get(
      `https://rickandmortyapi.com/api/episode/${ids}`
    );
    let episodes = result.data;
    episodes = Array.isArray(episodes) ? episodes : [episodes];
    episodes = episodes.map((item) => `${item.name} (${item.episode})`);

    dispatch({
      type: GET_CHARACTER,
      payload: { data, episodes },
    });
    dispatch(setErr(false));
  } catch (error) {
    console.warn(error);
    dispatch(setErr(true));
  } finally {
    dispatch(loadingCharacters(false));
  }
};

export const setSelectedItem = (item) => ({
  type: SET_SELECTED_ITEM,
  payload: item,
});

export const setPage = (page) => ({ type: SET_PAGE, payload: page });

export const getFavorites = (ids) => async (dispatch) => {
  dispatch(loadingCharacters(true));

  try {
    let result = await axios.get(
      `https://rickandmortyapi.com/api/character/${ids}`
    );
    let favorites = result.data;
    const newFavorites = Array.isArray(favorites) ? favorites : [favorites];
    dispatch({
      type: GET_FAVORITES,
      payload: newFavorites,
    });
    dispatch(setErr(false));
  } catch (error) {
    console.warn(error);
    dispatch(setErr(true));
  } finally {
    dispatch(loadingCharacters(false));
  }
};
