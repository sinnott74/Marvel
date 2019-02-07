import {
  arrayToObject,
  objectToIDKeyedObject,
  addToArrayAndSort
} from "../redux/util";
import { createSelector } from "reselect";
import reducerRegistry from "../redux/ReducerRegistry";

/**
 * Reducer
 */
let initialState = {
  byId: {},
  allIds: [],
  isLoading: false,
  hasErrored: false
};

const LIST_COMICS = "LIST_COMICS";
const STORE_COMIC = "STORE_COMIC";
const LOADING_COMICS = "LOADING_COMICS";
const COMICS_ERRORED = "COMICS_ERRORED";

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case LIST_COMICS: {
      let newComics = arrayToObject(action.comics);
      let comics = {
        ...state.byId,
        ...newComics
      };
      return {
        ...state,
        byId: comics,
        allIds: Object.keys(comics)
      };
    }
    case STORE_COMIC: {
      let comic = objectToIDKeyedObject(action.comic);
      let comics = {
        ...state.byId,
        ...comic
      };
      return {
        ...state,
        byId: comics,
        allIds: Object.keys(comics)
      };
    }
    case LOADING_COMICS: {
      return {
        ...state,
        isLoading: action.isLoading
      };
    }
    case COMICS_ERRORED: {
      return {
        ...state,
        hasErrored: action.hasErrored,
        isLoading: false
      };
    }
    default: {
      return state;
    }
  }
}

reducerRegistry.register("comics", reducer);

/**
 * Action Creators
 */
function listComics(comics) {
  return {
    type: LIST_COMICS,
    comics
  };
}

function storeComic(comic) {
  return {
    type: STORE_COMIC,
    comic
  };
}

function loadingComics(bool) {
  return {
    type: LOADING_COMICS,
    isLoading: bool
  };
}

function comicHasErrored(bool) {
  return {
    type: COMICS_ERRORED,
    hasErrored: bool
  };
}

/**
 * Loads comics
 */
export function loadComics(page) {
  return function(dispatch) {
    dispatch(loadingComics(true));
    const limit = 20;
    const offset = (page - 1) * limit;
    fetch(`/api/comics?limit=${limit}&offset=${offset}`)
      .then(response => {
        if (!response.ok) {
          throw Error(response.statusText);
        }
        dispatch(loadingComics(false));
        return response;
      })
      .then(response => response.json())
      .then(comics => dispatch(listComics(comics.data.results)))
      .catch(err => {
        console.log(err);
        dispatch(comicHasErrored(true));
      });
  };
}

/**
 * Loads comics
 */
export function loadComicsByID(id) {
  return function(dispatch, getState) {
    const state = getState();
    if (getComicByID(state, id)) {
      return;
    }
    dispatch(loadingComics(true));
    fetch(`/api/comics/${id}`)
      .then(response => {
        if (!response.ok) {
          throw Error(response.statusText);
        }
        dispatch(loadingComics(false));
        return response;
      })
      .then(response => response.json())
      .then(comics => dispatch(storeComic(comics.data.results[0])))
      .catch(err => {
        console.log(err);
        dispatch(comicHasErrored(true));
      });
  };
}

/**
 * Selectors
 */
const getComicsByIDSelector = state => state.comics.byId;
export const getComics = createSelector(
  [getComicsByIDSelector],
  byID => {
    return Object.keys(byID)
      .map(id => {
        return byID[id];
      })
      .sort((c1, c2) => {
        var a = c1.title.toUpperCase(); // ignore upper and lowercase
        var b = c2.title.toUpperCase(); // ignore upper and lowercase
        if (a < b) {
          return -1;
        }
        if (a > b) {
          return 1;
        }

        // names must be equal
        return 0;
      });
  }
);

export const getComicByID = (state, id) => {
  return state.comics.byId[id];
};
