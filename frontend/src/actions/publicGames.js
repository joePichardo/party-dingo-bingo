import { PUBLIC_GAMES } from "./types";
import { BACKEND } from "../config";

export const fetchPublicGames = ({page}) => dispatch => {
  dispatch({ type: PUBLIC_GAMES.FETCH });

  return fetch(`${BACKEND.ADDRESS}/game/public-games/page/${page}`)
    .then(response => response.json())
    .then(json => {
      if (json.type === 'error') {
        dispatch({
          type: PUBLIC_GAMES.FETCH_ERROR,
          message: json.message
        })
      } else {
        dispatch({
          type: PUBLIC_GAMES.FETCH_SUCCESS,
          games: json.games
        })
      }
    })
    .catch(error => dispatch({
      type: PUBLIC_GAMES.FETCH_ERROR,
      message: error.message
    }))
};