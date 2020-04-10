import { GAME } from "./types";
import { BACKEND } from "../config";
import history from "../history";

export const fetchGame = () => dispatch => {
  dispatch({ type: GAME.FETCH });

  return fetch(`${BACKEND.ADDRESS}/game/new`, {
    credentials: 'include'
  })
    .then( response => response.json())
    .then(json => {

      if(json.type === 'error') {
        dispatch({
          type: GAME.FETCH_ERROR,
          message: json.message
        });
      } else {
        dispatch({
          type: GAME.FETCH_SUCCESS,
          game: json.game
        });

        history.push('/account-games');
      }

    })
    .catch(error => {
      dispatch({
        type: GAME.FETCH_ERROR,
        message: error.message
      });
    });
};