import { ACTIVE_GAMES } from "./types";
import { BACKEND } from "../config";

export const fetchActiveGames = () => dispatch => {
  dispatch({ type: ACTIVE_GAMES.FETCH });

  return fetch(`${BACKEND.ADDRESS}/game/active-games`, {
    credentials: 'include'
  })
    .then(response => response.json())
    .then(json => {
      if (json.type === 'error') {
        dispatch({
          type: ACTIVE_GAMES.FETCH_ERROR,
          message: json.message
        })
      } else {
        dispatch({
          type: ACTIVE_GAMES.FETCH_SUCCESS,
          games: json.games
        })
      }
    })
    .catch(error => dispatch({
      type: ACTIVE_GAMES.FETCH_ERROR,
      message: error.message
    }))
};